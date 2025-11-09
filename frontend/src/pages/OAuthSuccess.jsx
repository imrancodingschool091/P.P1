import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAccessToken } from '../features/auth/AuthSlice';
import { useDispatch } from 'react-redux';


export default function OAuthSuccess() {
    const disptach=useDispatch()
  const nav = useNavigate();
 

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('accessToken');
    if (token) {
      disptach(setAccessToken(token))
      nav('/dashboard');
    } else {
      nav('/login');
    }
  }, []);

  return <div>Signing in...</div>;
}
