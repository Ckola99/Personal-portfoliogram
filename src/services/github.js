import axios from 'axios';

const username = 'Ckola99';
const baseUrl = `https://api.github.com/users/${username}`;

export const getGithubStats = async () => {
	try {
		const response = await axios.get('/api/github/stats');
		return response.data;
	} catch (error) {
		console.error("Error fetching live GitHub stats:", error);
		return null;
	}
};
