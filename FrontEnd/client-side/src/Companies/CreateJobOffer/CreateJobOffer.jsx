import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jobOfferService from "../../services/jobOffer";
import Header from "../../componenets/header";
import Footer from "../../componenets/Footer";

const CreateJobOffer = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    requiredSkills: "",
    salary: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userSession = JSON.parse(sessionStorage.getItem("user"));
      const token = userSession?.refreshToken;
      const companyId = userSession?.user?._id;

      const jobOfferData = {
        ...formData,
        requiredSkills: formData.requiredSkills.split(",").map((s) => s.trim()),
        company: companyId,
      };

      await jobOfferService.createJobOffer(token, jobOfferData);
      alert("Job Offer Created Successfully");
      navigate("/Dashboard/company");
    } catch (err) {
      alert("Error creating job offer: " + err.response?.data?.message);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Create New Job Offer</h2>
        <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
          <div className="mb-3">
            <label className="form-label">Title:</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description:</label>
            <textarea
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Requirements:</label>
            <textarea
              name="requirements"
              className="form-control"
              value={formData.requirements}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Location:</label>
            <input
              type="text"
              name="location"
              className="form-control"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Required Skills (comma separated):</label>
            <input
              type="text"
              name="requiredSkills"
              className="form-control"
              value={formData.requiredSkills}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Salary:</label>
            <input
              type="text"
              name="salary"
              className="form-control"
              value={formData.salary}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Create</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreateJobOffer;
