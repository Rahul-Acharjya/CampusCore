# CampusCore — Presentation Build

This version preserves the original CampusCore visual design and limits the presentation flow to:

1. Landing page
2. Student / Teacher / Administrator login
3. Student / Teacher signup
4. Authentication success screen

The dashboard, attendance, notices, assignments and other post-login application pages are intentionally excluded from the presentation flow.

## Run frontend

```powershell
cd .\frontend
npm install
npm run dev
```

Open the Vite URL, normally `http://localhost:5173`.

## Run backend

The original Express/MongoDB backend is retained.

```powershell
cd .\backend
npm install
npm run seed
npm run dev
```

Configure `backend/.env` first using `.env.example`.

## Demo flow

Landing → Enter Portal → Login / Create account → Authentication success.

The frontend keeps the original CampusCore styling, logo, animations, typography, landing-page scenes, login page and registration page.
