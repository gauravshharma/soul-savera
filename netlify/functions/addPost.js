const { Octokit } = require("@octokit/rest");
const { Buffer } = require("buffer");

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const authHeader = event.headers["authorization"];
  const secret = process.env.BLOG_SECRET;
  if (!authHeader || authHeader !== `Bearer ${secret}`) {
    return { statusCode: 401, body: "Unauthorized" };
  }

  const { title, content, author, tags, image, category, date, slug, description, keywords } = JSON.parse(event.body);

  const metadata = `---
title: "${title}"
author: "${author}"
tags: "${tags}"
image: "${image}"
category: "${category}"
date: "${date}"
slug: "${slug}"
description: "${description}"
keywords: "${keywords}"
---`;

  const fullContent = `${metadata}\n\n${content}`;
  const base64Content = Buffer.from(fullContent).toString("base64");

  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  try {
    await octokit.repos.createOrUpdateFileContents({
      owner: "gauravshharma",
      repo: "soul-savera",
      path: `posts/${slug}.md`,
      message: `Add blog post: ${title}`,
      content: base64Content,
      committer: {
        name: "Netlify Bot",
        email: "bot@netlify.com"
      },
      author: {
        name: "Netlify Bot",
        email: "bot@netlify.com"
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Blog post created successfully" })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message })
    };
  }
};
