src/
├── controller/             # Request handlers (register, login)
├── models/                # Mongoose models (Account)
├── routes/                # All Express route definitions
├── middleware/            # JWT auth + role validation
├── services/              # Business logic (account creation, validation)
├── types/                 # TypeScript interfaces & roles
├── app.ts                # Future DB or env config
├── server.ts               # App entry point

.env file setup:
PORT=5000
MONGO_URI=mongodb://localhost:27017/burgerKing
ACCESS_TOKEN_SECRET=secret123
REFRESH_TOKEN_SECRET=secret456
JWT_TOKEN=superSecretKey


⚙️ Tech Stack
Tool	Purpose
Node.js	Backend runtime
Express.js	API routing and middleware framework
TypeScript	Type-safe backend development
MongoDB	NoSQL database
Mongoose	ODM for MongoDB
JWT	Stateless authentication
bcrypt	Secure password hashing
dotenv	Environment variable management
Postman	API testing and verification

🔐 Authentication System Overview
✅ Registration
Registers new users or admins

Password is hashed using bcrypt before saving

✅ Login
Verifies credentials

Returns a signed JWT access token (1h expiry)

Future-proofed for refresh token system

✅ Authorization Middleware
Middleware checks Authorization header for a Bearer token

If token is valid, user info is attached to req.user

Role-based middleware blocks unauthorized roles (e.g. admin only)

🧪 Tested Endpoints (via Postman)
🟢 Register
POST /register
http://localhost:5000/api/register
Body:
{
    "username": "johndoe",
    "password": "johndoe",
    "role": "admin"
}
✅ Response:
{"message":"account register succesfull","account":{"username":"johndoe","role":"admin","_id":"688d645ed4c0ee60b5454c7f","__v":0}}


🔑 2. Login as Admin
POST /login
http://localhost:5000/api/login
Body:
{
    "username": "johndoe",
    "password": "johndoe",
    "role": "admin"
}
✅ Response:
{
    "message": "login succes",
    "account": {
        "_id": "688d645ed4c0ee60b5454c7f",
        "username": "johndoe",
        "role": "admin",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OGQ2NDVlZDRjMGVlNjBiNTQ1NGM3ZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1NDA5NjgyNSwiZXhwIjoxNzU0MTAwNDI1fQ.Zn6_ldfjQm5et-sPupBLqmKRSpUi73NpTu5gORw-F0s"
}

