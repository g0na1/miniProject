import { UsersData } from "../ExampleData";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as ENV from "../config";

const initialState = {
  users: UsersData,
  user: null,
  status: null,
  msg: null,
  isLogin: false,
};

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { name, email, password } = userData;
      const response = await axios.post(
        `${ENV.SERVER_URL}/registerUser`,
        { name, email, password }
      );
      return { user: response.data.user, msg: response.data.msg };
    } catch (error) {
      const msg = error.response?.data?.msg || "Network error";
      return rejectWithValue(msg);
    }
  }
);

export const login = createAsyncThunk(
  "users/login",
  async (userData, { rejectWithValue }) => {
    try {
      const { email, password } = userData;
      const response = await axios.post(
        "http://localhost:3001/login",
        { email, password }
      );
      return {
        user: response.data.user,
        msg: response.data.msg,
      };
    } catch (error) {
      const msg = error.response?.data?.msg || "Login failed";
      return rejectWithValue({ msg });
    }
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLogin = false;
      state.msg = null;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.msg = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload.user;
        state.msg = action.payload.msg;
        state.isLogin = true;
        state.users.push(action.payload.user);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "rejected";
        state.msg = action.payload || "Unexpected error occurred";
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.msg = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "success";
        state.isLogin = true;
        state.user = action.payload.user;
        state.msg = action.payload.msg;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "rejected";
        state.isLogin = false;
        state.user = null;
        state.msg = action.payload?.msg || "erorr when sign in ";
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
