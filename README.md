# 💼 JobPortal — Full-Stack Job Recruitment Platform

A professional, full-featured job portal built with **NestJS**, **MongoDB**, and **React.js**. It supports multiple roles — **Admins, Companies, Condidates, and Visitors** — with role-based functionalities, dynamic dashboards, secure authentication , Comments & Replies, and CV/job management.

---

## 🚀 Technologies Used

### 🔧 Backend (NestJS + MongoDB)
- **Node.js** — JavaScript runtime powering the backend
- **NestJS 10** — Scalable and modular backend frameWork built on Node.js
- **MongoDB & Mongoose** — NoSQL databasefor flexible data models
- **Multer** — File uploading (profile images & CVs)
- **UUID** — Unique identifiers
- **Role-based access guards** — Secure routes by user roles
- **Password reset & Email notification system** — User recovery and notifications

### 🎨 Frontend (React.js)
- **React 19** with Hooks & Functional Components
- **React Router v7** — Dynamic routing
- **Axios** — API communication
- **Bootstrap & React-Bootstrap** — Styling & layout
- **User dashboards** for each role
- **WebSocket & Socket.IO** Real-time communication for notifications and updates
- **Comment** Real-time comments byt companies and candidates


---

## 👥 User Roles & Features

### 🧑‍💼 Admin
- Manage users, jobs, and system-wide statistics
- Access dashboard: recent users, top visited offers, etc.

### 🏢 Company
- Register & manage profile
- Create & manage job offers
- Attach evaluation tests
- View and manage condidate applications
- Respond to condidate comments

### 🧑‍🎓 Condidate
- Register & apply to jobs
- Upload CV
- Take evaluation tests
- Comment on job offers
- View applied jobs and notifications

### 🌍 Visitor
- Browse job offers publicly
- View company and job details

---

## 🧠 Key Functionalities

- ✅ Full Authentication System (Register, Login, Reset Password,forget Password)
- ✅ Role-Based Access (Admin, Company, Condidate, Visitor)
- ✅ File Uploads (CVs, Profile Images)
- ✅ Job Offer Posting & Management
- ✅ Condidate Evaluation via Test
- ✅ Comments & Company Responses
- ✅ Notifications for Job Applications, Craetion Of JobOffers,  & Updates
- ✅ Dashboards for Each User Role
- ✅ Real-Time Statistics (Most Active, Most Visited, etc.)
- ✅ WebSockets, Socket.IO 


---

## 🛠 Folder Structure (Example)

### Backend Modules:
`admin`, `comment`, `company`, `condidates`, `jobapplication`, `joboffer`, `user`, `evaluation`, `dashboard`, `guards`, `notification`, `userRole`, `statistics`

### Frontend (Admin Dashboard):
`components`, `home`, `comment`, `myProfile`, `RecenUser`, `TopVisited`, `auth`, `services`, `dataTable`, `manages`

### Frontend (Company & Condidate):
`auth`, `components`, `jobOffer`, `condidateDashboard`, `services`, `pages`, `views`,`helper`,`Profile`, `RoleBasedStatistic`,`search`,`companies`, `DashboardCompany`

### 🔐 Storage Decision

Working to add http only cookie soon


## 🏁 How to Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/salemwch/jobPortal.git
cd JobPortal

# 2. Install dependencies
cd ../BackEnd
npm install

cd ../FrontEnd
npm install

# 3. Start backend
cd ../BackEnd
npm run start:dev

# 4. Start frontend
cd ../FrontEnd
npm start
