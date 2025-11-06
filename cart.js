document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
    const cartIconDesktop = document.getElementById('cart-icon');
    const cartIconMobile = document.getElementById('mobile-cart-icon'); // Assuming you fixed the HTML ID
    const cartBar = document.getElementById('cart-bar');
    
    // The container inside the cartBar where items will be listed
    let cartItemsContainer = document.createElement('div');
    cartItemsContainer.id = 'cart-items-container';
    // Adjusted padding-bottom for the fixed checkout button
    cartItemsContainer.className = 'p-4 pt-16 h-full overflow-y-auto text-white pb-32'; 
    cartBar.appendChild(cartItemsContainer);


    // --- 1. LOCAL STORAGE FUNCTIONS ---

    function getCart() {
        const cartJSON = localStorage.getItem('trollCart');
        return cartJSON ? JSON.parse(cartJSON) : [];
    }

    function saveCart(cartArray) {
        localStorage.setItem('trollCart', JSON.stringify(cartArray));
    }
    
    function getDeck() {
        const deckJSON = localStorage.getItem('trollDeck');
        return deckJSON ? JSON.parse(deckJSON) : [];
    }
    
    function saveDeck(deckArray) {
        localStorage.setItem('trollDeck', JSON.stringify(deckArray));
    }

    // UPDATED: Now receives a cardData object with ALL properties
    function toggleCart(cardData) {
        let cart = getCart();
        const existingItem = cart.find(item => item.name === cardData.name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            // Store the entire cardData object plus quantity
            cart.push({
                ...cardData, // Saves all properties: name, price, img, background, rarity, sparkle, desc
                quantity: 1
            });
        }
        
        saveCart(cart);
        displayCart();
        cartBar.classList.remove("translate-x-full"); 
    }

    // --- 2. CART BAR UI RENDERING ---

    function displayCart() {
        const cart = getCart();
        cartItemsContainer.innerHTML = ''; 
        let total = 0;
        
        document.getElementById('cart-footer-fixed')?.remove();

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-center mt-12 text-gray-400">Your cart is as empty as a troll without a hairbrush.</p>';
            return;
        }
        
        // --- 2a. Render Cart Items (No visual change, still shows compact view) ---
        let itemsHtml = '';
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            itemsHtml += `
                <div id="cart-item-${item.name.replace(/\s/g, '-')}" class="flex justify-between items-center py-3 border-b border-gray-700">
                    <img src="${item.img}" alt="${item.name}" class="w-12 h-12 object-cover rounded-full mr-3">
                    <div class="flex-grow">
                        <h4 class="text-sm font-semibold">${item.name}</h4>
                        <p class="text-xs text-gray-400">$${item.price.toFixed(2)} x ${item.quantity}</p>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button data-name="${item.name}" data-action="decrease" class="qty-btn bg-red-600 hover:bg-red-700 w-6 h-6 rounded-full text-white">-</button>
                        <span class="text-sm font-bold">${item.quantity}</span>
                        <button data-name="${item.name}" data-action="increase" class="qty-btn bg-blue-600 hover:bg-blue-700 w-6 h-6 rounded-full text-white">+</button>
                    </div>
                    <span class="text-sm ml-4 font-bold">$${itemTotal.toFixed(2)}</span>
                </div>
            `;
        });
        
        cartItemsContainer.innerHTML = itemsHtml;


        // --- 2b. Render Fixed Total and Checkout Button ---
        const footerHtml = document.createElement('div');
        footerHtml.id = 'cart-footer-fixed';
        footerHtml.className = 'p-4 fixed bottom-0 right-0 z-50 bg-gray-900 border-t border-gray-700';
        footerHtml.style.width = cartBar.style.width || '20rem';
        
        footerHtml.innerHTML = `
            <div class="pt-2">
                <div class="flex justify-between text-lg font-bold mb-4">
                    <span>TOTAL:</span>
                    <span>$${total.toFixed(2)}</span>
                </div>
                <button id="checkout-btn" class="w-full bg-[#CB4DA7] hover:bg-pink-700 text-white font-bold py-2 rounded-full transition duration-150">
                    <i class="fa-solid fa-cart-shopping mr-2"></i> Buy All Trolls
                </button>
            </div>
        `;
        
        cartBar.appendChild(footerHtml);

        attachQuantityListeners();
        
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', handleCheckout);
        }
    }


    // --- NEW: Checkout Logic (Unchanged) ---
    function handleCheckout() {
        let cart = getCart();
        let deck = getDeck();

        if (cart.length === 0) {
            alert("Your cart is empty. You can't buy air, even troll air!");
            return;
        }

        // 1. Merge items from cart to deck
        cart.forEach(cartItem => {
            const existingDeckItemIndex = deck.findIndex(deckItem => deckItem.name === cartItem.name);
            
            if (existingDeckItemIndex > -1) {
                // Item exists in deck, add quantity
                deck[existingDeckItemIndex].quantity += cartItem.quantity;
            } else {
                // Item is new to deck, store the entire item (with all card data)
                deck.push(cartItem);
            }
        });
        
        // 2. Save the updated deck
        saveDeck(deck);
        
        // 3. Clear the cart
        saveCart([]); 
        
        // 4. Update UI and notify user
        displayCart();
        cartBar.classList.add("translate-x-full"); 
        alert(`🎉 Purchase complete! ${cart.length} item types added to your deck! Check 'My Deck'.`);
    }

    // --- 3. QUANTITY MANAGEMENT (Unchanged) ---
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

            if (item.quantity <= 0) {
                cart.splice(itemIndex, 1);
            }
            
            saveCart(cart);
            displayCart(); 
        }
    }

    function attachQuantityListeners() {
        document.querySelectorAll('.qty-btn').forEach(button => {
            button.removeEventListener('click', handleQuantityClick); 
            button.addEventListener('click', handleQuantityClick);
        });
    }

    function handleQuantityClick(e) {
        const cardName = e.currentTarget.dataset.name;
        const action = e.currentTarget.dataset.action;
        updateQuantity(cardName, action);
    }


    // --- 4. MAIN EVENT LISTENERS (CRITICAL DATA CAPTURE UPDATE) ---
    
    function handleCartToggle() {
        cartBar.classList.toggle("translate-x-full");
        if (!cartBar.classList.contains("translate-x-full")) {
            displayCart(); 
        }
    }

    // A. Cart Icon Toggles
    if (cartIconDesktop && cartBar) {
        cartIconDesktop.addEventListener('click', handleCartToggle);
    }

    const cartIconMobileCheck = document.getElementById('mobile-cart-icon');
    if (cartIconMobileCheck && cartBar) {
        cartIconMobileCheck.addEventListener('click', handleCartToggle);
    }
    
    // B. Card Icon Listener (Add items)
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('cart-icon')) {
            const cardElement = e.target.closest('.rounded-lg');
            if (!cardElement) return;

            // --- TRICK: Extract ALL necessary data for the deck card ---
            
            // 1. Get Rarity and Rarity Color/Background
            const rarityElement = cardElement.querySelector('h6');
            const rarityText = rarityElement ? rarityElement.textContent.trim() : 'commun';
            const rarityClass = rarityElement ? Array.from(rarityElement.classList).find(cls => cls.startsWith('bg-')) : 'bg-[rgba(255,255,255,.2)]'; 
            
            // 2. Get Background Image URL
            // This is tricky as it's a Tailwind bg-[url('...')] class. We'll extract it from the element's style or class list.
            const bgClass = Array.from(cardElement.classList).find(cls => cls.startsWith('bg-[')) || 'bg-black';
            
            // 3. Get Sparkle Image (if exists)
            const sparkleImg = cardElement.querySelector('img[src*="sparkle"]');
            const sparkleSrc = sparkleImg ? sparkleImg.src : null;
            
            // 4. Extract Card Data
            const cardData = {
                name: cardElement.querySelector('h2.font-lilita').textContent.trim(),
                price: parseFloat(cardElement.querySelector('h3').textContent.replace('$', '')),
                img: cardElement.querySelector('img:not([src*="sparkle"])').src,
                description: cardElement.querySelector('p')?.textContent.trim() || 'No description.',
                
                // NEW: Full card rendering data
                backgroundClass: bgClass, // e.g., bg-[url('img/legendary.png')]
                rarity: rarityText,       // e.g., legendary
                rarityClass: rarityClass, // e.g., bg-purple-500
                sparkle: sparkleSrc       // e.g., img/sparkle.png or null
            };
            
            toggleCart(cardData);
            e.target.name = 'cart'; 
        }
    });
});