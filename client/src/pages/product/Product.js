// src/ProductPage.js
import React, { useEffect, useState } from "react";
import ProductSlider from "../../components/ProductSlider";
import ProductDetails from "../../components/ProductDetails";
import { useParams } from "react-router-dom";
import { getProductById } from "../../api/api";
import Loader from "../../components/Loader";

const Product = () => {
  const [Product, setProduct] = useState();
  const state = useParams();

  const fetchProductsById = async () => {
    const data = await getProductById(state.id);
    setProduct(data);
    console.log();
  };
  useEffect(() => {
    fetchProductsById();
  }, []);
  if (!Product) {
    return <Loader />;
  }
  return (
    <div className="container mx-auto p-6 flex flex-col md:flex-row gap-8">
      {/* Section 1: Image Slider */}
      <div className="w-full md:w-1/2 ">
        <ProductSlider images={Product?.images} />
      </div>

      {/* Section 2: Product Details */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <ProductDetails Product={Product} />
      </div>
    </div>
  );
};

export default Product;
