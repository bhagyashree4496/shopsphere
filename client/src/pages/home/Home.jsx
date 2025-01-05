import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import Slider from "../../components/Slider";
import { ProductContext } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { FaHeart } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import Features from "../../components/Features";
import Blogs from "../blogs/Blogs";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { updateUserDetails } from "../../api/api";
import Loader from "../../components/Loader";

const Home = () => {
  const { state, dispatch, loading } = useContext(ProductContext);
  console.log(state);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("bestseller"); // Default tab
  const [filteredProducts, setfilteredProducts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
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

  // Filter products based on the active tab
  useEffect(() => {
    const filteredproducts = state.products?.filter(
      (product) => product.badge === activeTab
    );

    setfilteredProducts(filteredproducts);
  }, [activeTab, state.products]);

  return (
    <div>
      <Slider />
      <Features />
      <main className="md:p-8 p-4">
        <section className="mb-16">
          <div className="flex items-center justify-center my-12">
            <div className="h-[2px] bg-black flex-1 md:ml-[30%]"></div>
            <h1 className="px-4 text-black text-3xl font-bold text-center capitalize">
              DAILY DEALS!
            </h1>
            <div className="h-[2px] bg-black flex-1 md:mr-[30%]"></div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-14">
            {["bestseller", "trending", "new arrival"].map((tab) => (
              <button
                key={tab}
                className={` px-2 md:px-4 py-2 mx-2 text-lg font-bold rounded-md ${
                  activeTab === tab ? "text-[#a749ff] " : "text-gray-600"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.replace(/^\w/, (c) => c.toUpperCase())}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-14 justify-items-center">
              {filteredProducts?.map((product, index) => (
                <div
                  key={index}
                  className="text-center shadow-md flex flex-col justify-between w-[270px] relative pb-5 rounded-md cursor-pointer"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <div
                    className={`${
                      state.favorites.some((pro) => pro._id === product._id)
                        ? "text-red-600"
                        : "text-[#a749ff]"
                    } z-10 p-4 flex items-center justify-center absolute top-0 right-0`}
                    onClick={(e) => {
                      e.stopPropagation();
                      addToFavorite(product);
                    }}
                  >
                    <FaHeart />
                  </div>
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
                  <h3 className="text-lg">{product.title}</h3>
                  <p className="text-gray-600 mt-2 font-semibold">
                    ₹{product.cost}
                  </p>

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
          )}
        </section>
        <Blogs />

        <section className="my-16" id="aboutus">
          <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
          <p className="text-center max-w-2xl mx-auto text-gray-700">
            ShopSphere is committed to providing high-quality products and
            services that enhance your life. From exclusive collections to
            exceptional service, we aim to deliver excellence at every step.
          </p>
        </section>

        <section id="constactus">
          <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
          <form className="max-w-xl mx-auto">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-[#F0E0FF] p-2 rounded-md"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-[#F0E0FF] p-2 rounded-md"
              />
            </div>
            <div className="mb-4">
              <textarea
                placeholder="Your Message"
                className="w-full border border-[#F0E0FF] p-2 rounded-md"
                rows="5"
              ></textarea>
            </div>
            <button className="w-full bg-[#F0E0FF] text-black py-2 rounded-md hover:bg-[#d0b3ff]">
              Send Message
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Home;
