import { useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../services/auth";

const Register = () => {

  const [data, setData] = useState({role: 'admin'});
    const changeHandler = (e) =>{
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
  const navigate = useNavigate();

  const onsubmitHandler = (e) =>{
    e.preventDefault()
    auth.createAdmin(data).then((res)=>{
        navigate("/login")
        console.log(res.data)
    }).catch((error) =>{
        console.log(error)
    })
  }
  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card p-4 w-50">
        <div className="text-center mb-3">
          <img src="../assets/images/logos/dark-logo.svg" width="180" alt="Jobgate Logo" />
          <p className="text-muted">Create Your Account</p>
        </div>

        

        <form onSubmit={onsubmitHandler}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" name="name"  onChange={changeHandler} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-control" name="email"  onChange={changeHandler} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input type="number" className="form-control" name="phone"  onChange={changeHandler} required />
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" name="password"  onChange={changeHandler} required />
          </div>

          <button tp='/login' type="submit" className="btn btn-primary w-100 py-2">Sign Up</button>
        </form>

        <div className="text-center mt-3">
          <p className="mb-0">Already have an account?</p>
          <a href="/login" className="text-primary">Sign In</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
