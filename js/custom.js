(function($){
	"use strict";
	/* ---------------------------------------------- /*
	 * Preloader
	/* ---------------------------------------------- */

	$(window).load(function() {
		$('.loader').fadeOut();
		$('.page-loader').delay(350).fadeOut('slow');
	});

    /*navigation*/
    $.extend($.easing, {
        easeInOutCubic : function(x, t, b, c, d){
            if ((t/=d/2) < 1) return c/2*t*t*t + b;
            return c/2*((t-=2)*t*t + 2) + b;
        }
    });
    $.fn.outerFind = function(selector){
        return this.find(selector).addBack(selector);
    };
    (function($,sr){
        // debouncing function from John Hann
        // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
        var debounce = function (func, threshold, execAsap) {
            var timeout;

            return function debounced () {
                var obj = this, args = arguments;
                function delayed () {
                    if (!execAsap) func.apply(obj, args);
                    timeout = null;
                };

                if (timeout) clearTimeout(timeout);
                else if (execAsap) func.apply(obj, args);

                timeout = setTimeout(delayed, threshold || 100);
            };
        }
        // smartresize 
        jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

    })(jQuery,'smartresize');
    (function(){
        
        var scrollbarWidth = 0, originalMargin, touchHandler = function(event){
            event.preventDefault();
        };

        function getScrollbarWidth(){
            if (scrollbarWidth) return scrollbarWidth;
            var scrollDiv = document.createElement('div');
            $.each({
                top : '-9999px',
                width  : '50px',
                height : '50px',
                overflow : 'scroll', 
                position : 'absolute'
            }, function(property, value){
                scrollDiv.style[property] = value;
            });
            $('body').append(scrollDiv);
            scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
            $('body')[0].removeChild(scrollDiv);
            return scrollbarWidth;
        }

    })();
	
    $.isMobile = function(type){
        var reg = [];
        var any = {
            blackberry : 'BlackBerry',
            android : 'Android',
            windows : 'IEMobile',
            opera : 'Opera Mini',
            ios : 'iPhone|iPad|iPod'
        };
        type = 'undefined' == $.type(type) ? '*' : type.toLowerCase();
        if ('*' == type) reg = $.map(any, function(v){ return v; });
        else if (type in any) reg.push(any[type]);
        return !!(reg.length && navigator.userAgent.match(new RegExp(reg.join('|'), 'i')));
    };
    var isSupportViewportUnits = (function(){
        // modernizr implementation
        var $elem = $('<div style="height: 50vh; position: absolute; top: -1000px; left: -1000px;">').appendTo('body');
        var elem = $elem[0];
        var height = parseInt(window.innerHeight / 2, 10);
        var compStyle = parseInt((window.getComputedStyle ? getComputedStyle(elem, null) : elem.currentStyle)['height'], 10);
        $elem.remove();
        return compStyle == height;
    }());
	
    $(function(){

        $('html').addClass($.isMobile() ? 'mobile' : 'desktop');
 
        if ($.fn.jarallax && !$.isMobile()){
            $(document).on('destroy.parallax', function(event){
                $(event.target).outerFind('.mbr-parallax-background, .parallaxbg')
                    .jarallax('destroy')
                    .css('position', '');
            });
            $(document).on('add.cards change.cards', function(event){
                $(event.target).outerFind('.mbr-parallax-background, .parallaxbg')
                    .jarallax()
                    .css('position', 'relative');
            });
        } 

		$('#go-bottom').on('click', function (e) {
			e.preventDefault();
		$('body,html').stop().animate({ scrollTop: document.documentElement.clientHeight } , 1000);
		});

        // init
        $('body > *:not(style, script)').trigger('add.cards');
        $('html').addClass('mbr-site-loaded');
        $(window).resize().scroll();

    });


    /*-----------------------------------------------------------------------------------*/
	/*    STICKY NAVIGATION
	/*-----------------------------------------------------------------------------------*/
	//$(document).ready(function(){
		//jQuery(".sticky").sticky({topSpacing:0});
	//});
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1){  
            $('header').addClass("sticky");
        }
        else{
            $('header').removeClass("sticky");
        }
    });
    
	$(document).ready(function() {
 
		/* ---------------------------------------------- /*
		 * Full height module
		/* ---------------------------------------------- */

		function buildModuleHero() {
			if (moduleHero.length > 0) {
				if (moduleHero.hasClass('module-full-height')) {
					moduleHero.height($(window).height());
				} else {
					moduleHero.height($(window).height() * 0.85);
				}
			}
		}
  
		/* ---------------------------------------------- /*
		 * WOW Animation
		/* ---------------------------------------------- */

		var wow = new WOW({
			mobile: false
		});

		wow.init();

 
		/* ---------------------------------------------- /*
		 * Scroll Animation
		/* ---------------------------------------------- */

		$('.section-scroll').bind('click', function(e) {
			var anchor = $(this);

			$('html, body').stop().animate({
				scrollTop: $(anchor.attr('href')).offset().top -91
			}, 1000);

			e.preventDefault();
		});
		
		 


		/* ---------------------------------------------- /*
		 * Scroll top
		/* ---------------------------------------------- */

		$(window).scroll(function() {
			if ($(this).scrollTop()) {
				$('.scroll-up').fadeIn();
			} else {
				$('.scroll-up').fadeOut();
			}
		});

		$('a[href="#totop"]').click(function() {
			$('html, body').animate({ scrollTop: 0 }, 'slow');
			return false;
		});

	});
	
	/* ==============================================
        Project Tab
    =============================================== */
    $(".product_name").click(function() {
        var activeTab = $(this).attr("href"); //Find the target via the href
        if ($(activeTab).is(':visible') ){
            //$(activeTab).slideUp();
            // $(this).removeClass("active");
        } else {			
            $(".product_name").removeClass("active"); //Remove any "active" class					
            $(this).addClass("active")
            $('.product_table').hide();
            $(activeTab).fadeIn();		
        }
        return false;
    });
	
     jQuery(document).ready(function(){
        $(".tabs li").click(function() {
		  var activeTab = $(this).attr("href");
		  //alert("Hello! I am an alert box!!");
		$(".tab_container" ).find( ".product_table.current" ).css( "display", "block" );
		});
	});

})(jQuery);


/*Equal Height*/
	equalheight = function(container){
		var currentTallest = 0,
			 currentRowStart = 0,
			 rowDivs = new Array(),
			 $el,
			 topPosition = 0;
		 jQuery(container).each(function() {
		   $el = jQuery(this);
		   jQuery($el).height('auto')
		   topPostion = $el.position().top;

		   if (currentRowStart != topPostion) {
			 for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
			   rowDivs[currentDiv].height(currentTallest);
			 }

			 rowDivs.length = 0; // empty the array
			 currentRowStart = topPostion;
			 currentTallest = $el.height();
			 rowDivs.push($el);
		   } else {
			 rowDivs.push($el);
			 currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
		  }
		   for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
			 rowDivs[currentDiv].height(currentTallest);
		   }
		 });
		}
	if(jQuery(window).width() >= 992){
		equalheight('.eqheight');
		equalheight('.industries_listing .industrie .details h3');
		equalheight('ul.tabs li');
	}

 	// tabbed content
    // http://www.entheosweb.com/tutorials/css/tabs.asp
    $(".tab_content").hide();
    $(".tab_content:first").show();

	/* if in tab mode */
    $("ul.tabs li").click(function() {
      $(".tab_content").hide();
      var activeTab = $(this).attr("rel"); 
      $("#"+activeTab).fadeIn();		
		
      $("ul.tabs li").removeClass("active");
      $(this).addClass("active");

	  $(".tab_drawer_heading").removeClass("d_active");
	  $(".tab_drawer_heading[rel^='"+activeTab+"']").addClass("d_active");
	  
    });

	/* if in drawer mode */
	$(".tab_drawer_heading").click(function() { 
      $(".tab_content").hide();
      var d_activeTab = $(this).attr("rel"); 
      $("#"+d_activeTab).fadeIn();
	  
	  $(".tab_drawer_heading").removeClass("d_active");
      $(this).addClass("d_active");
	  
	  $("ul.tabs li").removeClass("active");
	  $("ul.tabs li[rel^='"+d_activeTab+"']").addClass("active");
    });
	
	/* Extra class "tab_last" 
	   to add border to right side
	   of last tab */
	$('ul.tabs li').last().addClass("tab_last");