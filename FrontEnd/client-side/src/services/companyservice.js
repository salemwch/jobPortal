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
     const getCompanyByQuery =  (token, query) =>{
        return HTTP.get(`/company/search?query=${query}`,{
            headers: {Authorization: `Bearer ${token}`}
        })
     };

const getCompanyByID = (token,id)=>{
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
        formData.append(key, data[key]);
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


export default{register,getCompanyByQuery,getCompanyByID,updateCompany,deleteCompany,getAllCompanies,updateDesiredFields,incrementViewCount,getMostVisitedCompany}