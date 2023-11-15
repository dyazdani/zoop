import React from "react";
import { Route, Routes} from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./components/LoginPage";
import Zoop from "./components/Zoop";
import RegisterPage from "./components/RegisterPage";
import { RootState } from "./app/store";
import MePage from "./components/MePage";
import HomePage from "./components/HomePage";
import Nav from "./components/Nav";

const App: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  
  if (token) {
    console.log(token, "token");
  }

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/zoops/:id" element={<Zoop />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/me" element={<MePage/>} />
      </Routes>
    </>
  )
};

export default App;