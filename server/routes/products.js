const express = require("express");
const {
  getAllItems,
  getItemById,
  getItemByIds,
} = require("../controllers/products");

const router = express.Router();

// GET all items
router.get("/get", getAllItems);

// GET an item by ID
router.get("/get/:id", getItemById);

router.post("/getbyids", getItemByIds);
module.exports = router;
