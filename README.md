# Taha.dev — Full-Stack Portfolio

Monolithic repository for Muhammad Taha's personal portfolio with a secure admin dashboard.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React (Vite), Tailwind CSS |
| Backend | Node.js, Express |
| Database | Supabase (PostgreSQL) + Prisma ORM |
| Auth | Supabase Authentication |
| Email | Resend API |
| Security | Google reCAPTCHA v3 |

## Project Structure

```
taha-portfolio/
├── client/                 # Vite React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Route pages
│   │   ├── lib/            # Supabase, API helpers
│   │   └── hooks/          # Custom React hooks
│   ├── .env.example
│   └── package.json
├── server/                 # Express backend
│   ├── prisma/
│   │   └── schema.prisma   # Database models
│   ├── scripts/
│   │   └── seed-admin.ts   # Admin user seeder
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth, rate limiting
│   │   └── lib/            # Prisma, Supabase, Resend
│   ├── .env.example
│   └── package.json
└── package.json            # Root workspace scripts
```

## Database Models (Prisma)

| Model | Purpose |
|-------|---------|
| `User` | Admin profiles synced from Supabase Auth |
| `Contact` | Contact form submissions |
| `LoginAttempt` | IP-based rate limiting for admin login |

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Fill in your Supabase, Resend, and reCAPTCHA credentials.

### 3. Push database schema

```bash
npm run db:push
```

### 4. Seed admin user

```bash
npm run seed:admin
```

### 5. Run development servers

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start client + server concurrently |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to Supabase |
| `npm run seed:admin` | Create admin user in Supabase + DB |
