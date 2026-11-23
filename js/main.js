/**
 * Coffee Market - Global Application Logic (main.js)
 * Navigation, Arabic Search Overlay, Quick View, Toast Notifications, and Global Utilities.
 */

// Global Search Database in Arabic
const SEARCH_DATABASE = [
  {
    id: 'la-esmeralda',
    title: 'بنما قيشا هاسيندا لا إسميرالدا',
    origin: 'بوكيتي، بنما',
    roast: 'تحميص خفيف',
    notes: 'ياسمين، خوخ أبيض، برغموت',
    score: 'SCA 94.2',
    price: '$54.00',
    link: 'product.html'
  },
  {
    id: 'chelbesa-washed',
    title: 'إثيوبيا شيلبيسا مغسولة عضوية G1',
    origin: 'غيديب، يرغاتشيف، إثيوبيا',
    roast: 'تحميص خفيف',
    notes: 'حمضيات سكرية، ياسمين، نكتارين',
    score: 'SCA 92.5',
    price: '$32.50',
    link: 'product.html?id=chelbesa'
  },
  {
    id: 'pink-bourbon',
    title: 'كولومبيا بينك بوربون إل بارايسو',
    origin: 'كاوكا، كولومبيا',
    roast: 'تحميص متوسط خفيف',
    notes: 'ليتشي، ماء الورد، باشن فروت',
    score: 'SCA 93.0',
    price: '$38.00',
    link: 'product.html?id=pink-bourbon'
  },
  {
    id: 'gichathaini-pb',
    title: 'كينيا غيتشاثايني بي بيري فاخرة',
    origin: 'منحدرات نييري، كينيا',
    roast: 'تحميص متوسط',
    notes: 'كشمش أسود، جريب فروت، سكر بني',
    score: 'SCA 91.8',
    price: '$29.00',
    link: 'shop.html'
  },
  {
    id: 'udaini-yemen',
    title: 'اليمن حراز عُديني مدرجات أثرية',
    origin: 'مرتفعات حراز، اليمن',
    roast: 'تحميص متوسط',
    notes: 'تين مجفف، هيل أخضر، كاكاو',
    score: 'SCA 92.0',
    price: '$46.00',
    link: 'shop.html'
  },
  {
    id: 'injerto-reserve',
    title: 'غواتيمالا إل إنخيرتو ريزيرف أسطوري',
    origin: 'هويهويتينانغو، غواتيمالا',
    roast: 'تحميص متوسط',
    notes: 'مكسرات ماكاداميا، شوكولاتة بالحليب',
    score: 'SCA 90.5',
    price: '$34.00',
    link: 'shop.html'
  }
];

// Open / Close Global Search Overlay
function openSearchModal() {
  const modal = document.getElementById('search-modal');
  const input = document.getElementById('search-modal-input');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (input) {
      setTimeout(() => {
        input.focus();
        renderSearchResults('');
      }, 100);
    }
  }
}

function closeSearchModal() {
  const modal = document.getElementById('search-modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function handleSearchInput(e) {
  const query = e.target.value.trim().toLowerCase();
  renderSearchResults(query);
}

function renderSearchResults(query) {
  const container = document.getElementById('search-results-list');
  if (!container) return;

  const results = SEARCH_DATABASE.filter(item => {
    if (!query) return true;
    return (
      item.title.toLowerCase().includes(query) ||
      item.origin.toLowerCase().includes(query) ||
      item.notes.toLowerCase().includes(query) ||
      item.roast.toLowerCase().includes(query)
    );
  });

  if (results.length === 0) {
    container.innerHTML = `
      <div class="py-8 text-center text-outline text-xs">
        لم يتم العثور على محاصيل تطابق "${query}". جرّب البحث عن "قيشا" أو "إثيوبيا" أو "ياسمين".
      </div>
    `;
    return;
  }

  container.innerHTML = results.map(item => `
    <a href="${item.link}" class="flex items-center justify-between p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors group">
      <div>
        <div class="flex items-center gap-2">
          <span class="font-bold text-on-surface group-hover:text-primary transition-colors text-sm">${item.title}</span>
          <span class="px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold">${item.score}</span>
        </div>
        <p class="text-xs text-outline mt-0.5">${item.origin} • ${item.notes}</p>
      </div>
      <div class="text-left">
        <span class="text-sm font-bold text-primary">${item.price}</span>
        <div class="text-[11px] text-outline group-hover:text-primary flex items-center justify-start gap-0.5 mt-0.5">
          <span>معاينة</span>
          <span class="material-symbols-outlined text-[13px]">arrow_back</span>
        </div>
      </div>
    </a>
  `).join('');
}

// Mobile Menu Controls
function toggleMobileMenu() {
  const drawer = document.getElementById('mobile-menu-drawer');
  const backdrop = document.getElementById('mobile-menu-backdrop');
  if (drawer && backdrop) {
    drawer.classList.toggle('open');
    backdrop.classList.toggle('active');
    document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
  }
}

function closeMobileMenu() {
  const drawer = document.getElementById('mobile-menu-drawer');
  const backdrop = document.getElementById('mobile-menu-backdrop');
  if (drawer && backdrop) {
    drawer.classList.remove('open');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Global Toast Notification Helper
function showToast(message) {
  const toast = document.getElementById('toast-notify');
  const toastText = document.getElementById('toast-text');
  if (toast && toastText) {
    toastText.textContent = message;
    toast.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
      toast.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
      toast.classList.remove('translate-y-0', 'opacity-100');
    }, 3200);
  }
}

// Keyboard shortcut listener (Cmd+K or Ctrl+K for search)
document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    openSearchModal();
  }
  if (e.key === 'Escape') {
    closeSearchModal();
    if (window.closeCart) window.closeCart();
    if (window.closeCheckoutModal) window.closeCheckoutModal();
  }
});

// Global exports
window.openSearchModal = openSearchModal;
window.closeSearchModal = closeSearchModal;
window.handleSearchInput = handleSearchInput;
window.toggleMobileMenu = toggleMobileMenu;
window.closeMobileMenu = closeMobileMenu;
window.showToast = showToast;
