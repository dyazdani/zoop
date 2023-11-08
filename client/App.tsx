import React from "react";
import { Route, Routes} from "react-router-dom";
import ZoopsList from './components/ZoopList';
import LoginPage from "./components/LoginPage";
import Zoop from "./components/Zoop";
import RegisterPage from "./components/RegisterPage"
import MePage from "./components/MePage";
import HomePage from "./components/HomePage";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/zoops" element={<ZoopsList />} />
        <Route path="/zoops/:id" element={<Zoop />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/me" element={<MePage/>} />
      </Routes>
    </>
  )
};

export default App;
