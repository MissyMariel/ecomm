document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { name: 'Apple', brand: 'Brand A', price: 50.00, weight: '200g', quantity: 10, category: 'food' },
        { name: 'Orange Juice', brand: 'Brand B', price: 150.00, volume: '500ml', quantity: 5, category: 'drinks' },
        { name: 'Soda', brand: 'Brand C', price: 100.00, volume: '1L', quantity: 8, category: 'beverages' },
        { name: 'Bread', brand: 'Brand D', price: 75.00, weight: '500g', quantity: 15, category: 'food' },
        { name: 'Milk', brand: 'Brand E', price: 90.00, volume: '1L', quantity: 7, category: 'drinks' },
        { name: 'Juice Box', brand: 'Brand F', price: 60.00, volume: '200ml', quantity: 10, category: 'drinks' },
        { name: 'Cookies', brand: 'Brand G', price: 180.00, weight: '300g', quantity: 12, category: 'food' },
        { name: 'Coffee', brand: 'Brand H', price: 200.00, weight: '250g', quantity: 9, category: 'beverages' },
        { name: 'Tea', brand: 'Brand I', price: 120.00, weight: '100g', quantity: 8, category: 'beverages' },
        { name: 'Cheese', brand: 'Brand J', price: 250.00, weight: '200g', quantity: 6, category: 'food' },
        { name: 'Chips', brand: 'Brand K', price: 90.00, weight: '150g', quantity: 14, category: 'food' },
        { name: 'Energy Drink', brand: 'Brand L', price: 130.00, volume: '500ml', quantity: 11, category: 'drinks' },
        { name: 'Water', brand: 'Brand M', price: 50.00, volume: '1L', quantity: 20, category: 'drinks' },
        { name: 'Chocolate', brand: 'Brand N', price: 110.00, weight: '100g', quantity: 13, category: 'food' },
        { name: 'Soft Drink', brand: 'Brand O', price: 100.00, volume: '1.5L', quantity: 9, category: 'beverages' },
        { name: 'Yogurt', brand: 'Brand P', price: 90.00, volume: '150ml', quantity: 10, category: 'food' },
        { name: 'Beer', brand: 'Brand Q', price: 180.00, volume: '500ml', quantity: 5, category: 'beverages' },
        { name: 'Ice Cream', brand: 'Brand R', price: 225.00, volume: '1L', quantity: 7, category: 'food' },
        { name: 'Fruit Juice', brand: 'Brand S', price: 150.00, volume: '1L', quantity: 6, category: 'drinks' },
        { name: 'Pasta', brand: 'Brand T', price: 140.00, weight: '500g', quantity: 12, category: 'food' },
        { name: 'Instant Noodles', brand: 'Brand U', price: 50.00, weight: '100g', quantity: 20, category: 'food' }
    ];

    const productList = document.getElementById('productList');
    const cartItems = document.getElementById('cartItems');
    const cartButton = document.getElementById('cartButton');
    const categoryFilter = document.getElementById('categoryFilter');
    const searchButton = document.getElementById('searchButton');
    const searchBar = document.getElementById('searchBar');
    const checkoutButton = document.getElementById('checkoutButton');
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderProducts(category = '') {
        productList.innerHTML = '';
        products
            .filter(product => category === '' || product.category === category)
            .forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <img src="https://via.placeholder.com/200" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>Brand: ${product.brand}</p>
                    <p>Price: ₱${product.price.toFixed(2)}</p>
                    ${product.weight ? `<p>Weight: ${product.weight}</p>` : `<p>Volume: ${product.volume}</p>`}
                    <p>Available: ${product.quantity}</p>
                    <div class="quantity-controls">
                        <button onclick="changeQuantity('${product.name}', -1)">-</button>
                        <span class="quantity">${product.quantity}</span>
                        <button onclick="changeQuantity('${product.name}', 1)">+</button>
                    </div>
                    <button onclick="addToCart('${product.name}')">Add to Cart</button>
                `;
                productList.appendChild(productCard);
            });
    }

    function renderCart() {
        cartItems.innerHTML = '';
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item.name} - ₱${item.price.toFixed(2)} (Qty: ${item.quantity})</span>
                <button onclick="removeFromCart(${index})">Delete</button>
            `;
            cartItems.appendChild(cartItem);
        });
        cartButton.textContent = `Cart (${cart.length})`;
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function addToCart(name) {
        const product = products.find(p => p.name === name);
        if (product && product.quantity > 0) {
            const existingCartItem = cart.find(item => item.name === name);
            if (existingCartItem) {
                existingCartItem.quantity++;
            } else {
                cart.push({...product, quantity: 1});
            }
            product.quantity--; // Decrease available quantity
            renderCart();
            renderProducts(categoryFilter.value);
        }
    }

    function removeFromCart(index) {
        const item = cart[index];
        if (item) {
            cart.splice(index, 1);
            const product = products.find(p => p.name === item.name);
            if (product) {
                product.quantity += item.quantity; // Re-add quantity to products
            }
            renderCart();
            renderProducts(categoryFilter.value);
        }
    }

    function changeQuantity(name, delta) {
        const product = products.find(p => p.name === name);
        if (product) {
            product.quantity += delta;
            if (product.quantity < 0) product.quantity = 0;
            renderProducts(categoryFilter.value);
        }
    }

    function checkout() {
        alert('Checkout is not implemented yet.');
    }

    searchButton.addEventListener('click', () => {
        renderProducts(categoryFilter.value);
    });

    categoryFilter.addEventListener('change', (e) => {
        renderProducts(e.target.value);
    });

    checkoutButton.addEventListener('click', checkout);

    renderProducts();
    renderCart();
});
