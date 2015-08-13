/* global $:false, jquery:false, window:false, document:false */
(function () {
    'use strict';

    var navHeaderBehavior = navHeaderBehaviorFn,
        resizeSparkLogo = resizeSparkLogoFn,
        showAbout = showAboutFn,
        showEvents = showEventsFn,
        showSolutions = showSolutionsFn,
        showPartners = showPartnersFn,
        showClients = showClientsFn,
        showContacts = showContactsFn,
        navHeaderHighlightBehavior = navHeaderHighlightBehaviorFn;

    activate();

    function activate () {
        navHeaderHighlightBehavior();
        navHeaderBehavior();
        resizeSparkLogo();
        showAbout();
        showEvents();
        showSolutions();
        showPartners();
        //showClients();
        showContacts();

        $('#SparkLogo').fadeIn(1000);

        var $root = $('html, body');
        $('.nav-item').click(function() {
            var href = $.attr(this, 'href');
            $root.animate({
                scrollTop: $(href).offset().top - headerHeight() + 1
            }, 500);
            return false;
        });

        $(window).bind("scroll", navHeaderHighlightBehavior);
        $(window).bind("scroll", navHeaderBehavior);
        $(window).bind("scroll", showAbout);
        $(window).bind("scroll", showEvents);
        $(window).bind("scroll", showSolutions);
        $(window).bind("scroll", showPartners);
        //$(window).bind("scroll", showClients);
        $(window).bind("scroll", showContacts);
        $(window).resize(resizeSparkLogo);

    }

    /**
     * Resize the SPARK logo to fit the center of the screen.
     */
    function resizeSparkLogoFn () {
        var windowSize = getWindowSize(),
            sparkLogo = $('#SparkLogo');

        sparkLogo.css('width', (windowSize.height / 3) * 100 / windowSize.width + '%');
        sparkLogo.css('margin-left', (windowSize.width - windowSize.height / 3) / 2 * 100 / windowSize.width + '%');
        $('#logo').height(windowSize.height - headerHeight());
//        heightToUncover = windowSize.height * 0.20;
    }

    /**
     * Define the behavior of the navigation header.
     * It should stay on top of the page when scrolling down and it
     * should move in case that the user scrolls up to the Logo.
     */
    function navHeaderBehaviorFn () {
        var scrollerAnchor = $('#scrollerAnchor'),
            scrollTop = $(window).scrollTop(),
            offsetTop = scrollerAnchor.offset().top,
            navHeader = $('#nav');

        if ( scrollTop > offsetTop ) {
            navHeader.css({
                position: 'fixed',
                top: '0px'
            });
            scrollerAnchor.css({height: headerHeight() + 'px'});
        } else {
            if ( scrollTop <= offsetTop ) {
                navHeader.css({
                    position: 'relative',
                    top: ''
                });
                scrollerAnchor.css({height: '0'});
            }
        }
    }

    /**
     * Define the highlighting behavior of the navigation header on
     * page scroll.
     */
    function navHeaderHighlightBehaviorFn () {
        var headerHght = headerHeight(),
            about = $('#about').offset().top - headerHght,
            events = $('#events').offset().top - headerHght,
            solutions = $('#solutions').offset().top - headerHght,
            partners = $('#partners').offset().top - headerHght,
            //clients = $('#clients').offset().top - headerHght,
            contacts = $('#contacts').offset().top - headerHght,
            scrollTop = $(window).scrollTop();

        if (scrollTop < about) {
            $('.nav-item').removeClass('is-active-nav-item');
        } else if (scrollTop < events) {
            $('.nav-item').removeClass('is-active-nav-item');
            $('a[href=#about]').addClass('is-active-nav-item');
        } else if (scrollTop < solutions) {
            $('.nav-item').removeClass('is-active-nav-item');
            $('a[href=#events]').addClass('is-active-nav-item');
        } else if (scrollTop < partners) {
            $('.nav-item').removeClass('is-active-nav-item');
            $('a[href=#solutions]').addClass('is-active-nav-item');
        //} else if (scrollTop < clients) {
        //    $('.nav-item').removeClass('is-active-nav-item');
        //    $('a[href=#partners]').addClass('is-active-nav-item');
        //} else if (scrollTop < contacts) {
        //    $('.nav-item').removeClass('is-active-nav-item');
        //    $('a[href=#clients]').addClass('is-active-nav-item');
        } else {
            $('.nav-item').removeClass('is-active-nav-item');
            $('a[href=#contacts]').addClass('is-active-nav-item');
        }
    }

    /**
     * Manage the first appearance of the About Us block on
     * the landing page.
     */
    function showAboutFn () {
        var blockHeader = $('.about-header'),
            pElements = $('#about p'),
            liElements = $('#about li');

        liElements.each(function ( i ) {
            var delay = (i * 2) / 10;

            $(this).css('-webkit-animation-delay', delay + 's');
            $(this).css('-moz-animation-delay', delay + 's');
            $(this).css('animation-delay', delay + 's');

            setElementAnimation(this, 'fadeIn', getDistanceToBottomOfScreen1($('.is-white-bulleted')));
        });

        pElements.each(function( i ) {
            setElementAnimation(this, 'fadeIn');
        });

        setElementAnimation(blockHeader, 'fadeInDown');
    }

    /**
     * Manage the first appearance of the Events block on
     * the landing page.
     */
    function showEventsFn () {
        var blockHeader = $('.events-header'),
            bizpower = $('#bizpower'),
            tedxchisinau = $('#tedxchisinau'),
            girlsgoit = $('#girlsgoit'),
            pElements = $('.about-bizpower, .about-tedxchisinau, .about-girlsgoit');

        setElementAnimation(blockHeader, 'fadeInUp');
        setElementAnimation(bizpower, 'fadeIn');
        setElementAnimation(tedxchisinau, 'fadeIn');
        setElementAnimation(girlsgoit, 'fadeIn');
//        setElementAnimation(aboutBizpower, 'fadeInDown');

        pElements.each(function ( i ) {
            setElementAnimation(this, 'fadeIn');
        });
    }

    /**
     * Manage the first appearance of the Solutions block on
     * the landing page.
     */
    function showSolutionsFn() {
        var scrollTop = $(window).scrollTop();
        var windowHeight = getWindowSize().height;
        var blockHeader = $('.solutions-header');
        var prism = $('#prism');
        var pElements = $('#solutions p');

        pElements.each(function(i) {
            setElementAnimation(this, 'fadeIn');
        });
        setElementAnimation(prism, 'fadeInUp');
        setElementAnimation(blockHeader, 'fadeIn');
    }

    /**
     * Manage the first appearance of the Partners block on
     * the landing page.
     */
    function showPartnersFn() {
        var scrollTop = $(window).scrollTop();
        var windowHeight = getWindowSize().height;
        var blockHeader = $('.partners-header');
        var partners = $('.partners');

        setElementAnimation(blockHeader, 'fadeIn');
        setElementAnimation(partners, 'fadeInUp');
    }

    /**
     * Manage the first appearance of the Partners block on
     * the landing page.
     */
    function showClientsFn() {
        var scrollTop = $(window).scrollTop();
        var windowHeight = getWindowSize().height;
        var blockHeader = $('.clients-header');
        var clients = $('.clients-logos');

        setElementAnimation(blockHeader, 'fadeIn');
        setElementAnimation(clients, 'fadeInUp');
    }

    /**
     * Manage the first appearance of the Contacts block on
     * the landing page.
     */
    function showContactsFn() {
        var scrollTop = $(window).scrollTop();
        var windowHeight = getWindowSize().height;
        var blockHeader = $('.contacts-header');
        var contactDetails = $('.contact-details');

        setElementAnimation(blockHeader, 'fadeIn');
        setElementAnimation(contactDetails, 'fadeInUp');
    }

    /**
     * Set the element animation by means of applying animate.css classes
     * to the dom elements that are to be animated.
     * @param {jQueryObject} element The DOM element that should be animated.
     * @param {string} effect A string that represents a css class from animate.css framework.
     * @param {int} presetDistance A preset distance upon which to start the animation.
     */
    function setElementAnimation ( element, effect, presetDistance ) {
        var distanceToStartAnimation = presetDistance === undefined ? getDistanceToBottomOfScreen1(element) : presetDistance;

        if (distanceToStartAnimation > heightToUncover() && $(element).css('visibility') == 'hidden') {
            $(element).css('visibility', 'visible');
            $(element).addClass('animated ' + effect);
        }
    }

    /**
     * Compute the distance from a given DOM to the bottom of the screen.
     * @param   {jQueryObject} element The object for which to compute distance to bottom of the screen.
     * @returns {int} The distance to the bottom of the screen.
     */
    function getDistanceToBottomOfScreen1 ( element ) {
        var st = $(window).scrollTop();
        var wh = getWindowSize().height;
        return st + wh - $(element).offset().top;
    }

    /**
     * Get the height of the nav header.
     * @returns {float} The height of the navigation header.
     */
    function headerHeight () {
        return $('#nav').height();
    }

    /**
     * The height at which to start showing the content on first scroll down of the page.
     * @returns {float} The height at which to start the css animation.
     */
    function heightToUncover () {
        var windowSize = getWindowSize();
        return windowSize.height * 0.20;
    }

    /**
     * Get the size of the window the site is displayed in.
     * @returns {Object} An object with 'width' and 'height' properties.
     */
    function getWindowSize () {
        var myWidth = 0, myHeight = 0;
        if( typeof( window.innerWidth ) == 'number' ) {
            //Non-IE
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
        } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
            //IE 6+ in 'standards compliant mode'
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            //IE 4 compatible
            myWidth = document.body.clientWidth;
            myHeight = document.body.clientHeight;
        }
        return {height: myHeight, width: myWidth};
    }

})();
