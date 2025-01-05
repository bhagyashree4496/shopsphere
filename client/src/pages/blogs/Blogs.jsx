import React from "react";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const navigate = useNavigate();

  const blogPosts = [
    {
      id: 1,
      title: "Top 10 Home Decor Trends in 2024",
      excerpt:
        "Discover the latest home decor trends that will elevate your living space. From minimalist designs to bold accents...",
      image:
        "https://plus.unsplash.com/premium_photo-1670360414946-e33a828d1d52?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9tZSUyMGRlY29yfGVufDB8fDB8fHww", // Replace with the actual image URL
      url: "https://example.com/top-10-home-decor-trends-2024",
    },
    {
      id: 2,
      title: "How to Choose the Perfect Furniture for Your Home",
      excerpt:
        "Choosing the right furniture can transform your space. Learn the tips and tricks for selecting furniture that fits your style and needs...",
      image:
        "https://images.unsplash.com/photo-1543248939-ff40856f65d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9tZSUyMGRlY29yfGVufDB8fDB8fHww", // Replace with the actual image URL
      url: "https://example.com/how-to-choose-perfect-furniture",
    },
    {
      id: 3,
      title: "Lighting Tips for a Cozy and Inviting Home",
      excerpt:
        "The right lighting can make all the difference. Explore our tips for creating a warm and welcoming atmosphere in your home...",
      image:
        "https://images.unsplash.com/photo-1519961655809-34fa156820ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvbWUlMjBkZWNvcnxlbnwwfHwwfHx8MA%3D%3D", // Replace with the actual image URL
      url: "https://example.com/lighting-tips-cozy-home",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Our Blog
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between"
            >
              <a href={post.url} target="_blank" rel="noopener noreferrer">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              </a>
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">
                  <a href={post.url} target="_blank" rel="noopener noreferrer">
                    {post.title}
                  </a>
                </h2>
                <p className="text-gray-600 mt-2">{post.excerpt}</p>
                <button
                  onClick={() => window.open(post.url, "_blank")}
                  className="mt-4 bg-black text-white py-2 px-4 rounded hover:bg-[#a749ff]"
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
