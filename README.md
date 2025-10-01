# 📜 Re-Zume: ATS Friendly Resume Creator

**Re-Zume** is a full stack web application that allows users to create/modify ATS friendly resumes and evaluate their resumes to get past the Applicant Tracking System(ATS). It is developed using MERN, Redux and TailwindCSS.

## 🚀 Features

- 🔒 Secure user authentication (JWT)
- 📅 Create and modify ATS friendly resumes
- 🧑‍⚕️ Evaluate user resumes
- 📊 Admin panel for managing users
- 🌐 Responsive UI with TailwindCSS and React


## 🛠️ Tech Stack

**Frontend**  
- React.js  
- TailwindCSS
- Redux

**Backend**  
- Node.js  
- Express.js  

**DataBase**
- MongoDB (Mongoose ODM)

**Tools**  
- Git & GitHub  
- Postman (for API testing)  
- MongoDB Compass

**Language**
- JavaScript (ES6+) 


## ⚙️ Installation

### Prerequisites
- Node.js and npm
- MongoDB (local or Atlas)

### 1. Clone the repo
```bash
git clone https://github.com/AJAYK-1/Re-Zume.git
cd Re-Zume
```

### 2. Install dependencies (Backend)
```bash
cd Backend
npm install
```

### 3. Install dependencies (Frontend)
```bash
cd Frontend
npm install vite@latest
```

### 4. Environment Setup

Create a `.env` file in the `backend/` folder with the following:

```env
PORT=5000
MONGO_URI= your_mongodb_connection_string
JWT_SECRET= your_secret_key
ADMIN_EMAIL = Admin_email
ADMIN_PASSWORD = Admin_Password
```

### 5. Run the app

#### Backend
```bash
cd backend
npm start
```

#### Frontend
```bash
cd ../frontend
npm run dev
```

The app will be running at:
👉 `http://localhost:5000/`


## 📂 Folder Structure

```
Re-Zume/
│
├── backend/       # Express API
│   ├── Controllers/
│   ├── Models/
│   ├── Middlewares/
│   ├── Routes/
│   └── server.js
│
├── frontend/      # React application
│   ├── src/
│   │   └── Components/
│   │       ├── pages/
│   │       └── App.js
│   └── index.html
```

## 👨‍💻 Author

**Ajay Kumar T P**  
📧 ajaykumartp10@gmail.com  
🔗 [LinkedIn](https://linkedin.com/in/ajaykumartp) | [GitHub](https://github.com/AJAYK-1)

---

> Feel free to fork this project, suggest improvements, or raise issues!