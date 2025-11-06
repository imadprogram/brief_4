document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
    const cartIcon = document.getElementById('cart-icon');
    const cartBar = document.getElementById('cart-bar');
    
    // The container inside the cartBar where items will be listed
    // (You will need to add an element with this ID inside your cart-bar div in HTML later)
    let cartItemsContainer = document.createElement('div');
    cartItemsContainer.id = 'cart-items-container';
    cartItemsContainer.className = 'p-4 pt-16 h-full overflow-y-auto text-white';
    cartBar.appendChild(cartItemsContainer);


    // --- 1. LOCAL STORAGE FUNCTIONS ---

    // Retrieves the current cart items from localStorage (or an empty array if none exist)
    function getCart() {
        const cartJSON = localStorage.getItem('trollCart');
        return cartJSON ? JSON.parse(cartJSON) : [];
    }

    // Saves the current cart array back to localStorage
    function saveCart(cartArray) {
        localStorage.setItem('trollCart', JSON.stringify(cartArray));
    }

    // Adds a card to the cart, or increases its quantity if it already exists
    function toggleCart(cardData) {
        let cart = getCart();
        const existingItem = cart.find(item => item.name === cardData.name);

        if (existingItem) {
            // Item exists, increase quantity
            existingItem.quantity += 1;
        } else {
            // Item is new, add it with quantity 1
            cart.push({
                name: cardData.name,
                price: cardData.price,
                img: cardData.character,
                quantity: 1
            });
        }
        
        saveCart(cart);
        displayCart(); // Update the visual cart display immediately
        console.log(`🛒 Added/Updated: ${cardData.name}. Current total: ${cart.length} unique items.`);
    }

    // --- 2. CART BAR UI RENDERING ---

    function displayCart() {
        const cart = getCart();
        cartItemsContainer.innerHTML = ''; // Clear previous content
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-center mt-12 text-gray-400">Your cart is as empty as a troll without a hairbrush.</p>';
            return;
        }

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            cartItemsContainer.innerHTML += `
                <div id="cart-item-${item.name.replace(/\s/g, '-')}" class="flex justify-between items-center py-3 border-b border-gray-700">
                    <img src="${item.img}" alt="${item.name}" class="w-12 h-12 object-cover rounded-full mr-3">
                    <div class="flex-grow">
                        <h4 class="text-sm font-semibold">${item.name}</h4>
                        <p class="text-xs text-gray-400">$${item.price} x ${item.quantity}</p>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button data-name="${item.name}" data-action="decrease" class="qty-btn bg-red-600 hover:bg-red-700 w-6 h-6 rounded-full text-white">-</button>
                        <span class="text-sm font-bold">${item.quantity}</span>
                        <button data-name="${item.name}" data-action="increase" class="qty-btn bg-blue-600 hover:bg-blue-700 w-6 h-6 rounded-full text-white">+</button>
                    </div>
                    <span class="text-sm ml-4 font-bold">$${itemTotal}</span>
                </div>
            `;
        });
        
        // Add total summary at the bottom
        cartItemsContainer.innerHTML += `
            <div class="pt-4 mt-4 border-t-2 border-green-400">
                <div class="flex justify-between text-lg font-bold">
                    <span>TOTAL:</span>
                    <span>$${total.toFixed(2)}</span>
                </div>
            </div>
        `;
        
        // Re-attach listeners for the new quantity buttons
        attachQuantityListeners();
    }


    // --- 3. QUANTITY MANAGEMENT ---

    function updateQuantity(cardName, action) {
        let cart = getCart();
        const itemIndex = cart.findIndex(item => item.name === cardName);

        if (itemIndex > -1) {
            const item = cart[itemIndex];

            if (action === 'increase') {
                item.quantity += 1;
            } else if (action === 'decrease') {
                item.quantity -= 1;
            }

            // Remove item if quantity drops to 0 or less
            if (item.quantity <= 0) {
                cart.splice(itemIndex, 1);
            }
            
            saveCart(cart);
            displayCart(); // Re-render the cart
        }
    }

    // Attaches listeners to the quantity buttons
    function attachQuantityListeners() {
        document.querySelectorAll('.qty-btn').forEach(button => {
            // Remove any old listeners to prevent duplication
            button.removeEventListener('click', handleQuantityClick); 
            // Add the new listener
            button.addEventListener('click', handleQuantityClick);
        });
    }

    // Click handler for the quantity buttons
    function handleQuantityClick(e) {
        const cardName = e.currentTarget.dataset.name;
        const action = e.currentTarget.dataset.action;
        updateQuantity(cardName, action);
    }


    // --- 4. MAIN EVENT LISTENERS ---

    // A. Main Cart Icon Toggle
    if (cartIcon && cartBar) {
        cartIcon.addEventListener('click', () => {
            cartBar.classList.toggle("translate-x-full");
            
            // Crucial: Update the cart content every time it opens!
            if (!cartBar.classList.contains("translate-x-full")) {
                displayCart(); 
            }
        });
    }
    
    // B. Card Icon Listener (We use event delegation on the body/document)
    // This allows us to capture clicks on card icons without needing access to script.js's 'cards' array.
    document.body.addEventListener('click', (e) => {
        // Check if the clicked element (or its parent) has the class 'cart-icon'
        if (e.target.classList.contains('cart-icon')) {
            const id = e.target.id;
            const nameofcard = id.replace('cart-', '');
            
            // --- TRICK: Find the Card's Data in the DOM ---
            const cardElement = e.target.closest('.rounded-lg');
            if (!cardElement) return;

            // This is brittle, but necessary if cart.js is truly isolated:
            const cardData = {
                name: cardElement.querySelector('h2.font-lilita').textContent,
                price: parseFloat(cardElement.querySelector('h3').textContent.replace('$', '')),
                character: cardElement.querySelector('img:not([src*="sparkle"])').src
            };
            
            toggleCart(cardData);
            
            // Optional: Visually indicate item was added
            e.target.name = 'cart'; 
        }
    });
});