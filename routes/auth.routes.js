import express from "express";
import {
  registerUser,
  loginUser,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// =======================
// AUTH ROUTES
// =======================

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

// Get Current Logged-in User
router.get("/me", protect, (req, res) => {
  res.json(req.user);
});

export default router;