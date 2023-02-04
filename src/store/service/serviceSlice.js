import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/axios";
import { SERVER_PATH } from "../../routes/paths";

const INITIAL_STATE = {
  fetchGymServicesLoading: false,
  fetchGymServicesSuccess: false,
  fetchGymServicesError: null,

  createRequestServiceLoading: false,
  createRequestServiceSuccess: false,
  createRequestServiceError: null,

  service: {},
  services: [],
};

export const fetchGymServicesAsync = createAsyncThunk(
  "service/fetchGymServicesAsync",
  async (data, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { token },
      } = getState();
      const response = await api.get(SERVER_PATH.service, {
        params: {
          status: data.status,
        },
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const createRequestServiceAsync = createAsyncThunk(
  "service/createRequestServiceAsync",
  async (data, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { token },
      } = getState();
      const response = await api.post(
        SERVER_PATH.createService(data.gymId),
        data.values,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const serviceSlice = createSlice({
  name: "service",
  initialState: INITIAL_STATE,
  reducers: {
    clearCreateRequestService: (state) => {
      state.createRequestServiceLoading = false;
      state.createRequestServiceSuccess = false;
      state.createRequestServiceError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGymServicesAsync.pending, (state) => {
        state.fetchGymServicesLoading = true;
      })
      .addCase(fetchGymServicesAsync.fulfilled, (state, action) => {
        state.fetchGymServicesLoading = false;
        state.fetchGymServicesSuccess = true;
        state.services = action.payload.services;
      })
      .addCase(fetchGymServicesAsync.rejected, (state, action) => {
        state.fetchGymServicesLoading = false;
        state.fetchGymServicesSuccess = false;
        state.fetchGymServicesError = action.payload.response.data.message;
      })
      .addCase(createRequestServiceAsync.pending, (state) => {
        state.createRequestServiceLoading = true;
      })
      .addCase(createRequestServiceAsync.fulfilled, (state, action) => {
        state.createRequestServiceLoading = false;
        state.createRequestServiceSuccess = true;
        state.service = action.payload.service;
      })
      .addCase(createRequestServiceAsync.rejected, (state, action) => {
        state.createRequestServiceLoading = false;
        state.createRequestServiceSuccess = false;
        state.createRequestServiceError = action.payload.response.data.message;
      });
  },
});

export const { clearCreateRequestService } = serviceSlice.actions;
export default serviceSlice.reducer;
