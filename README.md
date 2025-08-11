# 🏫 School Management API

A Node.js + Express.js REST API with MySQL for managing schools, supporting:
- Adding a school
- Listing schools sorted by proximity to a given location

## Live Server : - https://apis-for-school-management-q4f9.onrender.com

---

## 📌 Features
1. **Add School** (`POST /addSchool`)
   - Stores school name, address, and coordinates in MySQL.
2. **List Schools** (`GET /listSchools`)
   - Returns all schools sorted by nearest to provided latitude & longitude.

---

## 🛠 Tech Stack
- **Node.js** + **Express.js**
- **MySQL** (Hosted on clever cloud)
- **dotenv** for environment variables
- **express-validator** for input validation

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repo
```bash
git clone https://github.com/Jaswant-Yadav/APIs-for-School-Management.git
cd APIs-for-School-Management

2️⃣ Install dependencies

npm install

3️⃣ Create .env file

DB_HOST=your_mysqlhost
DB_USER=your_mysqluser
DB_PASSWORD=your_mysqlpassword
DB_NAME=your_mysqldatabase
DB_PORT=your_mysqlport
PORT=5000

🗄 Database Setup

Run the following SQL in your Railway MySQL (via MySQL Workbench or mysql CLI):

CREATE DATABASE IF NOT EXISTS schooldb;
USE schooldb;

CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(500) NOT NULL,
  latitude DOUBLE NOT NULL,
  longitude DOUBLE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

🚀 Running Locally

npm start

Your API will be running at:

http://localhost:5000

📡 API Endpoints
Add School

POST /addSchool

{
  "name": "Green Valley High",
  "address": "123 Main Street, Cityville",
  "latitude": 28.7041,
  "longitude": 77.1025
}

✅ Response:

{
  "message": "School added successfully"
}

List Schools by Location

GET /listSchools?latitude=28.7041&longitude=77.1025

✅ Response:

[
  {
    "id": 1,
    "name": "Green Valley High",
    "address": "123 Main Street, Cityville",
    "latitude": 28.7041,
    "longitude": 77.1025,
    "distance_km": 0
  },
  {
    "id": 2,
    "name": "Sunrise Public School",
    "address": "45 School Road, Cityville",
    "latitude": 28.5355,
    "longitude": 77.3910,
    "distance_km": 35.6
  }
]
