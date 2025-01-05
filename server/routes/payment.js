const express = require("express");
const Razorpay = require("razorpay");
const router = express.Router();

const razorpay = new Razorpay({
  key_id: "rzp_test_rJpuP312ME0AyC", // Replace with your Razorpay Test Key ID
  key_secret: "BrjMqPDGxnO2dkbWJDgwG7Dl", // Replace with your Razorpay Test Key Secret
});

// Create Order Route
router.post("/create-order", async (req, res) => {
  const { amount } = req.body;

  // Razorpay order options
  const options = {
    amount: amount * 100, // Amount in paise (1 INR = 100 paise)
    currency: "INR", // Currency (can be INR or other supported currencies)
    receipt: `order_rcptid_${Math.random()}`,
    payment_capture: 1, // 1 for automatic payment capture, 0 for manual
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error("Error creating order", error);
    res.status(500).json({ error: "Failed to create order" });
  }
});

module.exports = router;
