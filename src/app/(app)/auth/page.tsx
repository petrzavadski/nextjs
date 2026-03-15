"use client";

import { useActionState, useEffect, useState } from "react";
import { loginAction } from "./authAction";

const Login = () => {
  const [state, formAction, isPending] = useActionState(loginAction, {
    error: "",
    redirectTo: undefined,
  });
  // const { error, redirectTo } = state;

  const { redirectTo } = state;

  useEffect(() => {
    if (redirectTo) {
      location.assign(redirectTo);
    }
  }, [redirectTo]);

  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const passwordsMatch = password1 !== password2;

  const passwordLength = password1.length < 6;

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="login">Login:</label>
        <input type="text" name="login" id="" required />
      </div>
      <div>
        <label htmlFor="password1">Password:</label>
        <input
          type="password"
          name="password1"
          id="password1"
          required
          value={password1}
          onChange={(text) => setPassword1(text.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password2">Repeat Pls Password:</label>
        <input
          type="password"
          name="password2"
          id="password2"
          required
          value={password2}
          onChange={(text) => {
            setPassword2(text.target.value);
          }}
        />
      </div>
      {passwordsMatch && (
        <div style={{ color: "red" }}>Пароли не совпадают</div>
      )}

      {passwordLength && (
        <div style={{ color: "red" }}>Длина пароля меньше 6 символов</div>
      )}

      <button type="submit" disabled={isPending || passwordsMatch}>
        Зарегистрироваться
      </button>
    </form>
  );
};

export default Login;
