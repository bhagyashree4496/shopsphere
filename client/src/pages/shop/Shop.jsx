import React, { useContext, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaStar } from "react-icons/fa";
import { FaFilter } from "react-icons/fa6";
import Loader from "../../components/Loader";

const Shop = () => {
  const { state, dispatch, loading } = useContext(ProductContext);
  const navigate = useNavigate();

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [rating, setRating] = useState(0);
  const [openFilter, setOpenFilter] = useState(false);
  const addToFavorite = (product) => {
    dispatch({ type: "ADD_REMOVE_FAVORITES", payload: product });
  };

  // Filtered products
  const filteredProducts = state.products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesPrice =
      product.cost >= priceRange[0] && product.cost <= priceRange[1];
    const matchesRating = Math.floor(product.rating) >= rating;

    return matchesCategory && matchesPrice && matchesRating;
  });
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div
        className="text-xl font-bold mb-4 flex gap-2 items-center px-6 justify-end underline cursor-pointer md:hidden"
        onClick={() => setOpenFilter(!openFilter)}
      >
        <span>Filters </span>
        <FaFilter />
      </div>
      <div className="md:flex relative">
        {/* Sidebar */}{" "}
        <aside
          className={` ${
            !openFilter ? "invisible" : "open"
          } absolute top-0  md:visible bg-gray-200 md:bg-white md:static z-20 px-6 py-4 md:w-1/4 md:p-6 border-r border-gray-200 `}
        >
          <h2 className="text-xl font-bold mb-4 hidden md:block">Filters</h2>
          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Categories</h3>
            <div className="md:flex flex-col gap-2 space-x-2">
              {[
                "Furniture",
                "Office Furniture",
                "Home Decor",
                "Kitchen",
                "Bedding",
                "Lighting",
                "Electronics",
                "Fitness",
                "Storage",
                "Personal Care",
                "Garden",
              ].map((cat) => (
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      e.target.checked === true
                        ? setSelectedCategory(cat)
                        : setSelectedCategory("all");
                    }}
                  ></input>{" "}
                  {cat}
                </label>
              ))}
            </div>
          </div>
          {/* Price Range Filter */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Price Range</h3>
            <input
              type="range"
              min="0"
              max="500"
              step="10"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, Number(e.target.value)])}
              className="w-full"
            />
            <p className="text-sm text-gray-600">
              ₹{priceRange[0]} - ₹{priceRange[1]}
            </p>
          </div>
          {/* Rating Filter */}
          <div>
            <h3 className="font-semibold mb-2">Minimum Rating</h3>
            <div className="flex items-center">
              {Array(5)
                .fill()
                .map((_, i) => (
                  <span
                    key={i}
                    className={`cursor-pointer ${
                      i < rating ? "text-yellow-400" : "text-gray-400"
                    }`}
                    onClick={() => setRating(i + 1)}
                  >
                    <FaStar />
                  </span>
                ))}
            </div>
          </div>
        </aside>
        {/* Product Grid */}
        <main className="flex-1 px-6 md:p-6">
          <h1 className="text-2xl font-bold mb-6">Shop</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {filteredProducts.map((product, index) => (
              <div
                key={index}
                className="text-center shadow-md flex flex-col justify-between w-[270px] relative pb-5 rounded-md cursor-pointer"
                onClick={() => navigate(`/product/${product._id}`)}
              >
                {/* Favorite Icon */}
                <div
                  className={`${
                    state.favorites.some((pro) => pro._id === product._id)
                      ? "text-red-600"
                      : "text-[#a749ff]"
                  } z-10 p-4 flex items-center justify-center absolute top-0 right-0`}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent navigation on favorite click
                    addToFavorite(product);
                  }}
                >
                  <FaHeart />
                </div>
                {/* Product Images */}
                <div className="h-48 w-[270px] bg-gray-200 mb-4 maincontainer">
                  <div className="front h-48 w-[270px]">
                    <img
                      src={product.images[0]}
                      className="w-[270px] h-full object-cover rounded-t-md"
                      alt={product.title}
                    />
                  </div>
                  <div className="back h-48 w-[270px]">
                    <img
                      src={product.images[1]}
                      className="w-[270px] h-full object-cover rounded-t-md"
                      alt={product.title}
                    />
                  </div>
                </div>
                {/* Product Details */}
                <h3 className="text-lg">{product.title}</h3>
                <p className="text-gray-600 mt-2 font-semibold">
                  ₹{product.cost}
                </p>
                {/* Rating */}
                <div className="flex items-center justify-center mt-3 gap-1">
                  {Array(5)
                    .fill()
                    .map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < Math.floor(product?.rating)
                            ? "text-yellow-400"
                            : "text-gray-400"
                        }
                      >
                        <FaStar />
                      </span>
                    ))}
                </div>
              </div>
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <p className="text-center text-gray-600 mt-8">No products found</p>
          )}
        </main>
      </div>
    </>
  );
};

export default Shop;
