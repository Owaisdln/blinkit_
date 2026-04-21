import express from "express";
import cors from "cors";

// Routes
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";

const app = express();

// =======================
// MIDDLEWARE
// =======================
app.use(cors());
app.use(express.json());

// =======================
// TEST ROUTE
// =======================
app.get("/", (req, res) => {
  res.send("API is running...");
});

// =======================
// API ROUTES
// =======================
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// =======================
// 404 HANDLER (Optional but good)
// =======================
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;