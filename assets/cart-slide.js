class CartSlide extends HTMLElement {
  constructor() {
    super();
    this.timerInterval = null;
    this.reserveEndTime = null;
    this.reserveTimeRemaining = null;
    this._discountUpdateInProgress = false;
    this.setupPolicyAgreement();
  }

  connectedCallback() {
    console.log('CartSlide connected to DOM');
    this.setupListeners();
    this.refreshCart();
    this.toggleCart = this.toggleCart.bind(this);
  }

  setupListeners() {
    const closeBtn = this.querySelector('.cart-slide__close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        console.log('Close button clicked');
        this.toggleCart();
      });
    } else {
      console.warn('Close button (.cart-slide__close) not found');
    }

    const overlay = document.getElementById('cart-overlay');
    if (overlay) {
      overlay.addEventListener('click', () => {
        console.log('Overlay clicked');
        this.toggleCart();
      });
    } else {
      console.warn('Cart overlay (#cart-overlay) not found');
    }

    document.body.addEventListener('ajaxCart:added', () => {
      console.log('ajaxCart:added event triggered');
      this.toggleCart();
      this.refreshCart();
    });

    // Обработка изменения количества и аддонов
    this.addEventListener('change', (e) => {
      if (e.target.classList.contains('cart-qty-selector')) {
        const line = parseInt(e.target.getAttribute('data-line'));
        const quantity = parseInt(e.target.value);
        console.log(`Updating quantity: line ${line}, quantity ${quantity}`);
        this.updateQuantity(line, quantity);
      } else if (e.target.classList.contains('product-addons__toggle')) {
        const variantId = e.target.closest('.product-addons__item')?.dataset.variantId;
        if (variantId) {
          console.log(`Toggling addon: variantId ${variantId}, checked: ${e.target.checked}`);
          this.toggleAddon(variantId, e.target.checked);
        }
      }
    });

    // Обработка применения скидочного кода
    const discountBtn = this.querySelector('.cart-slide__btn');
    if (discountBtn) {
      discountBtn.addEventListener('click', () => {
        console.log('Discount button clicked');
        this.applyDiscount();
      });
    } else {
      console.warn('Discount button (.cart-slide__btn) not found');
    }

    // Обработка checkout
    const checkoutBtn = this.querySelector('.cart-slide__checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Checkout button clicked');
        this.handleCheckout();
      });
    } else {
      console.warn('Checkout button (.cart-slide__checkout-btn) not found');
    }
  }

  toggleCart() {
    console.log('Toggling cart');
    const overlay = document.getElementById('cart-overlay');
    if (!overlay) {
      console.error('Cannot toggle cart: #cart-overlay not found');
      return;
    }

    this.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll');

    if (this.classList.contains('active')) {
      console.log('Cart opened, refreshing');
      this.refreshCart();
      this.startReserveTimer(5 * 60);
    } else {
      console.log('Cart closed — pausing timer');
      this.pauseTimer();
    }
  }

  async refreshCart() {
    try {
      console.log('Refreshing cart');
      const response = await fetch('/cart.js');
      const cart = await response.json();
      this.updateCartUI(cart);
      this.updateGoals(cart);
    } catch (error) {
      console.error('Cart refresh failed:', error);
    }
  }

  formatMoney(cents) {
    if (typeof cents !== 'number' || isNaN(cents)) return '$0.00';
    return `$${(cents / 100).toFixed(2)}`;
  }

  updateCartUI(cart) {
    const cartItemsList = this.querySelector('.cart-items-list');
    const cartCount = this.querySelector('[data-count]');
    const cartSubtotal = this.querySelector('[data-subtotal]');
    const cartSavings = this.querySelector('[data-savings]');

    // Проверка корректности данных корзины
    if (!cart || !cart.items) {
      console.warn('Cart is empty or invalid');
      cartItemsList.innerHTML = '<li class="cart-item">Cart is empty</li>';
      cartCount.textContent = '0';
      cartSubtotal.textContent = this.formatMoney(0);
      cartSavings.textContent = this.formatMoney(0);
      return;
    }

    // Обновление количества товаров
    cartCount.textContent = cart.item_count || 0;

    // Обновление итогов (используем total_price для отображения суммы с учётом скидки)
    cartSubtotal.textContent = this.formatMoney(cart.total_price);

    // Расчет экономии (разница между compare_at_price и текущей ценой)
    let totalSavings = 0;
    cart.items.forEach(item => {
      if (item.original_price > item.final_price) {
        totalSavings += (item.original_price - item.final_price) * item.quantity;
      }
    });
    cartSavings.textContent = this.formatMoney(totalSavings);

    // Обновление списка товаров
    cartItemsList.innerHTML = '';
    cart.items.forEach((item, index) => {
      const li = document.createElement('li');
      li.classList.add('cart-item');
      li.innerHTML = `
        <div class="cart-item-image">
          <img src="${item.image || '//via.placeholder.com/100'}" alt="${item.product_title || 'Product'}">
        </div>
        <div class="cart-item-info">
          <p class="cart-item-title">${item.product_title || 'Unknown Product'}</p>
          ${item.variant_title && item.variant_title !== 'Default Title' ? `<p class="cart-item-variant">${item.variant_title}</p>` : ''}
          <div>
            <p class="cart-item-qty">Qty: 
              <select class="cart-qty-selector" data-line="${index + 1}">
                <option value="0">Delete</option>
                ${Array.from({ length: 10 }, (_, i) => i + 1).map(i => `
                  <option value="${i}" ${item.quantity === i ? 'selected' : ''}>${i}</option>
                `).join('')}
              </select>
            </p>
          </div>
        </div>
        <div class="cart-item-price">
          ${item.original_price > item.final_price ? `
            <span class="old-price">${this.formatMoney(item.original_price * item.quantity)}</span>
            <span class="new-price">${this.formatMoney(item.final_line_price)}</span>
          ` : `
            <span class="new-price">${this.formatMoney(item.final_line_price)}</span>
          `}
        </div>
      `;
      cartItemsList.appendChild(li);
    });
  }

  async updateQuantity(line, quantity) {
    try {
      console.log(`Updating quantity: line ${line}, quantity ${quantity}`);
      const response = await fetch(window.routes.cart_change_url + '.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ line, quantity })
      });
      const cart = await response.json();
      this.updateCartUI(cart);
      this.updateGoals(cart);
    } catch (error) {
      console.error('Cart update failed:', error);
    }
  }

  async toggleAddon(variantId, add) {
    try {
      console.log(`Toggling addon: variantId ${variantId}, add: ${add}`);
      if (add) {
        await fetch(window.routes.cart_add_url + '.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: [{ id: variantId, quantity: 1 }] })
        });
      } else {
        const cartResponse = await fetch('/cart.js');
        const cart = await cartResponse.json();
        const lineItem = cart.items.findIndex(item => item.variant_id == variantId) + 1;
        if (lineItem > 0) {
          await fetch(window.routes.cart_change_url + '.js', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ line: lineItem, quantity: 0 })
          });
        }
      }
      await this.refreshCart();
    } catch (error) {
      console.error('Failed to toggle addon:', error);
    }
  }

  async applyDiscount() {
    const discountInput = this.querySelector('.cart-slide__input');
    const code = discountInput.value.trim();
    if (!code) return;

    try {
      console.log(`Applying discount code: ${code}`);
      const response = await fetch(`/discount/${code}`, { method: 'POST' });
      if (response.ok) {
        await this.refreshCart();
        discountInput.value = '';
      } else {
        alert('Invalid discount code');
      }
    } catch (error) {
      console.error('Error applying discount:', error);
    }
  }

  updateGoals(cart) {
    // Используем original_total_price для UI расчётов
    const originalSubtotal = (cart.original_total_price || 0) / 100;
    // Используем total_price для логики применения скидки (если требуется)
    const subtotal = (cart.total_price || 0) / 100;
    const shipBlock = this.querySelector('[data-unlockship]:not([data-unlockdiscount])');
    const discountBlock = this.querySelector('[data-unlockdiscount][data-unlockship]');

    if (!shipBlock || !discountBlock) return;

    const unlockShip = parseFloat(shipBlock.dataset.unlockship);
    const unlockDiscount = parseFloat(discountBlock.dataset.unlockdiscount);

    // Используем originalSubtotal для расчётов UI
    const remainingShip = Math.max(0, unlockShip - originalSubtotal);
    const percentShip = Math.min(100, (originalSubtotal / unlockShip) * 100);

    const remainingDiscount = Math.max(0, unlockDiscount - originalSubtotal);
    const percentDiscount = Math.min(100, (originalSubtotal / unlockDiscount) * 100);

    const shipBar = shipBlock.querySelector('.cart-slide__progress-fill--shipping');
    const discountBar = discountBlock.querySelector('.cart-slide__progress-fill--discount');

    if (shipBar) shipBar.style.width = `${percentShip}%`;
    if (discountBar) discountBar.style.width = `${percentDiscount}%`;

    const shipText = shipBlock.querySelector('.cart-slide__text-shipping');
    if (shipText) {
      if (originalSubtotal >= unlockShip) {
        shipText.innerHTML = `<strong>✓ FREE Shipping Unlocked!</strong>`;
        shipBlock.classList.add('unlocked');
      } else {
        shipText.innerHTML = `You’re <strong>${this.formatMoney(remainingShip * 100)}</strong> away from <strong>FREE Shipping!</strong>`;
        shipBlock.classList.remove('unlocked');
      }
    }

    const discountText = discountBlock.querySelector('.cart-slide__text-discount');
    const discountPercent = discountBlock.dataset.discountpercent || '0';
    if (discountText) {
      if (originalSubtotal >= unlockDiscount) {
        discountText.innerHTML = `<strong>${discountPercent}% OFF Unlocked!</strong>`;
        discountBlock.classList.add('unlocked');
      } else {
        discountText.innerHTML = `You’re <strong>${this.formatMoney(remainingDiscount * 100)}</strong> away from <strong>Unlocking ${discountPercent}% OFF!</strong>`;
        discountBlock.classList.remove('unlocked');
      }
    }

    if (discountBlock) {
      if (originalSubtotal >= unlockShip) {
        discountBlock.classList.add('unlocked-ship');
      } else {
        discountBlock.classList.remove('unlocked-ship');
      }
    }

    // Позиционирование иконки Free Shipping
    const freeShippingLabel = discountBlock.querySelector('.cart-slide__label-freeshiping');
    const discountLabel = discountBlock.querySelector('.cart-slide__label-discount');
    const discountBarEl = discountBlock.querySelector('.cart-slide__progress-bar--discount');

    if (freeShippingLabel && discountLabel && discountBarEl) {
      const barWidth = discountBarEl.offsetWidth;
      const relativeShipPercent = unlockShip / unlockDiscount;
      const rawLeft = barWidth * relativeShipPercent;

      const discountP = discountLabel.querySelector('p');
      const shippingP = freeShippingLabel.querySelector('p');
      const discountTextW = discountP ? discountP.offsetWidth : 0;
      const shippingTextW = shippingP ? shippingP.offsetWidth : 0;

      const margin = Math.max(discountTextW, shippingTextW) + 12;
      const maxLeft = barWidth - freeShippingLabel.offsetWidth - 8;
      const safeLeft = Math.min(rawLeft - margin / 2, maxLeft);

      freeShippingLabel.style.position = 'absolute';
      freeShippingLabel.style.left = `${Math.max(safeLeft, 0)}px`;
      freeShippingLabel.style.top = '0px';
    }

    const discountCode = discountBlock.dataset.code?.toLowerCase();
    const appliedCodes = (cart.discount_codes || []).map(d => d.code.toLowerCase());
    const cartLevelApplied = appliedCodes.includes(discountCode);
    
    // Расширенная проверка, если вдруг Shopify не показал discount_codes
    const productLevelDiscountApplied = cart.items.some(item => {
      return item.original_price > item.final_price;
    });
    
    const shouldApply = originalSubtotal >= unlockDiscount && !cartLevelApplied;
    const shouldRemove = originalSubtotal < unlockDiscount && (cartLevelApplied || productLevelDiscountApplied);
    
    if (discountCode && !this._discountUpdateInProgress && (shouldApply || shouldRemove)) {
      this._discountUpdateInProgress = true;
    
      if (shouldApply) {
        this.applyDiscountViaIframe(discountCode)
          .then(() => this.refreshCart())
          .catch(err => console.error('Failed to apply discount:', err))
          .finally(() => { this._discountUpdateInProgress = false; });
    
      } else if (shouldRemove) {
        this.clearDiscountViaIframe()
          .then(() => this.refreshCart())
          .catch(err => console.error('Failed to clear discount:', err))
          .finally(() => { this._discountUpdateInProgress = false; });
      }
    }
  }

  applyDiscountViaIframe(code, attempt = 1) {
    return new Promise((resolve, reject) => {
      if (attempt > 3) {
        console.error(`🚫 Failed to apply discount "${code}" after 3 attempts.`);
        return resolve(); // не reject, чтобы не сломать цепочку
      }
  
      let iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = `/discount/${code}`;
      document.body.appendChild(iframe);
  
      console.log(`✅ Applying discount "${code}" via iframe (attempt ${attempt})`);
  
      iframe.onerror = () => {
        console.error(`Failed to apply discount "${code}"`);
        document.body.removeChild(iframe);
        reject(new Error('Failed to apply discount'));
      };
  
      setTimeout(() => {
        document.body.removeChild(iframe);
        fetch('/cart.js')
          .then(response => response.json())
          .then(cart => {
            const alreadyApplied = cart.discount_codes?.some(
              d => d.code.toLowerCase() === code.toLowerCase()
            );
            if (!alreadyApplied) {
              console.warn(`Discount "${code}" not applied, retrying...`);
              return this.applyDiscountViaIframe(code, attempt + 1)
                .then(resolve)
                .catch(reject);
            }
            resolve();
          })
          .catch(err => reject(err));
      }, 1200);
    });
  }

  clearDiscountViaIframe() {
    return new Promise((resolve, reject) => {
      let iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = `/discount/none`;
      document.body.appendChild(iframe);
  
      console.log(`🧹 Clearing discount via iframe`);
  
      setTimeout(() => {
        document.body.removeChild(iframe);
  
        fetch('/cart.js')
          .then(res => res.json())
          .then(cart => {
            const discountCodes = cart.discount_codes || [];
            if (discountCodes.length > 0) {
              console.warn('Cart-level discount still present after removal — skipping retry to prevent loop');
            }
            resolve();
          })
          .catch(err => reject(err));
      }, 1200);
    });
  }

  startReserveTimer(initialSeconds) {
    const timerElement = this.querySelector('.cart-slide__reserved strong');
    if (!timerElement) return;

    if (this.reserveTimeRemaining) {
      this.reserveEndTime = Date.now() + this.reserveTimeRemaining;
      this.reserveTimeRemaining = null;
    }

    if (!this.reserveEndTime) {
      this.reserveEndTime = Date.now() + initialSeconds * 1000;
    }

    clearInterval(this.timerInterval);

    const updateTimer = () => {
      const remaining = Math.max(0, Math.floor((this.reserveEndTime - Date.now()) / 1000));
      const minutes = String(Math.floor(remaining / 60)).padStart(2, '0');
      const secs = String(remaining % 60).padStart(2, '0');
      timerElement.textContent = `${minutes}:${secs}`;

      if (remaining <= 0) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
        this.reserveEndTime = null;
        this.clearCart();
      }
    };

    updateTimer();
    this.timerInterval = setInterval(updateTimer, 1000);
  }

  pauseTimer() {
    clearInterval(this.timerInterval);
    this.timerInterval = null;

    if (this.reserveEndTime) {
      this.reserveTimeRemaining = this.reserveEndTime - Date.now();
    }
  }

  async handleCheckout() {
    try {
      console.log('Navigating to checkout');
      window.location.href = '/checkout';
    } catch (error) {
      console.error('Checkout failed:', error);
      window.location.href = '/checkout';
    }
  }

  clearCart() {
    fetch('/cart/clear.js', { method: 'POST' })
      .then(() => {
        console.log('Cart cleared');
        this.refreshCart();
        alert('Your cart reservation expired and has been cleared.');
        this.toggleCart();
      })
      .catch(err => console.error('Failed to clear cart:', err));
  }

  setupPolicyAgreement() {
    const policyContainer = this.querySelector('.cart-slide__policy');
    const checkbox = policyContainer?.querySelector('input[type="checkbox"]');
    const checkoutBtn = this.querySelector('.cart-slide__checkout-btn');
  
    if (!policyContainer || !checkbox || !checkoutBtn) return;
  
    // Инициализация состояния
    checkoutBtn.disabled = !checkbox.checked;
  
    // Обновление при изменении чекбокса
    checkbox.addEventListener('change', () => {
      checkoutBtn.disabled = !checkbox.checked;
    });
  }
}

customElements.define('cart-slide', CartSlide);

document.addEventListener('DOMContentLoaded', () => {
  const openCartBtn = document.querySelector('.open-cart-btn');
  if (openCartBtn) {
    openCartBtn.addEventListener('click', () => {
      console.log('Open cart button clicked');
      const cart = document.getElementById('side-cart');
      if (cart && cart.toggleCart) {
        cart.toggleCart();
      } else {
        console.error('Cart element or toggleCart method not found');
      }
    });
  } else {
    console.warn('Open cart button (.open-cart-btn) not found');
  }
});