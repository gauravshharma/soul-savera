const repo = 'gauravshharma/soul-savera';
const folder = 'posts';

async function fetchBlogPosts() {
  const res = await fetch(`https://api.github.com/repos/${repo}/contents/${folder}`);
  const files = await res.json();

  for (const file of files) {
    if (!file.name.endsWith('.md')) continue;

    const slug = file.name.replace('.md', '');
    const fileContentRes = await fetch(file.download_url);
    const fileContent = await fileContentRes.text();
    const frontmatter = extractFrontmatter(fileContent);

    if (!frontmatter) continue;

    if(frontmatter.date) {
        posts.push({
            ...frontmatter,
            slug,
            date: new Date(frontmatter.date)
          });
        posts.sort((a, b) => b.date - a.date);  
    }

    createPostCard(slug, frontmatter);
  }
}

function extractFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);
  if (!match) return null;

  const lines = match[1].split('\n');
  const data = {};
  for (let line of lines) {
    const [key, ...rest] = line.split(':');
    if (!key || !rest.length) continue;
    data[key.trim()] = rest.join(':').trim().replace(/^"|"$/g, '');
  }
  return data;
}

function createPostCard(slug, data) {
    const post = document.createElement('div');
    post.className = 'post-meta text-post';
    post.setAttribute('data-aos', 'fade-up');
    post.setAttribute('data-aos-duration', '1200');
  
    post.innerHTML = `
      ${data.image ? `<img src="${data.image}" alt="${data.title}" class="image-meta">` : ''}
      <div class="post">
        <div class="date">${data.date || ''}</div>
        <h3>
          <a href="/blog/post?slug=${slug}" class="title">${data.title || 'Untitled'}</a>
        </h3>
        <p>${data.description || ''}</p>
        <a href="/blog/post?slug=${slug}" class="read-more">
          <span>Continue Reading</span>
          <i class="fa fa-angle-right" aria-hidden="true"></i>
        </a>
      </div>
    `;
  
    document.getElementById('posts').appendChild(post);
  }
  

fetchBlogPosts();
