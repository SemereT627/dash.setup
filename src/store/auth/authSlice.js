import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/axios";
import { SERVER_PATH } from "../../routes/paths";

const INITIAL_STATE = {
  loginLoading: false,
  loginSuccess: false,
  loginError: null,

  registerLoading: false,
  registerSuccess: false,
  registerError: null,

  phoneNumberVerificationLoading: false,
  phoneNumberVerificationSuccess: false,
  phoneNumberVerificationError: null,
  phoneNumberVerificationToken: null,

  user: {},
  token: null,
};

export const loginAsync = createAsyncThunk(
  "auth/loginAsync",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(SERVER_PATH.login, data);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const registerAsync = createAsyncThunk(
  "auth/registerAsync",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(SERVER_PATH.register, data);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const verifyPhoneNumberAsync = createAsyncThunk(
  "auth/verifyPhoneNumberAsync",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(SERVER_PATH.verifyPhone, data);
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
    clearRegister: (state) => {
      state.registerLoading = false;
      state.registerSuccess = false;
      state.registerError = null;
    },

    verifyPhoneNumberStart: (state) => {
      state.phoneNumberVerificationLoading = true;
    },
    verifyPhoneNumberSuccess: (state) => {
      state.phoneNumberVerificationLoading = false;
      state.phoneNumberVerificationSuccess = true;
    },
    verifyPhoneNumberError: (state, action) => {
      state.phoneNumberVerificationLoading = false;
      state.phoneNumberVerificationSuccess = false;
      state.phoneNumberVerificationError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loginLoading = true;
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
      })
      .addCase(registerAsync.pending, (state) => {
        state.registerLoading = true;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.registerLoading = false;
        state.registerSuccess = true;
        state.phoneNumberVerificationToken =
          action.payload.data.phoneVerificationToken.verificationToken;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.registerLoading = false;
        state.registerSuccess = false;
        state.registerError = action.payload.response.data.message;
      });
  },
});

export const {
  logOut,
  clearLogin,
  clearRegister,
  verifyPhoneNumberStart,
  verifyPhoneNumberSuccess,
  verifyPhoneNumberError,
} = authSlice.actions;
export default authSlice.reducer;
