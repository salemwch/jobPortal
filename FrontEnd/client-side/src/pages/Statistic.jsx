import React, { useEffect, useState } from 'react'
import statistic from '../services/statistic';
import companyservice from '../services/companyservice';

const Statistic = () => {
    const [stats, setStats] = useState({
        totalCompanies: 0,
        totalCondidates: 0,
        totalJobOffers: 0,
        totalJobApplications: 0,
    });
    const [companies, setCompanies] = useState([]);
    useEffect(() => {
        companyservice.getAllCompanies()
            .then((res) => {

                setCompanies(res.data.companies)
            })
            .catch((err) => console.log("error fetching companies", err))
    }, [])
    useEffect(() => {

        statistic.getDashboardStats()
            .then((res) => setStats(res.data))
            .catch((err) => console.log("error fetching dashboard stats: ", err));
    }, [])
    return (
        <div>
            <section className="py-5 bg-image overlay-primary fixed overlay" id="next" style={{ backgroundImage: 'url("images/hero_1.jpg")' }}>
                <div className="container">
                    <div className="row mb-5 justify-content-center">
                        <div className="col-md-7 text-center">
                            <h2 className="section-title mb-2 text-white">JobBoard Site Stats</h2>
                            <p className="lead text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita unde officiis recusandae sequi excepturi corrupti.</p>
                        </div>
                    </div>
                    <div className="row pb-0 block__19738 section-counter">
                        <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
                            <div className="d-flex align-items-center justify-content-center mb-2">
                                <strong className="number" >{stats.totalCondidates}</strong>
                            </div>
                            <span className="caption">Condidates</span>
                        </div>
                        <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
                            <div className="d-flex align-items-center justify-content-center mb-2">
                                <strong className="number" >{stats.totalJobOffers}</strong>
                            </div>
                            <span className="caption">Jobs Posted</span>
                        </div>
                        <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
                            <div className="d-flex align-items-center justify-content-center mb-2">
                                <strong className="number" >{stats.totalJobApplications}</strong>
                            </div>
                            <span className="caption">Jobs Filled</span>
                        </div>
                        <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
                            <div className="d-flex align-items-center justify-content-center mb-2">
                                <strong className="number" > {stats.totalCompanies} </strong>
                            </div>
                            <span className="caption">Companies</span>
                        </div>
                    </div>
                </div>
            </section>
            <section className="site-section">
                <div className="container">
                    <div className="row mb-5 justify-content-center">
                        <div className="col-md-7 text-center">
                            <h2 className="section-title mb-2">{stats.totalCompanies} Companies</h2>
                        </div>
                    </div>
                    <ul className="job-listings mb-5">
                        {Array.isArray(companies) && companies.length > 0 ? (
                            companies.map((company) => (
                                <React.Fragment key={company._id}>
                                    <li className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">

                                        <h1 href={`/company/${company._id}`} />
                                        <div className="job-listing-logo">
                                            <img
                                                src={`http://localhost:3000/uploads/${company.image}`}
                                                alt={company.name}
                                                className="img-fluid"
                                            />



                                        </div>
                                        <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
                                            <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                                                <h2>{company.name}</h2>
                                                <strong>{company.speciality}</strong>
                                            </div>
                                            <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                                                <span className="icon-room" /> {company.location}
                                            </div>
                                            <div className="job-listing-meta">
                                                <span
                                                    className={`badge ${company.status === "approved"
                                                        ? "badge-success"
                                                        : "badge-danger"
                                                        }`}
                                                >
                                                    {company.status}
                                                </span>
                                            </div>
                                        </div>
                                    </li>


                                </React.Fragment>
                            ))
                        ) : (
                            <p>No companies found.</p>
                        )}
                    </ul>
                    
                </div>
            </section>

        </div>
    )
}

export default Statistic
