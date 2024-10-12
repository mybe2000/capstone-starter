import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const CreateReview = ({ auth, businesses, setReviews }) => {
  const { businessId } = useParams();
  const [comments, setComments] = useState(null);
  const [rating, setRating] = useState(null);

  const [businessToReview, setBusinessToReview] = useState({});
  console.log(businessToReview);
  const [submitted, setSubmitted] = useState(false);
  // const business = businesses.find((business) => business.id === businessId);
  // console.log(business);
  // const businessName = businesses.find(
  //   (business) => business.id === businessId
  // )?.businessname;
  // console.log(businessName);
  console.log(businessToReview);
  console.log(businessId);

  useEffect(() => {
    axios(`/api/businesses/${businessId}`)
      .then((data) => {
        console.log(data.data);
        setBusinessToReview(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = (e) => {
    const searchResult = businesses.find((business) =>
      business.businessname.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setBusinessToReview(searchResult);
    setSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReview = {
      userId: auth.id,
      businessId: businessId || businessToReview.id,
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
          setBusinessToReview("");
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
      <form onSubmit={handleSubmit} id="reviewForm">
        <label>
          Search for a business:
          <input type="text" name="business" onChange={handleSearch} />
        </label>
        <h3>
          {businessId || businessToReview ? businessToReview.businessname : ""}
        </h3>
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
        {submitted && <p>Review submitted!</p>}

        {businessToReview && <button>Submit</button>}
      </form>
    </div>
  );
};

export default CreateReview;
