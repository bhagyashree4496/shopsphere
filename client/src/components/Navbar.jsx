import React, { useContext, useEffect, useState } from "react";
import { FaSearch, FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";
import Cart from "./Cart";
import { ProductContext } from "../context/ProductContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Favorites from "./Favorites";
import { UserContext } from "../context/UserContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import SearchProducts from "./SearchProducts";
import { IoClose, IoMenu } from "react-icons/io5";
const Navbar = ({
  profileDropdown,
  setProfileDropdown,
  searchDropdown,
  setSearchDropdown,
  cartDropdown,
  setCartDropdown,
  favoriteDropdown,
  setFavoriteDropdown,
}) => {
  const [homeDropdown, setHomeDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shopDropdown, setShopDropdown] = useState(false);
  const [query, setQuery] = useState("");
  const [totalCartItems, settotalCartItems] = useState(0);

  const { state } = useContext(ProductContext);
  const navigate = useNavigate();
  const { state: userState, dispatch } = useContext(UserContext);

  const [user, setUser] = useState(null);
  useEffect(() => setUser(userState.user), [userState.user]);
  useEffect(() => {
    const totala = state.cart?.reduce(
      (total, product) => total + product?.quantity,
      0
    );
    settotalCartItems(totala);
  }, [state.cart]);
  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out successfully!");
    setUser(null);
    dispatch({ type: "LOGOUT" });
  };
  return (
    <nav className="w-full bg-white p-2 py-4 md:px-8 flex items-center justify-between shadow-md fixed top-0 left-0 z-50">
      {/* Logo */}
      <div
        className="text-black font-bold text-xl md:text-4xl link-text"
        onClick={() => navigate("/")}
        style={{ color: "black" }}
      >
        ShopSphere
      </div>

      {/* Nav Links */}
      <ul className="hidden md:flex gap-8 font-semibold">
        <li
          className="link-text relative group"
          onClick={() =>
            setHomeDropdown((prev) => {
              return !prev;
            })
          }
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-black border-b-2 border-black" : ""
            }
          >
            Home
          </NavLink>
        </li>
        <li
          className="link-text relative group"
          onClick={() => setShopDropdown((prev) => !prev)}
        >
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive ? "text-black border-b-2 border-black" : ""
            }
          >
            Shop
          </NavLink>
        </li>

        <li className="link-text">
          <NavLink
            to="/blogs"
            className={({ isActive }) =>
              isActive ? "text-black border-b-2 border-black" : ""
            }
          >
            Blog
          </NavLink>
        </li>
      </ul>

      {/* Icons Section */}
      <div className="flex gap-3 md:gap-6 items-center text-gray-600">
        {/* Profile Icon */}
        <div className="relative">
          <FaUser
            className="cursor-pointer link-text text-[25px] md:text-[25px] "
            onClick={() => {
              setProfileDropdown(!profileDropdown);
              setFavoriteDropdown(false);
              setCartDropdown(false);
              setSearchDropdown(false);
            }}
          />
          {user ? (
            <div
              className={`dropdown-menu ${
                profileDropdown ? "open" : "invisible"
              } absolute right-0 top-8 bg-white shadow-lg p-2`}
            >
              <ul className="text-sm">
                <li className="py-2 px-1 hover:bg-gray-100 cursor-pointer whitespace-nowrap ">
                  <Link to="/profile">Profile</Link>
                </li>
                <li
                  className="py-2 px-1 hover:bg-gray-100 cursor-pointer whitespace-nowrap "
                  onClick={handleLogout}
                >
                  Log Out
                </li>
              </ul>
            </div>
          ) : (
            <div
              className={`dropdown-menu ${
                profileDropdown ? "open" : "invisible"
              } absolute right-0 top-8 bg-white shadow-lg p-2`}
            >
              <ul className="text-sm">
                <li className="py-2 px-1 hover:bg-gray-100 cursor-pointer whitespace-nowrap ">
                  <Link to="/auth">Login</Link>
                </li>
                <li className="py-2 px-1 hover:bg-gray-100 cursor-pointer whitespace-nowrap ">
                  <Link to="/auth">Register</Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Search Icon */}
        <div className="relative">
          <FaSearch
            className="cursor-pointer link-text text-[25px] md:text-[25px] font-thin"
            onClick={() => {
              setSearchDropdown(!searchDropdown);

              setFavoriteDropdown(false);
              setCartDropdown(false);
              setProfileDropdown(false);
            }}
          />
          <div
            className={`dropdown-menu  ${
              searchDropdown ? "open" : "invisible"
            } right-[-80px] absolute md:right-0 top-8 bg-white shadow-lg z-10 p-2 min-w-[80vw]  md:min-w-[500px] mx-auto rounded-md overflow-y-scroll max-h-[80vh]`}
          >
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 p-2 rounded-md w-[95%] fixed top-0"
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <SearchProducts query={query} />
          </div>
        </div>

        {/* Favorites Icon */}

        <div className="relative">
          <FaHeart
            className="cursor-pointer link-text text-[25px] md:text-[25px]"
            onClick={() => {
              setFavoriteDropdown(!favoriteDropdown);

              setSearchDropdown(false);
              setCartDropdown(false);
              setProfileDropdown(false);
            }}
          />

          {/* Cart Badge */}
          {state.favorites?.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white  text-[5px] md:text-xs font-bold w-3 h-3 md:w-5 md:h-5 flex items-center justify-center rounded-full">
              {state.favorites?.length}
            </span>
          )}
          <div
            className={`dropdown-menu ${
              favoriteDropdown ? "open" : "invisible"
            } absolute right-[-25px] md:right-0 top-8 bg-white shadow-lg p-2 rounded-md h-[90vh]`}
          >
            <Favorites />
          </div>
        </div>
        {/* Cart Icon */}
        <div className="relative">
          <FaShoppingCart
            className="cursor-pointer link-text text-[25px] md:text-[25px]"
            onClick={() => {
              setCartDropdown(!cartDropdown);

              setFavoriteDropdown(false);
              setFavoriteDropdown(false);
              setProfileDropdown(false);
            }}
          />
          {/* Cart Badge */}
          {state.cart?.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white  text-[5px] md:text-xs font-bold w-3 h-3 md:w-5 md:h-5 flex items-center justify-center rounded-full">
              {totalCartItems}
            </span>
          )}
          <div
            className={`dropdown-menu ${
              cartDropdown ? "open" : "invisible"
            } absolute right-0 top-8 bg-white shadow-lg p-2 rounded-md h-[90vh] md:h-[80vh]`}
          >
            <Cart />
          </div>
        </div>
        <div className="relative   md:hidden">
          <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <IoClose className="cursor-pointer link-text text-[30px] md:text-[25px] " />
            ) : (
              <IoMenu className="cursor-pointer link-text text-[30px] md:text-[25px] " />
            )}
          </div>
          <div
            className={`dropdown-menu ${
              isMenuOpen ? "open" : "invisible"
            } absolute right-0 top-8 bg-white shadow-lg p-2 w-[80vw] py-6`}
          >
            <ul className="font-semibold text-center">
              <li
                className="link-text relative group"
                onClick={() =>
                  setHomeDropdown((prev) => {
                    return !prev;
                  })
                }
              >
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-white bg-black block" : ""
                  }
                >
                  Home
                </NavLink>
              </li>
              <li
                className="link-text relative group"
                onClick={() => setShopDropdown((prev) => !prev)}
              >
                <NavLink
                  to="/shop"
                  className={({ isActive }) =>
                    isActive ? "text-white bg-black block" : ""
                  }
                >
                  Shop
                </NavLink>
              </li>

              <li className="link-text">
                <NavLink
                  to="/blogs"
                  className={({ isActive }) =>
                    isActive ? "text-white bg-black block" : ""
                  }
                >
                  Blog
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
