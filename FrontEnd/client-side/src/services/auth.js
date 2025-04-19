import HTTP from "./context-service"
const signIN = (data) => {
    return HTTP.post("/auth/login", data);
};

const logout = (id) => {
    return HTTP.post(`/auth/logout/${id}`, id);
};

const forgetPassword = (data) => {
    return HTTP.post("/auth/forgetpassword", data);
};

const resetPassword = (token, data) => {
    return HTTP.post(`/auth/reset-password/${token}`, data);
};

const registerCondidate = (data) => {
    return HTTP.post("/condidates", data);
};

const registerCompany = (data) => {
    return HTTP.post("/company", data);
};
const updateProfile = (id, data) => {
    return HTTP.put(`/auth/update/${id}`, data);
};

const deleteAccount = (id) => {
    return HTTP.delete(`/auth/delete/${id}`);
};



export default {
    signIN,
    logout,
    forgetPassword,
    resetPassword,
    registerCondidate,
    registerCompany,
    updateProfile,
    deleteAccount,
};