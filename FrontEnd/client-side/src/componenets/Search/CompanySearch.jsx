import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CompanySearch = () => {
  const [searchText, setSearchText] = useState('');
  const [locationText, setLocationText] = useState('');
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (searchText.trim()) params.append('title', searchText.trim());
    if (locationText.trim()) params.append('location', locationText.trim());
    if (salaryMin && !isNaN(salaryMin)) params.append('salaryMin', salaryMin);
    if (salaryMax && !isNaN(salaryMax)) params.append('salaryMax', salaryMax);

    navigate(`/job-results?${params.toString()}`);
  };
return (
    <form onSubmit={handleSearchSubmit} className="search-jobs-form">
  <div className="row mb-5">
    <div className="col-12 col-sm-6 col-md-4 mb-4 mb-lg-0">
      <input
        type="text"
        className="form-control form-control-lg"
        placeholder="Job title..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>

    {/* Location dropdown */}
    <div className="col-12 col-sm-6 col-md-4 mb-4 mb-lg-0">
      <select
        value={locationText}
        onChange={(e) => setLocationText(e.target.value)}
        className="form-control form-control-lg"
      >
        <option value="">Anywhere</option>
        <option value="sousse">Sousse</option>
        <option value="tunis">Tunis</option>
        <option value="england">England</option>
      </select>
    </div>

    {/* Salary Min */}
    <div className="col-6 col-md-2 mb-4 mb-lg-0">
      <input
        type="number"
        className="form-control form-control-lg"
        placeholder="Min Salary"
        value={salaryMin}
        onChange={(e) => setSalaryMin(e.target.value)}
      />
    </div>

    {/* Salary Max */}
    <div className="col-6 col-md-2 mb-4 mb-lg-0">
      <input
        type="number"
        className="form-control form-control-lg"
        placeholder="Max Salary"
        value={salaryMax}
        onChange={(e) => setSalaryMax(e.target.value)}
      />
    </div>

    {/* Submit Button */}
    <div className="col-12 mt-3">
      <button
        type="submit"
        className="btn btn-primary btn-lg btn-block text-white btn-search w-100"
      >
        <span className="icon-search icon mr-2" />
        Search
      </button>
    </div>
  </div>
</form>
  );
};

export default CompanySearch;