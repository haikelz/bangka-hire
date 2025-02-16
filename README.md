<div align="center">
  <h1>Bangka Hire</h1>
</div>

## Folder structure

```
.
├── Dockerfile
├── prisma
│   ├── migrations
├── public
├── src
│   ├── app
│   │   ├── favicon.ico
│   │   ├── jobs
│   │   │   ├── [job]
│   ├── components
│   ├── lib
│   ├── store
│   ├── types
```

## Technologies

### Frontend

- Next JS 15 app directory.
- Tailwind CSS.
- Framer Motion.
- Jotai.

### Backend

- Prisma

## Getting Started

**1️⃣ Clone the Repository**

```
git clone https://github.com/haikelz/bangka-hire.git
cd job-listing-website
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
