import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import joboffer from '../services/jobOffer';

const JobResults = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [place, setPlace] = useState('');

  const query = new URLSearchParams(location.search);
  const titleParam = query.get('title') || '';
  const locationParam = query.get('location') || '';
  const salaryMinQuery = query.get('salaryMin');
  const salaryMaxQuery = query.get('salaryMax');

  useEffect(() => {
    setTitle(titleParam);
    setPlace(locationParam);

    const storedData = JSON.parse(sessionStorage.getItem('user'));
    const token = storedData?.refreshToken;

    if ((titleParam || locationParam || salaryMinQuery || salaryMaxQuery) && token) {
      setLoading(true);
      joboffer
        .searchJobOffers(token, {
          title: titleParam,
          location: locationParam,
          salaryMin: salaryMinQuery,
          salaryMax: salaryMaxQuery,
        })
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
                    <p className="card-text mt-2">
                      <strong>Salary:</strong>{' '}
                      ${job.salary?.toLocaleString() || 'Not specified'}
                    </p>
                    {job.location && (
                      <span className="badge bg-secondary me-2">{job.location}</span>
                    )}
                    <span className="badge bg-primary">
                      {job.jobType || 'Job'}
                    </span>
                  </div>
                  <div className="mt-3 d-flex gap-2">
  <Link to={`/job-offer/${job._id}`} className="btn btn-outline-primary w-50">
    View Job Offer
  </Link>
  <Link to={`/apply/${job._id}`} className="btn btn-success w-50">
    Apply Now
  </Link>
</div>

                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>
  No job offers found for the search criteria selected
  {title && <> for <strong>{title}</strong></>}
  {place && <> in <strong>{place}</strong></>}.
  {(salaryMinQuery || salaryMaxQuery) && (
    <>
      {' '}
      No offers were found within the salary range of{' '}
      <strong>
        {salaryMinQuery } - {salaryMaxQuery }
      </strong>.
    </>
  )}

  Please try again with different search criteria or with a different salary range.
  If you believe there should be job offers matching your selection and the issue persists, please contact us. Thank you. – JobPortal Team 👋
</p>
      )}
    </div>
  );
};

export default JobResults;
