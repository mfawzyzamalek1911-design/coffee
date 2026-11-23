/**
 * Velvet Terroir - Cart & Orders System (cart.js)
 * Persistent shopping cart using localStorage, slide-out drawer, dynamic calculations,
 * and seamless Arabic checkout with live Firestore & LocalStorage order integration.
 */

const CART_STORAGE_KEY = 'coffee_market_cart';
const ORDERS_STORAGE_KEY = 'coffee_market_orders';
const FREE_SHIPPING_THRESHOLD = 65.00;

// Initialize cart state from localStorage (Starts EMPTY - no mock data)
function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to read cart from localStorage', e);
  }
  return [];
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error('Failed to save cart to localStorage', e);
  }
  updateBadgeCount();
  renderCartDrawer();
}

// Add item to cart
function addToCart(item) {
  const cart = getCart();
  const existingIndex = cart.findIndex(
    i => i.id === item.id && i.weight === (item.weight || '250g') && i.grind === (item.grind || 'حبوب كاملة')
  );

  const itemPrice = parseFloat(item.price) || 0;

  if (existingIndex > -1) {
    cart[existingIndex].quantity += (item.quantity || 1);
  } else {
    cart.push({
      id: item.id,
      title: item.title,
      origin: item.origin || 'محصول مختص',
      weight: item.weight || '250g',
      grind: item.grind || 'حبوب كاملة',
      price: itemPrice,
      quantity: item.quantity || 1,
      image: item.image
    });
  }

  saveCart(cart);
  if (window.showToast) {
    window.showToast(`تمت إضافة "${item.title}" إلى سلة المشتريات`);
  }
  if (window.FirebaseService?.trackEvent) {
    window.FirebaseService.trackEvent("add_to_cart", {
      item_id: item.id,
      item_name: item.title,
      price: itemPrice,
      quantity: item.quantity || 1
    });
  }
  openCart();
}

// Remove item from cart
function removeFromCart(id, weight, grind) {
  let cart = getCart();
  cart = cart.filter(i => !(i.id === id && i.weight === weight && i.grind === grind));
  saveCart(cart);
}

// Update quantity
function updateQuantity(id, weight, grind, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === id && i.weight === weight && i.grind === grind);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(id, weight, grind);
      return;
    }
    saveCart(cart);
  }
}

// Clear cart
function clearCart() {
  saveCart([]);
}

// Update cart counter badges across the page
function updateBadgeCount() {
  const cart = getCart();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badges = document.querySelectorAll('.cart-badge');
  badges.forEach(b => {
    b.textContent = totalCount;
    b.style.display = totalCount > 0 ? 'flex' : 'none';
  });

  const cartSubtotals = document.querySelectorAll('.cart-header-subtotal');
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartSubtotals.forEach(el => {
    el.textContent = `$${subtotal.toFixed(2)}`;
  });
}

// Slide-out Drawer Controls
function openCart() {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('cart-drawer-backdrop');
  if (drawer) {
    drawer.classList.remove('translate-x-full');
    drawer.classList.add('translate-x-0', 'open');
  }
  if (backdrop) {
    backdrop.classList.add('active');
  }
  document.body.style.overflow = 'hidden';
  renderCartDrawer();
}

function closeCart() {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('cart-drawer-backdrop');
  if (drawer) {
    drawer.classList.add('translate-x-full');
    drawer.classList.remove('translate-x-0', 'open');
  }
  if (backdrop) {
    backdrop.classList.remove('active');
  }
  document.body.style.overflow = '';
}

// Render items inside the slide-out cart drawer
function renderCartDrawer() {
  const container = document.getElementById('drawer-items') || document.getElementById('cart-items-container');
  if (!container) return;

  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  // Update Free Shipping Progress
  const progressText = document.getElementById('shipping-progress-text');
  const progressBar = document.getElementById('shipping-progress-bar');
  if (progressText && progressBar) {
    if (remaining === 0) {
      progressText.innerHTML = `<span class="text-emerald-400 font-semibold flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px]">verified</span> تهانينا! حصلت على شحن مجاني مبرد ومباشر</span>`;
      progressBar.style.width = '100%';
      progressBar.classList.add('bg-emerald-400');
    } else {
      progressText.innerHTML = `أضف <strong class="text-primary">$${remaining.toFixed(2)}</strong> أخرى للحصول على شحن مجاني`;
      progressBar.style.width = `${shippingPercent}%`;
      progressBar.classList.remove('bg-emerald-400');
      progressBar.classList.add('bg-primary');
    }
  }

  // Subtotal & Estimated Total
  const subtotalEl = document.getElementById('cart-drawer-subtotal');
  const totalEl = document.getElementById('cart-drawer-total');
  const shippingEl = document.getElementById('cart-drawer-shipping');
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0.00 : 8.50;

  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (shippingEl) shippingEl.textContent = shippingCost === 0 ? 'مجاني' : `$${shippingCost.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${(subtotal + shippingCost).toFixed(2)}`;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="py-16 text-center space-y-4">
        <div class="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mx-auto text-outline">
          <span class="material-symbols-outlined text-[32px]">shopping_bag</span>
        </div>
        <p class="font-serif text-lg font-bold text-on-surface">سلة المشتريات فارغة</p>
        <p class="text-outline text-xs max-w-xs mx-auto leading-relaxed">استكشف محاصيلنا المختصة الفاخرة ذات المصدر الفردي وابدأ تجربة التذوق الاستثنائية.</p>
        <a href="shop.html" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-surface-container-lowest font-bold text-xs hover:bg-secondary transition-colors">
          <span>تصفح المحاصيل المختصة</span>
          <span class="material-symbols-outlined text-[16px]">arrow_back</span>
        </a>
      </div>
    `;
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="p-4 rounded-xl bg-surface-container-low border border-surface-variant/40 flex gap-4 items-center group transition-colors hover:border-outline/50">
      <img src="${item.image}" alt="${item.title}" class="w-16 h-20 rounded-lg object-cover bg-surface-container shrink-0 border border-surface-variant/60">
      <div class="flex-1 min-w-0">
        <h4 class="font-serif font-bold text-on-surface truncate group-hover:text-primary transition-colors text-sm">${item.title}</h4>
        <p class="text-outline text-xs truncate mt-0.5">${item.origin}</p>
        <div class="flex items-center gap-2 mt-1">
          <span class="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[11px] font-medium">${item.weight}</span>
          <span class="text-outline text-[11px]">• ${item.grind}</span>
        </div>
        <div class="flex items-center justify-between mt-3">
          <div class="flex items-center bg-surface-container rounded-full p-0.5 border border-surface-variant/60">
            <button onclick="updateQuantity('${item.id}', '${item.weight}', '${item.grind}', -1)" class="w-6 h-6 rounded-full flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors" title="تقليل">
              <span class="material-symbols-outlined text-[14px]">remove</span>
            </button>
            <span class="px-2.5 text-xs font-semibold text-on-surface">${item.quantity}</span>
            <button onclick="updateQuantity('${item.id}', '${item.weight}', '${item.grind}', 1)" class="w-6 h-6 rounded-full flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors" title="زيادة">
              <span class="material-symbols-outlined text-[14px]">add</span>
            </button>
          </div>
          <div class="text-left">
            <span class="text-primary font-bold text-sm">$${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        </div>
      </div>
      <button onclick="removeFromCart('${item.id}', '${item.weight}', '${item.grind}')" class="text-outline hover:text-error transition-colors p-1" title="حذف من السلة">
        <span class="material-symbols-outlined text-[18px]">delete</span>
      </button>
    </div>
  `).join('');
}

// Checkout Modal Dialog
function openCheckoutModal() {
  closeCart();
  const modal = document.getElementById('checkout-modal');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0.00 : 8.50;
    const total = subtotal + shipping;

    const summaryEl = document.getElementById('checkout-order-summary');
    if (summaryEl) {
      summaryEl.innerHTML = `
        <div class="space-y-2 mb-4 max-h-48 overflow-y-auto pl-1">
          ${cart.map(item => `
            <div class="flex justify-between items-center text-xs py-1.5 border-b border-surface-variant/30">
              <div class="flex items-center gap-2">
                <span class="w-5 h-5 rounded-full bg-primary/20 text-primary text-[10px] font-bold flex items-center justify-center">${item.quantity}</span>
                <span class="text-on-surface-variant truncate max-w-[200px]">${item.title} (${item.weight} - ${item.grind})</span>
              </div>
              <span class="text-primary font-bold">$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          `).join('')}
        </div>
        <div class="space-y-2 pt-2 border-t border-surface-variant text-sm">
          <div class="flex justify-between text-outline">
            <span>المجموع الفرعي:</span>
            <span>$${subtotal.toFixed(2)}</span>
          </div>
          <div class="flex justify-between text-outline">
            <span>الشحن والتوصيل:</span>
            <span>${shipping === 0 ? 'شحن مجاني' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div class="flex justify-between text-base font-bold text-on-surface pt-2 border-t border-surface-variant">
            <span>المجموع النهائي:</span>
            <span class="text-primary font-serif text-lg">$${total.toFixed(2)}</span>
          </div>
        </div>
      `;
    }
  }
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Process Customer Order Submission
function processCheckout(event) {
  event.preventDefault();
  const form = event.target;
  const btn = document.getElementById('checkout-submit-btn');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span class="material-symbols-outlined animate-spin text-[18px]">progress_activity</span> جاري إرسال الطلب وحجز المحصول...`;
  }

  const cart = getCart();
  if (cart.length === 0) {
    alert('سلة المشتريات فارغة!');
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `تأكيد وإتمام الطلب`;
    }
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0.00 : 8.50;
  const total = subtotal + shipping;

  const orderNumber = 'ORD-' + Math.floor(100000 + Math.random() * 900000);

  // Extract customer data from form
  const customerName = form.querySelector('[name="customerName"]')?.value?.trim() || 
                       form.querySelector('#checkout-name')?.value?.trim() || 'عميل المتجر';
  const customerPhone = form.querySelector('[name="customerPhone"]')?.value?.trim() || 
                        form.querySelector('#checkout-phone')?.value?.trim() || '';
  const customerEmail = form.querySelector('[name="customerEmail"]')?.value?.trim() || 
                        form.querySelector('#checkout-email')?.value?.trim() || '';
  const customerCity = form.querySelector('[name="customerCity"]')?.value?.trim() || 
                       form.querySelector('#checkout-city')?.value?.trim() || 'الرياض';
  const customerAddress = form.querySelector('[name="customerAddress"]')?.value?.trim() || 
                          form.querySelector('#checkout-address')?.value?.trim() || '';
  const customerNotes = form.querySelector('[name="customerNotes"]')?.value?.trim() || 
                        form.querySelector('#checkout-notes')?.value?.trim() || '';
  const paymentRadio = form.querySelector('input[name="payment"]:checked');
  const paymentMethod = paymentRadio ? (paymentRadio.value || paymentRadio.nextElementSibling?.textContent?.trim()) : 'الدفع عند الاستلام';

  const customerData = {
    orderId: orderNumber,
    customerName: customerName,
    phone: customerPhone,
    email: customerEmail,
    city: customerCity,
    address: customerAddress,
    notes: customerNotes,
    paymentMethod: paymentMethod,
    items: [...cart],
    itemsCount: cart.reduce((sum, i) => sum + i.quantity, 0),
    subtotal: subtotal,
    shipping: shipping,
    total: total,
    status: 'new', // new (جديد), preparing (قيد التحضير), shipped (تم الشحن), delivered (تم التوصيل), cancelled (ملغي)
    createdAt: new Date().toISOString(),
    createdAtFormatted: new Intl.DateTimeFormat('ar-EG', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date())
  };

  // 1. Save locally to coffee_market_orders
  try {
    const existingOrders = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]');
    existingOrders.unshift(customerData);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(existingOrders));
    console.log('✅ Order saved to LocalStorage:', customerData);
  } catch (err) {
    console.error('Failed to save order to localStorage:', err);
  }

  // 2. Save order to Firebase Firestore
  if (window.FirebaseService?.saveOrder) {
    window.FirebaseService.saveOrder(customerData).then(res => {
      console.log('🔥 Order saved to Firebase:', res);
    }).catch(err => {
      console.warn("Could not save to Firebase (check rules):", err);
    });
  }

  // 3. Dispatch custom event for dashboard listeners
  window.dispatchEvent(new CustomEvent('coffee_order_placed', { detail: customerData }));

  setTimeout(() => {
    clearCart();
    closeCheckoutModal();

    const confirmModal = document.getElementById('order-confirmation-modal');
    const orderNumEl = document.getElementById('confirmed-order-number');
    if (confirmModal && orderNumEl) {
      orderNumEl.textContent = orderNumber;
      confirmModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      alert(`تم استلام طلبك بنجاح! رقم الطلب هو: ${orderNumber}. سنتواصل معك لتأكيد الشحن والتسليم.`);
    }

    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `تأكيد وإتمام الطلب`;
    }
  }, 900);
}

function closeConfirmationModal() {
  const confirmModal = document.getElementById('order-confirmation-modal');
  if (confirmModal) {
    confirmModal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Export to global scope
window.getCart = getCart;
window.saveCart = saveCart;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.clearCart = clearCart;
window.openCart = openCart;
window.closeCart = closeCart;
window.renderCartDrawer = renderCartDrawer;
window.updateBadgeCount = updateBadgeCount;
window.openCheckoutModal = openCheckoutModal;
window.closeCheckoutModal = closeCheckoutModal;
window.processCheckout = processCheckout;
window.closeConfirmationModal = closeConfirmationModal;

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  // Ensure legacy dummy cart is cleaned if it exists
  const legacy = localStorage.getItem('velvet_terroir_cart');
  if (legacy) {
    try {
      const parsed = JSON.parse(legacy);
      if (parsed.some(i => i.id === 'la-esmeralda' || i.id === 'chelbesa-washed')) {
        localStorage.removeItem('velvet_terroir_cart');
      }
    } catch(e) {}
  }
  updateBadgeCount();
  renderCartDrawer();
});
