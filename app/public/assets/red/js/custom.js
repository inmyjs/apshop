var CS = CS || {};
(function($){
	"use strict";

	//function to style checkbox and radio buttons
	CS.inputs_skin = function(){
		$('.checkbox_skin').each(function(){
			var $this = $(this);
			var checkbox_child = $this.children('input').css({opacity:0});
			if ($(checkbox_child).is(':checked')){
				$(this).css({backgroundPosition : 'left bottom'});
			}else{
				$(checkbox_child).css({backgroundPosition : 'left top'});
			}
			$(checkbox_child).change(function (){
				if ($(this).attr("checked")){
					$(this).parent().css({backgroundPosition : 'left bottom'});
					return;
				} else{
					$(this).parent().css({backgroundPosition : 'left top'});
				}
			});
		});

		$('.radio_skin').each(function(){
			var buttons = $(this).find(':radio').css({opacity:0});
			$(buttons).bind('click', function(){
				var current_name = $(this).attr('name');
				var radios_set = $(":radio[name="+current_name+"]");
				if($(radios_set).is(':checked')){
					$(buttons).parent().css({backgroundPosition : 'left bottom'});
				}
				$(radios_set).not(':checked').parent().css({backgroundPosition : 'left top'});
			});
		});

		$('.select_skin select').each(function(){
			var the_select = $(this),
			the_span = $(this).parent().find('.selected_value');
			the_select.css('opacity',0);
			the_span.text(the_select.find('option:selected').text());
		});

		$('.select_skin select').on('change', function(){
			var the_select = $(this),
			the_span = $(this).parent().find('.selected_value');
			the_span.text(the_select.find('option:selected').text());
		});
	}

	//function  increase/ decrease product qunatity buttons +/-
	CS.change_qty = function(container){
		var container = container,
		input = $(container).find('input:text'),
		default_val = $(input).val(),
		j = default_val,
		remove = $(container).find('span.minus_qty'),
		add = $(container).find('span.plus_qty');

		add.on('click', function(){
			if(j==$(input).data('max'))
                return;
            j++;
            $(input).val(j);
		});

		remove.on('click', function(){
			if(j > 1)
			{
				j--;
				$(input).val(j);
			} else{
				j = 1;
			}
		});

		input.blur(function(){
			if($(this).val() <= 0){
				j = 1;
				$(this).val(1);
			}else{
				j = $(this).val();
			}
		});
	}

	// functon to scrolle to an div  widh the ID ?
	CS.windowScrollTo = function(id){
		var hashContainer = $('#'+id),
		hashContainerPos = hashContainer.position().top;
		jQuery('html, body').animate({scrollTop:hashContainerPos}, 'slow');
	}

	// product page image magnify zoom
	CS.activate_jqzoom = function(type, effect){
		if(effect == 'fade'){
			var show = 'fadein';
			var hide = 'fadeout';
		} else{
			var show = 'show';
			var hide = 'hide';
		}
		$('.jqzoom').jqzoom({
			zoomType: type,
			lens:true,
			preloadImages: true,
			alwaysOn:false,
			zoomWidth: 300,
			zoomHeight: 680,
			xOffset:10,
			yOffset:10,
			showEffect:show,
			hideEffect:hide,
			position:'left'
		});
	}
})(jQuery);

$(document).ready(function(){

	// show search form
	if($('.search-popup-trigger')[0])
	{
		$('#top-search-wrapper').css({'right': -50});

		$('.search-popup-trigger').click(function(event)
		{
			event.preventDefault();

			$('#top-search-wrapper').toggleClass('show-search');
			if($('#top-search-wrapper').hasClass('show-search'))
			{
				$('#top-search-wrapper').css({'display' : 'block'}).animate({'opacity' : 1, 'right':-20}, 450, 'easeOutExpo');
			}
			else
			{
				$('#top-search-wrapper').animate({'opacity' : 0, 'right':-50}, 450, 'easeOutExpo', function(){$(this).css({'display': 'none'})});

			}
		});
	}

	//mobile menu youtube style slide
	if($('.mobile-icon-menu')[0]){
		$('.mobile-icon-menu').click(function(event)
		{
			var wrapperWidth = $(this).parent().innerWidth();

			event.preventDefault();
			$(this).toggleClass('show-mobile');
			if($(this).hasClass('show-mobile'))
			{
				$(this).animate({'left' : wrapperWidth - 50}, 250, 'linear', function(){
					$('ul.primary-nav li').not('.search-wrapper').slideDown();
				}).html('&#xe0010;');
				$('.menu-label').animate({'left' : 20}, 100, 'linear');
			}
			else
			{
				$(this).animate({'left' : 0}, 250, 'linear').html('&#xe008;');
				$('.menu-label').animate({'left' : 60}, 100, 'linear');
				$('ul.primary-nav li').not('.search-wrapper').slideUp();

			}
		});
	}
	CS.inputs_skin();
	CS.change_qty($('.price-data-box'));
	if($('td.quantity')[0]){
		$('td.quantity').each(function(){
			CS.change_qty($(this));
		});
	}

	// category-grid template categories slider
	if($('.flexslider-categories')[0]){
		$('.flexslider-categories').flexslider({
			animation: "slide",
			itemWidth: 90,
			itemMargin: 0,
			minItems: 1,
			maxItems: 4,
			selector: ".slides > li",
			prevText: "&#xe00e;",
			nextText: "&#xe011;",
			controlNav: false,
		});
	}

	function qviewGridSize(){
		var site_wrapper = $('.container_12').width();
		if(site_wrapper >= 940){
			return 236;
		}
		else if(site_wrapper == 714){
			return 236;
		}
		else if(site_wrapper == 420){
			return 210;
		}else if(site_wrapper == 300){
			return 280;
		}
	}

	// Homepage  Template (index.html ) product quick view slider
	if($('.offers-box .flexslider')[0]){
        $('.offers-box .flexslider').flexslider({
            animation: "slide",
            itemWidth: qviewGridSize(),
            itemMargin: -2,
            minItems: 1,
            slideshow: true,
            maxItems: 4,
            selector: ".slides > li",
            prevText: "&#xe00e;",
            nextText: "&#xe011;",
            controlNav: false,
            pauseOnHover:true
        });
    }

	// Homepage tmp (index2.html ) quick view plguin
	if($("a[rel^='prettyPopin']")[0]){
		$("a[rel^='prettyPopin']").prettyPopin({width:460});
	}

	// Homepage tmp (index2.html ) featured slider
	if($('.swiper-main')[0]){
		var swiper = new Swiper('.swiper-main', {
			slideClass : 'swiper-slide',
			wrapperClass : 'swiper-container',
			loop:true,
			ratio : 1,
			speed : 300,
			freeMode : false,
			freeModeFluid : false,
			slidesPerSlide : 1,
			simulateTouch : true,
			followFinger : true,
			autoPlay:5000,
			onlyExternal : false,
			createPagination : true,
			resistance : true,
			scrollContainer : false,
			preventLinks : true,
			initialSlide: 0,
			onSlideClick : function()
			{

			}
		});
		$('.arrow-left').click(function(e)
		{
			swiper.swipePrev();

		});
		$('.arrow-right').click(function(e)
		{
			swiper.swipeNext();
		});
	}

	//increase/ decrease product qunatity buttons +/- in cart.html table
	/*if($('.subDropdown')[0]){
		$('.subDropdown').click(function(){
			$(this).toggleClass('plus');
			$(this).toggleClass('minus');
			$(this).parent().find('ul').slideToggle();
		});
	}*/

	//product page details/ review tabs

	if($("#tabs")[0]){
		$( "#tabs" ).tabs({
			activate: function(event, ui){
				$(ui.oldTab).find('a').removeClass('active-tab');
				$(ui.newTab).find('a').addClass('active-tab');
			},
		});
	}

	//init /public/assets/red/images/views lightbox view
	if($('.prettyphoto')[0]){
		$('.prettyphoto').prettyPhoto();
	}

	//product page top "write review button scroll and show review form
	$('.write_review').click(function(){
		CS.windowScrollTo('tab-review');
	});

	//scroll to the top
	$('.gotoTop').click(function(){
		CS.windowScrollTo('wrapper');
	});

	function scrolltop() {
		arrow = $('.gotoTop');
		window_top_pos = $(document).scrollTop();
		height_windows = $(window).height();
		if(window_top_pos > (height_windows + (height_windows/4))){
			arrow.stop().animate({opacity:1});
		}else{
			arrow.stop().animate({opacity:0});
		}
		$(document).scroll(function()
		{
			window_top_pos = $(document).scrollTop();
			if(window_top_pos > (height_windows + (height_windows/4)))
			{
				arrow.stop().animate({opacity:1});
			}else{
				arrow.stop().animate({opacity:0});
			}
		});
	}
	scrolltop();

	//init  sharre plugin for blog single post page more info  http://sharrre.com
	$('#share').sharrre({
		share: {
			googlePlus: true,
			facebook: true,
			twitter: true,
			pinterest: true
		},
		buttons: {
			googlePlus: {size: 'tall', annotation:'bubble'},
			facebook: {layout: 'box_count'},
			twitter: {count: 'vertical', via: $('#share').data('twitter-id')},
			pinterest: {description : $('#share').data('text'), layout: 'vertical'},
		},
		hover: function(api, options){
			$(api.element).find('.buttons').show();
		},
		hide: function(api, options){
			$(api.element).find('.buttons').hide();
		},
		enableTracking: true
	});


	var selectMenu = {
		init: function(config)
		{
			this.config = config;
			this.changeEvent();
		},
		changeEvent : function()
		{
			var self = this;
			self.config.menu.on('change', self.goToPage);
		},
		goToPage : function()
		{
			select_url = this.value;
			window.location.href = select_url;
		}
	}

	// header curency and language click toggle use it to assing ajax or php dynamic function to change the language or currency according to your CMS
	$('.top-select-menu').toggle(function(){
		$(this).find('a').not('.active_option').css({
			display:'block',
			opacity:1
		});

	}, function() {
		$(this).find('a').not('.active_option').css({
			display:'none',
			opacity:0
		});
	});

	// top arrow button hide/show top header
	if($('.slide-toggle')[0]){
		$('.slide-toggle').click(function() {
			$('#top-wrapper').slideToggle(function () {
				if($('#top-wrapper').css("display")=="block"){
                    $('#top-wrapper').css("overflow","visible");
				}
            });
		});
	}

	//init mobile select menu
	selectMenu.init({
		menu : jQuery('#mobile-nav-menu')
	});


	// show cart details  in Header with click used for mobile hover no effect
	$('.click-trigger').click(function(){
		//var hiddenBox = $(this).parent().find('.hidden_box');
		//$(hiddenBox).toggleClass('display-click');
	});

	// footer tweeter widget
	// username : add your username
	// count : number of latest tweets to show
	if($("#tweets_wraper")[0]){
		// $("#tweets_wraper").tweet({
		// 	modpath : 'js/twitter/load_tweets.php',
		// 	username : 'envato',
		// 	count : 2,
		// 	loading_text : 'loading...',
		// 	avatar_size: 32,
		// 	join_text: "auto",
		// 	loading_text: "searching twitter...",
		// 	auto_join_text_default: "<b>:</b>",
		// 	auto_join_text_ed: "<b>:</b>",
		// 	template: "{avatar}<div class='vorbim clearfix'>{time}{text}<i class='icomoon tweets-icon' aria-hidden='true' data-icon='&#x25a1;'></i></div>"
		// });
	}

	//function for dynamic google map
	// add API key to header script where :
	//<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=YOUR API KEY&amp;sensor=false"></script>
	//to create your API key, visit the APIs Console at Google Map API v3 "https://code.google.com/apis/console"
	function initialize(){
		var latitude = 44.380318;
		var longitude = 26.122932;
		var marked_pos = new google.maps.LatLng(latitude, longitude);
		var the_id = "google-map";
		var myOptions = {
			center: marked_pos,
			zoom: 6,
			controls: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(document.getElementById(the_id),
			myOptions);

		var marker = new google.maps.Marker({
			position: marked_pos,
			map: map,
			title:"envato marketplace"});
	}

	//init google map code if contact page is shown
	if($('#google-map')[0]){
		initialize();
	}

	// featured homepage slider - function below to make it respoisnve slider
	var $window = $(window);
	function getGridSize(){
		var container = $('.container_12').width();
		if(container >= 940){
			return 222;
		}
		else if(container == 714){
			return 226;
		}
		else if(container == 420){
			return 200;
		}else if(container == 300){
			return 300;
		}
	}

	var flexsliderFeatured = jQuery('#main-container .featured-module').flexslider({
		animation: "product-box",
		itemWidth: getGridSize(),
		itemMargin: 17.6,
		minItems: 1,
		maxItems: 4,
		selector: ".slides > div.product-box",
		prevText: "&#xe00e;",
		nextText: "&#xe011;",
		controlNav: false,
        pauseOnHover:true,
		start : function(){
			flexsliderFeatured = this;
		}
	});

	$window.resize(function(){
		var gridSize = getGridSize();
		if ( $('#main_container .featured_box').length){
			flexsliderFeatured.itemWidth = gridSize;
		}
	  });
	// responsive video plugin
	if($("#wrapper")[0]){ $("#wrapper").fitVids(); }

	//product page image zoom plugin
	if($('.vertical-slider')[0]){
		$('.vertical-slider .flexslider').flexslider({
			animation: "slide",
			animationLoop: false,
			direction: "vertical",
			prevText: "&#xe010;",
			nextText: "&#xe00f;",
			selector: ".slides > li",
			minItems: 2,
			maxItems: 3,
			itemMargin: 50,
			controlNav: false

		});
	}

	if($('.horizontal-slider')[0]){
		$('.horizontal-slider .flexslider').flexslider({
			animation: "slide",
			animationLoop: false,
			prevText: "&#xe00e;",
			nextText: "&#xe011;",
			selector: ".slides > li",
			minItems: 1,
			maxItems: 3,
			controlNav: false,
			itemWidth: 95,
			itemMargin: 0
		});
	}

	if($('.jqzoom')[0]){ CS.activate_jqzoom('innerzoom', 'fade'); }

	if($('.responsive-slider')[0]){
		$('.responsive-slider').flexslider({
			animation: "slide",
			prevText: "&#xe00e;",
			nextText: "&#xe011;",
			controlNav: false,
		});
	}

	//Background slideshow
	if($('#bg-slideshow')[0]){
		$('#bg-slideshow').kenburns({
			images:[
			"/public/assets/red/images/bg-slideshow/1.jpg",
			"/public/assets/red/images/bg-slideshow/2.jpg",
			"/public/assets/red/images/bg-slideshow/3.jpg"
			],
			frames_per_second: 30,
			display_time: 7000,
			fade_time: 1000,
			zoom: 1.2,
			background_color:'#000000'
		});
	}

	$('.panle-toggle').click(function(){
		$('#demo-panel').toggleClass('hide-panel');

		if($('#demo-panel').hasClass('hide-panel'))
		{
			$('#demo-panel').animate({'left' : 0});
		}else{
			$('#demo-panel').animate({'left' : -180});
		}
	});

	var style = $.cookies.get('style', {path : '/'});

	if(style == null) {
		$('#custom-style').attr('href', '/public/assets/red/css/styles/red.css');
		//$('#logo img').attr('src', '/public/assets/red/images/logo-red.png');
	}else{
		$('#custom-style').attr('href', '/public/assets/red/css/styles/'+style+'.css');
		//$('#logo img').attr('src', '/public/assets/red/images/logo-'+style+'.png');
	}

	$('#pattren-for').children().each(function (index,item) {
        var _tTag=$(item).val();
        var _pattBg = $.cookies.get(_tTag, {path : '/'});
        if(_pattBg){
            $(_tTag).css({'background-image' : decodeURI(_pattBg)});
        }
    });

	$('.style-preview').click(function(){
			var newStyle = $(this).data('style');
			$.cookies.set('style', newStyle, {path : '/'});
			var style = $.cookies.get('style', {path : '/'});
			$('#custom-style').attr('href', '/public/assets/red/css/styles/'+style+'.css');
			//$('#logo img').attr('src', '/public/assets/red/images/logo-'+style+'.png');
		});

	$('.pattern-preview').click(function(){
		var tTag = $('#pattren-for').val();
		var pattBg = $(this).css('background-image');
        $.cookies.set(tTag, encodeURI(pattBg), {path : '/'});
		$(tTag).css({'background-image' : pattBg});
	});

});

/**
##############################
- ACTIVATE THE RECOLUTION SLIDER
##############################
**/

/*
$(document).ready(function() {

	if ($.fn.cssOriginal != undefined) $.fn.css = $.fn.cssOriginal;

	if($(".bannercontainer .banner")[0]){
		jQuery('.bannercontainer .banner').show().revolution(
		{
			dottedOverlay:"none",
			delay:16000,
			startwidth:1170,
			startheight:600,
			hideThumbs:200,

			thumbWidth:100,
			thumbHeight:50,
			thumbAmount:5,

			navigationType:"bullet",
			navigationArrows:"solo",
			navigationStyle:"preview2",

			touchenabled:"on",
			onHoverStop:"on",

			swipe_velocity: 0.7,
			swipe_min_touches: 1,
			swipe_max_touches: 1,
			drag_block_vertical: false,

			parallax:"mouse",
			parallaxBgFreeze:"on",
			parallaxLevels:[7,4,3,2,5,4,3,2,1,0],

			keyboardNavigation:"on",

			navigationHAlign:"center",
			navigationVAlign:"bottom",
			navigationHOffset:0,
			navigationVOffset:20,

			soloArrowLeftHalign:"left",
			soloArrowLeftValign:"center",
			soloArrowLeftHOffset:20,
			soloArrowLeftVOffset:0,

			soloArrowRightHalign:"right",
			soloArrowRightValign:"center",
			soloArrowRightHOffset:20,
			soloArrowRightVOffset:0,

			shadow:0,
			fullWidth:"on",
			fullScreen:"off",

			spinner:"spinner4",

			stopLoop:"off",
			stopAfterLoops:-1,
			stopAtSlide:-1,

			shuffle:"off",

			autoHeight:"off",
			forceFullWidth:"off",

			hideThumbsOnMobile:"off",
			hideNavDelayOnMobile:1500,
			hideBulletsOnMobile:"off",
			hideArrowsOnMobile:"off",
			hideThumbsUnderResolution:0,

			hideSliderAtLimit:0,
			hideCaptionAtLimit:0,
			hideAllCaptionAtLilmit:0,
			startWithSlide:0,
			videoJsPath:"rs-plugin/videojs/",
			fullScreenOffsetContainer:""
		});
	}
});*/
$(document).ready(function() {

    if ($.fn.cssOriginal!=undefined)
        $.fn.css = $.fn.cssOriginal;

    $('.rev-banner').revolution(
        {
            delay:9000,
            startheight:300,
            startwidth:960,
            hideThumbs:200,
            thumbWidth:100,							// Thumb With and Height and Amount (only if navigation Tyope set to thumb !)
            thumbHeight:50,
            thumbAmount:5,

            navigationType:"none",				// bullet, thumb, none
            navigationArrows:"solo",				// nexttobullets, solo (old name verticalcentered), none

            navigationStyle:"navbar",				// round,square,navbar,round-old,square-old,navbar-old, or any from the list in the docu (choose between 50+ different item), custom


            navigationHAlign:"center",				// Vertical Align top,center,bottom
            navigationVAlign:"bottom",					// Horizontal Align left,center,right
            navigationHOffset:0,
            navigationVOffset:20,

            soloArrowLeftHalign:"left",
            soloArrowLeftValign:"center",
            soloArrowLeftHOffset:20,
            soloArrowLeftVOffset:20,

            soloArrowRightHalign:"right",
            soloArrowRightValign:"center",
            soloArrowRightHOffset:20,
            soloArrowRightVOffset:20,

            touchenabled:"on",						// Enable Swipe Function : on/off
            onHoverStop:"off",						// Stop Banner Timet at Hover on Slide on/off

            stopAtSlide:-1,							// Stop Timer if Slide "x" has been Reached. If stopAfterLoops set to 0, then it stops already in the first Loop at slide X which defined. -1 means do not stop at any slide. stopAfterLoops has no sinn in this case.
            stopAfterLoops:-1,						// Stop Timer if All slides has been played "x" times. IT will stop at THe slide which is defined via stopAtSlide:x, if set to -1 slide never stop automatic

            hideCaptionAtLimit:0,					// It Defines if a caption should be shown under a Screen Resolution ( Basod on The Width of Browser)
            hideAllCaptionAtLilmit:0,				// Hide all The Captions if Width of Browser is less then this value
            hideSliderAtLimit:0,					// Hide the whole slider, and stop also functions if Width of Browser is less than this value

            shadow:1,								//0 = no Shadow, 1,2,3 = 3 Different Art of Shadows  (No Shadow in Fullwidth Version !)
            fullWidth:"off"							// Turns On or Off the Fullwidth Image Centering in FullWidth Modus
        });
});


