import React from "react";
import "./JobOfferCard.css";
import { useNavigate } from "react-router-dom";

const JobOfferCard = ({ offer, onView, onEdit, onDelete }) => {
  const navigate = useNavigate()
  return (
    <div className="job-card">
      <h3>{offer.title}</h3>
      <p>{offer.description}</p>
      <div className="card-actions">
        <button onClick={() => onView(offer)}>View</button>
        <button onClick={() => onEdit(offer)}>Edit</button>
        <button onClick={() => onDelete(offer._id)}>Delete</button>
        <button onClick={() => navigate(`/job-offer/${offer._id}/applicants`)}>
  See Applied
</button>

      </div>
    </div>
  );
};
export default JobOfferCard;