import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold mb-4 text-red-500">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-lg mb-6 text-gray-600">
        Oops! The page you're looking for doesn't exist.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 text-black bg-white rounded-lg shadow-md hover:bg-[#a749ff] focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;
