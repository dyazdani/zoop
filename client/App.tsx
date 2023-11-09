import React from "react";
// import { Route, Routes} from "react-router-dom";
import { useSelector } from "react-redux";

import RegisterPage from "./components/RegisterPage";
import { RootState } from "./app/store";

const App: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  if (token) {
    console.log(token, "token");
  }

  return (
    <>
      <RegisterPage />
    </>
  );
};

export default App;
