require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('./models/post');
const User = require('./models/user');

// 1. Define the users that will exist in your database by default
const initialUsers = [
	{
		username: 'ChristopherKola', // Your official public name
		isAdmin: true,
		avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ChristopherKola',
		likes: [],
		posts: []
	},
	{
		username: 'techrecruiter_sa',
		isAdmin: false,
		avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=techrecruiter_sa',
		likes: [],
		posts: []
	},
	{
		username: 'open_source_enthusiast',
		isAdmin: false,
		avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=oss',
		likes: [],
		posts: []
	}
];

const seedDB = async () => {
	try {
		// Connect to your MongoDB (ensure MONGODB_URI is in your .env)
		await mongoose.connect(process.env.MONGODB_URI);
		console.log('🚀 Connected to MongoDB for seeding...');

		// 2. Clear existing data to ensure a clean slate
		await Post.deleteMany({});
		await User.deleteMany({});
		console.log('🧹 Old data cleared from collections.');

		// 3. Seed Users first so we can use their generated IDs in the Posts
		const createdUsers = await User.insertMany(initialUsers);

		// Find our specific users from the database results
		const adminUser = createdUsers.find(u => u.username === 'ChristopherKola');
		const recruiter = createdUsers.find(u => u.username === 'techrecruiter_sa');
		const fan = createdUsers.find(u => u.username === 'open_source_enthusiast');

		console.log('👤 Users seeded successfully.');

		// 4. Define Posts with accurate references and IDs
		const initialPosts = [
			{
				image: '/projects/robot-worlds.jpg',
				caption: '🤖 Robot Worlds Platform — Modernized a legacy distributed robot-control system with Java, Docker, and CI/CD pipelines. Built a Web API layer using Javalin and refactored the monolithic TCP robot-engine into a modular architecture.',
				likes: 1,
				likedBy: [adminUser.id],
				comments: [
					{
						_id: new mongoose.Types.ObjectId(), // Manual ID to prevent React key errors
						userId: recruiter.id,
						username: recruiter.username,
						avatar: recruiter.avatar,
						text: 'Impressive work on the brownfields modernization! 💪',
						createdAt: new Date('2026-02-20T10:30:00Z'),
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
				likes: 1,
				likedBy: [fan.id],
				comments: [],
				githubUrl: 'https://github.com/Ckola99/Kanban-webapp',
				projectUrl: '',
				createdAt: new Date('2026-01-10T16:30:00Z'),
				tags: ['React', 'JavaScript', 'CSS3', 'HTML5'],
			},
			{
				image: '/projects/cloud-funfacts.jpg',
				caption: '☁️ AWS Cloud FunFacts Generator — Fully serverless cloud application using AWS Lambda, API Gateway, DynamoDB, and Bedrock AI. Automated provisioning with Python boto3 and AWS CLI.',
				likes: 0,
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
				likes: 0,
				likedBy: [],
				comments: [],
				githubUrl: 'https://github.com/Ckola99/commit-gen',
				projectUrl: '',
				createdAt: new Date('2025-12-20T09:45:00Z'),
				tags: ['Python', 'OpenAI', 'Docker', 'CLI', 'Git'],
			},
		];

		// 5. Insert the Posts into the database
		await Post.insertMany(initialPosts);
		console.log('📝 Posts seeded successfully!');

		// 6. Close the connection
		await mongoose.connection.close();
		console.log('🔌 Connection closed.');
	} catch (err) {
		console.error('❌ Error seeding database:', err);
		process.exit(1);
	}
};

// Execute the seed function
seedDB();
