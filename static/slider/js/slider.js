(function ($) {
    'use strict';

    $(document).ready(function(){
        // ==========banner slider===========
        $('.banner').owlCarousel({
            items: 1,
            loop: true,
            smartSpeed: 5000,
            mouseDrag: true,
            touchDrag: true,
            animateIn: "fadeIn",
            animateOut: "fadeOut",
            margin: 0,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: false,
        });

        //==========banner text animation===========
        jQuery(".banner").on("translate.owl.carousel", function () {
            jQuery(this).find(".owl-item .banner-txt > *").removeClass("fadeInUp animated").css("opacity","0");
        });          
        jQuery(".banner").on("translated.owl.carousel", function () {
            jQuery(this).find(".owl-item.active .banner-txt > *").addClass("fadeInUp animated").css("opacity","1");
        });
    });
}(jQuery));