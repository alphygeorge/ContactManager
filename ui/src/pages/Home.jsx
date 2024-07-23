import React, { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import AddContactModal from "../components/AddContactModal";
import ContactItem from "../components/ContactItem"; 
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { fetchContacts } from "../features/contact/contactSlice";
import ClipLoader from "react-spinners/ClipLoader";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortedContacts, setSortedContacts] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { contacts, isLoading } = useSelector((state) => state.contact);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  useEffect(() => {
    if (user) {
      dispatch(fetchContacts(user._id))
        .unwrap()
        .then((contacts) => {
          setSortedContacts(contacts.slice().sort((a, b) => a.title.localeCompare(b.title)));
        })
        .catch((error) => toast.error("Error fetching contacts: " + error));
    }
  }, [dispatch, user]);

  const handleContactChanged = () => {
    if (user) {
      dispatch(fetchContacts(user._id))
        .unwrap()
        .then((contacts) => {
          setSortedContacts(contacts.slice().sort((a, b) => a.title.localeCompare(b.title)));
        })
        .catch((error) => toast.error("Error fetching contacts: " + error));
    }
  };

  return (
    <>
      <SideBar />
      <button
        className="absolute top-0 right-0 m-4 px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-500"
        onClick={handleLogout}
      >
        Logout
      </button>
      <div className="h-screen w-full flex flex-col items-center text-2xl ">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome {user.firstName} {user.lastName}
        </h1>
        

        <div className="bg-gray-200 flex flex-col h-screen w-full m-auto">
          <div className="m-5 flex justify-center">
            <button
              className="border rounded-md bg-blue-800 text-white py-1 px-2 hover:bg-blue-500"
              onClick={() => setIsModalOpen(true)}
            >
              Add Contact
            </button>
          </div>


          <div className="mt-8 w-full px-8">
          <h2 className="text-2xl font-bold mb-4">Contacts</h2>
        </div>   

        
          <div className="m-5 flex flex-col max-h-96 overflow-y-auto">
            {isLoading ? (
              <ClipLoader
                color="#00CED1"
                loading={isLoading}
                size={150}
                aria-label="Loading Spinner"
                className="flex m-auto"
              />
            ) : sortedContacts.length > 0 ? (
              sortedContacts.map((contact) => (
                <ContactItem
                  key={contact._id}
                  contact={contact}
                  onEdit={handleContactChanged}
                  onDelete={handleContactChanged}
                />
              ))
            ) : (
              <p>No contacts available.</p>
            )}
          </div>
        </div>
      </div>
      <AddContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onContactAdded={handleContactChanged}
      />
    </>
  );
}

export default Home;
