import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import condidateService from '../../services/condidateService';
import useAuth from '../../hooks/useAuth';
import './condidateResults.css';

const CondidateResults = () => {
  const location = useLocation();
  const { token } = useAuth();
  const [condidates, setCondidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('name');
  const email = queryParams.get('email');
  const locationParam = queryParams.get('location');
  const skills = queryParams.get('skills');

  useEffect(() => {
    const fetchCondidates = async () => {
      try {
        const response = await condidateService.searchCandidates(token, {
          name,
          skills,
          email,
          location: locationParam,
        });
        setCondidates(response.data.candidates || []);
      } catch (error) {
        console.error('Error fetching condidates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCondidates();
  }, [token, name, skills, email, locationParam]);

  return (
    <div className="results-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      
      <h2 className="results-title">
        {name && <> for <strong>{name}</strong></>}
        {locationParam && <> in <strong>{locationParam}</strong></>}
      </h2>
      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : condidates.length > 0 ? (
        <div className="condidates-grid">
          {condidates.map((c) => (
  <div className="condidate-card" key={c._id}>
    <h3>{c.name}</h3>
    <p><strong>Email:</strong> {c.email}</p>
    <p><strong>Location:</strong> {c.location}</p>
    <p><strong>Phone:</strong> {c.phone || 'N/A'}</p>
    <p><strong>Skills:</strong></p>
    <div className="skills-badge-list">
      {c.skills?.map((s, i) => (
        <span className="badge" key={i}>{s}</span>
      )) || 'N/A'}
    </div>
    <p className="created-at">Joined: {new Date(c.createdAt).toLocaleDateString()}</p>

    {/* 👇 Add this button for viewing profile */}
    <Link to={`/PublicCondidateProfile/${c._id}`} className="view-profile-btn">
      View Profile
    </Link>
  </div>
))}

        </div>
      ) : (
        <p className="no-results">No condidates found matching your criteria.</p>
      )}
    </div>
  );
};

export default CondidateResults;
