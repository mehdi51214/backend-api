const express = require("express");
const router = express.Router();

const {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productcontrol");

const { verifyToken, isAdmin } = require("../middleware/verifytoken");

// ===============================
// 📦 GET ALL PRODUCTS (PUBLIC)
// ===============================
router.get("/", getProducts);

// ===============================
// ➕ ADD PRODUCT (ADMIN ONLY)
// ===============================
router.post("/", verifyToken, isAdmin, createProduct);

// ===============================
// ❌ DELETE PRODUCT (ADMIN ONLY)
// ===============================
router.delete("/:id", verifyToken, isAdmin, deleteProduct);

// ===============================
// ✏️ UPDATE PRODUCT (ADMIN ONLY)
// ===============================
router.put("/:id", verifyToken, isAdmin, updateProduct);

module.exports = router;