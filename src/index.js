import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import Layout from "./components/Layout";
import StudentsProvider from "./context/StudentsProvider";

import "bootstrap/dist/css/bootstrap.min.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <StudentsProvider>
        <Layout>
          <App></App>
        </Layout>
      </StudentsProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("app")
);
