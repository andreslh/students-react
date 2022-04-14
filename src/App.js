import React from "react";
import { Routes, Route } from "react-router-dom";
import AddStudent from "./pages/AddStudent";

import Students from "./pages/Students";

function App() {
  return (
    <Routes>
      <Route path={"/add-student"} element={<AddStudent />} />
      <Route path={"/"} element={<Students />} />
    </Routes>
  );
}

export default App;
