const Products = require("../models/products");

// GET all items
const getAllItems = async (req, res) => {
  const products = await Products.find();

  res.json(products);
};

// GET an item by ID
const getItemById = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    // Use await with findById to fetch the item
    const item = await Products.findById(id);

    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getItemByIds = async (req, res) => {
  const { cartItems, type } = req.body; // Receive an array of cart items
  try {
    if (type === "cart") {
      // Extract all Product IDs from cartItems
      const productIds = cartItems.map((item) => item.Product);

      // Fetch all products with the given IDs
      const products = await Products.find({ _id: { $in: productIds } });
      // For cart: Include product details along with quantity
      const cartItemsWithDetails = cartItems.map((item) => {
        const product = products.find(
          (prod) => prod._id.toString() === item.Product
        );
        return {
          Product: product ? product.toObject() : null, // Include Product details
          quantity: item.quantity, // Include quantity
        };
      });

      res.json(cartItemsWithDetails);
    } else if (type === "fav") {
      // For favorites: Include product details only
      const favoritesWithDetails = await Products.find({
        _id: { $in: cartItems },
      });

      res.json(favoritesWithDetails);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

module.exports = { getAllItems, getItemById, getItemByIds };
