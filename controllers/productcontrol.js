const Product = require("../models/productsmdl");

// ===============================
// 📦 GET ALL PRODUCTS
// ===============================
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// ➕ CREATE PRODUCT
// ===============================
const createProduct = async (req, res) => {
  try {
    const { name, price, image, description } = req.body;

    if (!name || !price || !image) {
      return res.status(400).json({ message: "All fields required" });
    }

    const product = await Product.create({
      name,
      price,
      image,
      description,
    });

    res.json({
      message: "Product added successfully",
      product,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// ❌ DELETE PRODUCT
// ===============================
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// ✏️ UPDATE PRODUCT
// ===============================
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// export
module.exports = {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
};