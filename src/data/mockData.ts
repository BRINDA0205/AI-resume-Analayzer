import { ResumeReport, UserProfile } from '../types';

export const BRAND_LOGO_URL = 'https://lh3.googleusercontent.com/aida/AEtjO1Wy9umo2jt_jpqAnSqK-KEWwlK3hfruGxUl0FwlJ9x-q8MhsCxdSObJX5yLavChG0DFTJZwKy4CuxGt9CSyjMurNR9wuGlKEhzWrg1SrGzImOKW0JWWcA5NCZWJjNLy-J4DmL-kQD0-YBKd1VblGPqbCQM4-8c8EqJ3zhoJQkBdR2uFx8EGQbgno2DW-PmtYE0sYn0GUw8YLKOzAQsNAE5_2PgifTv6NxWwD0Qc-GsJQMb-1q0893vVuNI';
export const BRAND_LOGO_AUTH_URL = 'https://lh3.googleusercontent.com/aida/AEtjO1VMacDWRTEAaQOY8o8piE344GZ6BaFHhaOccK24jtWbBIXrQjh5KfuGekUsVwPeO3gusvQiOoNFMDaulBMnPi-wDb2bBjw84QhEWwUE8gLsOXwyziHkNPZzkhgkJiMIe4_pJQxkiNM99m4rczo6xnAGrj5UNFGk6lN2H59u9DgVW_CkhRut67y-AZZBD9LUK5fqKeTrFPsrKL5Sp2DD3ekAg2kjRsoI220ggfaB-RTZUoPUVPYrFMaphsk';
export const USER_AVATAR_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjXDBhHaDA6JvrbbkND7FDhi5vkgG377_6kZAx1uk4KYm32FdvIfll69xxUx4zgwymh55fUUi46sFMg3ZgPfbcagaZaCR1l4ESZZ-rCHbxfLpPs7eJhcRpwRziSQz012scBysRVketZcHn1cChW1LNt37FEeI046UJt25zcywDgW8BCwkkN4lSaGds-RrSbHKikIQ_B68M0Y0LXyeOW9Cm79vcknEbTKwOMxaLw5HlSqhn8MxWHhdi';
export const ALEX_RIVERA_AVATAR = 'https://lh3.googleusercontent.com/aida/AEtjO1WLvJ-P_r6fqnnpdCEfnKSd1VkhsndH1UriBFJmykdG4FOZEOeYv1YClszSAiI5CtkxCqEr0IhQ_ZTQ3BHzzVSdzeEgQPcZKrqiB3NpBL1HxGQVpD5j3dyh2RtgjwXO6-THtMYjbyZU00slkvE-VbiglzJ_mHY8NIek8hsUtPqhAbBQ8R233eoXdEe-j8zGwMN_VY0Wff4OJotg6CErelGVkBzkepno1Lod2fjXYVWbYTojC_Z-py0cWK8';

// Primary Default User Profile: Brinda Ukani (Computer Science Engineering Student, Final Year)
export const DEFAULT_USER_PROFILE: UserProfile = {
  id: 'usr-brinda-2301201089',
  name: 'Brinda Ukani',
  email: 'stud.2301201089@kpgu.ac.in',
  headline: 'Computer Science Engineering Student • Final Year',
  college: 'KPGU (Krishna School of Emerging Technology & Applied Research)',
  branch: 'Computer Science & Engineering',
  yearOfStudy: 'Final Year Student (B.Tech / B.E.)',
  studentId: '2301201089',
  graduationYear: '2025',
  plan: 'Campus Placement Pro',
  cgpa: '8.9 / 10.0',
  targetRole: 'Software Development Engineer (Campus & New Grad / Full-Stack)',
  avatarUrl: USER_AVATAR_URL,
};

export const defaultResumeReport: ResumeReport = {
  id: 'rep-brinda-2025',
  fileName: 'Brinda_Ukani_ComputerScience_FinalYear_2025.pdf',
  fileSize: '1.9 MB',
  uploadedAt: 'Just now',
  targetRole: 'Software Development Engineer (Campus & New Grad 2025)',
  status: 'Optimized',
  overallScore: 92,
  atsParsingScore: 96,
  skillsMatchScore: 90,
  quantImpactScore: 89,
  formattingScore: 95,
  atsSafePercentage: 99,
  totalSkillsCount: 36,
  missingSkillsCount: 3,
  quantifiedBulletsCount: 5,
  summaryTitle: 'Campus Placement & SDE-1 Readiness Audit',
  summaryCalibratedFor: 'Calibrated for Tier-1 Tech, Product Companies & Campus Placement Drives',
  summaryParagraph1:
    'Candidate demonstrates high engineering velocity with solid competencies across Data Structures & Algorithms, React, Node.js, Python, and relational database systems (PostgreSQL/SQL). Outstanding academic and technical core as a Final Year Computer Science Engineering student.',
  summaryParagraph2:
    'Strong software engineering potential proven by her Final Year Capstone Project (AI-Powered Campus Management Portal) and Software Engineering Internship with quantifiable performance impact (42% query latency reduction, 2,500+ active student users). While full-stack fundamentals and system fundamentals are clear, incorporating containerization (Docker) and message caching (Redis) will maximize automatic shortlist success in competitive Tier-1 campus placement algorithms.',
  strongestAsset: 'Data Structures & Algorithms, Full-Stack Web Architecture, & Capstone Project Impact',
  primaryLeverage: 'Spotlight distributed indexing and STAR impact metrics in project bullets',
  missingSignal: 'Docker deployment containerization & Redis caching in project architecture',
  skills: [
    // Frontend
    { name: 'React.js', level: 'Expert', category: 'frontend', isVerified: true },
    { name: 'TypeScript', level: 'Advanced', category: 'frontend', isVerified: true },
    { name: 'Next.js', level: 'Advanced', category: 'frontend', isVerified: true },
    { name: 'Tailwind CSS', level: 'Expert', category: 'frontend', isVerified: true },
    { name: 'HTML5 & CSS3', level: 'Expert', category: 'frontend', isVerified: true },
    { name: 'Redux Toolkit', level: 'Intermediate', category: 'frontend', isVerified: true },
    // Backend
    { name: 'Node.js', level: 'Expert', category: 'backend', isVerified: true },
    { name: 'Express.js', level: 'Advanced', category: 'backend', isVerified: true },
    { name: 'Python', level: 'Advanced', category: 'backend', isVerified: true },
    { name: 'Java (Core & OOP)', level: 'Advanced', category: 'backend', isVerified: true },
    { name: 'PostgreSQL', level: 'Advanced', category: 'backend', isVerified: true },
    { name: 'MongoDB', level: 'Intermediate', category: 'backend', isVerified: true },
    { name: 'RESTful APIs', level: 'Expert', category: 'backend', isVerified: true },
    // Systems & Core CS
    { name: 'Data Structures & Algorithms (DSA)', category: 'systems', isVerified: true },
    { name: 'Object-Oriented Programming (OOP)', category: 'systems', isVerified: true },
    { name: 'Database Management Systems (DBMS)', category: 'systems', isVerified: true },
    { name: 'Operating Systems & Concurrency', category: 'systems', isVerified: true },
    { name: 'Computer Networks', category: 'systems', isVerified: true },
    { name: 'Git & GitHub Version Control', category: 'systems', isVerified: true },
  ],
  missingSkills: [
    {
      name: 'Docker & Containers',
      priority: 'Critical',
      reason: 'Required in 78% of SDE-1 campus placement job descriptions',
    },
    {
      name: 'Redis Caching',
      priority: 'High',
      reason: 'Enhances system design score for junior backend & full-stack roles',
    },
    {
      name: 'CI/CD Pipelines (GitHub Actions)',
      priority: 'Medium',
      reason: 'Demonstrates modern automated deployment and test automation',
    },
  ],
  weakBullets: [
    {
      id: 'wb-1',
      role: 'Software Engineering Intern',
      company: 'TechSphere Solutions',
      period: 'June 2024 - Aug 2024',
      roleImpactScore: 91,
      weakText: 'Worked on campus portal features and improved database search speed.',
      weakImpact: 54,
      optimizedText:
        'Architected RESTful indexing pipeline in PostgreSQL & Node.js for student examination portal, reducing query latency by 42% and sustaining 10,000+ daily student requests.',
      optimizedImpact: 96,
      keyHighlights: ['PostgreSQL', 'Node.js', '42% Query Latency Drop', '10K Daily Active Users'],
    },
    {
      id: 'wb-2',
      role: 'Final Year Capstone Project Lead',
      company: 'KPGU Computer Science Dept.',
      period: '2024 - 2025',
      roleImpactScore: 93,
      weakText: 'Created a web portal for college students to view marks and attendance using React and MongoDB.',
      weakImpact: 50,
      optimizedText:
        'Engineered automated academic evaluation portal using React, TypeScript, and MongoDB with role-based access control, decreasing grading turnaround time by 65% across 2,400+ students.',
      optimizedImpact: 95,
      keyHighlights: ['React', 'TypeScript', 'MongoDB', '65% Faster Processing', '2,400 Students'],
    },
  ],
  atsChecklist: [
    {
      title: 'Standard Academic & Technical Headers',
      description: 'Education, Technical Skills, Projects & Internships clearly mapped',
      status: 'pass',
    },
    {
      title: 'Clean Single-Column Layout',
      description: 'Zero multi-column table collisions detected across ATS engines',
      status: 'pass',
    },
    {
      title: 'Machine-Readable Student Contact Info',
      description: 'Institutional Email (stud.2301201089@kpgu.ac.in), GitHub & LinkedIn extracted accurately',
      status: 'pass',
    },
    {
      title: 'File Weight: 1.9 MB',
      description: 'Ideal lightweight format for enterprise ATS and campus placement portals',
      status: 'pass',
    },
    {
      title: 'Core Keyword Density for SDE-1',
      description: 'High density for DSA, OOP, React & Node.js; add Docker for 100% match',
      status: 'warning',
    },
  ],
};

export const sampleRecentResumes = [
  {
    id: 'res-1',
    fileName: 'Brinda_Ukani_ComputerScience_FinalYear_2025.pdf',
    target: 'Software Development Engineer (Campus & New Grad @ Tier-1 Tech)',
    analyzedAgo: '15 mins ago',
    score: 92,
    atsMatch: '96%',
    status: 'Optimized',
    statusColor: 'tertiary',
  },
  {
    id: 'res-2',
    fileName: 'Brinda_Ukani_FullStack_WebDev_Resume.pdf',
    target: 'Junior Full Stack Developer @ High-Growth Startups',
    analyzedAgo: '2 days ago',
    score: 87,
    atsMatch: '91%',
    status: 'Optimized',
    statusColor: 'tertiary',
  },
  {
    id: 'res-3',
    fileName: 'Brinda_Ukani_Campus_Placement_Draft.pdf',
    target: 'Campus Placement SDE Generalist',
    analyzedAgo: '1 week ago',
    score: 79,
    atsMatch: '82%',
    status: 'Review Suggested',
    statusColor: 'secondary',
  },
];

export const sampleJobDescriptions = [
  {
    id: 'google-campus-new-grad',
    company: 'Google',
    title: 'Software Engineer, Campus New Grad (2025)',
    location: 'Bangalore / Hyderabad / Remote',
    salary: 'Tier-1 Campus Package + Benefits',
    matchPercentage: 94,
    requiredSkills: ['Data Structures & Algorithms', 'C++ / Java / Python', 'System Foundations', 'Object-Oriented Design', 'Git', 'Docker basics'],
    missingSkills: ['Docker basics'],
    description: `Google's software engineers develop next-generation technologies that change how billions of users connect, explore, and interact with information. We are hiring final-year Computer Science Engineering students for our 2025 New Grad cohort. You will write robust, scalable code, master complex algorithmic puzzles, and collaborate with globally distributed engineering teams.`,
  },
  {
    id: 'microsoft-sde-grad',
    company: 'Microsoft',
    title: 'Software Development Engineer (Campus Placement)',
    location: 'Hyderabad / Bangalore / Noida',
    salary: 'Competitive SDE-1 Package + Stock Awards',
    matchPercentage: 91,
    requiredSkills: ['Data Structures', 'Algorithms', 'React', 'Node.js', 'PostgreSQL / SQL', 'Cloud Fundamentals'],
    missingSkills: ['Cloud Fundamentals'],
    description: `At Microsoft, our mission is to empower every person and every organization on the planet to achieve more. As an SDE-1 campus hire, you will build intelligent web applications, modern APIs, and high-performance services that scale securely on Azure cloud.`,
  },
  {
    id: 'stripe-associate-swe',
    company: 'Stripe',
    title: 'Associate Software Engineer (Full Stack & Systems)',
    location: 'San Francisco, CA / Remote / APAC',
    salary: '$140,000 - $175,000 + Equity',
    matchPercentage: 88,
    requiredSkills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'RESTful APIs', 'Redis Caching'],
    missingSkills: ['Redis Caching'],
    description: `Stripe's infrastructure powers millions of businesses worldwide. We are looking for high-velocity software engineering graduates with a deep passion for clean abstractions, dependable developer tooling, and rock-solid payment checkout pipelines.`,
  },
];

export const sampleInterviewQuestions = [
  {
    question: "Walk me through how you implemented your search indexing algorithm in your KPGU final-year capstone project and what time/space complexity tradeoffs you evaluated.",
    focus: "Data Structures, Database Indexing & Complexity Analysis",
    tip: "Explain your B-Tree index structure in PostgreSQL, why sub-120ms latency was achieved, and how you tested query performance against 10,000+ simulated student records.",
  },
  {
    question: "How does the Node.js event loop handle asynchronous I/O compared to multi-threaded Java, and how did you prevent database connection pool exhaustion?",
    focus: "Operating Systems, Concurrency & Concurrency Models",
    tip: "Discuss libuv, microtask vs macrotask queues, connection pooling in pg/node-postgres, and backpressure handling.",
  },
  {
    question: "Design a high-concurrency campus placement examination portal with role-based authentication and rate limiting for college students.",
    focus: "Object-Oriented Design & System Architecture",
    tip: "Detail your schema design (Students, Applications, Companies), JWT authentication, Redis token-bucket rate limiter, and fail-safe database transactions.",
  },
];
