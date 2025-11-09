import axios from "axios";

const API = axios.create({
  baseURL: "https://p-p1.onrender.com/api",
  withCredentials: true,
});

// CREATE PRODUCT (with image upload)
export const createProduct = (data) =>
  API.post("/products", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// GET ALL PRODUCTS (supports search, category, price, pagination)
export const getAllProducts = (params) => API.get("/products", { params });

// GET PRODUCT BY ID
export const getProductById = (id) => API.get(`/products/${id}`);

// UPDATE PRODUCT
export const updateProduct = (id, data) =>
  API.put(`/products/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// DELETE PRODUCT
export const deleteProduct = (id) => API.delete(`/products/${id}`);

export default API;
