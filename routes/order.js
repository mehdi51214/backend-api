const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders
} = require("../controllers/ordercontrol");

// ROUTES ONLY
router.post("/", createOrder);
router.get("/", getOrders);

module.exports = router;