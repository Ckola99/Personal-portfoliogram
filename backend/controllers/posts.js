const postsRouter = require('express').Router()
const Post = require('../models/post')
const logger = require('../utils/logger')

// GET all posts
postsRouter.get('/', async (request, response, next) => {
	try {
		const posts = await Post.find({})
		response.json(posts)
	} catch (error) {
		next(error)
	}
})

// GET single post by ID
postsRouter.get('/:id', async (request, response, next) => {
	try {
		const post = await Post.findById(request.params.id)
		if (post) {
			response.json(post)
		} else {
			response.status(404).end()
		}
	} catch (error) {
		next(error)
	}
})

// DELETE a post
postsRouter.delete('/:id', async (request, response, next) => {
	try {
		await Post.findByIdAndDelete(request.params.id)
		response.status(204).end()
	} catch (error) {
		next(error)
	}
})

// PUT (Update) a post
postsRouter.put('/:id', async (request, response, next) => {
	const body = request.body

	const postUpdate = {
		likes: body.likes,
		likedBy: body.likedBy,
		caption: body.caption,
		comments: body.comments
	}

	try {
		const updatedPost = await Post.findByIdAndUpdate(
			request.params.id,
			postUpdate,
			{ returnDocument: 'after', runValidators: true, context: 'query' }
		)

		if (updatedPost) {
			logger.info(`Updated post ${request.params.id} successfully`)
			response.json(updatedPost)
		} else {
			response.status(404).end()
		}
	} catch (error) {
		next(error)
	}
})

// POST (Create) a new post
postsRouter.post('/', async (request, response, next) => {
	const body = request.body

	if (!body.caption || !body.image) {
		return response.status(400).json({
			error: 'Missing caption or image URL'
		})
	}

	const post = new Post({
		image: body.image,
		caption: body.caption,
		likes: 0,
		likedBy: [],
		comments: [],
		githubUrl: body.githubUrl || '',
		projectUrl: body.projectUrl || '',
		createdAt: new Date().toISOString(),
		tags: body.tags || [],
	})

	try {
		const savedPost = await post.save()
		logger.info(`Post created with ID: ${savedPost.id}`)
		response.status(201).json(savedPost)
	} catch (error) {
		next(error)
	}
})

module.exports = postsRouter
