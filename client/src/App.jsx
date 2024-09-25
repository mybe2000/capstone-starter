import { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Users from "./pages/Users";
import Businesses from "./pages/Businesses";
import CreateReview from "./pages/CreateReview";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import axios from "axios";
import UserCard from "./pages/UserCard";
import SingleUser from "./pages/SingleUser";

// const url = import.meta.env.DATABASE_URL;

function App() {
  const [auth, setAuth] = useState({});
  const [users, setUsers] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    attemptLoginWithToken();
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      console.log("getUsers function called");
      try {
        // const response = await fetch("/api/users");
        // const data = await response.json();
        // setUsers(data);
        await axios("/api/users")
          .then((data) => {
            console.log(data.data);
            setUsers(data.data);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getUsers();
  }, []);

  useEffect(() => {
    const getBusinesses = async () => {
      try {
        axios("/api/businesses")
          .then((data) => {
            console.log(data.data);
            setBusinesses(data.data);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        console.log(error);
      }
    };
    getBusinesses();
  }, []);

  const attemptLoginWithToken = async () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await fetch(`/api/auth/me`, {
        headers: {
          authorization: token,
        },
      });
      const json = await response.json();
      if (response.ok) {
        setAuth(json);
      } else {
        window.localStorage.removeItem("token");
      }
    }
  };

  const authAction = async (credentials, mode) => {
    const response = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    if (response.ok) {
      window.localStorage.setItem("token", json.token);
      attemptLoginWithToken();
    } else {
      throw json;
    }
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    setAuth({});
  };

  return (
    <>
      <h1>Acme Business Reviews</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/businesses">Businesses ({businesses.length})</Link>
        <Link to="/users">Users ({users.length})</Link>
        {auth.id ? (
          <Link to="/createReview">Create Review</Link>
        ) : (
          <Link to="/login">Register/Login</Link>
        )}
      </nav>
      {auth.id && <button onClick={logout}>Logout {auth.username}</button>}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              authAction={authAction}
              auth={auth}
              businesses={businesses}
              users={users}
              reviews={reviews}
            />
          }
        />
        <Route
          path="/businesses"
          element={<Businesses businesses={businesses} />}
        />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/user/:id" element={<SingleUser />} />
        {!!auth.id && <Route path="/createReview" element={<CreateReview />} />}
        <Route
          path="/register"
          element={
            <Register auth={auth} authAction={authAction} logout={logout} />
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
