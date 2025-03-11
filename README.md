<div align="center">
  <img src="/public/docs/Mockup.png" alt="Mockup" />
  <h1>Bangka Hire</h1>
  <p>Explore exclusive job opportunities in the Bangka Belitung region. Take your first step toward the future!</p>
</div>

## About

Bangka Hire is a comprehensive job search and recruitment solution for Bangka Belitung region, designed to connect job seekers with opportunities that match their skills and preferences. Whether you're looking for a job in a specific industry, searching by salary range, or targeting a particular company, our advanced filtering system makes the process seamless.

## Minimum Viable Product (MVP)

- Searching for all available job vacancies.
- Searching for more specific job vacancies based on several categories, such as job position, salary range, company name, and job location.
- Company reviews with a rating and comment system.
- Apply for jobs by entering your name, email, WhatsApp number, and the latest CV.
- Job vacancy management and applicant CV review for job providers.
- Sign-up and login options using Google for user convenience.

## Noobz Team Personel

- Haikel Ilham Hakim
- Evan Stefanus Candra
- Taufik Hidayat
- Julisa Nomirga

## Folder structure

```
.
├── prisma # Prisma
│   ├── migrations
│   └── schema.prisma
├── public # Images and assets
│   ├── assets
│   ├── docs
│   └── images
├── README.md
├── src
│   ├── app # Main Pages
│   │   ├── api  #API Logic
│   │   │   ├── admin
│   │   │   ├── auth
│   │   │   ├── get-user
│   │   │   ├── job-applicant
│   │   │   ├── jobs
│   │   │   ├── job-vacancy-provider
│   │   │   └── uploadthing
│   │   ├── (auth)
│   │   │   └── auth
│   │   ├── (dashboard)
│   │   │   └── dashboard
│   │   ├── (job-applicant)
│   │   │   └── jobs
│   │   ├── (job-vacancy-provider)
│   │   │   └── job-vacancy-providers
│   │   └── profile
│   ├── components # Shared, customizable, and reusable components
│   │   ├── auth
│   │   ├── common
│   │   ├── dashboard
│   │   │   └── admin
│   │   ├── job-applicant
│   │   ├── jobs
│   │   ├── job-vacancy-provider
│   │   ├── react-query
│   │   └── ui
│   ├── hooks # Custom hooks
│   ├── lib # Utilities
│   │   └── schemas
│   ├── services # HTTP Request logic
│   ├── store # Jotai store
│   └── types # Typescript types
└── tsconfig.json
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
