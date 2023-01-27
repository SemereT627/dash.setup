import React from "react";
import Router from "./routes";

import ThemeConfig from "./theme";

import Settings from "./components/settings";
import ScrollToTop from "./components/ScrollToTop";
import LoadingScreen from "./components/LoadingScreen";
import NotistackProvider from "./components/NotistackProvider";
import ThemePrimaryColor from "./components/ThemePrimaryColor";
import ThemeLocalization from "./components/ThemeLocalization";

const App = () => {
  return (
    <>
      <ThemeConfig>
        <ThemePrimaryColor>
          <ThemeLocalization>
            <NotistackProvider>
              <Settings />
              <ScrollToTop />
              {/* condition */}
              <Router />
              {/* <LoadingScreen /> */}
            </NotistackProvider>
          </ThemeLocalization>
        </ThemePrimaryColor>
      </ThemeConfig>
    </>
  );
};

export default App;
