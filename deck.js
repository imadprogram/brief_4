document.addEventListener('DOMContentLoaded', () => {

    const deckContainer = document.getElementById('deck-container');
    // Select the form containing the radio buttons
    const form = document.querySelector("form");
    
    // 1. Data Retrieval
    function getDeck() {
        // Retrieves the full deck data from localStorage
        const deckJSON = localStorage.getItem('trollDeck');
        return deckJSON ? JSON.parse(deckJSON) : [];
    }

    // 2. Display function updated to accept the array to render
    function displayDeck(arrToDisplay) {
        if (!deckContainer) {
            console.error("Deck container element with ID 'deck-container' not found.");
            return;
        }

        deckContainer.innerHTML = '';
        deckContainer.className = 'cards-container grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-24 overflow-x-hidden pt-16 relative min-h-[12em]';

        if (arrToDisplay.length === 0) {
            const allCards = getDeck();
            let message = "Your deck is empty! <br>Go to the Market and buy some trolls to start your collection.";
            
            if (allCards.length > 0) {
                // If the full deck is NOT empty, but the filter result IS empty
                const filterId = form.querySelector('input[name="sort"]:checked')?.id;
                // Capitalize the rarity name for the message
                const rarityName = filterId ? filterId.charAt(0).toUpperCase() + filterId.slice(1) : 'Filtered'; 
                message = `No ${rarityName} Trolls found in your deck. Try another filter!`;
            }

            // Display the appropriate empty/filtered message
            deckContainer.innerHTML = `
                <p class="text-white text-center text-xl mt-20 p-4 absolute left-1/2 translate-x-[-50%]">
                    ${message}
                </p>
            `;
            return;
        }

        // Render the cards
        arrToDisplay.forEach(item => {
            const sparkleImgHTML = item.sparkle 
                ? `<img src="${item.sparkle}" alt="" class="w-[250px] absolute left-[-1rem] top-0">` 
                : '';
            
            // Custom positioning for characters
            const characterPositionClass = item.img.includes('lorry') ? 'top-[-5rem] left-[20%]' : 'top-[-3rem] left-[5%]'; 
            const characterWidth = item.img.includes('lorry') ? 'w-[120px]' : (item.img.includes('poppy') ? 'w-[160px]' : 'w-[180px]');

            deckContainer.innerHTML += `
                <div 
                    class="rounded-lg ${item.backgroundClass} bg-cover text-white relative w-44 h-[19rem] lg:w-56 lg:h-[20rem] overflow-hidden">
                    
                    ${sparkleImgHTML}
                    
                    <img src="${item.img}" alt="${item.name}" class="${characterWidth} absolute ${characterPositionClass}">
                    
                    <div class="absolute top-2 right-2 bg-blue-700 rounded-full px-3 py-1 text-xs font-bold z-10">
                        x${item.quantity}
                    </div>

                    <div class="backdrop-blur-sm absolute bottom-0 rounded-b-lg p-2 px-4 h-[30%] w-full">
                        <h2 class="font-lilita text-[.9rem] font-sf">${item.name}</h2>
                        <div class="flex justify-between items-center">
                            <h6 class="${item.rarityClass} rounded-full px-2 text-[7px] flex items-center font-semibold">
                                ${item.rarity}
                            </h6>
                            <h3 class="text-sf font-bold text-[.8rem] font-sf">$${item.price.toFixed(2)}</h3>
                        </div>
                        <p class="text-[.5rem] mt-1 line-clamp-2">${item.description}</p>
                    </div>
                </div>
            `;
        });
    }

    // 3. Filtering Logic and Event Handler
    function handleFilterChange() {
        const fullDeck = getDeck();
        // Get the ID of the currently checked radio button (e.g., 'legendary', 'all')
        const filterId = form.querySelector('input[name="sort"]:checked')?.id || 'all';

        let filteredCards = fullDeck;

        if (filterId !== 'all') {
            // Filter the full deck where item.rarity matches the filter ID
            filteredCards = fullDeck.filter(item => item.rarity === filterId);
        }

        // Display the filtered results
        displayDeck(filteredCards);
    }

    // Initial load: Display all cards (this effectively acts as the default 'all' filter)
    handleFilterChange();

    // Attach listener to the form to handle filter changes
    if (form) {
        form.addEventListener('change', handleFilterChange);
    }
});