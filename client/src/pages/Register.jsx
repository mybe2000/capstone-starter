import React from "react";
import AuthForm from "../components/AuthForm/AuthForm";

function Register({ authAction }) {
  return (
    <div>
      <h2>Register here</h2>
      <AuthForm authAction={authAction} mode="register" />
    </div>
  );
}

export default Register;
