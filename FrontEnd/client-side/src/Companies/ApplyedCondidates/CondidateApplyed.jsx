import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jobapplicationService from "../../services/jobApplication"; 
import "./CondidateApplyed.css";

const CondidateApplyed = () => {
  const { id } = useParams(); // jobOffer ID
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const userSession = JSON.parse(sessionStorage.getItem("user"));
        const token = userSession?.refreshToken;
        const response = await jobapplicationService.getApplicantsByJobOffer(token, id);
        setApplicants(response.data.getApplyed || []);
      } catch (error) {
        console.error("Failed to fetch applicants", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [id]);

  return (
    <div className="applied-candidates-container">
        
      <h2>Condidates Who Applied</h2>
      {loading ? (
        <p>Loading...</p>
      ) : applicants.length === 0 ? (
        <p>No applications yet for this job offer.</p>
      ) : (
        <ul className="applicant-list">
          {applicants.map((applicant) => (
            <li key={applicant._id} className="applicant-item">
                <button onClick={() => navigate(-1)} className="back-buttonn">
      ⬅ Back
    </button>
              <h4>{applicant.condidate.name}</h4>
              <p>Email: {applicant.condidate.email}</p>
              <p>Phone: {applicant.condidate.phone}</p>
              <p>Message: {applicant.message}</p>
              <button
                onClick={() => navigate(`/PublicCondidateProfile/${applicant.condidate._id}`)}
                className="view-profile-btn"
              >
                View Condidate
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CondidateApplyed;
