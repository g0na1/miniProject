import { UsersData } from "../ExampleData";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state with existing users
const initialState = {
  users: UsersData, // قائمة المستخدمين المبدئية
  user: null,       // المستخدم المسجل حاليًا
  status: null,     // حالة العملية: 'loading', 'success', 'rejected'
  msg: null,        // رسالة السيرفر أو الخطأ
  isLogin: false,   // حالة تسجيل الدخول
};

// Create the async thunk for registering a user
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { name, email, password } = userData;

      // إرسال طلب POST للسيرفر
      const response = await axios.post("http://localhost:3001/registerUser", { name, email, password });

      // إرجاع بيانات المستخدم والرسالة من السيرفر
      return { user: response.data.user, msg: response.data.msg };
    } catch (error) {
      // التقاط أي خطأ من السيرفر أو الشبكة
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
      const response = await axios.post("http://localhost:3001/login", { email, password });
      const user = response.data.user;
      const msg = response.data.msg;
      return { user, msg };
    } catch (error) {
      // إذا حدث خطأ ولم يتم إرسال response
      const msg = error.response?.data?.msg || "Login failed";
      return rejectWithValue({ msg });
    }
  }
);

// Create the slice
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
        // ✔ استخدام optional chaining لتجنب undefined
        state.msg = action.payload?.msg || "حدث خطأ أثناء تسجيل الدخول";
      });
  },
});

// Export synchronous actions if needed
export const { logout } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
