import React from "react";
import { Route, Routes } from "react-router-dom";
import ZoopsIndex from './components/ZoopsIndex'

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ZoopsIndex />} />
      </Routes>
    </>
  )
};

export default App;
