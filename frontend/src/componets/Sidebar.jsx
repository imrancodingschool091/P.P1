// src/components/Sidebar.jsx
import React, { useState } from "react";

const Sidebar = ({ filters, onFilterChange, onApplyFilters, onReset }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (e) => {
    setLocalFilters({ ...localFilters, [e.target.name]: e.target.value });
  };

  const handleApply = () => {
    onFilterChange(localFilters);
    onApplyFilters();
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-5 w-full md:w-64">
      <h3 className="text-lg font-semibold mb-4 text-green-700">Filters</h3>

      <div className="space-y-4">
        {/* Search */}
        <div>
          <label className="text-sm text-gray-600">Search</label>
          <input
            type="text"
            name="search"
            value={localFilters.search}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
            placeholder="Search product..."
          />
        </div>

        {/* Category */}
        <div>
          <label className="text-sm text-gray-600">Category</label>
          <input
            type="text"
            name="category"
            value={localFilters.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
            placeholder="e.g. electronics"
          />
        </div>

        {/* Price Range */}
        <div>
          <label className="text-sm text-gray-600">Price Range</label>
          <div className="flex gap-2 mt-1">
            <input
              type="number"
              name="minPrice"
              value={localFilters.minPrice}
              onChange={handleChange}
              className="w-1/2 border rounded-lg p-2"
              placeholder="Min"
            />
            <input
              type="number"
              name="maxPrice"
              value={localFilters.maxPrice}
              onChange={handleChange}
              className="w-1/2 border rounded-lg p-2"
              placeholder="Max"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handleApply}
            className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700"
          >
            Apply
          </button>
          <button
            onClick={onReset}
            className="border border-gray-300 px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
