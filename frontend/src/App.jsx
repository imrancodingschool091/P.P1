import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import DashboardPage from "./pages/DashboardPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import { setAccessToken, logoutLocal } from "./features/auth/AuthSlice"
import * as api from "./features/auth/AuthAPI"
import OAuthSuccess from "./pages/OAuthSuccess";
import ProtectedRoute from "./componets/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import Navbar from "./componets/Navbar";
import ProductPage from "./pages/ProductPage";
import ProductDetails from "./pages/ProductDetails";
import Footer from "./componets/Footer";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getNewAccessToken = async () => {
      try {
        const res = await api.refresh(); // calls /auth/refresh
        if (res.data?.accessToken) {
          dispatch(setAccessToken(res.data.accessToken));
        }
      } catch (err) {
        // refresh failed (invalid / expired cookie)
        dispatch(logoutLocal());
        console.log("Refresh token expired, please login again");
      }
    };

    // Run once when the app loads
    getNewAccessToken();
  }, [dispatch]);

  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/oauth-success" element={<OAuthSuccess/>}/>
         <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
      <ToastContainer/>
      <Footer/>
    </>
  );
}

export default App;
