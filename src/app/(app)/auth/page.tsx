"use client";

import { useActionState, useEffect } from "react";
import { loginAction } from "./authAction";

const Login = () => {
  const [state, formAction, isPending] = useActionState(loginAction, {
    error: "",
    redirectTo: undefined,
  });

  const { redirectTo } = state;

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
        <label htmlFor="password1">Password:</label>
        <input type="password" name="password1" id="password1" required />
      </div>
      <div>
        <label htmlFor="password2">Repeat Pls Password:</label>
        <input type="password" name="password2" id="password2" required />
      </div>
      {state.error && <div style={{ color: "red" }}>{state.error}</div>}

      <button type="submit" disabled={isPending}>
        Зарегистрироваться
      </button>
    </form>
  );
};

export default Login;
