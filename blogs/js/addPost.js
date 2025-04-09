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


  const secretPassword = 'sanjupurdhani@gmail.com';

  function checkPassword() {
    const input = document.getElementById('passwordInput').value;
    if (input === secretPassword) {
      document.getElementById('blogForm').style.display = 'block';
      document.getElementById('loginBox').style.display = 'none';
      document.getElementById('pageTitle').innerText = 'Create New Blog Post';
    } else {
      alert('Incorrect password. Try again.');
    }
  }

document.getElementById('blogForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const form = new FormData(this);

    const postData = {
      title: form.get('title'),
      content: form.get('content'),
      author: form.get('author'),
      tags: form.get('tags'),
      image: form.get('image'),
      category: form.get('category'),
      date: form.get('date'),
      slug: form.get('slug'),
      description: form.get('description'),
      keywords: form.get('keywords'),
    };

    try {
      const response = await fetch('https://soulsavera.netlify.app/.netlify/functions/addPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });

      const result = await response.json();
      alert(result.message || 'Post submitted!');
    } catch (error) {
      alert('Error submitting post.');
      console.error(error);
    }
  });

  document.getElementById('imageUpload').addEventListener('change', async function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async function () {
      const base64Data = reader.result.split(',')[1]; // remove data:image/...;base64,
      const fileName = `${Date.now()}-${file.name}`;

      try {
        const res = await fetch('https://soulsavera.netlify.app/.netlify/functions/uploadImage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fileName,
            fileData: base64Data,
            mimeType: file.type
          })
        });

        const data = await res.json();
        if (res.ok) {
          document.getElementById('imageURL').value = data.url;
          document.getElementById('previewImage').src = data.url;
          document.getElementById('previewImage').style.display = 'block';
        } else {
          console.error(data);
          alert('Image upload failed.');
        }
      } catch (error) {
        console.error(error);
        alert('Error uploading image.');
      }
    };

    reader.readAsDataURL(file);
  });  