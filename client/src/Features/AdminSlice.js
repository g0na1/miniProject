import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as ENV from "../config";

const initialState = {
  admin: null,
  isLogin: false,
  status: null,
  msg: null,
};

export const loginAdmin = createAsyncThunk(
  "admin/loginAdmin",
  async (adminData, { rejectWithValue }) => {
    try {
      const { email, password } = adminData;
      const response = await axios.post(
  `${ENV.SERVER_URL}/admin/login`,
  { email, password }
);

      return { admin: response.data.admin, msg: response.data.msg };
    } catch (error) {
      return rejectWithValue({
        msg: error.response?.data?.msg || "Login failed",
      });
    }
  }
);

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    logoutAdmin: (state) => {
      state.admin = null;
      state.isLogin = false;
      state.status = null;
      state.msg = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.status = "loading";
        state.msg = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.status = "success";
        state.isLogin = true;
        state.admin = action.payload.admin;
        state.msg = action.payload.msg;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.status = "rejected";
        state.isLogin = false;
        state.admin = null;
        state.msg = action.payload?.msg || "error when sign in";
      });
  },
});

export const { logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
