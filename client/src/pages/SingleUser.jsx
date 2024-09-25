import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function SingleUser() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    axios(`/api/users/${id}`)
      .then((data) => {
        setUser(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios(`/api/reviews/${id}`)
      .then((data) => {
        setReviews(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h3>Username: </h3>
      {user?.username}
      <h3>Reviews: </h3>
      {reviews?.map((review) => (
        <div key={review.id}>{review.comments}</div>
      ))}
    </div>
  );
}

export default SingleUser;
