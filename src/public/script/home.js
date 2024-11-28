

document.addEventListener('DOMContentLoaded', function () {
  var swiperTab = new Swiper('.tab', {
    direction: 'horizontal',
    slidesPerView: window.innerWidth > 740 ? 6 : 3,
    spaceBetween: 1,
  });

  var swiperHomepage = new Swiper('.swiper-homepage', {
    direction: 'horizontal',
    loop: true,
    autoplay: {
      delay: 2500
    },
    slidesPerView: window.innerWidth < 740 ? 1 : 2,
    spaceBetween: 20,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  var swiperBrand = new Swiper('.swiper__brand-list', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: window.innerWidth < 740 ? 2 : window.innerWidth < 1024 ? 3 : 5,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  var swiperBrand = new Swiper('.swiper__recommended-list', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: window.innerWidth < 740 ? 2 : window.innerWidth < 1024 ? 3 : 5,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  window.addEventListener('resize', function () {
    swiperTab.params.slidesPerView = window.innerWidth < 740 ? 3 : 8;
    swiperTab.update();
    swiperHomepage.update();
    swiperBrand.update();
  });
});







