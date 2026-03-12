import axios from 'axios'
const baseUrl = '/api/users'

const login = async (username) => {
	// We send the username to the backend
	const response = await axios.post(baseUrl, { username })
	return response.data
}

export default { login }
