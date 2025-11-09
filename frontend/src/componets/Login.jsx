import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError, clearMessage } from "../features/auth/AuthSlice";
import { useNavigate } from "react-router-dom";
import { successMsg, errorMsg } from "../utils/message"

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message, accessToken } = useSelector((s) => s.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData));
    if (loginUser.fulfilled.match(result)) {
      navigate("/dashboard");
    }
  };

  // ✅ Toast messages for success/error
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
        <h2 className="text-3xl font-semibold text-green-600 text-center mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none transition"
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-grow h-px bg-gray-200"></div>
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-200"></div>
        </div>

        {/* Google Login */}
        <div className="text-center">
          <a
            href="http://localhost:5000/api/auth/google"
            className="inline-block w-full border border-green-300 text-green-700 font-medium py-2 rounded-lg hover:bg-green-100 transition"
          >
            Sign in with Google
          </a>
        </div>

        {/* Register link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="text-green-600 font-medium hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
