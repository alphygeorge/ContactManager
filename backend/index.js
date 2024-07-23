const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoute = require("./routes/user");
const contactRoute = require("./routes/contact"); 
const app = express();
const PORT = process.env.PORT || 8000;

mongoose
  .connect("mongodb://127.0.0.1:27017/contactmanager", {})
  .then(() => console.log("connected successfully"))
  .catch((err) => {
    console.error(err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/user", userRoute);
app.use("/contact", contactRoute); 
app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
