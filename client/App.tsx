import React from "react";
import { Route, Routes} from "react-router-dom";
import ZoopsList from './components/ZoopList';
import LoginPage from "./components/LoginPage";
import ZoopsShow from "./components/ZoopsShow";
import RegisterPage from "./components/RegisterPage"

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/zoops" element={<ZoopsList />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/zoops/:id" element={<ZoopsShow />} />
        <Route path="/me" element={<div>This is the page for all the Zoops I received, all the Zoops I created, and all the Zoops I Fave’d</div>} />
      </Routes>
    </>
  )
};

export default App;
