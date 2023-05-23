/**
/**
Core script to handle the entire theme and core functions
**/
var Mazo = function(){
	/* Search Bar ============ */
	siteUrl = '';
	
	var screenWidth = $( window ).width();
	
	var homeSearch = function() {
		'use strict';
		/* top search in header on click function */
		var quikSearch = jQuery("#quik-search-btn");
		var quikSearchRemove = jQuery("#quik-search-remove");
		
		quikSearch.on('click',function() {
			jQuery('.dz-quik-search').fadeIn(500);
			jQuery('.dz-quik-search').addClass('On');
		});
		
		quikSearchRemove.on('click',function() {
			jQuery('.dz-quik-search').fadeOut(500);
			jQuery('.dz-quik-search').removeClass('On');
		});	
		/* top search in header on click function End*/
	}
	
	/* One Page Layout ============ */
	var onePageLayout = function() {
		'use strict';
		var headerHeight =   parseInt($('.onepage').css('height'), 10);
		
		$(".scroll").unbind().on('click',function(event) 
		{
			event.preventDefault();
			
			if (this.hash !== "") {
				var hash = this.hash;	
				var seactionPosition = $(hash).offset().top;
				
				var headerHeight =   parseInt($('.onepage').css('height'), 10);
				
				$('body').scrollspy({target: ".navbar", offset: headerHeight+2}); 
				
				var scrollTopPosition = seactionPosition - (headerHeight);
				
				$('html, body').animate({
					scrollTop: scrollTopPosition
				}, 100, function(){
					
				});
			}   
		});
		/* $('body').scrollspy({target: ".navbar", offset: headerHeight + 2});  
		var scrollSpy = new bootstrap.ScrollSpy(document.body, {
		  target: '#navbarNavDropdown'
		}) */
		
		
		/* One Page Setup */
		if(jQuery('.navbar-nav-scroll').length > 0){
			
			jQuery(document).on("scroll", pageOnScroll);
			
			
			
			var headerFullHeight =   parseInt($('.main-bar-wraper').css('height'), 10);
			
			//smoothscroll
			jQuery('.navbar-nav-scroll a[href^="#"]').on('click', function (e) {
				e.preventDefault();
				jQuery(document).off("scroll");
				
				jQuery('.navbar-nav-scroll a').each(function () {
					
					jQuery(this).removeClass('active');
				})				
				jQuery(this).addClass('active');
				
				var target = this.hash,
				
					menu = target;
				var $target = $(target);
				
				if($target.length > 0){					
					jQuery('html, body').stop().animate({						
							'scrollTop': $target.offset().top - headerFullHeight
							}, 500, 'swing', function () {
						
							//window.location.hash = target;
							jQuery(document).on("scroll", pageOnScroll);
						}
					);
				}
			});
			
		}
		
	}
	
	var pageOnScroll = function(event){
		
		var scrollPos = jQuery(document).scrollTop();
		jQuery('.navbar-nav-scroll a:first').each(function () {
			var elementLink = jQuery(this);
			
			var headerHeight = jQuery('header .main-bar').height();
			var refElement = jQuery(elementLink.attr("href"));
			
			if (refElement.offset().top - (headerHeight + 10)  <= scrollPos && refElement.offset().top + refElement.height() > scrollPos) {
			
				jQuery('.navbar-nav-scroll a').removeClass("active");
				elementLink.addClass("active");
			}else{
				elementLink.removeClass("active");
			}
		});
	} 
	
	/* Load File ============ */
	var dzTheme = function(){
		'use strict';
		var loadingImage = '<img src="images/loading.gif">';
		jQuery('.dzload').each(function(){
		var dzsrc =   siteUrl + $(this).attr('dzsrc');
		  //jQuery(this).html(loadingImage);
		 	jQuery(this).hide(function(){
				jQuery(this).load(dzsrc, function(){
					jQuery(this).fadeIn('slow');
				}); 
			})
			
		});
		 
		
		if(screenWidth <= 991 ){
			jQuery('.navbar-nav > li > a, .sub-menu > li > a').unbind().on('click', function(e){
				if(jQuery(this).parent().hasClass('open'))
				{
					jQuery(this).parent().removeClass('open');
				}
				else{
					jQuery(this).parent().parent().find('li').removeClass('open');
					jQuery(this).parent().addClass('open');
				}
			});
		}
				
		jQuery('.menu-btn, .openbtn').unbind().on('click',function(){
			jQuery('.contact-sidebar').addClass('active');
		});
		jQuery('.menu-close').unbind().on('click',function(){
			jQuery('.contact-sidebar').removeClass('active');
			jQuery('.menu-btn').removeClass('open');
		});
		
		// Full sidebar
		jQuery('.full-sidenav .navbar-nav > li > a').next('.sub-menu').slideUp();
		jQuery('.full-sidenav .sub-menu > li > a').next('.sub-menu').slideUp();
			
		jQuery('.full-sidenav .navbar-nav > li > a, .full-sidenav .sub-menu > li > a').unbind().on('click', function(e){
			if(jQuery(this).hasClass('dz-open')){
				
				jQuery(this).removeClass('dz-open');
				jQuery(this).parent('li').children('.sub-menu').slideUp();
			}else{
				jQuery(this).addClass('dz-open');
				
				if(jQuery(this).parent('li').children('.sub-menu').length > 0){
					e.preventDefault();
					jQuery(this).next('.sub-menu').slideDown();
					jQuery(this).parent('li').siblings('li').children('.sub-menu').slideUp();
				}else{
					jQuery(this).next('.sub-menu').slideUp();
				}
			}
		});
		
		
		
		jQuery('.header-full .navbar-toggler').unbind().on('click',function(){
			if(jQuery('.header-full .navbar-toggler').hasClass('open')){
				jQuery('.header-full .navbar-toggler').addClass('open');
			}else{
				jQuery('.header-full .navbar-toggler').removeClass('open');
			} 
			
			jQuery('.full-sidenav').toggleClass('active');
		});
		jQuery('.menu-close').unbind().on('click',function(){
			jQuery('.menu-close,.full-sidenav').removeClass('active');
			jQuery('.header-full .navbar-toggler').removeClass('open');
		});
	}
	
	/* Magnific Popup ============ */
	var MagnificPopup = function(){
		'use strict';	
		
		if(jQuery('.mfp-gallery').length > 0)
		{
			/* magnificPopup function */
			jQuery('.mfp-gallery').magnificPopup({
				delegate: '.mfp-link',
				type: 'image',
				tLoading: 'Loading image #%curr%...',
				mainClass: 'mfp-img-mobile',
				gallery: {
					enabled: true,
					navigateByImgClick: true,
					preload: [0,1] // Will preload 0 - before current, and 1 after the current image
				},
				image: {
					tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
					titleSrc: function(item) {
						return item.el.attr('title') + '<small></small>';
					}
				}
			});
			/* magnificPopup function end */
		}
		
	}
	
	/* Scroll To Top ============ */
	var scrollTop = function (){
		'use strict';
		var scrollTop = jQuery("button.scroltop");
		/* page scroll top on click function */	
		scrollTop.on('click',function() {
			jQuery("html, body").animate({
				scrollTop: 0
			}, 1000);
			return false;
		})

		jQuery(window).on('scroll', function() {
			var scroll = jQuery(window).scrollTop();
			if (scroll > 900) {
				jQuery("button.scroltop").fadeIn(1000);
			} else {
				jQuery("button.scroltop").fadeOut(1000);
			}
		});
		/* page scroll top on click function end*/
	}
	
	/* Header Fixed ============ */
	var headerFix = function(){
		'use strict';
		/* Main navigation fixed on top  when scroll down function custom */		
		jQuery(window).on('scroll', function () {
			if(jQuery('.sticky-header').length > 0){
				var menu = jQuery('.sticky-header');
				if ($(window).scrollTop() > menu.offset().top) {
					menu.addClass('is-fixed');
					$('.site-header .container > .logo-header .logo').attr('src','images/logo.png');
					$('.site-header .container > .logo-header .logo-2').attr('src','images/logo-2.png');
					$('.site-header .container > .logo-header .logo-3').attr('src','images/logo-3.png');
				} else {
					menu.removeClass('is-fixed');
					$('.site-header .container > .logo-header .logo, .site-header .container > .logo-header .logo-2, .site-header .container > .logo-header .logo-3').attr('src','images/logo-white.png')
				}
			}
		});
		/* Main navigation fixed on top  when scroll down function custom end*/
	}
	
	/* Masonry Box ============ */
	var masonryBox = function(){
		'use strict';
		/* masonry by  = bootstrap-select.min.js */
		if(jQuery('#masonry, .masonry').length > 0)
			{
			var self = jQuery("#masonry, .masonry");
	 
			if(jQuery('.card-container').length > 0)
			{
				var gutterEnable = self.data('gutter');
				
				var gutter = (self.data('gutter') === undefined)?0:self.data('gutter');
				gutter = parseInt(gutter, 10);
				
				
				var columnWidthValue = (self.attr('data-column-width') === undefined)?'':self.attr('data-column-width');
				if(columnWidthValue != ''){columnWidthValue = parseInt(columnWidthValue, 10);}
				
				 self.imagesLoaded(function () {
					self.masonry({
						//gutter: gutter,
						//columnWidth:columnWidthValue, 
						gutterWidth: 15,
						isAnimated: true,
						itemSelector: ".card-container",
						//percentPosition: true
					});
					
				}); 
			} 
		}
		if(jQuery('.filters').length)
		{
			jQuery(".filters li:first").addClass('active');
			
			jQuery(".filters").on("click", "li", function() {
				jQuery('.filters li').removeClass('active');
				jQuery(this).addClass('active');
				
				var filterValue = $(this).attr("data-filter");
				self.isotope({ filter: filterValue });
			});
		}
		/* masonry by  = bootstrap-select.min.js end */
	}
	
	/* Counter Number ============ */
	var counter = function(){
		if(jQuery('.counter').length)
		{
			jQuery('.counter').counterUp({
				delay: 10,
				time: 3000
			});	
		}
	}

	/* Gallery Filter ============ */
	var handleFilterMasonary = function(){
		/* gallery filter activation = jquery.mixitup.min.js */ 
		if (jQuery('#image-gallery-mix').length) {
			jQuery('.gallery-filter').find('li').each(function () {
				$(this).addClass('filter');
			});
			jQuery('#image-gallery-mix').mixItUp();
		};
		if(jQuery('.gallery-filter.masonary').length){
			jQuery('.gallery-filter.masonary').on('click','span', function(){
				var selector = $(this).parent().attr('data-filter');
				jQuery('.gallery-filter.masonary span').parent().removeClass('active');
				jQuery(this).parent().addClass('active');
				jQuery('#image-gallery-isotope').isotope({ filter: selector });
				return false;
			});
		}
		/* gallery filter activation = jquery.mixitup.min.js */
	}
	
	/* Resizebanner ============ */
	var handleBannerResize = function(){
		$(".full-height").css("height", $(window).height());
	}
	
	/* BGEFFECT ============ */
	var reposition = function (){
		'use strict';
		var modal = jQuery(this),
		dialog = modal.find('.modal-dialog');
		modal.css('display', 'block');
		
		/* Dividing by two centers the modal exactly, but dividing by three 
		 or four works better for larger screens.  */
		dialog.css("margin-top", Math.max(0, (jQuery(window).height() - dialog.height()) / 2));
	}
	
	var handelResize = function (){
		
		/* Reposition when the window is resized */
		jQuery(window).on('resize', function() {
			jQuery('.modal:visible').each(reposition);
		
			
		});
	}
	
	/* Light Gallery ============ */
	var lightGallery = function (){
		if(($('#lightgallery, .lightgallery').length > 0)){
			$('#lightgallery, .lightgallery').lightGallery({
				selector : '.lightimg',
				loop:true,
				thumbnail:true,
				exThumbImage: 'data-exthumbimage',
				download: false,
				share: false,
			});
		}
	}	

	var boxHover = function(){
		jQuery('.box-hover').on('mouseenter',function(){
			var selector = jQuery(this).parent().parent();
			selector.find('.box-hover').removeClass('active');
			jQuery(this).addClass('active');
		});
	}
	
	/* Header Height ============ */
	var setResizeMargin = function(){
		if(($('.setResizeMargin').length > 0) && screenWidth >= 1280){
			var containerSize = $('.container').width();
			var getMargin = (screenWidth - containerSize)/2;
			$('.setResizeMargin').css('margin-left',getMargin);
		}
	}
	
	var handleRadialProgress = function(){
		if(($('svg.radial-progress').length > 0)){
			// Remove svg.radial-progress .complete inline styling
			$('svg.radial-progress').each(function( index, value ) { 
				$(this).find($('circle.complete')).removeAttr( 'style' );
			});
			// Activate progress animation on scroll
			$(window).on('scroll',function(){
				$('svg.radial-progress').each(function( index, value ) { 
					// If svg.radial-progress is approximately 25% vertically into the window when scrolling from the top or the bottom
					if ( 
						$(window).scrollTop() > $(this).offset().top - ($(window).height() * 0.75) &&
						$(window).scrollTop() < $(this).offset().top + $(this).height() - ($(window).height() * 0.25)
					)
					{
						// Get percentage of progress
						percent = $(value).data('percentage');
						// Get radius of the svg's circle.complete
						radius = $(this).find($('circle.complete')).attr('r');
						// Get circumference (2Ï€r)
						circumference = 2 * Math.PI * radius;
						// Get stroke-dashoffset value based on the percentage of the circumference
						strokeDashOffset = circumference - ((percent * circumference) / 100);
						// Transition progress for 1.25 seconds
						$(this).find($('circle.complete')).animate({'stroke-dashoffset': strokeDashOffset}, 1250);
					}
				});
			}).trigger('scroll');
		}
	}
	
	var handleheartBlast = function (){
		$(".heart").on("click", function() {
			$(this).toggleClass("heart-blast");
		});
	}
	
	var bsSelect = function(){
		if(jQuery.isFunction($.fn.selectpicker)){
			$('select').selectpicker();
		}
	}
	
	var kenburnSlider = function(){
		if($("#kenburn").length > 0)
		{ 
			$("#kenburn").slippry({
				 transition: 'kenburns',
				 useCSS: true,
				 speed: 8000,
				 pause: 3000,
				 auto: true,
				 preload: 'visible',
				 autoHover: false
			});
		}
	}
	
	/* Website Launch Date */ 
	var WebsiteCurrentDate = new Date();
	monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	WebsiteCurrentDate.setMonth(WebsiteCurrentDate.getMonth() + 1);
	WebsiteLaunchDate =  WebsiteCurrentDate.getDate() + " " + monthNames[WebsiteCurrentDate.getMonth()] + " " + WebsiteCurrentDate.getFullYear(); 
	/* Website Launch Date END */ 

	/* Countdown Style 1 
	   - Put your launching date here and uncomment this line*/
	//var WebsiteLaunchDate = '2 February 2020 10:00';
	var handleCountDown = function(WebsiteLaunchDate){
		/* Time Countr Down Js */
		if($(".countdown").length)
		{
			$('.countdown').countdown({date: WebsiteLaunchDate}, function() {
				$('.countdown').text('we are live');
			});
		}
		/* Time Countr Down Js End */
	}
	
	/* Countdown Style 2 */
	var handleFinalCountDown = function(){
		if(jQuery('.countdown-timer').length > 0 )
		{
			var startTime = new Date( "Jan 25 2021 17:02:37" ); // Put your website start time here
			startTime = startTime.getTime();
			
			var currentTime = new Date();
			currentTime = currentTime.getTime();
			
			var endTime = new Date( "Dec 31 2021 17:02:37" ); // Put your website end time here
			endTime = endTime.getTime();
			
			$('.countdown-timer').final_countdown({
				
				'start': (startTime/1000),
				'end': (endTime/1000), 
				'now': (currentTime/1000), 
				selectors: {
					value_seconds:'.clock-seconds .val',
					canvas_seconds:'canvas-seconds',
					value_minutes:'.clock-minutes .val',
					canvas_minutes:'canvas-minutes',
					value_hours:'.clock-hours .val',
					canvas_hours:'canvas-hours',
					value_days:'.clock-days .val',
					canvas_days:'canvas-days'
				},
				seconds: {
					//borderColor:'#c90103',
					borderColor:$('.type-seconds').attr('data-border-color'),
					borderWidth:'5',
				},
				minutes: {
					//borderColor:'#c90103',
					borderColor:$('.type-minutes').attr('data-border-color'),
					borderWidth:'5'
				},
				hours: {
					//borderColor:'#c90103',
					borderColor:$('.type-hours').attr('data-border-color'),
					borderWidth:'5'
				},
				days: {
					//borderColor:'#c90103',
					borderColor:$('.type-days').attr('data-border-color'),
					borderWidth:'5'
				}
			});
		}	
	}
	
	var handlePlaceholderAnimation = function()
	{
		if(jQuery('.dezPlaceAni').length)
		{
		
			$('.dezPlaceAni input, .dezPlaceAni textarea').on('focus',function(){
			  $(this).parents('.input-group').addClass('focused');
			});
			
			$('.dezPlaceAni input, .dezPlaceAni textarea').on('blur',function(){
			  var inputValue = $(this).val();
			  if ( inputValue == "" ) {
				$(this).removeClass('filled');
				$(this).parents('.input-group').removeClass('focused');  
			  } else {
				$(this).addClass('filled');
			  }
			})
		}
	}
	
	var handleSupport = function(){
		var support = '<a href="https://1.envato.market/qn2QWN" target="_blank" class="bt-buy-now theme-btn"><i class="ti-shopping-cart"></i><span>Buy Now</span></a><a href="https://support.w3itexperts.com" target="_blank" class="bt-support-now theme-btn"><i class="ti-headphone-alt"></i><span>Support</span></a><!-- Go to www.addthis.com/dashboard to customize your tools --><script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5b221c5e31b4e54b"></script>';
		jQuery('body').append(support);
	}
	
	/* Function ============ */
	return {
		init:function(){
			boxHover();
			onePageLayout();
			homeSearch();
			MagnificPopup();
			scrollTop();
			headerFix();
			handleVideo();
			handleFilterMasonary();
			handleCountDown(WebsiteLaunchDate);
			handleFinalCountDown();
			handleBannerResize();
			handelResize();
			lightGallery();
			setResizeMargin();
			kenburnSlider();
			bsSelect();
			jQuery('.modal').on('show.bs.modal', reposition);
			handleheartBlast();
			handlePlaceholderAnimation();
			handleSupport();
		},
		
		load:function(){
			dzTheme();
			counter();
			masonryBox();
			handleRadialProgress();
		},
		
		resize:function(){
			handleFinalCountDown();
			screenWidth = $(window).width();
			dzTheme();			
		}
	}
	
}();

/* Document.ready Start */	
jQuery(document).ready(function() {
    'use strict';
	Mazo.init();
	
	$('a[data-toggle="tab"]').on('click', function(){
		// todo remove snippet on bootstrap v4
		$($(this).attr('href')).show().addClass('show active').siblings().hide();
	});
	
	jQuery('.navicon').on('click',function(){
		$(this).toggleClass('open');
	});

});
/* Document.ready END */

/* Window Load START */
jQuery(window).on('load',function () {
	'use strict'; 
	Mazo.load();
	setTimeout(function(){
		AOS.init();
		jQuery('#loading-area').remove();
	}, 1000);
	
});
/*  Window Load END */
/* Window Resize START */
jQuery(window).on('resize',function () {
	'use strict'; 
	Mazo.resize();
});
/*  Window Resize END */


var coll = document.getElementsByClassName("tagia-faq-collapsible");
var i;

for (i = 0; i < coll.length; i++){
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
      content.style.visibility = "hidden";
      content.style.margin = "0 2%";
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      content.style.visibility = "visible";
      content.style.margin = "12px 2%";
    }
  });
}