import React, { useState, useEffect } from 'react';
import companyService from '../../services/companyservice';
import { Modal, Button } from 'react-bootstrap';

const ManageCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const token = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user")).tokens.refreshToken
  : null;

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      const response = await companyService.getAllCompanies(token);
      setCompanies(response.data.companies);
    } catch (error) {
      alert('There are no companies available.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      try {
        await companyService.deleteCompany(token, id);
        alert('Company deleted successfully');
        loadCompanies();
      } catch (error) {
        alert('Failed to delete company');
      }
    }
  };

  const handleSearch = async () => {
    if (!searchQuery) {
      loadCompanies();
      return;
    }
    try {
      const response = await companyService.getCompanyByQuery(token, searchQuery); 
      setCompanies(response.data); 
    } catch (error) {
      alert('No companies found.');
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await companyService.updateDesiredFields(token, id, { status });
      alert(`Company ${status} successfully`);
      loadCompanies();
    } catch (error) {
      alert(`Failed to ${status} company`);
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
          <h5 className="card-title">Manage Companies</h5>
          <div className="d-flex gap-3">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name, email, or location"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
            
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company._id}>
                  <td>{company.name}</td>
                  <td>{company.email}</td>
                  <td>{company.phone}</td>
                  <td>{company.location}</td>
                  
                  <td>
                    <span className={`badge ${
                      company.status === 'approved' ? 'bg-success' :
                      company.status === 'rejected' ? 'bg-danger' :
                      'bg-warning'
                    }`}>
                      {company.status || 'Pending'}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex justify-content-end gap-2">
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() => handleStatusUpdate(company._id, 'approved')}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleStatusUpdate(company._id, 'rejected')}
                      >
                        Reject
                      </Button>
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() => {
                          if (!company._id) {
                            console.error("Company ID is undefined");
                            return;
                          }
                          window.location.href = `/company/${company._id}`;
                        }}
                      >
                        View
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(company._id)}
                      >
                        Delete
                      </Button>
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

export default ManageCompanies;
