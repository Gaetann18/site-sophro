// Performance optimized utilities
const utils = {
  // Throttle function for performance
  throttle: function(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  },
  
  // Check if element is in viewport
  isInViewport: function(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },
  
  // Lazy loading for images
  lazyLoad: function() {
    if ('IntersectionObserver' in window) {
      const images = document.querySelectorAll('img[loading="lazy"]');
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
            }
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });
      
      images.forEach(img => imageObserver.observe(img));
    }
  }
};

function getOffSet() {
  const windowHeight = window.innerHeight;
  if (windowHeight > 830) return 210;
  if (windowHeight > 680) return 300;
  if (windowHeight > 500) return 400;
  return 450;
}

function setParallaxPosition($doc, multiplier, $object) {
  const offset = getOffSet();
  const fromTop = $doc.scrollTop();
  const bgCss = 'center ' + (multiplier * fromTop - offset) + 'px';
  $object.css({ "background-position": bgCss });
}

// Optimized parallax functions
const background_image_parallax = function($object, multiplier, forceSet) {
  multiplier = typeof multiplier !== 'undefined' ? multiplier : 0.5;
  multiplier = 1 - multiplier;
  const $doc = $(document);
  
  if (forceSet) {
    setParallaxPosition($doc, multiplier, $object);
  } else {
    const throttledParallax = utils.throttle(() => {
      setParallaxPosition($doc, multiplier, $object);
    }, 16); // ~60fps
    
    $(window).scroll(throttledParallax);
  }
};

const background_image_parallax_2 = function($object, multiplier) {
  multiplier = typeof multiplier !== 'undefined' ? multiplier : 0.5;
  multiplier = 1 - multiplier;
  const $doc = $(document);
  
  // Disable parallax on mobile for performance
  if (window.innerWidth <= 768) {
    $object.css({ "background-position": "center" });
    return;
  }
  
  $object.css({ "background-attachment": "scroll" }); // Better mobile performance
  
  const throttledParallax = utils.throttle(() => {
    if ($(window).width() > 768) {
      const firstTop = $object.offset().top;
      const pos = $(window).scrollTop();
      const yPos = Math.round((multiplier * (firstTop - pos)) - 186);
      const bgCss = 'center ' + yPos + 'px';
      $object.css({ "background-position": bgCss });
    }
  }, 16);
  
  $(window).scroll(throttledParallax);
};

// DOM Content Loaded optimization
$(function() {
  // Initialize lazy loading
  utils.lazyLoad();
  
  // Parallax with reduced motion support
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion && window.innerWidth > 768) {
    background_image_parallax($(".tm-parallax"), 0.30, false);
    background_image_parallax_2($("#contact"), 0.80);
    background_image_parallax_2($("#forwhat"), 0.80);
  }
  
  // Throttled resize handler
  const throttledResize = utils.throttle(() => {
    if (!prefersReducedMotion && window.innerWidth > 768) {
      background_image_parallax($(".tm-parallax"), 0.30, true);
    }
  }, 250);
  
  window.addEventListener('resize', throttledResize, { passive: true });
  
  // Optimized scroll handler for navbar
  const throttledScroll = utils.throttle(() => {
    const scrollTop = $(document).scrollTop();
    if (scrollTop > 120) {
      $('.tm-navbar').addClass("scroll");
    } else {
      $('.tm-navbar').removeClass("scroll");
    }
  }, 10);
  
  $(window).scroll(throttledScroll);
  
  // Mobile menu optimization
  $('#tmNav a').on('click', function() {
    $('.navbar-collapse').removeClass('show');
  });
  
  // Single page navigation
  $('#tmNav').singlePageNav({
    'easing': 'easeInOutExpo',
    'speed': 600,
    'offset': 70
  });
  
  // Enhanced smooth scrolling with better easing
  $("a[href^='#']").on('click', function(event) {
    const hash = this.hash;
    if (hash && $(hash).length) {
      event.preventDefault();
      const targetOffset = $(hash).offset().top - 80;
      
      // Use jQuery's easeInOutCubic for smoother animation
      $('html, body').animate({
        scrollTop: targetOffset
      }, {
        duration: 1000,
        easing: 'easeInOutExpo',
        complete: function() {
          history.pushState(null, null, hash);
        },
        progress: function(animation, progress) {
          // Add a subtle bounce effect at the end
          if (progress > 0.9) {
            const bounce = Math.sin((progress - 0.9) * Math.PI * 10) * 2;
            $(this).scrollTop(targetOffset + bounce);
          }
        }
      });
    }
  });
  
  // Lazy initialize components
  setTimeout(() => {
    // Gallery popup
    $('.tm-gallery').magnificPopup({
      delegate: 'a',
      type: 'image',
      gallery: {
        enabled: true
      },
      image: {
        tError: 'L\'image n\'a pas pu être chargée.'
      }
    });
    
    // Carousel initialization
    $('.tm-forwhat-carousel').slick({
      dots: true,
      prevArrow: false,
      nextArrow: false,
      infinite: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      lazyLoad: 'ondemand',
      responsive: [{
        breakpoint: 992,
        settings: { slidesToShow: 2 }
      }, {
        breakpoint: 768,
        settings: { slidesToShow: 2 }
      }, {
        breakpoint: 480,
        settings: { slidesToShow: 1 }
      }]
    });
    
    // Gallery slider
    $('.tm-gallery').slick({
      dots: true,
      infinite: false,
      slidesToShow: 5,
      slidesToScroll: 2,
      lazyLoad: 'ondemand',
      responsive: [{
        breakpoint: 1199,
        settings: { slidesToShow: 4, slidesToScroll: 2 }
      }, {
        breakpoint: 991,
        settings: { slidesToShow: 3, slidesToScroll: 2 }
      }, {
        breakpoint: 767,
        settings: { slidesToShow: 2, slidesToScroll: 1 }
      }, {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 }
      }]
    });
  }, 100);
});