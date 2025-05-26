class customVariant extends HTMLElement {
  constructor() {
    super();
    this.selected = {};
  }

  connectedCallback() {
    this.variants = this.getJson('#json_prod_var');
    this.options = this.getJson('#json_prod_options');

    if (!this.variants || !this.options) return;

    this.setupSizeButtons();
    this.setupColorRadios();
    this.setupDropdowns();
    this.preselectColor();
    this.preselectVariantById();
  }

  getJson(selector) {
    const el = document.querySelector(selector);
    if (!el) return null;
    try {
      return JSON.parse(el.textContent);
    } catch (e) {
      console.error(`Error parsing JSON from ${selector}`, e);
      return null;
    }
  }

  setupSizeButtons() {
    this.querySelectorAll('.size-button-list .size-button').forEach(button => {
      if (button.dataset.initialized === 'true') return;
      button.dataset.initialized = 'true';

      button.addEventListener('click', () => {
        const value = button.dataset.size;
        const name = 'size';
        button.closest('.size-button-list')
          .querySelectorAll('.size-button')
          .forEach(b => b.classList.remove('active'));
        button.classList.add('active');
        this.selected[name] = value;
        this.updateSelectedVariant();
      });
    });
  }

  setupColorRadios() {
    this.querySelectorAll('input[name="option_color"]').forEach(radio => {
      if (radio.dataset.initialized === 'true') return;
      radio.dataset.initialized = 'true';

      radio.addEventListener('change', () => {
        const value = radio.value;
        const name = 'color';
        this.selected[name] = value;

        const wrapper = radio.closest('.color-circles-active');
        const labelEl = wrapper?.querySelector('.active-color');
        if (labelEl) labelEl.textContent = value;

        this.updateSelectedVariant();
      });
    });
  }

  setupDropdowns() {
    this.querySelectorAll('.custom-select').forEach(select => {
      if (select.dataset.initialized === 'true') return;
      select.dataset.initialized = 'true';

      const trigger = select.querySelector('.select-trigger');
      const options = select.querySelectorAll('.option-value');
      const optionGroup = select.closest('.option-group');
      const label = optionGroup?.querySelector('label')?.textContent?.trim();
      const optionName = label?.replace(/:$/, '');

      if (!trigger || !optionName) return;

      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        select.classList.toggle('open');
      });

      options.forEach(opt => {
        opt.addEventListener('click', () => {
          const value = opt.dataset.value;
          const optionName = opt.dataset.optionName;
          if (value && optionName) {
            trigger.innerHTML = opt.innerHTML;
            select.classList.remove('open');
            this.selected[optionName] = value;
            this.updateSelectedVariant();
          }
        });
      });

      document.addEventListener('click', (e) => {
        if (!select.contains(e.target)) {
          select.classList.remove('open');
        }
      });
    });
  }

  preselectColor() {
    const preselected = this.querySelector('input[name="option_color"]:checked');
    if (preselected) {
      preselected.dispatchEvent(new Event('change'));
    }
  }

  updateSelectedVariant() {
    const ordered = this.options.map(opt => this.selected[opt.name] || null);
    const match = this.variants.find(v => JSON.stringify(v.options) === JSON.stringify(ordered));

    if (match) {
      const variantIdEl = document.querySelector('#product-variant-id');
      if (!variantIdEl) return;
      variantIdEl.value = match.id;
      variantIdEl.dispatchEvent(new Event('change'));

      // ✅ Снять disabled, если вариант доступен
      if (match.available) {
        variantIdEl.removeAttribute('disabled');
      }

      this.updatePriceDisplay(match);
      this.updateButtonState(match);
    }
  }

  updateButtonState(variant) {
    const button = document.querySelector('button[type="submit"].submit_add_cart');
    if (!button) return;

    const svg = button.querySelector('svg');
    const svgHTML = svg ? svg.outerHTML : '';

    if (!variant.available) {
      button.setAttribute('disabled', '');
      button.innerHTML = `Sold out ${svgHTML}`;
    } else {
      button.removeAttribute('disabled');
      button.innerHTML = `Add to cart ${svgHTML}`;
    }
  }

  preselectVariantById() {
    const variantIdEl = document.querySelector('#product-variant-id');
    if (!variantIdEl) return;

    const variantId = parseInt(variantIdEl.value, 10);
    const variant = this.variants.find(v => v.id === variantId);
    if (!variant) return;

    this.options.forEach((opt, index) => {
      const optionName = opt.name;
      const optionValue = variant.options[index];
      this.selected[optionName] = optionValue;

      const radio = this.querySelector(`input[name="option_${optionName.toLowerCase()}"][value="${optionValue}"]`);
      if (radio) {
        radio.checked = true;
        radio.dispatchEvent(new Event('change'));
      }

      const sizeBtn = this.querySelector(`.size-button[data-size="${optionValue}"]`);
      if (sizeBtn) {
        sizeBtn.classList.add('active');
      }

      this.querySelectorAll('.custom-select').forEach(select => {
        const trigger = select.querySelector('.select-trigger');
        const options = select.querySelectorAll('.option-value');
        options.forEach(opt => {
          if (opt.dataset.value === optionValue) {
            trigger.innerHTML = opt.innerHTML;
          }
        });
      });
    });
  }

  updatePriceDisplay(variant) {
    const priceEl = document.querySelector('.price');
    const compareEl = document.querySelector('.cprice');
    const saveEl = document.querySelector('.priced');

    const price = variant.price;
    const compare = variant.compare_at_price;

    if (priceEl) {
      priceEl.textContent = this.formatMoney(price);
      priceEl.style.display = '';
    }

    if (compare && compare > price) {
      if (compareEl) {
        compareEl.textContent = this.formatMoney(compare);
        compareEl.style.display = '';
      }
      if (saveEl) {
        const discount = Math.round(100 - (price / compare) * 100);
        saveEl.textContent = `save ${discount}%`;
        saveEl.style.display = '';
      }
    } else {
      if (compareEl) compareEl.style.display = 'none';
      if (saveEl) saveEl.style.display = 'none';
    }
  }

  formatMoney(cents) {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(cents / 100);
  }
}

class PacSection extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.quantityInput = document.querySelector('quantity-inputs input[name="quantity"]');
    this.quantityWrapper = document.querySelector('quantity-inputs');
    
    if (this.quantityWrapper) {
      this.quantityWrapper.style.display = 'none';
    }

    this.addEventListener('click', this.handleClick.bind(this));
  
    // При загрузке активный пак
    const defaultActive = this.querySelector('.pack.active');
    if (defaultActive) {
      this.setQuantityFromPack(defaultActive);
    }
  }

  handleClick(event) {
    const clickedPack = event.target.closest('.pack');
    if (!clickedPack || !this.contains(clickedPack)) return;
     
    this.querySelectorAll('.pack').forEach(pack => {
      pack.classList.remove('active');
    });
   
    clickedPack.classList.add('active');
    this.setQuantityFromPack(clickedPack);
    // Вызываем кастомное событие (опционально)
    this.dispatchEvent(new CustomEvent('pack:change', {
      detail: {
        id: clickedPack.dataset.packId,
        quantity: clickedPack.querySelector('[data-packquntity]')?.dataset.packquntity
      },
      bubbles: true
    }));
  }

  setQuantityFromPack(packElement) {
    const quantity = packElement.querySelector('[data-packquntity]')?.dataset.packquntity;
         
    if (this.quantityInput && quantity) {
      this.quantityInput.value = quantity;
      this.quantityInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }
}


class QuantityInputs extends HTMLElement {
  constructor() {
    super();
    this.initialized = false;
  }

  connectedCallback() {
    if (this.initialized) return; // 🔐 Защита от повторного вызова
    this.initialized = true;

    this.input = this.querySelector('input[name="quantity"]');
    this.plusBtn = this.querySelector('button[name="plus"]');
    this.minusBtn = this.querySelector('button[name="minus"]');

    if (!this.input || !this.plusBtn || !this.minusBtn) return;

    this.plusBtn.addEventListener('click', (e) => this.increment(e));
    this.minusBtn.addEventListener('click', (e) => this.decrement(e));
  }

  increment(e) {
    e?.preventDefault();
    const current = parseInt(this.input.value, 10) || 0;
    this.input.value = current + 1;
    this.input.dispatchEvent(new Event('change'));
  }

  decrement(e) {
    e?.preventDefault();
    const current = parseInt(this.input.value, 10) || 0;
    const newValue = Math.max(current - 1, 0);
    this.input.value = newValue;
    this.input.dispatchEvent(new Event('change'));
  }
}


class GiftBlock extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.input = document.querySelector('input[name="quantity"]');
    this.observeInputChanges();
    this.observeVariantChange();
    this.checkGifts();
  }

  observeInputChanges() {
    if (!this.input) return;
    this.input.addEventListener('input', () => this.checkGifts());
    this.input.addEventListener('change', () => this.checkGifts());
  }

  observeVariantChange() {
    const variantInput = document.querySelector('#product-variant-id');
    if (variantInput) {
      variantInput.addEventListener('change', () => this.checkGifts());
    }
  }

  async fetchCartData() {
    try {
      const res = await fetch('/cart.js');
      if (!res.ok) throw new Error('Failed to fetch cart');
      const data = await res.json();
      return {
        quantity: data.items.reduce((total, item) => total + item.quantity, 0),
        total_price: data.items.reduce((total, item) => total + item.quantity * item.final_price, 0) // accurate item pricing
      };
    } catch (e) {
      console.error('GiftBlock: fetchCartData error', e);
      return { quantity: 0, total_price: 0 };
    }
  }

  getSelectedVariantPriceFromJson() {
    const variantIdEl = document.querySelector('#product-variant-id');
    const jsonScript = document.querySelector('#json_prod_var');
    if (!variantIdEl || !jsonScript) return 0;

    try {
      const variantId = parseInt(variantIdEl.value);
      const variants = JSON.parse(jsonScript.textContent);
      const selected = variants.find(v => v.id === variantId);
      return selected ? selected.price : 0;
    } catch (e) {
      console.error('GiftBlock: error parsing variant price from json', e);
      return 0;
    }
  }

  async checkGifts() {
    const gifts = this.querySelectorAll('.gift');
    const cart = await this.fetchCartData();
    const localQty = parseInt(this.input?.value || '0', 10);
    const selectedPrice = this.getSelectedVariantPriceFromJson();
    const localTotal = localQty * selectedPrice;
    const combinedQty = localQty + cart.quantity;
    const combinedTotal = localTotal + cart.total_price;

    gifts.forEach(gift => {
      const giftId = gift.dataset.giftid;
      if (!giftId || giftId === '0') return this.lockGift(gift);

      const area = gift.dataset.giftarea;
      const rule = gift.dataset.unlockrulle || 'price';
      const qtyUnlock = parseInt(gift.dataset.qtyunlock || '0', 10);
      const priceUnlock = parseInt(gift.dataset.priceunlock || '0', 10);

      let isUnlocked = false;

      if (area === 'global') {
        if (rule === 'quntity') {
          isUnlocked = qtyUnlock > 0 && combinedQty >= qtyUnlock;
        } else if (rule === 'price') {
          isUnlocked = priceUnlock > 0 && combinedTotal >= priceUnlock;
        }
      } else if (area === 'local') {
        if (rule === 'quntity') {
          isUnlocked = qtyUnlock > 0 && localQty >= qtyUnlock;
        } else if (rule === 'price') {
          isUnlocked = priceUnlock > 0 && localTotal >= priceUnlock;
        }
      }

      if (isUnlocked) {
        this.unlockGift(gift);
      } else {
        this.lockGift(gift);
      }
    });
  }

  unlockGift(gift) {
    gift.dataset.locked = 'false';
    const img = gift.dataset.giftimg;
    const wrapper = gift.querySelector('.gift-image');
    if (img && wrapper) wrapper.innerHTML = `<img src="${img}" alt="Gift">`;
  }

  lockGift(gift) {
    gift.dataset.locked = 'true';
    const wrapper = gift.querySelector('.gift-image');
    if (wrapper) wrapper.innerHTML = this.lockSVG();
  }

  lockSVG() {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg viewBox="0 0 88 88" xmlns="http://www.w3.org/2000/svg">
<path d="m68.75 85.5h-49.5c-2.188 0-4.2865-0.8692-5.8336-2.4164-1.5472-1.5471-2.4164-3.6456-2.4164-5.8336v-30.25c0-2.188 0.8692-4.2865 2.4164-5.8336 1.5471-1.5472 3.6456-2.4164 5.8336-2.4164h49.5c2.188 0 4.2865 0.8692 5.8336 2.4164 1.5472 1.5471 2.4164 3.6456 2.4164 5.8336v30.25c0 2.188-0.8692 4.2865-2.4164 5.8336-1.5471 1.5472-3.6456 2.4164-5.8336 2.4164zm-49.5-41.25c-0.7293 0-1.4288 0.2897-1.9445 0.8055-0.5158 0.5157-0.8055 1.2152-0.8055 1.9445v30.25c0 0.7293 0.2897 1.4288 0.8055 1.9445 0.5157 0.5158 1.2152 0.8055 1.9445 0.8055h49.5c0.7293 0 1.4288-0.2897 1.9445-0.8055 0.5158-0.5157 0.8055-1.2152 0.8055-1.9445v-30.25c0-0.7293-0.2897-1.4288-0.8055-1.9445-0.5157-0.5158-1.2152-0.8055-1.9445-0.8055h-49.5z" fill="#101820"/>
<path d="m66 44.25h-44c-0.7293 0-1.4288-0.2897-1.9445-0.8055-0.5158-0.5157-0.8055-1.2152-0.8055-1.9445v-16.5c0-5.8348 2.3178-11.43 6.4436-15.556 4.1259-4.1258 9.7216-6.4436 15.556-6.4436h5.5c5.8348 0 11.43 2.3178 15.556 6.4436 4.1258 4.1258 6.4436 9.7216 6.4436 15.556v16.5c0 0.7293-0.2897 1.4288-0.8055 1.9445-0.5157 0.5158-1.2152 0.8055-1.9445 0.8055zm-41.25-5.5h38.5v-13.75c0-4.3761-1.7384-8.5729-4.8327-11.667-3.0944-3.0943-7.2912-4.8327-11.667-4.8327h-5.5c-4.3761 0-8.5729 1.7384-11.667 4.8327-3.0943 3.0944-4.8327 7.2912-4.8327 11.667v13.75z" fill="#101820"/>
<path d="m44 63.5c-1.0878 0-2.1512-0.3226-3.0556-0.9269-0.9045-0.6044-1.6095-1.4633-2.0257-2.4683-0.4163-1.005-0.5252-2.1109-0.313-3.1778s0.736-2.0469 1.5052-2.8161 1.7492-1.293 2.8161-1.5052 2.1728-0.1033 3.1778 0.313c1.005 0.4162 1.8639 1.1212 2.4683 2.0257 0.6043 0.9044 0.9269 1.9678 0.9269 3.0556 0 1.4587-0.5795 2.8576-1.6109 3.8891-1.0315 1.0314-2.4304 1.6109-3.8891 1.6109z" fill="#101820"/>
<path d="m46.75 60.75h-5.5v11h5.5v-11z" fill="#101820"/>
</svg>`;
  }
}

class AddCardProd extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const form = this.querySelector('form.form_add_cartp');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      const variantInput = document.querySelector('#product-variant-id');
      const quantityInput = document.querySelector('quantity-inputs input[name="quantity"]');
      const variantId = variantInput?.value;
      const qta = parseInt(quantityInput?.value || '1', 10);

      if (!variantInput || variantInput.disabled || !variantId || isNaN(qta) || qta <= 0) {
        alert('Please select a valid product variant and quantity.');
        if (submitBtn) submitBtn.disabled = false;
        return;
      }

      const items = [];

      // ✅ Add main product
      const mainVariant = parseInt(variantId, 10);
      if (!isNaN(mainVariant)) {
        const mainItem = { id: mainVariant, quantity: qta };
        items.push(mainItem);
        console.log('[Add to Cart] Main Variant:', mainItem);
      } else {
        alert('Main product variant is invalid.');
        if (submitBtn) submitBtn.disabled = false;
        return;
      }

      // ✅ Add unlocked gifts if present
      document.querySelectorAll('.gift[data-locked="false"]').forEach(gift => {
        const giftId = gift.dataset.giftid;
        if (giftId && giftId !== '0') {
          const parsedId = parseInt(giftId, 10);
          if (!isNaN(parsedId)) {
            const giftItem = { id: parsedId, quantity: 1 };
            items.push(giftItem);
            console.log('[Add to Cart] Gift:', giftItem);
          }
        }
      });

      // ✅ Add checked addons if present
      document.querySelectorAll('.product-addons__item').forEach(addon => {
        const checkbox = addon.querySelector('.product-addons__toggle');
        const addonId = addon.dataset.variantId;
        if (checkbox?.checked && addonId) {
          const parsedAddonId = parseInt(addonId, 10);
          if (!isNaN(parsedAddonId)) {
            const addonItem = { id: parsedAddonId, quantity: 1 };
            items.push(addonItem);
            console.log('[Add to Cart] Addon:', addonItem);
          }
        }
      });

      try {
        console.log('[Add to Cart] Final Payload:', JSON.stringify({ items }));

        const response = await fetch('/cart/add.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Shopify error:', errorData);
          throw new Error('Add to cart failed.');
        }

        const cartSlide = document.querySelector('cart-slide');
        if (cartSlide && typeof cartSlide.toggleCart === 'function') {
          cartSlide.toggleCart();
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }
}



document.addEventListener("DOMContentLoaded", (event) => {


  customElements.define('custom-variant', customVariant);
  customElements.define('pac-section', PacSection);
  // 🛡 Проверка: не регистрировать повторно, если уже определено
  if (!customElements.get('quantity-inputs')) {
    customElements.define('quantity-inputs', QuantityInputs);
  }

  if (!customElements.get('gift-block')) {
    customElements.define('gift-block', GiftBlock);
  }  
 
  if (!customElements.get('add-card-prod')) {
   customElements.define('add-card-prod', AddCardProd);
  }
  
})