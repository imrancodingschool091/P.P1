import express from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controller/product.controller.js"
import { upload } from "../middleware/upload.js";
const router = express.Router();

// Upload single product image + create product
router.post("/", upload.single("image"), createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", upload.single("image") ,updateProduct);
router.delete("/:id", deleteProduct);


export default router;
