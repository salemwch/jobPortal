import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; 
import "./jobapplicationform.css";
import Header from "../componenets/header";

const JobApplicationForm = () => {
  const { jobOfferId } = useParams(); 

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    experience: "",
    motivationLetter: "",
    cvUrl: "",
    jobOffer: jobOfferId || "",  
    condidate: JSON.parse(sessionStorage.getItem("user"))?.user?._id || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit function triggered");
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("experience", formData.experience);
      formDataToSend.append("motivationLetter", formData.motivationLetter);

      if (formData.cvUrl) {
        formDataToSend.append("cvUrl", formData.cvUrl);
      }

      const userData = JSON.parse(sessionStorage.getItem("user"));
      const condidateId = userData?.user?._id;
      const token = userData?.refreshToken;

      formDataToSend.append("condidate", condidateId);
      formDataToSend.append("jobOffer", formData.jobOffer);

      const response = await axios.post(
        "http://localhost:3000/jobapplication",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Job application created successfully!");
      }
    } catch (error) {
      console.error("Error creating job application:", error);
      const serverError = error.response?.data?.error || error.response?.data?.message || error.message;
    
      if (serverError === "This condidate has already applied for this job") {
        alert("You have already applied for this job offer.");
      } else {
        alert("Failed to create job application. Reason: " + serverError);
      }
    }
  };

  return (
    <div>
      <Header/>
      <form className="formdat" onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Experience:</label>
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Motivation Letter:</label>
          <textarea
            name="motivationLetter"
            value={formData.motivationLetter}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>CV (File):</label>
          <input
            type="file"
            name="cvUrl"
            onChange={handleFileChange}
            required
          />
        </div>
        
        <button type="submit">Apply</button>
      </form>
    </div>
  );
};

export default JobApplicationForm;
