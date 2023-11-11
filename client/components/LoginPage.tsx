import React from "react";
import AuthForm from "./AuthForm";
import { useLoginMutation } from "../features/api";


const LoginPage = () => {
    const [login, { isLoading, isError, data }] = useLoginMutation(); 
    
    const handleSubmit = (e) => {
        e.preventDefault();
        login({ });
      };

  return (
    <>
      <div>I am the Login Page</div>
      <AuthForm handleSubmit={handleSubmit} />
    </>
  );
};

export default LoginPage;
