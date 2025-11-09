import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError, clearMessage } from "../features/auth/AuthSlice";
import { successMsg, errorMsg } from "../utils/message"


function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.auth);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  // ✅ Show toast messages & clear Redux state
  useEffect(() => {
    if (message) {
      successMsg(message);
      dispatch(clearMessage());
    }
    if (error) {
      errorMsg(error);
      dispatch(clearError());
    }
  }, [message, error, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
     

      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
        <h1 className="text-3xl font-semibold text-green-600 text-center mb-6">
          Create an Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInput}
              required
              className="w-full px-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none transition"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInput}
              required
              className="w-full px-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none transition"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInput}
              required
              className="w-full px-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none transition"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold text-lg transition-all duration-200 shadow-md ${
              loading
                ? "bg-green-300 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 hover:shadow-lg"
            }`}
          >
            {loading ? "Please wait..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-5">
          Already have an account?{" "}
          <a href="/login" className="text-green-600 font-medium hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
