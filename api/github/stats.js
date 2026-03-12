import axios from "axios";

export default async function handler(req, res) {
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
			"https://api.github.com/graphql",
			{ query },
			{
				headers: {
					Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
				},
			}
		);

		const user = response.data.data.user;
		const repos = user.repositories.nodes;

		const allTimeCommits = repos.reduce((acc, repo) => {
			return acc + (repo.defaultBranchRef?.target?.history?.totalCount || 0);
		}, 0);

		res.status(200).json({
			repos: user.repositories.totalCount,
			commits: allTimeCommits,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Failed to fetch GitHub stats" });
	}
}
