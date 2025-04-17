import './App.css';
import { Navigate,  Route,BrowserRouter as  Router, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/dashboard';
import Register from './pages/register';
import Home from './Home/Home';
import Laouyt from './Home/Laouyt';
import ManageCondidates from './pages/manages/ManageCondidates';
import ManageCompanies from './pages/manages/manageCompany';
import CompanyTable from './pages/DataTable/CompanyTable';
import CondidateTable from './pages/DataTable/CondidateTable';
import ManageOffers from './pages/manages/ManageOffers';
import JobOfferTable from './pages/DataTable/JobOfferTable';
import ManageTestJobApplications from './pages/manages/manageTestJobApplication';
import TestJobApplicationTable from './pages/DataTable/testJobApplicationTable';
import CompanyCommentsDashboard from './pages/comment/CompanyCommentDashboard';
import JobApplicationTable from './pages/DataTable/JobApplicationTable';
import ManageJobApplication from './pages/manages/ManageJobApplication';
import ForgetPassword from './pages/forgetpassword';
import ResetPassword from './pages/RecetPassword';
import MyProfile from './pages/myProfile/MyProfile';
function PrivateRoute({ children }) {
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  if (!user || user.user.role !== "admin") {
    alert("Only admins can log in here.");
    return <Navigate to="/login" />;
  }

  return children;
}
function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<PrivateRoute> <Home/>  </PrivateRoute>} >
        <Route path = '/' element = {<Laouyt/>}/>
        <Route path = "/dashboard" element = {<Dashboard/>}/>
        <Route path = "/comment" element= {<CompanyCommentsDashboard/>} /> 
        <Route path = "/manageCondidates" element = {<ManageCondidates/>} />
        <Route path = "/manageCompany" element = {<ManageCompanies/>} />
        <Route path="/manageOffers" element={<ManageOffers/>} />
        <Route path = "/manageTestJob" element = {<ManageTestJobApplications/>}/>
        <Route path= "/JobApplication" element={<ManageJobApplication/>} />
        <Route path = "/company/:id" element = {<CompanyTable/>}/>
        <Route path="/condidates/:id" element={<CondidateTable/>} />
        <Route path ="/job-offer/:id" element={< JobOfferTable/>} />
        <Route path = "/testJobApplication/:id" element ={<TestJobApplicationTable/>} />
        <Route path = "/jobapplication/:id" element = {<JobApplicationTable/>}/>
        <Route path = "/MyProfile" element = {<MyProfile/>} />
        </Route>
        <Route path ="/login" element = {<Login/>}/>
        <Route path = "/register" element = {<Register/>} />
        <Route path = "/auth/forgetpassword" element={<ForgetPassword/>}/>
        <Route path= "/auth/reset-password/:token" element = {<ResetPassword/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
