import React from 'react'

const Footer = () => {
  return (
    <div>
  <footer className="site-footer">
   
    <div className="container">
      <div className="row mb-5">
        <div className="col-6 col-md-3 mb-4 mb-md-0">
          <h3>Search Trending</h3>
          <ul className="list-unstyled">
            <li><a href="/">Web Design</a></li>
            <li><a href="/">Graphic Design</a></li>
            <li><a href="/">Web Developers</a></li>
            <li><a href=".">Python</a></li>
            <li><a href=".">HTML5</a></li>
            <li><a href=".">CSS3</a></li>
          </ul>
        </div>
        <div className="col-6 col-md-3 mb-4 mb-md-0">
          <h3>Company</h3>
          <ul className="list-unstyled">
            <li><a href="/AboutUs">About Us</a></li>
            <li><a href="/Carrer">Career</a></li>
            <li><a href="/Blog">Blog</a></li>
            <li><a href=".">Resources</a></li>
          </ul>
        </div>
        <div className="col-6 col-md-3 mb-4 mb-md-0">
          <h3>Support</h3>
          <ul className="list-unstyled">
            <li><a href="/Contact">Support</a></li>
            <li><a href="/Privacy">Privacy</a></li>
            <li><a href="/TermsOfService">Terms of Service</a></li>
          </ul>
        </div>
        <div className="col-6 col-md-3 mb-4 mb-md-0">
          <h3>Contact Us</h3>
          <div className="footer-social">
            <a href="https://www.facebook.com/wch.salem/"><span className="icon-facebook" /></a>
            <a href="https://x.com/WachwachaSalem"><span className="icon-twitter" /></a>
            <a href="https://www.instagram.com/salem.wch/"><span className="icon-instagram" /></a>
            <a href="https://www.linkedin.com/in/salem-wachwacha-1957441a4/"><span className="icon-linkedin" /></a>
          </div>
        </div>
      </div>
      <div className="row text-center">
        <div className="col-12">
          <p className="copyright"><small>
              Copyright © All rights reserved | This template is made with <i className="icon-heart text-danger" aria-hidden="true" /> by <a href="https://colorlib.com" target="_blank" rel="noreferrer">Colorlib</a>
              </small></p>
        </div>
      </div>
    </div>
  </footer>
</div>

  )
}

export default Footer
