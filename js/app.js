"use strict";

function email_test(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = {
	Android: function Android() {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function BlackBerry() {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function iOS() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function Opera() {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function Windows() {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function any() {
		return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
	}
};

function isIE() {
	ua = navigator.userAgent;
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
	return is_ie;
}

if (isIE()) {
	document.querySelector('body').classList.add('ie');
}

if (isMobile.any()) {
	document.querySelector('body').classList.add('touch');
}

function testWebP(callback) {
	var webP = new Image();

	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};

	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('webp');
	}
});

function ibg() {
	if (isIE()) {
		var _ibg = document.querySelectorAll("._ibg");

		for (var i = 0; i < _ibg.length; i++) {
			if (_ibg[i].querySelector('img') && _ibg[i].querySelector('img').getAttribute('src') != null) {
				_ibg[i].style.backgroundImage = 'url(' + _ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
	}
}

ibg();

if (document.querySelector('.wrapper')) {
	document.querySelector('.wrapper').classList.add('_loaded');
} //=================
//ActionsOnHash


if (location.hash) {
	var hsh = location.hash.replace('#', '');

	if (document.querySelector('.popup_' + hsh)) {
		popup_open(hsh);
	} else if (document.querySelector('div.' + hsh)) {
		_goto(document.querySelector('.' + hsh), 500, '');
	}
} //=================
//Menu


var iconMenu = document.querySelector(".icon-menu");

if (iconMenu != null) {
	var delay = 500;
	var body = document.querySelector("body");
	var menuBody = document.querySelector(".menu__body");
	iconMenu.addEventListener("click", function (e) {
		if (!body.classList.contains('_wait')) {
			body_lock(delay);
			iconMenu.classList.toggle("_active");
			menuBody.classList.toggle("_active");
		}
	});
}

;

function menu_close() {
	var iconMenu = document.querySelector(".icon-menu");
	var menuBody = document.querySelector(".menu__body");
	iconMenu.classList.remove("_active");
	menuBody.classList.remove("_active");
} //=================
//BodyLock


function body_lock(delay) {
	var body = document.querySelector("body");

	if (body.classList.contains('_lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}

function body_lock_remove(delay) {
	var body = document.querySelector("body");

	if (!body.classList.contains('_wait')) {
		var lock_padding = document.querySelectorAll("._lp");
		setTimeout(function () {
			for (var index = 0; index < lock_padding.length; index++) {
				var el = lock_padding[index];
				el.style.paddingRight = '0px';
			}

			body.style.paddingRight = '0px';
			body.classList.remove("_lock");
		}, delay);
		body.classList.add("_wait");
		setTimeout(function () {
			body.classList.remove("_wait");
		}, delay);
	}
}

function body_lock_add(delay) {
	var body = document.querySelector("body");

	if (!body.classList.contains('_wait')) {
		var lock_padding = document.querySelectorAll("._lp");

		for (var index = 0; index < lock_padding.length; index++) {
			var el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}

		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("_lock");
		body.classList.add("_wait");
		setTimeout(function () {
			body.classList.remove("_wait");
		}, delay);
	}
} //=================


// Dynamic Adapt v.1
// HTML data-move="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-move="item,2,992"
// Andrikanych Yevhen 2020
var move_array = [];
var move_objects = document.querySelectorAll("[data-move]");

if (move_objects.length > 0) {
	for (var _index10 = 0; _index10 < move_objects.length; _index10++) {
		var _el6 = move_objects[_index10];

		var data_move = _el6.getAttribute("data-move");

		if (data_move != "" || data_move != null) {
			_el6.setAttribute("data-move-index", _index10);

			move_array[_index10] = {
				parent: _el6.parentNode,
				index: index_in_parent(_el6)
			};
		}
	}
}

function dynamic_adapt() {
	var w = document.querySelector("body").offsetWidth;

	if (move_objects.length > 0) {
		for (var _index11 = 0; _index11 < move_objects.length; _index11++) {
			var _el7 = move_objects[_index11];

			var _data_move = _el7.getAttribute("data-move");

			if (_data_move != "" || _data_move != null) {
				var data_array = _data_move.split(",");

				var data_parent = document.querySelector("." + data_array[0]);
				var data_index = data_array[1];
				var data_bp = data_array[2];

				if (w < data_bp) {
					if (!_el7.classList.contains("js-move_done_" + data_bp)) {
						if (data_index > 0) {
							//insertAfter
							var actual_index = index_of_elements(data_parent)[data_index];
							data_parent.insertBefore(_el7, data_parent.childNodes[actual_index]);
						} else {
							data_parent.insertBefore(_el7, data_parent.firstChild);
						}

						_el7.classList.add("js-move_done_" + data_bp);
					}
				} else {
					if (_el7.classList.contains("js-move_done_" + data_bp)) {
						dynamic_adaptive_back(_el7);

						_el7.classList.remove("js-move_done_" + data_bp);
					}
				}
			}
		}
	}

	custom_adapt(w);
}

function dynamic_adaptive_back(el) {
	var index_original = el.getAttribute("data-move-index");
	var move_place = move_array[index_original];
	var parent_place = move_place["parent"];
	var index_place = move_place["index"];

	if (index_place > 0) {
		//insertAfter
		var actual_index = index_of_elements(parent_place)[index_place];
		parent_place.insertBefore(el, parent_place.childNodes[actual_index]);
	} else {
		parent_place.insertBefore(el, parent_place.firstChild);
	}
}

function index_in_parent(node) {
	var children = node.parentNode.childNodes;
	var num = 0;

	for (var _i2 = 0; _i2 < children.length; _i2++) {
		if (children[_i2] == node) return num;
		if (children[_i2].nodeType == 1) num++;
	}

	return -1;
}

function index_of_elements(parent) {
	var children = [];

	for (var _i3 = 0; _i3 < parent.childNodes.length; _i3++) {
		if (parent.childNodes[_i3].nodeType == 1 && parent.childNodes[_i3].getAttribute("data-move") == null) {
			children.push(_i3);
		}
	}

	return children;
}

window.addEventListener("resize", function (event) {
	dynamic_adapt();
});
dynamic_adapt();

function custom_adapt(w) { }

var btn = document.querySelectorAll('button[type="submit"],input[type="submit"]');

if (btn) {
	for (var _index12 = 0; _index12 < btn.length; _index12++) {
		var _el8 = btn[_index12];

		_el8.addEventListener('click', form_submit);
	}
}

function form_submit() {
	var error = 0;
	var btn = event.target;
	var form = btn.closest('form');
	var form_req = form.querySelectorAll('._req');

	if (form_req) {
		for (var _index13 = 0; _index13 < form_req.length; _index13++) {
			var _el9 = form_req[_index13];
			error += form_validate(_el9);
		}
	}

	if (error == 0) {
		//SendForm
		form_clean(form);
		popup_close(); //popup_open('message');
		//event.preventDefault();
	} else {
		var form_error = form.querySelectorAll('._error');

		if (form_error && form.classList.contains('_goto-error')) {
			_goto(form_error[0], 1000, 50);
		}

		event.preventDefault();
	}
}

function form_validate(input) {
	var error = 0;
	var input_g_value = input.getAttribute('data-value');

	if (input.getAttribute("name") == "email" || input.classList.contains("_email")) {
		if (input.value != input_g_value) {
			var em = input.value.replace(" ", "");
			input.value = em;
		}

		if (email_test(input) || input.value == input_g_value) {
			form_add_error(input);
			error++;
		} else {
			form_remove_error(input);
		}
	} else if (input.getAttribute("type") == "checkbox" && input.checked == false) {
		form_add_error(input);
		error++;
	} else {
		if (input.value == '' || input.value == input_g_value) {
			form_add_error(input);
			error++;
		} else {
			form_remove_error(input);
		}
	}

	return error;
}

function form_add_error(input) {
	input.classList.add('_error');
	input.parentElement.classList.add('_error');
	var input_error = input.parentElement.querySelector('.form__error');

	if (input_error) {
		input.parentElement.removeChild(input_error);
	}

	var input_error_text = input.getAttribute('data-error');

	if (input_error_text && input_error_text != '') {
		input.parentElement.insertAdjacentHTML('beforeend', '<div class="form__error">' + input_error_text + '</div>');
	}
}

function form_remove_error(input) {
	input.classList.remove('_error');
	input.parentElement.classList.remove('_error');
	var input_error = input.parentElement.querySelector('.form__error');

	if (input_error) {
		input.parentElement.removeChild(input_error);
	}
}

function form_clean(form) {
	var inputs = form.querySelectorAll('input,textarea');

	for (var _index14 = 0; _index14 < inputs.length; _index14++) {
		var _el10 = inputs[_index14];

		_el10.parentElement.classList.remove('_focus');

		_el10.classList.remove('_focus');

		_el10.value = _el10.getAttribute('data-value');
	}

	var selects = form.querySelectorAll('select');

	if (inputs.length > 0) {
		for (var _index15 = 0; _index15 < selects.length; _index15++) {
			var select = selects[_index15];
			var select_default_value = select.getAttribute('data-default');
			select.value = select_default_value;
			select_item(select);
		}
	}
}

var selects = document.querySelectorAll('select');

if (selects.length > 0) {
	selects_init();
} //Select


function selects_init() {
	for (var _index16 = 0; _index16 < selects.length; _index16++) {
		var select = selects[_index16];
		select_init(select);
	} //select_callback();


	document.addEventListener('click', function (e) {
		selects_close(e);
	});
	document.addEventListener('keydown', function (e) {
		if (e.which == 27) {
			selects_close(e);
		}
	});
}

function selects_close(e) {
	var selects = document.querySelectorAll('.select');

	if (!e.target.closest('.select')) {
		for (var _index17 = 0; _index17 < selects.length; _index17++) {
			var select = selects[_index17];
			select.classList.remove('_active');
		}
	}
}

function select_init(select) {
	var select_parent = select.parentElement;
	var select_modifikator = select.getAttribute('class');
	var select_selected_option = select.querySelector('option:checked');
	select.setAttribute('data-default', select_selected_option.value);
	select.style.display = 'none';
	select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');
	var new_select = select.parentElement.querySelector('.select');
	new_select.append(select);
	select_item(select);
}

function select_item(select) {
	var select_parent = select.parentElement;
	var select_items = select_parent.querySelector('.select__item');
	var select_options = select.querySelectorAll('option');
	var select_selected_option = select.querySelector('option:checked');
	var select_selected_text = select_selected_option.text;
	var select_type = select.getAttribute('data-type');

	if (select_items) {
		select_items.remove();
	}

	var select_type_content = '';

	if (select_type == 'input') {
		select_type_content = '<div class="select__value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="Ошибка" data-value="' + select_selected_text + '" class="select__input"></div>';
	} else {
		select_type_content = '<div class="select__value icon-select-arrow">' + select_selected_text + '</div>';
	}

	select_parent.insertAdjacentHTML('beforeend', '<div class="select__item">' + '<div class="select__title">' + select_type_content + '</div>' + '<div class="select__options">' + select_get_options(select_options) + '</div>' + '</div></div>');
	select_actions(select, select_parent);
}

function select_actions(original, select) {
	var select_item = select.querySelector('.select__item');
	var select_body_options = select.querySelector('.select__options');
	var select_options = select.querySelectorAll('.select__option');
	var select_type = original.getAttribute('data-type');
	var select_input = select.querySelector('.select__input');
	select_item.addEventListener('click', function () {
		var selects = document.querySelectorAll('.select');

		for (var _index18 = 0; _index18 < selects.length; _index18++) {
			var _select = selects[_index18];

			if (_select != select_item.closest('.select')) {
				_select.classList.remove('_active');
			}
		}

		slideToggle(select_body_options, 100);
		select.classList.toggle('_active');
	});

	var _loop5 = function _loop5(_index19) {
		var select_option = select_options[_index19];
		var select_option_value = select_option.getAttribute('data-value');
		var select_option_text = select_option.innerHTML;

		if (select_type == 'input') {
			select_input.addEventListener('keyup', select_search);
		} else {
			if (select_option.getAttribute('data-value') == original.value) {
				select_option.style.display = 'none';
			}
		}

		select_option.addEventListener('click', function () {
			for (var _index20 = 0; _index20 < select_options.length; _index20++) {
				var _el11 = select_options[_index20];
				_el11.style.display = 'block';
			}

			if (select_type == 'input') {
				select_input.value = select_option_text;
				original.value = select_option_value;
			} else {
				select.querySelector('.select__value').innerHTML = select_option_text;
				original.value = select_option_value;
				select_option.style.display = 'none';
			}
		});
	};

	for (var _index19 = 0; _index19 < select_options.length; _index19++) {
		_loop5(_index19);
	}
}

function select_get_options(select_options) {
	if (select_options) {
		var select_options_content = '';

		for (var _index21 = 0; _index21 < select_options.length; _index21++) {
			var select_option = select_options[_index21];
			var select_option_value = select_option.value;

			if (select_option_value != '') {
				var select_option_text = select_option.text;
				select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
			}
		}

		return select_options_content;
	}
}

function select_search(e) {
	var select_block = e.target.closest('.select ').querySelector('.select__options');
	var select_options = e.target.closest('.select ').querySelectorAll('.select__option');
	var select_search_text = e.target.value.toUpperCase();

	for (var _i4 = 0; _i4 < select_options.length; _i4++) {
		var select_option = select_options[_i4];
		var select_txt_value = select_option.textContent || select_option.innerText;

		if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
			select_option.style.display = "";
		} else {
			select_option.style.display = "none";
		}
	}
}

function selects_update_all() {
	var selects = document.querySelectorAll('select');

	if (selects) {
		for (var _index22 = 0; _index22 < selects.length; _index22++) {
			var select = selects[_index22];
			select_item(select);
		}
	}
} //Placeholers


var inputs = document.querySelectorAll('input[data-value],textarea[data-value]');

if (inputs.length > 0) {
	var _loop6 = function _loop6(_index23) {
		var input = inputs[_index23];
		var input_g_value = input.getAttribute('data-value');

		if (input.value == '' && input_g_value != '') {
			input.value = input_g_value;
		}

		if (input.value != '' && input.value != input_g_value) {
			input_focus_add(input);
		}

		input.addEventListener('focus', function (e) {
			if (input.value == input_g_value) {
				input_focus_add(input);
				input.value = '';
			}

			if (input.classList.contains('_date')) {
				input.classList.add('_mask');
				Inputmask("99-99-9999", {
					//"placeholder": '',
					clearIncomplete: true,
					clearMaskOnLostFocus: true,
					onincomplete: function onincomplete() {
						input_clear_mask(input, input_g_value);
					}
				}).mask(input);
			}

			if (input.classList.contains('_phone')) {
				//'+7(999) 999 9999'
				//'+38(999) 999 9999'
				//'+375(99)999-99-99'
				input.classList.add('_mask');
				Inputmask("+375 (99) 9999999", {
					//"placeholder": '',
					clearIncomplete: true,
					clearMaskOnLostFocus: true,
					onincomplete: function onincomplete() {
						input_clear_mask(input, input_g_value);
					}
				}).mask(input);
			}

			if (input.classList.contains('_digital')) {
				input.classList.add('_mask');
				Inputmask("9{1,}", {
					"placeholder": '',
					clearIncomplete: true,
					clearMaskOnLostFocus: true,
					onincomplete: function onincomplete() {
						input_clear_mask(input, input_g_value);
					}
				}).mask(input);
			}

			form_remove_error(input);
		});
		input.addEventListener('blur', function (e) {
			if (input.value == '') {
				input.value = input_g_value;
				input_focus_remove(input);

				if (input.classList.contains('_mask')) {
					input_clear_mask(input, input_g_value);
				}
			}
		});

		if (input.classList.contains('_date')) {
			datepicker(input, {
				customDays: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
				customMonths: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
				formatter: function formatter(input, date, instance) {
					var value = date.toLocaleDateString();
					input.value = value;
				}
			});
		}
	};

	for (var _index23 = 0; _index23 < inputs.length; _index23++) {
		_loop6(_index23);
	}
}

function input_focus_add(input) {
	input.classList.add('_focus');
	input.parentElement.classList.add('_focus');
}

function input_focus_remove(input) {
	input.classList.remove('_focus');
	input.parentElement.classList.remove('_focus');
}

function input_clear_mask(input, input_g_value) {
	input.inputmask.remove();
	input.value = input_g_value;
	input_focus_remove(input);
} //BildSlider


var sliders = document.querySelectorAll('._swiper');

if (sliders) {
	for (var _index24 = 0; _index24 < sliders.length; _index24++) {
		var slider = sliders[_index24];

		if (!slider.classList.contains('swiper-bild')) {
			var slider_items = slider.children;

			if (slider_items) {
				for (var _index25 = 0; _index25 < slider_items.length; _index25++) {
					var _el12 = slider_items[_index25];

					_el12.classList.add('swiper-slide');
				}
			}

			var slider_content = slider.innerHTML;
			var slider_wrapper = document.createElement('div');
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = '';
			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper-bild');
		}

		if (slider.classList.contains('_gallery')) {//slider.data('lightGallery').destroy(true);
		}
	}

	sliders_bild_callback();
}

function sliders_bild_callback(params) { }

var main_slider = new Swiper('.main-slider__body', {
	/*
	effect: 'fade',
	autoplay: {
		  delay: 3000,
		  disableOnInteraction: false,
	},
	*/
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 0,
	///autoHeight: true,
	speed: 800,
	//touchRatio: 0,
	//simulateTouch: false,
	loop: true,
	//preloadImages: false,
	//lazy: true,
	// Dotts
	//pagination: {
	//	el: '.slider-quality__pagging',
	//	clickable: true,
	//},
	// Arrows
	navigation: {
		nextEl: '.control-main-slider__arrow_next',
		prevEl: '.control-main-slider__arrow_prev'
	},
	breakpoints: {
		320: {
			autoHeight: true
		},
		768: {
			autoHeight: false
		}
	},
	on: {
		lazyImageReady: function lazyImageReady() {
			ibg();
		}
	} // And if we need scrollbar
	//scrollbar: {
	//	el: '.swiper-scrollbar',
	//},

});
var lots_slider = new Swiper('.slider-lots__body', {
	/*
	effect: 'fade',
	autoplay: {
		  delay: 3000,
		  disableOnInteraction: false,
	},
	*/
	observer: true,
	observeParents: true,
	slidesPerView: 3,
	spaceBetween: 0,
	///autoHeight: true,
	speed: 800,
	//touchRatio: 0,
	//simulateTouch: false,
	loop: true,
	//preloadImages: false,
	//lazy: true,
	// Dotts
	//pagination: {
	//	el: '.slider-quality__pagging',
	//	clickable: true,
	//},
	// Arrows
	navigation: {
		nextEl: '.control-slider-lots__arrow_next',
		prevEl: '.control-slider-lots__arrow_prev'
	},
	breakpoints: {
		320: {
			slidesPerView: 1
		},
		550: {
			slidesPerView: 2
		},
		768: {
			slidesPerView: 3
		}
	},
	on: {
		lazyImageReady: function lazyImageReady() {
			ibg();
		}
	} // And if we need scrollbar
	//scrollbar: {
	//	el: '.swiper-scrollbar',
	//},

});
var quotes_slider = new Swiper('.slider-quotes__body', {
	effect: 'fade',

	/*
	autoplay: {
		  delay: 3000,
		  disableOnInteraction: false,
	},
	*/
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 0,
	///autoHeight: true,
	speed: 1000,
	//touchRatio: 0,
	//simulateTouch: false,
	loop: true,
	//preloadImages: false,
	//lazy: true,
	// Dotts
	//pagination: {
	//	el: '.slider-quality__pagging',
	//	clickable: true,
	//},
	// Arrows
	navigation: {
		nextEl: '.control-slider-quotes__circle'
	},
	breakpoints: {
		320: {
			autoHeight: true
		},
		570: {
			autoHeight: false
		}
	},
	on: {
		lazyImageReady: function lazyImageReady() {
			ibg();
		}
	} // And if we need scrollbar
	//scrollbar: {
	//	el: '.swiper-scrollbar',
	//},

});
var scr_body = document.querySelector('body');
var scr_blocks = document.querySelectorAll('._scr-sector');
var scr_items = document.querySelectorAll('._scr-item');
var scr_min_height = 750; //ScrollOnScroll

window.addEventListener('scroll', scroll_scroll);

function scroll_scroll() {
	scr_body.setAttribute('data-scroll', pageYOffset);
	var hrader = document.querySelector('header.header');
	scr_body.setAttribute('data-scroll', pageYOffset);

	if (pageYOffset > 10) {
		hrader.classList.add('_scroll');
	} else {
		hrader.classList.remove('_scroll');
	}

	if (scr_blocks.length > 0) {
		for (var _index26 = 0; _index26 < scr_blocks.length; _index26++) {
			var block = scr_blocks[_index26];
			var block_offset = offset(block).top;
			var block_height = block.offsetHeight;

			if (pageYOffset > block_offset - window.innerHeight / 1.5 && pageYOffset < block_offset + block_height - window.innerHeight / 1.5) {
				block.classList.add('_scr-sector_active');
			} else {
				if (block.classList.contains('_scr-sector_active')) {
					block.classList.remove('_scr-sector_active');
				}
			}

			if (pageYOffset > block_offset - window.innerHeight / 2 && pageYOffset < block_offset + block_height - window.innerHeight / 2) {
				if (!block.classList.contains('_scr-sector_current')) {
					block.classList.add('_scr-sector_current');
				}
			} else {
				if (block.classList.contains('_scr-sector_current')) {
					block.classList.remove('_scr-sector_current');
				}
			}
		}
	}

	if (scr_items.length > 0) {
		for (var _index27 = 0; _index27 < scr_items.length; _index27++) {
			var scr_item = scr_items[_index27];
			var scr_item_offset = offset(scr_item).top;
			var scr_item_height = scr_item.offsetHeight;

			if (pageYOffset > scr_item_offset - window.innerHeight / 1.5 && pageYOffset < scr_item_offset + scr_item_height - window.innerHeight / 1.5) {
				scr_item.classList.add('_active');
				scroll_load_item(scr_item);
			} else {
				scr_item.classList.remove('_active');
			}
		}
	}
}

setTimeout(function () {
	scroll_scroll();
}, 100);

function scroll_load_item(scr_item) {
	if (scr_item.classList.contains('_load-map') && !scr_item.classList.contains('_loaded-map')) {
		var map_item = document.getElementById('map');

		if (map_item) {
			scr_item.classList.add('_loaded-map');
			map();
		}
	}
}


var link = document.querySelectorAll('._goto-block');

if (link) {
	var blocks = [];

	var _loop7 = function _loop7(_index28) {
		var el = link[_index28];
		var block_name = el.getAttribute('href').replace('#', '');

		if (block_name != '' && !~blocks.indexOf(block_name)) {
			blocks.push(block_name);
		}

		el.addEventListener('click', function (e) {
			if (document.querySelector('.menu__body._active')) {
				menu_close();
				body_lock_remove(500);
			}

			var target_block_class = el.getAttribute('href').replace('#', '');
			var target_block = document.querySelector('.' + target_block_class);

			_goto(target_block, 300);

			e.preventDefault();
		});
	};

	for (var _index28 = 0; _index28 < link.length; _index28++) {
		_loop7(_index28);
	}

	window.addEventListener('scroll', function (el) {
		var old_current_link = document.querySelectorAll('._goto-block._active');

		if (old_current_link) {
			for (var _index29 = 0; _index29 < old_current_link.length; _index29++) {
				var _el13 = old_current_link[_index29];

				_el13.classList.remove('_active');
			}
		}

		for (var _index30 = 0; _index30 < blocks.length; _index30++) {
			var block = blocks[_index30];
			var block_item = document.querySelector('.' + block);

			if (block_item) {
				var block_offset = offset(block_item).top;
				var block_height = block_item.offsetHeight;

				if (pageYOffset > block_offset - window.innerHeight / 3 && pageYOffset < block_offset + block_height - window.innerHeight / 3) {
					var current_links = document.querySelectorAll('._goto-block[href="#' + block + '"]');

					for (var _index31 = 0; _index31 < current_links.length; _index31++) {
						var current_link = current_links[_index31];
						current_link.classList.add('_active');
					}
				}
			}
		}
	});
} //ScrollOnClick (Simple)


var goto_links = document.querySelectorAll('._goto');

if (goto_links) {
	var _loop8 = function _loop8(_index32) {
		var goto_link = goto_links[_index32];
		goto_link.addEventListener('click', function (e) {
			var target_block_class = goto_link.getAttribute('href').replace('#', '');
			var target_block = document.querySelector('.' + target_block_class);

			_goto(target_block, 300);

			e.preventDefault();
		});
	};

	for (var _index32 = 0; _index32 < goto_links.length; _index32++) {
		_loop8(_index32);
	}
}

function _goto(target_block, speed) {
	var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	var header = ''; //OffsetHeader

	header = 'header';
	var options = {
		speedAsDuration: true,
		speed: speed,
		header: header,
		offset: offset
	};
	var scr = new SmoothScroll();
	scr.animateScroll(target_block, '', options);
} //SameFunctions


function offset(el) {
	var rect = el.getBoundingClientRect(),
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return {
		top: rect.top + scrollTop,
		left: rect.left + scrollLeft
	};
}

function disableScroll() {
	if (window.addEventListener) // older FF
		window.addEventListener('DOMMouseScroll', preventDefault, false);
	document.addEventListener('wheel', preventDefault, {
		passive: false
	}); // Disable scrolling in Chrome

	window.onwheel = preventDefault; // modern standard

	window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE

	window.ontouchmove = preventDefault; // mobile

	document.onkeydown = preventDefaultForScrollKeys;
}

function enableScroll() {
	if (window.removeEventListener) window.removeEventListener('DOMMouseScroll', preventDefault, false);
	document.removeEventListener('wheel', preventDefault, {
		passive: false
	}); // Enable scrolling in Chrome

	window.onmousewheel = document.onmousewheel = null;
	window.onwheel = null;
	window.ontouchmove = null;
	document.onkeydown = null;
}

function preventDefault(e) {
	e = e || window.event;
	if (e.preventDefault) e.preventDefault();
	e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
	/*if (keys[e.keyCode]) {
		  preventDefault(e);
		  return false;
	}*/
}

var user_icon = document.querySelector('.user-header__icon');
var user_menu = document.querySelector('.user-header__menu');
user_icon.addEventListener("click", function (e) {
	user_menu.classList.toggle('_active');
});
document.documentElement.addEventListener("click", function (e) {
	if (!e.target.closest('.user-header')) {
		user_menu.classList.remove('_active');
	}
});