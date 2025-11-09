import React, { useEffect, useState } from "react";
import axios from "axios";

function VerifyEmailPage() {
  const [status, setStatus] = useState("loading"); 
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Invalid or missing verification token.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/auth/verify-email?token=${token}`
        );
        setStatus("success");
        setMessage(res.data.message || "Email verified successfully!");
      } catch (err) {
        setStatus("error");
        setMessage(
          err.response?.data?.message ||
            "Verification failed. Please try again."
        );
      }
    };

    verifyEmail();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center">
        <h1 className="text-3xl font-semibold text-green-600 mb-4">
          Email Verification
        </h1>

        {/* Loading State */}
        {status === "loading" && (
          <p className="text-gray-600 animate-pulse">
            Verifying your email, please wait...
          </p>
        )}

        {/* Success State */}
        {status === "success" && (
          <div className="bg-green-100 text-green-700 p-4 rounded-lg">
            <p className="font-medium">✅ {message}</p>
          </div>
        )}

        {/* Error State */}
        {status === "error" && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg">
            <p className="font-medium">❌ {message}</p>
          </div>
        )}

        {/* Go to Login Button */}
        {status === "success" && (
          <button
            onClick={() => (window.location.href = "/login")}
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Go to Login
          </button>
        )}

        {/* Error Retry Button */}
        {status === "error" && (
          <button
            onClick={() => window.location.reload()}
            className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Retry Verification
          </button>
        )}
      </div>
    </div>
  );
}

export default VerifyEmailPage;
