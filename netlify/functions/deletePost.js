const { Octokit } = require("@octokit/rest");

exports.handler = async function (event) {
  const allowedOrigin = "https://soulsavera.com";

  // Handle CORS preflight request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigin,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, x-auth-key",
      },
      body: "OK",
    };
  }
  

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigin,
      },
      body: "Method Not Allowed",
    };
  }

  // Auth check
  const authHeader = event.headers["x-auth-key"];
  const AUTH_KEY = process.env.AUTH_KEY;
  if (AUTH_KEY && authHeader !== AUTH_KEY) {
    return {
      statusCode: 401,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigin,
      },
      body: JSON.stringify({ error: "Unauthorized" }),
    };
  }

  // Parse body
  let slug;
  try {
    ({ slug } = JSON.parse(event.body));
    if (!slug) throw new Error("Missing slug.");
  } catch (err) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigin,
      },
      body: JSON.stringify({ error: "Invalid request body", details: err.message }),
    };
  }

  const FILE_PATH = `posts/${slug}.md`;
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  const owner = "gauravshharma";
  const repo = "soul-savera";

  try {
    const { data: fileData } = await octokit.repos.getContent({
      owner,
      repo,
      path: FILE_PATH,
    });

    await octokit.repos.deleteFile({
      owner,
      repo,
      path: FILE_PATH,
      message: `Deleted post: ${slug}`,
      sha: fileData.sha,
      committer: {
        name: "Blog Bot",
        email: "blog@bot.com",
      },
      author: {
        name: "Blog Bot",
        email: "blog@bot.com",
      },
    });

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigin,
      },
      body: JSON.stringify({ message: "Post deleted successfully." }),
    };
  } catch (error) {
    console.error("GitHub Delete Error:", error);

    const statusCode = error.status === 404 ? 404 : 500;
    const message = error.status === 404 ? "Post not found." : "Failed to delete post.";

    return {
      statusCode,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigin,
      },
      body: JSON.stringify({ error: message, details: error.message }),
    };
  }
};
