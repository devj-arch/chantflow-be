import express from "express"
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import authenticate from "../middleware/authMiddleware.js";

dotenv.config();
const router = express.Router();

function generateAccessToken(userId) {
  return jwt.sign({ userId }, process.env.ACCESS_SECRET, { expiresIn: "1h" })
}

function generateRefreshToken(userId) {
  return jwt.sign({ userId }, process.env.REFRESH_SECRET, { expiresIn: "7d" })
}


//Signup Endpoint
router.post('/signup', async(req, res) => {
  try {
    const {name, email, password} = req.body
    let user = await User.findOne({email})

    if(user) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password.toString().trim(), 10)
    user = new User({ name, email, password: hashedPassword})
    await user.save()

    res.status(201).json({ message: 'User registered successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
    console.error(err)
  }
})

//Login Route
router.post('/login', async(req, res) => {
  const { email, password} = req.body

  try {
    let user = await User.findOne({email})
    if(!user) return res.status(401).json({ msg: "Invalid credentials" })

    const isMatch = await bcrypt.compare(password.toString().trim(), user.password)

    if(!isMatch) return res.status(401).json({ msg: "Invalid credentials" })

    const accessToken = generateAccessToken(user._id)
    const refreshToken = generateRefreshToken(user._id)

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "None",
      maxAge: 60 * 60 * 1000,
    })

    res.status(200).json({ userId: user._id, name: user.name });
  } catch(err) {
    console.error('Login error:', err);
    res.status(500).json({ msg: "Server error" });
  }
})

//Fetch Profile
router.get('/profile', authenticate, async(req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password")
    res.json(user)
  } catch (error) {
    console.log('error: ', error);
    res.status(500).json({ msg: "Server error" });
  }
})

//Logout Endpoint
router.post("/logout", (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
  });
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
  });
  res.json({ msg: "Logged out successfully" });
});

export default router
