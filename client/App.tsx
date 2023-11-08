import React from "react";
import { Route, Routes} from "react-router-dom";
import ZoopsList from './components/ZoopList';
import LoginPage from "./components/LoginPage";
import Zoop from "./components/Zoop";
import RegisterPage from "./components/RegisterPage"
import MePage from "./components/MePage";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/zoops" element={<ZoopsList />}>
          <Route path=":id" element={<Zoop />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/me" element={<MePage/>} />
      </Routes>
    </>
  )
};

export default App;
