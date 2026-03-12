const githubRouter = require('express').Router();
const axios = require('axios');

githubRouter.get('/stats', async (req, res, next) => {
	const query = `
    query {
      user(login: "Ckola99") {
        repositories(first: 100, ownerAffiliations: OWNER) {
          totalCount
          nodes {
            defaultBranchRef {
              target {
                ... on Commit {
                  history {
                    totalCount
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

	try {
		const response = await axios.post(
			'https://api.github.com/graphql',
			{ query },
			{
				headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
			}
		);

		const user = response.data.data.user;
		const repos = user.repositories.nodes;

		// Sum up the history.totalCount from every repository
		const allTimeCommits = repos.reduce((acc, repo) => {
			return acc + (repo.defaultBranchRef?.target?.history?.totalCount || 0);
		}, 0);

		res.json({
			repos: user.repositories.totalCount,
			commits: allTimeCommits
		});
	} catch (error) {
		console.error('GraphQL Error:', error.response ? error.response.data : error.message);
		res.status(500).json({ error: 'Failed to fetch GitHub stats' });
	}
});

module.exports = githubRouter;
