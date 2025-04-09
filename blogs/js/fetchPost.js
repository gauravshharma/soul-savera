function renderTags(tagsData, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
  
    let tagsArray = [];
  
    if (typeof tagsData === 'string') {
      // Remove brackets and quotes if present
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
  
    // Update meta tags
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
  
    // Banner
    const banner = document.getElementById('post-banner');
    if (metadata.image) {
      banner.src = metadata.image;
      banner.style.display = 'block';
    }
  
    // Set content
    document.getElementById('post-title').textContent = metadata.title || '';
    document.getElementById('post-description').textContent = metadata.description || '';
    document.getElementById('post-meta').textContent = `By ${metadata.author || 'Unknown'} • ${metadata.category || ''} • ${metadata.date || ''}`;
    document.getElementById('post-content').innerHTML = marked.parse(body);
  
    renderTags(metadata.tags, 'post-tags');
    renderTags(metadata.keywords, 'post-keywords');
  
    // Share links
    const encodedURL = encodeURIComponent(window.location.href);
    const encodedTitle = encodeURIComponent(metadata.title || 'Check this out!');
  
    document.getElementById('share-twitter').href = `https://twitter.com/intent/tweet?url=${encodedURL}&text=${encodedTitle}`;
    document.getElementById('share-facebook').href = `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`;
    document.getElementById('share-linkedin').href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedURL}`;
  }
  
  fetchPost();
  