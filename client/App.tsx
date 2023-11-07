import React from "react";
import { Route, Routes } from "react-router-dom";
import ZoopsIndex from './components/ZoopsIndex';
import LoginPage from "./components/LoginPage";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ZoopsIndex />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  )
};

export default App;
