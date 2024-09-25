import React from "react";
import { Link } from "react-router-dom";

function UserCard({ user }) {
  return (
    <div>
      <Link to={`/user/${user.id}`}>
        <h3>{user.username}</h3>
      </Link>
    </div>
  );
}

export default UserCard;
