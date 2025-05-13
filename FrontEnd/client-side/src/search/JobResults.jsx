import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import jobofferService from '../services/jobOffer';

const JobResults = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [place, setPlace] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const titleParam    = queryParams.get('title')    || '';
    const locationParam = queryParams.get('location') || '';

    setTitle(titleParam);
    setPlace(locationParam);

    const storedData = JSON.parse(sessionStorage.getItem('user'));
    const token = storedData?.refreshToken;

    if ((titleParam || locationParam) && token) {
      setLoading(true);
      jobofferService
        .searchJobOffers(token, { title: titleParam, location: locationParam })
        .then((res) => {
          setResults(res.data.results);
        })
        .catch((err) => {
          console.error('Search error:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [location.search]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">
        Search Results 
        {title && <> for <strong>{title}</strong></>}
        {place && <> in <strong>{place}</strong></>}
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : results.length > 0 ? (
        <div className="row">
          {results.map((job) => (
  <div className="col-md-6 mb-4" key={job._id}>
    <div className="card shadow-sm h-100">
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title">{job.title}</h5>
          <p className="card-text">{job.description}</p>
          {job.location && (
            <span className="badge bg-secondary me-2">
              {job.location}
            </span>
          )}
          <span className="badge bg-primary">
            {job.jobType || 'Job'}
          </span>
        </div>
        <div className="mt-3">
          <Link to={`/apply/${job._id}`} className="btn btn-success w-100">
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  </div>
))}

        </div>
      ) : (
        <p>No job offers found for the search criteria selected {title && <>for <strong>{title}</strong></>} {place && <>in <strong>{place}</strong></>} . Please try again with different search criteria. If you think there is joboffer in this criteria you choose and if  the issue persists, please contact us. Thank you. - JobPortal Team 👋  </p>
      )}
    </div>
  );
};

export default JobResults;
