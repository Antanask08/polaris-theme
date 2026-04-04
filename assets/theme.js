/**
 * Polaris Car Care — theme.js
 * Global JavaScript for Polaris Shopify theme.
 * Vanilla JS only — no jQuery.
 */

(function () {
  'use strict';

  /* =========================================================
   * 1. ANNOUNCEMENT BAR
   * Fixed at top, always visible. No scroll behavior.
   * ========================================================= */


  /* =========================================================
   * 2. HEADER SCROLL BEHAVIOR
   * Homepage: transparent → scrolled after 80px.
   * Other pages: always scrolled.
   * ========================================================= */
  (function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const isHomepage = document.body.classList.contains('template-index');

    if (!isHomepage) {
      header.classList.add('header-scrolled');
      return;
    }

    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
      if (window.scrollY > 80) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
      ticking = false;
    }

    function onScroll() {
      lastScrollY = window.scrollY;
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }

    // Set initial state
    updateHeader();
    window.addEventListener('scroll', onScroll, { passive: true });
  })();


  /* =========================================================
   * 3. MOBILE NAV DRAWER
   * Hamburger opens drawer, close/overlay/ESC closes it.
   * ========================================================= */
  (function initMobileNav() {
    const hamburger = document.querySelector('.hamburger-btn');
    const drawer    = document.querySelector('.nav-drawer');
    const overlay   = document.querySelector('.nav-overlay');
    const closeBtn  = document.querySelector('.drawer-close');

    if (!hamburger || !drawer) return;

    function openDrawer() {
      drawer.classList.add('is-open');
      if (overlay) overlay.classList.add('is-open');
      document.body.classList.add('no-scroll');
    }

    function closeDrawer() {
      drawer.classList.remove('is-open');
      if (overlay) overlay.classList.remove('is-open');
      document.body.classList.remove('no-scroll');
    }

    hamburger.addEventListener('click', openDrawer);

    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (overlay)  overlay.addEventListener('click', closeDrawer);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });
  })();


  /* =========================================================
   * 4. INTERSECTION OBSERVER — FADE-IN ELEMENTS
   * Adds 'is-visible' once element enters viewport (once only).
   * ========================================================= */
  (function initFadeIn() {
    const elements = document.querySelectorAll('.fade-in');
    if (!elements.length) return;

    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(function (el) { observer.observe(el); });
  })();


  /* =========================================================
   * 5. PARALLAX ON HERO SECTIONS
   * Translates .hero-parallax at 0.5x scroll speed (desktop only).
   * ========================================================= */
  (function initParallax() {
    const parallaxEls = document.querySelectorAll('.hero-parallax');
    if (!parallaxEls.length) return;

    let ticking = false;

    function applyParallax() {
      if (window.innerWidth <= 768) {
        // Reset on mobile
        parallaxEls.forEach(function (el) {
          el.style.transform = '';
        });
        ticking = false;
        return;
      }

      const scrollY = window.scrollY;
      parallaxEls.forEach(function (el) {
        el.style.transform = 'translateY(' + (scrollY * 0.5) + 'px)';
      });
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(applyParallax);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  })();


  /* =========================================================
   * 6. CART DRAWER — AJAX CART SYSTEM
   * ========================================================= */
  (function initCartDrawer() {
    const cartDrawer  = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartBody    = cartDrawer ? cartDrawer.querySelector('.cart-body') : null;
    const cartClose   = cartDrawer ? cartDrawer.querySelector('.cart-close') : null;

    if (!cartDrawer) return;

    // --- Helpers ---

    /**
     * formatMoney: converts Shopify cents integer to "$XX.XX" string.
     */
    function formatMoney(cents) {
      return '$' + (cents / 100).toFixed(2);
    }

    // --- Drawer open/close ---

    function openCartDrawer() {
      cartDrawer.classList.add('is-open');
      if (cartOverlay) cartOverlay.classList.add('is-open');
      document.body.classList.add('no-scroll');
    }

    function closeCartDrawer() {
      cartDrawer.classList.remove('is-open');
      if (cartOverlay) cartOverlay.classList.remove('is-open');
      document.body.classList.remove('no-scroll');
    }

    if (cartClose)   cartClose.addEventListener('click', closeCartDrawer);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCartDrawer);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeCartDrawer();
    });

    // --- Cart count badge ---

    function updateCartCount(count) {
      document.querySelectorAll('[data-cart-count]').forEach(function (el) {
        el.textContent = count;
        el.style.display = count > 0 ? '' : 'none';
      });
    }

    // --- Fetch cart from Shopify ---

    function fetchCart() {
      return fetch('/cart.js', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
      }).then(function (res) {
        if (!res.ok) throw new Error('Cart fetch failed: ' + res.status);
        return res.json();
      });
    }

    // --- Render cart HTML ---

    function renderCart(cart) {
      updateCartCount(cart.item_count);

      if (!cartBody) return;

      if (cart.item_count === 0) {
        cartBody.innerHTML = [
          '<div class="cart-empty">',
          '  <div class="cart-empty-icon">',
          '    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">',
          '      <circle cx="9" cy="21" r="1"></circle>',
          '      <circle cx="20" cy="21" r="1"></circle>',
          '      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>',
          '    </svg>',
          '  </div>',
          '  <div class="cart-empty-text">YOUR CART IS EMPTY</div>',
          '  <a href="/collections/all" class="cart-checkout-btn">SHOP THE NOVA &rarr;</a>',
          '</div>'
        ].join('\n');
        return;
      }

      var itemsHTML = cart.items.map(function (item) {
        var variantHTML = (item.variant_title && item.variant_title !== 'Default Title')
          ? '<div class="cart-item-variant">' + item.variant_title + '</div>'
          : '';

        return [
          '<div class="cart-item" data-key="' + item.key + '">',
          '  <div class="cart-item-image">',
          '    <img src="' + item.image + '" alt="' + item.title + '" width="80" height="80">',
          '  </div>',
          '  <div class="cart-item-details">',
          '    <div class="cart-item-title">' + item.title + '</div>',
          variantHTML,
          '    <div class="cart-item-price">' + formatMoney(item.final_price) + '</div>',
          '    <div class="cart-item-qty">',
          '      <button class="qty-btn qty-minus" data-key="' + item.key + '" data-qty="' + (item.quantity - 1) + '">\u2212</button>',
          '      <span class="qty-display">' + item.quantity + '</span>',
          '      <button class="qty-btn qty-plus" data-key="' + item.key + '" data-qty="' + (item.quantity + 1) + '">+</button>',
          '    </div>',
          '    <button class="cart-item-remove" data-key="' + item.key + '">Remove</button>',
          '  </div>',
          '</div>'
        ].join('\n');
      }).join('\n');

      var footerHTML = [
        '<div class="cart-items">' + itemsHTML + '</div>'
      ].join('\n');

      cartBody.innerHTML = footerHTML;

      // Render footer separately (outside cart-body scroll area)
      var cartFooter = cartDrawer.querySelector('.cart-footer');
      if (cartFooter) {
        cartFooter.innerHTML = [
          '<div class="cart-subtotal-row">',
          '  <span class="cart-subtotal-label">Subtotal</span>',
          '  <span class="cart-subtotal-price">' + formatMoney(cart.total_price) + '</span>',
          '</div>',
          '<div class="cart-shipping-note">FREE SHIPPING INCLUDED</div>',
          '<a href="/checkout" class="cart-checkout-btn">CHECKOUT</a>'
        ].join('\n');
      }
    }

    // --- Add to cart ---

    function addToCart(variantId, quantity) {
      quantity = quantity || 1;
      var formData = new FormData();
      formData.append('id', variantId);
      formData.append('quantity', quantity);

      return fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      }).then(function (res) {
        if (!res.ok) return res.json().then(function (err) { throw new Error(err.description || 'Add to cart failed'); });
        return res.json();
      }).then(function () {
        return fetchCart();
      }).then(function (cart) {
        renderCart(cart);
        openCartDrawer();
        return cart;
      });
    }

    // --- Update cart item quantity ---

    function updateCartItem(key, quantity) {
      return fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ id: key, quantity: quantity })
      }).then(function (res) {
        if (!res.ok) throw new Error('Cart update failed: ' + res.status);
        return res.json();
      }).then(function (cart) {
        renderCart(cart);
        return cart;
      });
    }

    // --- Remove cart item ---

    function removeCartItem(key) {
      return updateCartItem(key, 0);
    }

    // --- Event delegation inside cart drawer ---

    cartDrawer.addEventListener('click', function (e) {
      // Quantity buttons
      var qtyBtn = e.target.closest('.qty-btn');
      if (qtyBtn) {
        var key = qtyBtn.getAttribute('data-key');
        var qty = parseInt(qtyBtn.getAttribute('data-qty'), 10);
        if (!isNaN(qty)) updateCartItem(key, qty);
        return;
      }

      // Remove button
      var removeBtn = e.target.closest('.cart-item-remove');
      if (removeBtn) {
        var removeKey = removeBtn.getAttribute('data-key');
        removeCartItem(removeKey);
        return;
      }
    });

    // --- Custom events ---

    // 'cart:open' → open drawer and refresh
    document.addEventListener('cart:open', function () {
      fetchCart().then(function (cart) {
        renderCart(cart);
        openCartDrawer();
      });
    });

    // 'cart:add' → add item
    document.addEventListener('cart:add', function (e) {
      if (e.detail && e.detail.variantId) {
        addToCart(e.detail.variantId);
      }
    });

    // Initialise count on load
    fetchCart().then(function (cart) {
      updateCartCount(cart.item_count);
    }).catch(function () {
      // Silently fail — not logged in / no cart
    });

    // Expose helpers globally for ATC buttons and sticky bar
    window.PolarisCart = {
      addToCart: addToCart,
      openCartDrawer: openCartDrawer,
      closeCartDrawer: closeCartDrawer,
      fetchCart: fetchCart,
      renderCart: renderCart
    };
  })();


  /* =========================================================
   * 7. ADD TO CART BUTTONS (.btn-atc)
   * Reads data-variant-id, calls addToCart, shows loading state.
   * ========================================================= */
  (function initATCButtons() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.btn-atc');
      if (!btn) return;

      var variantId = btn.getAttribute('data-variant-id');
      if (!variantId) return;

      // Loading state
      var originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'ADDING…';
      btn.classList.add('is-loading');

      if (window.PolarisCart) {
        window.PolarisCart.addToCart(variantId, 1).then(function () {
          btn.disabled = false;
          btn.textContent = originalText;
          btn.classList.remove('is-loading');
          // Cart drawer is opened inside addToCart, but dispatch event too
          document.dispatchEvent(new CustomEvent('cart:open'));
        }).catch(function (err) {
          btn.disabled = false;
          btn.textContent = originalText;
          btn.classList.remove('is-loading');
          console.error('[Polaris] Add to cart error:', err);
        });
      }
    });
  })();


  /* =========================================================
   * 8. EMAIL POPUP
   * Shown after 4s delay or exit intent. Reveals the master
   * discount code NOVA-X7K4M via typewriter animation.
   * Copies code to clipboard.
   * ========================================================= */
  (function initEmailPopup() {
    var popup        = document.getElementById('email-popup');
    var popupOverlay = document.getElementById('popup-overlay');
    var closeBtn     = document.getElementById('popup-close');
    var form         = popup ? popup.querySelector('form') : null;
    var copyBtn      = document.getElementById('copy-code');

    if (!popup) return;

    // Don't show on cart or checkout
    var path = window.location.pathname;
    if (path === '/cart' || path.indexOf('/checkout') === 0) return;

    // sessionStorage: clears when tab closes, so popup shows again next session
    var SESSION_KEY   = 'polaris_popup_seen';
    var DISCOUNT_CODE = 'POLARIS10';
    var shown = false;

    function typewriterReveal(targetEl, text, intervalMs) {
      intervalMs = intervalMs || 80;
      var index = 0;
      targetEl.textContent = '';
      var interval = setInterval(function () {
        targetEl.textContent += text[index];
        index++;
        if (index >= text.length) clearInterval(interval);
      }, intervalMs);
    }

    function showPopup() {
      if (shown) return;
      shown = true;
      popup.classList.add('is-open');
      if (popupOverlay) popupOverlay.classList.add('is-open');
    }

    function closePopup() {
      popup.classList.remove('is-open');
      if (popupOverlay) popupOverlay.classList.remove('is-open');
      try { sessionStorage.setItem(SESSION_KEY, 'true'); } catch (e) {}
    }

    if (closeBtn)     closeBtn.addEventListener('click', closePopup);
    if (popupOverlay) popupOverlay.addEventListener('click', closePopup);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && popup.classList.contains('is-open')) closePopup();
    });

    // --- Show discount code if returning from successful form POST ---
    if (localStorage.getItem('polaris_popup_submitted') === '1') {
      localStorage.removeItem('polaris_popup_submitted');
      var formWrap    = document.getElementById('popup-form-wrap');
      var successWrap = document.getElementById('popup-success');
      var codeDisplay = document.getElementById('popup-code-display');
      if (formWrap)    formWrap.style.display = 'none';
      if (successWrap) successWrap.style.display = 'block';
      if (codeDisplay) typewriterReveal(codeDisplay, DISCOUNT_CODE, 80);
      if (copyBtn)     copyBtn.setAttribute('data-code', DISCOUNT_CODE);
      showPopup();
    } else {
      // Normal flow: show after delay if not seen this session
      var alreadySeen = false;
      try { alreadySeen = sessionStorage.getItem(SESSION_KEY) === 'true'; } catch (e) {}

      if (!alreadySeen) {
        setTimeout(showPopup, 4000);
        document.addEventListener('mouseleave', function (e) {
          if (window.innerWidth > 768 && e.clientY < 10) showPopup();
        });
      }
    }

    // --- Form submit: set flag then let Shopify handle POST ---
    if (form) {
      form.addEventListener('submit', function () {
        var emailInput = form.querySelector('input[type="email"]');
        if (emailInput && emailInput.value.trim()) {
          localStorage.setItem('polaris_popup_submitted', '1');
        }
      });
    }

    // --- Copy button ---
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        var code = copyBtn.getAttribute('data-code') || DISCOUNT_CODE;
        if (navigator.clipboard && code) {
          navigator.clipboard.writeText(code).then(function () {
            var orig = copyBtn.textContent;
            copyBtn.textContent = 'COPIED \u2713';
            setTimeout(function () { copyBtn.textContent = orig; }, 2000);
          }).catch(function () {});
        }
      });
    }
  })();


  /* =========================================================
   * 9. STICKY MOBILE ATC BAR (product page)
   * Shows #sticky-atc when #main-atc-btn scrolls out of view.
   * Mobile only (≤ 768px).
   * ========================================================= */
  (function initStickyATC() {
    var mainBtn   = document.getElementById('main-atc-btn');
    var stickyBar = document.getElementById('sticky-atc');

    if (!mainBtn || !stickyBar) return;

    var observer = new IntersectionObserver(function (entries) {
      if (window.innerWidth > 768) return;

      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          stickyBar.classList.remove('is-visible');
        } else {
          stickyBar.classList.add('is-visible');
        }
      });
    }, { threshold: 0 });

    observer.observe(mainBtn);

    // Sticky ATC button click
    var stickyBtn = stickyBar.querySelector('.btn-atc, [data-variant-id]');
    if (stickyBtn) {
      stickyBtn.addEventListener('click', function () {
        var variantId = stickyBtn.getAttribute('data-variant-id')
          || (mainBtn && mainBtn.getAttribute('data-variant-id'));
        if (variantId && window.PolarisCart) {
          var orig = stickyBtn.textContent;
          stickyBtn.disabled = true;
          stickyBtn.textContent = 'ADDING…';
          window.PolarisCart.addToCart(variantId, 1).then(function () {
            stickyBtn.disabled = false;
            stickyBtn.textContent = orig;
          }).catch(function () {
            stickyBtn.disabled = false;
            stickyBtn.textContent = orig;
          });
        }
      });
    }

    // Re-evaluate on resize
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) {
        stickyBar.classList.remove('is-visible');
      }
    });
  })();


  /* =========================================================
   * 10. PRODUCT PAGE IMAGE GALLERY
   * Thumbnail clicks swap main image with fade transition.
   * ========================================================= */
  (function initProductGallery() {
    var mainImage = document.querySelector('.product-main-image');
    var thumbs    = document.querySelectorAll('.product-thumb');

    if (!mainImage || !thumbs.length) return;

    thumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        var newSrc = thumb.getAttribute('data-src') || thumb.src || (thumb.querySelector('img') && thumb.querySelector('img').src);
        if (!newSrc || newSrc === mainImage.src) return;

        // Remove active state from all thumbs
        thumbs.forEach(function (t) { t.classList.remove('is-active'); });
        thumb.classList.add('is-active');

        // Fade out
        mainImage.style.transition = 'opacity 200ms ease';
        mainImage.style.opacity = '0';

        setTimeout(function () {
          mainImage.src = newSrc;
          // Fade in
          mainImage.style.opacity = '1';
        }, 200);
      });
    });
  })();


  /* =========================================================
   * 11. FAQ ACCORDION
   * Toggle open/close with max-height animation and chevron rotate.
   * ========================================================= */
  (function initFAQ() {
    var questions = document.querySelectorAll('.faq-question');
    if (!questions.length) return;

    questions.forEach(function (question) {
      question.addEventListener('click', function () {
        var item   = question.closest('.faq-item');
        var answer = item ? item.querySelector('.faq-answer') : null;
        var icon   = item ? item.querySelector('.faq-icon') : null;

        if (!item) return;

        var isOpen = item.classList.contains('is-open');

        // Close all items
        document.querySelectorAll('.faq-item.is-open').forEach(function (openItem) {
          openItem.classList.remove('is-open');
          var ans = openItem.querySelector('.faq-answer');
          var ico = openItem.querySelector('.faq-icon');
          if (ans) ans.style.maxHeight = '0';
          if (ico) ico.style.transform = 'rotate(0deg)';
        });

        // Open clicked (if it was closed)
        if (!isOpen) {
          item.classList.add('is-open');
          if (answer) answer.style.maxHeight = '500px';
          if (icon)   icon.style.transform   = 'rotate(180deg)';
        }
      });
    });
  })();

})();
