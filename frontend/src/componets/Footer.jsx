import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-green-100 text-gray-700 py-10 mt-10">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* Left */}
        <div>
          <h2 className="text-2xl font-bold text-green-700 mb-3">ShopEase</h2>
          <p className="text-sm">
            Your one-stop destination for everyday essentials and premium
            products. Shop smart, shop easy.
          </p>
        </div>

        {/* Center */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-green-700">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-700">
                Shop
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-700">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-700">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Right */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <Facebook className="w-5 h-5 text-green-700 cursor-pointer hover:scale-110 transition" />
            <Twitter className="w-5 h-5 text-green-700 cursor-pointer hover:scale-110 transition" />
            <Instagram className="w-5 h-5 text-green-700 cursor-pointer hover:scale-110 transition" />
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-8">
        © {new Date().getFullYear()} ShopEase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
