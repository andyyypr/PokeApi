document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".flip-card").forEach((card) => {
    let currentFace = 0;
    const totalFaces = 3;

    card.addEventListener("click", function () {
      const inner = this.querySelector(".flip-card-inner");
      currentFace = (currentFace + 1) % totalFaces;
      inner.style.transform = `rotateY(${currentFace * -120}deg)`;
    });
  });
});
