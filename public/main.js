// public/main.js
document.addEventListener('click', async (e) => {
  if (e.target.matches('.like-btn')) {
    const id = e.target.dataset.id;
    try {
      const res = await fetch(`/posts/${id}/toggle-like`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        const span = e.target.querySelector('.like-count');
        if (span) span.textContent = data.likesCount;
      } else {
        console.warn('Like failed');
      }
    } catch (err) { console.error(err); }
  }
});
