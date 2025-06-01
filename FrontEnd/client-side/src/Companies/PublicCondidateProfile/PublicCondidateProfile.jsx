import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import condidateService from '../../services/condidateService';
import './PublicCondidateProfile.css';

export default function PublicCondidateProfile() {
  const { id } = useParams();
  const [condidate, setCondidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('user');
    condidateService.getCondidateById(token, id)
      .then(res => {
        setCondidate(res.data.getCondidateById);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching condidate', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading-message">Loading profile...</div>;
  if (!condidate) return <div className="error-message">Condidate not found</div>;

  return (
    <div className="profile-card-container">
      <button onClick={() => navigate(-1)} className="back-button">
  ← Back
</button>
    
      <div className="profile-header">
        <img
          src={`http://localhost:3000/uploads/${condidate.image}`}
          alt="Profile"
          className="profile-image"
        />
        <h1 className="profile-name">{condidate.name}</h1>
        <p className="profile-info">{condidate.email}</p>
        <p className="profile-info">{condidate.phone}</p>
      </div>

      <div className="profile-content">
        <div className="profile-left">
          
    <section className='sectionn'>
            <h2 className="section-title">Description</h2>
            <p className="section-text">{condidate.description}</p>
          </section>
          <section className='sectionn'>
            <h2 className="section-title">Skills</h2>
            <div className="skills">
              {condidate.skills.map((skill, idx) => (
                <span key={idx} className="skill-tag">  {skill}</span>
              ))}
            </div>
          </section>

          <section className='sectionn'>
            <h2 className="section-title">Education</h2>
            <p className="section-text">{condidate.education}</p>
          </section>

          <section className='sectionn'>
            <h2 className="section-title">Work Experience</h2>
            <p className="section-text">{condidate.workExperience}</p>
          </section>
        </div>

        <div className="profile-right">
          <section className='sectionn'>
            <h2 className="section-title">Location</h2>
            <p className="section-text">{condidate.location}</p>
          </section>
              
          <section className='sectionn'>
            <h2 className="section-title">Profile Status</h2>
            <span className={`status-tag ${condidate.status === 'approved' ? 'approved' : 'pending'}`}>
              {condidate.status}
            </span>
          </section>

          <section className='sectionn'>
            <h2 className="section-title">View Count</h2>
            <p className="section-text">{condidate.viewCount} views</p>
          </section>

          <section className='sectionn'> 
            <h2 className="section-title">Created At</h2>
            <p className="section-text">{new Date(condidate.createdAt).toLocaleDateString()}</p>
          </section>

          {condidate.jobApplications.length > 0 && (
            <section className='sectionn'>
              <h2 className="section-title">Job Applications</h2>
              <ul className="section-list">
                {condidate.jobApplications.map((app, index) => (
                  <li key={index}>{app.title || 'Job Application'}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
