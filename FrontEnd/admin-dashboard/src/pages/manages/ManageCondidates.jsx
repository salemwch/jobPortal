import React, { useState, useEffect } from 'react';
import condidateService from '../../services/condidateservice';
import { Modal, Button } from 'react-bootstrap';



const ManageCandidates = () => {
  const [condidates, setCondidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchEmail, setSearchEmail] = useState('');
  const token = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user")).tokens.refreshToken
  : null;

  useEffect(() => {
    loadCondidates();
  }, []);

  const loadCondidates = async (token) => {
    try {
      const response = await condidateService.getAllCondidates(token);
      setCondidates(response.data.condidates);
      setLoading(false);
    } catch (error) {
      alert('there is no  candidates');
      setLoading(false);
    }
  };

  const handleDelete = async (token,id) => {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      try {
        await condidateService.deleteCondidate(token, id);
        alert('Candidate deleted successfully');
        loadCondidates();
      } catch (error) {
        alert('Failed to delete candidate');
      }
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await condidateService.updateDesiredFields(token, id, { status });
      alert(`Candidate ${status} successfully`);
      loadCondidates();
    } catch (error) {
      alert(`Failed to ${status} candidate`);
    }
  };

  const handleSearch = async () => {
    if (!searchEmail) {
      loadCondidates();
      return;
    }
    
    try {
      const response = await condidateService.getCondidateByEmail(token, searchEmail);
      if (response.data.condidate) {
        setCondidates([response.data.condidate]);
      }
    } catch (error) {
      alert('Candidate not found');
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
          <h5 className="card-title">Manage Condidates</h5>
          <div className="d-flex gap-3">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search by email"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
              />
              <button 
                className="btn btn-outline-secondary" 
                type="button"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
            <button 
              className="btn btn-primary"
              onClick={() => window.location.href = '/dashboard/candidates/new'}
            >
              Add Candidate
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>View Count</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {condidates.map((condidate) => (
                <tr key={condidate._id}>
                  <td>{condidate.name}</td>
                  <td>{condidate.email}</td>
                  <td>
                    <span className={`badge ${
                      condidate.status === 'approved' ? 'bg-success' :
                      condidate.status === 'rejected' ? 'bg-danger' :
                      'bg-warning'
                    }`}>
                      {condidate.status || 'Pending'}
                    </span>
                  </td>
                  <td>{condidate.viewCount || 0}</td>
                  <td>
                    <div className="d-flex justify-content-end gap-2">
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() => handleStatusUpdate(condidate._id, 'approved')}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleStatusUpdate(condidate._id, 'rejected')}
                      >
                        Reject
                      </Button>
                      <Button
  variant="info"
  size="sm"
  onClick={() => {
    if (!condidate._id) {
      console.error("Condidate ID is undefined");
      return;
    }
    window.location.href = `/condidates/${condidate._id}`;
  }}
>
  View
</Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick ={() => handleDelete(condidate._id)}
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

export default ManageCandidates;