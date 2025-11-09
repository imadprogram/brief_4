function getDeck() {
    const deckJSON = localStorage.getItem('trollDeck');
    return deckJSON ? JSON.parse(deckJSON) : [];
}


let alldeck = document.getElementById('all-deck')
let playerSpot = document.getElementById('player-spot')
let battlespot = document.querySelectorAll('.myholder')

let allcards = getDeck();
let draggedCard = null;

allcards.forEach(card => {
    let adiv = document.createElement('div')
    adiv.className = `rounded-lg ${card.backgroundClass} bg-cover text-white relative w-44 h-[19rem] lg:w-32 lg:h-36 overflow-hidden shrink-0 dragabble`
    adiv.setAttribute('draggable', 'true')
    adiv.innerHTML += `                                   
                    <img src="${card.img}" alt="${card.name}" class=" absolute w-20">

                    <div class="backdrop-blur-sm absolute bottom-0 rounded-b-lg p-2 px-4 h-[30%] w-full">
                        <h2 class="font-lilita text-[.9rem] font-sf">${card.name}</h2>
                        <div class="flex justify-between items-center">
                            <h6 class="${card.rarityClass} rounded-full px-2 text-[7px] flex items-center font-semibold">
                                ${card.rarity}
                            </h6>
                        </div>
                    </div>
                `

    alldeck.appendChild(adiv)

    adiv.addEventListener('dragstart', () => {
        draggedCard = adiv;
        adiv.classList.add('opacity-[.5]')
    })

    adiv.addEventListener('dragend', () => {
        adiv.classList.remove('opacity-[.5]')
        draggedCard = null;
    })



})



playerSpot.addEventListener('dragover', e => e.preventDefault())
playerSpot.addEventListener('drop', e => {
    e.preventDefault()
    if (draggedCard) {
        if (playerSpot.children.length > 4) {
            alert('there is already 5 cards in your hand')
            return;
        } else {
            playerSpot.appendChild(draggedCard)
        }
    }
})

battlespot.forEach(spot => {
    spot.addEventListener('dragover', e => e.preventDefault())
    spot.addEventListener('drop', e => {
        e.preventDefault()
        if (draggedCard) {
            if (spot.children.length > 0) {
                alert('there is already a card in that place')
            } else {
                spot.appendChild(draggedCard)
                const choose = document.getElementById('choose')
                choose.classList.remove('hidden')

                const defender = document.getElementById('defender')
                defender.addEventListener('click' ,()=>{
                    spot.classList.add('rotate-90')
                    choose.classList.add('hidden')
                })

            }
        }
    })

})

