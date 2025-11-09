// src/pages/ProductDetails.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../features/product/productSlice"
import Loader from "../componets/Loader"

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleProduct, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  if (isLoading) return <Loader />;

  if (!singleProduct)
    return <div className="text-center py-20 text-gray-600">Product not found</div>;

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row gap-10 bg-white shadow-md rounded-2xl p-6">
        <img
          src={singleProduct.image}
          alt={singleProduct.name}
          className="w-full md:w-1/2 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h2 className="text-3xl font-semibold text-green-700 mb-3">
            {singleProduct.name}
          </h2>
          <p className="text-lg text-gray-700 mb-2">
            Category: <span className="font-semibold">{singleProduct.category}</span>
          </p>
          <p className="text-2xl text-green-600 font-bold mb-4">
            ₹{singleProduct.price}
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            {singleProduct.description}
          </p>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
