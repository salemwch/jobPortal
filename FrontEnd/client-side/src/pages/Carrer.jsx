import React from 'react';
import Header from '../componenets/header';
import Footer from '../componenets/Footer';

const Careers = () => {
  return (
    <div>
      <Header />
      <div className="careers-container">
        <header className="careers-header">
          <h1>Careers at JobPortal</h1>
          <p>Join our mission to revolutionize the hiring experience for both companies and candidates.</p>
        </header>

        <section className="careers-intro">
          <h2>Why Work With Us?</h2>
          <p>
            At JobPortal, we are passionate about connecting people to opportunities. We're building tools that make
            recruitment smarter, faster, and more human. If you're driven by impact and innovation, you'll feel at home
            here.
          </p>
        </section>

        <section className="open-positions">
          <h2>Open Positions</h2>

          <div className="position-card">
            <h3>Frontend Developer</h3>
            <p>We’re looking for a creative React developer with 2+ years of experience in building user interfaces.</p>
            <p><strong>Location:</strong> Remote</p>
            <button > <a href="/login"> Apply Now</a></button>
          </div>

          <div className="position-card">
            <h3>Backend Developer (Node.js/NestJS)</h3>
            <p>Join our backend team to develop scalable APIs and work with databases and cloud infrastructure.</p>
            <p><strong>Location:</strong> Tunis / Remote</p>
            <button > <a href="/login"> Apply Now</a></button>
          </div>

          <div className="position-card">
            <h3>Marketing Manager</h3>
            <p>We need a storyteller with digital marketing experience to grow our brand and reach new talent.</p>
            <p><strong>Location:</strong> On-site (Sousse Office)</p>
            <button > <a href="/login"> Apply Now</a></button>
          </div>
        </section>

        <section className="career-footer">
          <p>Don't see your role? Send us your resume at <a href="mailto:salemwachwacha1997@gmail.com">salemwachwacha1997@gmail.com</a>.</p>
        </section>
      </div>

      <Footer/>
    </div>
  );
};

export default Careers;
