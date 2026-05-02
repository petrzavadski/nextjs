"use client";

import { useActionState, useEffect } from "react";
import { loginAction } from "./loginAction";

const Login = () => {
  const [state, formAction, isPending] = useActionState(loginAction, {
    error: "",
    redirectTo: undefined,
  });
  const { error, redirectTo } = state;

  useEffect(() => {
    if (redirectTo) {
      location.assign(redirectTo);
    }
  }, [redirectTo]);
  return (
    <form action={formAction}>
      <div>
        <label htmlFor="login">Login:</label>
        <input type="text" name="login" id="" required />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="" required />
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button type="submit" disabled={isPending}>
        Login
      </button>
    </form>
  );
};

export default Login;
