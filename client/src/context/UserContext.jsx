// userContext.js
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { auth } from "../firebase"; // Make sure you have Firebase set up correctly
import { getProductById, getProductByIds, getuserByUid } from "../api/api";
import { onAuthStateChanged } from "firebase/auth";
import { ProductContext } from "./ProductContext";

// Initial State
const initialState = {
  user: null, // User information
  isAuthenticated: false, // User authentication state
};

// Reducer Function
const userReducer = (state, action) => {
  console.log(action.payload, "hi");
  switch (action.type) {
    case "SET_USER":
      return { user: action.payload, isAuthenticated: true };
    case "LOGOUT":
      return { user: null, isAuthenticated: false };
    default:
      return state;
  }
};

// Create Context
export const UserContext = createContext();

// Context Provider
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const { dispatch: productDispatch } = useContext(ProductContext);
  const fetchData = async (id) => {
    const data = await getuserByUid(id);
    if (data.user) {
      const products = await getProductByIds(data.user.cartItems, "cart");
      const favProds = await getProductByIds(data.user.favorites, "fav");
      dispatch({ type: "SET_USER", payload: data.user });
      productDispatch({ type: "INIT_CART", payload: products });
      productDispatch({ type: "INIT_FAVORITES", payload: favProds });
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser?.uid) {
        fetchData(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
