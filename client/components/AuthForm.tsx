import React, { useState } from "react";
import { useLocation } from "react-router-dom";


const AuthForm = ({ handleSubmit }) => {
  const { pathname } = useLocation();
  console.log(pathname)

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>{pathname === '/register' ? "Register" : "Login"}</h1>
        {/* {isError && <p>Oops, there was an error. Try again?</p>} */}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />

        {/* <button disabled={isLoading} type="submit"> */}
          Register
        {/* </button> */}
      </form>
    </>
  );
};

export default AuthForm;
