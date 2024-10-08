import React from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Account({ auth, setReviews, reviews }) {
  console.log(reviews);
  const myReviews = reviews.filter((review) => review?.userid === auth.id);
  console.log(myReviews);

  const handleDelete = async (id) => {
    try {
      const result = await axios
        .delete(`http://localhost:3000/api/reviews/${id}`)
        .then((data) => {
          console.log(data);
          // setReviews((prevReviews) =>
          //   prevReviews.filter((review) => review.id !== id)
          // );
          // setReviews(data);
        })
        .catch((err) => console.log(err));

      axios(`/api/reviews`).then((data) => {
        console.log(data.data);
        setReviews(data.data);
      });
    } catch (error) {
      console.log(error);
    }
    console.log(reviews);
  };

  return (
    <div>
      {auth.id && <h2 className="username">{auth.username}</h2>}
      <p>My reviews:</p>
      {myReviews?.length === 0 ? (
        <div>
          <h3>No reviews yet</h3>
          <p>
            Click on <Link to="/businesses">a business</Link> to write a review
          </p>
        </div>
      ) : (
        <div className="userReviews">
          {myReviews?.map((review) => (
            <div key={review?.id}>
              <h3>{review?.businessname}</h3>
              <p>"{review?.comments}"</p>
              <p>My rating: {review?.rating}</p>
              <button onClick={() => handleDelete(review?.id)}>
                Delete my review
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Account;
