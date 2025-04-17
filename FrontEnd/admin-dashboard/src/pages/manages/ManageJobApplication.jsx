import React, { useEffect, useState } from "react";
import jobApplicationService from "../../services/jobApplicationService";
import {  useNavigate } from "react-router-dom";

const ManageJobApplication = () => {
  const [jobApplications, setJobApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate()
  const token = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).tokens.refreshToken
    : null;

  useEffect(() => {
    fetchJobApplications();
  }, []);

  const fetchJobApplications = async () => {
    try {
      const response = await jobApplicationService.findAllJobApplications(token);
      setJobApplications(response.data.findALlAplication);
    } catch (err) {
      setError("Failed to fetch job applications.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job application?")) {
      try {
        await jobApplicationService.deleteJobApplication(token, id);
        alert("Job Application deleted successfully");
        fetchJobApplications();
      } catch (error) {
        alert("Failed to delete job application");
      }
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      console.log("Sending status:", status); // Debugging

      const response = await jobApplicationService.updateJobApplicationStatus(token, id, { status });
      console.log("Response:", response.data); // Debugging

  
      alert(`Job application ${status} successfully`);
      fetchJobApplications();
    } catch (error) {
      console.error("Error updating status:", error.response?.data || error.message);
      alert(`Failed to ${status} job application`);
    }
  };
  

  const handleViewDetails = (id) => {
  navigate(`/jobapplication/${id}`);  };
  

  if (loading) {
    return <p>Loading job applications...</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Job Applications</h2>
      {error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Job Offer ID</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th> {/* Added actions column */}
            </tr>
          </thead>
          <tbody>
            {jobApplications.length > 0 ? (
              jobApplications.map((app) => (
                <tr key={app._id}>
                  <td>{app._id}</td>
                  <td>{app.jobOffer}</td>
                  <td>
                    <span
                      className={`badge ${
                        app.status === "approved"
                          ? "bg-success"
                          : app.status === "rejected"
                          ? "bg-danger"
                          : "bg-warning"
                      }`}
                    >
                      {app.status || "Pending"}
                    </span>
                  </td>
                  <td>{new Date(app.createdAt).toLocaleString()}</td>
                  <td>
                    {/* Buttons */}
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => handleViewDetails(app._id)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() => handleStatusUpdate(app._id, "approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-sm btn-danger me-2"
                      onClick={() => handleStatusUpdate(app._id, "rejected")}
                    >
                      Reject
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(app._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No job applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageJobApplication;
