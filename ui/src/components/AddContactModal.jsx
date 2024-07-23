
import React, { useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { addContact } from "../features/contact/contactSlice";

const AddContactModal = ({ isOpen, onClose, onContactAdded }) => {
  const [title, setName] = useState("");
  const [content, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Phone number validation regex (basic example, can be adjusted based on the specific format)
    const phoneRegex = /^\d{10}$/;

    if (!title || !content || !email) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!phoneRegex.test(content)) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const contactData = { title, content, email, company, address, createdBy: user._id };
    try {
      await dispatch(addContact(contactData)).unwrap();
      toast.success("Contact added successfully!");
      onClose();
      onContactAdded(); // Notify parent component
      setName("");
      setPhoneNumber("");
      setEmail("");
      setCompany("");
      setAddress("");
    } catch (error) {
      console.error("Error adding contact:", error);
      toast.error("Error adding contact!");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Contact"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md shadow-lg"
      overlayClassName="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50"
    >
      <h2 className="text-2xl font-bold mb-4">Add Contact</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Name:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Name"
          />
        </div>
        <div>
          <label className="block mb-2">Phone Number:</label>
          <input
            type="text"
            value={content}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Phone Number"
          />
        </div>
        <div>
          <label className="block mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Email"
          />
        </div>
        <div>
          <label className="block mb-2">Company:</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Company"
          />
        </div>
        <div>
          <label className="block mb-2">Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Address"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default AddContactModal;

