import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000/api', withCredentials: true });


export const register=(data)=> API.post("/auth/register",data);
export const login=(data)=>API.post("/auth/login",data);
export const refresh=()=>API.post("/auth/refresh");
export const getProfile=(token)=>API.get("/user/profile",{headers:{Authorization: `Bearer ${token}`}})
export const logout=()=>API.post("/auth/logout")