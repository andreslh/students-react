import React from "react";
import { Routes, Route } from "react-router-dom";

import AddStudent from "./pages/AddStudent";
import Students from "./pages/Students";
import UpdateStudent from "./pages/UpdateStudent";

function App() {
  return (
    <Routes>
      <Route path={"/add-student"} element={<AddStudent />} />
      <Route path={"/update-student/:id"} element={<UpdateStudent />} />
      <Route path={"/"} element={<Students />} />
    </Routes>
  );
}

export default App;
