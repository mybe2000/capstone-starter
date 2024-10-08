import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Account({ auth, setReviews, reviews }) {
  // const { id } = useParams();

  const myReviews = reviews.filter((review) => review.userid === auth.id);
  console.log(myReviews);

  const numReviews = myReviews.length;

  const handleDelete = async (id) => {
    try {
      const result = await axios
        .delete(`http://localhost:3000/api/reviews/${id}`)
        .then((data) => console.log(data))
        .catch((err) => console.log(err));

      if (result) {
        axios(`/api/reviews`)
          .then((data) => {
            console.log(data);
            setReviews(data);
          })
          .catch((err) => console.log(err));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {auth.id && <h1>{auth.username}</h1>}
      <p>My reviews:</p>
      {!numReviews ? (
        <div>
          <h3>No reviews yet</h3>
          <p>
            Click on <Link to="/businesses">a business</Link> to write a review
          </p>
        </div>
      ) : (
        <div>
          {myReviews.map((review) => (
            <div key={review.id}>
              {review.comments}, Rating: {review.rating}
              <button onClick={() => handleDelete(review.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Account;
