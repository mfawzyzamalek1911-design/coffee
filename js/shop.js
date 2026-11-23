/**
 * Coffee Market - Shop / Marketplace Catalog Logic (shop.js)
 * Interactive Filtering, Real-time Search, Multi-Weight Pricing, Sorting, and Wishlist in Arabic.
 */

const PRODUCTS_CATALOG = [
  {
    id: 'la-esmeralda',
    title: 'بنما قيشا هاسيندا لا إسميرالدا',
    estate: 'مزرعة خاراميو • سلالة قيشا فاخرة نادرة',
    origin: 'بنما',
    region: 'بوكيتي، تشيريكي',
    altitude: 1850,
    process: 'مجففة',
    roast: 'خفيف',
    score: 94.2,
    prices: { '250g': 54.00, '500g': 98.00, '1kg': 180.00 },
    notes: ['ياسمين', 'خوخ أبيض', 'برغموت', 'عسل بري'],
    inStock: true,
    directTrade: true,
    lot: 'دفعة #ES-2025-04A',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6ZAm0DzmY9AanbHv2OXgpxChgLTCBrpSum-SpWYp8S6OUBU48DRzwOQODD2XmulA0iI2qcmz5O1kzjIh_dZ3HZgAcT1dDr1dK9jUpJ8nF2G58YF7359-VtCU4RQ2dPyhzfMCYEJxzJDeSaqHqZcTtnWAyYbtRDAJQncgmeVtUxi9SyHbFH6OJ5aBL5gZNaYpoakpBS55g5EUKf8e2nEYnT6F87lkNSzmVVEa2pjU'
  },
  {
    id: 'chelbesa-washed',
    title: 'إثيوبيا شيلبيسا مغسولة عضوية G1',
    estate: 'مزارع دانانتشيل • سلالة إرثية عريقة',
    origin: 'إثيوبيا',
    region: 'غيديب، يرغاتشيف',
    altitude: 2100,
    process: 'مغسولة',
    roast: 'خفيف',
    score: 92.5,
    prices: { '250g': 32.50, '500g': 60.00, '1kg': 110.00 },
    notes: ['حمضيات سكرية', 'ياسمين', 'نكتارين', 'شاي إيرل غراي'],
    inStock: true,
    directTrade: true,
    lot: 'دفعة #ETH-CHE-09',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2kEdWuu_AUq1PqMpJgVN2KiG8kG19bFnezWkPNbDR65rCSVhJXZMQkM5W_bj-dKgKy5D6nxm22stCvwaK7B9pE_YbeeTfDorbRvE1MxcPjwCkReGph7ucLeK_eCzUdnXLPGldyUhIxgVNd3R73q6FdrJaIMNtbmEpYVhuS2IyYeI37b6jZB2HCK7UHC6ukM81Uj8lcBC6MzxDWGY3kPi6gCTnwgzhQeOguaDtBYw'
  },
  {
    id: 'pink-bourbon',
    title: 'كولومبيا بينك بوربون إل بارايسو',
    estate: 'مزرعة إل بارايسو • معالجة لاهوائية خاصة',
    origin: 'كولومبيا',
    region: 'بييندامو، كاوكا',
    altitude: 1930,
    process: 'لاهوائية',
    roast: 'متوسط خفيف',
    score: 93.0,
    prices: { '250g': 38.00, '500g': 70.00, '1kg': 130.00 },
    notes: ['ليتشي', 'ماء الورد', 'باشن فروت', 'توت أحمر'],
    inStock: true,
    directTrade: true,
    lot: 'دفعة #COL-PB-77',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPlGuA-nxmiO-Fsk_cWnutD2XYv5XYe_0id7FoCDQRkA1wk90nokwM4rF7daWANp1heGXOOTmd1mxX9cKbe0sSgY2jO94DqWg-QJ0qXD0VXx-Po7XE6-iG14nHmrOuBY3yv0aJFZJc4h3kjx0WgIAKdcK1T2RimMBFn1Rr1liOeGsCeUYEDc3K_y4XbxKq_kVQieWZxJiY4ps06zYiMEdwoY5N4i7TIE74uFikBtQ'
  },
  {
    id: 'gichathaini-pb',
    title: 'كينيا غيتشاثايني بي بيري مختارة',
    estate: 'تعاونية مزارعي غيكاندا • سفوح جبل كينيا',
    origin: 'كينيا',
    region: 'منحدرات نييري، جبل كينيا',
    altitude: 1800,
    process: 'مغسولة',
    roast: 'متوسط',
    score: 91.8,
    prices: { '250g': 29.00, '500g': 54.00, '1kg': 98.00 },
    notes: ['كشمش أسود', 'جريب فروت', 'سكر قصب', 'توت بري'],
    inStock: true,
    directTrade: true,
    lot: 'دفعة #KEN-GIC-12',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyqBlUpcTfeDNuiyoVNaFeKxJUlCbMj0h89VHR91lHxjC0cECPbqeYJyucmTW_b8gMscIMPYAWn7eYC9dzKZ9Q9iWZnuRHe19GFSBw77TDweaKQDQ3ITDaIRRiBeoYUktN5fEdpxQOv84885VOWEezNbNkYTW5SsRCYdlgADNpMSmR4M1lOC_N6uzm77L9nEBxs5hAjgoFtrLad1fENWI18N7yzwrKC5qBF26I8Y8'
  },
  {
    id: 'udaini-yemen',
    title: 'اليمن حراز عُديني مدرجات أثرية',
    estate: 'مدرجات جبل حراز الشاهقة • سلالة أصلية',
    origin: 'اليمن',
    region: 'مرتفعات حراز، صنعاء',
    altitude: 2350,
    process: 'مجففة',
    roast: 'متوسط',
    score: 92.0,
    prices: { '250g': 46.00, '500g': 86.00, '1kg': 160.00 },
    notes: ['تين مجفف', 'هيل أخضر', 'حبيبات الكاكاو', 'برقوق داكن'],
    inStock: true,
    directTrade: true,
    lot: 'دفعة #YEM-UDA-01',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6ZAm0DzmY9AanbHv2OXgpxChgLTCBrpSum-SpWYp8S6OUBU48DRzwOQODD2XmulA0iI2qcmz5O1kzjIh_dZ3HZgAcT1dDr1dK9jUpJ8nF2G58YF7359-VtCU4RQ2dPyhzfMCYEJxzJDeSaqHqZcTtnWAyYbtRDAJQncgmeVtUxi9SyHbFH6OJ5aBL5gZNaYpoakpBS55g5EUKf8e2nEYnT6F87lkNSzmVVEa2pjU'
  },
  {
    id: 'injerto-reserve',
    title: 'غواتيمالا إل إنخيرتو ريزيرف أسطوري',
    estate: 'عائلة أغويري • سلالة باسامارا وكاتواي أصفر',
    origin: 'غواتيمالا',
    region: 'جبال هويهويتينانغو',
    altitude: 1750,
    process: 'مغسولة',
    roast: 'متوسط',
    score: 90.5,
    prices: { '250g': 34.00, '500g': 62.00, '1kg': 115.00 },
    notes: ['مكسرات ماكاداميا', 'شوكولاتة بالحليب', 'زهور البرتقال'],
    inStock: true,
    directTrade: true,
    lot: 'دفعة #GTM-INJ-04',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2kEdWuu_AUq1PqMpJgVN2KiG8kG19bFnezWkPNbDR65rCSVhJXZMQkM5W_bj-dKgKy5D6nxm22stCvwaK7B9pE_YbeeTfDorbRvE1MxcPjwCkReGph7ucLeK_eCzUdnXLPGldyUhIxgVNd3R73q6FdrJaIMNtbmEpYVhuS2IyYeI37b6jZB2HCK7UHC6ukM81Uj8lcBC6MzxDWGY3kPi6gCTnwgzhQeOguaDtBYw'
  }
];

// Active Filters State
const filterState = {
  search: '',
  origins: [],
  roast: 'all',
  process: 'all',
  maxPrice: 120,
  minAltitude: 1200,
  selectedNotes: [],
  directTradeOnly: false,
  inStockOnly: false,
  sort: 'featured',
  selectedWeights: {}
};

// Initialize Shop Catalog
function initShop() {
  PRODUCTS_CATALOG.forEach(p => {
    filterState.selectedWeights[p.id] = '250g';
  });

  setupEventListeners();
  applyFiltersAndRender();
}

function setupEventListeners() {
  // Search input
  const searchInput = document.getElementById('shop-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterState.search = e.target.value.trim().toLowerCase();
      applyFiltersAndRender();
    });
  }

  // Origin Checkboxes
  document.querySelectorAll('.filter-origin-checkbox').forEach(cb => {
    cb.addEventListener('change', (e) => {
      const val = e.target.value;
      if (e.target.checked) {
        if (!filterState.origins.includes(val)) filterState.origins.push(val);
      } else {
        filterState.origins = filterState.origins.filter(o => o !== val);
      }
      applyFiltersAndRender();
    });
  });

  // Roast filter buttons
  document.querySelectorAll('.filter-roast-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-roast-btn').forEach(b => {
        b.classList.remove('bg-primary', 'text-surface-container-lowest', 'font-bold');
        b.classList.add('bg-surface-container', 'text-outline');
      });
      btn.classList.add('bg-primary', 'text-surface-container-lowest', 'font-bold');
      btn.classList.remove('bg-surface-container', 'text-outline');

      filterState.roast = btn.dataset.roast || 'all';
      applyFiltersAndRender();
    });
  });

  // Process select
  const processSelect = document.getElementById('filter-process-select');
  if (processSelect) {
    processSelect.addEventListener('change', (e) => {
      filterState.process = e.target.value;
      applyFiltersAndRender();
    });
  }

  // Price Range Slider
  const priceSlider = document.getElementById('filter-price-slider');
  const priceDisplay = document.getElementById('filter-price-val');
  if (priceSlider && priceDisplay) {
    priceSlider.addEventListener('input', (e) => {
      filterState.maxPrice = parseFloat(e.target.value);
      priceDisplay.textContent = `$${filterState.maxPrice}`;
      applyFiltersAndRender();
    });
  }

  // Altitude Range Slider
  const altSlider = document.getElementById('filter-alt-slider');
  const altDisplay = document.getElementById('filter-alt-val');
  if (altSlider && altDisplay) {
    altSlider.addEventListener('input', (e) => {
      filterState.minAltitude = parseInt(e.target.value);
      altDisplay.textContent = `${filterState.minAltitude} م فوق سطح البحر`;
      applyFiltersAndRender();
    });
  }

  // Flavor Notes Chips
  document.querySelectorAll('.filter-note-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const note = chip.dataset.note;
      chip.classList.toggle('bg-primary/20');
      chip.classList.toggle('text-primary');
      chip.classList.toggle('border-primary/50');

      if (filterState.selectedNotes.includes(note)) {
        filterState.selectedNotes = filterState.selectedNotes.filter(n => n !== note);
      } else {
        filterState.selectedNotes.push(note);
      }
      applyFiltersAndRender();
    });
  });

  // Toggles
  const dtToggle = document.getElementById('toggle-direct-trade');
  if (dtToggle) {
    dtToggle.addEventListener('change', (e) => {
      filterState.directTradeOnly = e.target.checked;
      applyFiltersAndRender();
    });
  }

  const stockToggle = document.getElementById('toggle-in-stock');
  if (stockToggle) {
    stockToggle.addEventListener('change', (e) => {
      filterState.inStockOnly = e.target.checked;
      applyFiltersAndRender();
    });
  }

  // Sort Dropdown
  const sortSelect = document.getElementById('catalog-sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      filterState.sort = e.target.value;
      applyFiltersAndRender();
    });
  }

  // Reset Filters Button
  const resetBtn = document.getElementById('reset-filters-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      resetAllFilters();
    });
  }
}

function resetAllFilters() {
  filterState.search = '';
  filterState.origins = [];
  filterState.roast = 'all';
  filterState.process = 'all';
  filterState.maxPrice = 120;
  filterState.minAltitude = 1200;
  filterState.selectedNotes = [];
  filterState.directTradeOnly = false;
  filterState.inStockOnly = false;
  filterState.sort = 'featured';

  const searchInput = document.getElementById('shop-search-input');
  if (searchInput) searchInput.value = '';

  document.querySelectorAll('.filter-origin-checkbox').forEach(cb => cb.checked = false);
  
  document.querySelectorAll('.filter-roast-btn').forEach((b, idx) => {
    if (idx === 0) {
      b.classList.add('bg-primary', 'text-surface-container-lowest', 'font-bold');
      b.classList.remove('bg-surface-container', 'text-outline');
    } else {
      b.classList.remove('bg-primary', 'text-surface-container-lowest', 'font-bold');
      b.classList.add('bg-surface-container', 'text-outline');
    }
  });

  const processSelect = document.getElementById('filter-process-select');
  if (processSelect) processSelect.value = 'all';

  const priceSlider = document.getElementById('filter-price-slider');
  const priceDisplay = document.getElementById('filter-price-val');
  if (priceSlider && priceDisplay) {
    priceSlider.value = 120;
    priceDisplay.textContent = '$120';
  }

  const altSlider = document.getElementById('filter-alt-slider');
  const altDisplay = document.getElementById('filter-alt-val');
  if (altSlider && altDisplay) {
    altSlider.value = 1200;
    altDisplay.textContent = '1,200 م';
  }

  document.querySelectorAll('.filter-note-chip').forEach(chip => {
    chip.classList.remove('bg-primary/20', 'text-primary', 'border-primary/50');
    chip.classList.add('bg-surface-container', 'text-on-surface-variant', 'border-surface-variant/40');
  });

  const dtToggle = document.getElementById('toggle-direct-trade');
  if (dtToggle) dtToggle.checked = false;

  const stockToggle = document.getElementById('toggle-in-stock');
  if (stockToggle) stockToggle.checked = false;

  const sortSelect = document.getElementById('catalog-sort-select');
  if (sortSelect) sortSelect.value = 'featured';

  applyFiltersAndRender();
}

function applyFiltersAndRender() {
  let filtered = PRODUCTS_CATALOG.filter(product => {
    // Search query
    if (filterState.search) {
      const q = filterState.search;
      const match =
        product.title.toLowerCase().includes(q) ||
        product.region.toLowerCase().includes(q) ||
        product.origin.toLowerCase().includes(q) ||
        product.notes.some(n => n.toLowerCase().includes(q));
      if (!match) return false;
    }

    // Origin
    if (filterState.origins.length > 0) {
      if (!filterState.origins.includes(product.origin)) return false;
    }

    // Roast
    if (filterState.roast !== 'all') {
      if (!product.roast.toLowerCase().includes(filterState.roast.toLowerCase())) return false;
    }

    // Process
    if (filterState.process !== 'all') {
      if (product.process.toLowerCase() !== filterState.process.toLowerCase()) return false;
    }

    // Max Price (based on 250g)
    if (product.prices['250g'] > filterState.maxPrice) return false;

    // Min Altitude
    if (product.altitude < filterState.minAltitude) return false;

    // Flavor Notes
    if (filterState.selectedNotes.length > 0) {
      const hasNote = filterState.selectedNotes.some(sn =>
        product.notes.some(pn => pn.toLowerCase().includes(sn.toLowerCase()))
      );
      if (!hasNote) return false;
    }

    // Direct Trade
    if (filterState.directTradeOnly && !product.directTrade) return false;

    // In Stock
    if (filterState.inStockOnly && !product.inStock) return false;

    return true;
  });

  // Sorting
  if (filterState.sort === 'price-low') {
    filtered.sort((a, b) => a.prices['250g'] - b.prices['250g']);
  } else if (filterState.sort === 'price-high') {
    filtered.sort((a, b) => b.prices['250g'] - a.prices['250g']);
  } else if (filterState.sort === 'score-high') {
    filtered.sort((a, b) => b.score - a.score);
  }

  renderGrid(filtered);
  updateActiveTags(filtered.length);
}

// Select weight variant for a specific card
function selectProductWeight(productId, weight) {
  filterState.selectedWeights[productId] = weight;
  const product = PRODUCTS_CATALOG.find(p => p.id === productId);
  if (!product) return;

  const priceEl = document.getElementById(`price-${productId}`);
  if (priceEl) {
    priceEl.textContent = `$${product.prices[weight].toFixed(2)}`;
  }

  // Update button active styling on card
  const container = document.getElementById(`weights-container-${productId}`);
  if (container) {
    container.querySelectorAll('button').forEach(btn => {
      if (btn.dataset.weight === weight) {
        btn.className = 'px-2.5 py-0.5 rounded-full bg-primary text-surface-container-lowest font-bold transition-colors';
      } else {
        btn.className = 'px-2.5 py-0.5 rounded-full text-outline hover:text-on-surface transition-colors';
      }
    });
  }
}

// Quick Add from Catalog Card
function quickAddToCart(productId) {
  const product = PRODUCTS_CATALOG.find(p => p.id === productId);
  if (!product) return;

  const weight = filterState.selectedWeights[productId] || '250g';
  const price = product.prices[weight];

  window.addToCart({
    id: product.id,
    title: product.title,
    origin: `${product.region} • ${product.process}`,
    weight: weight,
    grind: 'حبوب كاملة',
    price: price,
    quantity: 1,
    image: product.image
  });
}

// Toggle Wishlist Heart Animation
function toggleWishlist(btn) {
  btn.classList.toggle('text-error');
  btn.classList.toggle('text-outline');
  const isHearted = btn.classList.contains('text-error');
  if (window.showToast) {
    window.showToast(isHearted ? 'تمت إضافة المحصول إلى قائمة المفضلة' : 'تمت الإزالة من المفضلة');
  }
}

function updateActiveTags(count) {
  const countEl = document.getElementById('catalog-results-count');
  if (countEl) {
    countEl.textContent = `عرض ${count} من أصل ${PRODUCTS_CATALOG.length} محاصيل فاخرة متوفرة`;
  }
}

function renderGrid(products) {
  const grid = document.getElementById('catalog-products-grid');
  if (!grid) return;

  if (products.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-20 text-center space-y-4">
        <div class="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mx-auto text-outline">
          <span class="material-symbols-outlined text-[32px]">filter_alt_off</span>
        </div>
        <h3 class="font-serif text-lg font-bold text-on-surface">لم يتم العثور على محاصيل مطابقة</h3>
        <p class="text-outline text-xs max-w-md mx-auto leading-relaxed">جرّب تخفيف معايير التصفية، أو البحث بنوع معالجة أو إيحاء مختلف.</p>
        <button onclick="resetAllFilters()" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-surface-container-lowest font-bold text-xs hover:bg-secondary transition-colors">
          <span>إعادة ضبط خيارات البحث</span>
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = products.map(p => {
    const activeWeight = filterState.selectedWeights[p.id] || '250g';
    const activePrice = p.prices[activeWeight].toFixed(2);

    return `
      <div class="group relative bg-surface-container-low rounded-2xl p-5 border border-surface-variant/40 coffee-card-glow flex flex-col justify-between">
        <!-- Top Media Stage -->
        <div class="relative w-full aspect-square rounded-xl overflow-hidden bg-surface-container mb-4">
          <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          
          <!-- Floating SCA Certified Chip -->
          <div class="absolute top-3 right-3 bg-surface-container-highest/90 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-primary/20 shadow-md">
            <span class="material-symbols-outlined text-primary text-[14px]" style="font-variation-settings: 'FILL' 1;">verified</span>
            <span class="text-primary font-bold text-xs tracking-wide">SCA ${p.score}</span>
          </div>

          <!-- Wishlist Heart Button -->
          <button onclick="toggleWishlist(this)" class="absolute top-3 left-3 w-8 h-8 rounded-full bg-surface-container-highest/80 backdrop-blur-md flex items-center justify-center text-outline hover:text-error transition-colors shadow-md" title="إضافة للمفضلة">
            <span class="material-symbols-outlined text-[18px]">favorite</span>
          </button>

          <!-- Lot tag -->
          <div class="absolute bottom-3 right-3 bg-surface-container-lowest/80 backdrop-blur-md px-2.5 py-0.5 rounded-md text-[11px] font-mono text-outline border border-surface-variant/50">
            ${p.lot}
          </div>
        </div>

        <!-- Info Section -->
        <div class="space-y-2.5 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between text-xs text-secondary font-semibold">
              <span>${p.origin} • معالجة ${p.process}</span>
              <span class="text-outline font-normal">${p.altitude} م ارتفاع</span>
            </div>
            <a href="product.html?id=${p.id}" class="block group-hover:text-primary transition-colors">
              <h3 class="font-serif text-base font-bold text-on-surface line-clamp-1 mt-1">${p.title}</h3>
            </a>
            <p class="text-xs text-outline line-clamp-1 mt-0.5">${p.estate}</p>

            <!-- Tasting Notes Micro-Chips -->
            <div class="flex flex-wrap gap-1.5 mt-3">
              ${p.notes.map(n => `
                <span class="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[11px] border border-surface-variant/40">${n}</span>
              `).join('')}
            </div>
          </div>

          <!-- Bottom Action Row: Weight selector & Add to Cart -->
          <div class="pt-4 border-t border-surface-variant/40 space-y-3">
            <div class="flex items-center justify-between">
              <!-- Weight Pills -->
              <div id="weights-container-${p.id}" class="flex items-center bg-surface-container p-0.5 rounded-full text-[11px] border border-surface-variant/50">
                <button onclick="selectProductWeight('${p.id}', '250g')" data-weight="250g" class="px-2.5 py-0.5 rounded-full ${activeWeight === '250g' ? 'bg-primary text-surface-container-lowest font-bold' : 'text-outline hover:text-on-surface'} transition-colors">250g</button>
                <button onclick="selectProductWeight('${p.id}', '500g')" data-weight="500g" class="px-2.5 py-0.5 rounded-full ${activeWeight === '500g' ? 'bg-primary text-surface-container-lowest font-bold' : 'text-outline hover:text-on-surface'} transition-colors">500g</button>
                <button onclick="selectProductWeight('${p.id}', '1kg')" data-weight="1kg" class="px-2.5 py-0.5 rounded-full ${activeWeight === '1kg' ? 'bg-primary text-surface-container-lowest font-bold' : 'text-outline hover:text-on-surface'} transition-colors">1kg</button>
              </div>

              <!-- Price -->
              <div class="text-left">
                <span id="price-${p.id}" class="font-serif text-lg font-bold text-primary">$${activePrice}</span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="grid grid-cols-2 gap-2 pt-1">
              <a href="product.html?id=${p.id}" class="w-full py-2 px-3 rounded-full border border-surface-variant text-center text-xs font-semibold text-on-surface hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-1">
                <span>مواصفات التذوق</span>
              </a>
              <button onclick="quickAddToCart('${p.id}')" class="w-full py-2 px-3 rounded-full bg-primary text-surface-container-lowest text-center text-xs font-bold hover:bg-secondary transition-colors flex items-center justify-center gap-1 shadow-md">
                <span class="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                <span>حجز المحصول</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Global Exports
window.PRODUCTS_CATALOG = PRODUCTS_CATALOG;
window.initShop = initShop;
window.selectProductWeight = selectProductWeight;
window.quickAddToCart = quickAddToCart;
window.toggleWishlist = toggleWishlist;
window.resetAllFilters = resetAllFilters;

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('catalog-products-grid')) {
    initShop();
  }
});
