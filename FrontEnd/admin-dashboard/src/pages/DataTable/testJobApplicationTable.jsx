
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import testJobApplicationService from '../../services/testjobapplication';
import "bootstrap/dist/css/bootstrap.min.css";

const TestJobApplicationTable = () => {
  const { id } = useParams();
  const [testJobApplication, setTestJobApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')).tokens.refreshToken
    : null;

  useEffect(() => {
    const fetchTestJobApplication = async () => {
      try {
        const response = await testJobApplicationService.findTestJobApplicationById(token, id);
        if (response.data && response.data.getJobtestByid) {
          setTestJobApplication(response.data.getJobtestByid);
        } else {
          console.error("Invalid test job application data received", response.data);
          setTestJobApplication(null);
        }
      } catch (error) {
        console.error("Error fetching test job application:", error);
        setTestJobApplication(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTestJobApplication();
  }, [id, token]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!testJobApplication) {
    return <p className="text-danger">No test job application found.</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Test Job Application Details</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Questions</th>
              <th>Condidate ID</th>
              <th>Job Offer ID</th>
              <th>Score</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{testJobApplication._id}</td>
              <td>{testJobApplication.title}</td>
              <td>{testJobApplication.description}</td>
              <td>
                {testJobApplication.questions && testJobApplication.questions.length > 0 ? (
                  <ul>
                    {testJobApplication.questions.map((q, index) => (
                      <li key={index}>{q.question}</li>
                    ))}
                  </ul>
                ) : (
                  "No questions"
                )}
              </td>
              <td>
                {testJobApplication.condidate && testJobApplication.condidate.length > 0
                  ? testJobApplication.condidate.join(", ")
                  : "N/A"}
              </td>
              <td>{testJobApplication.jobOffer || "N/A"}</td>
              <td>{testJobApplication.score}</td>
              <td>{new Date(testJobApplication.createdAt).toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestJobApplicationTable;
