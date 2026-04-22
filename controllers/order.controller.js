import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { address, phone } = req.body;

    if (!address || !phone) {
      return res.status(400).json({
        message: "Address and phone are required",
      });
    }

    const cart = await Cart.findOne({ user: userId }).populate(
      "items.product"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalAmount = cart.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: userId,
      items: cart.items,
      totalAmount,
      address,
      phone,
    });

    // clear cart
    cart.items = [];
    await cart.save();

    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error placing order" });
  }
};