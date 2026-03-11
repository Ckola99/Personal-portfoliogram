const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const postSchema = new mongoose.Schema({
	image: String,
	caption: String,
	likes: Number,
	likedBy: [ String ],
	githubUrl: String,
	projectUrl: String,
	tags: [String],
	createdAt: Date,
	comments: [
		{
			userId: String,
			username: String,
			text: String,
			createdAt: { type: Date, default: Date.now }
		}
	]
})

postSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})


module.exports = mongoose.model('Post', postSchema)
