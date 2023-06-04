import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/Auth/AuthProvider";

import { Provider } from "react-redux";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <AuthProvider>
    <BrowserRouter basename="app">
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </AuthProvider>
  // </React.StrictMode>
);
