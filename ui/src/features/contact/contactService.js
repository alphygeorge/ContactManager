import axios from "axios";

const API_URL = "http://localhost:8000/contact/"; 

const addContact = async (contactData) => { 
  try {
    const response = await axios.post(API_URL + "add", contactData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
};

const getContacts = async (userId) => { 
  try {
    const response = await axios.get(API_URL + `view/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
};

const deleteContact = async (contactId) => { 
  try {
    const response = await axios.post(API_URL + "delete", { id: contactId });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
};

const updateContact = async (contactId, newTitle, newContent, newEmail, newCompany, newAddress) => { 
  try {
    const response = await axios.post(API_URL + "edit", {
      id: contactId,
      newContent: newContent,
      newTitle: newTitle,
      newEmail: newEmail,
      newCompany: newCompany,
      newAddress: newAddress,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
};

const contactService = { 
  addContact,
  getContacts,
  deleteContact,
  updateContact,
};

export default contactService;
