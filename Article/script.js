//navbar
const body = document.body;
let lastScroll = 0;

window.addEventListener("scroll", function () {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    body.classList.remove("scroll-up");
  }

  if (currentScroll > lastScroll && !body.classList.contains("scroll-down")) {
    body.classList.remove("scroll-up");
    body.classList.add("scroll-down");
  }

  if (currentScroll < lastScroll && body.classList.contains("scroll-down")) {
    body.classList.remove("scroll-down");
    body.classList.add("scroll-up");
  }

  lastScroll = currentScroll;
});

// hamburger
// Add this JavaScript to handle the mobile menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const authButtons = document.querySelector(".auth-buttons");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
    authButtons.classList.toggle("active");

    // Toggle body scroll when menu is open
    if (navLinks.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  });

  // Close menu when clicking on a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      authButtons.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });
});

// Social media icon hover effects
document.querySelectorAll(".social-media img").forEach((icon) => {
  icon.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.1)";
    this.style.transition = "transform 0.3s ease";
  });

  icon.addEventListener("mouseleave", function () {
    this.style.transform = "";
  });
});

// Scroll to top button
const scrollToTopButton = document.createElement("button");
scrollToTopButton.innerHTML = "↑";
scrollToTopButton.className = "scroll-to-top";
scrollToTopButton.style.display = "none";
scrollToTopButton.style.position = "fixed";
scrollToTopButton.style.bottom = "20px";
scrollToTopButton.style.right = "20px";
scrollToTopButton.style.zIndex = "99";
scrollToTopButton.style.border = "none";
scrollToTopButton.style.outline = "none";
scrollToTopButton.style.backgroundColor = "#7b3b20";
scrollToTopButton.style.color = "white";
scrollToTopButton.style.cursor = "pointer";
scrollToTopButton.style.padding = "15px";
scrollToTopButton.style.borderRadius = "50%";
scrollToTopButton.style.fontSize = "18px";
scrollToTopButton.style.transition = "all 0.3s ease";

document.body.appendChild(scrollToTopButton);

scrollToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollToTopButton.style.display = "block";
  } else {
    scrollToTopButton.style.display = "none";
  }
});

// pop-up cart
document.addEventListener("DOMContentLoaded", function () {
  // Cart data structure
  let cart = {
    items: [],
    total: 0,
    count: 0,
  };

  // DOM elements
  const cartDropdown = document.querySelector(".cart-dropdown");
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartCount = document.querySelector(".cart-count");
  const cartTotal = document.querySelector(".cart-total");

  // Sample products data (replace with your actual products)
  const sampleProducts = [
    {
      id: 1,
      name: "Kerajinan Hias Batik",
      price: 150000,
      image: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      name: "Baju Batik Tradisional",
      price: 250000,
      image: "https://via.placeholder.com/50",
    },
    {
      id: 3,
      name: "Wayang Kulit Mini",
      price: 120000,
      image: "https://via.placeholder.com/50",
    },
  ];

  // Function to add item to cart
  function addToCart(productId, quantity = 1) {
    const product = sampleProducts.find((p) => p.id === productId);
    if (!product) return;

    const existingItem = cart.items.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
      });
    }

    updateCart();
  }

  // Function to remove item from cart
  function removeFromCart(productId) {
    cart.items = cart.items.filter((item) => item.id !== productId);
    updateCart();
  }

  // Function to update cart UI
  function updateCart() {
    // Calculate total and count
    cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cart.count = cart.items.reduce((count, item) => count + item.quantity, 0);

    // Update cart count
    cartCount.textContent = cart.count;

    // Update cart total
    cartTotal.textContent = `Rp${cart.total.toLocaleString()}`;

    // Update cart items list
    if (cart.items.length === 0) {
      cartItemsContainer.innerHTML = '<p class="empty-cart-message">Keranjang belanja kosong</p>';
    } else {
      cartItemsContainer.innerHTML = cart.items
        .map(
          (item) => `
        <div class="cart-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-item-info">
            <div class="cart-item-title">${item.name}</div>
            <div class="cart-item-price">Rp${item.price.toLocaleString()} x ${item.quantity}</div>
          </div>
          <button class="cart-item-remove" aria-label="Remove item">&times;</button>
        </div>
      `
        )
        .join("");

      // Add event listeners to remove buttons
      document.querySelectorAll(".cart-item-remove").forEach((button) => {
        button.addEventListener("click", function () {
          const itemId = parseInt(this.closest(".cart-item").dataset.id);
          removeFromCart(itemId);
        });
      });
    }
  }

  // Initialize cart
  updateCart();

  // Sample usage: Add some items to cart for demonstration
  // Remove these in production or use as examples for your actual add-to-cart buttons
  addToCart(1);
  addToCart(2, 2);
});

// 1. Animasi Scroll untuk Artikel
document.querySelectorAll(".article-card").forEach((card, index) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(card);
});

// 2. Fitur Pencarian Artikel
document.addEventListener("DOMContentLoaded", function () {
  // Tambahkan elemen pencarian jika belum ada
  if (!document.querySelector(".search-container")) {
    const searchContainer = document.createElement("div");
    searchContainer.className = "search-container";
    searchContainer.style.margin = "20px auto";
    searchContainer.style.maxWidth = "600px";
    searchContainer.style.padding = "0 5%";

    searchContainer.innerHTML = `
            <input type="text" id="article-search" placeholder="Cari artikel..." 
                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
        `;

    const articlesSection = document.querySelector(".articles");
    articlesSection.insertBefore(searchContainer, articlesSection.firstChild);

    // Fungsi pencarian
    const searchInput = document.getElementById("article-search");
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      document.querySelectorAll(".article-card").forEach((card) => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        const content = card.querySelector(".author").textContent.toLowerCase();

        if (title.includes(searchTerm) || content.includes(searchTerm)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  }
});

// 3. Fitur Bookmark Artikel
document.querySelectorAll(".article-card").forEach((card) => {
  const bookmarkBtn = document.createElement("button");
  bookmarkBtn.innerHTML = '<i class="far fa-bookmark"></i>';
  bookmarkBtn.style.position = "absolute";
  bookmarkBtn.style.top = "10px";
  bookmarkBtn.style.right = "10px";
  bookmarkBtn.style.background = "rgba(255, 255, 255, 0.8)";
  bookmarkBtn.style.border = "none";
  bookmarkBtn.style.borderRadius = "50%";
  bookmarkBtn.style.width = "30px";
  bookmarkBtn.style.height = "30px";
  bookmarkBtn.style.cursor = "pointer";
  bookmarkBtn.style.transition = "all 0.3s";

  bookmarkBtn.addEventListener("click", function () {
    this.classList.toggle("active");
    if (this.classList.contains("active")) {
      this.innerHTML = '<i class="fas fa-bookmark"></i>';
      this.style.color = "#7b3b20";
      // Simpan ke localStorage
      const articleId = card.querySelector("h3").textContent.trim();
      localStorage.setItem(`bookmark_${articleId}`, "true");
    } else {
      this.innerHTML = '<i class="far fa-bookmark"></i>';
      this.style.color = "";
      // Hapus dari localStorage
      const articleId = card.querySelector("h3").textContent.trim();
      localStorage.removeItem(`bookmark_${articleId}`);
    }
  });

  // Cek status bookmark
  const articleId = card.querySelector("h3").textContent.trim();
  if (localStorage.getItem(`bookmark_${articleId}`)) {
    bookmarkBtn.classList.add("active");
    bookmarkBtn.innerHTML = '<i class="fas fa-bookmark"></i>';
    bookmarkBtn.style.color = "#7b3b20";
  }

  card.style.position = "relative";
  card.appendChild(bookmarkBtn);
});

// 4. Fitur Bagikan Artikel
document.querySelectorAll(".article-card").forEach((card) => {
  const shareBtn = document.createElement("button");
  shareBtn.innerHTML = '<i class="fas fa-share-alt"></i>';
  shareBtn.style.position = "absolute";
  shareBtn.style.bottom = "10px";
  shareBtn.style.right = "10px";
  shareBtn.style.background = "rgba(255, 255, 255, 0.8)";
  shareBtn.style.border = "none";
  shareBtn.style.borderRadius = "50%";
  shareBtn.style.width = "30px";
  shareBtn.style.height = "30px";
  shareBtn.style.cursor = "pointer";

  shareBtn.addEventListener("click", function () {
    const title = card.querySelector("h3").textContent;
    const url = window.location.href;

    if (navigator.share) {
      navigator
        .share({
          title: title,
          url: url,
        })
        .catch((err) => {
          console.log("Error sharing:", err);
        });
    } else {
      // Fallback untuk browser yang tidak mendukung Web Share API
      const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
      window.open(shareUrl, "_blank");
    }
  });

  card.appendChild(shareBtn);
});

// 5. Load More Articles (jika diperlukan)
const loadMoreBtn = document.createElement("button");
loadMoreBtn.textContent = "Muat Lebih Banyak";
loadMoreBtn.style.display = "block";
loadMoreBtn.style.margin = "30px auto";
loadMoreBtn.style.padding = "10px 20px";
loadMoreBtn.style.background = "#7b3b20";
loadMoreBtn.style.color = "white";
loadMoreBtn.style.border = "none";
loadMoreBtn.style.borderRadius = "4px";
loadMoreBtn.style.cursor = "pointer";

document.querySelector(".articles").appendChild(loadMoreBtn);

loadMoreBtn.addEventListener("click", function () {
  // Simulasi load lebih banyak artikel
  this.textContent = "Memuat...";
  setTimeout(() => {
    // Di sini Anda bisa menambahkan logika AJAX untuk memuat lebih banyak artikel
    this.textContent = "Muat Lebih Banyak";
    alert('Fitur "Muat Lebih Banyak" akan memuat artikel tambahan dari server.');
  }, 1000);
});

// 7. Tooltip untuk Ikon
document.querySelectorAll("[aria-label]").forEach((element) => {
  element.addEventListener("mouseenter", function () {
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.textContent = this.getAttribute("aria-label");
    tooltip.style.position = "absolute";
    tooltip.style.background = "#333";
    tooltip.style.color = "#fff";
    tooltip.style.padding = "5px 10px";
    tooltip.style.borderRadius = "4px";
    tooltip.style.fontSize = "12px";
    tooltip.style.zIndex = "1000";
    tooltip.style.top = this.offsetTop - 30 + "px";
    tooltip.style.left = this.offsetLeft + this.offsetWidth / 2 - tooltip.offsetWidth / 2 + "px";

    document.body.appendChild(tooltip);

    this.addEventListener("mouseleave", function () {
      tooltip.remove();
    });
  });
});

// 8. Animasi Hover untuk Footer Links
document.querySelectorAll(".footer-section ul li a").forEach((link) => {
  link.addEventListener("mouseenter", function () {
    this.style.transform = "translateX(5px)";
    this.style.transition = "transform 0.3s ease";
  });

  link.addEventListener("mouseleave", function () {
    this.style.transform = "";
  });
});
