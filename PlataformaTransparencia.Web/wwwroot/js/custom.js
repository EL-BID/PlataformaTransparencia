(function() ***REMOVED***

	"use strict";
  
	var app = ***REMOVED***
		
		init: function() ***REMOVED***

			//=== Main visible ===\\
			this.mainVisible();

			//=== lazy loading effect ===\\
			this.lazyLoading();

			//=== Cookie ===\\
			this.cookieCheck();

			this.setUpListeners();

			//=== Custom scripts ===\\
			this.btnHover();
			this.appendMfBg();
			this.appendBtnTop();
			this.formingHrefTel();
			this.contentTable();
			this.clockCountDown();
			this.detectIE();

			//=== Plugins ===\\
			this.autoSizeTextarea();
			this.device();
			this.popUp();
			this.lightGallery();
			this.scrollToFixed();
			this.carusels();
			this.forms();
			this.isotopeProjects();
			this.isotopeGallery();
			this.isotopeGalleryMasonry();
			this.spincrement();

		***REMOVED***,
 
		setUpListeners: function() ***REMOVED***

			//=== Cookie ===\\
			$(".mc-btn").on("click", this.cookieSet);

			//=== Ripple effect for buttons ===\\
			$(".ripple").on("click", this.btnRipple);

			//=== Header search ===\\
			// Header search open
			$(".header-search-ico-search").on("click", this.headerSearchOpen);
			// Header search close \\
			$(".header-search-ico-close").on("click", this.headerSearchClose);
			// Header search close not on this element \\
			$(document).on("click", this.headerSearchCloseNotEl);

			//=== Header lang ===\\
			// Header lang open
			$(".header-lang-current").on("click", this.headerLangOpen);
			// Header lang select \\
			$(".header-lang-list a").on("click", this.headerLangSelect);
			// Header lang close not on this element \\
			$(document).on("click", this.headerLangCloseNotEl);

			//=== Header mobile/tablet navbar ===\\
			// Header navbar toggle \\
			$(".header-navbar-btn").on("click", this.headerNavbarToggle);
			// Header navbar close not on this element \\
			$(document).on("click", this.headerNavbarNotEl);

			//=== Mobile/tablet main menu ===\\
			// Main menu toogle \\
			$(".main-mnu-btn").on("click", this.MainMenuToggle);
			// Main menu submenu toogle \\
			$(".mmm-btn").on("click", this.MainMenuSubmenuToggle);
			// Main menu close not on this element \\
			$(document).on("click", this.MainMenuCloseNotEl);

			//=== Side toggle ===\\
			$(".side-open").on("click", this.sideOpen);
			$(document).on("click", ".side-close, .side-visible", this.sideClose);

			//=== Tab ===\\
			$(".tabs-nav li").on("click", this.tab);

			//=== Accordion ===\\
			$(".accordion-trigger").on("click", this.accordion);

			//=== Sidebar category item ===\\
			$(".sidebar-cat-item-has-child > a").on("click", this.sidebarCatItemToggle);

			//=== UI elements ===\\
			$(".ui-nav li").on("click", this.ui);
			
			//=== Form field ===\\
			$(".form-field").each(this.inputEach);
			$(".form-field-input")
				.on("focus", this.inputFocus)
				.on("keyup change", this.inputKeyup)
				.on("blur", this.inputBlur);

			//=== Button top ===\\
			$(document).on("click", '.btn-top', this.btnTop);
			$(window).on("scroll", this.btnTopScroll);
			
		***REMOVED***,

		//=== Body visible ===\\
		mainVisible: function() ***REMOVED***

			$(".main").addClass("main-visible");

		***REMOVED***,

		//=== Cookie ===\\
		COOKIENAME: 'enresultados-cookie',
		COOKIEDURATION: 1000,
		COOKIEEXDAYS: 30,
		cookieCheck: function() ***REMOVED***

			var cookieMessage = $(".cookie-message");

			if(!this.getCookie(this.COOKIENAME)) ***REMOVED***
				setTimeout(function() ***REMOVED***
					cookieMessage.addClass("open");
				***REMOVED***, this.COOKIEDURATION);
			***REMOVED***

		***REMOVED***,
		cookieSet: function() ***REMOVED***

			app.setCookie(app.COOKIENAME, 'enabled', app.COOKIEEXDAYS);
			$(this).closest(".cookie-message").removeClass('open');

		***REMOVED***,
		setCookie: function(cname, cvalue, exdays) ***REMOVED***
			var d = new Date();
			d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
			var expires = "expires=" + d.toUTCString();
			document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
		***REMOVED***,
		getCookie: function(name) ***REMOVED***
			var matches = document.cookie.match(new RegExp(
				"(?:^|; )" + name.replace(/([\.$?*|***REMOVED******REMOVED***\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
			));
			return matches ? decodeURIComponent(matches[1]) : undefined;
		***REMOVED***,

		appendMfBg: function() ***REMOVED***

			$("body").append('<div class="mf-bg"></div>');

		***REMOVED***,

		appendBtnTop: function() ***REMOVED***

			$("body").append('<div class="btn-top"><i class="material-icons md-24">arrow_upward</i></div>');

		***REMOVED***,

		btnTop: function() ***REMOVED***
			
			$('html, body').animate(***REMOVED***scrollTop: 0***REMOVED***,1000, function() ***REMOVED***
				$(this).removeClass("active");
			***REMOVED***);

		***REMOVED***,

		btnTopScroll: function() ***REMOVED***
			
			var btnTop = $('.btn-top');
			
			if ($(this).scrollTop() > 700) ***REMOVED***

				btnTop.addClass("active");

			***REMOVED*** else ***REMOVED***

				btnTop.removeClass("active");
				
			***REMOVED***

		***REMOVED***,

		ui: function() ***REMOVED***

			var _this = $(this),
				index = _this.index(),
				nav = _this.parent(),
				tabs = _this.closest(".ui"),
				items = tabs.find(".ui-item");

			if (!_this.hasClass("active")) ***REMOVED***

				items
					.eq(index)
					.add(_this)
					.addClass("active")
					.siblings()
					.removeClass("active");

				nav
					.trigger("detach.ScrollToFixed")
					.scrollToFixed(***REMOVED***
						marginTop: $(".header-fixed").outerHeight() + 20,
						zIndex: 2,
						limit: $(".footer").offset().top - nav.outerHeight() - 40,
						preAbsolute: function() ***REMOVED*** $(this).css(***REMOVED***"opacity": 0, "visability": "hidden"***REMOVED***); ***REMOVED***,
						postUnfixed: function() ***REMOVED*** $(this).css(***REMOVED***"opacity": 1, "visability": "visible"***REMOVED***); ***REMOVED***,
						postAbsolute: function() ***REMOVED*** $(this).css(***REMOVED***"opacity": 1, "visability": "visible"***REMOVED***); ***REMOVED***,
					***REMOVED***);

				if ($(document).scrollTop() > 0) ***REMOVED***
					$("html, body").animate(***REMOVED*** scrollTop: 0 ***REMOVED***, 500);
				***REMOVED***
			
			***REMOVED***

		***REMOVED***,

		//=== Tab ===\\
		tab: function() ***REMOVED***

			var _this = $(this),
				index = _this.index(),
				list = _this.parent(),
				tabs = _this.closest(".tabs"),
				items = tabs.find(".tabs-item");

			if (!_this.hasClass("active")) ***REMOVED***

				items
					.eq(index)
					.add(_this)
					.addClass("active")
					.siblings()
					.removeClass("active");
			
			***REMOVED***

		***REMOVED***,

		//=== Accordion ===\\
		accordion: function(e) ***REMOVED***

			e.originalEvent.preventDefault();

			var _this = $(this),
				item = _this.closest(".accordion-item"),
				container = _this.closest(".accordion"),
				items = container.find(".accordion-item"),
				content = item.find(".accordion-content"),
				otherContents = container.find(".accordion-content"),
				duration = 300;

			if (!item.hasClass("active")) ***REMOVED***
				items.removeClass("active");
				item.addClass("active");
				otherContents.stop(true, true).slideUp(duration);
				content.stop(true, true).slideDown(duration);
			***REMOVED*** else ***REMOVED***
				content.stop(true, true).slideUp(duration);
				item.removeClass("active");
			***REMOVED***

		***REMOVED***,

		//=== Header search ===\\
		headerSearchOpen: function() ***REMOVED***

			$(this).closest(".header-search").addClass("open");

		***REMOVED***,
		headerSearchClose: function() ***REMOVED***

			$(this).closest(".header-search").removeClass("open");

		***REMOVED***,
		headerSearchCloseNotEl: function(e) ***REMOVED***

			if($(".header-search").hasClass("open")) ***REMOVED***
				if ($(e.originalEvent.target).closest(".header-search").length) return;
				$(".header-search").removeClass("open");
				e.originalEvent.stopPropagation();
			***REMOVED***

		***REMOVED***,
		
		//=== Header lang ===\\
		headerLangOpen: function() ***REMOVED***

			$(this).parent().toggleClass("open");

		***REMOVED***,
		headerLangSelect: function() ***REMOVED***

			var _this = $(this),
				lang = _this.attr("data-lang"),
				container = _this.closest(".header-lang"),
				current = container.find(".header-lang-current");
		
			container.removeClass("open");
			current.children().text(lang);
			current.attr("data-title", lang);

		***REMOVED***,
		headerLangCloseNotEl: function(e) ***REMOVED***
			
			if($(".header-lang").hasClass("open")) ***REMOVED***
				if ($(e.originalEvent.target).closest(".header-lang").length) return;
				$(".header-lang").removeClass("open");
				e.originalEvent.stopPropagation();
			***REMOVED***

		***REMOVED***,

		//=== Mobile/tablet main menu ===\\
		MainMenuToggle: function() ***REMOVED***

			var _this = $(this),
				_body = $("body"),
				headerH = _this.closest(".header").outerHeight(),
				mnu = $(".mob-main-mnu"),
				offsetTop = $(".header-fixed").offset().top;
				
			mnu.css("padding-top", headerH);
			$(this).toggleClass("active");

			_body.toggleClass("mob-main-mnu-open").scrollTop(offsetTop);
				
			if(_body.hasClass("mob-main-mnu-open")) ***REMOVED***
				$(".mf-bg").addClass("visible mm");
			***REMOVED*** else ***REMOVED***
				$(".mf-bg").removeClass("visible mm");
			***REMOVED***

		***REMOVED***,
		MainMenuSubmenuToggle: function() ***REMOVED***

			var _this = $(this),
				item = _this.parent(),
				content = item.find(".mob-main-submnu");

			item.toggleClass("open");
			content.slideToggle();

		***REMOVED***,
		MainMenuCloseNotEl: function(e) ***REMOVED***

			if($("body").hasClass("mob-main-mnu-open")) ***REMOVED***
				if ($(e.originalEvent.target).closest(".mob-main-mnu, .main-mnu-btn").length) return;
				$("body").removeClass("mob-main-mnu-open");
				$(".main-mnu-btn").removeClass("active");
				$(".mf-bg").removeClass("visible mm");
				e.originalEvent.stopPropagation();
			***REMOVED***

		***REMOVED***,

		//=== Header mobile/tablet navbar ===\\
		headerNavbarToggle: function() ***REMOVED***

			$(this).parent().toggleClass("open");

		***REMOVED***,
		headerNavbarNotEl: function(e) ***REMOVED***

			if ($(e.originalEvent.target).closest(".header-navbar").length) return;
			$(".header-navbar").removeClass("open");
			e.originalEvent.stopPropagation();

		***REMOVED***,

		//=== Side toggle ===\\
		sideOpen: function(e) ***REMOVED***

			e.originalEvent.preventDefault();

			var side = $($(this).attr("data-side"));

			if(side.length) ***REMOVED***

				side.toggleClass("open");
				if(!e.currentTarget.classList.contains("panel-settings-btn")) ***REMOVED***
					$(".mf-bg").toggleClass("visible side-visible");
				***REMOVED***

			***REMOVED***

		***REMOVED***,
		sideClose: function() ***REMOVED***

			$(".side, .sidebar-filters").removeClass("open");
			$(".mf-bg").removeClass("visible side-visible");

		***REMOVED***,

		//=== Form input ===\\
		inputEach: function() ***REMOVED***

			var _this = $(this),
				val = _this.find(".form-field-input").val();

			if (val === "") ***REMOVED***
				_this.removeClass("focus");
			***REMOVED*** else ***REMOVED***
				_this.addClass("focus");
			***REMOVED***

		***REMOVED***,
		inputFocus: function() ***REMOVED***

			var _this = $(this),
				wrappInput = _this.parent();

			wrappInput.addClass("focus");

		***REMOVED***,
		inputKeyup: function() ***REMOVED***

			var _this = $(this),
				val = _this.val(),
				wrappInput = _this.parent();

			if (val === "" && !_this.is(":focus")) ***REMOVED***
				wrappInput.removeClass("focus");
			***REMOVED*** else ***REMOVED***
				wrappInput.addClass("focus");
			***REMOVED***

		***REMOVED***,
		inputBlur: function() ***REMOVED***

			var _this = $(this),
				val = _this.val(),
				wrappInput = _this.parent();

			if(val === "") ***REMOVED***
				wrappInput.removeClass("focus"); 
			***REMOVED***

		***REMOVED***,

		//=== Ripple effect for buttons ===\\
		btnRipple: function(e) ***REMOVED***
			
			var _this = $(this),
				offset = $(this).offset(),
				positionX = e.originalEvent.pageX - offset.left,
				positionY = e.originalEvent.pageY - offset.top;
			_this.append("<div class='ripple-effect'>");
			_this
				.find(".ripple-effect")
				.css(***REMOVED***
					left: positionX,
					top: positionY
				***REMOVED***)
				.animate(***REMOVED***
					opacity: 0
				***REMOVED***, 1500, function() ***REMOVED***
					$(this).remove();
				***REMOVED***);

		***REMOVED***,

		btnHover: function() ***REMOVED***

			var btns = document.querySelectorAll(".btn, .el-ripple"),
				btn = [];

			btns.forEach(function(element, index) ***REMOVED***

				var span = document.createElement("span"); 
				span.className = "el-ripple-circle";
				element.appendChild(span);

				// If The span element for this element does not exist in the array, add it.
				if (!btn[index])
				btn[index] = element.querySelector(".el-ripple-circle");

				element.addEventListener("mouseenter", function(e) ***REMOVED***	
					btnHandler(element, index, e);			
				***REMOVED***);

				element.addEventListener("mouseleave", function(e) ***REMOVED***
					btnHandler(element, index, e);
				***REMOVED***);
				
			***REMOVED***);

			const btnHandler = function(element, index, e) ***REMOVED***

				let offset = element.getBoundingClientRect(),
					left = e.pageX - offset.left - window.scrollX,
					top = e.pageY - offset.top - window.scrollY;

				btn[index].style.left = left + "px";
				btn[index].style.top = top + "px";

			***REMOVED***

		***REMOVED***,

		//=== Forming href for phone ===\\
		formingHrefTel: function() ***REMOVED***

			var linkAll = $('.formingHrefTel'),
				joinNumbToStringTel = 'tel:';

			$.each(linkAll, function () ***REMOVED***
				var _this = $(this),
					linkValue = _this.text(),
					arrayString = linkValue.split("");

				for (var i = 0; i < arrayString.length; i++) ***REMOVED***
					var thisNunb = app.isNumber(arrayString[i]);
					if (thisNunb === true || (arrayString[i] === "+" && i === 0)) ***REMOVED***
						joinNumbToStringTel += arrayString[i];
					***REMOVED***
				***REMOVED***

				_this.attr("href", function () ***REMOVED***
					return joinNumbToStringTel;
				***REMOVED***);
				joinNumbToStringTel = 'tel:'

			***REMOVED***);

		***REMOVED***,

		isNumber: function(n) ***REMOVED***

			return !isNaN(parseFloat(n)) && isFinite(n);

		***REMOVED***,

		//=== Sidebar category item ===\\
		sidebarCatItemToggle: function(e) ***REMOVED***

			e.originalEvent.preventDefault();

			var item = $(this).parent(),
				ul = item.find("> ul");

			item.toggleClass("open");
			ul.slideToggle();

		***REMOVED***,
		
		//=== Content table responsive ===\\
		contentTable: function() ***REMOVED***

			var contentTable = $(".content");
			if(contentTable.length) ***REMOVED***
				
				$.each(contentTable.find("table"), function() ***REMOVED***
					$(this).wrap("<div class='table-responsive-outer'></div>").wrap("<div class='table-responsive'></div>");
				***REMOVED***);
				
			***REMOVED***

		***REMOVED***,

		//=== Clock count down ===\\
		clockCountDown: function() ***REMOVED***

			if($("#countdown").length) ***REMOVED***
				this.clock("countdown", $("#countdown").attr("data-dedline"));
			***REMOVED***

		***REMOVED***,
		getTimeRemaining: function(endtime) ***REMOVED***

			var t = Date.parse(endtime) - Date.parse(new Date()),
				seconds = Math.floor((t / 1000) % 60),
				minutes = Math.floor((t / 1000 / 60) % 60),
				hours = Math.floor((t / (1000 * 60 * 60)) % 24),
				days = Math.floor(t / (1000 * 60 * 60 * 24));

			return ***REMOVED***
				total: t,
				days: days,
				hours: hours,
				minutes: minutes,
				seconds: seconds
			***REMOVED***;

		***REMOVED***,
		clock: function(id, endtime) ***REMOVED***

			var clock = document.getElementById(id),
				daysSpan = clock.querySelector(".days"),
				hoursSpan = clock.querySelector(".hours"),
				minutesSpan = clock.querySelector(".minutes"),
				secondsSpan = clock.querySelector(".seconds");

			function updateClock() ***REMOVED***
				var t = app.getTimeRemaining(endtime);

				if (t.total <= 0) ***REMOVED***
					document.getElementById("countdown").classList.add("hidden");
					document.getElementById("deadline-message").classList.add("visible");
					clearInterval(timeinterval);
					return true;
				***REMOVED***

				daysSpan.innerHTML = t.days;
				hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
				minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
				secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
			***REMOVED***

			updateClock();
			var timeinterval = setInterval(updateClock, 1000);

		***REMOVED***,

		//=== Custom alert ===\\
		customAlert: function(text, duration, alertInfo) ***REMOVED***

			var alerts = $(".alerts"),
				body = $("body"),
				alertClass = "",
				alertIco = "info";
			
			if (!alerts.length) ***REMOVED***
				body.append('<div class="alerts"></div>');
			***REMOVED***
			$(".alert").remove();

			if (alertInfo === "success") ***REMOVED***
				alertClass = "alert-success";
				alertIco = "check";
			***REMOVED*** else if (alertInfo === "danger") ***REMOVED***
				alertClass = "alert-danger";
				alertIco = "error";
			***REMOVED*** else if (alertInfo === "warning") ***REMOVED***
				alertClass = "alert-warning";
				alertIco = "warning";
			***REMOVED*** else if (alertInfo == "default") ***REMOVED***
				alertClass = "alert-default";
				alertIco = "info";
			***REMOVED***

			if (!$("." + alertClass + "").length) ***REMOVED***
				$(".alerts").append(
				'<div class="alert ' +
					alertClass +
					'" data-duration-hide="' +
					duration +
					'"> <div class="alert-ico"> <i class="material-icons md-22">' +
					alertIco +
					'</i> </div> <div class="alert-text">' +
					text +
					"</div> </div>"
				);

				setTimeout(function() ***REMOVED***
					$("." + alertClass + "").remove();
				***REMOVED***, duration);
			***REMOVED***

			$(document).on("click", ".alert-close", function() ***REMOVED***
				$(this)
				.closest(".alert")
				.remove();
			***REMOVED***);

		***REMOVED***,

		//=== Plugins ===\\

		lazyLoading: function() ***REMOVED***

			var observer = lozad('.lazy');
			observer.observe();

		***REMOVED***,

		autoSizeTextarea: function() ***REMOVED***

			autosize(document.querySelectorAll('textarea'));

		***REMOVED***,

		device: function() ***REMOVED***

			if( (device.mobile() || device.tablet()) && device.ios() ) ***REMOVED***
				var tempCSS = $('a').css('-webkit-tap-highlight-color');
				$('main, .main-inner').css('cursor', 'pointer')
						 .css('-webkit-tap-highlight-color', 'rgba(0, 0, 0, 0)');
				$('a').css('-webkit-tap-highlight-color', tempCSS);
			***REMOVED***

		***REMOVED***,

		popUp: function() ***REMOVED***

			$('.open_popup').popup(***REMOVED***
				transition: 'all 0.4s',
				color: '#000000',
				opacity: 0.8
			***REMOVED***);
			$('.popup_autoopen').popup(***REMOVED***
				transition: 'all 0.4s',
				color: '#000000',
				autoopen: true,
				opacity: 0.8
			***REMOVED***);

		***REMOVED***,

		lightGallery: function() ***REMOVED***

			$(".gallery-container").lightGallery(***REMOVED***
				selector: '.gallery-item'
			***REMOVED***);

		***REMOVED***,

		scrollToFixed: function() ***REMOVED***

			if($('.header-fixed').length) ***REMOVED***

				$('.header-fixed').scrollToFixed(***REMOVED***
					preFixed: function() ***REMOVED*** $(this).addClass("fixed"); ***REMOVED***,
					postFixed: function() ***REMOVED*** $(this).removeClass("fixed"); ***REMOVED***
				***REMOVED***);
	
				$('#ui-nav').scrollToFixed(***REMOVED***
					marginTop: $('.header-fixed').outerHeight() + 20,
					zIndex: 2,
					limit: $('.footer').offset().top - $('#ui-nav').outerHeight() - 40,
					preAbsolute: function() ***REMOVED*** $(this).css(***REMOVED***"opacity": 0, "visability": "hidden"***REMOVED***); ***REMOVED***,
					postUnfixed: function() ***REMOVED*** $(this).css(***REMOVED***"opacity": 1, "visability": "visible"***REMOVED***); ***REMOVED***,
					postAbsolute: function() ***REMOVED*** $(this).css(***REMOVED***"opacity": 1, "visability": "visible"***REMOVED***); ***REMOVED***,
				***REMOVED***);

			***REMOVED***
			
		***REMOVED***,

		carusels: function() ***REMOVED***
			
			var reviewsCaruselTh = $('.reviews-carusel-th');
			reviewsCaruselTh.flickity(***REMOVED***
				imagesLoaded: true,
				lazyLoad: true,
				pageDots: false,
				adaptiveHeight: true,
				fade: true,
				prevNextButtons: false
			***REMOVED***);

			$('.reviews-thumb-item').on('click', function() ***REMOVED***
				var _this = $(this),
					index = _this.index();
				reviewsCaruselTh.flickity( 'select', index );
				_this.addClass("active").siblings().removeClass("active");
			***REMOVED***);


			$('.project-carusel-main').flickity(***REMOVED***
				pageDots: false,
				imagesLoaded: true,
				lazyLoad: 1,
				prevNextButtons: true
			***REMOVED***);
			$('.project-carusel-thumb').flickity(***REMOVED***
				asNavFor: '.project-carusel-main',
				imagesLoaded: true,
				lazyLoad: 5,
				prevNextButtons: true,
				contain: true,
				pageDots: false
			***REMOVED***);

		***REMOVED***,

		forms: function() ***REMOVED***

			var ajaxurl = "/mail.php";

			$.validator.addMethod("customemail", function (value, element) ***REMOVED***
				return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
			***REMOVED***,
				"The email is not a valid email."
			);
			
			$(".сallback_popup_form").validate(***REMOVED***
				rules: ***REMOVED***
					NameCallBack: ***REMOVED***
					required: true,
					minlength: 2
					***REMOVED***,
					PhoneCallBack: ***REMOVED***
					required: true
					***REMOVED***
				***REMOVED***,
				messages: ***REMOVED***
					NameCallBack: ***REMOVED***
					required: "The name field is required.",
					***REMOVED***,
					PhoneCallBack: ***REMOVED***
					required: "The phone field is required.",
					***REMOVED***
				***REMOVED***,
				submitHandler: function(form) ***REMOVED***
					var th = $(form),
						popup = th.closest(".popup_style"),
						close = popup.find(".popup_close");
					close.click();

					$.ajax(***REMOVED***
						type: "POST",
						url: ajaxurl,
						data: th.serialize()
					***REMOVED***).done(function() ***REMOVED***

						//customAlert(text, duration, alertInfo) info = "success" || "danger" || "warning" || "default"
						app.customAlert("Successfully sent!", 4000, "success");

						setTimeout(function() ***REMOVED***
							th.trigger("reset");
							$(".form-field").removeClass("focus");
						***REMOVED***, 1000);
					***REMOVED***);

				***REMOVED***
			***REMOVED***);
			

			$(".contact-form").validate(***REMOVED***
				rules: ***REMOVED***
					ContactName: ***REMOVED***
					required: true,
					minlength: 2
					***REMOVED***,
					ContactPhone: ***REMOVED***
					required: true
					***REMOVED***,
					ContactEmail: ***REMOVED***
						required: true,
						email: true,
						customemail: true
					***REMOVED***,
				***REMOVED***,
				messages: ***REMOVED***
					ContactName: ***REMOVED***
					required: "The name field is required.",
					***REMOVED***,
					ContactPhone: ***REMOVED***
					required: "The phone field is required.",
					***REMOVED***,
					ContactEmail: ***REMOVED***
						required: "The email field is required.",
						email: "The email field is required.",
						customemail: "The email is not a valid email."
					***REMOVED***,
				***REMOVED***,
				submitHandler: function(form) ***REMOVED***
					var th = $(form);

					$.ajax(***REMOVED***
						type: "POST",
						url: ajaxurl,
						data: th.serialize()
					***REMOVED***).done(function() ***REMOVED***

						//customAlert(text, duration, alertInfo) info = "success" || "danger" || "warning" || "default"
						app.customAlert("Successfully sent!", 4000, "success");

						setTimeout(function() ***REMOVED***
							th.trigger("reset");
							$(".form-field").removeClass("focus");
						***REMOVED***, 1000);
					***REMOVED***);

				***REMOVED***
			***REMOVED***);
			
			$(".footer-subscribe").validate(***REMOVED***
				rules: ***REMOVED***
					ContactEmail: ***REMOVED***
						required: true,
						email: true,
						customemail: true
					***REMOVED***,
				***REMOVED***,
				messages: ***REMOVED***
					ContactEmail: ***REMOVED***
						required: "The email field is required.",
						email: "The email field is required.",
						customemail: "The email is not a valid email."
					***REMOVED***,
				***REMOVED***,
				submitHandler: function(form) ***REMOVED***
					var th = $(form);
			
					//customAlert(text, duration, alertInfo) info = "success" || "danger" || "warning" || "default"
					app.customAlert("Successfully sent!", 4000, "success");
			
					setTimeout(function() ***REMOVED***
						th.trigger("reset");
						$(".form-field").removeClass("focus");
					***REMOVED***, 1000);
		
				***REMOVED***
			***REMOVED***);

			$(".login-form").validate(***REMOVED***
				rules: ***REMOVED***
					LoginName: ***REMOVED***
						required: true
					***REMOVED***,
					loginPassword: ***REMOVED***
						required: true,
						minlength : 6
					***REMOVED***
				***REMOVED***,
				messages: ***REMOVED***
					LoginName: ***REMOVED***
						required: "The login field is required.",
					***REMOVED***,
					loginPassword: ***REMOVED***
						required: "The password field is required.",
					***REMOVED***
				***REMOVED***,
				submitHandler: function(form) ***REMOVED***
					var th = $(form);
			
					//customAlert(text, duration, alertInfo) info = "success" || "danger" || "warning" || "default"
					app.customAlert("Successfully sent!", 4000, "success");
			
					setTimeout(function() ***REMOVED***
						th.trigger("reset");
						$(".form-field").removeClass("focus");
					***REMOVED***, 1000);
		
				***REMOVED***
			***REMOVED***);

			$(".order-form").validate(***REMOVED***
				rules: ***REMOVED***
					orderName: ***REMOVED***
					required: true,
					minlength: 2
					***REMOVED***,
					orderPhone: ***REMOVED***
					required: true
					***REMOVED***
				***REMOVED***,
				messages: ***REMOVED***
					orderName: ***REMOVED***
					required: "The name field is required.",
					***REMOVED***,
					orderPhone: ***REMOVED***
					required: "The phone field is required.",
					***REMOVED***
				***REMOVED***,
				submitHandler: function(form) ***REMOVED***
					var th = $(form);

					$.ajax(***REMOVED***
						type: "POST",
						url: ajaxurl,
						data: th.serialize()
					***REMOVED***).done(function() ***REMOVED***
						
						//customAlert(text, duration, alertInfo) info = "success" || "danger" || "warning" || "default"
						app.customAlert("Successfully sent!", 4000, "success");

						setTimeout(function() ***REMOVED***
							th.trigger("reset");
							$(".form-field").removeClass("focus");
						***REMOVED***, 1000);
					***REMOVED***);

				***REMOVED***
			***REMOVED***);

			$(".subscribe-bg-form").validate(***REMOVED***
				rules: ***REMOVED***
					subscribeBgEmail: ***REMOVED***
						required: true,
						email: true,
						customemail: true
					***REMOVED***
				***REMOVED***,
				messages: ***REMOVED***
					subscribeBgEmail: ***REMOVED***
						required: "The email field is required.",
						email: "The email field is required.",
						customemail: "The email is not a valid email."
					***REMOVED***
				***REMOVED***,
				submitHandler: function(form) ***REMOVED***
					var th = $(form);

					//customAlert(text, duration, alertInfo) info = "success" || "danger" || "warning" || "default"
					app.customAlert("Successfully sent!", 4000, "success");

					setTimeout(function() ***REMOVED***
						th.trigger("reset");
						$(".form-field").removeClass("focus");
					***REMOVED***, 1000);
				***REMOVED***
			***REMOVED***);

			$(".mailchimp-form").validate(***REMOVED***
				rules: ***REMOVED***
					mailchimpEmail: ***REMOVED***
						required: true,
						email: true,
						customemail: true
					***REMOVED***
				***REMOVED***,
				messages: ***REMOVED***
					mailchimpEmail: ***REMOVED***
						required: "The email field is required.",
						email: "The email field is required.",
						customemail: "The email is not a valid email."
					***REMOVED***
				***REMOVED***,
				submitHandler: function(form) ***REMOVED***
					var th = $(form);

					//customAlert(text, duration, alertInfo) info = "success" || "danger" || "warning" || "default"
					app.customAlert("Successfully sent!", 4000, "success");

					setTimeout(function() ***REMOVED***
						th.trigger("reset");
						$(".form-field").removeClass("focus");
					***REMOVED***, 1000);
				***REMOVED***
			***REMOVED***);

			$(".cm-form").validate(***REMOVED***
				rules: ***REMOVED***
					cmEmail: ***REMOVED***
						required: true,
						email: true,
						customemail: true
					***REMOVED***
				***REMOVED***,
				messages: ***REMOVED***
					cmEmail: ***REMOVED***
						required: "The email field is required.",
						email: "The email field is required.",
						customemail: "The email is not a valid email."
					***REMOVED***
				***REMOVED***,
				submitHandler: function(form) ***REMOVED***
					var th = $(form);

					//customAlert(text, duration, alertInfo) info = "success" || "danger" || "warning" || "default"
					app.customAlert("Successfully sent!", 4000, "success");

					setTimeout(function() ***REMOVED***
						th.trigger("reset");
						$(".form-field").removeClass("focus");
					***REMOVED***, 1000);
				***REMOVED***
			***REMOVED***);

			$(".comming-soon-form").validate(***REMOVED***
				rules: ***REMOVED***
					commingSoonEmail: ***REMOVED***
						required: true,
						email: true,
						customemail: true
					***REMOVED***
				***REMOVED***,
				messages: ***REMOVED***
					commingSoonEmail: ***REMOVED***
						required: "The email field is required.",
						email: "The email field is required.",
						customemail: "The email is not a valid email."
					***REMOVED***
				***REMOVED***,
				submitHandler: function(form) ***REMOVED***
					var th = $(form);

					//customAlert(text, duration, alertInfo) info = "success" || "danger" || "warning" || "default"
					app.customAlert("Successfully sent!", 4000, "success");

					setTimeout(function() ***REMOVED***
						th.trigger("reset");
						$(".form-field").removeClass("focus");
					***REMOVED***, 1000);
				***REMOVED***
			***REMOVED***);

			$(".comments-form").validate(***REMOVED***
				rules: ***REMOVED***
					CommentsName: ***REMOVED***
						required: true,
						minlength: 2
					***REMOVED***,
					CommentsEmail: ***REMOVED***
						required: true,
						email: true,
						customemail: true
					***REMOVED***,
					CommentsMessage: ***REMOVED***
						required: true,
						minlength: 15
					***REMOVED***,
				***REMOVED***,
				messages: ***REMOVED***
					CommentsName: ***REMOVED***
						required: "The name field is required."
					***REMOVED***,
					CommentsEmail: ***REMOVED***
						required: "The email field is required.",
						email: "The email field is required.",
						customemail: "The email is not a valid email."
					***REMOVED***,
					CommentsMessage: ***REMOVED***
						required: "The message field is required."
					***REMOVED***
				***REMOVED***,
				submitHandler: function(form) ***REMOVED***
					var th = $(form);

					//customAlert(text, duration, alertInfo) info = "success" || "danger" || "warning" || "default"
					app.customAlert("Successfully sent!", 4000, "success");

					setTimeout(function() ***REMOVED***
						th.trigger("reset");
						$(".form-field").removeClass("focus");
					***REMOVED***, 1000);
				***REMOVED***
			***REMOVED***);

			$(".subscribe-news-form").validate(***REMOVED***
				rules: ***REMOVED***
					CommentsEmail: ***REMOVED***
						required: true,
						email: true,
						customemail: true
					***REMOVED***
				***REMOVED***,
				messages: ***REMOVED***
					CommentsEmail: ***REMOVED***
						required: "The email field is required.",
						email: "The email field is required.",
						customemail: "The email is not a valid email."
					***REMOVED***
				***REMOVED***,
				submitHandler: function(form) ***REMOVED***
					var th = $(form);

					//customAlert(text, duration, alertInfo) info = "success" || "danger" || "warning" || "default"
					app.customAlert("Successfully sent!", 4000, "success");

					setTimeout(function() ***REMOVED***
						th.trigger("reset");
						$(".form-field").removeClass("focus");
					***REMOVED***, 1000);
				***REMOVED***
			***REMOVED***);

		***REMOVED***,

		isotopeProjects: function() ***REMOVED***

			var container = $("#projects-container");

			container.isotope(***REMOVED***
				itemSelector: '.project-col'
			***REMOVED***);

			$('.project-nav-list li').on('click', function() ***REMOVED***
				var _this = $(this),
					selector = _this.data('filter');
				
				_this.addClass("active").siblings().removeClass("active");
				container.isotope(***REMOVED***
					filter: selector
				***REMOVED***);
			***REMOVED***);

		***REMOVED***,

		isotopeGallery: function() ***REMOVED***

			var container = $("#gallery-container");

			container.isotope(***REMOVED***
				itemSelector: '.gallery-col'
			***REMOVED***);

			$('.gallery-nav-list li').on('click', function() ***REMOVED***
				var _this = $(this),
					selector = _this.data('filter');
				
				_this.addClass("active").siblings().removeClass("active");
				container.isotope(***REMOVED***
					filter: selector,
				***REMOVED***);
			***REMOVED***);

		***REMOVED***,

		isotopeGalleryMasonry: function() ***REMOVED***

			var container = $("#gallery-masonry-container");

			container.isotope(***REMOVED***
				itemSelector: '.gallery-col',
				percentPosition: true,
				masonry: ***REMOVED***
					columnWidth: '.gallery-col-sizer'
				***REMOVED***
			***REMOVED***);

			$('.gallery-masonry-nav-list li').on('click', function() ***REMOVED***
				var _this = $(this),
					selector = _this.data('filter');
				
				_this.addClass("active").siblings().removeClass("active");
				container.isotope(***REMOVED***
					filter: selector,
				***REMOVED***);
			***REMOVED***);

		***REMOVED***,

		spincrement: function() ***REMOVED***

			var show = true;
			var countbox = ".spincrement-container";

			if($(countbox).length) ***REMOVED***
			
				$(window).on("scroll load resize", function () ***REMOVED***
					if (!show) return false;
					var w_top = $(window).scrollTop();
					var e_top = $(countbox).offset().top;
					var w_height = $(window).height();
					var d_height = $(document).height();
					var e_height = $(countbox).outerHeight();
					if (w_top + 500 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height) ***REMOVED***
						$('.spincrement').spincrement(***REMOVED***
							duration: 1500,
							leeway: 10
						***REMOVED***);
					show = false;
					***REMOVED***
				***REMOVED***);
			***REMOVED***

		***REMOVED***,

		//=== detect IE ===\\
		detectIE: function() ***REMOVED***

			if(this.detectIECheck()) ***REMOVED***
				var body = document.querySelector("body"),
					msg = 'Unfortunately, the browser Internet Explorer you use is outdated and cannot display the site normally. <br> Please open the site in another browser';
				body.classList.add("overflow-hidden");
				body.innerHTML = '<div class="ie-browser"><div class="ie-browser-tr"><div class="ie-browser-td">'+ msg +'</div></div></div>';
			***REMOVED***

		***REMOVED***,
		detectIECheck: function() ***REMOVED***

			var ua = window.navigator.userAgent;
			  
			var msie = ua.indexOf('MSIE ');
			if (msie > 0) ***REMOVED***
				// IE 10 or older => return version number
				return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
			***REMOVED***
			  
			var trident = ua.indexOf('Trident/');
			if (trident > 0) ***REMOVED***
				// IE 11 => return version number
				var rv = ua.indexOf('rv:');
				return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
			***REMOVED***
			  
			// other browser
			return false;

		***REMOVED***
		
	***REMOVED***
 
	app.init();
 
***REMOVED***());

function initMap() ***REMOVED***
    var geocoder, map,
        mapInfo = $('#map_address'),
        markerUrl = mapInfo.data("marker"),
        address = mapInfo.val();
    function initialize() ***REMOVED***
        geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(-34.397, 150.644);
        var myOptions = ***REMOVED***
            zoom: 15,
            center: latlng,
            mapTypeControl: true,
            mapTypeControlOptions: ***REMOVED***
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
          ***REMOVED***
            styles: [ ***REMOVED*** "featureType": "water", "elementType": "geometry", "stylers": [ ***REMOVED*** "color": "#e9e9e9" ***REMOVED***, ***REMOVED*** "lightness": 17 ***REMOVED*** ] ***REMOVED***, ***REMOVED*** "featureType": "landscape", "elementType": "geometry", "stylers": [ ***REMOVED*** "color": "#f5f5f5" ***REMOVED***, ***REMOVED*** "lightness": 20 ***REMOVED*** ] ***REMOVED***, ***REMOVED*** "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [ ***REMOVED*** "color": "#ffffff" ***REMOVED***, ***REMOVED*** "lightness": 17 ***REMOVED*** ] ***REMOVED***, ***REMOVED*** "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [ ***REMOVED*** "color": "#ffffff" ***REMOVED***, ***REMOVED*** "lightness": 29 ***REMOVED***, ***REMOVED*** "weight": 0.2 ***REMOVED*** ] ***REMOVED***, ***REMOVED*** "featureType": "road.arterial", "elementType": "geometry", "stylers": [ ***REMOVED*** "color": "#ffffff" ***REMOVED***, ***REMOVED*** "lightness": 18 ***REMOVED*** ] ***REMOVED***, ***REMOVED*** "featureType": "road.local", "elementType": "geometry", "stylers": [ ***REMOVED*** "color": "#ffffff" ***REMOVED***, ***REMOVED*** "lightness": 16 ***REMOVED*** ] ***REMOVED***, ***REMOVED*** "featureType": "poi", "elementType": "geometry", "stylers": [ ***REMOVED*** "color": "#f5f5f5" ***REMOVED***, ***REMOVED*** "lightness": 21 ***REMOVED*** ] ***REMOVED***, ***REMOVED*** "featureType": "poi.park", "elementType": "geometry", "stylers": [ ***REMOVED*** "color": "#dedede" ***REMOVED***, ***REMOVED*** "lightness": 21 ***REMOVED*** ] ***REMOVED***, ***REMOVED*** "elementType": "labels.text.stroke", "stylers": [ ***REMOVED*** "visibility": "on" ***REMOVED***, ***REMOVED*** "color": "#ffffff" ***REMOVED***, ***REMOVED*** "lightness": 16 ***REMOVED*** ] ***REMOVED***, ***REMOVED*** "elementType": "labels.text.fill", "stylers": [ ***REMOVED*** "saturation": 36 ***REMOVED***, ***REMOVED*** "color": "#333333" ***REMOVED***, ***REMOVED*** "lightness": 40 ***REMOVED*** ] ***REMOVED***, ***REMOVED*** "elementType": "labels.icon", "stylers": [ ***REMOVED*** "visibility": "off" ***REMOVED*** ] ***REMOVED***, ***REMOVED*** "featureType": "transit", "elementType": "geometry", "stylers": [ ***REMOVED*** "color": "#f2f2f2" ***REMOVED***, ***REMOVED*** "lightness": 19 ***REMOVED*** ] ***REMOVED***, ***REMOVED*** "featureType": "administrative", "elementType": "geometry.fill", "stylers": [ ***REMOVED*** "color": "#fefefe" ***REMOVED***, ***REMOVED*** "lightness": 20 ***REMOVED*** ] ***REMOVED***, ***REMOVED*** "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [ ***REMOVED*** "color": "#fefefe" ***REMOVED***, ***REMOVED*** "lightness": 17 ***REMOVED***, ***REMOVED*** "weight": 1.2 ***REMOVED*** ] ***REMOVED*** ],
            navigationControl: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP
    ***REMOVED***;
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        if (geocoder) ***REMOVED***
            geocoder.geocode(***REMOVED***
                'address': address
          ***REMOVED*** function(results, status) ***REMOVED***
                if (status == google.maps.GeocoderStatus.OK) ***REMOVED***
                    if (status != google.maps.GeocoderStatus.ZERO_RESULTS) ***REMOVED***
                        map.setCenter(results[0].geometry.location);

                        var infowindow = new google.maps.InfoWindow(***REMOVED***
                            content: '<b>' + address + '</b>',
                            size: new google.maps.Size(150, 50)
                    ***REMOVED***);

                        var marker = new google.maps.Marker(***REMOVED***
                            position: results[0].geometry.location,
                            map: map,
                            title: address,
                            icon: ***REMOVED***
                              url: markerUrl,
                              scaledSize: new google.maps.Size(47, 71)
                        ***REMOVED***
                    ***REMOVED***);
                        google.maps.event.addListener(marker, 'click', function() ***REMOVED***
                            infowindow.open(map, marker);
                    ***REMOVED***);

                ***REMOVED*** else ***REMOVED***
                        console.log("+++");
                ***REMOVED***
            ***REMOVED*** else ***REMOVED***
                  console.log("Status: " + status);
                    
            ***REMOVED***
        ***REMOVED***);
    ***REMOVED***
***REMOVED***
    google.maps.event.addDomListener(window, 'load', initialize);
***REMOVED***