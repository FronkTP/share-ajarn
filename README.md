# Share Ajarn

Professor review application. It includes a Flask + MySQL backend API and a React Native UI (screens/components) for browsing professors, submitting reviews, and admin moderation.

## Features

- **End-to-end review workflow:** submit reviews to a moderation queue (`pending_reviews`) and publish them to `reviews` after approval
- **Admin moderation endpoints:** list pending reviews, approve (publish), or reject (delete)
- **Professor browsing UI:** list + detail screens backed by shared static professor data
- **User persistence:** insert/update user records by email (supports an `is_admin` flag)
- **Published review retrieval:** fetch published reviews for a professor by ID
- **Configurable backend connectivity:** a single base URL constant used by the frontend to target emulator vs localhost environments
- **Email/password demo login (non-production):** validates against a database table (`users_a`) for classroom/demo flows

## Tech stack

- **Backend:** Python, Flask, Flask-CORS, Flask-MySQLdb (MySQL), python-dotenv
- **Database:** MySQL
- **Frontend:** React Native (JSX screens/components)

## Repository structure

- `backend/` — Flask server + Python dependencies
- `frontend/` — React Native screens/components and static data
  - `frontend/data/BASE_URL.jsx` — backend URL selection (Android emulator vs localhost)
  - `frontend/screens/` — UI screens (login, list/detail, admin dashboard, add review)

## API routes

| Method | Route                         | Purpose                                    |
| ------ | ----------------------------- | ------------------------------------------ |
| POST   | `/login`                      | Insert/update user by email + admin flag   |
| POST   | `/api/get_user_info`          | Fetch user info by email                   |
| POST   | `/add_review`                 | Submit a review into `pending_reviews`     |
| GET    | `/get_reviews/<professor_id>` | Get published reviews for a professor      |
| GET    | `/pending_reviews`            | List pending reviews (admin)               |
| POST   | `/approve_review/<review_id>` | Publish a pending review                   |
| DELETE | `/reject_review/<review_id>`  | Remove a pending review                    |
| POST   | `/email_login`                | Demo email/password login (uses `users_a`) |

## Local setup

### Prerequisites

- Python 3.x
- MySQL server running locally

### Database

The backend expects a database named `shareajarn` and tables referenced by the API: `users`, `users_a`, `reviews`, `pending_reviews`.

Minimal starter schema (adjust as needed):

```sql
CREATE DATABASE shareajarn;
USE shareajarn;

CREATE TABLE users (
	id INT AUTO_INCREMENT PRIMARY KEY,
	email VARCHAR(255) UNIQUE,
	name VARCHAR(255),
	is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE users_a (
	id INT AUTO_INCREMENT PRIMARY KEY,
	email VARCHAR(255) UNIQUE,
	name VARCHAR(255),
	password VARCHAR(255),
	is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE reviews (
	id INT AUTO_INCREMENT PRIMARY KEY,
	professorId INT,
	course VARCHAR(255),
	stars INT,
	comment TEXT
);

CREATE TABLE pending_reviews (
	id INT AUTO_INCREMENT PRIMARY KEY,
	professorID INT,
	course VARCHAR(255),
	stars INT,
	comment TEXT
);
```

### Backend (Windows PowerShell)

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r backend/requirements.txt

# Create backend/.env with:
# DB_PASSWORD=your_mysql_password

python backend/server.py
```

By default, the API runs on `http://127.0.0.1:5000`.

### Frontend

This repo contains the UI screens/components under `frontend/`, but it does **not** include a top-level React Native/Expo `package.json` in the current workspace structure.

To hook the UI up to a running backend:

- Ensure `frontend/data/BASE_URL.jsx` points at your backend.
  - Android emulator: `http://10.0.2.2:5000`
  - iOS simulator / web: `http://127.0.0.1:5000`
  - Physical device: use your machine’s LAN IP (example: `http://192.168.1.100:5000`)

## Notes / limitations (current state)

- `email_login` compares passwords in plaintext (demo-only; not production-safe).
- MySQL host/user/database are currently hard-coded in `backend/server.py` (local development defaults).
- No migrations/seed scripts are included; schema must be created manually.
