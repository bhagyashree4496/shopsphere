import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { updateUserDetails } from "../api/api";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const Favorites = () => {
  const { state, dispatch } = useContext(ProductContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  const handleRemove = async (p) => {
    dispatch({ type: "ADD_REMOVE_FAVORITES", payload: p });
    if (user) {
      const remaining = state.favorites.filter((pro) => pro._id !== p._id);
      await updateUserDetails(user.uid, {
        favorites: [...remaining],
      });
    }
  };

  return (
    <div className=" p-6 rounded-md h-full  w-full min-w-[80vw] md:min-w-[500px] mx-auto overflow-y-scroll">
      <h2 className="text-xl font-bold mb-4">Your Favorites</h2>
      {state.favorites?.length > 0 ? (
        <div className="space-y-4">
          {state.favorites?.map((p) => (
            <div className="space-y-4">
              <div
                key={p?.id}
                className="flex items-center bg-white p-4 rounded-md shadow-md relative"
              >
                <img
                  src={p?.images[0]}
                  alt={p?.title}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold">{p?.title}</h3>

                  <p className="text-md text-gray-600">Price: ₹{p?.cost}</p>
                </div>
                <button
                  onClick={() => handleRemove(p)}
                  className="absolute text-white top-2 right-2 text-[12px] rounded-full bg-[#a749ff] p-1"
                >
                  <IoClose />
                </button>
              </div>
            </div>
          ))}

          {/* Total Price Section */}
        </div>
      ) : (
        <p className="text-gray-500">Your don't have favorites.</p>
      )}
    </div>
  );
};

export default Favorites;
