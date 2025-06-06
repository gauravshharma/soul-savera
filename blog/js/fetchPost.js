function renderTags(tagsData, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  let tagsArray = [];

  if (typeof tagsData === 'string') {
  const cleanString = tagsData.replace(/[\[\]"]/g, '');
  tagsArray = cleanString.split(',').map(tag => tag.trim());
  } else if (Array.isArray(tagsData)) {
  tagsArray = tagsData;
  }

  tagsArray.forEach(tag => {
  const tagEl = document.createElement('span');
  tagEl.textContent = tag;
  tagEl.style.display = 'inline-block';
  tagEl.style.backgroundColor = '#f1f1f1';
  tagEl.style.padding = '6px 12px';
  tagEl.style.borderRadius = '20px';
  tagEl.style.marginRight = '8px';
  tagEl.style.marginBottom = '8px';
  tagEl.style.fontSize = '14px';
  tagEl.style.color = '#333';
  container.appendChild(tagEl);
  });
}

async function fetchPost() {
  try {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    if (!slug) {
      document.getElementById('post-title').textContent = "Post not found.";
      return;
    }

    const repo = 'gauravshharma/soul-savera';
    const folder = 'posts';
    const response = await fetch(`https://api.github.com/repos/${repo}/contents/${folder}/${slug}.md`);
    if (!response.ok) throw new Error(`Failed to fetch post: ${response.status}`);
    
    const file = await response.json();
    const content = atob(file.content.replace(/\n/g, ''));

    // Parse metadata and body
    const parts = content.split('---').filter(Boolean);
    if (parts.length < 2) throw new Error('Invalid post format. Missing frontmatter or body.');

    const [rawMetadata, ...bodyParts] = parts;

    const metadata = Object.fromEntries(
      rawMetadata
        .trim()
        .split('\n')
        .map(line => {
          const [key, ...rest] = line.split(':');
          if (!key || rest.length === 0) return null; // skip malformed lines
          return [key.trim(), rest.join(':').trim().replace(/"/g, '')];
        })
        .filter(entry => entry !== null)
    );

    const body = bodyParts.join('---').trim();

    // Populate meta tags
    document.title = metadata.title || 'Untitled Post';
    document.getElementById('seo-title').textContent = metadata.title || '';
    document.getElementById('meta-description').setAttribute('content', metadata.description || '');
    document.getElementById('og-title').setAttribute('content', metadata.title || '');
    document.getElementById('og-description').setAttribute('content', metadata.description || '');
    document.getElementById('og-image').setAttribute('content', metadata.image || '');
    document.getElementById('og-url').setAttribute('content', window.location.href);
    document.getElementById('twitter-title').setAttribute('content', metadata.title || '');
    document.getElementById('twitter-description').setAttribute('content', metadata.description || '');
    document.getElementById('twitter-image').setAttribute('content', metadata.image || '');

    // Display banner image
    const banner = document.getElementById('post-banner');
    banner.src = metadata.image || '../images/blog-banner.png';
    banner.alt = metadata.title || 'Blog Banner';
    banner.style.display = 'block';

    // Format date if possible
    let displayDate = metadata.date || '';
    if (/^\d{2}-\d{2}-\d{4}$/.test(displayDate)) {
      const [day, month, year] = displayDate.split('-');
      const parsedDate = new Date(`${year}-${month}-${day}`);
      if (!isNaN(parsedDate)) {
        displayDate = parsedDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        });
      }
    }

    // Fill in post details
    document.getElementById('post-title').textContent = metadata.title || '';
    document.getElementById('post-description').textContent = metadata.description || '';
    document.getElementById('banner-meta').textContent = `By ${metadata.author || 'Unknown'} | \nPublished on ${displayDate}`;
    document.getElementById('banner-category').textContent = metadata.category || '';

    // Insert content
    const postContentEl = document.getElementById('post-content');
    postContentEl.innerHTML = body;

    // Enhance images inside content
    const images = postContentEl.querySelectorAll('img');
    images.forEach(img => {
      img.alt = img.alt?.trim() || metadata.title || 'Blog Image';
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
      img.loading = 'lazy';
    });

    // Render tags and keywords
    renderTags(metadata.tags, 'post-tags');
    renderTags(metadata.keywords, 'post-keywords');

    // Share links
    const encodedURL = encodeURIComponent(window.location.href);
    const encodedTitle = encodeURIComponent(metadata.title || 'Check this out!');
    document.getElementById('share-twitter').href = `https://twitter.com/intent/tweet?url=${encodedURL}&text=${encodedTitle}`;
    document.getElementById('share-facebook').href = `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`;
    document.getElementById('share-linkedin').href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedURL}`;

  } catch (err) {
    console.error('Error loading post:', err);
    document.getElementById('post-title').textContent = "Error loading post.";
  }
}


fetchPost();