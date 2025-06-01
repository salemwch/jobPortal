import { useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../services/auth";
import "./Register.css";

const Register = () => {
  const [data, setData] = useState({ role: "condidate" });
  const [skillsInput, setSkillsInput] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const onsubmitHandler = async (e) => {
  e.preventDefault();

  let finalData = { ...data };

  // Condidate logic
  if (data.role === "condidate" && skillsInput.trim() !== "") {
    const formattedSkills = skillsInput
      .split(/[, ]+/)
      .map((s) => s.trim())
      .filter((s) => s !== "");
    finalData.skills = formattedSkills;
  }

  // Company logic
  if (data.role === "company" && data.speciality) {
    const formattedSpeciality = data.speciality
      .split(/[, ]+/)
      .map((s) => s.trim())
      .filter((s) => s !== "");
    finalData.speciality = formattedSpeciality;
  }

  const registerFunction =
    data.role === "company" ? auth.registerCompany : auth.registerCondidate;

  try {
    await registerFunction(finalData, file);
    navigate("/SignUpConfirmation");
  } catch (error) {
    console.error("Registration error:", error);
    alert(error?.response?.data?.message || "Registration failed.");
  }
};





  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <img src="../assets/images/logos/dark-logo.svg" alt="Jobgate Logo" />
          <h2>Create Your Account</h2>
        </div>

        <form onSubmit={onsubmitHandler} className="form-grid">
          
          <div className="form-group">
            <label>Register As</label>
            <select name="role" onChange={changeHandler} required>
              <option value="condidate">Condidate</option>
              <option value="company">Company</option>
            </select>
          </div>

         
          <div className="form-group">
            <label>{data.role === "company" ? "Company Name" : "Full Name"}</label>
            <input type="text" name="name" onChange={changeHandler} required />
          </div>

          
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" onChange={changeHandler} required />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input type="text" name="phone" onChange={changeHandler} required />
          </div>

          {data.role !== "company" && (
  <>
    <div className="form-group">
      <label>Education</label>
      <input type="text" name="education" onChange={changeHandler} required />
    </div>

    <div className="form-group">
      <label>Work Experience</label>
      <input type="text" name="workExperience" onChange={changeHandler} required />
    </div>
  </>
)}


          <div className="form-group">
            <label>Location</label>
            <input type="text" name="location" onChange={changeHandler} required />
          </div>
           <div className="form-group">
            <label>Description</label>
            <input type="text" name="description" onChange={changeHandler} required />
          </div>
          <div className="form-group">
            <label>Speciality</label>
            <input
  type="text"
  name="speciality"
  onChange={changeHandler}
  placeholder="e.g., rubber, polyurethane"
/>
          </div>
          <div className="form-group">
            <label> Website</label>
            <input type="text" name="website" onChange={changeHandler} required />
          </div>
          
          
          {data.role === "condidate" && (
  <div className="form-group full-width">
    <label>Skills</label>
    <input
      type="text"
      name="skills"
      placeholder="e.g., JavaScript, Python"
      value={skillsInput}
      onChange={(e) => setSkillsInput(e.target.value)}
    />
  </div>
)}



          
          <div className="form-group full-width">
            <label>Password</label>
            <input type="password" name="password" onChange={changeHandler} required />
          </div>

          
          <div className="form-group full-width">
            <label>Profile Image</label>
            <input type="file" accept="image/*" onChange={fileChangeHandler} />
          </div>

          <button type="submit" className="btn-submit">Sign Up</button>
        </form>

        <div className="register-footer">
          <p>Already have an account? <a href="/login">Sign In</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
