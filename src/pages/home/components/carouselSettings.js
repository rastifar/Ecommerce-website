export const heroSettings = {
    dots: true,    
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  export const categorySettings = {
   
    // infinite: true,
    // slidesToShow: 3,
    // slidesToScroll: 1,
    // // autoplay: true,
    // speed: 2000,
    
    // cssEase: "linear"
    rtl: true,
   
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    lazyLoad: 'progressive',
    responsive: [
      {
        breakpoint: 700,
        settings: {
          arrows: false,
          slidesToShow: 2
        }
      },
      {
        breakpoint: 500,
        settings: {
          arrows: false,
          slidesToShow: 1
        }
      },
      {
        breakpoint: 400,
        settings: {
          arrows: false,
          slidesToShow: 1
        }
      }
    ]


  
  };