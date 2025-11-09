import React from "react";
import { ShoppingBag } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="bg-green-50 py-16 px-6 md:px-20 text-center">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-center mb-4">
          <ShoppingBag className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-green-600">ShopEase</span>
        </h1>
        <p className="text-gray-600 mb-6">
          Discover amazing products at unbeatable prices — shop smarter and
          faster with ShopEase.
        </p>
        <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full shadow-md transition">
          Start Shopping
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
