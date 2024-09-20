import React from "react";
import AuthForm from "../components/AuthForm/AuthForm";

function Login({ auth, authAction }) {
  return (
    <div>
      <AuthForm authAction={authAction} mode="login" />
      <AuthForm authAction={authAction} mode="register" />
    </div>
  );
}

export default Login;
