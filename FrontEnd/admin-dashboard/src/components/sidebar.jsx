import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div>
    
    <aside className="left-sidebar">
  {/* Sidebar scroll*/}
  <div className="brand-logo d-flex align-items-center justify-content-between">
    <a href="/" className="text-nowrap logo-img">
      <img src="../assets/images/logos/dark-logo.svg" width={180} alt />
    </a>
    <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
      <i className="ti ti-x fs-8" />
    </div>
  </div>
  {/* Sidebar navigation*/}
  <nav className="sidebar-nav scroll-sidebar" data-simplebar>
    <ul id="sidebarnav">
      <li className="nav-small-cap">
        <i className="ti ti-dots nav-small-cap-icon fs-4" />
        <span className="hide-menu">Home</span>
      </li>
      <li className="sidebar-item">
        <Link className="sidebar-link" to="/dashboard" aria-expanded="false">
          <span>
            <i className="ti ti-layout-dashboard" />
          </span>
          <span className="hide-menu">Dashboard</span>
        </Link>
        <Link className="sidebar-link" to="/" aria-expanded="false">
          <span>
            <i className="ti ti-layout-dashboard" />
          </span>
          <span className="hide-menu">Home</span>
        </Link>
      </li>
      <li className="nav-small-cap">
        <i className="ti ti-dots nav-small-cap-icon fs-4" />
        <span className="hide-menu">Management</span>
      </li>
      <li className="sidebar-item">
        <Link className="sidebar-link" to ="/managecondidates" aria-expanded="false">
          <span>
            <i className="ti ti-aperture" />
          </span>
          <span className="hide-menu">Manage Condidates</span>
        </Link>
      </li>
      <li className="sidebar-item">
        <Link className="sidebar-link" to ="/manageCompany" aria-expanded="false">
          <span>
            <i className="ti ti-aperture" />
          </span>
          <span className="hide-menu">Manage Company</span>
        </Link>
      </li>
      
      <li className="sidebar-item">
        <Link className="sidebar-link" to ="/manageOffers" aria-expanded="false">
          <span>
            <i className="ti ti-aperture" />
          </span>
          <span className="hide-menu">Manage jobOffer</span>
        </Link>
      </li>
      <li className="sidebar-item">
        <Link className="sidebar-link" to='/manageTestJob' aria-expanded="false">
          <span>
            <i className="ti ti-aperture" />
          </span>
          <span className="hide-menu">Manage Job Tests</span>
        </Link>
      </li>
      <li className="sidebar-item">
        <Link className="sidebar-link" to='/comment' aria-expanded="false">
          <span>
            <i className="ti ti-aperture" />
          </span>
          <span className="hide-menu">Manage Comments</span>
        </Link>
      </li>
      <li className="sidebar-item">
        <Link className="sidebar-link" to='/JobApplication' aria-expanded="false">
          <span>
            <i className="ti ti-aperture" />
          </span>
          <span className="hide-menu">Manage Job Application</span>
        </Link>
      </li>
      
    </ul>
    <div className="unlimited-access hide-menu bg-light-primary position-relative mb-7 mt-5 rounded">
      <div className="d-flex">
        <div className="unlimited-access-title me-3">
          <h6 className="fw-semibold fs-4 mb-6 text-dark w-85">Upgrade to pro</h6>
          <a href="https://adminmart.com/product/modernize-bootstrap-5-admin-template/" target="_blank" className="btn btn-primary fs-2 fw-semibold lh-sm">Buy Pro</a>
        </div>
        <div className="unlimited-access-img">
          <img src="../assets/images/backgrounds/rocket.png" alt className="img-fluid" />
        </div>
      </div>
    </div>
  </nav>
  {/* End Sidebar navigation */}
  {/* End Sidebar scroll*/}
</aside>

  </div>


  )
}

export default Sidebar
    