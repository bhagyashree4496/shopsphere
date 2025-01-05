const mongoose = require("mongoose");

// Define the Product Schema
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    cost: {
      type: Number,
      required: true,
      min: 0,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    howManyRated: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      trim: true,
    },
    weight: {
      type: String,
      trim: true,
    },
    dimensions: {
      type: String,
      trim: true,
    },
    material: {
      type: String,
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
