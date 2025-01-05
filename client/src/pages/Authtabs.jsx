import React, { useContext, useState } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "react-toastify";
import { createUserDetails, getuserByUid, updateUserDetails } from "../api/api";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
const AuthTabs = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const { dispatch } = useContext(UserContext);
  const { state, dispatch: productDispatch } = useContext(ProductContext);
  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      toast.success("Login successful!");
      if (state.cart || state.favourites) {
        await updateUserDetails(userCredential.user.uid, {
          cartItems: [...state.cart],
          favourites: [...state.favorites],
        });
      }
      const data = await getuserByUid(userCredential.user.uid);
      console.log(data);
      dispatch({ type: "SET_USER", payload: data.user });
      productDispatch({ type: "INIT_CART", payload: data.user.cartItems });
      productDispatch({ type: "INIT_FAVORITES", payload: data.user.favorites });
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      const cartItems = [...state.cart];
      const favourites = [...state.favorites];
      const data = await createUserDetails(
        userCredential.user.uid,
        name,
        address,
        phone,
        email,
        cartItems,
        favourites
      );
      console.log(data.user);
      dispatch({ type: "SET_USER", payload: data.user });
      toast.success("Register successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-start min-h-screen mt-16">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        {/* Tabs */}
        <div className="flex border-b border-gray-300">
          <button
            className={`w-1/2 text-center py-2 ${
              activeTab === "login"
                ? "text-violet-600 border-b-4 border-violet-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`w-1/2 text-center py-2 ${
              activeTab === "register"
                ? "text-violet-600 border-b-4 border-violet-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </div>

        {/* Content */}
        <div className="mt-6" onSubmit={handleLoginSubmit}>
          {activeTab === "login" && (
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-4 py-2 text-gray-700 border border-gray-300 placeholder-gray-400 focus:outline-none "
              />
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 text-gray-700 border border-gray-300 placeholder-gray-400 focus:outline-none "
              />
              <button
                type="submit"
                className="w-full py-2 text-black bg-gray-200 hover:text-white hover:bg-violet-600 transition-colors"
              >
                Login
              </button>
            </form>
          )}
          {activeTab === "register" && (
            <form className="space-y-4" onSubmit={handleRegisterSubmit}>
              <input
                type="text"
                value={name}
                placeholder="Name"
                onChange={handleNameChange}
                className="w-full px-4 py-2 text-gray-700 border border-gray-300 placeholder-gray-400 focus:outline-none "
              />
              <input
                type="email"
                value={email}
                placeholder="Email"
                onChange={handleEmailChange}
                className="w-full px-4 py-2 text-gray-700 border border-gray-300 placeholder-gray-400 focus:outline-none "
              />
              <input
                type="text"
                value={phone}
                placeholder="Phone Number"
                onChange={handlePhoneChange}
                className="w-full px-4 py-2 text-gray-700 border border-gray-300 placeholder-gray-400 focus:outline-none "
              />
              <input
                type="text"
                value={address}
                placeholder="Address"
                onChange={handleAddressChange}
                className="w-full px-4 py-2 text-gray-700 border border-gray-300 placeholder-gray-400 focus:outline-none "
              />
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 text-gray-700 border border-gray-300 placeholder-gray-400 focus:outline-none "
              />
              <button
                type="submit"
                className="w-full py-2 text-black bg-gray-200 hover:text-white hover:bg-violet-600 transition-colors"
              >
                Register
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthTabs;
