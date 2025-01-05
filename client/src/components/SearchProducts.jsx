import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";

function SearchProducts({ query }) {
  const [filterProducts, setFilterProducts] = useState();
  const { state, dispatch } = useContext(ProductContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (query == "") {
      setFilterProducts([]);
    } else {
      const items = state.products.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      console.log(items);
      setFilterProducts(items);
    }
  }, [query]);
  if (filterProducts?.length <= 0) {
    return <div className="text-center p-2 pt-10">No results found</div>;
  }
  return (
    <div className="pt-10 rounded-md h-full  w-full ">
      {filterProducts?.map((p) => (
        <div
          className="space-y-4"
          onClick={() => navigate(`/product/${p._id}`)}
        >
          <div
            key={p?._id}
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
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchProducts;
