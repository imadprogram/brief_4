document.addEventListener('DOMContentLoaded', () => {

    
    const cartIconDesktop = document.getElementById('cart-icon');
    const cartIconMobile = document.getElementById('mobile-cart-icon'); 
    const cartBar = document.getElementById('cart-bar');
    
    
    let cartItemsContainer = document.createElement('div');
    cartItemsContainer.id = 'cart-items-container';
   
    cartItemsContainer.className = 'p-4 pt-16 h-full overflow-y-auto text-white pb-32'; 
    cartBar.appendChild(cartItemsContainer);



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

    function toggleCart(cardData) {
        let cart = getCart();
        const existingItem = cart.find(item => item.name === cardData.name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...cardData, 
                quantity: 1
            });
        }
        
        saveCart(cart);
        displayCart();
        cartBar.classList.remove("translate-x-full"); 
    }



    function displayCart() {
        const cart = getCart();
        cartItemsContainer.innerHTML = ''; 
        let total = 0;
        
        document.getElementById('cart-footer-fixed')?.remove();

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-center mt-12 text-gray-400">Your cart is as empty as a troll without a hairbrush.</p>';
            return;
        }
        
        
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


        const footerHtml = document.createElement('div');
        footerHtml.id = 'cart-footer-fixed';
        footerHtml.className = 'p-4 fixed bottom-0 right-0 z-50 bg-gray-900 border-t border-gray-700 text-white';
        footerHtml.style.width = cartBar.style.width || '19rem';
        
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


    function handleCheckout() {
        let cart = getCart();
        let deck = getDeck();

        if (cart.length === 0) {
            alert("Your cart is empty. You can't buy air, even troll air!");
            return;
        }

        cart.forEach(cartItem => {
            const existingDeckItemIndex = deck.findIndex(deckItem => deckItem.name === cartItem.name);
            
            if (existingDeckItemIndex > -1) {
                deck[existingDeckItemIndex].quantity += cartItem.quantity;
            } else {
                deck.push(cartItem);
            }
        });
        
        saveDeck(deck);
        
        saveCart([]); 
        
        displayCart();
        cartBar.classList.add("translate-x-full"); 
        alert(`🎉 Purchase complete! ${cart.length} item types added to your deck! Check 'My Deck'.`);
    }

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



    
    function handleCartToggle() {
        cartBar.classList.toggle("translate-x-full");
        if (!cartBar.classList.contains("translate-x-full")) {
            displayCart(); 
        }
    }

    if (cartIconDesktop && cartBar) {
        cartIconDesktop.addEventListener('click', handleCartToggle);
    }

    const cartIconMobileCheck = document.getElementById('mobile-cart-icon');
    if (cartIconMobileCheck && cartBar) {
        cartIconMobileCheck.addEventListener('click', handleCartToggle);
    }
    
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('cart-icon')) {
            const cardElement = e.target.closest('.rounded-lg');
            if (!cardElement) return;


            const rarityElement = cardElement.querySelector('h6');
            const rarityText = rarityElement ? rarityElement.textContent.trim() : 'commun';
            const rarityClass = rarityElement ? Array.from(rarityElement.classList).find(cls => cls.startsWith('bg-')) : 'bg-[rgba(255,255,255,.2)]'; 
            
            const bgClass = Array.from(cardElement.classList).find(cls => cls.startsWith('bg-[')) || 'bg-black';
            
            const sparkleImg = cardElement.querySelector('img[src*="sparkle"]');
            const sparkleSrc = sparkleImg ? sparkleImg.src : null;
            
            const cardData = {
                name: cardElement.querySelector('h2.font-lilita').textContent.trim(),
                price: parseFloat(cardElement.querySelector('h3').textContent.replace('$', '')),
                img: cardElement.querySelector('img:not([src*="sparkle"])').src,
                description: cardElement.querySelector('p')?.textContent.trim() || 'No description.',
                
                backgroundClass: bgClass, 
                rarity: rarityText,      
                rarityClass: rarityClass, 
                sparkle: sparkleSrc       
            };
            
            toggleCart(cardData);
            e.target.name = 'cart'; 
        }
    });
});
