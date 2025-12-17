import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3001/incense"; 

export const fetchIncense = createAsyncThunk("incense/fetchIncense", async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
});

export const addIncense = createAsyncThunk("incense/addIncense", async (formData) => {
  const res = await axios.post(`${BASE_URL}/add`, formData);
  return res.data.incense;
});

export const updateIncense = createAsyncThunk(
  "incense/updateIncense",
  async ({ id, data }) => {
    const res = await axios.put(`${BASE_URL}/update/${id}`, data);
    return res.data.incense;
  }
);

export const deleteIncense = createAsyncThunk(
  "incense/deleteIncense",
  async (id) => {
    await axios.delete(`${BASE_URL}/delete/${id}`);
    return id;
  }
);


const incenseSlice = createSlice({
  name: "incense",
  initialState: {
    incense: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncense.fulfilled, (state, action) => {
        state.incense = action.payload;
      })
      .addCase(addIncense.fulfilled, (state, action) => {
        state.incense.push(action.payload);
      })
      .addCase(updateIncense.fulfilled, (state, action) => {
        const i = state.incense.findIndex(p => p._id === action.payload._id);
        if (i !== -1) state.incense[i] = action.payload;
      })
      .addCase(deleteIncense.fulfilled, (state, action) => {
        state.incense = state.incense.filter(p => p._id !== action.payload);
      });
  }
});

export default incenseSlice.reducer;
