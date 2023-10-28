const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

mongoose
  .connect("mongodb+srv://samikpandit25:*123*@cluster0.cm0yell.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB.");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", err);
  });

app.listen(port, () => {
  console.log("Server is running on port 8000.");
});

const User = require("./models/user");
const Order = require("./models/order");

// Function to send Verification e-mail to the user.
const sendVerificationEmail = async (email, verificationToken) => {
  // Create a nodemailer transport

  const transporter = nodemailer.createTransport({
    // Configure the e-mail service
    service: "gmail",
    auth: {
      user: "samikpandit25@gmail.com",
      pass: "jvgl sygu rpmb ecuj",
    },
  });

  // Compose the e-mail message
  const mailOptions = {
    from: "amazon.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email : http://localhost:8000/verify/${verificationToken}`,
  };

  // Send the e-mail
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error sending verification email ", error);
  }
};

//endpoint to register in the app
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    // Create a new User
    const newUser = new User({ name, email, password });

    // Generate and store the Verification Token.
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    // Save the user to the database
    await newUser.save();

    // Send Verification email to the user
    sendVerificationEmail(newUser.email, newUser.verificationToken);
  } catch (error) {
    console.log("Error registering user.", error);
    res.status(500).json({ message: "Registration failed." });
  }
});

// Endpoint to verify the e-mail
app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    // Find the user with the given verification token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid Verification token" });
    }

    // Mark the user as verified
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    res.status(200).json({ message: "Email verified successfully." });
  } catch (error) {
    res.status(500).json({ message: "Email Verification failed." });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};

const secretKey = generateSecretKey();

// Endpoint to login the user
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if the password is correct or not.
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    // Generate a token
    const token = jwt.sign({ userId: user._id }, secretKey);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login Failed." });
  }
});

// Endpoint to store a new address to the backend
app.post("/addresses", async (req, res) => {
  try {
    const { userId, address } = req.body;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the new address to the user's addresses array
    user.addresses.push(address);

    //Save the updated user in the backend
    await user.save();

    res.status(200).json({ message: "Address created successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error adding address", error });
  }
});

// Endpoint to get all the addresses of a particular user
app.get("/addresses/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const addresses = user.addresses;
    res.status(200).json({ addresses });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the addresses" });
  }
});

// Endpoint to store all the orders
app.post("/orders", async (req, res) => {
  try {
    const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } =
      req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create an array of product objects from the Cart items
    const products = cartItems.map((item) => ({
      name: item?.title,
      quantity: item.quantity,
      price: item.price,
      image: item?.image,
    }));

    // Create a new order
    const order = new Order({
      user: userId,
      products: products,
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
    });

    await order.save();

    res.status(200).json({ message: "Order created successfully!" });
  } catch (error) {
    console.log("Error creating orders :", error);
    res.status(500).json({ message: "Error creating orders" });
  }
});

// Get the user profile
app.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the user profile." });
  }
});

app.get("/orders/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const orders = await Order.find({ user: userId }).populate("user");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});
