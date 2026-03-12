const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const commentSchema = new mongoose.Schema({
	userId: String,
	username: String,
	avatar: String, // Ensure this matches what you send from the frontend
	text: String,
	createdAt: { type: Date, default: Date.now }
})

commentSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
	}
})

const postSchema = new mongoose.Schema({
	image: String,
	caption: String,
	likes: Number,
	likedBy: [ String ],
	githubUrl: String,
	projectUrl: String,
	tags: [String],
	createdAt: Date,
	comments: [commentSchema]
})

postSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})


module.exports = mongoose.model('Post', postSchema)
