<div align="center">

# 🚀 CareerBridge AI

### AI-Powered Career & Recruitment Platform

**Discover jobs. Build your profile. Analyze your resume. Practice interviews. Find your career match.**

🌐 **[Live Demo](https://careerbridge-ai-gilt.vercel.app)**   •   💻 **[GitHub Repository](https://github.com/akashsingh77-ux/careerbridge-ai)**

</div>

---

## ✨ About CareerBridge AI

**CareerBridge AI** is a full-stack AI-powered career and recruitment platform designed to connect **job seekers and recruiters** through a modern, intelligent, and user-friendly experience.

Unlike a traditional job portal, CareerBridge AI combines:

* 🤖 AI Resume Analysis
* 🎯 Smart Job Matching
* 🧠 AI Interview Practice
* 📊 Interview Performance Tracking
* 💼 Job Discovery & Applications
* 🏢 Recruiter & Applicant Management

into a single platform.

The goal is simple:

> **Help candidates discover the right opportunities and help recruiters discover the right talent.**

---

## 🌟 Why CareerBridge AI?

CareerBridge AI goes beyond simply listing jobs.

### For Candidates

Find jobs, create a professional profile, upload your resume, understand how well your skills match a particular job, practice interviews with AI, and track your interview performance.

### For Recruiters

Create companies, post jobs, manage job listings, and review applicants from a dedicated recruiter experience.

---

# 🚀 Key Features

## 👨‍💻 Candidate Features

| Feature               | Description                                                           |
| --------------------- | --------------------------------------------------------------------- |
| 🔐 Authentication     | Secure signup and login                                               |
| 👤 Profile Management | Manage personal information, bio and skills                           |
| 📄 Resume Upload      | Upload and manage your latest resume                                  |
| 🤖 AI Resume Analysis | Extract useful career information and technical skills                |
| 🔎 Job Discovery      | Browse available job opportunities                                    |
| 🎛️ Job Filters       | Filter opportunities based on relevant criteria                       |
| ❤️ Saved Jobs         | Save interesting jobs for later                                       |
| 📝 Job Applications   | Apply directly to available opportunities                             |
| 🎯 Smart Match        | Calculate compatibility between candidate skills and job requirements |
| 🧠 AI Interview       | Practice interviews with AI-generated questions                       |
| 📊 Interview History  | Review previous interview scores and performance                      |
| 📱 Responsive UI      | Designed for desktop and mobile                                       |

---

## 🏢 Recruiter Features

| Feature                 | Description                                 |
| ----------------------- | ------------------------------------------- |
| 🏢 Company Management   | Create and manage company profiles          |
| 📢 Job Posting          | Publish new job opportunities               |
| 💼 Job Management       | View and manage posted jobs                 |
| 👥 Applicant Management | Review candidates who applied               |
| 📊 Recruiter Dashboard  | Manage recruitment activities               |
| 🔎 Candidate Review     | View applicant information and applications |

---

# 🤖 AI-Powered Features

## 📄 AI Resume Analysis

CareerBridge AI allows candidates to upload their resumes and automatically analyze them.

### Workflow

```text
Resume Upload
      ↓
Resume Text Extraction
      ↓
AI Analysis
      ↓
Technical Skills & Career Information
      ↓
Saved to Candidate Profile
```

The extracted information can then be used by other parts of the platform.

---

# 🎯 Smart Match

The **Smart Match** system helps candidates understand how well their profile matches a particular job.

It combines:

```text
Profile Skills
      +
Resume-Extracted Skills
      ↓
Skill Normalization
      ↓
Job Requirement Analysis
      ↓
Skill Matching
      ↓
Personalized Match %
```

### Smart Match provides:

* 🎯 Overall match percentage
* ✅ Matching required skills
* 🔥 Matching additional skills
* ⚠️ Skills that can be improved
* 📊 Required-skill weighting
* 📈 Additional-skill weighting

This gives candidates a clearer understanding of where they currently stand for a particular opportunity.

---

# 🧠 AI Interview

CareerBridge AI also provides an AI-powered interview practice experience.

Candidates can practice:

* General interview questions
* Domain-specific questions
* Resume-based questions

After completing an interview, the platform provides performance information that can be reviewed later.

### Interview Flow

```text
Candidate
    ↓
Start AI Interview
    ↓
AI Questions
    ↓
Candidate Answers
    ↓
AI Evaluation
    ↓
Performance Score
    ↓
Interview History
```

---

# 📊 Interview History

Candidates can revisit previous AI interviews and see performance breakdowns such as:

* Overall score
* General interview performance
* Domain-specific performance
* Resume-based performance
* Completion date

This allows users to track their interview preparation over time.

---

# 💼 Job Application Flow

CareerBridge AI also handles the complete candidate application flow.

```text
Browse Jobs
    ↓
Open Job Details
    ↓
View Requirements
    ↓
Check Smart Match
    ↓
Apply
    ↓
Application Recorded
    ↓
Track Applied Jobs
```

Unauthenticated users are prompted to log in before applying.

---

# 🛠️ Tech Stack

## Frontend

* ⚛️ React
* ⚡ Vite
* 🎨 Tailwind CSS
* 🧩 Shadcn UI
* 🧭 React Router
* 🗃️ Redux Toolkit
* 📡 Axios
* 🎨 Lucide React

## Backend

* 🟢 Node.js
* 🚂 Express.js
* 🍃 MongoDB
* 🔐 JWT Authentication
* 🍪 HTTP-only Cookies
* ☁️ Cloudinary
* 🤖 Google Gemini
* ⚡ Groq

## Deployment & Services

* ▲ Vercel — Frontend
* 🚀 Render — Backend
* 🍃 MongoDB Atlas — Database
* ☁️ Cloudinary — File & Image Storage

---

# 🏗️ Project Structure

```text
CareerBridge AI/
│
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   ├── index.js
│   └── package.json
│
├── fronted/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── redux/
│   │   ├── utils/
│   │   └── ...
│   └── package.json
│
├── .gitignore
├── package.json
└── README.md
```

---

# 🔄 System Overview

```text
                         ┌──────────────────────┐
                         │    CareerBridge AI   │
                         └──────────┬───────────┘
                                    │
                  ┌─────────────────┴─────────────────┐
                  │                                   │
             👨‍💻 Candidate                         🏢 Recruiter
                  │                                   │
          ┌───────┴────────┐                  ┌───────┴────────┐
          │                │                  │                │
       Profile           Jobs              Company           Jobs
          │                │                  │                │
       Resume           Apply             Manage Jobs      Applicants
          │
          ├─────────────────────┐
          │                     │
     🤖 Resume AI          🎯 Smart Match
          │                     │
          └──────────┬──────────┘
                     │
              🧠 AI Interview
                     │
              📊 Interview History
```

---

# 🔐 Authentication & Security

CareerBridge AI uses authentication and role-based access to separate candidate and recruiter functionality.

Security-related features include:

* 🔐 JWT-based authentication
* 🍪 HTTP-only authentication cookies
* 🔒 Protected application workflows
* 👨‍💻 Candidate/recruiter role separation
* 🌐 Production CORS configuration
* 🔑 Environment-based API credentials
* 🚫 Sensitive `.env` files excluded from Git

> ⚠️ Never commit real API keys, database credentials, or secrets to the repository.

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/akashsingh77-ux/careerbridge-ai.git

cd careerbridge-ai
```

## 2. Install Frontend Dependencies

```bash
cd fronted

npm install
```

## 3. Install Backend Dependencies

```bash
cd ../backend

npm install
```

## 4. Configure Environment Variables

Create a `.env` file inside the `backend` directory.

```env
PORT=8000

MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_secret_key

CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

GEMINI_API_KEY=your_gemini_api_key
GROQ_API_KEY=your_groq_api_key

FRONTEND_URL=http://localhost:5173
```

## 5. Start the Backend

```bash
cd backend

npm run dev
```

## 6. Start the Frontend

Open another terminal:

```bash
cd fronted

npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

---

# 🌐 Live Demo

## 🚀 Try CareerBridge AI

### 👉 https://careerbridge-ai-gilt.vercel.app

Explore the complete deployed application and experience the candidate and recruiter workflows.

---

# 📸 Application Highlights

### 🏠 Job Discovery

Discover available career opportunities through a modern job browsing interface.

### 💼 Job Details

View:

* Job description
* Requirements
* Location
* Experience
* Salary
* Positions
* Applicants
* Smart Match

### 🎯 Smart Match

Understand your compatibility with a job through an AI-assisted skill matching experience.

### 👤 Candidate Profile

Manage:

* Personal information
* Bio
* Skills
* Resume
* Applied jobs

### 🧠 AI Interview

Practice interviews and review AI-powered performance results.

### 🏢 Recruiter Dashboard

Recruiters can manage companies, job postings and applicants from dedicated interfaces.

---

# 📈 Future Improvements

Some planned enhancements include:

* 🔔 Real-time notifications
* 💬 Recruiter-candidate messaging
* 📧 Email notifications
* 📅 Interview scheduling
* 🧠 More advanced semantic resume-job matching
* 📊 Advanced recruiter analytics
* 🏆 Personalized skill recommendations
* 🌍 Improved job personalization
* 📱 Progressive Web App support

---

# 👨‍💻 Developer

<div align="center">

## **AKASH SINGH**

**Computer Science & Engineering — NIT Agartala**

Full-Stack Developer • AI Enthusiast • Problem Solver

Building modern applications with:

**React • Node.js • Express • MongoDB • AI**

</div>

---

# ⭐ Support the Project

If you find **CareerBridge AI** interesting:

⭐ **Star** the repository
🍴 **Fork** the project
🐛 **Report** bugs
💡 **Suggest** improvements

---

<div align="center">

## 🚀 CareerBridge AI

### Connecting Talent With Opportunity — Powered by AI.

**Made with ❤️ by AKASH SINGH**

</div>
