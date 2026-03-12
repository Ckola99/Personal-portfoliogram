import axios from 'axios';

const username = 'Ckola99';
const baseUrl = import.meta.env.PROD
	? `${import.meta.env.VITE_BACKEND_URL}/api/github/stats`
	: '/api/github/stats';

export const getGithubStats = async () => {
	try {
		const response = await axios.get('/api/github/stats');
		return response.data;
	} catch (error) {
		console.error("Error fetching live GitHub stats:", error);
		return null;
	}
};
