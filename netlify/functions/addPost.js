import fetch from 'node-fetch';
import { Buffer } from 'buffer';

export async function handler(event) {
  const allowedOrigin = "https://soulsavera.com";

  // CORS Preflight
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

  // Method Check
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigin,
      },
      body: "Method Not Allowed",
    };
  }

  // Auth Header Check (Optional if you are protecting your API)
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

  // Parse data
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
        committer: {
          name: "Blog Bot",
          email: "blog@bot.com"
        },
        author: {
          name: "Blog Bot",
          email: "blog@bot.com"
        }
      }),
    });

    const result = await res.json();

    return {
      statusCode: res.status,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigin,
      },
      body: JSON.stringify(
        res.ok
          ? { message: 'Blog post added successfully!' }
          : { error: result }
      ),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigin,
      },
      body: JSON.stringify({
        error: 'Failed to commit - Contact the genius behind this!',
        details: err.message,
      }),
    };
  }
}
