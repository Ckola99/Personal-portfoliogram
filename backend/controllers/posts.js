const postsRouter = require('express').Router()
const Post = require('../models/post')
const logger = require('../utils/logger')


// GET all posts from MongoDB
postsRouter.get('/', (request, response) => {
	Post.find({}).then(posts => {
		response.json(posts)
	})
})

// GET single post by ID
postsRouter.get('/:id', (request, response, next) => {
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
postsRouter.delete('/:id', (request, response, next) => {
	Post.findByIdAndDelete(request.params.id)
		.then(() => {
			response.status(204).end()
		})
		.catch(error => next(error))
})

postsRouter.put('/:id', (request, response, next) => {
	const body = request.body;

	const postUpdate = {
		likes: body.likes,
		likedBy: body.likedBy,
		caption: body.caption,
		comments: body.comments
	};

	Post.findByIdAndUpdate(request.params.id, postUpdate, { returnDocument: 'after', runValidators: true, context: 'query' })
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
postsRouter.post('/', (request, response) => {
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

module.exports = postsRouter
