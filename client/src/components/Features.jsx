import React from "react";
import { FaShippingFast, FaHeadset, FaUndo, FaTags } from "react-icons/fa";

const Features = () => {
  const featureData = [
    {
      icon: <FaShippingFast className="text-black text-4xl" />,
      title: "Free Shipping",
      description: "Free shipping on all orders",
    },
    {
      icon: <FaHeadset className="text-black text-4xl" />,
      title: "Support 24/7",
      description: "Support 24 hours a day",
    },
    {
      icon: <FaUndo className="text-black text-4xl" />,
      title: "Money Return",
      description: "30 days for free return",
    },
    {
      icon: <FaTags className="text-black text-4xl" />,
      title: "Order Discount",
      description: "10% off on your first order",
    },
  ];

  return (
    <div className="  px-5 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-6 justify-items-start">
        {featureData.map((feature, index) => (
          <div
            key={index}
            className="flex items-center bg-white   p-4 transition-transform transform hover:scale-105"
          >
            <div className="mr-4">{feature.icon}</div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
