import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/axios";
import { SERVER_PATH } from "../../routes/paths";

const INITIAL_STATE = {
  gymCreateFirstStepperLoading: false,
  gymCreateFirstStepperSuccess: false,
  gymCreateFirstStepperError: null,

  gymCreateSecondStepperLoading: false,
  gymCreateSecondStepperSuccess: false,
  gymCreateSecondStepperError: null,

  gymCreateThirdStepperLoading: false,
  gymCreateThirdStepperSuccess: false,
  gymCreateThirdStepperError: null,

  gym: {},
  gyms: [],
};

export const createGymFirstStepperAsync = createAsyncThunk(
  "gym/createGymFirstStepperAsync",
  async (data, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { token },
      } = getState();
      const response = await api.patch(
        SERVER_PATH.createGymFirstStepper(data.gymId),
        data.result,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const createGymSecondStepperAsync = createAsyncThunk(
  "gym/createGymSecondStepperAsync",
  async (data, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { token },
      } = getState();
      const response = await api.patch(
        SERVER_PATH.createGymSecondStepper(data.gymId),
        data.result,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": `multipart/form-data;`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const createGymThirdStepperAsync = createAsyncThunk(
  "gym/createGymThirdStepperAsync",
  async (data, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { token },
      } = getState();
      const response = await api.post(
        SERVER_PATH.createGymThirdStepper(data.gymId),
        { serviceId: data.serviceId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const gymSlice = createSlice({
  name: "gym",
  initialState: INITIAL_STATE,
  reducers: {
    clearCreateFirstGym: (state) => {
      state.gymCreateFirstStepperLoading = false;
      state.gymCreateFirstStepperSuccess = false;
      state.gymCreateFirstStepperError = null;
    },
    clearCreateSecondGym: (state) => {
      state.gymCreateSecondStepperLoading = false;
      state.gymCreateSecondStepperSuccess = false;
      state.gymCreateSecondStepperError = null;
    },
    clearCreateThirdGym: (state) => {
      state.gymCreateThirdStepperLoading = false;
      state.gymCreateThirdStepperSuccess = false;
      state.gymCreateThirdStepperError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGymFirstStepperAsync.pending, (state) => {
        state.gymCreateFirstStepperLoading = true;
      })
      .addCase(createGymFirstStepperAsync.fulfilled, (state, action) => {
        state.gymCreateFirstStepperLoading = false;
        state.gymCreateFirstStepperSuccess = true;
      })
      .addCase(createGymFirstStepperAsync.rejected, (state, action) => {
        state.gymCreateFirstStepperLoading = false;
        state.gymCreateFirstStepperSuccess = false;
        state.gymCreateFirstStepperError = action.payload.response.data.message;
      })
      .addCase(createGymSecondStepperAsync.pending, (state) => {
        state.gymCreateSecondStepperLoading = true;
      })
      .addCase(createGymSecondStepperAsync.fulfilled, (state) => {
        state.gymCreateSecondStepperLoading = false;
        state.gymCreateSecondStepperSuccess = true;
      })
      .addCase(createGymSecondStepperAsync.rejected, (state, action) => {
        state.gymCreateSecondStepperLoading = false;
        state.gymCreateSecondStepperSuccess = false;
        state.gymCreateSecondStepperError =
          action.payload.response.data.message;
      })
      .addCase(createGymThirdStepperAsync.pending, (state) => {
        state.gymCreateThirdStepperLoading = true;
      })
      .addCase(createGymThirdStepperAsync.fulfilled, (state) => {
        state.gymCreateThirdStepperLoading = false;
        state.gymCreateThirdStepperSuccess = true;
      })
      .addCase(createGymThirdStepperAsync.rejected, (state, action) => {
        state.gymCreateThirdStepperLoading = false;
        state.gymCreateThirdStepperSuccess = false;
        state.gymCreateThirdStepperError = action.payload.response.data.message;
      });
  },
});

export const {
  clearCreateFirstGym,
  clearCreateSecondGym,
  clearCreateThirdGym,
} = gymSlice.actions;
export default gymSlice.reducer;
