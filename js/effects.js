/* ================================
   FUNDO GLOBAL TRANSPARENTE
   (aplicado via JS em todas as páginas)
================================ */
(function() {
  const body = document.body;

  const style = document.createElement('style');
  style.innerHTML = `
    body::before {
      content: "";
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background:
        radial-gradient(circle at top, rgba(255, 200, 0, 0.04), transparent 60%),
        url('img/fundo.png') center center / cover no-repeat;
      opacity: 0.25; /* ajuste a transparência aqui */
      z-index: -1;
      pointer-events: none;
    }

    /* Loader CSS */
    .loader {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;
    }
    .loader div {
      position: absolute;
      border: 4px solid #f3f3f3;
      opacity: 1;
      border-radius: 50%;
      animation: loaderAnim 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }
    .loader div:nth-child(2) { animation-delay: -0.5s; }
    @keyframes loaderAnim {
      0% { top: 36px; left: 36px; width: 0; height: 0; opacity: 1; }
      100% { top: 0px; left: 0px; width: 72px; height: 72px; opacity: 0; }
    }
  `;
  document.head.appendChild(style);
})();

/* ================================
   MÚSICA DE FUNDO (autoplay silencioso inicial)
================================ */
(function() {
  const audio = document.createElement('audio');
  audio.src = 'source/musica.mp3'; // Coloque aqui o arquivo de música na pasta source
  audio.loop = true;
  audio.volume = 0; // começa mudo
  audio.autoplay = true;
  audio.play().catch(() => {});

  document.body.appendChild(audio);

  // Após 500ms, aumenta o volume
  setTimeout(() => {
    audio.volume = 0.15;
  }, 500);
})();

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

/* ================================
   DISCLAIMER E CRÉDITOS (todas as páginas)
================================ */
(function() {
  const disclaimer = document.createElement('div');
  disclaimer.style.position = 'fixed';
  disclaimer.style.bottom = '4px';
  disclaimer.style.left = '50%';
  disclaimer.style.transform = 'translateX(-50%)';
  disclaimer.style.fontSize = '10px';
  disclaimer.style.color = 'rgba(255, 255, 255, 0.6)';
  disclaimer.style.textAlign = 'center';
  disclaimer.style.zIndex = '999';
  disclaimer.style.fontFamily = 'sans-serif';
  disclaimer.style.pointerEvents = 'none';
  disclaimer.style.lineHeight = '1.2em';
  disclaimer.innerHTML = `
    Este site não é oficial do <strong>Where Winds Meet</strong>. Serviço de fã e revenda de Echo Beads.<br>
    Música de fundo: "An Addictive Hit Song :Way of the Sword" por Liu Siyuan / RICORAY / Niko Cat - Em todas as plataformas digitais.
  `;
  document.body.appendChild(disclaimer);
})();
