# 💼 JobPortal — Full-Stack Job Recruitment Platform

A professional, full-featured job portal built with **NestJS**, **MongoDB**, and **React.js**. It supports multiple roles — **Admins, Companies, Condidates, and Visitors** — with role-based functionalities, dynamic dashboards, secure authentication , Comments & Replies, and CV/job management.

---

## 🚀 Technologies Used

### 🔧 Backend (NestJS + MongoDB)
- **NestJS 10** — Scalable backend framework
- **MongoDB & Mongoose** — NoSQL database
- **Multer** — File uploading (profile images & CVs)
- **UUID** — Unique identifiers
- **Role-based access guards**
- **Password reset & Email notification system**

### 🎨 Frontend (React.js)
- **React 19** with Hooks & Functional Components
- **React Router v7** — Dynamic routing
- **Axios** — API communication
- **Bootstrap & React-Bootstrap** — Styling & layout
- **User dashboards** for each role

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

- ✅ Full Authentication System (Register, Login, Reset Password)
- ✅ Role-Based Access (Admin, Company, Condidate, Visitor)
- ✅ File Uploads (CVs, Profile Images)
- ✅ Job Offer Posting & Management
- ✅ Condidate Evaluation via Test
- ✅ Comments & Company Responses
- ✅ Notifications for Applications & Updates
- ✅ Dashboards for Each User Role
- ✅ Real-Time Statistics (Most Active, Most Visited, etc.)

---

## 🛠 Folder Structure (Example)

### Backend Modules:
`admin`, `comment`, `company`, `condidates`, `jobapplication`, `joboffer`, `user`, `evaluation`, `dashboard`, `guards`, `notification`, `userRole`, `statistics`

### Frontend (Admin Dashboard):
`components`, `home`, `comment`, `myProfile`, `RecenUser`, `TopVisited`, `auth`, `services`, `dataTable`, `manages`

### Frontend (Company & Condidate):
`auth`, `components`, `jobOffer`, `condidateDashboard`, `services`, `pages`, `views`

---


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
