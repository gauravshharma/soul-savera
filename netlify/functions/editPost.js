import { Octokit } from "@octokit/rest";
import { encode } from "js-base64";

export async function handler (event) {
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

    const { data: fileData } = await octokit.repos.getContent({
      owner,
      repo,
      path,
    });

    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: `Updated post: ${title}`,
      content: encode(newContent),
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
      body: JSON.stringify({ message: "Blog post updated successfully" }),
    };
  } catch (err) {
    console.error("Edit error:", err);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigin,
      },
      body: JSON.stringify({
        error: "Failed to update blog post",
        details: err.message,
      }),
    };
  }
}
