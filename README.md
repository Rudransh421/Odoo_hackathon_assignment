
**EventsBridge — Fullstack Trip & Community App**

A small fullstack application with a Node/Express + MongoDB backend and a React + Vite frontend. This repository contains separate `backend` and `frontend` folders with focused responsibilities:

- `backend`: Express API, authentication, file uploads, email helpers, and database connection logic.
- `frontend`: React app built with Vite, Redux Toolkit for state, and TailwindCSS for styling.

**Quick Start**

Prerequisites:
- Node 18+ / npm or pnpm
- A MongoDB connection (Atlas or local)

1. Install dependencies for backend and frontend:

```bash
cd backend
npm install

cd ../frontend
npm install
```

2. Create environment files. See "Environment variables" below.

3. Run locally:

```bash
# Start backend in dev mode (nodemon)
cd backend
npm run dev

# Start frontend (Vite)
cd ../frontend
npm run dev
```

Open the frontend at the Vite URL shown in the terminal (default: http://localhost:5173). The backend listens on `PORT` (default `8000`) and exposes the API at `/api`.

**Architecture & Key Files**

- Backend (Node / Express / MongoDB):
	- `backend/index.js` — entry; loads env, connects DB, starts server
	- `backend/app.js` — Express app, middleware, API routing, and production static serving
	- `backend/db/db.js` — MongoDB connection helper
	- `backend/routes/user.routes.js` and `backend/controller/user.controller.js` — user-related endpoints and handlers
	- `backend/middleware` — auth, error handling, file upload helpers
	- `backend/utilities` — `cloudinary.js`, `sendEmail.js`, `ApiError.js`, `ApiResponse.js`

- Frontend (React / Vite):
	- `frontend/src/main.jsx` — app bootstrap
	- `frontend/src/App.jsx` — top-level routes
	- `frontend/src/Components` — UI pages and components (Login, Registration, Profile, Trips, Itinerary, etc.)
	- `frontend/src/redux` — Redux store and user slice

**Environment variables**

Create `.env.development` (and `.env.production` for production) in `backend/`. The backend uses `backend/loadEnv.js` to auto-load `.env.<NODE_ENV>` files.

Minimum variables used by the backend:

- `NODE_ENV` — `development` or `production`
- `PORT` — HTTP port (default `8000`)
- `MONGODB_URL` — MongoDB connection string
- `FRONTEND_URL` — allowed origin for CORS (default `http://localhost:5173`)
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — Cloudinary credentials for uploads
- `EMAIL_USER`, `EMAIL_PASS` — SMTP credentials used by `sendEmail.js` (currently Gmail via nodemailer)

Notes:
- If `MONGODB_URL` is missing the backend will exit with an error.
- `loadEnv.js` will load `.env.<NODE_ENV>` (e.g., `.env.development`).

**Scripts**

- Backend (`backend/package.json`):
	- `npm run dev` — start server with `nodemon` (development)
	- `npm start` — start server with `node` (production)

- Frontend (`frontend/package.json`):
	- `npm run dev` — run Vite dev server
	- `npm run build` — build production assets into `frontend/dist`
	- `npm run preview` — preview built frontend

**Production Notes**

- In production, the backend serves the static frontend from `frontend/dist` (see `app.js`). Build the frontend (`npm run build`) and copy or mount `frontend/dist` next to the backend when deploying.
- Ensure environment variables for production are set (`NODE_ENV=production`, `MONGODB_URL`, Cloudinary and email credentials, and `FRONTEND_URL` if using a specific domain).

**Common Tasks**

- Run backend tests: (no tests provided)
- Lint frontend: `cd frontend && npm run lint`
- Migrate or run scripts: see backend `package.json` (`migrate:negotiations` example script)

**Security & Best Practices**

- Keep `.env` files out of version control. Add `.env.*` to `.gitignore` if not already ignored.
- Use strong credentials for email and cloud providers, and enable least-privilege credentials where possible.

**Extending / Contribution**

- Add unit/integration tests for API endpoints and frontend components.
- Add Dockerfiles and a `docker-compose` setup to simplify local development and CI.
- Consider adding GitHub Actions for CI: install, lint, build, and test both frontend and backend.

**Contact / Author**

Author: RD

---

If you'd like, I can:
- add example `.env.development` templates
- add a `Dockerfile` + `docker-compose.yml`
- add CI workflow templates (GitHub Actions)

Tell me which you'd like next.
