// Shopping Cart functionality
class ShoppingCart {
    constructor() {
        try {
            this.cart = JSON.parse(localStorage.getItem("ahw-cart")) || [];
            // Ensure this.cart is always an array
            if (!Array.isArray(this.cart)) {
                this.cart = [];
                localStorage.setItem("ahw-cart", JSON.stringify(this.cart)); // Reset invalid data
            }
        } catch (e) {
            console.error("Error parsing cart from localStorage:", e);
            this.cart = [];
            localStorage.setItem("ahw-cart", JSON.stringify(this.cart)); // Reset on error
        }
        
        this.cartCountElement = document.querySelector(".cart-count");
        this.cartTextElement = document.querySelector(".cart-text");
        this.total = 0;
        this.updateCartDisplay();
        this.attachEventListeners();
    }

    attachEventListeners() {
        document.body.addEventListener("click", (event) => {
            if (event.target.classList.contains("add-to-cart-btn")) {
                this.addToCart(event.target);
            }
        });
    }

    addToCart(button) {
        const productCard = button.closest(".product-card");
        if (!productCard) return;

        const productId = productCard.dataset.id;
        const productName = productCard.querySelector("h3").textContent;
        const productPriceText = productCard.querySelector(".product-price .price").textContent;
        const productImageElement = productCard.querySelector(".product-image img");
        const productImage = productImageElement ? productImageElement.getAttribute("src") : "";

        const priceNumber = parseFloat(productPriceText.replace("MAD", "").replace(/,/g, ""));

        let product = this.cart.find(item => item.id === productId);

        if (product) {
            product.quantity++;
        } else {
            product = {
                id: productId,
                name: productName,
                price: priceNumber,
                image: productImage,
                quantity: 1
            };
            this.cart.push(product);
        }

        localStorage.setItem("ahw-cart", JSON.stringify(this.cart));
        this.updateCartDisplay();
        alert(`${productName} added to cart!`);
    }

    updateCartDisplay() {
        let count = 0;
        this.total = 0;
        this.cart.forEach(item => {
            count += item.quantity;
            this.total += item.price * item.quantity;
        });
        this.cartCountElement.textContent = count;
        this.cartTextElement.textContent = `MAD${this.total.toLocaleString()}`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new ShoppingCart();

    // Search functionality
    const searchInput = document.querySelector(".search-bar input");
    const searchButton = document.querySelector(".search-bar .search-btn");

    if (searchInput && searchButton) {
        searchButton.addEventListener("click", () => performSearch());
        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                performSearch();
            }
        });
    }

    function performSearch() {
        const query = searchInput.value.toLowerCase();
        const productCards = document.querySelectorAll(".product-card");

        productCards.forEach(card => {
            const productName = card.querySelector("h3").textContent.toLowerCase();
            if (productName.includes(query)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    // Menu toggle for mobile
    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");

    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            mainNav.classList.toggle("active");
        });
    }
});


