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
ADMIN_JWT_SECRET=your-long-random-secret
CLIENT_ORIGIN=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
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
ADMIN_JWT_SECRET=your-long-random-secret
CLIENT_ORIGIN=https://your-vercel-domain.vercel.app
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
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
- Cloudinary is recommended for image storage before public launch. The app now supports Cloudinary directly through backend environment variables.
- Use the backend health route after deploy: `/api/health`

## Backups

Install MongoDB Database Tools:

https://www.mongodb.com/try/download/database-tools

Run a dated backup from PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\backup-mongodb.ps1 -MongoUri "your-mongodb-uri"
```

Or set `MONGODB_URI` in your shell first and run:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\backup-mongodb.ps1
```

The script creates backups in:

```text
D:\Backups\manju-tailors
```
