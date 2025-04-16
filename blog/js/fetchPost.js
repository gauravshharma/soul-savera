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
  document.getElementById('loader').style.display = 'block';
  document.getElementById('post-detail-container').style.display = 'none';

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
  const file = await response.json();
  const content = atob(file.content.replace(/\n/g, ''));
  const [rawMetadata, ...bodyParts] = content.split('---').filter(Boolean);

  const metadata = Object.fromEntries(
  rawMetadata.trim().split('\n').map(line => {
    const [key, ...rest] = line.split(':');
    return [key.trim(), rest.join(':').trim().replace(/"/g, '')];
  })
  );

  const body = bodyParts.join('---').trim();

  document.title = metadata.title;
  document.getElementById('seo-title').textContent = metadata.title;
  document.getElementById('meta-description').setAttribute('content', metadata.description || '');
  document.getElementById('og-title').setAttribute('content', metadata.title || '');
  document.getElementById('og-description').setAttribute('content', metadata.description || '');
  document.getElementById('og-image').setAttribute('content', metadata.image || '');
  document.getElementById('og-url').setAttribute('content', window.location.href);
  document.getElementById('twitter-title').setAttribute('content', metadata.title || '');
  document.getElementById('twitter-description').setAttribute('content', metadata.description || '');
  document.getElementById('twitter-image').setAttribute('content', metadata.image || '');

  const banner = document.getElementById('post-banner');
  if (metadata.image) {
  banner.src = metadata.image || '../images/blog-banner.png';
  banner.alt = metadata.title || 'Blog Banner';
  banner.style.display = 'block';
  } else {
    banner.src = '../images/blog-banner.png';
    banner.alt = metadata.title || 'Blog Banner';
    banner.style.display = 'block';
  }

  // Format date to "MMM DD"
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

  document.getElementById('post-title').textContent = metadata.title || '';
  document.getElementById('post-description').textContent = metadata.description || '';
  document.getElementById('banner-meta').textContent = `By ${metadata.author || 'Unknown'} | \nPublished on ${displayDate}`;
  document.getElementById('banner-category').textContent = metadata.category || '';
  
  const postContentEl = document.getElementById('post-content');
  postContentEl.innerHTML = body;

// Enhance <img> tags inside blog content
const images = postContentEl.querySelectorAll('img');
images.forEach(img => {
  // Add default alt if missing
  if (!img.alt || img.alt.trim() === '') {
    img.alt = metadata.title || 'Blog Image';
  }

  // Optional: Make images responsive
  img.style.maxWidth = '100%';
  img.style.height = 'auto';

  // Optional: Lazy loading
  img.loading = 'lazy';
});

  renderTags(metadata.tags, 'post-tags');
  renderTags(metadata.keywords, 'post-keywords');

  const encodedURL = encodeURIComponent(window.location.href);
  const encodedTitle = encodeURIComponent(metadata.title || 'Check this out!');
  document.getElementById('share-twitter').href = `https://twitter.com/intent/tweet?url=${encodedURL}&text=${encodedTitle}`;
  document.getElementById('share-facebook').href = `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`;
  document.getElementById('share-linkedin').href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedURL}`;
  } catch (err) {
    console.error('Error loading post:', err);
  } finally {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('post-detail-container').style.display = 'block';
  }
}
fetchPost();