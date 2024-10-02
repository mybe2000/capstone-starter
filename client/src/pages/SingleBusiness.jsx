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

  console.log(reviews);

  const businessReviews = reviews.filter(
    (review) => review.businessid === business?.id
  );
  console.log(businessReviews);

  return (
    <div className="business">
      <h3>{business?.businessname}</h3>
      <p>Number of reviews: {businessReviews.length}</p>
      {businessReviews.map((review) => (
        <div key={review?.id} className="businessReviews">
          <p>{review?.comments}</p>
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
