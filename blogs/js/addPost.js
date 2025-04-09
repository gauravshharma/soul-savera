document.getElementById("postForm").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const form = e.target;
    const formData = new FormData(form);
  
    const post = {
      title: formData.get("title"),
      content: formData.get("content"),
      author: formData.get("author"),
      tags: formData.get("tags"),
      image: formData.get("image"),
      category: formData.get("category"),
      date: formData.get("date"),
      slug: formData.get("slug"),
      description: formData.get("description"),
      keywords: formData.get("keywords"),
    };
  
    const secret = localStorage.getItem("blog-auth");
  
    const response = await fetch("../../netlify/functions/addPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secret}`
      },
      body: JSON.stringify(post)
    });
  
    const result = await response.json();
  
    const toast = document.getElementById("toast");
    toast.textContent = result.message;
    toast.style.display = "block";
  
    if (response.ok) {
      form.reset();
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 2000);
    }
  });
  