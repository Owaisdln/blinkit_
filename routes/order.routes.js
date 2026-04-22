import express from "express";
import {
  placeOrder,
  getOrders,
} from "../controllers/order.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, placeOrder);
router.get("/", protect, getOrders);

export default router;