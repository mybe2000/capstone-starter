import React from "react";
import AuthForm from "../components/AuthForm/AuthForm";
import { Link } from "react-router-dom";

function Login({ authAction, auth }) {
  return (
    <div>
      {!auth.id && (
        <div>
          <AuthForm authAction={authAction} mode="login" />
          <Link to={"/register"}>No account yet? Register here</Link>
        </div>
      )}
    </div>
  );
}

export default Login;
