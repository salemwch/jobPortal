import './App.css';
import { Navigate,  Route, BrowserRouter as  Router, Routes } from 'react-router-dom';
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
function PrivateRoute({ children }) {
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  if (!user || (user.user.role !== "company" && user.user.role !== "condidate")) {
    alert("Only company and condidate can log here  can log  here.");
    return <Navigate to="/login" />;
  }

  return children;
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
        <Route path ='/condidateDashboard' element={ <PrivateRoute> <CondidateDashboard/> </PrivateRoute>}/>
        <Route path = '/JobApplicationForm' element={ <JobApplicationForm></JobApplicationForm> }/>
        <Route path="/apply/:jobOfferId" element={<JobApplicationForm/>} />

        <Route path ='/job-offer/:id' element={<JobOfferDetails/>}/>
        <Route path ="/login" element = {<Login/>}/>
        <Route path="/SignUpConfirmation" element={<SignUpConfirmation/>}/>
        <Route path="/register" element={<Register/>} />
        <Route path="/ResetPassword" element={<ResetPassword/>}/>
        <Route path="/ForgetPassword" element={<ForgetPassword/>}/>
        </Routes>
    </Router>
  );
}

export default App;
