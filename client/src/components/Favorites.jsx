import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const { state, dispatch } = useContext(ProductContext);
  const navigate = useNavigate();
  const handleRemove = (id) => {
    // dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  return (
    <div className=" p-6 rounded-md h-full  w-full min-w-[80vw] md:min-w-[500px] mx-auto overflow-y-scroll">
      <h2 className="text-xl font-bold mb-4">Your Favorites</h2>
      {state.favorites?.length > 0 ? (
        <div className="space-y-4">
          {state.favorites?.map((p) => (
            <div
              className="space-y-4"
              onClick={() => navigate(`/product/${p?.id}`)}
            >
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
                  onClick={() => handleRemove(p?.id)}
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
