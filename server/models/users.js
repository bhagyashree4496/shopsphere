const mongoose = require("mongoose");
const Product = require("./products"); // Import Product schema

const orderSchema = new mongoose.Schema({
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: "Pending" }, // e.g., Pending, Shipped, Delivered
  orderDate: { type: Date, default: Date.now },
});

// Embed the entire Product schema into cartItems
const usersSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], // Reference to products
  cartItems: [
    {
      Product: {
        // Change `Product` to lowercase `product` for consistency
        type: mongoose.Schema.Types.ObjectId,
        ref: Product, // Reference the Product model
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  previousOrders: [orderSchema], // Array of order subdocuments
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Users", usersSchema);
