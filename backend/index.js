require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Post = require('./models/post')

const app = express();

// --- MIDDLEWARE ---

const allowedOrigins = [
	'http://localhost:5173',
	'https://personal-portfoliogram.vercel.app'
];

const corsOptions = {
	origin: function (origin, callback) {
		if (!origin) return callback(null, true);
		if (allowedOrigins.indexOf(origin) === -1) {
			const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
			return callback(new Error(msg), false);
		}
		return callback(null, true);
	}
};

// Allow requests from your frontend (usually port 5173 or 3000)
app.use(cors(corsOptions));

// Parse incoming JSON bodies
app.use(express.json());


morgan.token('body', (req) => {
	return ['POST', 'PUT'].includes(req.method) ? JSON.stringify(req.body) : ''
})

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

// GET all posts from MongoDB
app.get('/api/posts', (request, response) => {
	Post.find({}).then(posts => {
		response.json(posts)
	})
})

// GET single post by ID
app.get('/api/posts/:id', (request, response, next) => {
	Post.findById(request.params.id)
		.then(post => {
			if (post) {
				response.json(post)
			} else {
				response.status(404).end()
			}
		})
		.catch(error => next(error)) // Pass errors to error handler
})

// DELETE a post
app.delete('/api/posts/:id', (request, response, next) => {
	Post.findByIdAndDelete(request.params.id)
		.then(() => {
			response.status(204).end()
		})
		.catch(error => next(error))
})

app.put('/api/posts/:id', (request, response, next) => {
	const body = request.body;

	const postIndex = posts.findIndex(p => p.id === id);

	if (postIndex === -1) {
		return response.status(404).json({ error: 'Post not found' });
	}

	const post = {
		...posts[postIndex],
		likes: body.likes !== undefined ? body.likes : posts[postIndex].likes,
		likedBy: body.likedBy || posts[postIndex].likedBy,
		caption: body.caption || posts[postIndex].caption,
		comments: body.comments || posts[postIndex].comments
	};

	Post.findByIdAndUpdate(request.params.id, post, { new: true, runValidators: true, context: 'query' })
		.then(updatedPost => {
			response.json(updatedPost)
		})
		.catch(error => next(error))
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

	post.save()
		.then(savedPost => {
			response.status(201).json(savedPost)
		})
		.catch(error => next(error))
});

// --- ERROR HANDLING ---

// Middleware for handling non-existent endpoints
const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}

	next(error)
}
app.use(errorHandler)

// --- SERVER START ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`✅ Server running on http://localhost:${PORT}`);
	console.log(`📝 Custom Morgan logger active with :body token`);
});
