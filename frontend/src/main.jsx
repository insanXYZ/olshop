import React from "react";
import ReactDOM from "react-dom/client";
import "./style/index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Provider } from "react-redux";
import store from "./redux/store";
import "react-toastify/dist/ReactToastify.css";
import toast from "./components/toast/container";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {toast()}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
