const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  userId: String,

  cart: [
    {
      name: String,
      price: Number,
      image: String,
      quantity: Number
    }
  ],

  totalPrice: Number,

  address: String,

  paymentMethod: String,

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Order", orderSchema);