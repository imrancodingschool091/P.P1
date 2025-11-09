// src/components/ProductList.jsx
import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center text-gray-600 py-10">
        No products found 😕
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
