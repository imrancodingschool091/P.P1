// src/pages/ProductPage.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, setFilters, resetFilters } from "../features/product/productSlice"
import ProductList from "../componets/ProductList"
import Sidebar from "../componets/Sidebar";
import Loader from "../componets/Loader";

const ProductPage = () => {
  const dispatch = useDispatch();
  const { products, filters, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProducts(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
  };

  const handleApplyFilters = () => {
    dispatch(getAllProducts(filters));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
    dispatch(getAllProducts({}));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <Sidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          onApplyFilters={handleApplyFilters}
          onReset={handleResetFilters}
        />

        {/* Product List */}
        <div className="flex-1">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-4 text-green-700">
                Shop Products
              </h2>
              <ProductList products={products} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
