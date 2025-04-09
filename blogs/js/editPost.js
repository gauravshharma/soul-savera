const repo = 'gauravshharma/soul-savera';
const folder = 'posts';

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '30px';
    toast.style.right = '30px';
    toast.style.padding = '15px 20px';
    toast.style.backgroundColor = type === 'success' ? '#4caf50' : '#f44336';
    toast.style.color = '#fff';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    toast.style.zIndex = 1000;
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease-in-out';
  
    document.body.appendChild(toast);
  
    setTimeout(() => {
      toast.style.opacity = '1';
    }, 100);
  
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 500);
    }, 2500);
  }

function getSlugFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('slug');
}

async function fetchPostDetails() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("slug");
    if (!slug) return;
  
    const repo = 'gauravshharma/soul-savera';
    const folder = 'posts';
    const response = await fetch(`https://api.github.com/repos/${repo}/contents/${folder}/${slug}.md`);
    const file = await response.json();
    const content = atob(file.content.replace(/\n/g, ''));
  
    const [rawMetadata, ...bodyParts] = content.split('---').filter(Boolean);
    const metadata = Object.fromEntries(
      rawMetadata.trim().split('\n').map(line => {
        const [key, ...rest] = line.split(':');
        return [key.trim(), rest.join(':').trim().replace(/^"|"$/g, '')];
      })
    );
  
    const body = bodyParts.join('---').trim();
  
    // Pre-fill form fields
    document.querySelector('input[name="title"]').value = metadata.title || '';
    document.querySelector('textarea[name="content"]').value = body || '';
    document.querySelector('input[name="author"]').value = metadata.author || '';
    document.querySelector('input[name="tags"]').value = metadata.tags || '';
    document.querySelector('input[name="image"]').value = metadata.image || '';
    document.querySelector('input[name="category"]').value = metadata.category || '';
    document.querySelector('input[name="date"]').value = metadata.date || '';
    document.querySelector('input[name="slug"]').value = metadata.slug || '';
    document.querySelector('textarea[name="description"]').value = metadata.description || '';
    document.querySelector('input[name="keywords"]').value = metadata.keywords || '';
  }
  
  // Auto-load on page ready
  document.addEventListener("DOMContentLoaded", fetchPostDetails);
  

document.getElementById('editForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  const postData = {};
  formData.forEach((value, key) => postData[key] = value);

  const authKey = postData.authKey;
  delete postData.authKey;

  try {
    const response = await fetch('/.netlify/functions/editPost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-key': authKey
      },
      body: JSON.stringify(postData)
    });

    const result = await response.json();

    if (response.ok) {
      showToast('Blog updated successfully!');
      setTimeout(() => {
        window.location.href = '/blog/posts.html';
      }, 2600);
    } else {
      showToast(result.error || 'Update failed');
    }
  } catch (err) {
    console.error(err);
    showToast('Error updating blog post');
  }
});

// Load blog data when editing
const slug = getSlugFromURL();
if (slug) {
  loadBlogData(slug);
}
