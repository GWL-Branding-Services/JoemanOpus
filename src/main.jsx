import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AllRoutes from "./Route/AllRoutes.jsx";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/error/ErrorBoundary";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BackToTop } from "./components/buttons";
import { ScrollToTop } from "./Utils";
import AuthContextProvider from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <ErrorBoundary>
      <ScrollToTop />
      <BackToTop />
      <ToastContainer
        position="top-center"
        autoClose={2719}
        limit={4}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
      <AuthContextProvider>
        <AllRoutes />
      </AuthContextProvider>
    </ErrorBoundary>
  </BrowserRouter>
  // </React.StrictMode>,
);
