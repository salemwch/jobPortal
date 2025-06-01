import React, { useState, useEffect } from "react";
import AdminService from "../../services/AdminService";
import "./ProfileStyle.css"; 
import auth from "../../services/auth";

const MyProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.user.role !== "admin") {
      alert("Only admins can view this page.");
      return;
    }

    const token = user.tokens.accessToken;
    console.log("Access token being sent:", token);

    const id = user.user._id;

    AdminService.getAdminById(token, id)
      .then((res) => {
        setAdmin(res.data);
        setForm({...res.data, password: ""}); 
      })
      .catch((err) => {
        console.error("Error fetching admin profile:", err);
        alert("Failed to load profile.");
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, file: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleUpdate = async () => {
  const token = JSON.parse(localStorage.getItem("user")).tokens.accessToken;
  console.log("Token structure:", JSON.parse(localStorage.getItem("user")));


  const formData = { ...form };

  if (!formData.password) {
    delete formData.password;
  }

  try {
    const res = await auth.updateProfile(admin._id, formData, token); 
    setAdmin(res.data.updateAdmin);
    setEditMode(false);
    alert("Profile updated!");
  } catch (error) {
    console.error("Update failed:", error?.response?.data?.message || error.message);
    alert("Update failed: " + (error?.response?.data?.message || error.message));
  }
};



  const handleDelete = async () => {
    const token = JSON.parse(localStorage.getItem("user")).tokens.accessToken;
    if (window.confirm("Are you sure you want to delete your profile?")) {
      try {
        await AdminService.deleteAdmin(token, admin._id);
        alert("Profile deleted.");
        localStorage.removeItem("user");
        window.location.href = "/";
      } catch (error) {
        console.error(error);
        alert("Delete failed.");
      }
    }
  };

  if (!admin) return <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading profile...</p>;

  return (
    <div className="profile-card">
      <div className="profile-header">
        <h2>My Profile</h2>
        <div className="actions">
          <button onClick={() => setEditMode(!editMode)}>
            {editMode ? "Cancel" : "Edit"}
          </button>
          <button onClick={handleDelete} style={{ color: "red" }}>
            Delete
          </button>
        </div>
      </div>

      <div className="profile-avatar">
        <img
          src={
            imagePreview ||
            (admin.image
              ? `http://localhost:3000/uploads/${admin.image}`
              : "https://via.placeholder.com/150")
          }
          alt="Profile"
        />
      </div>

      <div className="form-fields">
        <InputField label="Name :" name="name" value={form.name} editable={editMode} onChange={handleChange} />
        <InputField label="Email :" name="email" value={form.email} editable={editMode} onChange={handleChange} />
        <InputField label="Phone :" name="phone" value={form.phone} editable={editMode} onChange={handleChange} />
        <InputField label="Password :" name="password" value={form.password || ""} editable={editMode} onChange={handleChange} type="password" />

        {editMode && (
          <div className="input-group">
            <label>Profile Image</label>
            <input type="file" name="image" onChange={handleChange} />
          </div>
        )}
      </div>

      {editMode && (
        <button className="update-btn" onClick={handleUpdate}>
          Save Changes
        </button>
      )}
    </div>
  );
};

const InputField = ({ label, name, value, editable, onChange, type = "text" }) => (
  <div className="input-group">
    <label>{label}</label>
    {editable ? (
      <input
        type={type}
        name={name.trim()}
        value={value}
        onChange={onChange}
      />
    ) : (
      <p>{name.trim() === "password" ? "************" : value}</p>
    )}
  </div>
);


export default MyProfile;
