import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
// import { RecoilRoot } from "recoil";
import { HelmetProvider } from "react-helmet-async";
// import Themer from "./components/Themer";
import { ThemeStateProvider } from "./contexts/ThemeContext";
import { UIStateProvider } from "./contexts/UIContext";
// import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <ThemeStateProvider>
      <UIStateProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </UIStateProvider>
    </ThemeStateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
