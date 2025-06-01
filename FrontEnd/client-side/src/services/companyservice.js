import HTTP from "./context-service"

const register = (token,data,file) =>{
    const formData = new FormData();
        if (file) {
            formData.append('file', file);
        }
        
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });
        
        return HTTP.post("/company", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
    }
     const getCandidatesByQuery = (token, query) => {
  const queryParams = new URLSearchParams(query).toString();
  return HTTP.get(`/condidate/search?${queryParams}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};


const getCompanyByID = (token,id)=>{
        console.log("Making request for company ID:", id);
    return HTTP.get(`/company/${id}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
const updateCompany = (token,id,data,file) =>{
    const formData = new FormData();
    if(file){
        formData.append("file", file);
    }
    Object.keys(data).forEach(key =>{
        if(Array.isArray(data[key])){
            formData.append(key, JSON.stringify(data[key]));
        } else if(data[key] !== undefined){
            formData.append(key, data[key]);
        }
        
    });
    return HTTP.put(`/company/${id}`, formData,{
        headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }
    });
}
const deleteCompany = (token, id) =>{
    return HTTP.delete(`/company/${id}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
};
const updateDesiredFields = (token,id,data) =>{
    return HTTP.patch(`/company/${id}/desiredFields`,data,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

}
const getAllCompanies = (token) =>{
    return HTTP.get("/company",{
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
};
const incrementViewCount = (token, id) => {
    return HTTP.patch(`/company/${id}/viewCount`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
const getMostVisitedCompany = (token) => {
    return HTTP.get(`/company/mostvisited`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
const getCompanyDashboardStats = (token, id) => {
  return HTTP.get(`/company/${id}/dashboard-stats`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};


export default{register,getCandidatesByQuery,getCompanyByID,updateCompany,deleteCompany,getAllCompanies,updateDesiredFields,incrementViewCount,getMostVisitedCompany,getCompanyDashboardStats}