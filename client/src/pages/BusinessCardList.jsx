import React from "react";
import { Link } from "react-router-dom";

function BusinessCardList({ businesses, reviews }) {
  return (
    <div className="businessCardList">
      {businesses.map((business) => (
        <div key={business.id}>
          <Link to={`/business/${business.id}`} className="businessLinks">
            <div className="businessCard">
              <h3>{business.businessname} </h3>
              <img src={business.imageurl} />
            </div>
            <p>
              Number of reviews:
              {
                reviews.filter((review) => review.businessid === business.id)
                  .length
              }
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default BusinessCardList;
