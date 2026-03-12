const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const postsRouter = require('./controllers/posts')
const usersRouter = require('./controllers/users')
const githubRouter = require('./controllers/github')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI)
	.then(() => {
		logger.info('connected to MongoDB')
	})
	.catch((error) => {
		logger.error('error connecting to MongoDB:', error.message)
	})

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.get('/api/ping', (req, res) => {
	res.status(200).send('pong');
});

app.use('/api/posts', postsRouter)
app.use('/api/users', usersRouter)
app.use('/api/github', githubRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
