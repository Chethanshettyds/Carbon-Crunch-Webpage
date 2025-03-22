document.addEventListener("scroll", function () {
  requestAnimationFrame(() => {
    let parallax = document.querySelector(".parallax-image");
    let scrollY = window.scrollY;
    parallax.style.transform = `translateY(${scrollY * 0.2}px)`;
  });
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
  let currentIndex = 0;
  const totalSlides = slides.length;

  function updateSlidePosition() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  let isMouseDown = false;
  let startX = 0;

  slides.forEach((slide, index) => {
    slide.addEventListener("mousedown", (event) => {
      isMouseDown = true;
      startX = event.clientX;
    });

    slide.addEventListener("mouseup", (event) => {
      if (!isMouseDown) return;
      let endX = event.clientX;
      let diff = endX - startX;

      if (diff < -50) {
        // Move to next slide
        currentIndex = (currentIndex + 1) % totalSlides;
      } else if (diff > 50) {
        // Move to previous slide
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      }

      updateSlidePosition();
      isMouseDown = false;
    });

    slide.addEventListener("mouseleave", () => {
      isMouseDown = false;
    });
  });

  // Auto Slide Every 3 Seconds
  let autoSlide = setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlidePosition();
  }, 3000);

  // Pause Auto Slide When User Hovers Over
  track.addEventListener("mouseenter", () => clearInterval(autoSlide));
  track.addEventListener("mouseleave", () => {
    autoSlide = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlidePosition();
    }, 3000);
  });
});
