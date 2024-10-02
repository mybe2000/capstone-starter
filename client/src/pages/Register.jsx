import React from "react";
import AuthForm from "../components/AuthForm/AuthForm";

function Register({ auth, authAction, logout }) {
  return (
    <div>
      <h2>Register here</h2>
      {!auth.id && <AuthForm authAction={authAction} mode="register" />}
      {auth.id && (
        <div>
          <p>Successfully registered!</p>
        </div>
      )}
    </div>
  );
}

export default Register;
