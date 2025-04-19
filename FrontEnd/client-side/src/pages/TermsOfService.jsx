import React from 'react';
import Header from '../componenets/header';
import Footer from '../componenets/Footer';

const TermsOfService = () => {
  return (
    <div>
      {/* Header Section */}
      <Header/>
      
      {/* Terms of Service Content Section */}
      <div className="terms-of-service-container">
        <header className="terms-header">
          <h1>Terms of Service</h1>
        </header>

        <section className="terms-content">
          <div className="terms-text">
            <h2>Introduction</h2>
            <p>
              Welcome to JobPortal! By using our services, you agree to the following terms and conditions. Please read these terms carefully before using the platform.
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the JobPortal website, mobile application, or any other related services (the "Service"), you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>

            <h2>2. User Responsibilities</h2>
            <p>
              As a user of JobPortal, you are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
            </p>

            <h2>3. Prohibited Activities</h2>
            <p>
              You agree not to use the Service for any illegal, harmful, or unauthorized purposes, including but not limited to:
            </p>
            <ul>
              <li>Spamming, phishing, or sending harmful content.</li>
              <li>Impersonating others or providing false information.</li>
              <li>Engaging in any activity that disrupts or damages the Service.</li>
            </ul>

            <h2>4. Privacy</h2>
            <p>
              We respect your privacy and are committed to protecting your personal data. For more information on how we collect and use your information, please refer to our Privacy Policy.
            </p>

            <h2>5. Modifications</h2>
            <p>
              JobPortal reserves the right to modify or update these Terms of Service at any time. You will be notified of any material changes, and by continuing to use the Service, you accept the updated terms.
            </p>

            <h2>6. Termination</h2>
            <p>
              We may suspend or terminate your access to the Service if you violate these Terms of Service. You may also cancel your account at any time by following the cancellation process on our platform.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              JobPortal shall not be held liable for any damages, losses, or issues arising from the use or inability to use the Service, including any indirect or consequential damages.
            </p>

            <h2>8. Governing Law</h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of the jurisdiction in which JobPortal operates.
            </p>

            <h2>9. Contact Information</h2>
            <p>
              If you have any questions or concerns about these Terms of Service, please contact us at <a href="mailto:salemwachwacha1997@gmail.com">support@jobportal.com</a>.
            </p>
          </div>
        </section>
      </div>
      
      {/* Footer Section */}
      <Footer/>
    </div>
  );
};

export default TermsOfService;
