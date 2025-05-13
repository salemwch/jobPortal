import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import companyservice from "../../services/companyservice";
import Swal from "sweetalert2";
import Header from "../../componenets/header";
import Footer from "../../componenets/Footer";
const CompanyProfile = () =>{
    const {id} = useParams()
    const navigate = useNavigate();
    const [Loading, setLoading] = useState(true)
    const [editMode, setEditMode] = useState(false);
    const [company, setCompany] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:'',
        phone:'',
        specialtiy:[''],
        location:'',
        website:'',
    });
    
    const IMAGE_BASE_URL = "http://localhost:3000/uploads"; 

    useEffect(() =>{
       const fetchCompany = async () =>{
         try{
            const user = JSON.parse(sessionStorage.getItem("user"));
            const token = user?.refreshToken;
            const viewerId = user?.id;

            if (viewerId && viewerId !== id) {
                await companyservice.incrementViewCount(token, id, viewerId);
            }
            const response = await companyservice.getCompanyByID(token,id);
            const companyData = response.data.getCompanyByID;
            setCompany(companyData);
            const storedUser = JSON.parse(sessionStorage.getItem("user"));
            if(storedUser && storedUser.user){
                storedUser.user.image = companyData.image;
                sessionStorage.setItem("user", JSON.stringify(storedUser));
            }
            setFormData(companyData);
            console.log("companyData:", companyData);
        }catch(error){
            console.log("error fetching company", error.message )
        }finally{
            setLoading(false);
        }
       };
       fetchCompany();
    },[id]);

const handleUpdateProfile = async (e) =>{
    e.preventDefault();
    try{
        const token = sessionStorage.getItem("user")
        ? JSON.parse(sessionStorage.getItem("user")).refreshToken
        : null;
        
        const updateData = {...formData};
        const response = await companyservice.updateCompany(token,id,updateData,selectedFile);
        setCompany(response.data.updateCompany);
        setFormData(response.data.updateCompany);
        const stored = JSON.parse(sessionStorage.getItem("user"));
        sessionStorage.setItem("user", JSON.stringify({
            user: response.data.updateCompany,
            refreshToken: stored?.refreshToken || ""
        
        }));
        window.dispatchEvent(new Event("userUpdated"));

        Swal.fire({
            icon: 'success',
            title: 'Profile Updated',
            text: 'Your Profile was updated sucessfully!',
            timer: 2000,
            showConfirmButton: false
        });
        setEditMode(false);
        }catch(error){
            console.log("error updating company", error.message);
            const errorMessage = error?.response?.data?.message || "error updating company";
            const specificError = error?.response?.data?.error;
            if(specificError === "this email is already in use."){
                Swal.fire({
                    icon: 'error',
                    title: 'Duplicate Email',
                    text: "this email is already used By another account. Please use a different one.",
                });
            }else{
                Swal.fire({
                    icon:'error',
                    title:'update Failed',
                    text: errorMessage || "something went Wrong during the update process",
                });
            }
        }
};
const handleDeleteAccount = async () =>{
    const confirmDelete = window.confirm("Are your sure you want to delete your account?");
    if(confirmDelete){
        try{
            const token = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")).refreshToken : null;
            await companyservice.deleteCompany(token,id);
            localStorage.removeItem("user");
            alert("Account deleted successfully");
            navigate("/");
        }catch(error){
            console.log("Error delting account:", error.message);
            alert("Failed to delete account");
        }
    }
};
const handleChange = (e) =>{
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}))
}

    return (
        <div>
            <Header/>
            <div className="container mt-5">      
  {Loading ? (
    <div className="text-center">Loading...</div>
  ) : company ? (
    <div className="card p-3 shadow-sm">
      {company.image && (
        <div className="mb-3 text-center">
          <img
            src={`${IMAGE_BASE_URL}/${company.image}`}
            alt="Profile"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "50%",
              border: "3px solid #007bff"
            }}
          />
        </div>
      )}
      
      {editMode ? (
        <form onSubmit={handleUpdateProfile}>
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone:</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Speciality:</label>
            <input
              type="text"
              className="form-control"
              name="specialtiy"
              value={formData.specialtiy}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Website:</label>
            <input
              type="text"
              className="form-control"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Location:</label>
            <input
              type="text"
              className="form-control"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Logo (optional):</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          </div>
          <button type="submit" className="btn btn-primary">Update Profile</button>
          <button 
            type="button" 
            className="btn btn-secondary ms-2" 
            onClick={() => setEditMode(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <p><strong>Name:</strong> {company.name}</p>
          <p><strong>Email:</strong> {company.email}</p>
          <p><strong>Phone:</strong> {company.phone || "N/A"}</p>
          <p><strong>Speciality:</strong> {company.specialtiy || "No speciality listed"}</p>
          <p><strong>Website:</strong> {company.website || "No website listed"}</p>
          <p><strong>Location:</strong> {company.location || "No location listed"}</p>
          <p><strong>Views:</strong> {company.viewCount || 0}</p>
          
          <button 
            className="btn btn-warning mt-3" 
            onClick={() => setEditMode(true)}>
            Edit Profile
          </button>
          <button 
            className="btn btn-danger mt-3 ms-3" 
            onClick={handleDeleteAccount}>
            Delete Account
          </button>
        </>
      )}
    </div>
  ) : (
    <p className="text-center text-danger">Company profile not found.</p>
  )}
</div>
<Footer/>
        </div>
    )
}

export default CompanyProfile;