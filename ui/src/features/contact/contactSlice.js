import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contactService from "./contactService"; 

const initialState = {
  contacts: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const fetchContacts = createAsyncThunk( 
  "contacts/fetchContacts",
  async (userId) => {
    try {
      return await contactService.getContacts(userId); 
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const addContact = createAsyncThunk("contacts/addContact", async (contactData) => { 
  try {
    return await contactService.addContact(contactData); 
  } catch (error) {
    throw new Error(error.message);
  }
});

export const deleteContact = createAsyncThunk( 
  "contacts/deleteContact",
  async (contactId) => {
    try {
      return await contactService.deleteContact(contactId); 
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const updateContact = createAsyncThunk( 
  "contacts/updateContact",
  async ({ contactId, newContent, newTitle, newEmail, newCompany, newAddress }) => {
    try {
      return await contactService.updateContact(contactId, newTitle, newContent, newEmail, newCompany, newAddress); 
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const contactSlice = createSlice({
  name: "contacts", 
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = "";
        state.contacts = action.payload; 
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => { 
        state.contacts.push(action.payload); 
      })
      .addCase(deleteContact.fulfilled, (state, action) => { 
        state.contacts = state.contacts.filter((contact) => contact._id !== action.payload); 
      })
      .addCase(updateContact.fulfilled, (state, action) => { 
        const updatedContactIndex = state.contacts.findIndex(
          (contact) => contact._id === action.payload._id
        );
        if (updatedContactIndex !== -1) {
          state.contacts[updatedContactIndex] = action.payload; 
        }
      });
  },
});

export default contactSlice.reducer;
