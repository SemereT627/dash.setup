import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

import authSlice from "./auth/authSlice";
import gymSlice from "./gym/gymSlice";
import serviceSlice from "./service/serviceSlice";

const authPersistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  gym: gymSlice,
  service: serviceSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
