import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../services/auth';

const Login = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('user');
  }, []);

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onsubmitHandler = (e) => {
    e.preventDefault();
  
    if (!data || !data.email) {
      alert("Please enter your email.");
      return;
    }
    
    
    
  
    auth.signIN(data)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data));
        navigate('/');
      })
      .catch((error) => {
        console.error('Login error:', error);
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Login failed. Please try again.";
        alert(errorMessage);
      });
  };
  

  return (
    <div>
        <div
      className="page-wrapper"
      id="main-wrapper"
      data-layout="vertical"
      data-navbarbg="skin6"
      data-sidebartype="full"
      data-sidebar-position="fixed"
      data-header-position="fixed"
    >
      <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
        <div className="d-flex align-items-center justify-content-center w-100">
          <div className="row justify-content-center w-100">
            <div className="col-md-8 col-lg-6 col-xxl-3">
              <div className="card mb-0">
                <div className="card-body">
                  <Link to="/" className="text-nowrap logo-img text-center d-block py-3 w-100">
                    <img src="../assets/images/logos/dark-logo.svg" width="180" alt="Logo" />
                  </Link>
                  <p className="text-center">Your Social Campaigns</p>
                  <form onSubmit={onsubmitHandler}>
                    <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">
                        email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        name="email"
                        onChange={changeHandler}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="exampleInputPassword1" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        name="password"
                        onChange={changeHandler}
                        required
                      />
                    </div>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <div className="form-check">
                        <input
                          className="form-check-input primary"
                          type="checkbox"
                          id="flexCheckChecked"
                          defaultChecked
                        />
                        <label className="form-check-label text-dark" htmlFor="flexCheckChecked">
                          Remember this Device
                        </label>
                      </div>
                      <Link to="/auth/forgetpassword" className="text-primary fw-bold">
                        Forgot Password ?
                      </Link>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">
                      Sign In
                    </button>
                    <div className="d-flex align-items-center justify-content-center">
                      <p className="fs-4 mb-0 fw-bold">New to Modernize?</p>
                      <Link to="/register" className="text-primary fw-bold ms-2">
                        Create an account
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
    </div>
  );
};

export default Login;
