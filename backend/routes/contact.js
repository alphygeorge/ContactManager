const Contact = require("../models/contact"); 
const { Router } = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = Router();

router.post("/add", async (req, res) => {
  try {
    await Contact.create({
      title: req.body.title,
      content: req.body.content,
      email: req.body.email,
      createdBy: req.body.createdBy,
      company: req.body.company, 
      address: req.body.address, 
    });
    
    res.status(201).send("Contact added successfully");
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/view/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const contacts = await Contact.find({ createdBy: userId }).populate("createdBy");
    res.json(contacts); 
  } catch (error) {
    console.error("Error retrieving contacts:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/delete", async (req, res) => {
  try {
    const contactId = req.body.id;
    await Contact.findByIdAndDelete(contactId);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/edit", async (req, res) => {
  try {
    const contactId = req.body.id;
    const newTitle = req.body.newTitle;
    const newContent = req.body.newContent;
    const newEmail = req.body.newEmail;
    const newCompany = req.body.newCompany; 
    const newAddress = req.body.newAddress; 

    await Contact.findByIdAndUpdate(contactId, {
      title: newTitle,
      content: newContent,
      email: newEmail,
      company: newCompany,
      address: newAddress,
    });

    res.status(200).send("Contact updated successfully");
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
