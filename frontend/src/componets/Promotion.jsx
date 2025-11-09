import React from "react";

const Promotion = () => {
  return (
    <section className="bg-white py-12 px-6 md:px-20">
      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div className="p-6 border rounded-2xl hover:shadow-lg transition">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
            alt="Free Shipping"
            className="w-16 h-16 mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Free Shipping
          </h3>
          <p className="text-gray-600 text-sm">
            Get free delivery on all orders above ₹999.
          </p>
        </div>

        <div className="p-6 border rounded-2xl hover:shadow-lg transition">
          <img
            src="https://cdn-icons-png.flaticon.com/512/879/879757.png"
            alt="Secure Payment"
            className="w-16 h-16 mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Secure Payments
          </h3>
          <p className="text-gray-600 text-sm">
            Your transactions are 100% safe and encrypted.
          </p>
        </div>

        <div className="p-6 border rounded-2xl hover:shadow-lg transition">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2821/2821637.png"
            alt="Easy Returns"
            className="w-16 h-16 mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Easy Returns
          </h3>
          <p className="text-gray-600 text-sm">
            Hassle-free 7-day return policy on all items.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Promotion;
