import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { deleteContact } from "../features/contact/contactSlice";
import EditContactModal from "./EditContactModal"; 

const ContactItem = ({ contact, onDelete, onEdit }) => {
  const dispatch = useDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleDelete = (contactId) => {
    dispatch(deleteContact(contactId))
      .unwrap()
      .then(() => {
        toast.success("Contact deleted successfully!");
        onDelete();
      })
      .catch((error) => {
        console.error("Error deleting contact:", error);
        toast.error("Error deleting contact!");
      });
  };

  const handleEditClick = (contact) => {
    setSelectedContact(contact);
    setIsEditModalOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold"><strong>Name:</strong> {contact.title}</h3>
          <p className="text-lg font-semibold"><strong>P.No:</strong> {contact.content}</p>
          <p className="text-lg font-semibold"><strong>Email:</strong> {contact.email}</p>
          <p className="text-lg font-semibold"><strong>Company:</strong> {contact.company}</p>
          <p className="text-lg font-semibold"><strong>Address:</strong> {contact.address}</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleEditClick(contact)}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(contact._id)} // Fixed onClick handler syntax
            className="text-red-500 hover:text-red-700 focus:outline-none"
          >
            <FaTrash />
          </button>
        </div>
      </div>
        <EditContactModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          contact={contact}
          onContactUpdated={onEdit}
        />
    </>
  );
};

export default ContactItem;
