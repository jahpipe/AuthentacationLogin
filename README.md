# 🛡️ AuthentacationLogin API (Backend)

A TypeScript + Express.js backend system with secure JWT authentication and role-based access control for `BurgerKing` system.

---

## 📁 Project Structure

```
src/
├── controller/       # Request handlers (register, login)
├── models/           # Mongoose models (Account)
├── routes/           # Express route definitions
├── middleware/       # JWT auth + role validation
├── services/         # Business logic (account creation, validation)
├── types/            # TypeScript interfaces & role types
├── app.ts            # Express app + middleware
├── server.ts         # App entry point
```

---

## ⚙️ Tech Stack

| Tool       | Purpose                                 |
|------------|-----------------------------------------|
| Node.js    | Backend runtime                         |
| Express.js | API routing and middleware              |
| TypeScript | Type-safe backend development           |
| MongoDB    | NoSQL database                          |
| Mongoose   | ODM for MongoDB                         |
| JWT        | Stateless authentication                |
| bcrypt     | Secure password hashing                 |
| dotenv     | Environment variable management         |
| Postman    | API testing and verification            |

---

## 🔐 Authentication System Overview

### ✅ Registration

- Registers new users or admins
- Password is hashed using bcrypt before saving

### ✅ Login

- Verifies credentials
- Returns a signed JWT access token (`1h` expiry)
- Future-proofed for refresh token system

### ✅ Authorization Middleware

- Checks `Authorization` header for Bearer token
- If valid, user info is attached to `req.user`
- Role-based blocking (e.g., admin-only routes)

---

## 📄 `.env` File Example

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/burgerKing
ACCESS_TOKEN_SECRET=secret123
REFRESH_TOKEN_SECRET=secret456
JWT_TOKEN=superSecretKey
```

---

## 🧪 Tested Endpoints (via Postman)

### 🟢 1. Register

**POST** `/api/register`  
**URL:** `http://localhost:5000/api/register`  
**Body:**
```json
{
  "username": "johndoe",
  "password": "johndoe",
  "role": "admin"
}
```

✅ **Response:**
```json
{
  "message": "account register succesfull",
  "account": {
    "username": "johndoe",
    "role": "admin",
    "_id": "688d645ed4c0ee60b5454c7f",
    "__v": 0
  }
}
```

---

### 🔑 2. Login as Admin

**POST** `/api/login`  
**URL:** `http://localhost:5000/api/login`  
**Body:**
```json
{
  "username": "johndoe",
  "password": "johndoe",
  "role": "admin"
}
```

✅ **Response:**
```json
{
  "message": "login succes",
  "account": {
    "_id": "688d645ed4c0ee60b5454c7f",
    "username": "johndoe",
    "role": "admin",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
