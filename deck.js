document.addEventListener('DOMContentLoaded', () => {

    const deckContainer = document.getElementById('deck-container');

    function getDeck() {
        const deckJSON = localStorage.getItem('trollDeck');
        return deckJSON ? JSON.parse(deckJSON) : [];
    }

    function displayDeck() {
        const deck = getDeck();

        if (!deckContainer) {
            console.error("Deck container element with ID 'deck-container' not found.");
            return;
        }

        deckContainer.innerHTML = '';
        

        deckContainer.className = 'cards-container h-fit grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-24 overflow-x-hidden pt-16';

        if (deck.length === 0) {
            deckContainer.innerHTML = `
                <p class="text-white text-center text-xl mt-20 p-4 absolute left-1/2 translate-x-[-50%]">
                    Your deck is empty! 
                    <br>Go to the Market and buy some trolls to start your collection.
                </p>
            `;
            return;
        }

        deck.forEach(item => {

            

            const sparkleImgHTML = item.sparkle 
                ? `<img src="${item.sparkle}" alt="" class="w-[250px] absolute left-[-1rem] top-0">` 
                : '';
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

    displayDeck();
});
