import React from "react";
import "./styles/app.scss";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Paint from "./components/Paint.tsx";

const App: React.FC = () => {
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
