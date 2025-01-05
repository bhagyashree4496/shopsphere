const express = require("express");
const {
  updateUserDetails,
  createUserDetails,
  getUserDetails,
} = require("../controllers/user");

const router = express.Router();

// Define the route for updating user details
router.post("/create-user", createUserDetails);
router.put("/update-user/:uid", updateUserDetails);
router.get("/:uid", getUserDetails);
module.exports = router;
