const usersRouter = require('express').Router()
const { nextDay } = require('date-fns/nextDay')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
	const users = await User.find({}).populate('likes')
	response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
	let { username } = request.body;
	let isAdmin = false;

	if (username === process.env.ADMIN_SECRET_KEY) {
		username = 'ChristopherKola';
		isAdmin = true;
	}

	try {
		let user = await User.findOne({ username });

		if (user) {
			return response.status(200).json(user);
		}

		// Otherwise, create the permanent admin account
		const newUser = new User({
			username,
			isAdmin: isAdmin,
			avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
			likes: [],
			comments: []
		});

		const savedUser = await newUser.save();
		response.status(201).json(savedUser);
	} catch (error) {
		next(error);
	}
});

module.exports = usersRouter
