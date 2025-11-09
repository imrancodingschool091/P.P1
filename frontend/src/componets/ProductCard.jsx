// src/components/ProductCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/products/${product._id}`)}
      className="border rounded-2xl shadow-md bg-white hover:shadow-lg cursor-pointer transition-transform hover:scale-[1.02]"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-56 object-cover rounded-t-2xl"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
        <p className="text-green-600 font-bold mt-1">₹{product.price}</p>
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {product.description}
        </p>
        <button className="mt-3 w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
