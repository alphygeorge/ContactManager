import React, { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import ContactItem from "../components/ContactItem";
import { useSelector, useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { fetchContacts } from "../features/contact/contactSlice"; 

function Search() {
  const { contacts, isLoading } = useSelector((state) => state.contact);
  const { user } = useSelector((state) => state.auth); 
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (user) {
      dispatch(fetchContacts(user._id))
        .unwrap()
        .then((contacts) => {
          
        })
        .catch((error) => console.error("Error fetching contacts:", error));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    const filteredContacts = contacts.filter(
      (contact) =>
        contact.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.content.includes(searchTerm)
    );
    setSearchResults(filteredContacts);
  }, [searchTerm, contacts]);

  const handleContactChanged = () => {
    if (user) {
      dispatch(fetchContacts(user._id))
        .unwrap()
        .then((contacts) => {
          
        })
        .catch((error) => console.error("Error fetching contacts:", error));
    }
  };

  return (
    <>
      <SideBar />
      <div className="h-full w-full flex flex-col items-center text-2xl">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Search Contacts</h1>

        <div className="mt-8 w-full px-8">
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md mb-4"
            placeholder="Search by Name or Number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {isLoading ? (
            <ClipLoader
              color="#00CED1"
              loading={isLoading}
              size={150}
              aria-label="Loading Spinner"
              className="flex m-auto"
            />
          ) : (
            <div className="w-full">
              {searchResults.length > 0 ? (
                searchResults.map((contact) => (
                  <ContactItem
                    key={contact._id}
                    contact={contact}
                    onEdit={handleContactChanged}
                    onDelete={handleContactChanged}
                  />
                ))
              ) : (
                <p><center>No contacts found.</center></p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Search;
