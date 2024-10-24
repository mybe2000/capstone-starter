import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_DATABASE_URL;

function SingleUser({ reviews, auth }) {
  const { id } = useParams();
  const [user, setUser] = useState(null);

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

  return (
    <div>
      <h3>Username: </h3>
      <h4 style={{ color: "brown" }}>{user?.username}</h4>
      <h3>Reviews for: </h3>
      {userReviews?.length === 0 ? (
        <div>
          <p>No reviews yet.</p>
          {auth.id === id && <Link to="/businesses">Add a review!</Link>}
          {!auth.id && <Link to="/login">Log in to add a review!</Link>}
        </div>
      ) : (
        <div>
          {auth.id === id && <Link to="/businesses">Add a review</Link>}
          {!auth.id && <Link to="/login">Log in to add a review</Link>}
          {userReviews?.map((review) => (
            <div key={review.id} className="reviews">
              <h4>{review.businessname}</h4>
              <p> Rating: {review.rating}</p>
              <p>{review.comments}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SingleUser;
