import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const backTo = () => {
    localStorage.clear();
    console.log('Logged out successfully');
    setUser(null); // Clear user data from state after logout
    navigate('/');
  };
  useEffect(()=>{

  }, [user])

  return (
    <div>
      <div class="site-wrap">
      <div class="site-mobile-menu site-navbar-target">
      <div class="site-mobile-menu-header">
        <div class="site-mobile-menu-close mt-3">
          <span class="icon-close2 js-menu-toggle"></span>
        </div>
      </div>
      <div class="site-mobile-menu-body"></div>
    </div>
      <header className="site-navbar mt-3">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="site-logo col-6">
              <a href="/">JobBoard</a>
            </div>
            <nav className="mx-auto site-navigation">
              <ul className="site-menu js-clone-nav d-none d-xl-block ml-0 pl-0">
                <li><a href="/" className="nav-link active">Home</a></li>
                <li><a href="/AboutUs">About</a></li>
                <li><a href="/condidateDashboard">Dashboard</a></li>
                <li className="has-children">
                  <a href="/">Pages</a>
                  <ul className="dropdown">
                    <li><a href="/services">Services</a></li>
                    <li><a href="/Premium">Premium</a></li>
                    <li><a href="/portfolio">Portfolio</a></li>
                    <li><a href="/testimonials">Testimonials</a></li>
                    <li><a href="/faq.html">Frequently Ask Questions</a></li>
                  </ul>
                </li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/Contact">Contact</a></li>

                {/* Show these only if the user is not logged in */}
                {!user && (
                  <>
                    <button className="d-lg-none"><a href="/register"><span className="mr-2">+</span> Post a Job</a></button>
                    <button className="d-lg-none"><a href="/login">Log In</a></button>
                  </>
                )}
              </ul>
            </nav>
            <div className="right-cta-menu text-right d-flex align-items-center col-6">
              <div className="ml-auto d-flex gap-2">
                {/* Show buttons only if user is not logged in */}
                {!user ? (
                  <>
                    <Link
                      to="/post-job" 
                      className="btn btn-outline-white border-width-2 d-none d-lg-inline-block"
                    >
                      <span className="mr-2 icon-add" />Post a Job
                    </Link>
                    <Link
                      to="/login" 
                      className="btn btn-primary border-width-2 d-none d-lg-inline-block"
                    >
                      <span className="mr-2 icon-lock_outline" />Log In
                    </Link>
                  </>
                ) : (
                  // Display a logout button when the user is logged in
                  <button onClick={backTo} className=" dropdown btn btn-danger border-width-2 d-none d-lg-inline-block">
                    Log Out
                  </button>
                )}
              </div>
              <a href="#" class=" site-menu-toggle js-menu-toggle d-inline-block d-xl-none mt-lg-2 ml-3"><span class="icon-menu h3 m-0 p-0 mt-2"></span></a>

            </div>
          </div>
        </div>
      </header>
      
      <section className="home-section section-hero overlay bg-image" style={{backgroundImage: 'url("images/hero_1.jpg")'}} id="home-section">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-12">
              <div className="mb-5 text-center">
                <h1 className="text-white font-weight-bold">The Easiest Way To Get Your Dream Job</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate est, consequuntur perferendis.</p>
              </div>
              <form method="post" className="search-jobs-form">
                <div className="row mb-5">
                  <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                    <input type="text" className="form-control form-control-lg" placeholder="Job title, Company..." />
                  </div>
                  <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                    <select className="selectpicker" data-style="btn-white btn-lg" data-width="100%" data-live-search="true" title="Select Region">
                      <option>Anywhere</option>
                      <option>San Francisco</option>
                      <option>Palo Alto</option>
                      <option>New York</option>
                      <option>Manhattan</option>
                      <option>Ontario</option>
                      <option>Toronto</option>
                      <option>Kansas</option>
                      <option>Mountain View</option>
                    </select>
                  </div>
                  <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                    <button type="submit" className="btn btn-primary btn-lg btn-block text-white btn-search"><span className="icon-search icon mr-2" />Search </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 popular-keywords">
                    <h3>Trending Keywords:</h3>
                    <ul className="keywords list-unstyled m-0 p-0">
                      <li><a href="#" className>UI Designer</a></li>
                      <li><a href="#" className>Python</a></li>
                      <li><a href="#" className>Developer</a></li>
                    </ul>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <a href="#" className="btn btn-lg btn-primar btn-lg-square back-to-top"><i className="bi bi-arrow-up" /></a>

      </section>
    </div>
    </div>
  );
};

export default Header;
