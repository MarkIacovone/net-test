(function($) {
	
	'use strict';
	
	var Promium = {
		
		// Initialization the functions
		init: function() {
			Promium.AffixMenu();
			Promium.MobileMenu();
			Promium.ScrollSpy();
			Promium.SmoothScroll();
			Promium.FitVids();
			Promium.PlaceHolder();
			Promium.CounterUp();
			Promium.Form();
			Promium.Customizer();
		},
		
		// Navigation menu affix
		AffixMenu: function() {
			var navMenu	= '<nav id="navigation_affix">';
			navMenu		+= '<div class="container">';
			navMenu		+= '<div class="navbar-brand">';
			navMenu		+= '<a href="index.html"><img src="images/logo_affix.png" alt="Logo" /></a>';
			navMenu		+= '</div>';
			navMenu		+= '<ul class="nav navbar-nav">';
			navMenu		+= $('#navigation .nav.navbar-nav').html();
			navMenu		+= '</ul>';
			navMenu		+= '</div>';
			navMenu		+= '</nav>';
			
			$('#header').before(navMenu);
			
			$('#navigation').waypoint(function() {
				$('#navigation_affix').removeClass('show');
			}, {
				offset: -120
			});
			
			$('#navigation').waypoint(function() {
				$('#navigation_affix').addClass('show');
			}, {
				offset: -121
			});
		},
		
		// Add mobile navigation
		MobileMenu: function() {
			var navMenu	= '<nav id="navigation_mobile">';
			navMenu		+= '<div class="nav-menu-links">';
			navMenu		+= '<ul>';
			navMenu		+= $('#navigation .nav').html();
			navMenu		+= '</ul>';
			navMenu		+= '</div>';
			navMenu		+= '<div class="nav-menu-button">';
			navMenu		+= '<button class="nav-menu-toggle"><i class="fa fa-navicon"></i></button>';
			navMenu		+= '</div>';
			navMenu		+= '</nav>';
			
			$('#header').before(navMenu);
			
			$('.nav-menu-toggle').on('click', function() {
				$(this).parent('.nav-menu-button').prev('.nav-menu-links').slideToggle(300);
			});
		},
		
		// Navigation menu scrollspy to anchor section
		ScrollSpy: function() {
			$('body').scrollspy({
				target: '#navigation_affix',
				offset: parseInt($('#navigation_affix').height(), 0)
			});
		},
		
		// Smooth scrolling to anchor section
		SmoothScroll: function() {
			$('a.smooth-scroll').on('click', function(event) {
				var $anchor		= $(this);
				var offsetTop	= '';
				var elemHeight	= parseInt($('#navigation_affix').height() - 1, 0);
				
				if (window.Response.band(768)) {
					offsetTop = parseInt($($anchor.attr('href')).offset().top - elemHeight, 0);
				} else {
					offsetTop = parseInt($($anchor.attr('href')).offset().top, 0);
				}
				
				$('html, body').stop().animate({
					scrollTop: offsetTop
				}, 1500,'easeInOutExpo');
				
				event.preventDefault();
			});
		},
		
		// Responsive video size
		FitVids: function() {
			$('body').fitVids();
		},
		
		// Placeholder compatibility for IE8
		PlaceHolder: function() {
			$('input, textarea').placeholder();
		},
		
		// Number counter ticker animation
		CounterUp: function() {
			$('.affa_counter_text > h4').counterUp({
				delay: 10,
				time: 3000
			});
		},
		
		// Form submit function
		Form: function() {
			var pattern = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
			
			// Checking subcribe form input when focus and keypress event
			$('.affa-form-subscribe input[type="text"], .affa-form-subscribe input[type="email"]').on('focus keypress', function() {
				var $input = $(this);
				
				if ($input.hasClass('error')) {
					$input.val('').removeClass('error');
				}
				if ($input.hasClass('success')) {
					$input.val('').removeClass('success');
				}
			});
			
			// Checking form input when focus and keypress event
			$('.affa-form-signup input[type="text"], .affa-form-signup input[type="email"], .affa-form-signup input[type="password"], .affa-form-signup input[type="number"], .affa-form-signup textarea, .affa-form-signup select').on('focus keypress', function() {
				var $input = $(this);
				
				if ($input.hasClass('error')) {
					$input.removeClass('error');
				}
			});
			
			// Subscribe form when submit button clicked
			$('.affa-form-subscribe').submit(function() {
				var $email	= $(this).find('input[name="email"]');
				var $submit	= $(this).find('input[name="submit"]');
				
				if (pattern.test($email.val()) === false) {
					$email.val('Please enter a valid email address!').addClass('error');
				} else {
					var submitData = $(this).serialize();
					$email.attr('disabled', 'disabled');
					$submit.attr('disabled', 'disabled');
					$.ajax({
						type: 'POST',
						url: 'process-subscribe.php',
						data: submitData + '&action=add',
						dataType: 'html',
						success: function(msg) {
							if (parseInt(msg, 0) !== 0) {
								var msg_split = msg.split('|');
								
								if (msg_split[0] === 'success') {
									$submit.removeAttr('disabled');
									$email.removeAttr('disabled').val(msg_split[1]).addClass('success');
								} else {
									$submit.removeAttr('disabled');
									$email.removeAttr('disabled').val(msg_split[1]).addClass('error');
								}
							}
						}
					});
				}
				
				return false;
			});
			
			// Signup form when submit button clicked
			$('.affa-form-signup').submit(function() {
				var $form		= $(this);
				var submitData	= $form.serialize();
				var $name		= $form.find('input[name="name"]');
				var $email		= $form.find('input[name="email"]');
				var $phone		= $form.find('input[name="phone"]');
				var $message	= $form.find('textarea[name="message"]');
				var $submit		= $form.find('input[name="submit"]');
				var status		= true;
				if ($email.val() === '' || pattern.test($email.val()) === false) {
					$email.addClass('error');
					status = false;
				}
				if ($message.val() === '') {
					$message.addClass('error');
					status = false;
				}
				
				if (status) {
					$name.attr('disabled', 'disabled');
					$email.attr('disabled', 'disabled');
					$phone.attr('disabled', 'disabled');
					$message.attr('disabled', 'disabled');
					$submit.attr('disabled', 'disabled');
					
					$.ajax({
						type: 'POST',
						url: 'process-signup.php',
						data: submitData + '&action=add',
						dataType: 'html',
						success: function(msg) {
							if (parseInt(msg, 0) !== 0) {
								var msg_split = msg.split('|');
								if (msg_split[0] === 'success') {
									$name.val('').removeAttr('disabled');
									$email.val('').removeAttr('disabled');
									$phone.val('').removeAttr('disabled');
									$message.val('').removeAttr('disabled');
									$submit.removeAttr('disabled');
									$form.find('.submit-status').html('<span class="success"><i class="fa fa-check-circle"></i> ' + msg_split[1] + '</span>').fadeIn(300).delay(3000).fadeOut(300);
								} else {
									$name.removeAttr('disabled');
									$email.removeAttr('disabled');
									$phone.removeAttr('disabled');
									$message.removeAttr('disabled');
									$submit.removeAttr('disabled');
									$form.find('.submit-status').html('<span class="error"><i class="fa fa-exclamation-circle"></i> ' + msg_split[1] + '</span>').fadeIn(300).delay(3000).fadeOut(300);
								}
							}
						}
					});
				}
				
				status = true;
				
				return false;
			});
		},
		
		// Customizer to change the template layouts
		Customizer: function() {
			$('#customize .popup-open').click(function() {
				var $parent = $(this).parents('#customize');
				if ($parent.hasClass('in')) {
					$parent.removeClass('in');
				} else {
					$parent.addClass('in');
				}
			});
			
			$('#customize .customize-list-color a').click(function(e) {
				var $color = $(this).attr('class');
				$('head').append('<link rel="stylesheet" type="text/css" href="css/colors/' + $color + '.css">');
				e.preventDefault();
			});
		}
		
	};
	
	// Run the main function
	$(function() {
		Promium.init();
	});
	
})(window.jQuery);
