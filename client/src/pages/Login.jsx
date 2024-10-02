import React from "react";
import AuthForm from "../components/AuthForm/AuthForm";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login({ authAction, auth }) {
  const navigate = useNavigate();
  return (
    <div>
      {!auth.id && (
        <div>
          <AuthForm authAction={authAction} mode="login" />
          <Link to={"/register"}>No account yet? Register here</Link>
        </div>
      )}
      {auth.id && (
        <div>
          <p>You are logged in</p>
          <p>See your reviews</p>
        </div>
      )}
    </div>
  );
}

export default Login;
