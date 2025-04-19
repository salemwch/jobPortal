import HTTP from "./context-service"

const createJobApplication = (token, jobApplicationData) => {
  return HTTP.post("/jobapplication", jobApplicationData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const findJobApplicationsByStatus = (token, status) => {
  return HTTP.get(`/jobapplication/status/${status}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const findJobApplicationById = (token, id) => {
  return HTTP.get(`/jobapplication/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const findAllJobApplications = (token) => {
  return HTTP.get("/jobapplication", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const updateJobApplication = (token, id, updateData) => {
  return HTTP.put(`/jobapplication/${id}`, updateData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const deleteJobApplication = (token, id) => {
  return HTTP.delete(`/jobapplication/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const evaluateTestResult = (token, id, testResult) => {
  return HTTP.patch(`/jobapplication/${id}/evaluate-test`, testResult, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const updateJobApplicationStatus = (token, id, data) => {
  return HTTP.patch(
    `/jobapplication/${id}/update/status`,data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

const submitTestResult = (token, id) => {
  return HTTP.post(`/jobapplication/${id}/submit-test-result`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default {
  createJobApplication,
  findJobApplicationsByStatus,
  findJobApplicationById,
  findAllJobApplications,
  updateJobApplication,
  deleteJobApplication,
  evaluateTestResult,
  updateJobApplicationStatus,
  submitTestResult,
};
