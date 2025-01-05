import React, { useContext, useEffect, useState } from "react";

import { FaHeart, FaStar } from "react-icons/fa";
import { ProductContext } from "../context/ProductContext";
import { toast } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { updateUserDetails } from "../api/api";
import { saveToLocalStorage } from "../utils/FunctionsUtils";

const ProductDetails = ({ Product }) => {
  const [quantity, setQuantity] = useState(1);
  const { state, dispatch } = useContext(ProductContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const addToCart = async (product) => {
    console.log(product);
    const productExists = state.cart?.filter(
      (item) => item.Product._id === product.Product._id
    );
    console.log(productExists);
    if (productExists.length > 0) {
      const remainingProducts = state.cart.filter(
        (item) => item.Product._id !== product.Product._id
      );

      if (user) {
        await updateUserDetails(user.uid, {
          cartItems: [...remainingProducts, { ...product }],
        });
      }
    } else {
      if (user) {
        await updateUserDetails(user.uid, {
          cartItems: [...state?.cart, { ...product }],
        });
      } else {
        saveToLocalStorage("h-cart-items", [{ ...product }]);
      }
    }
    dispatch({ type: "ADD_TO_CART", payload: product });

    toast.success("Item added to cart!", {
      position: "bottom-right",
    });
  };
  const addToFavorite = async (product) => {
    console.log(product);
    dispatch({ type: "ADD_REMOVE_FAVORITES", payload: product });

    toast.success("Item added to Favorites!", {
      position: "bottom-right",
    });
    if (user) {
      const remaining = state.favorites.filter((fa) => fa._id !== product._id);
      state.favorites.some((pro) => pro._id === product._id)
        ? await updateUserDetails(user.uid, {
            favorites: [...remaining],
          })
        : await updateUserDetails(user.uid, {
            favorites: [...state.favorites, { ...product }],
          });
    }
  };
  return (
    <div className="space-y-4">
      {/* Title */}
      <h1 className="text-2xl font-bold">{Product?.title}</h1>

      {/* Cost */}
      <p className="text-lg text-red-600">₹{Product?.cost} </p>

      {/* Rating */}
      <div className="flex items-center">
        <div className="flex items-center gap-1">
          {Array(5)
            .fill()
            .map((_, i) => (
              <span
                key={i}
                className={
                  i < Math.floor(Product?.rating)
                    ? "text-yellow-400"
                    : "text-gray-400"
                }
              >
                <FaStar />
              </span>
            ))}
        </div>
        <span className="ml-2 text-gray-500">
          {Product?.howManyRated}{" "}
          <span className="text-[#a749ff]">Reviews</span>
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600">{Product?.description}</p>

      {/* Add to Cart Section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 bg-gray-200 "
            onClick={() => {
              setQuantity((q) => Math.max(1, q - 1));
            }}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            className="px-3 py-1 bg-gray-200 "
            onClick={() => {
              setQuantity((q) => q + 1);
            }}
          >
            +
          </button>
        </div>
        <button
          className="bg-black text-white px-6 py-2  "
          onClick={() => {
            addToCart({ Product, quantity });
          }}
        >
          Add to Cart
        </button>
        <button
          className={` hover:text-[#a749ff] ${
            state.favorites.some((pro) => pro._id === Product._id)
              ? "text-red-600"
              : "text-gray-600"
          }`}
          onClick={() => {
            addToFavorite(Product);
          }}
        >
          <FaHeart />
        </button>
      </div>

      {/* Categories and Tags */}

      <div>
        <p className="text-gray-500">Categories: {Product?.category}</p>
        <div className="text-gray-500 flex">
          Tags:
          {Product?.tags.map((tag) => (
            <p className="text-gray-500">{tag},</p>
          ))}
        </div>
        <p className="text-gray-500">Weight: {Product?.weight}</p>
        <p className="text-gray-500">Dimensions: {Product?.dimensions}</p>
        <p className="text-gray-500">Material: {Product?.material}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
