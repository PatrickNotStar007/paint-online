import React from "react";
import "./styles/app.scss";
import Toolbar from "./components/Toolbar";
import SettingBar from "./components/SettingBar";
import Canvas from "./components/Canvas";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Paint from "./components/Paint";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={<Navigate to={`f${(+new Date()).toString(16)}`} replace />}
          />
          <Route path="/:id" element={<Paint />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
