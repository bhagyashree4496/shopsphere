import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/home/Home";
import "./App.css";
import Shop from "./pages/shop/Shop";
import Blogs from "./pages/blogs/Blogs";
import Product from "./pages/product/Product";
import NotFound from "./pages/other/NotFound";
import { ProductContext, ProductProvider } from "./context/ProductContext";

import Checkout from "./pages/Checkout";
import AuthTabs from "./pages/Authtabs";

import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "./utils/FunctionsUtils";
import Profile from "./pages/Profile";
const App = () => {
  const { state, dispatch } = useContext(ProductContext);
  useEffect(() => {
    saveToLocalStorage("cart", state?.cart);
    saveToLocalStorage("favorites", state?.favorites);
  }, [state.cart, state.favorites]);
  useEffect(() => {
    const savedCart = loadFromLocalStorage("cart");
    const savedFavorites = loadFromLocalStorage("favorites");
    dispatch({ type: "INIT_CART", payload: savedCart });
    dispatch({ type: "INIT_FAVORITES", payload: savedFavorites });
  }, []);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [searchDropdown, setSearchDropdown] = useState(false);
  const [cartDropdown, setCartDropdown] = useState(false);
  const [favoriteDropdown, setFavoriteDropdown] = useState(false);
  return (
    <Router>
      <Navbar
        profileDropdown={profileDropdown}
        setProfileDropdown={setProfileDropdown}
        searchDropdown={searchDropdown}
        setSearchDropdown={setSearchDropdown}
        cartDropdown={cartDropdown}
        setCartDropdown={setCartDropdown}
        favoriteDropdown={favoriteDropdown}
        setFavoriteDropdown={setFavoriteDropdown}
      />
      <div
        className="pt-16"
        onClick={() => {
          setSearchDropdown(false);
          setFavoriteDropdown(false);
          setCartDropdown(false);
          setProfileDropdown(false);
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/blogs" element={<Blogs />} />

          <Route path="/Auth" element={<AuthTabs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </div>
      <footer className="w-full bg-black text-white py-4 text-center">
        <p>&copy; 2024 Heavenly. All rights reserved.</p>
      </footer>
    </Router>
  );
};

export default App;
