import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Profile = () => {
  const { state } = useContext(UserContext);

  const [user, setUser] = useState(null);
  useEffect(() => setUser(state.user), []);
  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out successfully!");
  };
  if (!user) return <div>Please log in to view this page.</div>;
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">User Details</h1>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Personal Information</h2>
        <p>
          <span className="font-medium">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-medium">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-medium">Phone:</span> {user.phoneNumber}
        </p>
        <p>
          <span className="font-medium">Address:</span> {user.address}
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Favorites</h2>
        {user.favorites.length > 0 ? (
          <ul className="list-disc pl-5">
            {user.favorites.map((favorite, index) => (
              <li key={index}>{favorite}</li>
            ))}
          </ul>
        ) : (
          <p>No favorites added yet.</p>
        )}
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Cart Items</h2>
        {user.cartItems.length > 0 ? (
          <ul className="list-disc pl-5">
            {user.cartItems.map((item) => (
              <li key={item._id}>
                <span className="font-medium">ID:</span> {item._id},
                <span className="font-medium"> Quantity:</span> {item.quantity}
              </li>
            ))}
          </ul>
        ) : (
          <p>No items in the cart.</p>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold">Previous Orders</h2>
        {user.previousOrders.length > 0 ? (
          <ul className="list-disc pl-5">
            {user.previousOrders.map((order, index) => (
              <li key={index}>
                <span className="font-medium">Order ID:</span> {order._id},
                <span className="font-medium"> Total Amount:</span>{" "}
                {order.totalAmount}
              </li>
            ))}
          </ul>
        ) : (
          <p>No previous orders.</p>
        )}
      </div>
      <button
        onClick={handleLogout}
        className="py-2 px-4 border-black border-2 mt-4 font-bold"
      >
        Log out
      </button>
    </div>
  );
};

export default Profile;
