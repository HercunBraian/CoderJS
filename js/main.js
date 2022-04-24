      // Sticky Navegacion Menu

      let nav_offset_top = $('.header_area').height() + 50;

      function navbarFixed() {
          if ($('.header_area').length) {
              $(window).scroll(function () {
                  let scroll = $(window).scrollTop();
                  if (scroll >= nav_offset_top) {
                      $('.header_area .main-menu').addClass('navbar_fixed');
                  } else {
                      $('.header_area .main-menu').removeClass('navbar_fixed');
                  }
              })
          }
      }
  
      navbarFixed();
      
      /**
   * Marcas Slider
   */
 new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  


