import React, { useState, useEffect } from "react";
import axios from "axios";

function CreateBusiness({ auth, businesses, setBusinesses }) {
  console.log(auth, businesses);
  const [newBusiness, setNewBusiness] = useState({
    businessname: "",
    imageUrl: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/businesses", newBusiness);
      console.log(response.data);
      setBusinesses(response.data);
      setNewBusiness({ businessname: "", imageUrl: "" });
      document.getElementById("addBusinessForm").reset();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleInput = (e) => {
    setNewBusiness({ ...newBusiness, [e.target.name]: e.target.value });
  };
  console.log(newBusiness);

  return (
    <div>
      <h2>Add a new business</h2>
      <form id="addBusinessForm" onSubmit={handleSubmit}>
        <label>
          Name of the business:
          <input type="text" name="businessname" onChange={handleInput} />
        </label>
        <label>
          Image Url:
          <input type="text" name="imageUrl" onChange={handleInput} />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default CreateBusiness;
