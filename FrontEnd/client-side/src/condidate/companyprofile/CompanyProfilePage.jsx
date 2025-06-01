import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import companyService from '../../services/companyservice';
import './company.css'; 

export default function PublicCompanyProfile() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('user');
    companyService.getCompanyByID(token, id)
      .then(res => {
        setCompany(res.data.getCompanybyID);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching company', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading-message">Loading company profile...</div>;
  if (!company) return <div className="error-message">Company not found</div>;

  return (
    <div className="profile-card-container">
      <div className="button-container">
        <button onClick={() => navigate(-1)} className="back-button">← Back</button>
      </div>

      <div className="profile-header">
        <img
          src={`http://localhost:3000/uploads/${company.image}`}
          alt="Company Logo"
          className="profile-image"
        />
        <h1 className="profile-name"> Name : {company.name}</h1>
        <p className="profile-info"> Email :{company.email}</p>
        <p className="profile-info">Phone : {company.phone}</p>
      </div>

      <div className="profile-content">
        <div className="profile-left">
          <section className="sectionn">
            <h2 className="section-title">About Us</h2>
            <p className="section-text">{company.description}</p>
          </section>

          <section className="sectionn">
            <h2 className="section-title">Speciality</h2>
            <div className="skills">
              {Array.isArray(company.speciality) && company.speciality.map((spec, idx) => (
  <span key={idx} className="skill-tag">{spec}</span>
))}
            </div>
          </section>

          <section className="sectionn">
            <h2 className="section-title">Website</h2>
            <p className="section-text">
              <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer">
                {company.website}
              </a>
            </p>
          </section>
        </div>

        <div className="profile-right">
          <section className="sectionn">
            <h2 className="section-title">Location</h2>
            <p className="section-text">{company.location}</p>
          </section>

          <section className="sectionn">
            <h2 className="section-title">Profile Status</h2>
            <span className={`status-tag ${company.status === 'approved' ? 'approved' : 'pending'}`}>
              {company.status}
            </span>
          </section>

          <section className="sectionn">
            <h2 className="section-title">View Count</h2>
            <p className="section-text">{company.viewCount} views</p>
          </section>

          <section className="sectionn">
            <h2 className="section-title">Created At</h2>
            <p className="section-text">{new Date(company.createdAt).toLocaleDateString()}</p>
          </section>

         {company?.jobOffers?.length > 0 && (
  <section className="sectionn">
  <h2 className="section-title">Job Offers</h2>
  <ul className="section-list">
    {company.jobOffers.map((offer, index) => (
      <li key={index}>
        <Link to={`/job-offer/${offer._id}`} className="text-blue-600 hover:underline">
          {offer.title || 'Job Offer'}
        </Link>
      </li>
    ))}
  </ul>
</section>
)}

        </div>
      </div>
    </div>
  );
}
