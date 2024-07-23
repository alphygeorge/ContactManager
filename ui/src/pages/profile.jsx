 import React, { useEffect } from "react";
 import SideBar from "../components/SideBar";
 import { useSelector, useDispatch } from "react-redux";
 import { logout } from "../features/auth/authSlice";
 import { useNavigate } from "react-router-dom";

 function ProfilePage() {
   const { user } = useSelector((state) => state.auth);  
   const dispatch = useDispatch();
   const navigate = useNavigate();

   useEffect(() => {
     console.log("User:", user);  
   }, [user]);

   const handleLogout = () => {
     dispatch(logout());
     navigate("/signin");
   };

   const profilePicUrl = user.profilePic || "https:via.placeholder.com/150"; 

   return (
     <>
       <SideBar />
       <div className="relative h-full w-full">
         <button
           className="absolute top-0 right-0 m-4 px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-500"
           onClick={handleLogout}
         >
           Logout
         </button>
         <div className="h-screen w-full flex flex-col items-center text-2xl">
           <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Your Profile</h1>

           {/* Profile Picture Section */}
           <div className="mt-8 mb-8">
             <img
               src={profilePicUrl}
               alt="Profile"
               className="w-48 h-48 rounded-full object-cover"
             />
           </div>

           {/* Profile Information Section */}
           <div className="flex items-center justify-center mt-12 bg-gray-200 p-6 rounded-lg shadow-lg">
             <div className="text-left">
               <p className="mb-2"><strong>Name:</strong> {`${user.firstName} ${user.lastName}`}</p>
               <p className="mb-2"><strong>Email:</strong> {user.email}</p>
               <p className="mb-2"><strong>DOB:</strong> {user.dob ? new Date(user.dob).toLocaleDateString() : '-'}</p>
               <p className="mb-2"><strong>Gender:</strong> {user.gender || '-'}</p>
               <p className="mb-2"><strong>Address:</strong> {user.address || '-'}</p>
               <p className="mb-2"><strong>Phone Number:</strong> {user.phoneNumber || '-'}</p>
             </div>
           </div>
         </div>
       </div>
     </>
   );
 }

 export default ProfilePage;

