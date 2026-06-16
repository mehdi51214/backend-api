const Order = require("../models/orderModel");

// ======================
// 🔥 CREATE ORDER
// ======================
const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);

    res.json({
      message: "Order placed successfully",
      order
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ======================
// 🔥 GET ALL ORDERS (ADMIN)
// ======================
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders
};