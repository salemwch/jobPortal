import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import jobOfferService from '../../services/jobOfferservice';

const ManageOffers = () => {
  const [jobOffer, setJobOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTitle, setSearchTitle] = useState('');
  
  const token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem("user")).tokens.refreshToken
  : null;

  useEffect(() => {
    loadJobOffers();
  }, []);

  const loadJobOffers = async () => {
    try {
      const response = await jobOfferService.getAllJobOffers(token);
      setJobOffers(response.data.findALLJobs);
      setLoading(false);
    } catch (error) {
      alert('Failed to load job offers');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job offer?')) {
      try {
        await jobOfferService.deleteJobOffer(token, id);
        alert('Job offer deleted successfully');
        loadJobOffers();
      } catch (error) {
        alert('Failed to delete job offer');
      }
    }
  };

  const handleSearch = async () => {
    if (!searchTitle) {
      loadJobOffers();
      return;
    }
    try {
      const response = await jobOfferService.searchJobOffers(token, { title: searchTitle });
      setJobOffers(response.data.results);
    } catch (error) {
      alert('No job offers found');
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await jobOfferService.updateStatus(token, id, {status});
      alert(`Job offer ${status} successfully`);
      loadJobOffers();
    } catch (error) {
      alert(`Failed to ${status} job offer`);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center p-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="card-title">Manage Job Offers</h5>
          <div className="d-flex gap-3">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search by title"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
              />
              <button className="btn btn-outline-secondary" onClick={handleSearch}>Search</button>
            </div>
            <button className="btn btn-primary" onClick={() => window.location.href = '/dashboard/job-offers/new'}>
              Add Job Offer
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Location</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobOffer.map((offer) => (
                <tr key={offer._id}>
                  <td>{offer._id}</td>
                  <td>{offer.title}</td>
                  <td>{offer.description}</td>
                  <td>{offer.location}</td>
                  <td>
                    <span className={`badge ${
                        offer.status === 'approved' ? 'bg-success':
                        offer.status === 'rejected' ? 'bg-danger':
                        'bg-warning'
                    }`}>
                    {offer.status || 'Pending'}
                    </span>
                  </td>
                  
                  <td>
                    <div className="d-flex justify-content-end gap-2">
                     
                      <Button variant="info" size="sm" onClick={() => handleStatusUpdate(offer._id, 'approved')}>Approve</Button>
                      <Button variant="danger" size="sm" onClick={() => handleStatusUpdate(offer._id, 'rejected')}>Reject</Button>
                      <Button 
                        variant="info" 
                        size="sm" 
                        onClick={() => {
                          if(!offer){
                            console.log("offer id is undefind");
                            return;
                          }
                          window.location.href = `/job-offer/${offer._id}`;
                        }}
                      >View</Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(offer._id)}>Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageOffers;
