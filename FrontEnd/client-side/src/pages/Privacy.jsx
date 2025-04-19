import React from 'react';
import Header from '../componenets/header';
import Footer from '../componenets/Footer';

const PrivacyPolicy = () => {
  return (
    <div>
      <Header />
      <div className="privacy-policy-container">
        <header className="privacy-header">
          <h1>Privacy Policy</h1>
          <p>Effective Date: April 6, 2025</p>
        </header>

        <section className="privacy-content">
          <h2>1. Introduction</h2>
          <p>
            Your privacy is important to us. This privacy policy explains how JobPortal collects, uses, and protects your information when you use our platform.
          </p>

          <h2>2. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul>
            <li>Personal identification information (Name, email address, phone number, etc.)</li>
            <li>Professional data (resumes, job preferences, skills)</li>
            <li>Usage data (pages visited, time on site, browser information)</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use your data to:</p>
          <ul>
            <li>Connect you with relevant job opportunities</li>
            <li>Improve our platform and services</li>
            <li>Communicate important updates or promotions</li>
          </ul>

          <h2>4. Data Protection</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal data from unauthorized access, loss, or misuse.
          </p>

          <h2>5. Sharing Your Information</h2>
          <p>
            We never sell your personal data. We may share data with trusted third parties only for job placement or service enhancement, under strict confidentiality.
          </p>

          <h2>6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the data we have on you</li>
            <li>Request correction or deletion of your data</li>
            <li>Withdraw your consent at any time</li>
          </ul>

          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy, please contact us at support@jobportal.com.
          </p>
        </section>
      </div>

      <Footer/>
    </div>
  );
};

export default PrivacyPolicy;
