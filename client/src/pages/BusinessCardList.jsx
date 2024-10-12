import React from "react";
import { Link } from "react-router-dom";

function BusinessCardList({ businesses, reviews }) {
  return (
    <div>
      {businesses.map((business) => (
        <div key={business.id} className="businessLinksBox">
          <Link to={`/business/${business.id}`} className="businessLinks">
            <div className="businessRating">
              <h3>{business.businessname} </h3>
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
