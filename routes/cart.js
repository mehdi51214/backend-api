const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  removeItem,
  clearCart,
} = require("../controllers/cartcontrol");

router.post("/add", addToCart);
router.get("/:userId", getCart);
router.delete("/item/:id", removeItem);
router.delete("/clear/:userId", clearCart);

module.exports = router;