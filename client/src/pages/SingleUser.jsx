import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function SingleUser() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState(null);

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

  useEffect(() => {
    const getReviews = async () => {
      try {
        await axios(`/api/reviews/${id}`)
          .then((data) => {
            console.log(data.data);
            setReviews(data.data);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        console.log(error);
      }
    };
    getReviews();
  }, [id]);

  return (
    <div>
      <h3>Username: </h3>
      <h4>{user?.username}</h4>
      <h3>Reviews for: </h3>
      {reviews?.map((review) => (
        <div key={review?.id} className="reviews">
          <Link to={`/user/${user?.id}`}></Link>
          <p> Rating: {review?.rating}</p>
          <p>{review?.comments}</p>
        </div>
      ))}
    </div>
  );
}

export default SingleUser;
