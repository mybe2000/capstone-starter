import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function SingleBusiness({ auth, reviews }) {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);

  useEffect(() => {
    const getBusinesses = async () => {
      try {
        await axios(`/api/businesses/${id}`)
          .then((data) => {
            console.log(data.data);
            setBusiness(data.data);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        console.log(error);
      }
    };
    getBusinesses();
  }, [id]);

  const businessReviews = reviews.filter(
    (review) => review.businessid === business?.id
  );

  const overallRating =
    businessReviews.reduce((sum, review) => sum + review.rating, 0) /
    reviews.length;

  return (
    <div className="business" key={business?.id}>
      <h2 className="singleBusinessName">{business?.businessname}</h2>
      <div className="ratingsBox">
        <h4>Overall rating: {overallRating}</h4>
        <p>Number of reviews: {businessReviews.length}</p>
      </div>
      {businessReviews.map((review) => (
        <div key={review?.id} className="businessReviews">
          <p>From {review?.username}</p>
          <p>'{review?.comments}'</p>
          <p>Rating: {review?.rating}</p>
        </div>
      ))}

      {auth.id && (
        <Link to={`/createReview/${business?.id}`}>Write a review</Link>
      )}
      {!auth.id && <Link to={"/login"}>Log in to submit a review</Link>}
    </div>
  );
}

export default SingleBusiness;
