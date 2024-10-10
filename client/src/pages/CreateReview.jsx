import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const CreateReview = ({ auth, businesses, setReviews }) => {
  const { businessId } = useParams();
  const [comments, setComments] = useState(null);
  const [rating, setRating] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const businessName = businesses.find(
    (business) => business.id === businessId
  )?.businessname;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReview = {
      userId: auth.id,
      businessId,
      comments,
      rating,
    };
    console.log(newReview);

    if (!rating) {
      alert("Please provide a star-rating");
      return;
    }
    try {
      const response = await axios
        .post("/api/reviews", newReview)
        .then((data) => {
          console.log(data.data);
          setReviews((reviews) => [...reviews, data.data]);
          setSubmitted(true);
          document.getElementById("reviewForm").reset();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleComments = (e) => {
    setComments(e.target.value);
  };
  const handleRating = (e) => {
    setRating(e.target.value);
  };

  return (
    <div>
      <h2>{businessName}</h2>
      <form onSubmit={handleSubmit} id="reviewForm">
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
        {submitted ? (
          <div>
            <p>Review submitted!</p>
            <Link to="/businesses">Write another review</Link>
          </div>
        ) : (
          <button>Submit</button>
        )}
      </form>
    </div>
  );
};

export default CreateReview;
