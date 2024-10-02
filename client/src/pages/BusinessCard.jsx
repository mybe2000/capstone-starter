import React from "react";
import { Link } from "react-router-dom";

function BusinessCard({ business }) {
  return (
    <div>
      <Link to={`/business/${business.id}`}>
        <h3>{business.businessname}</h3>
      </Link>
    </div>
  );
}

export default BusinessCard;
