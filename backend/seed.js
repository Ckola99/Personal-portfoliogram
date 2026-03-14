require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('./models/post');
const User = require('./models/user');

const initialUsers = [
	{
		username: 'ChristopherKola',
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
		console.log(' Old data cleared from collections.');

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
				image: '/projects/commit-gen.png',
				caption: '🤖 CommitGen — AI-powered Git CLI tool that analyzes staged diffs and generates Conventional Commit-compliant messages using OpenAI GPT API. Containerized with Docker and deployed to PyPI.',
				likes: 0,
				likedBy: [],
				comments: [],
				githubUrl: 'https://github.com/Ckola99/commit-gen',
				projectUrl: '',
				createdAt: new Date('2026-01-20T09:45:00Z'),
				tags: ['Python', 'OpenAI', 'Docker', 'CLI', 'Git'],
			},
			{
				image: '/projects/cloud-funfacts.png',
				caption: '☁️ AWS Cloud FunFacts Generator — Fully serverless cloud application using AWS Lambda, API Gateway, DynamoDB, and Bedrock AI. Automated provisioning with Python boto3 and AWS CLI.',
				likes: 0,
				likedBy: [],
				comments: [],
				githubUrl: 'https://github.com/Ckola99/CloudFunFacts',
				projectUrl: 'https://production.d11q6mprl0gz9y.amplifyapp.com/',
				createdAt: new Date('2025-12-12T11:00:00Z'),
				tags: ['AWS', 'Lambda', 'DynamoDB', 'Python', 'Serverless'],
			},
			{
				image: '/projects/kanban-app.png',
				caption: '📋 Kanban Task Management Web App — Built a responsive task management dashboard using React. Features drag-and-drop functionality, real-time updates, and a clean, intuitive UI.',
				likes: 1,
				likedBy: [fan.id],
				comments: [],
				githubUrl: 'https://github.com/Ckola99/Kanban-webapp',
				projectUrl: 'https://kanban-webapp.vercel.app/',
				createdAt: new Date('2025-01-11T16:30:00Z'),
				tags: ['React', 'JavaScript', 'CSS3', 'HTML5'],
			},
			{
				image: '/projects/audiophile-ecommerce.png',
				caption: '🛒 Audiophile E-Commerce Frontend — Responsive React e-commerce application featuring dynamic product pages, Redux Toolkit global state management, shopping cart functionality, checkout flow, and modern UI styling with Tailwind CSS.',
				likes: 0,
				likedBy: [],
				comments: [],
				githubUrl: 'https://github.com/Ckola99/Ecom-site/tree/main/audiophileSite',
				projectUrl: 'https://ecom-site-five.vercel.app/',
				createdAt: new Date('2024-12-20T11:00:00Z'),
				tags: ['React', 'Redux Toolkit', 'Tailwind CSS', 'E-commerce', 'Frontend'],
			},
			{
				image: "/projects/Whatsapp-bot.png",
				caption: "🤖 WhatsApp Automation Engine — Built a hybrid Node.js and Python system to automate customer onboarding. Features stateful conversation tracking, automated 24-hour follow-ups, and direct integration with Google Contacts API for seamless lead management.",
				likes: 0,
				likedBy: [],
				comments: [],
				githubUrl: "https://github.com/ChristopherKola/WhatsappBot",
				projectUrl: "https://github.com/ChristopherKola/WhatsappBot",
				createdAt: new Date('2026-03-14T10:00:00Z'),
				tags: ["Node.js", "FastAPI", "Automation", "WhatsApp API", "CRM", "Python"]
			}
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
