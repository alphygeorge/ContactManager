 import React, { useState } from "react";
 import Modal from "react-modal";
 import { toast } from "react-toastify";
 import { useDispatch } from "react-redux";
 import { updateContact } from "../features/contact/contactSlice";  
 const EditContactModal = ({ isOpen, onClose, contact, onContactUpdated }) => { 
   const [title, setName] = useState(contact.title);  
   const [content, setPhoneNumber] = useState(contact.content);  
   const [email, setEmail] = useState(contact.email);
   const [company, setCompany] = useState(contact.company);
   const [address, setAddress] = useState(contact.address);  
   const dispatch = useDispatch();

   const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhoneNumber = (phoneNumber) => {
    const re = /^\d{10}$/;
    return re.test(String(phoneNumber));
  };

   const handleSubmit = (e) => {
     e.preventDefault();

     if (!title || !content || !email) {
      toast.error("Name, phone number, and email are required!");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Invalid email address!");
      return;
    }

    if (!validatePhoneNumber(content)) {
      toast.error("Invalid phone number! It should be a 10-digit number.");
      return;
    }
     dispatch(
       updateContact({ contactId: contact._id, newTitle: title, newContent: content, newEmail: email, newCompany: company, newAddress: address, }) 
     )
       .unwrap()
       .then(() => {
         toast.success("Contact updated successfully!");  
         onClose();
         onContactUpdated(); 
       })
       .catch((error) => {
         console.error("Error updating contact:", error);
         toast.error("Error updating contact!");  
       });
   };

   return (
     <Modal
       isOpen={isOpen}
       onRequestClose={onClose}
       contentLabel="Edit Contact"  
       className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md shadow-lg"
       overlayClassName="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50"
     >
       <h2 className="text-2xl font-bold mb-4">Edit Contact</h2> 
       <form onSubmit={handleSubmit} className="space-y-4">
         <div>
           <label className="block mb-2">Name:</label>
           <input
             type="text"
             value={title}  Changed title to name
             onChange={(e) => setName(e.target.value)}  
             className="w-full px-4 py-2 border rounded-md"
           />
         </div>
         <div>
           <label className="block mb-2">Phone Number:</label>
           <textarea
             value={content}  Changed content to phoneNumber
             onChange={(e) => setPhoneNumber(e.target.value)}  
             className="w-full px-4 py-2 border rounded-md"
           />
         </div>
         <div>
           <label className="block mb-2">Email:</label>
           <input
             type="email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             className="w-full px-4 py-2 border rounded-md"
           />
         </div>
         <div>
           <label className="block mb-2">Company:</label>
           <input
             type="text"
             value={company}
             onChange={(e) => setCompany(e.target.value)}
             className="w-full px-4 py-2 border rounded-md"
           />
         </div>
         <div>
           <label className="block mb-2">Address:</label>
           <input
             type="text"
             value={address}
             onChange={(e) => setAddress(e.target.value)}
             className="w-full px-4 py-2 border rounded-md"
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

 export default EditContactModal;  


