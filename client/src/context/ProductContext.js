import React, { createContext, useEffect, useReducer } from "react";
import { getProducts } from "../api/api";

// Initial State
const initialState = {
  products: [], // List of all products
  cart: [], // Items in the cart
  favorites: [],
};

// Reducer Function
const productReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "INIT_CART":
      return { ...state, cart: [...action.payload] };
    case "INIT_FAVORITES":
      return { ...state, favorites: [...action.payload] };
    case "ADD_TO_CART": {
      const productExists = state.cart?.filter(
        (item) => item.Product._id === action.payload.Product._id
      );

      if (productExists.length > 0) {
        const remainingProducts = state.cart.filter(
          (item) => item.Product._id !== action.payload.Product._id
        );
        return action.payload.quantity === productExists.quantity
          ? state
          : {
              ...state,
              cart: [...remainingProducts, { ...action.payload }],
            };
      }

      // Product does not exist, add with quantity 1
      else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload }],
        };
      }
    }
    case "ADD_REMOVE_FAVORITES": {
      const productExists = state.favorites.some(
        (item) => item._id === action.payload._id
      );
      console.log(productExists);
      if (productExists) {
        console.log(action.payload);
        const remainingProducts = state.favorites.filter(
          (item) => item._id !== action.payload._id
        );
        return {
          ...state,
          favorites: [...remainingProducts],
        };
      }

      // Product does not exist, add with quantity 1
      else {
        console.log(action.payload);
        return {
          ...state,
          favorites: [...state.favorites, { ...action.payload }],
        };
      }
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.Product._id !== action.payload),
      };

    case "CLEAR_CART":
      return { ...state, cart: [] };

    default:
      return state;
  }
};

// Create Context
export const ProductContext = createContext();

// Context Provider
export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        console.log(products);
        dispatch({ type: "SET_PRODUCTS", payload: products });
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};
