import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
axios.defaults.baseURL = import.meta.env.VITE_DATABASE_URL;

function SingleBusiness({ auth, reviews, setBusinesses }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [business, setBusiness] = useState(null);

  useEffect(() => {
    const getBusiness = async () => {
      try {
        const response = await axios(`/api/businesses/${id}`);

        console.log(response.data);
        setBusiness(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBusiness();
  }, [id]);
  console.log(reviews);

  const businessReviews = reviews?.filter(
    (review) => review?.businessid === business?.id
  );

  const averageScore =
    businessReviews.reduce((sum, review) => sum + review.rating, 0) /
    businessReviews.length;

  const avgScore = averageScore.toFixed(1);

  const handleDelete = async (businessId) => {
    try {
      await axios
        .delete(`/api/businesses/${businessId}`)
        .then((data) => console.log("business deleted", data))
        .catch((err) => console.log(err));

      await axios(`/api/businesses`).then((data) => {
        console.log(data.data);
        setBusinesses(data.data);
        navigate("/businesses");
      });
    } catch (error) {
      console.log("error deleting business", error);
    }
  };

  return (
    <div className="business" key={business?.id}>
      <h2 className="singleBusinessName">{business?.businessname}</h2>
      <div className="imageBusiness">
        <img
          src={business?.imageurl}
          className="images"
          alt={business?.businessname}
        />
      </div>

      <div className="ratingsBox">
        <h4>
          Average rating:{" "}
          {avgScore === "NaN" ? <p>No ratings yet</p> : avgScore}
        </h4>
        <p>Number of reviews: {businessReviews.length}</p>
      </div>
      {auth.username === "lucy" && (
        <button className="deleteBtn" onClick={() => handleDelete(id)}>
          Delete business
        </button>
      )}

      {auth.id && (
        <Link to={`/createReview/${business?.id}`}>Write a review</Link>
      )}

      {!auth.id && <Link to={"/login"}>Log in to submit a review</Link>}
      {businessReviews.map((review) => (
        <div key={review?.id} className="businessReviews">
          <p>From {review?.username}</p>
          <p>'{review?.comments}'</p>
          <p>Rating: {review?.rating}</p>
        </div>
      ))}
    </div>
  );
}

export default SingleBusiness;
