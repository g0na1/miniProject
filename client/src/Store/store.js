// src/store.js
import { configureStore } from "@reduxjs/toolkit";

// استيراد جميع الـ slices
import usersReducer from "../Features/UserSlice";
import adminReducer from "../Features/AdminSlice";
import creamReducer from "../Features/creamSlice";
import perfumeReducer from "../Features/perfumeSlice";
import incenseReducer from "../Features/incenseSlice";
import cartReducer from "../Features/CartSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    admin: adminReducer,
    cream: creamReducer,
    perfume: perfumeReducer,
    incense: incenseReducer,
    cart: cartReducer,
  },
});
