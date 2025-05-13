import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NotificationService from '../services/notification'; 
import { io } from 'socket.io-client';
import { getDashboardRoute } from "../helper/helper";
import { getProfileRoute } from "../helper/helper";


const Header = () => {
  const [user, setUser] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [locationText, setLocationText] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dashboardPath = getDashboardRoute(user);

  const navigate = useNavigate();

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
  
    // Cleanup
    return () => {
      window.removeEventListener("userUpdated", updateUser);
      if (socket) socket.disconnect();
    };
  }, []);

  
const handleMarkAsRead = async (id) => {
  try {
    const token = localStorage.getItem("token");
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
    const token = localStorage.getItem("token");
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
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const t = searchText.trim();
    const l = locationText.trim();
    const params = [];
    if (t) params.push(`title=${encodeURIComponent(t)}`);
    if (l) params.push(`location=${encodeURIComponent(l)}`);
    
    // If nothing entered, stay on home
    if (!params.length) return;
  
    navigate(`/job-results?${params.join("&")}`);
  };
  

  return (
    <div>
      <div class="site-wrap">
      <div class="site-mobile-menu site-navbar-target">
      <div class="site-mobile-menu-header">
        <div class="site-mobile-menu-close mt-3">
          <span class="icon-close2 js-menu-toggle"></span>
        </div>
      </div>
      <div class="site-mobile-menu-body"></div>
    </div>
      <header className="site-navbar mt-3">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="site-logo col-6">
              <a href="/">JobBoard</a>
            </div> 
            <nav className="mx-auto site-navigation">
  <ul className="site-menu js-clone-nav d-none d-xl-block ml-0 pl-0">
    
    <li><a href="/" className="nav-link active">Home</a></li>
    <li><a href="/AboutUs">About</a></li>

    {/* Dynamically render Dashboard link based on user role */}

{user && (
  <li>
    <Link to={getDashboardRoute(user)}>Dashboard</Link>
  </li>
)}



    <li className="has-children">
      <a href="/">Pages</a>
      <ul className="dropdown">
        <li><a href="/services">Services</a></li>
        <li><a href="/Premium">Premium</a></li>
        <li><a href="/portfolio">Portfolio</a></li>
        <li><a href="/testimonials">Testimonials</a></li>
        <li><a href="/faq.html">Frequently Ask Questions</a></li>
      </ul>
    </li>

    <li><a href="/blog">Blog</a></li>
    <li><a href="/Contact">Contact</a></li>

    {!user && (
      <>
        <button className="d-lg-none">
          <a href="/register"><span className="mr-2">+</span> Post a Job</a>
        </button>
        <button className="d-lg-none">
          <a href="/login">Log In</a>
        </button>
      </>
    )}
  </ul>
</nav>

            <div className="right-cta-menu text-right d-flex align-items-center col-6">
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
{/* 🔔 Notification Dropdown */}
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
      <li>
        <span className="dropdown-item">No notifications</span>
      </li>
    ) : (
      notifications.map((notif, index) => (
        <li key={index} className="dropdown-item d-flex justify-content-between align-items-start flex-column">
          <div className="w-100 mb-2">
            <span className={notif.read ? "" : "fw-bold"}>
              {notif.message}
            </span>
          </div>
        
          <div className="d-flex gap-2 w-100">
            <a
              href={`/job-offer/${notif.jobOffer}`}  
              
              className="btn btn-sm btn-outline-info"
            >
              
              View Job Offer

            </a>

            {!notif.read && (
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => handleMarkAsRead(notif._id)}
              >
                Mark as Read
              </button>
            )}
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => handleDelete(notif._id)}
            >
              Delete
            </button>
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
              <a href="#/" class=" site-menu-toggle js-menu-toggle d-inline-block d-xl-none mt-lg-2 ml-3"><span class="icon-menu h3 m-0 p-0 mt-2"></span></a>

            </div>
          </div>
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
            Cupiditate est, consequuntur perferendis.setS
          </p>
        </div>

        {/* ← Replace your lone <input> here with the full form: */}
        <form onSubmit={handleSearchSubmit} className="search-jobs-form">
          <div className="row mb-5">
            <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
              {/* This is your search input bound to searchText */}
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Job title, Company..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            {/* If you still want your region dropdown or button, keep them here: */}
            <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
              <select
              value={locationText}
              onChange={e => setLocationText(e.target.value)}
                data-style="btn-white btn-lg"
                data-width="100%"
                data-live-search="true"
                title="Select Region"
              >
                <option value="">Anywhere</option>
                <option value="sousse">sousse</option>
                <option value="tunis">tunis</option>
                <option value="england">england</option>
              </select>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block text-white btn-search"
              >
                <span className="icon-search icon mr-2" />
                Search
              </button>
            </div>
          </div>

          {/* trending keywords can stay here if you like */}
          <div className="row">
            <div className="col-md-12 popular-keywords">
              <h3>Trending Keywords:</h3>
              <ul className="keywords list-unstyled m-0 p-0">
                <li><a href="#">UI Designer</a></li>
                <li><a href="#">Python</a></li>
                <li><a href="#">Developer</a></li>
              </ul>
            </div>
          </div>
        </form>
        {/* ↑ Now your form lives right in the hero section */}

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
