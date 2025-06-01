import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CondidateSearchForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [skills, setSkills] = useState('');
  const navigate = useNavigate();

  const handleCompanySearchSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (name) params.append('name', name);
    if (email) params.append('email', email);
    if (location) params.append('location', location);
    if (skills) params.append('skills', skills); 

    navigate(`/Condidate-Result?${params.toString()}`);
  };

  return (
    <form onSubmit={handleCompanySearchSubmit} className="search-condidate-form">
      <div className="row mb-5">
        {/* Name */}
        <div className="col-12 col-sm-6 col-md-3 mb-4">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="col-12 col-sm-6 col-md-3 mb-4">
          <input
            type="email"
            className="form-control form-control-lg"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Location */}
        <div className="col-12 col-sm-6 col-md-3 mb-4">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Skills */}
        <div className="col-12 col-sm-6 col-md-3 mb-4">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Skills (e.g. React,Node)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>

        {/* Submit */}
        <div className="col-12 mt-3">
          <button
            type="submit"
            className="btn btn-secondary btn-lg btn-block text-white btn-search w-100"
          >
            <span className="icon-search icon mr-2" />
            Search Condidates
          </button>
        </div>
      </div>
    </form>
  );
};

export default CondidateSearchForm;
