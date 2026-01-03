import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../utils/constant";

const initialState = {
  user: null,

};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      console.log("set user worked fine and have user :", state.user);
    },
    clearUser: (state) => {
      state.user = null;
      state.cartCount = 0;
    },
  },
});

// ✅ UPDATED: Export the new action
export const {
  setUser,
  clearUser,
} = userSlice.actions;
export default userSlice.reducer;
