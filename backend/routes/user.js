const { Router } = require("express");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const router = Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../ui/public/uploads'); 
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`); 
  }
});

const upload = multer({ storage });

// @desc User login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    
    console.log("User first name:", user.firstName);
    console.log("User last name:", user.lastName);
    console.log("User email:", user.email);
    console.log("User dob:", user.dob);
    console.log("User profilepic:", user.profilePic);
    console.log("User id:", user._id);
    console.log("User id:", user.gender);
    console.log("User id:", user.address);
    console.log("User id:", user.phoneNumber);

    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      dob: user.dob,
      gender: user.gender,
      address: user.address,
      phoneNumber: user.phoneNumber,
      profilePic: user.profilePic,
      token: generateToken(user._id),

    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials!");
  }
});

// @desc Register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, dob, gender, address, phoneNumber } = req.body;

  if (!firstName || !lastName || !email || !password || !gender || !address || !phoneNumber) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
     res.status(400).json({ message: "User already exists!" });
    return;
  }

  let profilePic;
  if (req.file) {
    profilePic = `/uploads/${req.file.filename}`; 
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    dob,
    profilePic, 
    gender,
    address,
    phoneNumber,
  });

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      dob: newUser.dob,
      profilePic: newUser.profilePic,
      gender:newUser.gender,
      address:newUser.address,
      phoneNumber:newUser.phoneNumber,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Data!");
  }
});

// @desc Get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      dob: user.dob,
      profilePic: user.profilePic,
      gender: user.gender,
      address: user.address,
      phoneNumber: user.phoneNumber,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, "abc123", { expiresIn: "1d" });
};

// Route handlers
router.post("/signup", upload.single('profilePic'), registerUser);
router.post("/signin", loginUser);
router.get("/profile", getUserProfile);

module.exports = router;
