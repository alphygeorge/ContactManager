const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    createdBy: {
      type: String,
      required: true,
    },
    company: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

const Contact = model("contact", contactSchema);

module.exports = Contact;
