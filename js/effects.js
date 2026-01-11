/* ================================
   LOADING ANIMADO PARA BOTÕES DE PAGAMENTO
================================ */
document.querySelectorAll('.btn-comprar, .btn-confirmar').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const url = btn.getAttribute('href');

    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.85)';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '9999';
    overlay.innerHTML = `
      <div class="loader">
        <div></div><div></div><div></div><div></div>
      </div>
      <p style="color:white; margin-top:20px; font-family:sans-serif;">Carregando...</p>
    `;
    document.body.appendChild(overlay);

    setTimeout(() => {
      window.location.href = url;
    }, 1200);
  });
});

/* ================================
   ANIMAÇÃO DE ENTRADA DOS CARDS
================================ */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("card-visible");
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".product-card").forEach(card => observer.observe(card));

/* ================================
   HOVER PROFUNDIDADE E PARALLAX
================================ */
document.querySelectorAll(".product-card, .card-depth").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;

    card.style.transform = `
      perspective(800px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-6px)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = `
      perspective(800px)
      rotateX(0)
      rotateY(0)
      translateY(0)
    `;
  });
});

/* ================================
   PARALLAX GLOBAL SUAVE
================================ */
const wrapper = document.getElementById("parallax-wrapper");
if (wrapper) {
  document.addEventListener("mousemove", e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 8;
    const y = (e.clientY / window.innerHeight - 0.5) * 8;
    wrapper.style.transform = `translate(${x}px, ${y}px)`;
  });
}

/* ================================
   MOBILE-FRIENDLY
================================ */
if (window.matchMedia("(max-width: 640px)").matches) {
  document.querySelectorAll(".product-card, .card-depth").forEach(card => {
    card.style.transform = "none";
  });
}
