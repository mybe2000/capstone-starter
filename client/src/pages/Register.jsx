import React from "react";
import AuthForm from "../components/AuthForm/AuthForm";

function Register({ auth, authAction, logout }) {
  return (
    <div>
      <h2>Register here</h2>
      <AuthForm authAction={authAction} mode="register" />
    </div>
  );
}

export default Register;
