import React from "react";
import AuthForm from "./AuthForm";
import { useRegisterMutation } from "../features/api";


const RegisterPage = () => {
  const [register, { isLoading, isError, data }] = useRegisterMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ });
  };

    return(
        <>
            <div>I am the Register Page</div>
            <AuthForm handleSubmit={handleSubmit} />
        </>
    )
}

export default RegisterPage;