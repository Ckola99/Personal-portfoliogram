const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// --- MIDDLEWARE ---

// Allow requests from your frontend (usually port 5173 or 3000)
app.use(cors());

// Parse incoming JSON bodies
app.use(express.json());


morgan.token('body', (req) => {
	return req.method === 'POST' ? JSON.stringify(req.body) : '';
});

const morganFormat = ':method :url :status :res[content-length] - :response-time ms :body';
app.use(morgan(morganFormat));

// --- DATA ---
let posts = [
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

// --- ROUTES ---

// Root welcome route
app.get('/', (request, response) => {
	response.send('<h1>Portfoliogram API</h1><p>Use /api/posts to see data</p>');
});

// GET all posts
app.get('/api/posts', (request, response) => {
	response.json(posts);
});

// GET a single post by ID
app.get('/api/posts/:id', (request, response) => {
	const id = request.params.id;
	const post = posts.find((p) => p.id === id);

	if (post) {
		response.json(post);
	} else {
		// SRE best practice: give a descriptive error for 404s
		response.status(404).json({ error: `Post with id ${id} not found` });
	}
});

// DELETE a post
app.delete('/api/posts/:id', (request, response) => {
	const id = request.params.id;
	posts = posts.filter((p) => p.id !== id);

	// 204 No Content
	response.status(204).end();
});

app.put('/api/posts/:id', (request, response) => {
	const id = request.params.id;
	const body = request.body;

	const postIndex = posts.findIndex(p => p.id === id);

	if (postIndex === -1) {
		return response.status(404).json({ error: 'Post not found' });
	}

	const updatedPost = {
		...posts[postIndex],
		likes: body.likes !== undefined ? body.likes : posts[postIndex].likes,
		likedBy: body.likedBy || posts[postIndex].likedBy,
		caption: body.caption || posts[postIndex].caption,
		comments: body.comments || posts[postIndex].comments
	};

	posts[postIndex] = updatedPost;
	console.log(`[UPDATE] Post ${id} - Likes: ${updatedPost.likes}, LikedBy Count: ${updatedPost.likedBy.length}`);
	response.json(updatedPost);
});

// POST (Create) a new post
app.post('/api/posts', (request, response) => {
	const body = request.body;

	// Validation: Ensure the caption and image exist
	if (!body.caption || !body.image) {
		return response.status(400).json({
			error: 'Missing caption or image URL'
		});
	}

	const newPost = {
		id: String(Math.floor(Math.random() * 1000000)), // Simple random ID
		image: body.image,
		caption: body.caption,
		likes: 0,
		likedBy: [],
		comments: [],
		githubUrl: body.githubUrl || '',
		projectUrl: body.projectUrl || '',
		createdAt: new Date().toISOString(),
		tags: body.tags || [],
	};

	posts = posts.concat(newPost);
	response.status(201).json(newPost); // 201 Created
});

// --- ERROR HANDLING ---

// Middleware for handling non-existent endpoints
const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);

// --- SERVER START ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`✅ Server running on http://localhost:${PORT}`);
	console.log(`📝 Custom Morgan logger active with :body token`);
});
