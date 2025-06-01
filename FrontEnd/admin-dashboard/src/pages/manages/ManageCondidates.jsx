import React, { useState, useEffect } from 'react';
import condidateService from '../../services/condidateservice';
import { Modal, Button } from 'react-bootstrap';



const ManageCandidates = () => {
  const [condidates, setCondidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchEmail, setSearchEmail] = useState('');
  const [searchId, setSearchId] = useState('');
  const [searchType, setSearchType] = useState('email');
const [searchValue, setSearchValue] = useState('');


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
  if (!searchValue.trim()) {
    loadCondidates();
    return;
  }

  try {
    if (searchType === 'email') {
      const response = await condidateService.getCondidateByEmail(token, searchValue);
      if (response.data.condidate) {
        setCondidates([response.data.condidate]);
      } else {
        alert('Condidate not found');
      }
    } else if (searchType === 'id') {
      const response = await condidateService.getCondidateById(token, searchValue);
      if (response.data.getCondidateById) {
        setCondidates([response.data.getCondidateById]);
      } else {
        alert('Condidate not found');
      }
    }
  } catch (error) {
    alert('Condidate not found or invalid input');
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
          <div className="d-flex align-items-center gap-2">
  <select
    className="form-select"
    style={{ width: '150px' }}
    value={searchType}
    onChange={(e) => setSearchType(e.target.value)}
  >
    <option value="email">Search by Email</option>
    <option value="id">Search by ID</option>
  </select>

  <input
    type="text"
    className="form-control"
    placeholder={`Enter ${searchType}`}
    value={searchValue}
    onChange={(e) => setSearchValue(e.target.value)}
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