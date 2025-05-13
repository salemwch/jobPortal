import './App.css';
import { Navigate,  Outlet,  Route, BrowserRouter as  Router, Routes } from 'react-router-dom';
import Home from './views/Home';
import Layout from './views/Layout';
import Login from './auth/Login';
import SignUpConfirmation from './pages/submit';
import Register from './auth/Resgitser';
import ResetPassword from './auth/ResetPassword';
import ForgetPassword from './auth/ForgetPassword';
import AboutUs from './pages/AboutUs';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/Privacy';
import Careers from './pages/Carrer';
import Blog from './pages/Blog';
import CondidateDashboard from './condidate/CondidateDashboard';
import JobOfferDetails from './jobOffer/JobOfferDetails';
import Contact from './pages/contact';
import JobApplicationForm from './jobOffer/JobApplicationForm';
import CondidateProfile from './Profile/CondidateProfile';
import JobResults from './search/JobResults';
import RoleBasedStatistics from './RoleBasedStatistic/RoleStatistics';
import DashboardCompanie from './Companies/DashboardCompanie';
import CompanyProfile from './Companies/companieProfile/CompanyProfile';
function PrivateRoute({  allowedRoles }) {
  const user = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")): null;

  if (!user || !allowedRoles.includes(user.user.role)) {
    alert("Access denied.");
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path = '/' element ={  <Home/> }>
        <Route path ='/' element ={<Layout/>}/>
        </Route>
        <Route path = '/AboutUs' element={<AboutUs/>}/>
        <Route path = '/TermsOfService' element={<TermsOfService/>}/>
        <Route path = '/Privacy' element={<PrivacyPolicy/>}/>
        <Route path ='/Carrer' element={<Careers/>}/>
        <Route path ='/Blog' element={<Blog/>}/>
        <Route path ='/Contact' element={<Contact/>}/>
        <Route element={<PrivateRoute allowedRoles={['condidate']} />}>
        <Route path ='/condidateDashboard' element={  <CondidateDashboard/> }/>
        <Route path = '/JobApplicationForm' element={ <JobApplicationForm></JobApplicationForm> }/>
        <Route path="/apply/:jobOfferId" element={<JobApplicationForm/>} />
        <Route path="/condidates/:id" element={<CondidateProfile/>} />
        <Route path ='/job-offer/:id' element={<JobOfferDetails/>}/>
        <Route path="/job-results" element={<JobResults />} />
        </Route>
        <Route element ={<PrivateRoute allowedRoles={['company']} />}>
        <Route path="/DashboardCompanie" element={<DashboardCompanie/>}/>
        <Route path ="/company/:id" element={<CompanyProfile/>}/>
        </Route>
        <Route path="/Statistics" element= {<RoleBasedStatistics/>}/>
        <Route path ="/login" element = {<Login/>}/>
        <Route path="/SignUpConfirmation" element={<SignUpConfirmation/>}/>
        <Route path="/register" element={<Register/>} />
        <Route path="/auth/reset-password/:token" element={<ResetPassword/>}/>
        <Route path="/ForgetPassword" element={<ForgetPassword/>}/>
        </Routes>
    </Router>
  );
}

export default App;
