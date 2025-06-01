import React, { useEffect, useState } from "react";
import jobOfferService from "../services/jobOffer";
import Footer from "../componenets/Footer";
import {useNavigate} from 'react-router-dom'
import Header from "../componenets/header";
import TidioLoader from '../Shared/TidioLoader';


const CondidateDashboard = () => {
  
  const [jobOffers, setJobOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const token = sessionStorage.getItem('token') ? JSON.parse(sessionStorage.getItem("user")).tokens.refreshToken
  : null;
  useEffect(() =>{
    
    fetchJobOffers();
  },[]);
 
  
  const fetchJobOffers = async () =>{
    try{
      const response = await jobOfferService.getAllJobOffers(token);
      setJobOffers(response.data.findALLJobs);

      setLoading(false);
    }catch(error){
      alert('failed to load job offers');
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container-xxl bg-white p-0">
  {/* Navbar Start */}
  <Header/>
  {/* Navbar End */}
  
  {/* Jobs Start */}
  <div className="container-xxl py-5">
    <div className="container">
      <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">Job Listing</h1>
      <div className="tab-class text-center wow fadeInUp" data-wow-delay="0.3s">
        <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
          <li className="nav-item">
            <a className="d-flex align-items-center text-start mx-3 ms-0 pb-3 active" data-bs-toggle="pill" href="#tab-1">
              <h6 className="mt-n1 mb-0">Featured</h6>
            </a>
          </li>
        </ul>
        <div className="tab-content">
        <div id="tab-1" className="tab-pane fade show p-0 active">
  {jobOffers.map((offer, index) => (
    <div key={offer._id || index} className="job-item p-4 mb-4">
      <div
        className="row g-4"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/job-offer/${offer._id}`)}
      >
        <div className="col-sm-12 col-md-8 d-flex align-items-center">
        <img
  src={`http://localhost:3000/uploads/${offer.company?.image}`}
  alt={offer.company?.name}
  style={{ width: 80, height: 80 }}
/>


          <div className="text-start ps-4">
            <h5 className="mb-3">{offer.title}</h5>
            <span className="text-truncate me-3">
              <i className="fa fa-map-marker-alt text-primary me-2" />
              {offer.location}
            </span>
            <span className="text-truncate me-3">
              <i className="far fa-clock text-primary me-2" />
              {offer.company.speciality}
            </span>
            <span className="text-truncate me-0">
              <i className="far fa-money-bill-alt text-primary me-2" />
              {offer.salary}
            </span>
          </div>
        </div>
        <div className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
          <div className="d-flex mb-3">
            <a className="btn btn-light btn-square me-3" href="/">
              <i className="far fa-heart text-primary" />
            </a>
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/job-offer/${offer._id}`);
              }}
            >
              See Details
            </button>
          </div>
          <small className="text-truncate">
            <i className="far fa-calendar-alt text-primary me-2" />
            Posted on: {new Date(offer.createdAt).toLocaleDateString()}
          </small>
        </div>
      </div>
    </div>
  ))}

  <a className="btn btn-primary py-3 px-5" href="/">
    Browse More Jobs
  </a>
</div>

        </div>
      </div>
    </div>
  </div>
   <TidioLoader />
  {/* Jobs End */}
  {/* Footer Start */}
  <Footer/>
</div>


    </div>
  );
};

export default CondidateDashboard;
