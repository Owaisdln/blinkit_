import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";

// Place Order
export const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total
    const totalAmount = cart.items.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);

    const order = await Order.create({
      user: userId,
      items: cart.items,
      totalAmount,
    });

    // Clear cart after order
    cart.items = [];
    await cart.save();

    res.status(201).json(order);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User Orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "items.product"
    );

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};