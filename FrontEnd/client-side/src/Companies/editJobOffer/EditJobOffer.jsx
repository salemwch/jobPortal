import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jobOfferService from "../../services/jobOffer";
import Header from "../../componenets/header";

const EditJobOffer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [requiredSkillsInput, setRequiredSkillsInput] = useState("");

  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    requiredSkills: [],
    salary: "",
  });

  useEffect(() => {
    const fetchJobOffer = async () => {
      try {
        const userSession = JSON.parse(sessionStorage.getItem("user"));
        const token = userSession?.refreshToken;
        const response = await jobOfferService.getDataById(token, id);
        const job = response.data;

        setJobData({
          title: job.title || "",
          description: job.description || "",
          requirements: job.requirements || "",
          location: job.location || "",
          salary: job.salary || "",
          requiredSkills: Array.isArray(job.requiredSkills)
            ? job.requiredSkills
            : [],
        });

        setRequiredSkillsInput(
          Array.isArray(job.requiredSkills)
            ? job.requiredSkills.join(" ")
            : ""
        );
      } catch (err) {
        console.error("Failed to fetch job offer:", err);
      }
    };

    fetchJobOffer();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "requiredSkills") {
      setRequiredSkillsInput(value);
      setJobData({
        ...jobData,
        requiredSkills: value
          .split(/\s+/) // split on spaces
          .map((s) => s.trim())
          .filter(Boolean), // remove empty strings
      });
    } else if (name === "salary") {
      setJobData({
        ...jobData,
        salary: parseFloat(value),
      });
    } else {
      setJobData({
        ...jobData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userSession = JSON.parse(sessionStorage.getItem("user"));
      const token = userSession?.refreshToken;
      await jobOfferService.updateJobOffer(token, id, jobData);
      alert("Job offer updated successfully!");
      navigate("/Dashboard/company");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update job offer.");
    }
  };

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <h2>Edit Job Offer</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              name="title"
              value={jobData.title}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={jobData.description}
              onChange={handleChange}
              className="form-control"
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Requirements</label>
            <textarea
              name="requirements"
              value={jobData.requirements}
              onChange={handleChange}
              className="form-control"
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Location</label>
            <textarea
              name="location"
              value={jobData.location}
              onChange={handleChange}
              className="form-control"
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Required Skills</label>
            <textarea
              name="requiredSkills"
              value={requiredSkillsInput}
              onChange={handleChange}
              className="form-control"
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Salary</label>
            <textarea
              name="salary"
              value={jobData.salary}
              onChange={handleChange}
              className="form-control"
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditJobOffer;
