import { useState } from "react";
import BusinessCardList from "./BusinessCardList";

const Businesses = ({ businesses, reviews }) => {
  console.log(businesses);
  const [foundBusiness, setFoundBusiness] = useState(businesses);

  const handleSearch = (e) => {
    const searchResult = businesses.filter((business) =>
      business.businessname.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFoundBusiness(searchResult);
  };

  return (
    <div>
      <h2>{businesses.length} Businesses</h2>
      <p>
        Search for a business:
        <input type="text" name="business" onChange={handleSearch} />
      </p>

      <p>Click on a business to see their reviews</p>
      <BusinessCardList businesses={foundBusiness} reviews={reviews} />
    </div>
  );
};

export default Businesses;
