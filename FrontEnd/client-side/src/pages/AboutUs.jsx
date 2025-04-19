import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../componenets/header';
import Footer from '../componenets/Footer';


const AboutUs = () => {
  return (
    <div>
      {/* Header Section */}
      <Header/>

      {/* About Us Content Section */}
      <div className="about-us-container">
        {/* Header Section */}
        <header className="about-us-header">
          <h1>Welcome to JobPortal</h1>
          <p>Your gateway to the best job opportunities!</p>
        </header>

        {/* Mission Section */}
        <section className="mission-section">
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              At JobPortal, our mission is to connect talented individuals with companies that value their skills. We aim to make the job search process efficient, transparent, and successful for both job seekers and employers.
            </p>
          </div>
        </section>

        {/* Vision Section */}
        <section className="vision-section">
          <div className="vision-content">
            <h2>Our Vision</h2>
            <p>
              We envision a world where every professional can find a job that aligns with their career goals, values, and aspirations. Our platform is committed to making that vision a reality by providing a seamless and supportive environment for growth and success.
            </p>
          </div>
        </section>

        {/* Team Section */}
      

        <section className="team-section">
          <h2>Meet Our Team</h2>
          <div className="team-members">
            <div className="team-member">
              <img src="/uploads/image1.jpg" alt="Team Member 1" />
              <h3>John Doe</h3>
              <p>Founder & CEO</p>
            </div>
            <div className="team-member">
              <img src="/uploads/image2.jpg" alt="Team Member 2" />
              <h3>Jane Smith</h3>
              <p>Head of Product</p>
            </div>
            <div className="team-member">
              <img src="/uploads/image3.jpg" alt="Team Member 3" />
              <h3>Michael Lee</h3>
              <p>Lead Developer</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section">
          <h2>Get in Touch</h2>
          <p>We'd love to hear from you! If you have any questions or need support, feel free to reach out to us.</p>
          <button className="contact-button">Contact Us</button>
        </section>
      </div>

      {/* Footer Section */}
      <Footer/>
    </div>
  );
};

export default AboutUs;
