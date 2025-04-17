import HTTP from "./contexte_service";

const getRecentUsers = (token, limit = 5) => {
  return HTTP.get(`/user/recent`, {  
    headers: { Authorization: `Bearer ${token}` },
    params: { limit },
  });
};
const getRecentJobApplications = (token, limit = 5) => {
  return HTTP.get(`/jobApplication/recent`, {  
    headers: { Authorization: `Bearer ${token}` },
    params: { limit },
  });
};
const getRecentComments = (token, limit = 3 ) =>{
  return HTTP.get(`/comment/recent`,{
    headers: {Authorization: `Bearer ${token}`},
    params: {limit},
  })
}



export default {getRecentUsers, getRecentJobApplications, getRecentComments};