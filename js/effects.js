
// Cria um elemento <style>
const style = document.createElement("style");
style.innerHTML = `
  /* Cursor padrão da página */
  body {
    cursor: url("source/White-Katana-cursor-SweezyCursors.cur"), auto;
  }

  /* Cursor quando passa por cima de links e botões */
  a, button {
    cursor: url("source/White-Katana-pointer-SweezyCursors (1).cur"), pointer;
  }
`;

// Adiciona no <head> da página
document.head.appendChild(style);
/* ================================
   FUNDO GLOBAL TRANSPARENTE
   (aplicado via JS em todas as páginas)
================================ */
(function() {
  const body = document.body;

  const style = document.createElement('style');
  style.innerHTML = `
    /* Loader CSS */
    .loader {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;
    }
    .loader div {
      position: absolute;
      border: 4px solid #ffd500;
      opacity: 1;
      border-radius: 70%;
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
   MÚSICA DE FUNDO (persistente entre páginas)
================================ */
(function () {
  const audio = document.createElement("audio");
  audio.src = "source/musica.mp3";
  audio.loop = true;
  audio.preload = "auto";
  audio.volume = 0;

  document.body.appendChild(audio);

  // 🔁 Restaurar tempo salvo
  const savedTime = localStorage.getItem("bgMusicTime");
  if (savedTime) {
    audio.currentTime = parseFloat(savedTime);
  }

  // ▶️ Restaurar estado play/pause
  const wasPlaying = localStorage.getItem("bgMusicPlaying") === "true";

  let started = false;

  window.startBackgroundMusic = function () {
    if (started) return;
    started = true;

    audio.play().then(() => {
      localStorage.setItem("bgMusicPlaying", "true");

      // Fade-in suave
      let vol = 0;
      const target = 0.15;
      const fade = setInterval(() => {
        vol += 0.02;
        audio.volume = Math.min(vol, target);
        if (vol >= target) clearInterval(fade);
      }, 60);
    }).catch(() => {});
  };

  // ⏱️ Salvar progresso a cada 1s
  setInterval(() => {
    if (!audio.paused) {
      localStorage.setItem("bgMusicTime", audio.currentTime);
    }
  }, 1000);

  // ⏸️ Se o usuário pausar manualmente
  audio.addEventListener("pause", () => {
    localStorage.setItem("bgMusicPlaying", "false");
  });

  // 🔄 Auto-retomar se já estava tocando
  if (wasPlaying) {
    window.addEventListener("click", () => {
      window.startBackgroundMusic();
    }, { once: true });
  }
})();

/* ================================
   INICIAR MÚSICA NO PRIMEIRO MOVIMENTO DO MOUSE
================================ */
(function () {
  let activated = false;

  const startOnMouseMove = () => {
    if (activated) return;
    activated = true;

    if (typeof window.startBackgroundMusic === "function") {
      window.startBackgroundMusic();
    }

    window.removeEventListener("mousemove", startOnMouseMove);
    window.removeEventListener("touchstart", startOnMouseMove);
  };

  window.addEventListener("mousemove", startOnMouseMove, { once: true });
  window.addEventListener("touchstart", startOnMouseMove, { once: true });
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
      <p style="color:gold; margin-top:20px; font-family:sans-serif;">Loading...</p>
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
   DISCLAIMER + ToS + PRIVACIDADE (todas as páginas)
         <li><a href="/de/de-${currentPage}">🇩🇪 EN-US⏳ / EUR</a></li>
      <li><a href="/ru/ru-${currentPage}">🇷🇺 EN-US⏳ / RUB</a></li>
================================ */
(function() {
  const disclaimer = document.createElement('div');
  disclaimer.style.position = 'fixed';
  disclaimer.style.bottom = '6px';
  disclaimer.style.left = '50%';
  disclaimer.style.transform = 'translateX(-50%)';
  disclaimer.style.fontSize = '10px';
  disclaimer.style.color = 'rgba(255, 255, 255, 0.6)';
  disclaimer.style.textAlign = 'center';
  disclaimer.style.zIndex = '999';
  disclaimer.style.fontFamily = 'sans-serif';
  disclaimer.style.lineHeight = '1.3em';
  disclaimer.style.pointerEvents = 'auto';
  disclaimer.style.maxWidth = '95%';

  disclaimer.innerHTML = `
    <div>
      Este site não é oficial do <strong>Where Winds Meet</strong>. Serviço de fã e revenda de Echo Beads.
    </div>
    <div>
      Música: "An Addictive Hit Song : Way of the Sword" — Liu Siyuan / RICORAY / Niko Cat.
    </div>
    <div>
      2026© Dados técnicos básicos podem ser coletados para segurança e prevenção a fraudes.
    </div>
    <div style="margin-top:2px;">
      <a href="tos.html"
         style="text-decoration: underline; opacity:0.75; margin-right:8px;"
         onmouseover="this.style.opacity='1'"
         onmouseout="this.style.opacity='0.75'">
        Termos de Serviço
      </a>
      |
      <a href="privacidade.html"
         style="text-decoration: underline; opacity:0.75; margin-left:8px;"
         onmouseover="this.style.opacity='1'"
         onmouseout="this.style.opacity='0.75'">
        Política de Privacidade
      </a>
    </div>
  `;

  document.body.appendChild(disclaimer);
})();

document.addEventListener("DOMContentLoaded", () => {
  let currentPage = window.location.pathname.split("/").pop();

  // se estiver vazio, define como index.html
  if (!currentPage) {
    currentPage = "index.html";
  }
  
  currentPage = currentPage.replace(/^(en-|fr-|de-|ru-)/, "");
  const langContainer = document.createElement("div");
  langContainer.id = "lang-container";
  langContainer.innerHTML = `
    <button id="lang-btn">🌐</button>
    <ul id="lang-list">
      <li><a href="/${currentPage}">🇧🇷 PT-BR✅ / BRL</a></li>
      <li><a href="/en/en-${currentPage}">🇺🇸 EN-US✅ / USD</a></li>
      <li><a href="/de/de-${currentPage}">🇩🇪/🇫🇷 EN-US⏳ / EUR</a></li>
    </ul>
  `;


  // adiciona no body
  document.body.appendChild(langContainer);

  // estilo básico (pode mover para CSS se quiser)
  const style = document.createElement("style");
  style.textContent = `
    #lang-container {
      position: fixed;
      top: 10px;
      right: 10px;
      font-family: sans-serif;
      z-index: 9999;
    }
    #lang-btn {
      background: #333;
      color: #fff;
      border: none;
      padding: 6px 10px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 18px;
    }
    #lang-list {
      display: none;
      list-style: none;
      margin: 5px 0 0 0;
      padding: 0;
      background: #5858587d;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    #lang-list li {
      padding: 5px 10px;
    }
    #lang-list li a {
      text-decoration: none;
      color: #ffffff;
      font-size: 14px;
    }
    #lang-list li:hover {
      background: #ffa6006c;
    }
  `;
  document.head.appendChild(style);

  // abre/fecha lista ao clicar
  document.getElementById("lang-btn").addEventListener("click", () => {
    const list = document.getElementById("lang-list");
    list.style.display = list.style.display === "block" ? "none" : "block";
  });
});
