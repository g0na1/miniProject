import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3001/perfumes"; // Ensure this matches your server routes

export const fetchPerfumes = createAsyncThunk("perfume/fetchPerfumes", async () => {
  const res = await axios.get(BASE_URL);
  return res.data; // Assuming res.data is an array of perfumes
});

// Add a new perfume
export const addPerfume = createAsyncThunk("perfume/addPerfume", async (formData) => {
  const res = await axios.post(`${BASE_URL}/add`, formData);
  return res.data.perfume; // Assuming res.data.perfume gives the added perfume
});

// Update an existing perfume
export const updatePerfume = createAsyncThunk(
  "perfume/updatePerfume",
  async ({ id, data }) => {
    const res = await axios.put(`${BASE_URL}/update/${id}`, data);
    return res.data.perfume; // Assuming res.data.perfume gives the updated perfume
  }
);

// Delete a perfume
export const deletePerfume = createAsyncThunk(
  "perfume/deletePerfume",
  async (id) => {
    await axios.delete(`${BASE_URL}/delete/${id}`);
    return id; // Return the ID for removing it from state
  }
);

const perfumeSlice = createSlice({
  name: "perfume",
  initialState: {
    perfumes: [],
    status: null,
    error: null, // Added error state
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPerfumes.fulfilled, (state, action) => {
        state.perfumes = action.payload;
        state.status = 'succeeded';
      })
      .addCase(addPerfume.fulfilled, (state, action) => {
        state.perfumes.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(updatePerfume.fulfilled, (state, action) => {
        const index = state.perfumes.findIndex(p => p._id === action.payload._id);
        if (index !== -1) state.perfumes[index] = action.payload;
        state.status = 'succeeded';
      })
      .addCase(deletePerfume.fulfilled, (state, action) => {
        state.perfumes = state.perfumes.filter(p => p._id !== action.payload);
        state.status = 'succeeded';
      })
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message; // Capture error message
        }
      );
  }
});

export default perfumeSlice.reducer;