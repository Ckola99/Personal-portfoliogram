require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('./models/post');

const initialPosts = [
	{
		image: '/projects/robot-worlds.jpg',
		caption: '🤖 Robot Worlds Platform — Modernized a legacy distributed robot-control system with Java, Docker, and CI/CD pipelines. Built a Web API layer using Javalin and refactored the monolithic TCP robot-engine into a modular architecture.',
		likes: 156,
		likedBy: [],
		comments: [
			{
				id: 'c1',
				username: 'techrecruiter_sa',
				text: 'Impressive work on the brownfields modernization! 💪',
				createdAt: '2026-02-20T10:30:00Z',
			},
		],
		githubUrl: 'https://github.com/Ckola99/Robot-worlds-brownfields',
		projectUrl: '',
		createdAt: new Date('2026-02-15T14:00:00Z'),
		tags: ['Java', 'Docker', 'CI/CD', 'TCP', 'SQL'],
	},
	{
		image: '/projects/kanban-app.jpg',
		caption: '📋 Kanban Task Management Web App — Built a responsive task management dashboard using React. Features drag-and-drop functionality, real-time updates, and a clean, intuitive UI.',
		likes: 89,
		likedBy: [],
		comments: [],
		githubUrl: 'https://github.com/Ckola99/Kanban-webapp',
		projectUrl: '',
		createdAt: new Date('2026-01-10T16:30:00Z'),
		tags: ['React', 'JavaScript', 'CSS3', 'HTML5'],
	},
	{
		image: '/projects/cloud-funfacts.jpg',
		caption: '☁️ AWS Cloud FunFacts Generator — Fully serverless cloud application using AWS Lambda, API Gateway, DynamoDB, and Bedrock AI. Automated provisioning with Python boto3 and AWS CLI.',
		likes: 234,
		likedBy: [],
		comments: [],
		githubUrl: 'https://github.com/Ckola99/CloudFunFacts',
		projectUrl: '',
		createdAt: new Date('2026-02-01T11:00:00Z'),
		tags: ['AWS', 'Lambda', 'DynamoDB', 'Python', 'Serverless'],
	},
	{
		image: '/projects/commit-gen.jpg',
		caption: '🤖 CommitGen — AI-powered Git CLI tool that analyzes staged diffs and generates Conventional Commit-compliant messages using OpenAI GPT API. Containerized with Docker and deployed to PyPI.',
		likes: 178,
		likedBy: [],
		comments: [],
		githubUrl: 'https://github.com/Ckola99/commit-gen',
		projectUrl: '',
		createdAt: new Date('2025-12-20T09:45:00Z'),
		tags: ['Python', 'OpenAI', 'Docker', 'CLI', 'Git'],
	},
];

const seedDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log('Connected to MongoDB for seeding...');

		// Clear existing data to avoid duplicates
		await Post.deleteMany({});
		console.log('Old posts cleared.');

		// Insert new data
		await Post.insertMany(initialPosts);
		console.log('Database seeded successfully!');

		await mongoose.connection.close();
		console.log('Connection closed.');
	} catch (err) {
		console.error('Error seeding database:', err);
		process.exit(1);
	}
};

seedDB();
