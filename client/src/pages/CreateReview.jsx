import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CreateReview = ({ userId, businesses }) => {
  const { businessId } = useParams();
  const [comments, setComments] = useState(null);
  const [rating, setRating] = useState(null);
  const [foundBusiness, setFoundBusiness] = useState(businesses);

  const handleSearch = (e) => {
    const searchResult = businesses.filter((business) =>
      business.businessname.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFoundBusiness(searchResult);
    console.log(foundBusiness);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(businessId);
    console.log(userId);
    const newReview = {
      userId,
      businessId,
      comments: comments,
      rating: rating,
    };
    console.log(newReview);

    axios
      .post("/api/reviews", newReview)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  const handleComments = (e) => {
    setComments(e.target.value);
  };
  const handleRating = (e) => {
    setRating(e.target.value);
  };

  return (
    <div>
      <p>
        Search for a business:
        <input type="text" name="business" onChange={handleSearch} />
      </p>

      <form onSubmit={handleSubmit}>
        <textarea
          name="comments"
          rows="8"
          cols="50"
          onChange={handleComments}
        ></textarea>
        <p>Please select a rating: </p>

        <label>
          <input type="radio" value="1" name="rating" onChange={handleRating} />{" "}
          1 ⭐
        </label>
        <label>
          <input type="radio" value="2" name="rating" onChange={handleRating} />{" "}
          2 ⭐⭐
        </label>
        <label>
          <input type="radio" value="3" name="rating" onChange={handleRating} />{" "}
          3 ⭐⭐⭐
        </label>
        <label>
          <input type="radio" value="4" name="rating" onChange={handleRating} />{" "}
          4 ⭐⭐⭐⭐
        </label>
        <label>
          <input type="radio" value="5" name="rating" onChange={handleRating} />{" "}
          5 ⭐⭐⭐⭐⭐
        </label>
        {businessId && <button>Submit</button>}
      </form>
    </div>
  );
};

export default CreateReview;
