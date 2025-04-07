const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const { title, content } = JSON.parse(event.body);

  const filename = `${title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.md`;
  const fileContent = `# ${title}\n\n${content}\n`;

  const repoOwner = 'your-username';
  const repoName = 'your-repo';
  const branch = 'main';
  const path = `posts/${filename}`; // or "_posts" if using Jekyll
  const githubToken = process.env.GITHUB_TOKEN; // Add via Netlify UI

  const encodedContent = Buffer.from(fileContent).toString('base64');

  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `token ${githubToken}`,
      'Content-Type': 'application/json',
      'User-Agent': 'Blog Poster'
    },
    body: JSON.stringify({
      message: `Add new post: ${title}`,
      content: encodedContent,
      branch: branch
    })
  });

  if (response.ok) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Post submitted and committed to GitHub!' })
    };
  } else {
    const err = await response.json();
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to commit', details: err })
    };
  }
};
