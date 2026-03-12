import axios from 'axios';

const username = 'Ckola99';
const baseUrl = `https://api.github.com/users/${username}`;

export const getGithubStats = async () => {
	try {
		const userResponse = await axios.get(baseUrl);

		const reposResponse = await axios.get(`${baseUrl}/repos?per_page=100`);
		const totalRepos = userResponse.data.public_repos;

		return {
			repos: totalRepos,
			following: userResponse.data.following
		};
	} catch (error) {
		console.error("Error fetching GitHub data:", error);
		return null;
	}
};
