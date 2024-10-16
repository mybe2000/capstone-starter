import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Account({ auth, setReviews, reviews }) {
  const myReviews = reviews.filter((review) => review?.userid === auth.id);

  const [editingReviewId, setEditingReviewId] = useState(null);
  const [updatedComments, setUpdatedComments] = useState("");
  const [updatedRating, setUpdatedRating] = useState("");

  const handleEdit = (review) => {
    setEditingReviewId(review.id);
    console.log(review.id);
    setUpdatedComments(review.comments);
    setUpdatedRating(review.rating);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/api/reviews/${id}`, {
        comments: updatedComments,
        rating: updatedRating,
      });
      const result = await axios.get(`/api/reviews`);
      setReviews(result.data);
      setEditingReviewId(null);
      setUpdatedComments("");
      setUpdatedRating("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios
        .delete(`http://localhost:3000/api/reviews/${id}`)
        .then((data) => {
          console.log(data);
        })
        .catch((err) => console.log(err));

      const result = await axios(`/api/reviews`).then((data) => {
        console.log(data.data);
        setReviews(data.data);
      });
    } catch (error) {
      console.log(error);
    }
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
              {editingReviewId === review.id ? (
                <div>
                  <textarea
                    value={updatedComments}
                    onChange={(e) => setUpdatedComments(e.target.value)}
                  />
                  <input
                    type="number"
                    value={updatedRating}
                    onChange={(e) => setUpdatedRating(e.target.value)}
                    min="1"
                    max="5"
                  />
                  <button onClick={() => handleUpdate(review.id)}>
                    Save Changes
                  </button>
                  <button onClick={() => setEditingReviewId(null)}>
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <p>"{review?.comments}"</p>
                  <p>My rating: {review?.rating}</p>
                  <button onClick={() => handleEdit(review)}>
                    Edit my review
                  </button>
                  <button onClick={() => handleDelete(review?.id)}>
                    Delete my review
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Account;
