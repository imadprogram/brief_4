let extend = document.querySelectorAll('.extend')


extend.forEach(e => {
    e.classList.add('rounded-lg')
e.addEventListener('click' , ()=>{
    e.classList.toggle('h-full')
    e.classList.toggle('h-12')
    e.classList.toggle('pb-4')

})
})