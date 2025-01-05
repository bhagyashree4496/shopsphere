const User = require("../models/users");

// Update or add user details
exports.createUserDetails = async (req, res) => {
  const { uid, name, address, phoneNumber, email, cartItems, favorites } =
    req.body;

  // Validate required fields
  if (!uid || !name || !address || !phoneNumber || !email) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Verify Firebase ID token (optional, for added security)

    // Find or create the user
    let user = await User.findOne({ uid });

    if (!user) {
      // Create a new user if not found
      user = new User({
        uid,
        name,
        address,
        phoneNumber,
        email,
        cartItems,
        favorites,
      });
    } else {
      // Update existing user details
      user.name = name;
      user.address = address;
      user.phoneNumber = phoneNumber;
      user.email = email;
      user.cartItems = [...cartItems];
      user.favorites = [...favorites];
    }

    // Save the user data to the database
    await user.save();

    return res
      .status(200)
      .json({ message: "User details updated successfully.", user });
  } catch (error) {
    console.error("Error updating user details:", error);
    return res.status(500).json({ message: "Internal server error.", error });
  }
};

exports.updateUserDetails = async (req, res) => {
  const { uid } = req.params;
  const updateFields = req.body;

  try {
    // Validate UID
    if (!uid) {
      return res.status(400).json({ message: "UID is required in the URL." });
    }

    // Find the user by UID
    let user = await User.findOne({ uid });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update user fields dynamically
    for (const key in updateFields) {
      if (Object.hasOwnProperty.call(updateFields, key)) {
        user[key] = updateFields[key];
      }
    }

    await user.save();

    return res.status(200).json({
      message: "User details updated successfully.",
      user,
    });
  } catch (error) {
    console.error("Error updating user details:", error);
    return res.status(500).json({ message: "Internal server error.", error });
  }
};
exports.getUserDetails = async (req, res) => {
  const { uid } = req.params;

  try {
    // Validate UID
    if (!uid) {
      return res.status(400).json({ message: "UID is required in the URL." });
    }

    // Find the user by UID
    const user = await User.findOne({ uid });
    // .populate("favorites")
    // .populate("cartItems.product._id");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Return the user details
    return res.status(200).json({
      message: "User details retrieved successfully.",
      user,
    });
  } catch (error) {
    console.error("Error retrieving user details:", error);
    return res.status(500).json({ message: "Internal server error.", error });
  }
};
