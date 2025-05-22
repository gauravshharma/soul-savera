const { Octokit } = require("@octokit/rest");

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const authHeader = event.headers['x-auth-key'];
  const AUTH_KEY = process.env.AUTH_KEY;

  if (authHeader !== AUTH_KEY) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Unauthorized" })
    };
  }

  const { slug } = JSON.parse(event.body);
  const FILE_PATH = `posts/${slug}.md`;

  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  const owner = "gauravshharma";
  const repo = "soul-savera";

  try {
    // Get the file SHA to delete it
    const { data: fileData } = await octokit.repos.getContent({
      owner,
      repo,
      path: FILE_PATH
    });

    await octokit.repos.deleteFile({
      owner,
      repo,
      path: FILE_PATH,
      message: `Deleted post: ${slug}`,
      sha: fileData.sha,
      committer: {
        name: "Blog Bot",
        email: "blog@bot.com"
      },
      author: {
        name: "Blog Bot",
        email: "blog@bot.com"
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Post deleted successfully." })
    };
  } catch (error) {
    console.error("GitHub Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to delete post.", details: error.message })
    };
  }
};
