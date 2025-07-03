document.addEventListener("DOMContentLoaded", function() {
    const cartItemsContainer = document.querySelector(".cart-items-container");
    const emptyCartMessage = document.querySelector(".empty-cart-message");
    const cartSubtotalSpan = document.getElementById("cart-subtotal");
    const cartShippingSpan = document.getElementById("cart-shipping");
    const cartTotalSpan = document.getElementById("cart-total");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
        updateCartIcon();
    }

    function updateCartIcon() {
        const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        document.querySelector(".cart-count").textContent = cartCount;
        document.querySelector(".cart-text").textContent = `MAD${cartTotal.toLocaleString()}`;
    }

    function renderCartItems() {
        cartItemsContainer.innerHTML = ""; // Clear existing items

        if (cart.length === 0) {
            emptyCartMessage.style.display = "block";
        } else {
            emptyCartMessage.style.display = "none";
            cart.forEach(item => {
                const cartItemDiv = document.createElement("div");
                cartItemDiv.classList.add("cart-item");
                cartItemDiv.innerHTML = `
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p>Price: MAD${item.price.toLocaleString()}</p>
                        <div class="quantity-controls">
                            <button class="decrease-quantity" data-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="increase-quantity" data-id="${item.id}">+</button>
                        </div>
                        <button class="remove-item" data-id="${item.id}">Remove</button>
                    </div>
                    <div class="cart-item-total">
                        MAD${(item.price * item.quantity).toLocaleString()}
                    </div>
                `;
                cartItemsContainer.appendChild(cartItemDiv);
            });
        }
    }

    function updateCartSummary() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 0 ? 50 : 0; // Example: MAD50 shipping if cart is not empty
        const total = subtotal + shipping;

        cartSubtotalSpan.textContent = `MAD${subtotal.toLocaleString()}`;
        cartShippingSpan.textContent = `MAD${shipping.toLocaleString()}`;
        cartTotalSpan.textContent = `MAD${total.toLocaleString()}`;
    }

    function updateCartDisplay() {
        renderCartItems();
        updateCartSummary();
    }

    // Event Listeners for quantity controls and remove button
    cartItemsContainer.addEventListener("click", function(event) {
        if (event.target.classList.contains("increase-quantity")) {
            const itemId = event.target.dataset.id;
            const item = cart.find(i => i.id === itemId);
            if (item) {
                item.quantity++;
                saveCart();
            }
        } else if (event.target.classList.contains("decrease-quantity")) {
            const itemId = event.target.dataset.id;
            const item = cart.find(i => i.id === itemId);
            if (item && item.quantity > 1) {
                item.quantity--;
                saveCart();
            }
        } else if (event.target.classList.contains("remove-item")) {
            const itemId = event.target.dataset.id;
            cart = cart.filter(i => i.id !== itemId);
            saveCart();
        }
    });

    // Initial display update
    updateCartDisplay();
    updateCartIcon();
});


