// $(".slider_box_wrapper").slick({
//    infinite: true,
//    slidesToShow: 3,
//    slidesToScroll: 3,
// });

var swiper = new Swiper(".mySwiper", {
   slidesPerView: 1,
   spaceBetween: 30,
   slidesPerGroup: 1,
   loop: true,
   loopFillGroupWithBlank: true,
   //    freeMode: true,
   spaceBetween: 0,

   speed: 700,
   // pagination: {
   //     el: ".swiper-pagination",
   //     clickable: true,
   // },

   breakpoints: {
      1000: {
         slidesPerView: 2,
      },

      576: {
         spaceBetween: 100,
      },
      // when window width is >= 1600px
      1600: {
         slidesPerView: 3,
      },
   },
   navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
   },
});
