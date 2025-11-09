import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, logoutLocal } from "../features/auth/AuthSlice";
import { LogOut } from "lucide-react";

function ProfilePage() {
  const dispatch = useDispatch();
  const { user, loading, error, accessToken } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg font-medium text-gray-600">
        Loading profile...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg">
        {error}
      </div>
    );

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        No profile found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        {/* Profile Avatar */}
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 rounded-full bg-indigo-200 flex items-center justify-center text-4xl font-semibold text-indigo-700">
            {user.name?.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Profile Info */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          {user.name}
        </h1>
        <p className="text-gray-500 mb-6">{user.email}</p>


        {/* Buttons */}
        <button
          onClick={() => dispatch(logoutLocal())}
          className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white w-full py-2.5 rounded-lg font-medium transition duration-200"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
