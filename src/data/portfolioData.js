// Portfolio Data

export const profileStats = {
  projects: 4,
  followers: 2055,
  following: 1807,
};

export const skills = [
  { id: '1', name: 'React', icon: '⚛️', category: 'frontend' },
  { id: '2', name: 'Redux', icon: '🔄', category: 'frontend' },
  { id: '3', name: 'Python', icon: '🐍', category: 'backend' },
  { id: '4', name: 'Java', icon: '☕', category: 'backend' },
  { id: '5', name: 'Docker', icon: '🐳', category: 'devops' },
  { id: '6', name: 'AWS', icon: '☁️', category: 'cloud' },
  { id: '7', name: 'CI/CD', icon: '🚀', category: 'devops' },
  { id: '8', name: 'Playwright', icon: '🎭', category: 'testing' },
  { id: '9', name: 'Linux', icon: '🐧', category: 'devops' },
  { id: '10', name: 'Git', icon: '📊', category: 'devops' },
  { id: '11', name: 'Node.js', icon: '🟢', category: 'backend' },
  { id: '12', name: 'SQL', icon: '🗄️', category: 'backend' },
];

export const posts = [
  {
    id: '1',
    image: '/projects/robot-worlds.jpg',
    caption: '🤖 Robot Worlds Platform — Modernized a legacy distributed robot-control system with Java, Docker, and CI/CD pipelines. Built a Web API layer using Javalin and refactored the monolithic TCP robot-engine into a modular architecture.',
    likes: 156,
    likedBy: [],
    comments: [
      {
        id: 'c1',
        postId: '1',
        userId: 'u1',
        username: 'techrecruiter_sa',
        avatar: '/avatars/user1.jpg',
        text: 'Impressive work on the brownfields modernization! 💪',
        createdAt: '2026-02-20T10:30:00Z',
      },
    ],
    githubUrl: 'https://github.com/Ckola99/Robot-worlds-brownfields',
    projectUrl: '',
    createdAt: '2026-02-15T14:00:00Z',
    tags: ['Java', 'Docker', 'CI/CD', 'TCP', 'SQL'],
  },
  {
    id: '2',
    image: '/projects/kanban-app.jpg',
    caption: '📋 Kanban Task Management Web App — Built a responsive task management dashboard using React. Features drag-and-drop functionality, real-time updates, and a clean, intuitive UI.',
    likes: 89,
    likedBy: [],
    comments: [],
    githubUrl: 'https://github.com/Ckola99/Kanban-webapp',
    projectUrl: '',
    createdAt: '2026-01-10T16:30:00Z',
    tags: ['React', 'JavaScript', 'CSS3', 'HTML5'],
  },
  {
    id: '3',
    image: '/projects/cloud-funfacts.jpg',
    caption: '☁️ AWS Cloud FunFacts Generator — Fully serverless cloud application using AWS Lambda, API Gateway, DynamoDB, and Bedrock AI. Automated provisioning with Python boto3 and AWS CLI.',
    likes: 234,
    likedBy: [],
    comments: [
      {
        id: 'c2',
        postId: '3',
        userId: 'u2',
        username: 'cloudenthusiast',
        avatar: '/avatars/user2.jpg',
        text: 'Love the serverless architecture! Great use of Bedrock 🚀',
        createdAt: '2026-02-25T08:15:00Z',
      },
    ],
    githubUrl: 'https://github.com/Ckola99/CloudFunFacts',
    projectUrl: '',
    createdAt: '2026-02-01T11:00:00Z',
    tags: ['AWS', 'Lambda', 'DynamoDB', 'Python', 'Serverless'],
  },
  {
    id: '4',
    image: '/projects/commit-gen.jpg',
    caption: '🤖 CommitGen — AI-powered Git CLI tool that analyzes staged diffs and generates Conventional Commit-compliant messages using OpenAI GPT API. Containerized with Docker and deployed to PyPI.',
    likes: 178,
    likedBy: [],
    comments: [],
    githubUrl: 'https://github.com/Ckola99/commit-gen',
    projectUrl: '',
    createdAt: '2025-12-20T09:45:00Z',
    tags: ['Python', 'OpenAI', 'Docker', 'CLI', 'Git'],
  },
];

export const reels = [
  {
    id: 'r1',
    thumbnail: '/reels/robot-demo-thumb.jpg',
    videoUrl: '/reels/robot-demo.mp4',
    title: 'Robot Worlds Demo',
    description: 'See the distributed robot control system in action with real-time commands and world state updates.',
    githubUrl: 'https://github.com/Ckola99/Robot-worlds-brownfields',
    projectUrl: '',
    views: 1205,
    likes: 89,
    createdAt: '2026-02-18T10:00:00Z',
  },
  {
    id: 'r2',
    thumbnail: '/reels/kanban-demo-thumb.jpg',
    videoUrl: '/reels/kanban-demo.mp4',
    title: 'Kanban App Walkthrough',
    description: 'Full walkthrough of the React-based task management application with drag-and-drop features.',
    githubUrl: 'https://github.com/Ckola99/Kanban-webapp',
    projectUrl: '',
    views: 892,
    likes: 67,
    createdAt: '2026-01-15T14:30:00Z',
  },
  {
    id: 'r3',
    thumbnail: '/reels/cloud-funfacts-thumb.jpg',
    videoUrl: '/reels/Video_260118122544_FreeExport.mp4',
    title: 'AWS FunFacts Generator',
    description: 'Demo of the serverless application generating cloud facts with AI enhancement via AWS Bedrock.',
    githubUrl: 'https://github.com/Ckola99/CloudFunFacts',
    projectUrl: '',
    views: 2156,
    likes: 156,
    createdAt: '2026-02-05T16:00:00Z',
  },
];

export const achievements = [
  {
    id: "a1",
    title: "Freelance Software Developer – WhatsApp Business Automation",
    organization: "Independent Client Project",
    date: "May 2025 - Jan 2026",
    type: "experience",
    description:
      "Designed, developed, and maintained a production-ready WhatsApp chatbot system for a small business."
  },
  {
    id: "a2",
    title: "Student Wellness Supervisor",
    organization: "WeThinkCode_",
    date: "Oct 2025 - Present",
    type: "experience",
    description:
      "Led student support initiatives, coordinated wellness workshops, and supervised facilitators to enhance student engagement."
  },
  {
    id: "a3",
    title: "Bootcamp Mentor & Python Workshop Facilitator",
    organization: "WeThinkCode_",
    date: "Aug 2025 - Oct 2025",
    type: "experience",
    description:
      "Facilitated Python programming workshops and mentored learners through algorithmic problem-solving and foundational software engineering concepts."
  },
  {
    id: "a4",
    title: "Software Engineering Job Simulation – REST API Development",
    organization: "Hewlett Packard Enterprise (Forage)",
    date: "Jan 2026",
    type: "certificate",
    description:
      "Completed a hands-on job simulation focused on building RESTful web services using Java Spring Boot."
  },
  {
    id: "a5",
    title: "Python Programming Certification",
    organization: "freeCodeCamp",
    date: "Jan 2025",
    type: "certificate",
    description:
      "Demonstrated proficiency in Python programming, including data structures, algorithms, problem-solving, and backend development fundamentals."
  },
  {
    id: "a6",
    title: "JavaScript Algorithms & Data Structures Certification",
    organization: "freeCodeCamp",
    date: "Jun 2023",
    type: "certificate",
    description:
      "Mastered core JavaScript concepts, algorithmic thinking, data structures, and problem-solving techniques essential for frontend and backend development."
  },
  {
    id: "a7",
    title: "Responsive Web Design Certification",
    organization: "freeCodeCamp",
    date: "Jun 2023",
    type: "certificate",
    description:
      "Developed responsive web applications using HTML5 and CSS3, applying accessibility standards and mobile-first design principles."
  },
  {
    id: "a8",
    title: "SQL Intermediate – Database Querying & Optimization",
    organization: "SoloLearn",
    date: "Nov 2025",
    type: "certificate",
    description:
      "Strengthened skills in relational database querying, joins, aggregations, and data manipulation using SQL."
  },
  {
    id: "a9",
    title: "SQL Fundamentals Certification",
    organization: "SoloLearn",
    date: "Nov 2025",
    type: "certificate",
    description:
      "Built foundational knowledge of relational databases, structured query language syntax, and data retrieval."
  },
  {
    id: "a10",
    title: "Java Programming – Intermediate Concepts",
    organization: "SoloLearn",
    date: "Aug 2025",
    type: "certificate",
    description:
      "Applied object-oriented programming principles, core Java syntax, and application logic development."
  },
  {
    id: "a11",
    title: "Java Programming Foundations",
    organization: "SoloLearn",
    date: "Jul 2025",
    type: "certificate",
    description:
      "Learned Java fundamentals including variables, control structures, functions, and object-oriented basics."
  },
  {
    id: "a12",
    title: "AI Prompt Engineering Simulation",
    organization: "Forage",
    date: "Nov 2024",
    type: "certificate",
    description:
      "Completed a practical simulation focused on structured prompt engineering using ICO frameworks to design effective AI-driven outputs."
  },
  {
    id: "a13",
    title: "Front-End Engineering Career Path",
    organization: "Codecademy",
    date: "Jul 2024",
    type: "certificate",
    description:
      "Completed an intensive front-end development pathway covering HTML, CSS, JavaScript, React, performance optimization, and version control workflows."
  }
];

export const socialLinks = {
  github: 'https://github.com/Ckola99',
  linkedin: 'https://www.linkedin.com/in/christopher-k-b64b35119/',
  email: 'christopherkola@gmail.com',
  phone: '+27 790 128 237',
};
