import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { updateUserDetails } from "../api/api";

const Cart = () => {
  const { state, dispatch } = useContext(ProductContext);
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleRemove = async (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
    if (user) {
      const remaining = state.cart.filter((pro) => pro.Product._id !== id);
      await updateUserDetails(user.uid, {
        cartItems: [...remaining],
      });
    }
  };

  useEffect(() => {
    const totalPrice = state.cart?.reduce((total, product) => {
      return total + Number(product?.Product?.cost) * Number(product?.quantity);
    }, 0);
    setTotal(totalPrice);
  }, [state.cart]);

  const handleCheckout = async () => {
    const amount = Number(total * 0.9); // Total after discount

    // Create Razorpay order
    const response = await fetch(
      "http://localhost:5000/api/payment/create-order",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      }
    );

    const order = await response.json();

    // Razorpay Checkout Options
    const options = {
      key: "rzp_test_rJpuP312ME0AyC", // Replace with Razorpay Test Key ID
      amount: order.amount,
      currency: order.currency,
      name: "Your Store Name",
      description: "Thank you for shopping with us!",
      image: "https://your-logo-url.com/logo.png", // Replace with your logo URL
      order_id: order.id,
      handler: function (response) {
        alert(
          `Payment successful! Payment ID: ${response.razorpay_payment_id}`
        );
        // You can send the payment response to the backend for verification here
      },
      prefill: {
        name: user?.displayName || "Customer Name",
        email: user?.email || "customer@example.com",
        contact: "9999999999", // Replace with customer's phone number
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="p-6 rounded-md h-full w-full min-w-[80vw] md:min-w-[500px] mx-auto overflow-y-scroll">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {state?.cart?.length > 0 ? (
        <div className="space-y-4">
          {state?.cart?.map((p) => (
            <div
              className="space-y-4"
              onClick={() => navigate(`/product/${p?.Product?._id}`)}
              key={p?.Product?._id}
            >
              <div className="flex items-center bg-white p-4 rounded-md shadow-md relative">
                <img
                  src={p?.Product?.images[0]}
                  alt={p?.Product?.title}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold">{p?.Product?.title}</h3>
                  <p className="text-md text-gray-600">
                    Quantity: {p?.quantity}
                  </p>
                  <p className="text-md text-gray-600">
                    Price: ₹{p?.Product?.cost * p?.quantity}
                  </p>
                </div>
                <button
                  onClick={() => handleRemove(p?.Product?._id)}
                  className="absolute text-white top-2 right-2 text-[12px] rounded-full bg-[#a749ff] p-1"
                >
                  <IoClose />
                </button>
              </div>
            </div>
          ))}

          {/* Total Price Section */}
          <div className="flex justify-between items-center border-t pt-2">
            <p className="text-lg font-semibold">Total MRP:</p>
            <p className="text-lg font-semibold">₹{total.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center border-t pt-2">
            <p className="text-lg font-semibold">Discount on MRP:</p>
            <p className="text-lg font-semibold">₹{(0.1 * total).toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center border-t pt-2">
            <p className="text-lg font-semibold">Total Amount:</p>
            <p className="text-lg font-semibold">₹{(0.9 * total).toFixed(2)}</p>
          </div>
          {/* Checkout Button */}
          <div className="flex flex-col gap-2 items-center justify-center">
            <button onClick={handleCheckout} className="button-primary p-3">
              <span className="z-10">CHECKOUT</span>
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
