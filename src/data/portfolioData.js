// Portfolio Data

import {
  SiReact,
  SiRedux,
  SiPython,
  SiOpenjdk,
  SiDocker,
  SiGithubactions,
  SiLinux,
  SiGit,
  SiNodedotjs,
  SiSqlite
} from 'react-icons/si'

import { FaAws } from "react-icons/fa";
import { FaMasksTheater } from "react-icons/fa6";

export const skills = [
  { id: '1', name: 'React', icon: SiReact, category: 'frontend', color: '#61DAFB' },
  { id: '2', name: 'Redux', icon: SiRedux, category: 'frontend', color: '#764ABC' },
  { id: '3', name: 'Python', icon: SiPython, category: 'backend', color: '#3776AB' },
  { id: '4', name: 'Java', icon: SiOpenjdk, category: 'backend', color: '#F05032' },
  { id: '5', name: 'Docker', icon: SiDocker, category: 'devops', color: '#2496ED' },
  { id: '6', name: 'AWS', icon: FaAws, category: 'cloud', color: '#ED8B00' },
  { id: '7', name: 'CI/CD', icon: SiGithubactions, category: 'devops', color: '#F05032' },
  { id: '8', name: 'Playwright', icon: FaMasksTheater, category: 'testing', color: '#2EAD33' },
  { id: '9', name: 'Linux', icon: SiLinux, category: 'devops', color: '#4169E1' },
  { id: '10', name: 'Git', icon: SiGit, category: 'devops', color: '#F05032' },
  { id: '11', name: 'Node.js', icon: SiNodedotjs, category: 'backend', color: '#339933' },
  { id: '12', name: 'SQL', icon: SiSqlite, category: 'backend', color: '#4169E1' },
];

export const reels = [
  {
    id: 'r1',
    thumbnail: '/projects/commit-gen.png',
    videoUrl: '',
    youtubeUrl: 'https://youtube.com/shorts/YOUR_COMMITGEN_ID',
    title: 'CommitGen AI CLI',
    description: 'AI-powered Git CLI that generates Conventional Commits using OpenAI. Built with Python and Docker.',
    githubUrl: 'https://github.com/Ckola99/commit-gen',
    projectUrl: '',
  },
  {
    id: 'r2',
    thumbnail: '/projects/cloud-funfacts.png',
    videoUrl: '',
    youtubeUrl: 'https://youtube.com/shorts/YOUR_CLOUDFUNFACTS_ID',
    title: 'AWS Cloud FunFacts',
    description: 'Serverless architecture demo featuring AWS Lambda, DynamoDB, and Bedrock AI automation.',
    githubUrl: 'https://github.com/Ckola99/CloudFunFacts',
    projectUrl: 'https://production.d11q6mprl0gz9y.amplifyapp.com/',
  },
  {
    id: 'r3',
    thumbnail: '/projects/kanban-app.png',
    videoUrl: '',
    youtubeUrl: 'https://youtube.com/shorts/YOUR_KANBAN_ID',
    title: 'Kanban Web Walkthrough',
    description: 'React-based task management dashboard featuring drag-and-drop and real-time state updates.',
    githubUrl: 'https://github.com/Ckola99/Kanban-webapp',
    projectUrl: 'https://kanban-webapp.vercel.app/',
  },
  {
    id: 'r4',
    thumbnail: '/projects/audiophile-ecommerce.png',
    videoUrl: '',
    youtubeUrl: 'https://youtube.com/shorts/YOUR_AUDIOPHILE_ID',
    title: 'Audiophile E-Commerce',
    description: 'Advanced React frontend with Redux Toolkit for global state, shopping cart, and complex checkout flows.',
    githubUrl: 'https://github.com/Ckola99/Ecom-site/tree/main/audiophileSite',
    projectUrl: 'https://ecom-site-five.vercel.app/',
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
    title: "Bootcamp Mentor & Python Workshop Facilitator",
    organization: "WeThinkCode_",
    date: "Aug 2025 - Oct 2025",
    type: "experience",
    description:
      "Facilitated Python programming workshops and mentored learners through algorithmic problem-solving and foundational software engineering concepts."
  },
  {
    id: "a3",
    title: "Software Engineering Job Simulation – REST API Development",
    organization: "Hewlett Packard Enterprise (Forage)",
    date: "Jan 2026",
    type: "certificate",
    description:
      "Completed a hands-on job simulation focused on building RESTful web services using Java Spring Boot."
  },
  {
    id: "a4",
    title: "Python Programming Certification",
    organization: "freeCodeCamp",
    date: "Jan 2025",
    type: "certificate",
    description:
      "Demonstrated proficiency in Python programming, including data structures, algorithms, problem-solving, and backend development fundamentals."
  },
  {
    id: "a5",
    title: "JavaScript Algorithms & Data Structures Certification",
    organization: "freeCodeCamp",
    date: "Jun 2023",
    type: "certificate",
    description:
      "Mastered core JavaScript concepts, algorithmic thinking, data structures, and problem-solving techniques essential for frontend and backend development."
  },
  {
    id: "a6",
    title: "Responsive Web Design Certification",
    organization: "freeCodeCamp",
    date: "Jun 2023",
    type: "certificate",
    description:
      "Developed responsive web applications using HTML5 and CSS3, applying accessibility standards and mobile-first design principles."
  },
  {
    id: "a7",
    title: "SQL Intermediate – Database Querying & Optimization",
    organization: "SoloLearn",
    date: "Nov 2025",
    type: "certificate",
    description:
      "Strengthened skills in relational database querying, joins, aggregations, and data manipulation using SQL."
  },
  {
    id: "a8",
    title: "SQL Fundamentals Certification",
    organization: "SoloLearn",
    date: "Nov 2025",
    type: "certificate",
    description:
      "Built foundational knowledge of relational databases, structured query language syntax, and data retrieval."
  },
  {
    id: "a9",
    title: "Java Programming – Intermediate Concepts",
    organization: "SoloLearn",
    date: "Aug 2025",
    type: "certificate",
    description:
      "Applied object-oriented programming principles, core Java syntax, and application logic development."
  },
  {
    id: "a10",
    title: "Java Programming Foundations",
    organization: "SoloLearn",
    date: "Jul 2025",
    type: "certificate",
    description:
      "Learned Java fundamentals including variables, control structures, functions, and object-oriented basics."
  },
  {
    id: "a11",
    title: "AI Prompt Engineering Simulation",
    organization: "Forage",
    date: "Nov 2024",
    type: "certificate",
    description:
      "Completed a practical simulation focused on structured prompt engineering using ICO frameworks to design effective AI-driven outputs."
  },
  {
    id: "a12",
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
