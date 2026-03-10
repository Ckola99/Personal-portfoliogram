require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Post = require('./models/post')
const logger = require('./utils/logger')

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

	const postUpdate = {
		likes: body.likes,
		likedBy: body.likedBy,
		caption: body.caption,
		comments: body.comments
	};

	Post.findByIdAndUpdate(request.params.id, postUpdate, { new: true, runValidators: true, context: 'query' })
		.then(updatedPost => {
			if (updatedPost) {
				logger.info(`Updated post ${request.params.id} successfully`);
				response.json(updatedPost);
			} else {
				response.status(404).end();
			}
		})
		.catch(error => next(error));
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

	const post = {
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
			logger.info(`Post created with ID: ${savedPost.id}`);
			response.status(201).json(savedPost);
		})
		.catch(error => next(error));
});

// --- ERROR HANDLING ---

// Middleware for handling non-existent endpoints
const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
	logger.error(error.message); // Using our custom logger

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message });
	}

	next(error);
};
app.use(errorHandler)

// --- SERVER START ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`✅ Server running on http://localhost:${PORT}`);
	console.log(`📝 Custom Morgan logger active with :body token`);
});
