import axios from "axios";

const API_URL = "http://localhost:8000/user/";

const register = async (userData) => {
  const response = await axios.post(API_URL + "signup", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "signin", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

//Logout user
const logout = () => localStorage.removeItem("user");


const authService = {
  register,
  login,
  logout,
  
};

export default authService;
