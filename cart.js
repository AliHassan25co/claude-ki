// Simple cart system using localStorage so cart persists across pages

function getCart() {
  return JSON.parse(localStorage.getItem('gadgethub_cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('gadgethub_cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = getCart();
  const countEl = document.getElementById('cartCount');
  if (countEl) countEl.innerText = cart.length;
}

function addToCart(name, price, image) {
  const cart = getCart();
  cart.push({ name, price, image });
  saveCart(cart);

  // ============================================
  // 🔽 YAHAN AddToCart EVENT CODE AANI CHAHIYE 🔽
  // fbq('track', 'AddToCart', {
  //   content_name: name,
  //   value: price,
  //   currency: 'PKR'
  // });
  // ============================================

  alert(name + " cart mein add ho gaya!");
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCartPage();
}

function renderCartPage() {
  const cart = getCart();
  const container = document.getElementById('cartItems');
  const summary = document.getElementById('cartSummary');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = '<div class="empty-cart">Cart khali hai. <a href="products.html">Shop karne jao &rarr;</a></div>';
    if (summary) summary.style.display = 'none';
    return;
  }

  let total = 0;
  container.innerHTML = cart.map((item, i) => {
    total += item.price;
    return `
      <div class="cart-item">
        <div class="cart-item-info">
          <img src="${item.image}" alt="${item.name}">
          <span>${item.name} — Rs. ${item.price}</span>
        </div>
        <button class="remove" onclick="removeFromCart(${i})">Remove</button>
      </div>`;
  }).join('');

  if (summary) {
    summary.style.display = 'block';
    document.getElementById('cartTotal').innerText = total;
  }
}

function completePurchase() {
  const cart = getCart();
  if (cart.length === 0) {
    alert("Cart khali hai!");
    return;
  }
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  // ============================================
  // 🔽 YAHAN Purchase EVENT CODE AANI CHAHIYE 🔽
  // fbq('track', 'Purchase', {
  //   value: total,
  //   currency: 'PKR'
  // });
  // ============================================

  alert("Purchase complete! Total: Rs. " + total);
  localStorage.removeItem('gadgethub_cart');
  renderCartPage();
  updateCartCount();
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  renderCartPage();
});
