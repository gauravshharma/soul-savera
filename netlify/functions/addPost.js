const fetch = require('node-fetch');
const { Buffer } = require('buffer');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  const {
    title,
    content,
    author,
    tags,
    image,
    category,
    date,
    slug,
    description,
    keywords,
  } = JSON.parse(event.body);

  const postContent = `---
title: "${title}"
author: "${author}"
date: "${date}"
category: "${category}"
tags: [${tags.split(',').map(tag => `"${tag.trim()}"`).join(', ')}]
keywords: [${keywords.split(',').map(word => `"${word.trim()}"`).join(', ')}]
image: "${image}"
slug: "${slug}"
description: "${description}"
---

${content}
`;

  const repo = 'gauravshharma/soul-savera';
  const [owner, repoName] = repo.split('/');
  const githubToken = process.env.GITHUB_TOKEN;
  const path = `posts/${slug}.md`;

  const encodedContent = Buffer.from(postContent).toString('base64');

  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${githubToken}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Netlify Blog Uploader',
      },
      body: JSON.stringify({
        message: `Add new blog post: ${title}`,
        content: encodedContent,
      }),
    });

    const result = await res.json();

    if (res.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Blog post added successfully!' }),
      };
    } else {
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: result }),
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to commit - Contact the genius behind this!', details: err.message }),
    };
  }
};
// This function handles the addition of a new blog post to a GitHub repository.