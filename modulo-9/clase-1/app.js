  // QR placeholder generado con patrón random
  const qr = document.getElementById('qr');
  for (let i = 0; i < 25; i++) {
    const c = document.createElement('div');
    c.className = 'qr-cell';
    c.style.background = Math.random() > .45 ? '#2a2a2a' : '#c8f135';
    qr.appendChild(c);
  }

  // Scroll reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));