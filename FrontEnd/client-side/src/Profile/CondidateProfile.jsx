import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import condidateService from "../services/condidateService";
import Header from "../componenets/header";
import Swal from 'sweetalert2';
import Footer from "../componenets/Footer";


const CondidateProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [condidate, setCondidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [skillsInput, setSkillsInput] = useState('');

  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: [],
    education: '',
    workExperience: '',
    location: '',
    password:'',
  });

  const IMAGE_BASE_URL = "http://localhost:3000/uploads"; 

  useEffect(() => {
    const fetchCondidate = async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem("user"));
        const token = user?.refreshToken;
        const viewerId = user?.id;
  
        if (viewerId && viewerId !== id) {
          await condidateService.incrementViewCount(token, id, viewerId);
        }
        const response = await condidateService.getCondidateById(token, id);
        const condidateData = response.data.getCondidateById;

        setCondidate(condidateData);
        const storedUser = JSON.parse(sessionStorage.getItem("user"));
if (storedUser && storedUser.user) {
  storedUser.user.image = condidateData.image;
  sessionStorage.setItem("user", JSON.stringify(storedUser));
}
        setFormData({ ...condidateData, password: "" });
      } catch (error) {
        console.error("Error fetching condidate:", error);
      } finally {
        setLoading(false);
      }
    };
    

    fetchCondidate();
  }, [ id]);
  

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("user")
        ? JSON.parse(sessionStorage.getItem("user")).refreshToken
        : null;
  
      
      const updatedData = { ...formData };

if (!formData.password) {
  delete updatedData.password;
}

      const response = await condidateService.updateProfile(token, id, updatedData, selectedFile);
    
      setCondidate(response.data.updateCondidate);  
      setFormData(response.data.updateCondidate);  
      // Get the old stored object
const stored = JSON.parse(sessionStorage.getItem("user"));

// Update sessionStorage with the new user data
sessionStorage.setItem("user", JSON.stringify({
  user: response.data.updateCondidate,
  refreshToken: stored?.refreshToken || ""
}));
window.dispatchEvent(new Event("userUpdated"));

      Swal.fire({
        icon: 'success',
        title: 'Profile Updated',
        text: 'Your profile was updated successfully!',
        timer: 2000,
        showConfirmButton: false
      });
  
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    
      const errorMessage = error?.response?.data?.message;
      const specificError = error?.response?.data?.error;
    
      if (specificError === "This email is already in use.") {
        Swal.fire({
          icon: 'error',
          title: 'Duplicate Email',
          text: 'This email is already used by another account. Please use a different one.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: errorMessage || 'Something went wrong during the update.',
        });
      }
    }
    
  };
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
      try {
        const token = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")).refreshToken : null;
        await condidateService.deleteCondidate(token, id);
  
        localStorage.removeItem("user");
  
        alert("Account deleted successfully.");
        navigate("/"); 
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("Failed to delete account.");
      }
    }
  };
  const handleChange = (e) => {
  const { name, value } = e.target;
  
  if (name === "skills") {
    setSkillsInput(value);
    const skillsArray = value.split(',')
                            .map(skill => skill.trim())
                            .filter(skill => skill );
    setFormData(prev => ({ ...prev, [name]: skillsArray }));
  } else {
    setFormData(prev => ({ ...prev, [name]: value }));
  }
};

  return (
    <div>
      
      <Header/>
    
    <div className="container mt-5">      
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : condidate ? (
        <div className="card p-3 shadow-sm">
          {condidate.image && (
            <div className="mb-3 text-center">
              <img
                src={`${IMAGE_BASE_URL}/${condidate.image}`}
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
  <label className="form-label">Skills (comma separated):</label>
  <input
    type="text"
    className="form-control"
    name="skills"
    value={skillsInput} 
    onChange={handleChange}
  />
</div>
              <div className="mb-3">
                <label className="form-label">Education:</label>
                <input
                  type="text"
                  className="form-control"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Work Experience:</label>
                <input
                  type="text"
                  className="form-control"
                  name="workExperience"
                  value={formData.workExperience}
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
  <label className="form-label">Password (optional):</label>
  <input
    type="password"
    className="form-control"
    name="password"
    value={formData.password}
    onChange={handleChange}
  />
</div>
              <div className="mb-3">
      <label className="form-label">Profile Picture (optional):</label>
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
              <p><strong>Name:</strong> {condidate.name}</p>
              <p><strong>Email:</strong> {condidate.email}</p>
              <p><strong>Phone:</strong> {condidate.phone || "N/A"}</p>
              <p><strong>Status:</strong> {condidate.status}</p>
              <p><strong>Location:</strong> {condidate.location}</p>
              <p><strong>Work Experience:</strong> {condidate.workExperience}</p>
              <p><strong>Skills:</strong> {condidate.skills?.join(' ') || "No skills listed"}</p>
              <p><strong>Description:</strong> {condidate.description || "No description yet"}</p>
              <p><strong>Job Applications:</strong> {condidate.jobApplications?.length || 0}</p>
              <p><strong>Test JobApplication:</strong> {condidate.testJobApplication?.length || 0}</p>
              <p><strong>Views:</strong> {condidate.viewCount}</p>
            
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
        <p className="text-center text-danger">Condidate profile not found.</p>
      )}
    </div>
    <Footer/>
    </div>
  );
};

export default CondidateProfile;
