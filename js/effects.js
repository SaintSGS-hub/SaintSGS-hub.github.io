/* ================================
   ANIMAÇÃO DE ENTRADA DOS CARDS
================================ */

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("card-visible");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".product-card").forEach(card => {
  observer.observe(card);
});

/* ================================
   PROFUNDIDADE NO HOVER
================================ */

document.querySelectorAll(".product-card").forEach(card => {
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

document.addEventListener("mousemove", e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 8;
  const y = (e.clientY / window.innerHeight - 0.5) * 8;

  wrapper.style.transform = `translate(${x}px, ${y}px)`;
});

