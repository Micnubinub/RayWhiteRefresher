// JavaScript Document

'use strict';

$(document).ready(function (e) {
    runMainSlider();
    runCarousels();
    checkMainMenuHeight();
    checkHeaderScroll();
    googleMap();

    $('.scroll-to').click(function (e) {
        e.preventDefault();
        $.scrollTo($(this).attr('href'), 800, {axis: 'y'});
    });

    $('.onscroll-animate').each(function (index, element) {
        $(this).one('inview', function (event, visible) {
            var el = $(this);
            if (el.hasClass('graph'))
                var anim = "graph-anim";
            else
                var anim = (el.data("animation") !== undefined) ? el.data("animation") : "fadeIn";
            var delay = (el.data("delay") !== undefined ) ? el.data("delay") : 200;

            setTimeout(function () {
                el.addClass(anim);
                if (el.hasClass('graph'))
                    el.children('.graph-value').countTo();
            }, delay);
        });
    });

    $(window).resize(function (e) {
        checkMainMenuHeight();
    });

    $(document).on('scroll', function () {
        checkHeaderScroll();
    });

    function checkMainMenuHeight() {
        if ($(window).height() < 700)
            $('.main-menu').addClass('scroll');
        else
            $('.main-menu').removeClass('scroll');
    }

    function checkHeaderScroll() {
        var offset = $('#head').height() - 80;
        $('#header-static').removeClass('after-scroll');
        if ($(window).scrollTop() > offset) {
            $('#header-static').addClass('after-scroll');
        }
    }

    function runCarousels() {
        $('#slider-testimonial').owlCarousel({
            singleItem: true,
        });

        $('#slider-blog-posts').owlCarousel({
            items: 3,
        });

        $('#team-slider').owlCarousel({
            singleItem: true,
            navigation: true,
            pagination: false,
            navigationText: false,
        });

        $('.full-slider').each(function (index, element) {
            $(this).owlCarousel({
                singleItem: true,
                navigation: true,
                navigationText: false,
            });
        });

        $('.post-images-slider').each(function (index, element) {
            $(this).owlCarousel({
                singleItem: true,
                navigation: true,
                navigationText: false,
            });
        });

        $('#team-directors-slider').owlCarousel({
            autoPlay: 3000, //Set AutoPlay to 3 seconds
            items: 4,
            loop: true,

        });

        $('#team-slider1').owlCarousel({
            autoPlay: 3000, //Set AutoPlay to 3 seconds
            items: 4,
            loop: true,

        });
    }

    function runMainSlider() {
        if (typeof MasterSlider != 'function')
            return;
        var slider = new MasterSlider();
        slider.setup('masterslider', {
            width: 1920,    // slider standard width
            height: 1200,   // slider standard height
            view: 'basic',
            layout: 'fullscreen',
            speed: 20
        });
        slider.control('bullets', {autohide: false});
    }


    /* Google Map */
    function googleMap() {
        if ($('#map-canvas').length == 0)
            return;
        var map;
        var myLatlng = new google.maps.LatLng(40.714728, -73.998672);

        function mapInitialize() {
            var mapOptions = {
                scrollwheel: false,
                zoom: 12,
                center: myLatlng
            };
            map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map
            });
        }

        google.maps.event.addDomListener(window, 'load', mapInitialize);
    }
});

$(window).load(function (e) {
    $('.parallax-background').each(function (index, element) {
        if (!$(this).attr("data-stellar-background-ratio"))
            $(this).attr('data-stellar-background-ratio', 0.4);
    });

    $.stellar({
        horizontalScrolling: false,
        responsive: true,
    });

    var isotopeEl = $('#works').isotope({
        itemSelector: '.work',
        layoutMode: 'fitRows'
    });

    $('.isotope-filter').click(function (e) {
        e.preventDefault();
        $(this).parent('.filter-list').children('.filter-active').removeClass('filter-active');
        $(this).addClass('filter-active');
        isotopeEl.isotope({filter: $(this).data('filter')});
    });
});

$('.return-msg').click(function (e) {
    $(this).removeClass('show-return-msg').html('&nbsp;');
});


