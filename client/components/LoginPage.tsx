import React, { useState } from "react";
import { useLoginMutation } from "../features/api";

const LoginPage = () => {
  const [login, { isLoading, isError, data }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {isError && <p>Oops, there was an error logging in. Try again?</p>}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button disabled={isLoading} type="submit">
          Login
        </button>
      </form>
    </>
  );
};

export default LoginPage;
