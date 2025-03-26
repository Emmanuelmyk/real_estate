// Mobile Menu Toggle
document.querySelector(".menu-toggle").addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("active");
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  const navLinks = document.querySelector(".nav-links");
  const menuToggle = document.querySelector(".menu-toggle");
  if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove("active");
  }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Modal Functionality
const propertyCards = document.querySelectorAll(".property-card");
const modal = document.querySelector(".property-modal");
const modalClose = document.querySelector(".modal-close");
const thumbnails = document.querySelectorAll(".thumbnail");
const mainImage = document.querySelector(".gallery-main");

// Open modal
propertyCards.forEach((card) => {
  card.addEventListener("click", () => {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  });
});

// Close modal
modalClose.addEventListener("click", () => closeModal());
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// Thumbnail click handler
thumbnails.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    thumbnails.forEach((t) => t.classList.remove("active"));
    thumb.classList.add("active");
    mainImage.style.backgroundImage = thumb.style.backgroundImage;
  });
});

// Keyboard escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Back to Top Button
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Filter Functionality
const filterBtns = document.querySelectorAll(".filter-btn");
//   const propertyCards = document.querySelectorAll(".property-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    propertyCards.forEach((card) => {
      const matchCategory =
        category === "all" || card.dataset.category === category;
      card.style.display = matchCategory ? "block" : "none";
    });
  });
});

// Contact Button Functionality
document.querySelectorAll(".contact-btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    const phone = this.dataset.phone;
    if (this.textContent === "Contact") {
      this.textContent = phone;
      setTimeout(() => {
        this.textContent = "Contact";
      }, 5000);
    } else {
      this.textContent = "Contact";
    }
  });
});

// Initialize filter
document.querySelector(".filter-btn.active").click();
