import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import jobApplicationService from "../../services/jobApplicationService";

const JobApplicationTable = () => {
  const { id } = useParams();
  const [jobApplication, setJobApplication] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    fetchJobApplication();
  }, []);

  const fetchJobApplication = async () => {
    const token = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).tokens.refreshToken : null;

    if (!token) {
      console.error("No authentication token found");
      return;
    }
    try {
      const response = await jobApplicationService.findJobApplicationById(token, id);
      setJobApplication(response.data.findApplicationBYID);  
    } catch (err) {
      setError("Failed to fetch job application details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h2>Job Application Details</h2>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th>ID</th>
            <td>{jobApplication._id}</td>
          </tr>
          <tr>
            <th>Candidate ID</th>
            <td>{jobApplication.condidate}</td>
          </tr>
          <tr>
            <th>Job Offer ID</th>
            <td>{jobApplication.jobOffer}</td>
          </tr>
          <tr>
            <th>Test Application ID</th>
            <td>{jobApplication.testJobApplication}</td>
          </tr>
          <tr>
            <th>Score</th>
            <td>{jobApplication.score}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>{jobApplication.status}</td>
          </tr>
          <tr>
            <th>Created At</th>
            <td>{new Date(jobApplication.createdAt).toLocaleString()}</td>
          </tr>
        </tbody>
      </table>

      <h3>Test Results</h3>
      {jobApplication.testResults.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Question ID</th>
              <th>Answer</th>
              <th>Is Correct</th>
            </tr>
          </thead>
          <tbody>
            {jobApplication.testResults.map((result, index) => (
              <tr key={index}>
                <td>{result.questionId}</td>
                <td>{result.answer || "No Answer"}</td>
                <td>{result.isCorrect !== null ? (result.isCorrect ? "✅" : "❌") : "Not Evaluated"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No test results available.</p>
      )}
    </div>
  );
};

export default JobApplicationTable;
