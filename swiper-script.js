// card swipe effect
var swiper = new Swiper(".mySwiper", {
    effect: "cards",
    grabCursor: true,
});


swiper.slides.forEach(slide => {
  slide.style.overflow = "visible";
  slide.style.alignItems = "end";
});