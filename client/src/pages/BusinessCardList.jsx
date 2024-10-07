import React from "react";

import { Link } from "react-router-dom";

function BusinessCardList({ businesses }) {
  return (
    <div>
      {businesses.map((business) => (
        <div key={business.id}>
          <Link to={`/business/${business.id}`}>
            <h3>{business.businessname}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default BusinessCardList;
