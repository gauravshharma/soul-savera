const repo = 'gauravshharma/soul-savera';
const folder = 'posts';

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.style.visibility = 'visible';
  toast.style.opacity = '1';
  toast.style.bottom = '50px';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.bottom = '30px';
    setTimeout(() => {
      toast.style.visibility = 'hidden';
    }, 300);
  }, 2500);
}

function getSlugFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('slug');
}

async function loadBlogData(slug) {
  try {
    const url = `https://raw.githubusercontent.com/${repo}/main/${folder}/${slug}.md`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch blog post');
    const content = await res.text();

    const metadata = {};
    const lines = content.split('\n');
    let body = [];
    let inMetadata = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line === '---') {
        inMetadata = !inMetadata;
        continue;
      }

      if (inMetadata) {
        const [key, ...rest] = line.split(':');
        metadata[key.trim()] = rest.join(':').trim();
      } else {
        body.push(lines[i]);
      }
    }

    document.querySelector('input[name="title"]').value = metadata.title || '';
    document.querySelector('input[name="slug"]').value = slug;
    document.querySelector('input[name="author"]').value = metadata.author || '';
    document.querySelector('input[name="tags"]').value = metadata.tags || '';
    document.querySelector('input[name="category"]').value = metadata.category || '';
    document.querySelector('input[name="date"]').value = metadata.date || '';
    document.querySelector('input[name="image"]').value = metadata.image || '';
    document.querySelector('textarea[name="description"]').value = metadata.description || '';
    document.querySelector('input[name="keywords"]').value = metadata.keywords || '';
    document.querySelector('textarea[name="content"]').value = body.join('\n').trim();

  } catch (err) {
    console.error('Error loading post:', err);
    showToast('Could not load blog post');
  }
}

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
