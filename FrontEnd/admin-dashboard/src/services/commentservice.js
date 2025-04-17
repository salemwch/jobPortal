import HTTP from "./contexte_service";

const createComment = (token, commentData) => {
  return HTTP.post("/comment", commentData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const getCommentsByCompany = (token, companyId) => {
  return HTTP.get(`/comment/company/${companyId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const getCommentsByJobOffer = (token, jobOfferId) => {
  return HTTP.get(`/comment/jobOffer/${jobOfferId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const respondToComment = (token, commentId, companyId, response, responder) => {
  return HTTP.post(
    `/comment/${commentId}/respond`,
    { companyId, response, responder },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

const moderateComment = (token, commentId, status) => {
  return HTTP.patch(
    `/comment/${commentId}/moderate`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

const deleteComment = (token, commentId) => {
  return HTTP.delete(`/comment/${commentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
const getAllComments = (token) =>{
  return HTTP.get("/comment",{
    headers: {
      Authorization: `Bearer ${token}`
    },
  })
}


export default {
  createComment,
  getCommentsByCompany,
  getCommentsByJobOffer,
  respondToComment,
  moderateComment,
  deleteComment,
  getAllComments
};
