import HTTP from "./contexte_service";

const createTestJobApplication = (token, testJobData) => {
  return HTTP.post("/testjobapplication", testJobData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const findAllTestJobApplications = (token) => {
  return HTTP.get("/testjobapplication", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const findTestJobApplicationById = (token, id) => {
  return HTTP.get(`/testjobapplication/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const evaluateAnswer = (token, questionId, answer) => {
  return HTTP.patch(
    "/testjobapplication/evaluate-answer",
    null,
    {
      params: { questionId, answer },
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

const updateTestJobApplication = (token, id, updateData) => {
  return HTTP.patch(`/testjobapplication/${id}`, updateData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const deleteTestJobApplication = (token, id) => {
  return HTTP.delete(`/testjobapplication/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const findTestsByJobOfferId = (token, jobOfferId) => {
  return HTTP.get(`/testjobapplication/${jobOfferId}/tests`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export  default {
  createTestJobApplication,
  findAllTestJobApplications,
  findTestJobApplicationById,
  evaluateAnswer,
  updateTestJobApplication,
  deleteTestJobApplication,
  findTestsByJobOfferId,
};
