let menu = document.getElementById('menu-btn')
let sidebar = document.getElementById('sidebar')

menu.addEventListener('click', () =>{
  sidebar.classList.toggle('translate-x-full')
})

let close = document.getElementById('close')

close.addEventListener('click' , () =>{
  sidebar.classList.toggle('translate-x-full')
})