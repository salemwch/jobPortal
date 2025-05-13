import React, { useState } from 'react';
import axios from 'axios';
import Header from '../componenets/header';
import Footer from '../componenets/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/mail/send', formData);
      alert('Message sent successfully! ');
      setFormData({ name: '', email: '', subject: '', message: '' }); // reset
    } catch (err) {
      console.error('Failed to send message ', err);
      alert('Something went wrong, please try again.');
    }
  };

    
  return (
    <div>
      <div className="container-xxl bg-white p-0">
  {/* Spinner Start */}
 
  <Header/>
  {/* Header End */}
  {/* Contact Start */}
  <div className="container-xxl py-5">
    <div className="container">
      <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">Contact For Any Query</h1>
      <div className="row g-4">
        <div className="col-12">
          <div className="row gy-4">
            <div className="col-md-4 wow fadeIn" data-wow-delay="0.1s">
              <div className="d-flex align-items-center bg-light rounded p-4">
                <div className="bg-white border rounded d-flex flex-shrink-0 align-items-center justify-content-center me-3" style={{width: 45, height: 45}}>
                  <i className="fa fa-map-marker-alt text-primary" />
                </div>
                <span>4013  sousse messadine </span>
              </div>
            </div>
            <div className="col-md-4 wow fadeIn" data-wow-delay="0.3s">
              <div className="d-flex align-items-center bg-light rounded p-4">
                <div className="bg-white border rounded d-flex flex-shrink-0 align-items-center justify-content-center me-3" style={{width: 45, height: 45}}>
                  <i className="fa fa-envelope-open text-primary" />
                </div>
                <span>salemwachwacha1997@gmail.com</span>
              </div>
            </div>
            <div className="col-md-4 wow fadeIn" data-wow-delay="0.5s">
              <div className="d-flex align-items-center bg-light rounded p-4">
                <div className="bg-white border rounded d-flex flex-shrink-0 align-items-center justify-content-center me-3" style={{width: 45, height: 45}}>
                  <i className="fa fa-phone-alt text-primary" />
                </div>
                <span>+216 24-201-314 </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 wow fadeInUp" data-wow-delay="0.1s">
          <iframe className="position-relative rounded w-100 h-100" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001156.4288297426!2d-78.01371936852176!3d42.72876761954724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd" frameBorder={0} style={{minHeight: 400, border: 0}} allowFullScreen aria-hidden="false" tabIndex={0} />
        </div>
        <div className="col-md-6">
          <div className="wow fadeInUp" data-wow-delay="0.5s">
            <form onSubmit={handleSubmit}>
  <div className="row g-3">
    <div className="col-md-6">
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
        />
        <label htmlFor="name">Your Name</label>
      </div>
    </div>
    <div className="col-md-6">
      <div className="form-floating">
        <input
          type="email"
          className="form-control"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
        />
        <label htmlFor="email">Your Email</label>
      </div>
    </div>
    <div className="col-12">
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject"
        />
        <label htmlFor="subject">Subject</label>
      </div>
    </div>
    <div className="col-12">
      <div className="form-floating">
        <textarea
          className="form-control"
          placeholder="Leave a message here"
          id="message"
          value={formData.message}
          onChange={handleChange}
          style={{ height: 150 }}
        />
        <label htmlFor="message">Message</label>
      </div>
    </div>
    <div className="col-12">
      <button className="btn btn-primary w-100 py-3" type="submit">Send Message</button>
    </div>
  </div>
</form>

          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Contact End */}
  <Footer/>
  {/* Back to Top */}
  <a href="#" className="btn btn-lg btn-primar btn-lg-square back-to-top"><i className="bi bi-arrow-up" /></a>
</div>

    </div>
  )
}

export default Contact
