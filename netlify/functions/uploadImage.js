const fetch = require('node-fetch');

exports.handler = async (event) => {
  const allowedOrigins = [
    "https://soulsavera.com",
    "https://soulsavera.netlify.app",
  ];

  const origin = event.headers.origin;
  const isAllowedOrigin = allowedOrigins.includes(origin);
  const accessControlOrigin = isAllowedOrigin ? origin : "https://soulsavera.com";

  // Handle CORS preflight request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": accessControlOrigin,
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
        "Access-Control-Allow-Origin": accessControlOrigin,
      },
      body: "Method Not Allowed",
    };
  }

  try {
    const { fileName, fileData, mimeType } = JSON.parse(event.body);

    const repo = 'gauravshharma/soul-savera';
    const [owner, repoName] = repo.split('/');
    const githubToken = process.env.GITHUB_TOKEN;
    const filePath = `images/${fileName}`;

    const res = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${githubToken}`,
        'Content-Type': 'application/json',
        'User-Agent': 'GitHub Image Uploader',
      },
      body: JSON.stringify({
        message: `Upload image ${fileName}`,
        content: fileData, // already base64 encoded
      }),
    });

    const result = await res.json();

    if (res.status === 201 || res.status === 200) {
      const imageUrl = result.content.download_url;
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": accessControlOrigin,
        },
        body: JSON.stringify({ url: imageUrl }),
      };
    }

    return {
      statusCode: res.status,
      headers: {
        "Access-Control-Allow-Origin": accessControlOrigin,
      },
      body: JSON.stringify({ error: result }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": accessControlOrigin,
      },
      body: JSON.stringify({ error: "Failed to upload image", details: err.message }),
    };
  }
};
