import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const removeFromCartDB = createAsyncThunk(
  "cart/removeFromCartDB",
  async (cartItemId) => {
    await axios.delete(
      `http://localhost:3001/api/cart/${cartItemId}`
    );
    return cartItemId;
  }
);
export const addToCartDB = createAsyncThunk(
  "cart/addToCartDB",
  async (item) => {
    const res = await axios.post("http://localhost:3001/api/cart/add", {
      userId: "123",     
      productId: item._id,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
    });
    return res.data;
  }
);

export const fetchCartDB = createAsyncThunk(
  "cart/fetchCartDB",
  async (userId) => {
    const res = await axios.get(`http://localhost:3001/api/cart/${userId}`);
    return res.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeFromCartDB.fulfilled, (state, action) => {
  state.items = state.items.filter(
    (item) => item._id !== action.payload
  );
});
    builder.addCase(addToCartDB.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
    builder.addCase(fetchCartDB.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCartDB.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items = action.payload;
    });
    builder.addCase(fetchCartDB.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
