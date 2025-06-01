const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
// Import bcrypt for password hashing
const jwt = require("jsonwebtoken"); // Import JWT for token generation
const User = require("../models/userModel"); // Import the User model

//@desc register a new user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields"); // This will be caught by the error handler middleware
  }
  // Logic for user registration
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already exists"); // If user already exists, throw an error
  }
  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);
  // Hash the password with a salt rounds of 10
  console.log("the hashed password is:", hashedPassword);
  const user = await User.create({
    username,
    email,
    password: hashedPassword, // Save the hashed password
  });
  console.log("the user is:", user);
  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data"); // If user creation fails, throw an error
  }

});

//@desc login user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  // Logic for user registration
  const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please add all fields"); // This will be caught by the error handler middleware
    }
    const user = await User.findOne({ email });
    //compare the password with the hashed password in the database
    if (user && (await bcrypt.compare(password, user.password))) {
        // If user exists and password matches
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                },
            },
            process.env.ACCESS_TOKEN_SECRET, // Use your secret key from environment variables
            { expiresIn: "2h" } // Token expiration time
        );
res.status(200).json({accessToken});
        
    }
    else {
        res.status(401);
        throw new Error("Invalid credentials"); // If user not found or password doesn't match, throw an error
    }
});

//@desc current user info
// @route GET /api/users/current
// @access Private
const currentUser = asyncHandler(async (req, res) => {
  // Logic for user registration
  res.json(req.user); // Return the current user information from the request object
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
  // Add other user-related functions here
};
