import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import testJobApplication from '../../services/testjobapplication';
import { useNavigate } from 'react-router-dom';

const ManageTestJobApplications = () => {
  const [testApplications, setTestApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem("user")).tokens.refreshToken
  : null;;

  useEffect(() => {
    fetchTestApplications();
  }, []);

  const fetchTestApplications = async () => {
    try {
      const response = await testJobApplication.findAllTestJobApplications(token);
     
      setTestApplications(response.data.FindALLJobtest || []);
    } catch (error) {
      console.error('Error fetching test job applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this test job application?')) {
      try {
        await testJobApplication.deleteTestJobApplication(token, id);
        fetchTestApplications();
      } catch (error) {
        console.error('Error deleting test job application:', error);
      }
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
        <h5 className="card-title">Manage Test Job Applications</h5>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Created At</th>
                <th>Condidate ID</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(testApplications) && testApplications.length > 0 ? (
                testApplications.map((test) => (
                  <tr key={test._id}>
                    <td>{test._id}</td>
                    <td>{new Date(test.createdAt).toLocaleDateString()}</td>
                    <td>
                      {test.condidate && test.condidate.length > 0
                        ? test.condidate.join(", ")
                        : "Unknown"}
                    </td>
                    <td>
                      <div className="d-flex justify-content-end gap-2">
                        <Button
                        variant='info'
                        size='ms'
                        onClick={()=>{
                            if(!test){
                                console.log("offer id is undesfined");
                                return;
                            }
                            window.location.href =`/testJobApplication/${test._id}`;
                        }}> View </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(test._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No test job applications found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageTestJobApplications;
