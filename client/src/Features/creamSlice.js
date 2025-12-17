import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as ENV from "../config";

const BASE_URL = `${ENV.SERVER_URL}/creams`;

export const fetchCreams = createAsyncThunk("cream/fetchCreams", async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
});

export const addCream = createAsyncThunk("cream/addCream", async (formData) => {
  const res = await axios.post(`${BASE_URL}/add`, formData);
  return res.data.cream;
});

// Update cream
export const updateCream = createAsyncThunk(
  "cream/updateCream",
  async ({ id, data }) => {
    const res = await axios.put(`${BASE_URL}/update/${id}`, data);
    return res.data.cream;
  }
);

export const deleteCream = createAsyncThunk(
  "cream/deleteCream",
  async (id) => {
    await axios.delete(`${BASE_URL}/delete/${id}`);
    return id;
  }
);

const creamSlice = createSlice({
  name: "cream",
  initialState: {
    creams: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreams.fulfilled, (state, action) => {
        state.creams = action.payload;
      })
      .addCase(addCream.fulfilled, (state, action) => {
        state.creams.push(action.payload);
      })
      .addCase(updateCream.fulfilled, (state, action) => {
        const i = state.creams.findIndex(p => p._id === action.payload._id);
        if (i !== -1) state.creams[i] = action.payload;
      })
      .addCase(deleteCream.fulfilled, (state, action) => {
        state.creams = state.creams.filter(p => p._id !== action.payload);
      });
  }
});

export default creamSlice.reducer;
