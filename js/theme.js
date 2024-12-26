// js Document

(function($) {
    "use strict";
    
// ----------------------------- Counter Function
        var timer = $('.timer');
        if(timer.length) {
            timer.appear(function () {
              timer.countTo();
          });
        }

// ------------------------ Navigation Scroll
        $(window).on('scroll', function (){   
          var sticky = $('.sticky-menu'),
          scroll = $(window).scrollTop();
          if (scroll >= 100) sticky.addClass('fixed');
          else sticky.removeClass('fixed');

        });
// -------------------- From Bottom to Top Button
            //Check to see if the window is top if not then display button
        $(window).on('scroll', function (){
          if ($(this).scrollTop() > 200) {
            $('.scroll-top').fadeIn();
          } else {
            $('.scroll-top').fadeOut();
          }
        });
        // -------------------- Scroll top SVG animation
        TweenMax.set(".scroll-top svg", {
          visibility: "visible"
        });
        
        TweenMax.set("#sun-glow-rotate", {
          transformOrigin: "50% 50%"
        });
        
        
        TweenMax.to("#sun-glow-rotate", 10, {
          rotation: 360,
          repeat: -1,
          ease: Linear.easeNone
        });
        
        var tlEyes = new TimelineMax({ repeat: -1 });
        tlEyes.to("#eyes", 1, {
          ease: Bounce.BounceIn,
          y: 110
        });
        tlEyes.to("#eyes", 1, {
          ease: Bounce.BounceOut,
          y: 100
        });
        
        var tlFace = new TimelineMax({ repeat: -1 });
        tlFace.to("#face", 1, {
          ease: Bounce.BounceIn,
          y: 110
        });
        tlFace.to("#face", 1, {
          ease: Bounce.BounceOut,
          y: 100
        });
        tlFace.to("#face", 1, {
          ease: Bounce.BounceOut,
          y: 130
        });
                           
//---------------------- Click event to scroll to top
        $('.scroll-top').on('click', function() {
          $('html, body').animate({scrollTop : 0},1500);
          return false;
        });
// -------------------------- scroll animate
        var links = $('a.scroll-target');
        links.on('click', function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {
            var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 120,
                    }, 1000);
                    return false;
                }
            }
        });


// --------------------- Add .active class to current navigation based on URL
        var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
          $(".navbar-nav > li  a").each(function(){
          if($(this).attr("href") == pgurl || $(this).attr("href") == '' )
          $(this).addClass("active");
          // $(this).parent("li").addClass("active");
        })
          
// ----------------------------- MixItUp
        if ($(".mixitUp-container").length) {
          var containerEl = document.querySelector('.mixitUp-container');
          var mixer = mixitup(containerEl);
        };


// ------------------------ Password Toggler
        if($(".user-data-form").length) {
          $(".passVicon").on('click', function() {
            $(".passVicon").toggleClass("eye-slash");
            var input = $(".pass_log_id");
            if (input.attr("type") === "password") {
              input.attr("type", "text");
            } else {
              input.attr("type", "password");
            }

          });
        }



// ------------------------ Image Slick Slider 
        if($(".img-slick-slider").length) {
          $('.img-slick-slider').slick({
              dots: true,
              arrows: false,
              centerPadding: '0px',
              slidesToShow: 1,
              autoplay: true,
              autoplaySpeed: 6000,
            });
        }


// ------------------------ Image Slick Slider 
  $('.servicesSlider').slick({
    dots: true,
    arrows: false,
    centerMode: true,
    centerPadding: '0px',
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: $('.prev'),
    nextArrow: $('.next'),
  });

// ------------------------ About us VMV Slider 
  $('.vmvSlider').slick({
    dots: true,
    arrows: true,
    centerMode: true,
    centerPadding: '0px',
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    prevArrow: $('.prev'),
    nextArrow: $('.next'),
  });


// ------------------------ Client Feedback Slider Two
        if($(".clientSliderTwo").length) {
          $('.clientSliderTwo').slick({
              dots: true,
              arrows: false,
              centerMode: true,
              centerPadding: '0px',
              slidesToShow: 3,
              slidesToScroll: 3,
              autoplay: true,
              autoplaySpeed: 3000,
              responsive: [
                {
                  breakpoint: 992,
                  settings: {
                    slidesToShow: 2
                  }
                },
                {
                  breakpoint: 576,
                  settings: {
                    slidesToShow: 1
                  }
                }
              ]
            });
        }

// ------------------------ Team Slider One
        if($(".teamSliderOne").length) {
          $('.teamSliderOne').slick({
              dots: false,
              arrows: true,
              prevArrow: $('.prev_c'),
              nextArrow: $('.next_c'),
              centerPadding: '0px',
              slidesToShow: 4,
              slidesToScroll: 1,
              autoplay: false,
              autoplaySpeed: 3000,
              responsive: [
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 3
                  }
                },
                {
                  breakpoint: 576,
                  settings: {
                    slidesToShow: 2
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1
                  }
                }
              ]
            });
        }

// ------------------------ Client Feedback Slider Six
        if($(".clientSliderSix").length) {
          $('.clientSliderSix').slick({
              dots: true,
              arrows: false,
              centerMode: true,
              centerPadding: '0px',
              slidesToShow: 3,
              slidesToScroll: 3,
              autoplay: true,
              autoplaySpeed: 3000,
              responsive: [
                {
                  breakpoint: 1200,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  }
                }
              ]
            });
        }



// ------------------------ App Screen Preview 
        if($(".app-preview-slider-one").length) {
          $('.app-preview-slider-one').slick({
              dots: false,
              arrows: false,
              centerPadding: '0px',
              slidesToShow: 3,
              centerMode: true,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 2000,
              responsive: [
                {
                  breakpoint: 992,
                  settings: {
                    slidesToShow: 3
                  }
                },
                {
                  breakpoint: 576,
                  settings: {
                    slidesToShow: 2,
                    centerMode: false,
                  }
                }
              ]
            });
        }


// ------------------------ App Screen Preview Two
        if($(".app-preview-slider-two").length) {
          $('.app-preview-slider-two').slick({
              dots: false,
              arrows: false,
              centerPadding: '0px',
              slidesToShow: 5,
              centerMode: true,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 3000,
              responsive: [
                {
                  breakpoint: 992,
                  settings: {
                    slidesToShow: 3
                  }
                },
                {
                  breakpoint: 576,
                  settings: {
                    slidesToShow: 2
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1
                  }
                }
              ]
            });
        }

// ------------------------ Team slider

            $('.teamSlider').slick({
              dots: true,
              arrows: false,
              centerMode: false,
              centerPadding: '0px',
              slidesToShow: 1,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 3000,
              prevArrow: $('.prev'),
              nextArrow: $('.next'),
            });
            $(".prev").click(function () {
              $(".teamSlider").slick("slickPrev");
            });
          
            $(".next").click(function () {
              $(".teamSlider").slick("slickNext");
            });
            $(".prev").addClass("slick-disabled");
            $(".teamSlider").on("afterChange", function () {
              if ($(".slick-prev").hasClass("slick-disabled")) {
                $(".prev").addClass("slick-disabled");
              } else {
                $(".prev").removeClass("slick-disabled");
              }
              if ($(".slick-next").hasClass("slick-disabled")) {
                $(".next").addClass("slick-disabled");
              } else {
                $(".next").removeClass("slick-disabled");
              }
            }); 

// ------------------------ Portfolio Slider One
        if($(".portfolio_slider_one").length) {
          $('.portfolio_slider_one').slick({
              dots: false,
              arrows: true,
              prevArrow: $('.prev_case1'),
              nextArrow: $('.next_case1'),
              centerPadding: '0px',
              slidesToShow: 3,
              slidesToScroll: 1,
              autoplay: false,
              centerMode:true,
              autoplaySpeed: 3000,

            });
        }

// ------------------------ Portfolio Slider Two
        if($(".portfolio_slider_two").length) {
          $('.portfolio_slider_two').slick({
              dots: false,
              arrows: true,
              prevArrow: $('.prev_case2'),
              nextArrow: $('.next_case2'),
              centerPadding: '0px',
              slidesToShow: 3,
              slidesToScroll: 1,
              autoplay: false,
              centerMode:true,
              autoplaySpeed: 3000,
              responsive: [
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 2
                  }
                },
                {
                  breakpoint: 576,
                  settings: {
                    slidesToShow: 1
                  }
                }
              ]
            });
        }


// ------------------------ Portfolio Three 
        if($(".portfolio_slider_three").length) {
          $('.portfolio_slider_three').slick({
              dots: false,
              arrows: true,
              prevArrow: $('.prev_c'),
              nextArrow: $('.next_c'),
              centerPadding: '0px',
              slidesToShow: 4,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 3000,
              responsive: [
                {
                  breakpoint: 992,
                  settings: {
                    slidesToShow: 3
                  }
                },
                {
                  breakpoint: 576,
                  settings: {
                    slidesToShow: 2
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1
                  }
                }
              ]
            });
        }


// ------------------------ Product Slider One
        if($(".product_slider_one").length) {
          $('.product_slider_one').slick({
              dots: false,
              arrows: true,
              prevArrow: $('.prev_p1'),
              nextArrow: $('.next_p1'),
              centerPadding: '0px',
              slidesToShow: 3,
              slidesToScroll: 1,
              autoplay: false,
              centerMode:true,
              autoplaySpeed: 3000,
              responsive: [
                {
                  breakpoint: 1200,
                  settings: {
                    slidesToShow: 2
                  }
                },
                {
                  breakpoint: 576,
                  settings: {
                    slidesToShow: 1
                  }
                }
              ]
            });
        }


// ------------------------ Product Slider Two
        if($(".product_slider_two").length) {
          $('.product_slider_two').slick({
              dots: false,
              arrows: false,
              centerPadding: '0px',
              slidesToShow: 4,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 3000,
              responsive: [
                {
                  breakpoint: 1200,
                  settings: {
                    slidesToShow: 3
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 2
                  }
                },
                {
                  breakpoint: 576,
                  settings: {
                    slidesToShow: 1
                  }
                }
              ]
            });
        }


// -------------------- Remove Placeholder When Focus Or Click
        $("input,textarea").each( function(){
            $(this).data('holder',$(this).attr('placeholder'));
            $(this).on('focusin', function() {
                $(this).attr('placeholder','');
            });
            $(this).on('focusout', function() {
                $(this).attr('placeholder',$(this).data('holder'));
            });     
        });


// -------------------------- Doc Sidebar
        var subMenu = $ (".doc-sidebar ul li.dropdown-holder>h4"),
            secSubMenu = $ (".doc-sidebar .sec-menu"),
            expender = $ (".doc-sidebar ul li.dropdown-holder .expander");
            subMenu.on("click", function (e) {
              e.preventDefault();
            });

            subMenu.append(function () {
              return '<span class="expander"><i class="fa fa-chevron-down" aria-hidden="true"></i></span>';
            });

            subMenu.on('click', function () {
              if ( $(this).parent('li').children('ul').hasClass('show') ) {
                $(this).parent('li').children('ul').removeClass('show');
                } else {
                $('.sub-menu.show').removeClass('show');
                $(this).parent('li').children('ul').addClass('show');    
                };
            });

            secSubMenu.on('click', function () {
              if ( $(this).parent('li').children('ul').hasClass('open') ) {
                $(this).parent('li').children('ul').removeClass('open');
                } else {
                $('.sub-menu.open').removeClass('open');
                $(this).parent('li').children('ul').addClass('open');    
                };
            });

// -------------------------- Accordion
        var subMenu = $ (".card .card-header");
            subMenu.on("click", function (e) {
              e.preventDefault();
            });


            subMenu.on('click', function () {
              if ( $(this).parent('.card').children('.collapse').hasClass('show') ) {
                $(this).parent('.card').children('.collapse').removeClass('show');
                } else {
                $('.collapse.show').removeClass('show');
                $(this).parent('.card').children('.collapse').addClass('show');    
                };
            });

// -------------------------- scroll animate
        if($(".main-side-nav").length) {
          $('.main-side-nav a').on('click', function(){
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
              var target = $(this.hash);
              target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
              if (target.length) {
                $('html, body').animate({
                  scrollTop: (target.offset().top - 100)
                }, 800);
                return false;
              }
            }
          });
        }


// -------------------------- Mobile Nav
        if($(".theme-main-menu").length) {
          $('.theme-main-menu .navbar-toggler').on('click', function(){
            $(".navbar-collapse").toggleClass("show");
            $(this).toggleClass("open");
          });
          $('.dropdown-menu .dropdown-toggle').on('click', function(e) {
            if (!$(this).next().hasClass('show')) {
              $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
            }
            $(this).next(".dropdown-menu").toggleClass('show');
            return false;
          });
        }
// ----------------------- Closes responsive menu when a scroll trigger link is clicked
        $('#one-page-nav .nav-link').on('click', function(){
          $('.navbar-collapse').removeClass('show');
          $('.navbar-toggler').removeClass("open");
        })

// -------------------------- Mobile Doc Side Nav
        if($(".doc-sidebar").length) {
          $('.doc-sidebar .btn').on('click', function(){
            $(".doc-links").toggleClass("show");
          });
        }

// -------------------------- Sidebar Menu
        if($(".main-sidebar-nav").length) {
          $('.sidebar-nav-button').on('click', function(){
            $(".main-sidebar-nav").addClass("show");
          });
          $('.main-sidebar-nav .close-btn').on('click', function(){
            $(".main-sidebar-nav").removeClass("show");
          });
        }

// ------------------------ Product Quantity Selector
        if ($(".product-value").length) {
            $('.value-increase').on('click',function(){
              var $qty=$(this).closest('ul').find('.product-value');
              var currentVal = parseInt($qty.val());
              if (!isNaN(currentVal)) {
                  $qty.val(currentVal + 1);
              }
          });
          $('.value-decrease').on('click',function(){
              var $qty=$(this).closest('ul').find('.product-value');
              var currentVal = parseInt($qty.val());
              if (!isNaN(currentVal) && currentVal > 1) {
                  $qty.val(currentVal - 1);
              }
          });
        }


// -------------------------- JS tilt Effect
        if($(".js-tilt").length) {
          $('.js-tilt').tilt({
              glare: true,
              maxGlare: .3
          })
        }
        
// --------------------------------- Contact Form
          // init the validator
          // validator files are included in the download package
          // otherwise download from http://1000hz.github.io/bootstrap-validator

    //     if($("#contact-form").length) {
    //         $('#contact-form').validator();
    //         // when the form is submitted
    //         $('#contact-form').on('submit', function (e) {

    //             // if the validator does not prevent form submit
    //             if (!e.isDefaultPrevented()) {
    //                 var url = "inc/contact.php";

    //                 // POST values in the background the the script URL
    //                 $.ajax({
    //                     type: "POST",
    //                     url: url,
    //                     data: $(this).serialize(),
    //                     success: function (data)
    //                     {
    //                         // data = JSON object that contact.php returns

    //                         // we recieve the type of the message: success x danger and apply it to the
    //                         var messageAlert = 'alert-' + data.type;
    //                         var messageText = data.message;

    //                         // let's compose Bootstrap alert box HTML
    //                         var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';

    //                         // If we have messageAlert and messageText
    //                         if (messageAlert && messageText) {
    //                             // inject the alert to .messages div in our form
    //                             $('#contact-form').find('.messages').html(alertBox);
    //                             // empty the form
    //                             $('#contact-form')[0].reset();
    //                         }
    //                     }
    //                 });
    //                 return false;
    //             }
    //         });
    //       }

    
    // $(window).on ('load', function (){ // makes sure the whole site is loaded


// Expand Image
const images = document.querySelectorAll(".image");
const expandImage = () => {
  images.forEach((image) => {
		image.addEventListener("mouseover", () => {
			const active = document.querySelector(".active");
			active.classList.remove("active");

			image.classList.add("active");
		});
    image.addEventListener("mouseout", () => {
			active.classList.add("active");

			image.classList.remove("active");
		});
	});
};
expandImage();


document.addEventListener("DOMContentLoaded", function () {
  const hashValue = window.location.hash.replace("#", "");

  let activeTab;
  if (hashValue) {
    activeTab = document.getElementById(hashValue);
  }

  if (activeTab && activeTab.type === "radio") {
    activeTab.checked = true;
    // Update active tab visually
    setActiveTab(activeTab);
  } else {
    // Default to the 'careers' tab if no valid hash value is found
    activeTab = document.getElementById("careers");
    if (activeTab && activeTab.type === "radio") {
      activeTab.checked = true;
      setActiveTab(activeTab);
    }
  }

  function setActiveTab(tabElement) {
    const tabContainer = document.querySelector(".tabs"); // Replace with your tab container selector
    if (tabContainer) {
      // Remove the 'active' class from all tabs
      const allTabs = tabContainer.querySelectorAll(".tab");
      allTabs.forEach((tab) => tab.classList.remove("active"));

      // Add the 'active' class to the current tab
      const tabToActivate = tabElement.closest(".tab"); // Assuming each radio button is inside a .tab
      if (tabToActivate) {
        tabToActivate.classList.add("active");
      }
    }
  }
});


// ------------------------------- AOS Animation
if ($("[data-aos]").length) {
  AOS.init({
    duration: 1000,
    mirror: true,
  });
}

// ------------------------------- Google Maps
if ($(".map-canvas").length) {
  var map = new google.maps.Map($(".map-canvas")[0], {
    zoom: 14,
    center: new google.maps.LatLng(40.72, -74),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    clickableIcons: false,
  });

  var marker = new google.maps.Marker({
    map: map,
    draggable: true,
    position: new google.maps.LatLng(40.72, -74),
    visible: true,
  });
}


// Dropdown Items Behavior
document.addEventListener("DOMContentLoaded", function () {
  const dropdownItems = document.querySelectorAll(".dropdown-item");
  for (let i = 0; i < dropdownItems.length; i++) {
    dropdownItems[i].addEventListener("click", function () {
      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        navbarCollapse.classList.remove("show");
      }
      const navbarToggler = document.querySelector(".navbar-toggler");
      if (navbarToggler && navbarToggler.classList.contains("open")) {
        navbarToggler.classList.remove("open");
      }
    });
  }
});

// Check Radio Button from URL Hash
document.addEventListener("DOMContentLoaded", function () {
  const hashValue = window.location.hash.replace("#", "");
  if (hashValue) {
    const radioInput = document.getElementById(hashValue);
    if (radioInput && radioInput.type === "radio") {
      radioInput.checked = true;
    }
  }
});
})(jQuery);