document.addEventListener("scroll", function () {
  let parallax = document.querySelector(".parallax-image");
  let scrollY = window.scrollY;
  parallax.style.transform = `translateY(${scrollY * 0.3}px)`; // ✅ Corrected
});

// Highlight active feature on hover
document.querySelectorAll(".feature-box").forEach((box) => {
  box.addEventListener("mouseenter", () => {
    document.querySelectorAll(".feature-box").forEach((b) => b.classList.remove("active"));
    box.classList.add("active");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".slider-track");
  const slides = document.querySelectorAll(".stat-box");
  const prevButton = document.querySelector(".prev-btn");
  const nextButton = document.querySelector(".next-btn");
  
  let currentIndex = 0;
  const totalSlides = slides.length;

  function updateSlidePosition() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`; // ✅ Corrected
  }

  nextButton.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlidePosition();
  });

  prevButton.addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlidePosition();
  });

  // ✅ Auto Slide Every 3 Seconds (Only If User Isn't Hovering)
  let autoSlide = setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlidePosition();
  }, 3000);

  // ✅ Pause Auto Slide When User Hovers Over
  track.addEventListener("mouseenter", () => clearInterval(autoSlide));
  track.addEventListener("mouseleave", () => {
    autoSlide = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlidePosition();
    }, 3000);
  });
});
