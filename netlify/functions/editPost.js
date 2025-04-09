const { Octokit } = require("@octokit/rest");
const base64 = require("js-base64");

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" })
    };
  }

  const authHeader = event.headers['x-auth-key'];
  const AUTH_KEY = process.env.AUTH_KEY;
  if (authHeader !== AUTH_KEY) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Unauthorized" })
    };
  }

  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  const owner = "gauravshharma";
  const repo = "soul-savera";

  try {
    const postData = JSON.parse(event.body);
    const {
      title, content, author, tags, image, category,
      date, slug, description, keywords
    } = postData;

    const path = `posts/${slug}.md`;
    const newContent = `---
title: ${title}
author: ${author}
tags: ${tags}
image: ${image}
category: ${category}
date: ${date}
description: ${description}
keywords: ${keywords}
---

${content}`;

    // Get existing SHA to update the file
    const { data: fileData } = await octokit.repos.getContent({
      owner,
      repo,
      path
    });

    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: `Updated post: ${title}`,
      content: base64.encode(newContent),
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
      body: JSON.stringify({ message: "Blog post updated successfully" })
    };
  } catch (err) {
    console.error("Edit error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to update blog post", details: err.message })
    };
  }
};
