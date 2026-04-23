# Manju Ladies Tailors

React/Vite frontend and Express/MongoDB backend for a ladies tailoring and embroidery design catalog.

## Local Setup

Install frontend dependencies:

```bash
npm install
```

Install backend dependencies:

```bash
cd backend
npm install
```

Create local env files:

```bash
copy .env.example .env
copy backend\.env.example backend\.env
```

Frontend `.env`:

```env
VITE_API_URL=http://localhost:5000
```

Backend `backend/.env`:

```env
MONGODB_URI=your-mongodb-atlas-uri
PORT=5000
ADMIN_PASSWORD=your-strong-admin-password
CLIENT_ORIGIN=http://localhost:5173
```

Run backend:

```bash
cd backend
npm start
```

Run frontend:

```bash
npm run dev
```

## Deployment

### Backend on Render

Create a Render Web Service from this GitHub repo.

- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`

Set Render environment variables:

```env
MONGODB_URI=your-mongodb-atlas-uri
ADMIN_PASSWORD=your-strong-admin-password
CLIENT_ORIGIN=https://your-vercel-domain.vercel.app
```

After deploy, copy the Render backend URL.

### Frontend on Vercel

Create a Vercel project from this GitHub repo.

- Framework Preset: `Vite`
- Root Directory: project root
- Build Command: `npm run build`
- Output Directory: `dist`

Set Vercel environment variable:

```env
VITE_API_URL=https://your-render-backend-url.onrender.com
```

Deploy the frontend, then update Render `CLIENT_ORIGIN` with the final Vercel domain.

## Security Notes

- Never commit `.env` files.
- Rotate the MongoDB password before public deployment.
- Use a strong `ADMIN_PASSWORD`.
- Uploaded files are currently stored on the backend filesystem. For production, move uploads to Cloudinary or S3.
