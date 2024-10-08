import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function SingleUser({ reviews }) {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  console.log(reviews);

  useEffect(() => {
    const getUserById = async () => {
      try {
        await axios(`/api/users/${id}`)
          .then((data) => {
            console.log(data.data);
            setUser(data.data);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        console.log(error);
      }
    };
    getUserById();
  }, [id]);

  const userReviews = reviews.filter((review) => review.userid === id);
  console.log(userReviews);

  return (
    <div>
      <h3>Username: </h3>
      <h4>{user?.username}</h4>
      <h3>Reviews for: </h3>
      {userReviews.length === 0 && (
        <div>
          <p>No reviews yet.</p>{" "}
          <Link to="/login">Log in to add a review!</Link>
        </div>
      )}
      {userReviews.map((review) => (
        <div key={review.id} className="reviews">
          <h4>{review.businessname}</h4>
          <p> Rating: {review.rating}</p>
          <p>{review.comments}</p>
        </div>
      ))}
    </div>
  );
}

export default SingleUser;
