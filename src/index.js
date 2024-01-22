/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.2
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Global application bootstrap
import "bootstrap";

// React and ReactDOM 
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// App component
import App from "App";

// Application Authentication Provide
import { AuthProvider } from "contexts/auth";

// Soft UI Context Provider
import { SoftUIControllerProvider } from "contexts/soft-ui";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <AuthProvider>
      <SoftUIControllerProvider>
        <App />
      </SoftUIControllerProvider>
    </AuthProvider>
  </BrowserRouter>
);
