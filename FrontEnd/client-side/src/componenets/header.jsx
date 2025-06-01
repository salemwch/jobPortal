import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NotificationService from '../services/notification'; 
import { io } from 'socket.io-client';
import { getDashboardRoute } from "../helper/helper";
import { getProfileRoute } from "../helper/helper";
import CompanySearch from './Search/CompanySearch';
import CondidateSearchForm from './Search/CondidateSearchForm';
import moment from 'moment';
import './Toggle.css';



const Header = () => {
  const [user, setUser] = useState(null);
  
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
   const [menuOpen, setMenuOpen] = useState(false);
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const dashboardPath = getDashboardRoute(user);

  const IMAGE_BASE_URL = "http://localhost:3000/uploads";
  
  useEffect(() => {
    //“Get the logged-in user’s info from the browser’s memory. We'll use this to fetch data and connect to the socket
    const storedUser = sessionStorage.getItem('user');
    let socket;
  //Turn the stored string into a real JavaScript object
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        //Save the user to state so we can use it in the component
        if (parsed.user && parsed.user._id) {
          setUser(parsed.user);
          //“Make a request to the backend to get all the user's previous notifications
          NotificationService.getNotificationsByUser(parsed.token, parsed.user._id)
            .then((res) => {
              //Store the notifications and count how many are unread
              const notifs = res.data.notifications || [];
              setNotifications(notifs);
              const unread = notifs.filter(n => !n.read).length;
              setUnreadCount(unread);
            })
            .catch((err) => {
              console.error("Error fetching notifications:", err);
            });
            //Connect to the WebSocket server and send my userId so the backend knows who I am.
          socket = io('http://localhost:3000', {
            query: { userId: parsed.user._id },
            transports: ['websocket']
          });
          //When successfully connected, log that it worked
          socket.on('connect', () => {
            console.log(' Connected to WebSocket for notifications');
          });
          //When the backend sends a newNotification, show it in the UI by adding it to the top of the notifications and increasing the unread count
          socket.on('newNotification', (notif) => {
            console.log(' New notification received:', notif);
            setNotifications(prev => [notif, ...prev]);
            setUnreadCount(prev => prev + 1);
          });
        } else {
          console.error("User object is missing _id");
        }
      } catch (err) {
        console.error("Failed to parse user from sessionStorage:", err);
      }
    }
  
    const updateUser = () => {
      const newStoredUser = sessionStorage.getItem('user');
      if (newStoredUser) {
        try {
          const parsed = JSON.parse(newStoredUser);
          setUser(parsed.user);
        } catch (err) {
          console.error("Error parsing updated user:", err);
        }
      }
    };
  
    window.addEventListener("userUpdated", updateUser);
  
    return () => {
      window.removeEventListener("userUpdated", updateUser);
      if (socket) socket.disconnect();
    };

  }, []);

  
const handleMarkAsRead = async (id) => {
  try {
    const token = sessionStorage.getItem("user");
    await NotificationService.markNotificationAsRead(token, id);
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, read: true } : n))
    );
    setUnreadCount((prev) => prev - 1);
  } catch (err) {
    console.error("Failed to mark as read:", err);
  }
};

const handleDelete = async (id) => {
  try {
    const token = sessionStorage.getItem("user");
    await NotificationService.deleteNotification(token, id);
    setNotifications((prev) => prev.filter((n) => n._id !== id));
    const wasUnread = notifications.find((n) => n._id === id && !n.read);
    if (wasUnread) setUnreadCount((prev) => prev - 1);
  } catch (err) {
    console.error("Failed to delete notification:", err);
  }
};


  const backTo = () => {
    sessionStorage.clear();
    console.log('Logged out successfully');
    setUser(null); 
    navigate('/');
  };
  
  



  

  return (
    <div>
      <div class="site-wrap">
      <header className="site-navbar mt-3">
        <div className="container-fluid">
          <div className={`row align-items-center ${user?.role !== "company" && user?.role !== "condidate" ? "guest-mode" : ""}`}>
  <div className="site-logo col-3">
    <a href="/">JobBoard</a>
  </div>

  <nav className="col-6 site-navigation d-none d-xl-block">
  <ul className="site-menu js-clone-nav d-flex justify-content-center align-items-center gap-3 mb-0">
    <li><Link to="/" className="nav-link active">Home</Link></li>
    <li><Link to="/AboutUs" className="nav-link">About</Link></li>

    {user?.role === "condidate" && (
      <>
        <li><Link to={getDashboardRoute(user)} className="nav-link">Dashboard</Link></li>
        <li><Link to="/condidate/companies" className="nav-link">Companies</Link></li>
      </>
    )}

    {user?.role === "company" && (
      <>
        <li><Link to="/condidates" className="nav-link">Condidates</Link></li>
        <li><Link to="/Dashboard/company" className="nav-link">Dashboard</Link></li>
        <li>
          <Link
            to="/create-job-offer"
            className="btn btn-outline-success btn-sm text-nowrap"
            style={{ marginLeft: "10px" }}
          >
            + Create Job Offer
          </Link>
        </li>
      </>
    )}

    <li className="has-children nav-link">
      <Link to="#">Pages</Link>
      <ul className="dropdown">
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/Premium">Premium</Link></li>
        <li><Link to="/portfolio">Portfolio</Link></li>
        <li><Link to="/testimonials">Testimonials</Link></li>
        <li><Link to="/faq.html">FAQ</Link></li>
      </ul>
    </li>

    <li><Link to="/blog" className="nav-link">Blog</Link></li>
  </ul>
</nav>


  
  <div className="right-cta-menu text-right d-flex align-items-center col-3">
    <div className="ml-auto d-flex gap-2">
      {!user ? (
        <>
          <Link to="/post-job" className="btn btn-outline-white border-width-2 d-none d-lg-inline-block">
            <span className="mr-2 icon-add" />Post a Job
          </Link>
          <Link to="/login" className="btn btn-primary border-width-2 d-none d-lg-inline-block">
            <span className="mr-2 icon-lock_outline" />Log In
          </Link>
        </>
      ) : (
        <>
          <Link
            to={getProfileRoute(user)}
            className="btn btn-outline-white border-width-2 d-none d-lg-inline-block"
            style={{ borderRadius: '50%', padding: '0' }}
          >
            <img
              src={user?.image ? `${IMAGE_BASE_URL}/${user.image}` : '/default-avatar.png'}
              alt="profile"
              style={{
                width: '40px',
                height: '50px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
          </Link>

          {/* Notification Dropdown */}
          <div className="dropdown">
            <button
              className="btn btn-outline-white border-width-2 d-none d-lg-inline-block dropdown-toggle"
              type="button"
              id="notifDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              🔔{" "}
              {unreadCount > 0 && (
                <span className="badge bg-danger">{unreadCount}</span>
              )}
            </button>

            <ul className="dropdown-menu" aria-labelledby="notifDropdown">
              {notifications.length === 0 ? (
                <li><span className="dropdown-item">No notifications</span></li>
              ) : (
                notifications.map((notif, index) => (
                  <li key={index} className="dropdown-item d-flex justify-content-between align-items-start flex-column">
                    <div className="w-100 mb-2">
                      <span className={notif.read ? "" : "fw-bold"}>
                        {notif.message}
                      </span>
                      <span>{moment(notif.createdAt).fromNow()}</span>

                    </div>
                    <div className="d-flex gap-2 w-100">
                      <a href={`/job-offer/${notif.jobOffer}`} className="btn btn-sm btn-outline-info">View Job Offer</a>
                      {!notif.read && (
                        <button className="btn btn-sm btn-outline-primary" onClick={() => handleMarkAsRead(notif._id)}>Mark as Read</button>
                      )}
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(notif._id)}>Delete</button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>

          <button onClick={backTo} className="btn btn-danger border-width-2 d-none d-lg-inline-block">
            Log Out
          </button>
        </>
      )}
    </div>
  <button
    className="menu-toggle-btn d-xl-none"
    onClick={() => setMenuOpen(!menuOpen)}
  >
    ☰
  </button>
  

  </div>
</div>
{menuOpen && (
  <div className="mobile-menu d-xl-none">
    <button
      className="menu-close-btn"
      onClick={() => setMenuOpen(false)}
      aria-label="Close Menu"
    >
      ✕
    </button>
    <ul>
      <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
      <li><Link to="/AboutUs" onClick={() => setMenuOpen(false)}>About</Link></li>

      {user?.role === "condidate" && (
        <>
          <li><Link to={getDashboardRoute(user)} onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
          <li><Link to="/condidate/companies" onClick={() => setMenuOpen(false)}>Companies</Link></li>
        </>
      )}

      {user?.role === "company" && (
        <>
          <li><Link to="/condidates" onClick={() => setMenuOpen(false)}>Condidates</Link></li>
          <li><Link to="/Dashboard/company" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
          <li><Link to="/create-job-offer" onClick={() => setMenuOpen(false)}>+ Create Job Offer</Link></li>
        </>
      )}
<li>
  <button
    className="dropdown-toggle-btn"
    onClick={() => setPagesDropdownOpen(!pagesDropdownOpen)}
  >
    <strong>Pages</strong>
    <span className={`arrow ${pagesDropdownOpen ? 'rotate' : ''}`}>▼</span>
  </button>

  {pagesDropdownOpen && (
    <ul className="dropdown-submenu list-unstyled ps-3 pt-2">
      <li><Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link></li>
      <li><Link to="/Premium" onClick={() => setMenuOpen(false)}>Premium</Link></li>
      <li><Link to="/portfolio" onClick={() => setMenuOpen(false)}>Portfolio</Link></li>
      <li><Link to="/testimonials" onClick={() => setMenuOpen(false)}>Testimonials</Link></li>
      <li><Link to="/faq.html" onClick={() => setMenuOpen(false)}>FAQ</Link></li>
      <li><Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link></li>
    </ul>
  )}
</li>
    </ul>
    {(user?.role === "condidate" || user?.role === "company") && (
  <div className="text-center mt-3">
    <button onClick={backTo} className="btn btn-danger border-width-2 w-100">
      Log Out
    </button>
  </div>
)}
  </div>
)}



        </div>
      </header>

<section className="home-section section-hero overlay bg-image"  
         style={{ backgroundImage: 'url("/images/hero_1.jpg")'}}  
         id="home-section" >
  <div className="container">
  <div className="row align-items-center justify-content-center">
    <div className="col-md-12">
      <div className="mb-5 text-center">
        <h1 className="text-white font-weight-bold">
          The Easiest Way To Get Your Dream Job
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Cupiditate est, consequuntur perferendis.
        </p>
      </div>
  {user?.role === 'company' && <CondidateSearchForm />}
{user?.role === 'condidate' && <CompanySearch />}
{!user?.role && <p className="text-white text-center">Please log in to search.</p>}
      

    </div>
  </div>
</div>

  <a
    href="#"
    className="btn btn-lg btn-primar btn-lg-square back-to-top"
  >
    <i className="bi bi-arrow-up" />
  </a>
</section>


    </div>
    
    
    </div>
  );
};

export default Header;
