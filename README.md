<div align="center">
  <img src="/public/docs/Mockup.png" alt="Mockup" />
  <h1>Bangka Hire</h1>
  <p>Jelajahi peluang kerja khusus di daerah Bangka Belitung. Mulai langkah pertamamu menuju masa depan!</p>
</div>

## Folder structure

```
.
├── prisma
│   ├── migrations
├── public
│   ├── assets
│   ├── docs
│   └── images
├── src
│   ├── app
│   │   ├── api
│   │   ├── (auth)
│   │   ├── (dashboard)
│   │   ├── (job-applicant)
│   │   ├── (job-vacancy-provider)
│   │   └── profile
│   ├── components
│   │   ├── auth
│   │   ├── common
│   │   ├── dashboard
│   │   ├── job-applicant
│   │   ├── jobs
│   │   ├── job-vacancy-provider
│   │   ├── react-query
│   │   └── ui
│   ├── hooks
│   ├── lib
│   ├── services
│   ├── store
│   └── types
```

## Entity Relationship Diagram

![ERD](./public/docs/ERD.png)

## User Flow

![User Flow](./public/docs/User-Flow.png)

## Job Application Process DFD Level 1

![DFD Level 1](./public/docs/Job-Application-Process-level-1.png)

## Technologies

### Frontend

- Next JS 15 app directory
- Tailwind CSS with shadcn/ui
- Framer Motion
- Jotai

### Backend

- Supabase
- Prisma

### Miscellaneous

- Biome for code formatting.
- Sentry for error monitoring.
- Vercel for Deployment Website.
- Cloudflare Domain.
- Uploadthing for handling upload document.

## Getting Started

**1️⃣ Clone the Repository**

```
git clone https://github.com/haikelz/bangka-hire.git
cd bangka-hire
```

**2️⃣ Install Dependencies**

Make sure you have Node.js and Docker installed.
Then install dependencies with:

```
npm install
```

**3️⃣ Setup Environment Variables**

Create a .env file in the root directory:

```
DATABASE_URL="postgresql://user:password@localhost:5432/bangka-hire"
PORT=3000
```

**🐳 Running with Docker**

**🔹 1. Build the Docker Image**

```
docker build -t bangka-hire-app .
```

**🔹 2. Run the Application**

```
docker run -p 3000:3000 bangka-hire-app
```

**📦 Running Database Migrations**

If using Prisma, apply migrations inside the container:

```
docker exec -it <container_id> npx prisma migrate dev
```

**🧪 Running Tests**

Run the test suite inside the container:

```
docker exec -
```
