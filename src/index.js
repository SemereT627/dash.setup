import "./locales/i18n";

import 'simplebar/src/simplebar.css';

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import { CollapseDrawerProvider } from "./contexts/CollapsibleDrawerContext";
import { LocalizationProvider } from "@material-ui/lab";
import { SettingsProvider } from "./contexts/SettingsContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <SettingsProvider>
      <CollapseDrawerProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CollapseDrawerProvider>
    </SettingsProvider>
  </LocalizationProvider>
);
