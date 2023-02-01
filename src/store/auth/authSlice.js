import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/axios";

const INITIAL_STATE = {
  loginLoading: false,
  loginSuccess: false,
  loginError: null,

  user: {},
  token: null,
};

export const loginAsync = createAsyncThunk(
  "auth/loginAsync",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", data);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    logOut: (state) => {
      state.token = null;
      state.user = {};
    },
    clearLogin: (state) => {
      state.loginLoading = false;
      state.loginSuccess = false;
      state.loginError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loginLoading = true;
        state.loginSuccess = false;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.loginSuccess = true;

        state.user = action.payload.data.user;
        state.token = action.payload.data.token["accessToken"];
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginSuccess = false;
        state.loginError = !action.payload.response
          ? action.payload.message
          : action.payload.response.data.message;
      });
  },
});

export const { logOut, clearLogin } = authSlice.actions;
export default authSlice.reducer;
