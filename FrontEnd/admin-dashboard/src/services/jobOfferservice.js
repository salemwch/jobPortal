import HTTP from "./contexte_service"; 

const getAllJobOffers = (token) => {
  return HTTP.get("/job-offer", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const searchJobOffers = (token, query) => {
  return HTTP.get(`/job-offer/search`, {
    headers: { Authorization: `Bearer ${token}` },
    params: query,
  });
};

const getDataById = (token, id) => {
  return HTTP.get(`/job-offer/data/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
const createJobOffer = (token, jobOfferData) => {
  return HTTP.post("/job-offer", jobOfferData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const updateJobOffer = (token, id, updatedData) => {
  return HTTP.put(`/job-offer/${id}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const deleteJobOffer = (token, id) => {
  return HTTP.delete(`/job-offer/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const incrementViewCount = (token, id) => {
  return HTTP.patch(`/job-offer/${id}/viewCount`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const getMostViewedJobOffers = (token, limit = 5) => {
  return HTTP.get(`/job-offer/mostViewd`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { limit },
  });
};
const updateStatus = (token, id, data) =>{
  return HTTP.patch(`/job-offer/${id}/updateStatus`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
const getJobIffersByCompany = (companyId, token)=>{
  return HTTP.get(`job-offer/company/${companyId}`,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
}

export default {
  getAllJobOffers,
  searchJobOffers,
  getDataById,
  createJobOffer,
  updateJobOffer,
  deleteJobOffer,
  incrementViewCount,
  getMostViewedJobOffers,updateStatus
  ,getJobIffersByCompany
};
