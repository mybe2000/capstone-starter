import React from "react";
import { Link } from "react-router-dom";

function UserCard({ user, reviews }) {
  return (
    <div className="usersBox">
      <Link to={`/user/${user.id}`} className="userLinks">
        <h3 className="usernameStyle">{user.username}</h3>
        <h3>
          Ratings:
          {reviews.filter((review) => review.userid === user.id).length}
        </h3>
      </Link>
    </div>
  );
}

export default UserCard;
