/* ============================================
   Moroccan Family Business Website - JavaScript
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // ============================================
  // Mobile Navigation Toggle
  // ============================================
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // ============================================
  // Sticky Navbar on Scroll
  // ============================================
  const navbar = document.getElementById("navbar");
  let lastScroll = 0;

  window.addEventListener("scroll", function () {
    const currentScroll = window.pageYOffset;

    // Add scrolled class when scrolling down
    if (currentScroll > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
  });

  // ============================================
  // Intersection Observer for Fade-in Animations
  // ============================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Observe category cards
  const categoryCards = document.querySelectorAll(".category-card");
  categoryCards.forEach((card) => {
    observer.observe(card);
  });

  // Observe product cards with staggered animation
  const productCards = document.querySelectorAll(".product-card");
  productCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
  });

  // ============================================
  // Back to Top Button
  // ============================================
  const backToTopBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 500) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // ============================================
  // Active Navigation Link Highlighting
  // ============================================
  const sections = document.querySelectorAll("section[id]");

  function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute("id");
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove("active"));
        if (navLink) {
          navLink.classList.add("active");
        }
      }
    });
  }

  window.addEventListener("scroll", highlightNavigation);

  // ============================================
  // Smooth Scroll Enhancement
  // ============================================
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Only handle internal links
      if (href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          const navbarHeight = navbar.offsetHeight;
          const targetPosition = targetSection.offsetTop - navbarHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // ============================================
  // Add Entrance Animations on Load
  // ============================================
  const heroElements = document.querySelectorAll(".hero-content > *");
  heroElements.forEach((element, index) => {
    setTimeout(() => {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, index * 200);
  });

  // ============================================
  // Parallax Effect for Hero Section (subtle)
  // ============================================
  const hero = document.querySelector(".hero");

  window.addEventListener("scroll", function () {
    if (window.pageYOffset < window.innerHeight) {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.5;
      hero.style.transform = `translateY(${parallax}px)`;
    }
  });

  // ============================================
  // Product Card Hover Effect Enhancement
  // ============================================
  productCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // ============================================
  // Category Cards Interactive Tilt Effect
  // ============================================
  categoryCards.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
    });
  });

  // ============================================
  // Loading Animation (optional)
  // ============================================
  window.addEventListener("load", function () {
    document.body.style.opacity = "0";
    setTimeout(() => {
      document.body.style.transition = "opacity 0.5s ease";
      document.body.style.opacity = "1";
    }, 100);
  });

  // ============================================
  // Lazy Loading Images
  // ============================================
  const images = document.querySelectorAll("img[src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = "0";
        img.style.transition = "opacity 0.5s ease";

        img.onload = function () {
          img.style.opacity = "1";
        };

        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => {
    imageObserver.observe(img);
  });

  // ============================================
  // Console Welcome Message
  // ============================================
  console.log(
    "%c مرحبا بكم في منتوجات البيت! ",
    "background: #D4772F; color: white; font-size: 20px; padding: 10px;"
  );
  console.log(
    "%c تم التطوير بعناية من أجل عملك ",
    "color: #6B4423; font-size: 14px;"
  );
});

// ============================================
// WhatsApp Order Function
// ============================================
function orderProduct(productName) {
  // WhatsApp phone number
  const phoneNumber = "212650438029";

  // Encode the message in Arabic
  const message = encodeURIComponent(
    `السلام عليكم، بغيت نطلب هاد المنتوج: ${productName}`
  );

  // Create WhatsApp URL
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

  // Add a subtle animation before opening WhatsApp
  const button = event.target;
  button.style.transform = "scale(0.95)";

  setTimeout(() => {
    button.style.transform = "scale(1)";
    // Open WhatsApp in a new tab
    window.open(whatsappURL, "_blank");
  }, 150);
}

// ============================================
// Scroll to Section Function
// ============================================
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  const navbar = document.getElementById("navbar");

  if (section) {
    const navbarHeight = navbar.offsetHeight;
    const targetPosition = section.offsetTop - navbarHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });

    // Add a highlight effect to the section
    section.style.animation = "none";
    setTimeout(() => {
      section.style.animation = "highlightSection 1s ease";
    }, 10);
  }
}

// Add CSS animation for section highlight (injected via JavaScript)
const style = document.createElement("style");
style.textContent = `
    @keyframes highlightSection {
        0% { background-color: transparent; }
        50% { background-color: rgba(212, 119, 47, 0.1); }
        100% { background-color: transparent; }
    }
`;
document.head.appendChild(style);

// ============================================
// Performance Optimization - Debounce Scroll Events
// ============================================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll-heavy functions
window.addEventListener(
  "scroll",
  debounce(function () {
    // Your scroll-dependent code here
  }, 10)
);

// ============================================
// Add Touch Support for Mobile Devices
// ============================================
if ("ontouchstart" in window) {
  const categoryCards = document.querySelectorAll(".category-card");

  categoryCards.forEach((card) => {
    card.addEventListener("touchstart", function () {
      this.style.transform = "scale(0.98)";
    });

    card.addEventListener("touchend", function () {
      this.style.transform = "scale(1)";
    });
  });
}

// ============================================
// Easter Egg - Konami Code (Optional Fun Feature)
// ============================================
let konamiCode = [];
const konamiSequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

document.addEventListener("keydown", function (e) {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);

  if (konamiCode.join(",") === konamiSequence.join(",")) {
    // Easter egg activated!
    document.body.style.animation = "rainbow 2s linear infinite";

    setTimeout(() => {
      document.body.style.animation = "";
      alert("🎉 شكرا على زيارتكم! 🎉");
    }, 2000);
  }
});

// Rainbow animation for Easter egg
const rainbowStyle = document.createElement("style");
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// ============================================
// Analytics Ready (placeholder)
// ============================================
function trackEvent(category, action, label) {
  // Placeholder for analytics tracking
  console.log(`Event: ${category} - ${action} - ${label}`);

  // Example: Google Analytics
  // if (typeof gtag !== 'undefined') {
  //     gtag('event', action, {
  //         'event_category': category,
  //         'event_label': label
  //     });
  // }
}

// Track button clicks
document.querySelectorAll(".whatsapp-button").forEach((button) => {
  button.addEventListener("click", function () {
    const productName =
      this.closest(".product-card").querySelector(".product-name").textContent;
    trackEvent("Product", "WhatsApp Click", productName);
  });
});

// ============================================
// Accessibility Improvements
// ============================================

// Add keyboard navigation support
document.addEventListener("keydown", function (e) {
  // Press 'Escape' to close mobile menu
  if (e.key === "Escape") {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");

    if (navMenu.classList.contains("active")) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  }
});

// Add focus visible styles dynamically
document.querySelectorAll("a, button").forEach((element) => {
  element.addEventListener("focus", function () {
    this.style.outline = "2px solid #D4772F";
    this.style.outlineOffset = "2px";
  });

  element.addEventListener("blur", function () {
    this.style.outline = "";
    this.style.outlineOffset = "";
  });
});

// ============================================
// Form Validation (if contact form is added)
// ============================================
function validateForm(formElement) {
  const inputs = formElement.querySelectorAll("input, textarea");
  let isValid = true;

  inputs.forEach((input) => {
    if (input.hasAttribute("required") && !input.value.trim()) {
      isValid = false;
      input.style.borderColor = "#C85C3E";
    } else {
      input.style.borderColor = "";
    }
  });

  return isValid;
}

// ============================================
// Print Styles (if needed)
// ============================================
window.addEventListener("beforeprint", function () {
  console.log("Preparing to print...");
  // Hide unnecessary elements before printing
  document
    .querySelectorAll(".navbar, .back-to-top, .whatsapp-button")
    .forEach((el) => {
      el.style.display = "none";
    });
});

window.addEventListener("afterprint", function () {
  console.log("Print completed");
  // Restore hidden elements
  document
    .querySelectorAll(".navbar, .back-to-top, .whatsapp-button")
    .forEach((el) => {
      el.style.display = "";
    });
});

// ============================================
// Console Footer
// ============================================
console.log(
  "%c Development Info ",
  "background: #6B4423; color: white; font-size: 12px; padding: 5px;"
);
console.log("Website: منتوجات البيت");
console.log("Version: 1.0.0");
console.log("Technology: HTML5, CSS3, Vanilla JavaScript");
