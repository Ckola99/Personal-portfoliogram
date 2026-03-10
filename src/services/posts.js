import axios from 'axios'
const baseUrl = import.meta.env.PROD
	? `${import.meta.env.VITE_BACKEND_URL}/api/posts`
	: '/api/posts'

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const update = (id, newObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newObject)
	return request.then(response => response.data)
}

export default { getAll, update }


// mongodb+srv://christopherkola_db_user:<db_password>@phonebookapp.qsatqsa.mongodb.net/?appName=phonebookApp
