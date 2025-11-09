import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllProducts as getProductsAPI,
  getProductById as getProductByIdAPI,
  createProduct as createProductAPI,
  updateProduct as updateProductAPI,
  deleteProduct as deleteProductAPI,
} from "../product/productAPI"

// ================== ASYNC THUNKS ==================

// CREATE PRODUCT
export const createProduct = createAsyncThunk(
  "products/create",
  async (formData, thunkAPI) => {
    try {
      const res = await createProductAPI(formData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to create product"
      );
    }
  }
);

// GET ALL PRODUCTS
export const getAllProducts = createAsyncThunk(
  "products/getAll",
  async (queryParams = {}, thunkAPI) => {
    try {
      const res = await getProductsAPI(queryParams);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

// GET PRODUCT BY ID
export const getProductById = createAsyncThunk(
  "products/getById",
  async (id, thunkAPI) => {
    try {
      const res = await getProductByIdAPI(id);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to fetch product"
      );
    }
  }
);

// UPDATE PRODUCT
export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await updateProductAPI(id, data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to update product"
      );
    }
  }
);

// DELETE PRODUCT
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, thunkAPI) => {
    try {
      const res = await deleteProductAPI(id);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to delete product"
      );
    }
  }
);

// ================== INITIAL STATE ==================
const initialState = {
  products: [],
  singleProduct: null,
  isLoading: false,
  isError: false,
  message: "",
  total: 0,
  totalPages: 1,
  page: 1,
  filters: {
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  },
};

// ================== SLICE ==================
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearError: (state) => {
      state.isError = false;
      state.message = "";
    },
    clearMessage: (state) => {
      state.message = "";
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = {
        search: "",
        category: "",
        minPrice: "",
        maxPrice: "",
      };
    },
  },
  extraReducers: (builder) => {
    // CREATE PRODUCT
    builder.addCase(createProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products.unshift(action.payload.product);
      state.message = action.payload.message || "Product created successfully";
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // GET ALL PRODUCTS
    builder.addCase(getAllProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload.products;
      state.total = action.payload.total;
      state.totalPages = action.payload.totalPages;
      state.page = action.payload.page;
      state.message = "Products fetched successfully";
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // GET PRODUCT BY ID
    builder.addCase(getProductById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singleProduct = action.payload.product;
    });
    builder.addCase(getProductById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // UPDATE PRODUCT
    builder.addCase(updateProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.products.findIndex(
        (p) => p._id === action.payload.product._id
      );
      if (index !== -1) {
        state.products[index] = action.payload.product;
      }
      state.message = "Product updated successfully";
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // DELETE PRODUCT
    builder.addCase(deleteProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = state.products.filter(
        (p) => p._id !== action.meta.arg
      );
      state.message = "Product deleted successfully";
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { clearError, clearMessage, setFilters, resetFilters } =
  productSlice.actions;
export default productSlice.reducer;
