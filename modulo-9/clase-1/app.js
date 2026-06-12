  // Variable editable para el enlace del código QR
  const qrLink = "https://susitio.cl";

  // Generar el código QR real
  const qr = document.getElementById('qr');
  if (qr) {
    qr.innerHTML = '';
    qr.className = ''; // Removemos la clase qr-placeholder para evitar el grid
    qr.style.display = 'block';
    qr.style.width = '70px';
    qr.style.height = '70px';

    // Enlace para hacer clic sobre el QR
    const qrAnchor = document.createElement('a');
    qrAnchor.href = qrLink;
    qrAnchor.target = "_blank";
    qrAnchor.rel = "noopener noreferrer";
    qrAnchor.style.display = 'block';
    qrAnchor.style.width = '100%';
    qrAnchor.style.height = '100%';

    // Imagen del QR con los colores del sitio (#c8f135 y #1a1a1a)
    const qrImg = document.createElement('img');
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=70x70&data=${encodeURIComponent(qrLink)}&color=c8f135&bgcolor=1a1a1a&margin=0`;
    qrImg.alt = "Código QR - " + qrLink;
    qrImg.style.width = '100%';
    qrImg.style.height = '100%';
    qrImg.style.display = 'block';
    qrImg.style.borderRadius = '4px';

    qrAnchor.appendChild(qrImg);
    qr.appendChild(qrAnchor);
  }

  // Scroll reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));