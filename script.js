/* ============================================
   TOGA WEBSITE - Complete JavaScript
   Apotek Hidup Digital | Solusi Herbal Hipertensi
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ============================================
  // 1. SCROLL PROGRESS BAR
  // ============================================
  const scrollProgress = document.getElementById('scroll-progress');

  function updateScrollProgress() {
    const scrollY = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const maxScroll = documentHeight - windowHeight;

    if (maxScroll > 0) {
      const percentage = (scrollY / maxScroll) * 100;
      scrollProgress.style.width = percentage + '%';
    }
  }

  // ============================================
  // 2. NAVBAR SCROLL EFFECT
  // ============================================
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  }

  // ============================================
  // 3. ACTIVE NAV LINK
  // ============================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sectionIds = ['beranda', 'tanaman', 'manfaat', 'olahan', 'panduan', 'tips'];

  function highlightActiveNavLink() {
    const scrollPosition = window.scrollY + 120; // offset for navbar height

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      // Check if the section ID is one of our target sections
      if (sectionIds.includes(sectionId)) {
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + sectionId) {
              link.classList.add('active');
            }
          });
        }
      }
    });
  }

  // ============================================
  // 4. HAMBURGER MENU
  // ============================================
  const hamburger = document.querySelector('.hamburger');
  const navLinksContainer = document.querySelector('.nav-links');
  const mobileOverlay = document.querySelector('.mobile-overlay');

  function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('active');

    if (mobileOverlay) {
      mobileOverlay.classList.toggle('active');
    }

    // Prevent body scroll when menu is open
    if (navLinksContainer.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  function closeMobileMenu() {
    hamburger.classList.remove('active');
    navLinksContainer.classList.remove('active');

    if (mobileOverlay) {
      mobileOverlay.classList.remove('active');
    }

    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
  }

  // Close menu when a nav link is clicked
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close menu when clicking mobile overlay
  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  // ============================================
  // 5. SMOOTH SCROLL
  // ============================================
  const NAVBAR_HEIGHT = 80;

  function initSmoothScroll() {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"], button[href^="#"]');

    smoothScrollLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        if (href && href.startsWith('#') && href.length > 1) {
          e.preventDefault();
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
            const targetPosition = targetElement.offsetTop - NAVBAR_HEIGHT;

            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth',
            });
          }
        }
      });
    });
  }

  initSmoothScroll();

  // ============================================
  // 6. SCROLL REVEAL ANIMATIONS
  // ============================================
  function initScrollReveal() {
    const revealElements = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-zoom'
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');

            // Stagger delay for grid children
            const staggerSelectors = [
              '.plant-card',
              '.benefit-card',
              '.recipe-card',
              '.care-card-mobile',
            ];

            staggerSelectors.forEach((selector) => {
              const children = entry.target.querySelectorAll(selector);
              children.forEach((child, index) => {
                child.style.transitionDelay = index * 100 + 'ms';
              });
            });

            // Unobserve after revealing (animate once)
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '-50px',
      }
    );

    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });
  }

  initScrollReveal();

  // ============================================
  // 7. FLOATING LEAVES
  // ============================================
  function initFloatingLeaves() {
    const container = document.querySelector('.floating-leaves-container');
    if (!container) return;

    const leafEmojis = ['🍃', '🌿', '☘️', '🌱', '🍀'];
    const totalLeaves = 15;

    for (let i = 0; i < totalLeaves; i++) {
      const leaf = document.createElement('span');
      leaf.classList.add('floating-leaf');

      // Random emoji
      const randomEmoji = leafEmojis[Math.floor(Math.random() * leafEmojis.length)];
      leaf.textContent = randomEmoji;

      // Random left position (0-100vw)
      const randomLeft = Math.random() * 100;
      leaf.style.left = randomLeft + 'vw';

      // Random animation duration (15-30s)
      const randomDuration = Math.random() * 15 + 15;
      leaf.style.animationDuration = randomDuration + 's';

      // Random animation delay (0-20s)
      const randomDelay = Math.random() * 20;
      leaf.style.animationDelay = randomDelay + 's';

      // Random font size (18-45px)
      const randomSize = Math.random() * 27 + 18;
      leaf.style.fontSize = randomSize + 'px';

      container.appendChild(leaf);
    }
  }

  initFloatingLeaves();

  // ============================================
  // 8. PLANT MODAL
  // ============================================
  const plantData = [
    {
      name: 'Seledri',
      image: 'assets/images/seledri.jpg',
      benefit:
        'Mengandung phthalides yang mengendurkan pembuluh darah, sehingga aliran darah lebih lancar.',
      mechanism:
        'Senyawa phthalides dalam seledri bekerja dengan cara merelaksasi otot-otot di sekitar dinding arteri, sehingga pembuluh darah melebar dan aliran darah menjadi lebih lancar. Ini membantu menurunkan tekanan darah secara alami.',
      fact: 'Seledri telah digunakan dalam pengobatan tradisional Tiongkok selama berabad-abad sebagai obat penurun tekanan darah.',
    },
    {
      name: 'Bawang Putih Tunggal',
      image: 'assets/images/bawang-putih.jpg?v=2',
      benefit:
        'Kaya allicin untuk melebarkan pembuluh darah dan mencegah kekakuan nadi.',
      mechanism:
        'Allicin yang dilepaskan saat bawang putih dihancurkan merangsang produksi hidrogen sulfida dan oksida nitrat, yang membantu merelaksasi dan melebarkan pembuluh darah, sehingga tekanan darah menurun.',
      fact: 'Bawang putih tunggal memiliki kandungan allicin yang lebih tinggi dibandingkan bawang putih biasa karena seluruh nutrisi terkonsentrasi dalam satu siung.',
    },
    {
      name: 'Rosella',
      image: 'assets/images/rosella.jpg',
      benefit:
        'Bersifat diuretik alami; sangat efektif menurunkan tekanan darah sistolik dan diastolik.',
      mechanism:
        'Rosella mengandung antosianin dan asam organik yang bekerja sebagai diuretik alami, membantu tubuh membuang kelebihan cairan dan natrium, sehingga volume darah menurun dan tekanan darah ikut turun.',
      fact: 'Penelitian menunjukkan bahwa minum teh rosella secara rutin selama 6 minggu dapat menurunkan tekanan darah sistolik secara signifikan.',
    },
    {
      name: 'Kemangi',
      image: 'assets/images/kemangi.jpg',
      benefit:
        'Mengandung eugenol yang bekerja memblokir saluran kalsium untuk merilekskan pembuluh darah.',
      mechanism:
        'Eugenol dalam kemangi bekerja sebagai penghambat saluran kalsium alami. Dengan memblokir masuknya kalsium ke sel otot polos pembuluh darah, otot-otot tersebut menjadi lebih rileks sehingga pembuluh darah melebar.',
      fact: 'Kemangi tidak hanya bermanfaat untuk tekanan darah, tetapi juga memiliki sifat antibakteri dan antiinflamasi yang mendukung kesehatan secara keseluruhan.',
    },
    {
      name: 'Sereh',
      image: 'assets/images/sereh.jpg',
      benefit:
        'Membantu ginjal membuang kelebihan garam (natrium) melalui urine, sehingga beban pembuluh darah menurun.',
      mechanism:
        'Sereh memiliki efek diuretik yang membantu ginjal meningkatkan produksi urine, sehingga kelebihan natrium dan cairan dalam tubuh berkurang. Dengan berkurangnya volume cairan, beban pada pembuluh darah menurun dan tekanan darah menjadi lebih stabil.',
      fact: 'Sereh juga mengandung citral yang memiliki efek menenangkan, membantu mengurangi stres yang merupakan salah satu faktor pemicu hipertensi.',
    },
  ];

  const plantModal = document.getElementById('plant-modal');
  const modalImg = plantModal ? plantModal.querySelector('.modal-img') : null;
  const modalTitle = plantModal ? plantModal.querySelector('.modal-title') : null;
  const modalBenefit = plantModal ? plantModal.querySelector('.modal-benefit') : null;
  const modalMechanism = plantModal ? plantModal.querySelector('.modal-mechanism') : null;
  const modalFact = plantModal ? plantModal.querySelector('.modal-fact-text') : null;
  const modalClose = plantModal ? plantModal.querySelector('.modal-close') : null;

  function openPlantModal(index) {
    if (!plantModal || index < 0 || index >= plantData.length) return;

    const plant = plantData[index];

    if (modalImg) modalImg.src = plant.image;
    if (modalImg) modalImg.alt = plant.name;
    if (modalTitle) modalTitle.textContent = plant.name;
    if (modalBenefit) modalBenefit.textContent = plant.benefit;
    if (modalMechanism) modalMechanism.textContent = plant.mechanism;
    if (modalFact) modalFact.textContent = plant.fact;

    plantModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closePlantModal() {
    if (!plantModal) return;
    plantModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Attach click listeners to plant cards
  function initPlantCards() {
    const plantCards = document.querySelectorAll('.plant-card[data-plant]');

    plantCards.forEach((card) => {
      card.addEventListener('click', () => {
        const plantIndex = parseInt(card.getAttribute('data-plant'), 10);
        openPlantModal(plantIndex);
      });
    });
  }

  initPlantCards();

  // Close modal on close button click
  if (modalClose) {
    modalClose.addEventListener('click', closePlantModal);
  }

  // Close modal on overlay click (but not on .modal-content click)
  if (plantModal) {
    plantModal.addEventListener('click', (e) => {
      // Only close if clicking directly on the overlay, not on modal content
      if (e.target === plantModal) {
        closePlantModal();
      }
    });
  }

  // ============================================
  // 9. MOUSE PARALLAX ON HERO
  // ============================================
  const heroSection = document.getElementById('beranda');
  const heroContent = heroSection ? heroSection.querySelector('.hero-content') : null;
  let parallaxRAF = null;

  function initHeroParallax() {
    if (!heroSection || !heroContent) return;

    heroSection.addEventListener('mousemove', (e) => {
      // Only apply on screens wider than 768px
      if (window.innerWidth <= 768) return;

      if (parallaxRAF) {
        cancelAnimationFrame(parallaxRAF);
      }

      parallaxRAF = requestAnimationFrame(() => {
        const rect = heroSection.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const translateX = (mouseX - centerX) / 40;
        const translateY = (mouseY - centerY) / 40;

        heroContent.style.transform =
          'translateX(' + translateX + 'px) translateY(' + translateY + 'px)';
      });
    });

    // Reset transform when mouse leaves
    heroSection.addEventListener('mouseleave', () => {
      if (parallaxRAF) {
        cancelAnimationFrame(parallaxRAF);
      }
      parallaxRAF = requestAnimationFrame(() => {
        heroContent.style.transform = 'translateX(0px) translateY(0px)';
      });
    });
  }

  initHeroParallax();

  // ============================================
  // 10. RIPPLE EFFECT
  // ============================================
  function initRippleEffect() {
    const plantCards = document.querySelectorAll('.plant-card');

    plantCards.forEach((card) => {
      card.addEventListener('click', (e) => {
        // Find or create ripple container
        let rippleContainer = card.querySelector('.ripple-container');
        if (!rippleContainer) {
          rippleContainer = document.createElement('div');
          rippleContainer.classList.add('ripple-container');
          card.appendChild(rippleContainer);
        }

        // Create ripple span
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');

        // Calculate size and position
        const cardRect = card.getBoundingClientRect();
        const size = Math.max(cardRect.width, cardRect.height) * 2;
        const x = e.clientX - cardRect.left - size / 2;
        const y = e.clientY - cardRect.top - size / 2;

        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        rippleContainer.appendChild(ripple);

        // Remove ripple after animation (600ms)
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  }

  initRippleEffect();

  // ============================================
  // 11. LAZY LOADING IMAGES
  // ============================================
  function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');

    if (lazyImages.length === 0) return;

    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const dataSrc = img.getAttribute('data-src');

            if (dataSrc) {
              img.src = dataSrc;

              img.addEventListener('load', () => {
                img.classList.add('loaded');
              });

              img.removeAttribute('data-src');
            }

            imageObserver.unobserve(img);
          }
        });
      },
      {
        rootMargin: '200px',
      }
    );

    lazyImages.forEach((img) => {
      imageObserver.observe(img);
    });
  }

  initLazyLoading();

  // ============================================
  // 12. KEYBOARD NAVIGATION
  // ============================================
  function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        // Close plant modal
        if (plantModal && plantModal.classList.contains('active')) {
          closePlantModal();
        }

        // Close mobile menu
        if (navLinksContainer && navLinksContainer.classList.contains('active')) {
          closeMobileMenu();
        }
      }
    });
  }

  initKeyboardNavigation();

  // ============================================
  // 13. COMBINED SCROLL EVENT LISTENER
  // ============================================
  // Throttle scroll events for better performance
  let scrollTicking = false;

  function onScroll() {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        updateScrollProgress();
        handleNavbarScroll();
        highlightActiveNavLink();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }

  window.addEventListener('scroll', onScroll);

  // Run scroll handlers once on page load to set initial state
  updateScrollProgress();
  handleNavbarScroll();
  highlightActiveNavLink();

  // ============================================
  // LOG: Initialization complete
  // ============================================
  console.log('🌿 TOGA Website initialized successfully.');
});
