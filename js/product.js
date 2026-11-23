/**
 * Coffee Market - Product Detail Logic (product.js)
 * Interactive Image Gallery, Weight & Grind Selectors, Dynamic Subscription Pricing, and Tabs in Arabic.
 */

const PRODUCT_DATA = {
  id: 'la-esmeralda',
  title: 'بنما قيشا هاسيندا لا إسميرالدا — سلالة خاصة فاخرة',
  lot: 'دفعة #ES-2025-04A',
  score: 94.2,
  prices: {
    '250g': 54.00,
    '500g': 98.00,
    '1kg': 180.00
  },
  images: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD6ZAm0DzmY9AanbHv2OXgpxChgLTCBrpSum-SpWYp8S6OUBU48DRzwOQODD2XmulA0iI2qcmz5O1kzjIh_dZ3HZgAcT1dDr1dK9jUpJ8nF2G58YF7359-VtCU4RQ2dPyhzfMCYEJxzJDeSaqHqZcTtnWAyYbtRDAJQncgmeVtUxi9SyHbFH6OJ5aBL5gZNaYpoakpBS55g5EUKf8e2nEYnT6F87lkNSzmVVEa2pjU',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC2kEdWuu_AUq1PqMpJgVN2KiG8kG19bFnezWkPNbDR65rCSVhJXZMQkM5W_bj-dKgKy5D6nxm22stCvwaK7B9pE_YbeeTfDorbRvE1MxcPjwCkReGph7ucLeK_eCzUdnXLPGldyUhIxgVNd3R73q6FdrJaIMNtbmEpYVhuS2IyYeI37b6jZB2HCK7UHC6ukM81Uj8lcBC6MzxDWGY3kPi6gCTnwgzhQeOguaDtBYw',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCPlGuA-nxmiO-Fsk_cWnutD2XYv5XYe_0id7FoCDQRkA1wk90nokwM4rF7daWANp1heGXOOTmd1mxX9cKbe0sSgY2jO94DqWg-QJ0qXD0VXx-Po7XE6-iG14nHmrOuBY3yv0aJFZJc4h3kjx0WgIAKdcK1T2RimMBFn1Rr1liOeGsCeUYEDc3K_y4XbxKq_kVQieWZxJiY4ps06zYiMEdwoY5N4i7TIE74uFikBtQ',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDyqBlUpcTfeDNuiyoVNaFeKxJUlCbMj0h89VHR91lHxjC0cECPbqeYJyucmTW_b8gMscIMPYAWn7eYC9dzKZ9Q9iWZnuRHe19GFSBw77TDweaKQDQ3ITDaIRRiBeoYUktN5fEdpxQOv84885VOWEezNbNkYTW5SsRCYdlgADNpMSmR4M1lOC_N6uzm77L9nEBxs5hAjgoFtrLad1fENWI18N7yzwrKC5qBF26I8Y8'
  ]
};

let currentWeight = '250g';
let currentGrind = 'حبوب كاملة';
let isSubscription = false;
let quantity = 1;
let subscriptionFrequency = 'كل أسبوعين';

// Update Pricing display
function updateProductPricing() {
  const basePrice = PRODUCT_DATA.prices[currentWeight] || 54.00;
  const discountMultiplier = isSubscription ? 0.90 : 1.0;
  const unitPrice = basePrice * discountMultiplier;
  const totalPrice = unitPrice * quantity;

  const priceDisplay = document.getElementById('price-display');
  const unitPriceLabel = document.getElementById('unit-price-label');
  const cartCtaText = document.getElementById('cart-cta-text');
  const savingsBanner = document.getElementById('subscription-savings-badge');

  if (priceDisplay) {
    priceDisplay.textContent = `$${unitPrice.toFixed(2)}`;
  }
  if (unitPriceLabel) {
    unitPriceLabel.textContent = isSubscription ? `(سعر الحبة المفردة: $${basePrice.toFixed(2)})` : '';
  }
  if (cartCtaText) {
    cartCtaText.textContent = `حجز المحصول الآن — $${totalPrice.toFixed(2)}`;
  }
  if (savingsBanner) {
    savingsBanner.style.display = isSubscription ? 'inline-flex' : 'none';
  }
}

// Select Thumbnail
function switchProductImage(index, thumbnailEl) {
  const mainImage = document.getElementById('main-product-image');
  if (mainImage && PRODUCT_DATA.images[index]) {
    mainImage.style.opacity = '0.3';
    setTimeout(() => {
      mainImage.src = PRODUCT_DATA.images[index];
      mainImage.style.opacity = '1';
    }, 150);
  }

  // Update active thumbnail border
  document.querySelectorAll('.thumbnail-item').forEach(el => {
    el.classList.remove('ring-2', 'ring-primary', 'border-primary');
    el.classList.add('border-surface-variant/60');
  });
  if (thumbnailEl) {
    thumbnailEl.classList.add('ring-2', 'ring-primary', 'border-primary');
    thumbnailEl.classList.remove('border-surface-variant/60');
  }
}

// Weight Selector
function setProductWeight(weight, btn) {
  currentWeight = weight;
  document.querySelectorAll('.weight-selector-btn').forEach(b => {
    b.classList.remove('border-primary', 'bg-primary/10', 'text-primary');
    b.classList.add('border-surface-variant', 'bg-surface-container', 'text-on-surface-variant');
  });
  if (btn) {
    btn.classList.add('border-primary', 'bg-primary/10', 'text-primary');
    btn.classList.remove('border-surface-variant', 'bg-surface-container', 'text-on-surface-variant');
  }
  updateProductPricing();
}

// Grind Selector
function setProductGrind(grind, btn) {
  currentGrind = grind;
  document.querySelectorAll('.grind-selector-btn').forEach(b => {
    b.classList.remove('border-primary', 'bg-primary/10', 'text-primary');
    b.classList.add('border-surface-variant', 'bg-surface-container', 'text-on-surface-variant');
  });
  if (btn) {
    btn.classList.add('border-primary', 'bg-primary/10', 'text-primary');
    btn.classList.remove('border-surface-variant', 'bg-surface-container', 'text-on-surface-variant');
  }
}

// Subscription Toggle
function setPurchaseType(type) {
  isSubscription = (type === 'subscription');

  const oneTimeCard = document.getElementById('purchase-option-onetime');
  const subCard = document.getElementById('purchase-option-sub');
  const subOptions = document.getElementById('subscription-frequency-options');

  if (isSubscription) {
    subCard.classList.add('border-primary', 'bg-primary-container/15');
    subCard.classList.remove('border-surface-variant');
    oneTimeCard.classList.remove('border-primary', 'bg-primary-container/15');
    oneTimeCard.classList.add('border-surface-variant');
    if (subOptions) subOptions.style.display = 'block';
  } else {
    oneTimeCard.classList.add('border-primary', 'bg-primary-container/15');
    oneTimeCard.classList.remove('border-surface-variant');
    subCard.classList.remove('border-primary', 'bg-primary-container/15');
    subCard.classList.add('border-surface-variant');
    if (subOptions) subOptions.style.display = 'none';
  }

  updateProductPricing();
}

// Quantity Adjustments
function changeQuantity(delta) {
  quantity = Math.max(1, quantity + delta);
  const qtyDisplay = document.getElementById('quantity-display');
  if (qtyDisplay) {
    qtyDisplay.textContent = quantity;
  }
  updateProductPricing();
}

// Tab Switching
function switchTab(tabId, tabButton) {
  document.querySelectorAll('.tab-content-panel').forEach(panel => {
    panel.style.display = 'none';
  });
  const targetPanel = document.getElementById(`tab-panel-${tabId}`);
  if (targetPanel) {
    targetPanel.style.display = 'block';
  }

  document.querySelectorAll('.product-tab-btn').forEach(btn => {
    btn.classList.remove('text-primary', 'border-primary', 'font-bold');
    btn.classList.add('text-outline', 'border-transparent');
  });
  if (tabButton) {
    tabButton.classList.add('text-primary', 'border-primary', 'font-bold');
    tabButton.classList.remove('text-outline', 'border-transparent');
  }
}

// Add Configured Product to Cart
function addConfiguredProductToCart() {
  const basePrice = PRODUCT_DATA.prices[currentWeight] || 54.00;
  const discountMultiplier = isSubscription ? 0.90 : 1.0;
  const finalUnitPrice = basePrice * discountMultiplier;

  const itemTitle = isSubscription
    ? `${PRODUCT_DATA.title} (${subscriptionFrequency})`
    : PRODUCT_DATA.title;

  window.addToCart({
    id: PRODUCT_DATA.id,
    title: itemTitle,
    origin: 'بوكيتي، تشيريكي، بنما • معالجة تجفيف بطيء 28 يوماً',
    weight: currentWeight,
    grind: currentGrind,
    price: finalUnitPrice,
    quantity: quantity,
    image: PRODUCT_DATA.images[0]
  });
}

// Global exports
window.switchProductImage = switchProductImage;
window.setProductWeight = setProductWeight;
window.setProductGrind = setProductGrind;
window.setPurchaseType = setPurchaseType;
window.changeQuantity = changeQuantity;
window.switchTab = switchTab;
window.addConfiguredProductToCart = addConfiguredProductToCart;

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('main-product-image')) {
    updateProductPricing();
  }
});
