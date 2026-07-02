# mytasks

## Backend–Frontend & MongoDB Setup

This project has a Node.js/Express backend and a React (Vite + TypeScript) frontend, connected to a MongoDB Atlas cluster using Mongoose.

### Backend (Node.js + Express + Mongoose)

- **Dependencies**
  - Uses `express` for the HTTP server, `mongoose` for MongoDB, `cors` for cross‑origin requests, `dotenv` for environment variables, and `nodemon` for development.
  - `backend/package.json` scripts:
    - `npm run dev` → `nodemon src/server.js`
    - `npm start` → `node src/server.js`

- **MongoDB connection helper**
  - File: `backend/src/config/db.js`
  - Reads `process.env.MONGODB_URI` (from `.env`) and connects with `mongoose.connect(uri)`.
  - If `MONGODB_URI` is missing or the connection fails, it logs the error and exits the process so the problem is visible immediately.

- **Express server**
  - File: `backend/src/server.js`
  - Responsibilities:
    - Loads env vars with `dotenv.config()`.
    - Creates an Express app and registers middleware:
      - `express.json()` for JSON request bodies.
      - `cors({ origin: 'http://localhost:5173', credentials: true })` so the React app can call the backend during development.
    - Calls `connectDB()` from `config/db.js` to connect to MongoDB.
    - Defines routes:
      - `GET /api/health` → returns `{ status: 'ok', message: 'Backend and MongoDB are running' }` to quickly verify the backend and DB are up.
      - `POST /api/login` → accepts `{ email, password }`, validates that both are present, and currently returns a simple success JSON (placeholder for real auth logic with MongoDB).
    - Starts the server on `process.env.PORT` or `5000` and logs `Server running on http://localhost:PORT`.

- **Environment variables**
  - File: `backend/.env` (not committed to git).
  - Example content (do not commit real passwords):
    ```env
    PORT=5000
    MONGODB_URI=mongodb+srv://maheshkumar_db_user:YOUR_REAL_PASSWORD@cluster0.avksc3u.mongodb.net/taskmanagement-db?retryWrites=true&w=majority&appName=Cluster0
    ```
  - `MONGODB_URI` must match the connection string copied from MongoDB Atlas → **Connect → Drivers → Node.js**, with the real password filled in (no `< >`).
  - Your IP address must be allowed in Atlas → **Network Access** for the connection to succeed.

### Frontend (React + Vite) login integration

- **Login page behavior**
  - File: `frontend/src/pages/login.tsx`
  - Tracks `email` and `password`, plus:
    - `loading` → disables the button and shows `"Logging in..."` while the request is in flight.
    - `message` → success message from the backend.
    - `error` → error message when something goes wrong (validation, network, backend down, etc.).

- **Submit handler**
  - On form submit, prevents default and sends a `POST` request to the backend:
    ```ts
    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    ```
  - Parses the JSON response, throws an error if `res.ok` is false, and updates `message` or `error` accordingly.

- **UI feedback**
  - The submit button is disabled and shows `"Logging in..."` while `loading` is true.
  - Below the form:
    - A green message is shown when `message` is set (successful login request).
    - A red message is shown when `error` is set (failed request).

### How it all works together

1. Start the backend:
   ```bash
   cd backend
   npm run dev
   ```
   - `.env` is loaded, `connectDB()` connects to MongoDB, Express starts on port 5000.

2. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```
   - Vite serves the React app on `http://localhost:5173`.

3. When the user submits the login form in the frontend:
   - The browser sends a `POST` to `http://localhost:5000/api/login`.
   - Express handles the request, validates input, and responds with JSON.
   - The React component updates its UI based on the success or failure of that request.

This structure makes it easy to later add real MongoDB models (e.g. `User`) and implement proper `/api/register` and `/api/login` routes backed by the database.

## Setup Authentication and Dashboard

This workflow outlines the steps to create a complete authentication system (Login, Register) and a Dashboard page, integrated with a MongoDB backend.

### 1. Backend Setup

#### 1.1. Install Dependencies
Ensure `express`, `mongoose`, `cors`, `dotenv` are installed.
```bash
npm install express mongoose cors dotenv
```

#### 1.2. Database Connection
Create `backend/src/config/db.js` to connect to MongoDB using `MONGODB_URI` from `.env`.

#### 1.3. User Schema
Create `backend/src/models/User.js`.
**Fields:**
- `name` (String, required)
- `email` (String, required, unique)
- `password` (String, required)

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
```

#### 1.4. API Endpoints
Update `backend/src/server.js` to include:
- **POST /api/register**: Accepts `name`, `email`, `password`. Checks if user exists. Creates new user.
- **POST /api/login**: Accepts `email`, `password`. Verifies credentials. Returns success message/token.

### 2. Frontend Setup

#### 2.1. Pages
Create the following pages in `frontend/src/pages/`:
- **login.tsx**: Form for Email/Password. Calls `/api/login`. Redirects to `/dashboard` on success.
- **register.tsx**: Form for Name/Email/Password/Confirm Password. Calls `/api/register`. Redirects to `/login` on success.
- **dashboard.tsx**: Protected page. Displays welcome message. Logout button redirects to `/login`.

#### 2.2. Routing
Update `frontend/src/App.tsx` to define routes:
- `/login` -> `LoginPage`
- `/register` -> `RegisterPage`
- `/dashboard` -> `DashboardPage`
- `/` -> `LoginPage` (default)

### 3. Integration

#### 3.1. Registration Flow
1. User enters Name, Email, Password on Register page.
2. Frontend sends POST request to `http://localhost:5000/api/register`.
3. Backend saves user to MongoDB.
4. Frontend redirects to Login page.

#### 3.2. Login Flow
1. User enters Email, Password on Login page.
2. Frontend sends POST request to `http://localhost:5000/api/login`.
3. Backend verifies credentials.
4. Frontend redirects to Dashboard.
