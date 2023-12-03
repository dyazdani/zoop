import React from "react";
import { Route, Routes} from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./components/LoginPage";
import ZoopPage from "./components/ZoopPage";
import RegisterPage from "./components/RegisterPage";
import { RootState } from "./app/store";
import MePage from "./components/MePage";
import HomePage from "./components/HomePage";
import AppHeader from "./components/AppHeader";
import SendZoopButton from "./components/SendZoopButton";

const App: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  
  if (token) {
    console.log(token, "token");
  }

  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/zoops/:id" element={<ZoopPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/me" element={<MePage/>} />
      </Routes>
      <SendZoopButton />
    </>
  )
};

export default App;