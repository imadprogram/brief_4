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
    adiv.className = `rounded-lg ${card.backgroundClass} bg-cover text-white relative w-44 h-[19rem] lg:w-36 lg:h-50 overflow-hidden shrink-0 dragabble`
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
        if (playerSpot.children.length > 5) {
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
                defender.onclick = () => {
                    spot.classList.add('rotate-90','transition','bg-blue-400')
                    spot.classList.remove('bg-gray-800')
                    choose.classList.add('hidden')

                    let shield = document.getElementById('shield')
                    // shield.classList.remove('hidden')
                    // shield.classList.add('animate-[defender_1s_ease]', 'z-10')
                    spot.classList.add('animate-[defender_1s_ease]')

                    cardofenemy(Math.floor(Math.random() * 5))

                    
                    // let shield = document.createElement('img')
                    // shield.src = 'img/shield.png'
                    // spot.appendChild(shield)
                    // shield.classList.add('animate-[defender_1s_ease_.3s]', 'absolute','rotate-[-90deg]')
                    // setTimeout(() => {
                    // shield.classList.add('hidden')
                    // spot.removeChild(shield)
                    // }, 1500);
                }

                const attacker = document.getElementById('attacker')
                attacker.onclick = () => {
                    // spot.classList.add('rotate-90')
                    spot.classList.add('transition')
                    spot.classList.add('bg-red-400')
                    spot.classList.remove('bg-gray-800')

                    choose.classList.add('hidden')
                    spot.classList.add('animate-[fire_1.5s_ease]')

                    cardofenemy(Math.floor(Math.random() * 5))
                }

            }
        }
    })

})



// for mobile


let closebtn = document.getElementById('closebtn')
let hand = document.getElementById('hand')

hand.addEventListener('click', ()=>{
    playerSpot.classList.remove('right-[-10em]')
    playerSpot.classList.add('right-0')
    playerSpot.classList.add('transition')

})
closebtn.addEventListener('click', ()=>{
    playerSpot.classList.add('right-[-10em]')
    playerSpot.classList.remove('right-0')
})



// automation


const cards = [
  {
    background: "img/legendary.png",
    character: "img/poppy.png",
    name: "Queen Poppy",
    type: "legendary",
    color: "#8A2BE2",
    price: 99
  },
  {
    background: "img/epic.png",
    character: "img/green-guy.png",
    name: "Green Guy",
    type: "epic",
    color: "#00B35A",
    price: 79
  },
  {
    background: "img/commun.png",
    character: "img/groso.png",
    name: "Groso",
    type: "commun",
    color: "rgba(255, 255, 255, 0.2)",
    price: 19
  },
  {
    background: "img/epic.png",
    character: "img/goblen.png",
    name: "Goblen",
    type: "epic",
    color: "#00B35A",
    price: 79
  },
  {
    background: "img/rare.png",
    character: "img/hairy.png",
    name: "Hairy",
    type: "rare",
    color: "#FF8C00",
    price: 59
  },
  {
    background: "img/legendary.png",
    character: "img/diamond-guy.png",
    name: "Diamond guy",
    type: "legendary",
    color: "#8A2BE2",
    price: 99
  },
  {
    background: "img/commun.png",
    character: "img/nino.png",
    name: "Nino",
    type: "commun",
    color: "rgba(255, 255, 255, .4)",
    price: 19
  },
  {
    background: "img/rare.png",
    character: "img/clover.png",
    name: "Clover",
    type: "rare",
    color: "#FF8C00",
    price: 59
  },
  {
    background: "img/legendary.png",
    character: "img/lorry.png",
    name: "Lorry",
    type: "legendary",
    color: "#8A2BE2",
    price: 99
  },
  {
    background: "img/epic.png",
    character: "img/bluue.png",
    name: "Bluue",
    type: "epic",
    color: "#00B35A",
    price: 79
  }
];

let enemyspot = document.querySelectorAll('.hisholder')


function cardofenemy(index){
    
    let choosen = cards[index]
    if(enemyspot[index].children.length > 0){
        // alert('3amra')
        let newindex = Math.floor(Math.random() * enemyspot.length)
        cardofenemy(newindex)
        return;
    }else{
    enemyspot[index].innerHTML = `
            <div class="rounded-lg bg-[url('${choosen.background}')] bg-cover text-white relative w-44 h-[19rem] lg:w-36 lg:h-50 overflow-hidden shrink-0">                                   
                    <img src="${choosen.character}" alt="${choosen.name}" class=" absolute w-20">

                    <div class="backdrop-blur-sm absolute bottom-0 rounded-b-lg p-2 px-4 h-[30%] w-full">
                        <h2 class="font-lilita text-[.9rem] font-sf">${choosen.name}</h2>
                        <div class="flex justify-between items-center">
                            <h6 class="bg-[${choosen.color}] rounded-full px-2 text-[7px] flex items-center font-semibold">
                                ${choosen.type}
                            </h6>
                        </div>
                    </div>
            </div>
                `
    }
}