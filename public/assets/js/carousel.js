// shorthand for document.ready function
$(function () {
  // Initiates carousel for tops, scrolling one at a time
  $('.topsCarousel').slick({
    arrows: true,
    centerMode: true,
    centerPadding: '150px',
    slidesToShow: 5,
    autoplay: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 2,
        },
      },
    ],
  });

  // Initiates carousel for bottoms, scrolling one at a time
  $('.bottomsCarousel').slick({
    arrows: true,
    centerMode: true,
    centerPadding: '150px',
    slidesToShow: 5,
    autoplay: true,
    rtl: true,
    infinite: true,
    
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 550,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 2,
        },
      },
    ],
  });

  // Initiates carousel for overalls, scrolling one at a time
  $('.overallsCarousel').slick({
    arrows: true,
    centerMode: true,
    centerPadding: '150px',
    slidesToShow: 5,
    autoplay: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 2,
        },
      },
    ],
  });
});
