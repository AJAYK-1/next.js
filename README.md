# 📜 Feedback App (Datafloat Machine Test)

**Feedback App** is a full-stack React + Node.js application for managing user feedback with emotion detection. The app supports **user** and **admin** roles, secure authentication, and feedback classification using a trained **Naive Bayes classifier**.

## 🚀 Features

- 🔒 Secure user authentication (JWT)
- 📅 Submit feedback with rating and comments
- 🧑‍⚕️ Emotion classifier trained on CSV data using `natural` (Naive Bayes)
- 📊 Admin panel to view feedback and sentimental analytics 
- 🌐 Responsive UI with TailwindCSS and React


## 🛠️ Tech Stack

**Frontend**  
- React.js  
- TailwindCSS

**Backend**  
- Node.js  
- Express.js  
- Natural – Naive Bayes classifier for emotion detection

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
git clone https://github.com/AJAYK-1/MachineTest-Datafloat
cd MachineTest-Datafloat
```

### 2. Install dependencies (Backend)
```bash
cd Backend
npm install
```

### 3. Install dependencies (Frontend)
```bash
cd Frontend
npm install 
```

### 4. Environment Setup

Create a `.env` file in the `Backend/` folder with the following:

```env
PORT=3000
MONGO_URI= your_mongodb_connection_string
JWT_SECRET= your_secret_key
ADMIN_ID = Admin_name
ADMIN_PASSWORD = Admin_Password
```

Create a `.env` file in the `Frontend/` folder with the following:

```env
VITE_HOST_URL = http://localhost:3000
```

### 5. Train the emotional classifier

The app uses a Naive Bayes classifier (from the natural library) to analyze user feedback comments and detect emotions such as happy, hate, boredom, neutral, etc.

#### Step 1: Place your csv file in the `Backend/Data/` folder:
```
Backend/Data/EmotionDetection.csv
```

#### Step 2: Run the training script in the Backend once.
```
cd Backend
cd Scripts
node TrainModel.js
```
### ⚠️ **Note:** The full CSV contains 840k+ rows. To avoid freezing of system, the current model was trained on the first **1,00,000** rows only.


### 6. Run the app

#### Backend
```bash
cd Backend
npm start
```

#### Frontend
```bash
cd ../Frontend
npm run dev
```

The app will be running at:
👉 `http://localhost:5173/`


## 📂 Folder Structure

```
Re-Zume/
│
├── Backend/       # Express API
│   ├── Controllers/
│   ├── Data/
│   ├── Models/
│   ├── Middlewares/
│   ├── Routes/
│   ├── Scripts/
│   └── server.js
│
├── Frontend/      # React application
│   ├── src/
│   │   ├── Components/
│   │   │   └── Folders/pages
│   │   └── App.js
│   └── index.html
```

## 👨‍💻 Author

**Ajay Kumar T P**  
📧 ajaykumartp10@gmail.com  
🔗 [LinkedIn](https://linkedin.com/in/ajaykumartp) | [GitHub](https://github.com/AJAYK-1)

---
