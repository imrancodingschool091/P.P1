import { Product } from "../model/product.model.js";
import { uploadOnCloudinary } from "../config/cloudinary.js";
import fs from "fs"


//CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const { name, description, category, size, color, stock, price, isActive } = req.body;
    const file = req.file;

    // Validation
    if (!name || !description || !category || !size || !color || !stock || !price) {
      return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    if (!file) {
      return res.status(400).json({ success: false, message: "Product image is required!" });
    }

    // Upload image to Cloudinary
    const result = await uploadOnCloudinary(file.path);
    if (!result) {
      return res.status(500).json({ success: false, message: "Image upload failed!" });
    }

    // Create product
    const product = await Product.create({
      name,
      description,
      category,
      size,
      color,
      stock,
      price,
      isActive: isActive ?? true,
      image: result.secure_url,
    });

    // Delete local file
    fs.unlink(file.path, (err) => {
      if (err) console.error("Failed to delete local file:", err);
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully!",
      product,
    });
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const { search, minPrice, maxPrice, category, page, limit } = req.query;

    const PageNumber = Number(page) || 1;
    const PageLimit = Number(limit) || 30;
    const skip = (PageNumber - 1) * PageLimit;

    const filter = {};

    if (category) filter.category = category;

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const totalDocumentCounts = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .skip(skip)
      .limit(PageLimit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: totalDocumentCounts,
      page: PageNumber,
      limit: PageLimit,
      totalPages: Math.ceil(totalDocumentCounts / PageLimit),
      products,
    });
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// GET PRODUCT BY ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found!" });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Get Product By ID Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category, price, stock, color, size, isActive } = req.body;
    const file = req.file;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found!" });
    }

    // Upload new image if provided
    let imageUrl = product.image;
    if (file) {
      const result = await uploadOnCloudinary(file.path);
      if (result) imageUrl = result.secure_url;

      fs.unlink(file.path, (err) => {
        if (err) console.error("Failed to delete local file:", err);
      });
    }

    // Update fields
    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.category = category ?? product.category;
    product.price = price ?? product.price;
    product.stock = stock ?? product.stock;
    product.color = color ?? product.color;
    product.size = size ?? product.size;
    product.isActive = typeof isActive === "boolean" ? isActive : product.isActive;
    product.image = imageUrl;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      product,
    });
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found!" });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
    });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};
