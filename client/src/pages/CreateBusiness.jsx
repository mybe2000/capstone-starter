import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
axios.defaults.baseURL = import.meta.env.VITE_DATABASE_URL;

function CreateBusiness({ auth, businesses, setBusinesses }) {
  const navigate = useNavigate();

  const [newBusiness, setNewBusiness] = useState({
    businessname: "",
    imageUrl: "",
  });

  const handleInput = (e) => {
    setNewBusiness({ ...newBusiness, [e.target.name]: e.target.value });
  };
  console.log(newBusiness);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/businesses", newBusiness);
      console.log(response.data);
      setBusinesses((businesses) => [...businesses, response.data]);
      setNewBusiness({ businessname: "", imageUrl: "" });
      alert("Business successfully created");
      document.getElementById("addBusinessForm").reset();
      navigate("/businesses");
    } catch (error) {
      console.log("Error:", error);
    }
  };

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
