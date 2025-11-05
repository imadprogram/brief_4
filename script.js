
const market_container = document.getElementById('market_container');

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
    background: "black",
    character: "img/groso.png",
    name: "Groso",
    type: "common",
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
    background: "img/black",
    character: "img/nino.png",
    name: "Nino",
    type: "common",
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

function displayCards(arr){
  arr.forEach(card => {
    market_container.innerHTML += `
            <div
                class="rounded-lg bg-${card.type === "common" ? "black" : `[url(${card.background})]`} bg-cover text-white relative w-44 h-[19rem] lg:w-56 lg:h-[20rem] overflow-hidden">
                
                ${card.type == 'legendary' ? '<img src="img/sparkle.png" alt="" class="w-[250px] absolute left-[-1rem] top-0">' : ''}
                <img src="${card.character}" width="200" alt="queen-poppy" class="absolute top-[-3rem] left-[10%]">
                <div class="backdrop-blur-sm absolute bottom-0 rounded-b-lg p-2 px-4 h-[30%]">
                <div class="flex justify-between">
                    <h2 class="font-lilita text-[.9rem] font-sf">${card.name}</h2>
                    <div>
                    <ion-icon name="heart-outline" class="hover:text-red-500"></ion-icon>
                    <ion-icon name="cart-outline" class="hover:text-blue-500"></ion-icon>
                    </div>
                </div>
                    <div class="flex justify-between items-center">
                        <h6 class="bg-[${card.color}] rounded-full px-2 text-[7px] flex items-center font-semibold">
                            ${card.type}
                        </h6>
                        <h3 class="text-sf font-bold text-[.8rem] font-sf">${card.price}$</h3>
                    </div>
                    <p class="text-[.5rem]">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima quis
                        temporibus, aperiam, perferendis</p>
                </div>
            </div>
    `
  });
}

displayCards(cards);


document.querySelector("form").addEventListener("change", (e) => {

  market_container.innerHTML = ""

  console.log(e.target.id)

  if(e.target.id === "all"){
    displayCards(cards)
  }else {
    displayCards(cards.filter(elem => elem.type === e.target.id))
  }


})