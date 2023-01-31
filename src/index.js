import "./locales/i18n";

import "simplebar/src/simplebar.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import LoadingScreen from "./components/LoadingScreen";

import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import { BrowserRouter } from "react-router-dom";
import { CollapseDrawerProvider } from "./contexts/CollapsibleDrawerContext";
import { HelmetProvider } from "react-helmet-async";
import { LocalizationProvider } from "@material-ui/lab";
import { SettingsProvider } from "./contexts/SettingsContext";
import { persistor, store } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HelmetProvider>
    <ReduxProvider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <SettingsProvider>
            <CollapseDrawerProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </CollapseDrawerProvider>
          </SettingsProvider>
        </LocalizationProvider>
      </PersistGate>
    </ReduxProvider>
  </HelmetProvider>
);
