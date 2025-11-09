import React from 'react'
import { useDispatch, } from 'react-redux'
import { logoutLocal } from '../features/auth/AuthSlice';
import { logout } from '../features/auth/AuthAPI';

function DashboardPage() {
  const disptach=useDispatch();

  const handleLogout=()=>{
    disptach(logoutLocal());
    logout()
    alert("logout succesfully")

  }

  return (
    <div>
      <h1>Dashboard Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default DashboardPage
