import express from "express";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";

const router = express.Router();

// User signup
router.post("/", async (req, res) => {
  try {
    const { name, phoneNo, email, password, address } = req.body;

    if (!name || !phoneNo || !email || !password || !address) {
      return res.status(400).send({ message: "All fields are required." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      phoneNo,
      email,
      password: hashedPassword,
      address,
    });

    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: "All fields are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid credentials." });
    }

    res.status(200).send({ name: user.name });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default router;
