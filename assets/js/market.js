/*
=========================================================
MKANGA-ULIMI FARM MARKET ENGINE
=========================================================
*/

let cart = [];
let selectedCategory = "all";

const productGrid = document.getElementById("productGrid");
const productSearch = document.getElementById("productSearch");
const categoryFilters = document.getElementById("categoryFilters");
const noProducts = document.getElementById("noProducts");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const cartOverlay = document.getElementById("cartOverlay");


/* =========================================================
   BUILD CATEGORY BUTTONS AUTOMATICALLY
========================================================= */

function buildCategoryFilters() {

  const categories = [
    { id: "all", name: "All" }
  ];

  MARKET_PRODUCTS.forEach(product => {

    const exists = categories.some(
      category => category.id === product.category
    );

    if (!exists) {
      categories.push({
        id: product.category,
        name: product.categoryName
      });
    }

  });

  categoryFilters.innerHTML = categories.map(category => `
    <button
      class="category-btn ${category.id === "all" ? "active" : ""}"
      data-category="${category.id}"
    >
      ${category.name}
    </button>
  `).join("");

  document.querySelectorAll(".category-btn").forEach(button => {

    button.addEventListener("click", () => {

      document.querySelectorAll(".category-btn")
        .forEach(btn => btn.classList.remove("active"));

      button.classList.add("active");

      selectedCategory = button.dataset.category;

      renderProducts();

    });

  });

}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts() {

  const searchTerm = productSearch.value
    .toLowerCase()
    .trim();

  const filteredProducts = MARKET_PRODUCTS.filter(product => {

    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm) ||
      product.categoryName.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm);

    return matchesCategory && matchesSearch;

  });

  productGrid.innerHTML = filteredProducts.map(product => {

    const unavailable = !product.available;

    return `
      <article class="market-product-card">

        <div class="product-image">

          <img
            src="${product.image}"
            alt="${product.name}"
            onerror="this.src='assets/images/hero.jpg'"
          >

          <span class="availability ${unavailable ? "out-of-stock" : "in-stock"}">
            ${unavailable ? "Out of Stock" : "Available"}
          </span>

        </div>

        <div class="product-details">

          <span class="product-category">
            ${product.categoryName}
          </span>

          <h3>${product.name}</h3>

          <p class="product-description">
            ${product.description}
          </p>

          <div class="product-price">
            ${product.priceDisplay}
          </div>

          <small>
            ${product.unit}
          </small>

          <div class="product-actions">

            <div class="quantity-control">

    <button 
        type="button"
        class="qty-minus"
    >
        -
    </button>

    <input 
        type="number"
        value="1"
        min="1"
        class="qty-input"
    >

    <button 
        type="button"
        class="qty-plus"
    >
        +
    </button>

</div>

            <button
              class="add-cart-btn"
              onclick="addProductToCart('${product.id}', this)"
              ${unavailable ? "disabled" : ""}
            >
              <i class="fa-solid fa-cart-plus"></i>
              ${unavailable ? "Unavailable" : "Add"}
            </button>

          </div>

        </div>

      </article>
    `;

  }).join("");

  noProducts.style.display =
    filteredProducts.length === 0
      ? "block"
      : "none";

}


/* =========================================================
   QUANTITY CONTROL
========================================================= */

function changeQuantity(button, change) {

  const container = button.parentElement;

  const display =
    container.querySelector("span");

  let quantity =
    parseInt(display.textContent);

  quantity += change;

  if (quantity < 1) {
    quantity = 1;
  }

  display.textContent = quantity;

}


/* =========================================================
   ADD PRODUCT TO CART
========================================================= */

function addProductToCart(productId, button) {

  const product =
    MARKET_PRODUCTS.find(
      item => item.id === productId
    );

  if (!product || !product.available) {
    return;
  }

const quantityInput =
button.parentElement.querySelector(".qty-input");

const quantity =
parseInt(quantityInput.value) || 1;
  const existing =
    cart.find(
      item => item.id === productId
    );

  if (existing) {

    existing.quantity += quantity;

  } else {

    cart.push({
      ...product,
      quantity: quantity
    });

  }

  updateCart();

  openCart();

}


/* =========================================================
   UPDATE CART
========================================================= */

function updateCart() {

  const totalItems =
    cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  cartCount.textContent =
    totalItems;


  if (cart.length === 0) {

    cartItems.innerHTML = `
      <div class="empty-cart">
        <i class="fa-solid fa-cart-shopping fa-2x"></i>
        <p>Your cart is empty.</p>
      </div>
    `;

    cartTotal.textContent =
      "Price on Enquiry";

    return;

  }


  cartItems.innerHTML =
    cart.map((item, index) => `

      <div class="cart-item">

        <div>

          <h4>${item.name}</h4>

          <p>
            Quantity: ${item.quantity}
          </p>

          <p>
            ${item.priceDisplay}
          </p>

        </div>

        <button
          class="remove-item"
          onclick="removeFromCart(${index})"
          aria-label="Remove ${item.name}"
        >
          <i class="fa-solid fa-trash"></i>
        </button>

      </div>

    `).join("");


  const hasPrices =
    cart.every(
      item =>
        typeof item.price === "number"
    );

  if (hasPrices) {

    const total =
      cart.reduce(
        (sum, item) =>
          sum + (item.price * item.quantity),
        0
      );

    cartTotal.textContent =
      `MWK ${total.toLocaleString()}`;

  } else {

    cartTotal.textContent =
      "Price on Enquiry";

  }

}


/* =========================================================
   REMOVE FROM CART
========================================================= */

function removeFromCart(index) {

  cart.splice(index, 1);

  updateCart();

}


/* =========================================================
   OPEN CART
========================================================= */

function openCart() {

  cartOverlay.classList.add("active");

}


/* =========================================================
   CLOSE CART
========================================================= */

function closeCart() {

  cartOverlay.classList.remove("active");

}


/* =========================================================
   WHATSAPP CHECKOUT
========================================================= */

function checkoutWhatsApp() {

  if (cart.length === 0) {

    alert(
      "Your cart is empty. Please add a product first."
    );

    return;

  }

  let message =
    "Hello Mkanga-Ulimi Farm!%0A%0A";

  message +=
    "I would like to order the following:%0A%0A";

  cart.forEach(item => {

    message +=
      "- " +
      item.name +
      " x " +
      item.quantity +
      " (" +
      item.unit +
      ")%0A";

  });

  message +=
    "%0APlease confirm availability, pricing and collection/delivery details.";

  const whatsappURL =
    "https://wa.me/265999826757?text=" +
    message;

  window.open(
    whatsappURL,
    "_blank"
  );

}


/* =========================================================
   SEARCH
========================================================= */

productSearch.addEventListener(
  "input",
  renderProducts
);


/* =========================================================
   CLOSE CART WHEN CLICKING OUTSIDE
========================================================= */

cartOverlay.addEventListener(
  "click",
  function(event) {

    if (event.target === cartOverlay) {
      closeCart();
    }

  }
);


/* =========================================================
   INITIALIZE MARKET
========================================================= */

buildCategoryFilters();

renderProducts();
document.addEventListener("click", function(e){

    if(e.target.classList.contains("qty-plus")){

        let input = e.target.parentElement.querySelector(".qty-input");

        input.value = parseInt(input.value) + 1;

    }


    if(e.target.classList.contains("qty-minus")){

        let input = e.target.parentElement.querySelector(".qty-input");

        let value = parseInt(input.value);

        if(value > 1){
            input.value = value - 1;
        }

    }

});

updateCart();
