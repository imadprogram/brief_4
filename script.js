
const market_container = document.getElementById('market_container');
const pagination = document.getElementById('pagination')

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



// function displayCards(arr){
//   arr.forEach(card => {
//     market_container.innerHTML += `
//             <div
//                 class="rounded-lg bg-${card.type === "common" ? "black" : `[url(${card.background})]`} bg-cover text-white relative w-44 h-[19rem] lg:w-56 lg:h-[20rem] overflow-hidden">
                
//                 ${card.type == 'legendary' ? '<img src="img/sparkle.png" alt="" class="w-[250px] absolute left-[-1rem] top-0">' : ''}
//                 <img src="${card.character}" width="200" alt="queen-poppy" class="absolute top-[-3rem] left-[10%]">
//                 <div class="backdrop-blur-sm absolute bottom-0 rounded-b-lg p-2 px-4 h-[30%]">
//                 <div class="flex justify-between">
//                     <h2 class="font-lilita text-[.9rem] font-sf">${card.name}</h2>
//                     <div>
//                     <ion-icon name="heart-outline" class="hover:text-red-500"></ion-icon>
//                     <ion-icon name="cart-outline" class="hover:text-blue-500"></ion-icon>
//                     </div>
//                 </div>
//                     <div class="flex justify-between items-center">
//                         <h6 class="bg-[${card.color}] rounded-full px-2 text-[7px] flex items-center font-semibold">
//                             ${card.type}
//                         </h6>
//                         <h3 class="text-sf font-bold text-[.8rem] font-sf">${card.price}$</h3>
//                     </div>
//                     <p class="text-[.5rem]">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima quis
//                         temporibus, aperiam, perferendis</p>
//                 </div>
//             </div>
//     `
//   });
// }


function displayCards(arr, pageIndex) {
  
  market_container.innerHTML = "";

  const itemsPerPage = 9;                      
  const start = pageIndex * itemsPerPage;     
  const end = start + itemsPerPage;         

  for (let i = start; i < end && i < arr.length; i++) { 
    const card = arr[i];

    const iconName = isFavorite(card.name) ? "heart" : "heart-outline";

    market_container.innerHTML += `
      <div
        class="rounded-lg ${card.type === "commun" ? "bg-black" : `bg-[url(${card.background})]`} bg-cover text-white relative w-44 h-[19rem] lg:w-56 lg:h-[20rem] overflow-hidden">
        
        ${card.type == 'legendary' ? '<img src="img/sparkle.png" alt="" class="w-[250px] absolute left-[-1rem] top-0">' : ''}
        <img src="${card.character}" width="200" alt="${card.name}" class="absolute top-[-3rem] left-[10%]">
        <div class="backdrop-blur-sm absolute bottom-0 rounded-b-lg p-2 px-4 h-[30%]">
          <div class="flex justify-between">
            <h2 class="font-lilita text-[.9rem] font-sf">${card.name}</h2>
            <div>
              <ion-icon id='fav-${card.name}' name="${iconName}" class="fav-icon hover:text-red-500"></ion-icon>
              <ion-icon id='cart-${card.name}' name="cart-outline" class="cart-icon hover:text-blue-500"></ion-icon>
            </div>
          </div>
          <div class="flex justify-between items-center">
            <h6 class="bg-[${card.color}] rounded-full px-2 text-[7px] flex items-center font-semibold">
              ${card.type}
            </h6>
            <h3 class="text-sf font-bold text-[.8rem] font-sf">${card.price}$</h3>
          </div>
          <p class="text-[.5rem]">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </div>
    `;
  }
}



function handle_pagination(arr) {
  pagination.innerHTML = "";
  const pages_num = Math.ceil(arr.length / 9);

  for (let i = 0; i < pages_num; i++) {
    const button = document.createElement("button");
    button.textContent = i + 1;
    button.classList.add("px-4", "py-1", "bg-blue-400", "mx-2");

    button.addEventListener("click", () => {
      displayCards(arr, i);
    });

    pagination.appendChild(button);
  }
}


// displayCards(cards , 0);
// handle_pagination(cards);


if(document.URL.includes("market.html")){

  document.querySelector("form").addEventListener("change", (e) => {

  market_container.innerHTML = ""

  console.log(e.target.id)

  if (market_container) {

    if(e.target.id === "all"){
      displayCards(cards , 0);
      if (pagination) {
        handle_pagination(cards);
      }
    } else {

      displayCards(cards.filter(elem => elem.type === e.target.id) , 0)
      if (pagination) {
        handle_pagination (cards.filter(elem => elem.type === e.target.id))
      }
    }
  }
})

}





function attachFavoriteListeners() {

  document.querySelectorAll('.fav-icon').forEach(icon => {
        icon.addEventListener('click', (e) => {
            let id = e.currentTarget.id
            let nameofcard = id.replace('fav-', '')
            let cardtofavorites = cards.find(card => card.name === nameofcard)
            
            if(cardtofavorites){
                toggleFavorite(cardtofavorites) 

                const clickedIcon = e.currentTarget; 
                clickedIcon.name = clickedIcon.name === 'heart' ? 'heart-outline' : 'heart';
                
                if (document.getElementById('favorites-container')) {
                    displayFavorites(); 
                }
            }
        })
    });
}


function getFavorites() {
    const favoritesJSON = localStorage.getItem('trollFavorites');
    
    if (favoritesJSON) {
        return JSON.parse(favoritesJSON);
    } else {
        return [];
    }
}

function isFavorite(cardName) {
    const favorites = getFavorites();
    return favorites.some(favCard => favCard.name === cardName);
}

function saveFavorites(favoritesArray) {
    const favoritesJSON = JSON.stringify(favoritesArray);
    
    localStorage.setItem('trollFavorites', favoritesJSON);
}


function toggleFavorite(card) {
    let favorites = getFavorites();
    
    const index = favorites.findIndex(favCard => favCard.name === card.name);

    if (index > -1) {
        favorites.splice(index, 1);
        console.log(`❌ Card "${card.name}" removed from favorites.`);

    } else {
        favorites.push(card);
        console.log(`✅ Card "${card.name}" added to favorites!`);
    }

    saveFavorites(favorites);
}



function displayFavorites() {
    const favoritesContainer = document.getElementById('favorites-container');
    
    if (!favoritesContainer) return; 

    const favoriteCards = getFavorites();
    
    favoritesContainer.innerHTML = ""; 

    if (favoriteCards.length === 0) {
        favoritesContainer.innerHTML = "<p class='text-white text-center pt-16'>You haven't loved any trolls yet! Go find some favorites.</p>";
    } else {
        favoritesContainer.classList.add("cards-container", "h-fit", "grid", "grid-cols-2", "gap-3", "lg:grid-cols-3", "lg:gap-24", "overflow-x-hidden");
        
        favoriteCards.forEach(card => {
            favoritesContainer.innerHTML += `
            <div
                class="rounded-lg ${card.type === "commun" ? "bg-black" : `bg-[url(${card.background})]`} bg-cover text-white relative w-44 h-[19rem] lg:w-56 lg:h-[20rem] overflow-hidden">
                
                ${card.type == 'legendary' ? '<img src="img/sparkle.png" alt="" class="w-[250px] absolute left-[-1rem] top-0">' : ''}
                <img src="${card.character}" width="200" alt="${card.name}" class="absolute top-[-3rem] left-[10%]">
                <div class="backdrop-blur-sm absolute bottom-0 rounded-b-lg p-2 px-4 h-[30%]">
                    <div class="flex justify-between">
                        <h2 class="font-lilita text-[.9rem] font-sf">${card.name}</h2>
                        <div>
                            <ion-icon name="heart" class="fav-icon hover:text-red-500 cursor-pointer" id='fav-${card.name}'></ion-icon> 
                            <ion-icon name="cart-outline" class="cart-icon hover:text-blue-500"></ion-icon>
                        </div>
                    </div>
                    <div class="flex justify-between items-center">
                        <h6 class="bg-[${card.color}] rounded-full px-2 text-[7px] flex items-center font-semibold">
                            ${card.type}
                        </h6>
                        <h3 class="text-sf font-bold text-[.8rem] font-sf">${card.price}$</h3>
                    </div>
                    <p class="text-[.5rem]">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
            </div>
            `;
        });
    }
}




if (document.getElementById('market_container')) {
    displayCards(cards, 0);
    handle_pagination(cards);
}

if (document.getElementById('favorites-container')) {
    displayFavorites(); 
}



attachFavoriteListeners();





let menu = document.getElementById('menu-btn')
let sidebar = document.getElementById('sidebar')

menu.addEventListener('click', () =>{
  sidebar.classList.toggle('translate-x-full')
})

let close = document.getElementById('close')

close.addEventListener('click' , () =>{
  sidebar.classList.toggle('translate-x-full')
})
