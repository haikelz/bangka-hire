import type {
  Comment,
  Job,
  ProfilCompany,
  User,
  UsersOnJobs,
} from "@prisma/client";
import bcrypt from "bcryptjs";
import db from "./db";

// Define interfaces for our data structures
interface CompanyData {
  name: string;
  type: string;
  description: string;
  city: string;
  street: string;
}

interface JobTypeData {
  position: string;
  responsibility: string;
  qualification: string;
}

async function main(): Promise<void> {
  try {
    // Clear existing data (optional - remove if you don't want to clear data)
    await db.comment.deleteMany({});
    await db.usersOnJobs.deleteMany({});
    await db.job.deleteMany({});
    await db.profilCompany.deleteMany({});
    await db.user.deleteMany({});

    console.log("Database cleaned");

    // Create users
    const hashedPassword: string = await bcrypt.hash("password123", 10);

    // Create job seekers from Bangka Belitung
    const bangkaBelitungCities: string[] = [
      "Pangkalpinang",
      "Sungailiat",
      "Tanjung Pandan",
      "Manggar",
      "Toboali",
      "Koba",
      "Mentok",
      "Belinyu",
    ];

    const jobSeekers: User[] = await Promise.all(
      Array(5)
        .fill(null)
        .map(async (_, index: number): Promise<User> => {
          return db.user.create({
            data: {
              email: `jobseeker${index + 1}@example.com`,
              full_name: `Job Seeker ${index + 1}`,
              phone_number: `+628123456${index + 10}`,
              description: `Job seeker from ${
                bangkaBelitungCities[index % bangkaBelitungCities.length]
              }, Bangka Belitung with experience in local industries.`,
              password: hashedPassword,
              role: "job_seeker",
              cv:
                index % 2 === 0
                  ? `https://storage.example.com/cv_jobseeker_${index + 1}.pdf`
                  : null,
              image: `https://randomuser.me/api/portraits/${
                index % 2 === 0 ? "men" : "women"
              }/${index + 1}.jpg`,
            },
          });
        })
    );

    console.log(
      `Created ${jobSeekers.length} job seekers from Bangka Belitung`
    );

    // Create company accounts and profiles for Bangka Belitung
    const companies: CompanyData[] = [
      {
        name: "Bangka Mining Solutions",
        type: "Mining",
        description:
          "Leading tin mining and processing company in Bangka Belitung with sustainable practices.",
        city: "Sungailiat",
        street: "Jl. Pertambangan 123",
      },
      {
        name: "Belitung Tourism Group",
        type: "Tourism",
        description:
          "Premier tourism company promoting the beautiful beaches and cultural heritage of Belitung.",
        city: "Tanjung Pandan",
        street: "Jl. Pantai Tanjung Tinggi 45",
      },
      {
        name: "Pangkal Pinang Fisheries",
        type: "Fishery",
        description:
          "Sustainable seafood company processing and distributing local catches from Bangka Belitung waters.",
        city: "Pangkalpinang",
        street: "Jl. Laut 78",
      },
      {
        name: "Babel Tech Innovations",
        type: "Technology",
        description:
          "Technology hub bringing digital innovation to Bangka Belitung industries and services.",
        city: "Pangkalpinang",
        street: "Jl. Digital 90",
      },
    ];

    interface CompanyUserWithProfile extends User {
      profile: ProfilCompany;
    }

    const companyUsers: CompanyUserWithProfile[] = await Promise.all(
      companies.map(
        async (
          company: CompanyData,
          index: number
        ): Promise<CompanyUserWithProfile> => {
          // Create company user account
          const companyUser = (await db.user.create({
            data: {
              email: `${company.name
                .toLowerCase()
                .replace(/\s+/g, "")}@example.com`,
              full_name: company.name,
              phone_number: `+628987654${index + 10}`,
              description: `Official account for ${company.name}, based in ${company.city}, Bangka Belitung.`,
              password: hashedPassword,
              role: "company",
              image: `https://picsum.photos/id/${index + 20}/200`,

              // Create company profile
              profile: {
                create: {
                  description_company: company.description,
                  company_type: company.type,
                  street: company.street,
                  city: company.city,
                  total_employers: `${(index + 1) * 25}`,
                  gmail: `${company.name
                    .toLowerCase()
                    .replace(/\s+/g, "")}@gmail.com`,
                  facebook: `https://facebook.com/${company.name
                    .toLowerCase()
                    .replace(/\s+/g, "")}`,
                  instagram: `https://instagram.com/${company.name
                    .toLowerCase()
                    .replace(/\s+/g, "")}`,
                  linkedin: `https://linkedin.com/company/${company.name
                    .toLowerCase()
                    .replace(/\s+/g, "")}`,
                },
              },
            },
            include: {
              profile: true,
            },
          })) as CompanyUserWithProfile;

          return companyUser;
        }
      )
    );

    console.log(
      `Created ${companyUsers.length} company accounts with profiles in Bangka Belitung`
    );

    // Create jobs for each company that are specific to Bangka Belitung industries
    const jobTypes: JobTypeData[] = [
      {
        position: "Tin Mining Engineer",
        responsibility:
          "Oversee mining operations, ensure safety protocols, and implement sustainable mining practices in accordance with local regulations.",
        qualification:
          "Bachelor's degree in Mining Engineering, 3+ years of experience in tin mining, knowledge of Bangka Belitung geological conditions.",
      },
      {
        position: "Tourism Coordinator",
        responsibility:
          "Develop tourism packages, coordinate with local guides, and promote Bangka Belitung destinations to national and international markets.",
        qualification:
          "Minimum 2 years experience in tourism industry, excellent knowledge of Bangka Belitung attractions, fluent in Indonesian and English.",
      },
      {
        position: "Fishery Processing Supervisor",
        responsibility:
          "Manage seafood processing operations, ensure quality control, and coordinate with local fishermen for sustainable catch practices.",
        qualification:
          "Experience in seafood processing, understanding of food safety regulations, familiarity with Bangka Belitung marine products.",
      },
      {
        position: "Administrative Staff",
        responsibility:
          "Handle office administration, document management, and customer service for local and visiting clients.",
        qualification:
          "Minimum high school diploma, basic computer skills, strong organizational abilities, resident of Bangka Belitung preferred.",
      },
      {
        position: "Digital Marketing Specialist",
        responsibility:
          "Manage social media presence, create content highlighting local products and services, and implement digital marketing campaigns.",
        qualification:
          "Experience in digital marketing, knowledge of social media platforms, understanding of local Bangka Belitung market and culture.",
      },
      {
        position: "Hospitality Manager",
        responsibility:
          "Oversee resort operations, ensure guest satisfaction, and coordinate with local tour operators for Bangka Belitung experiences.",
        qualification:
          "3+ years in hospitality management, excellent customer service skills, knowledge of Bangka Belitung tourism sector.",
      },
    ];

    const jobs: Job[] = [];

    for (const company of companyUsers) {
      // Each company will have 2-3 job listings
      const numJobs: number = Math.floor(Math.random() * 2) + 2;

      for (let i = 0; i < numJobs; i++) {
        // Select job types that make sense for the company based on its type
        let filteredJobTypes: JobTypeData[] = [...jobTypes];

        if (company.profile.company_type === "Mining") {
          filteredJobTypes = jobTypes.filter(
            (job) =>
              job.position.includes("Mining") ||
              job.position.includes("Administrative") ||
              job.position.includes("Digital")
          );
        } else if (company.profile.company_type === "Tourism") {
          filteredJobTypes = jobTypes.filter(
            (job) =>
              job.position.includes("Tourism") ||
              job.position.includes("Hospitality") ||
              job.position.includes("Marketing") ||
              job.position.includes("Administrative")
          );
        } else if (company.profile.company_type === "Fishery") {
          filteredJobTypes = jobTypes.filter(
            (job) =>
              job.position.includes("Fishery") ||
              job.position.includes("Administrative") ||
              job.position.includes("Digital")
          );
        }

        const jobType: JobTypeData =
          filteredJobTypes[Math.floor(Math.random() * filteredJobTypes.length)];
        const minSalary: number = Math.floor(Math.random() * 3000000) + 3000000; // Between 3-6 million (more realistic for the region)
        const maxSalary: number =
          minSalary + Math.floor(Math.random() * 2000000) + 1000000; // 1-3 million more than min

        const job: Job = await db.job.create({
          data: {
            company_id: company.profile.id,
            position_job: jobType.position,
            responsibilty:
              jobType.responsibility +
              ` Position based in ${company.profile.city}, Bangka Belitung.`,
            qualification: jobType.qualification,
            salary_min: minSalary,
            salary_max: maxSalary,
            salary_range: `IDR ${(minSalary / 1000000).toFixed(1)}M - ${(
              maxSalary / 1000000
            ).toFixed(1)}M`,
            status_work: ["Full-time", "Part-time", "Contract"][
              Math.floor(Math.random() * 3)
            ],
          },
        });

        jobs.push(job);
      }
    }

    console.log(`Created ${jobs.length} job listings in Bangka Belitung`);

    // Create job applications (UsersOnJobs)
    const applications: UsersOnJobs[] = [];

    // Each job seeker applies to 1-3 random jobs
    for (const jobSeeker of jobSeekers) {
      const numApplications: number = Math.floor(Math.random() * 3) + 1;
      const appliedJobIds: Set<string> = new Set();

      for (let i = 0; i < numApplications; i++) {
        // Select a random job that the user hasn't applied to yet
        let randomJob: Job;
        do {
          randomJob = jobs[Math.floor(Math.random() * jobs.length)];
        } while (appliedJobIds.has(randomJob.id));

        appliedJobIds.add(randomJob.id);

        const application: UsersOnJobs = await db.usersOnJobs.create({
          data: {
            user_id: jobSeeker.id,
            jobs_id: randomJob.id,
            cv:
              jobSeeker.cv ||
              `https://storage.example.com/application_${jobSeeker.id}_${randomJob.id}.pdf`,
          },
        });

        applications.push(application);
      }
    }

    console.log(
      `Created ${applications.length} job applications from Bangka Belitung residents`
    );

    // Create comments/reviews for companies
    const comments: Comment[] = [];

    const bangkaBelitungReviews: string[] = [
      "Great local company that understands the unique challenges of Bangka Belitung. They offer good opportunities for residents and contribute positively to our community.",
      "I had a positive experience working with this company. They value local knowledge and provide fair compensation for the region.",
      "One of the better employers in Bangka Belitung. Management understands island life and accommodates local cultural events and traditions.",
      "Innovative company bringing much-needed development to our province. They invest in training local talent rather than just bringing in workers from outside.",
      "Good workplace environment with opportunities for advancement. They understand the local market and needs of Bangka Belitung residents.",
    ];

    for (const company of companyUsers) {
      // 2-3 random job seekers leave reviews for each company
      const numReviews: number = Math.floor(Math.random() * 2) + 2;
      const reviewerIds: Set<string> = new Set();

      for (let i = 0; i < numReviews; i++) {
        // Select a random job seeker that hasn't reviewed this company yet
        let randomJobSeeker: User;
        do {
          randomJobSeeker =
            jobSeekers[Math.floor(Math.random() * jobSeekers.length)];
        } while (reviewerIds.has(randomJobSeeker.id));

        reviewerIds.add(randomJobSeeker.id);

        const comment: Comment = await db.comment.create({
          data: {
            user_id: randomJobSeeker.id,
            company_id: company.profile.id,
            body: bangkaBelitungReviews[
              Math.floor(Math.random() * bangkaBelitungReviews.length)
            ],
            rating: Math.floor(Math.random() * 3) + 3, // Ratings between 3-5
          },
        });

        comments.push(comment);
      }
    }

    console.log(
      `Created ${comments.length} company reviews from Bangka Belitung residents`
    );

    console.log("Database seeded successfully with Bangka Belitung data!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  } finally {
    await db.$disconnect();
  }
}

main().catch((e: Error) => {
  console.error(e);
  process.exit(1);
});
