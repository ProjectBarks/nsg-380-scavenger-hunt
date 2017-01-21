$(function() {
	var target = "";

	$('.start').on('click', function() {
		$('.login').fadeOut();
	});

	load();

	$("div.rippeler").click(function (e) {

		// Remove any old one
		$(".ripple").remove();

		// Setup
		var posX = $(this).offset().left,
			posY = $(this).offset().top,
			buttonWidth = $(this).width(),
			buttonHeight =  $(this).height();

		// Add the element
		$(this).prepend("<span class='ripple'></span>");


		// Make it round!
		if(buttonWidth >= buttonHeight) {
			buttonHeight = buttonWidth;
		} else {
			buttonWidth = buttonHeight; 
		}

		// Get the center of the element
		var x = e.pageX - posX - buttonWidth / 2;
		var y = e.pageY - posY - buttonHeight / 2;


		// Add the ripples CSS and start the animation
		$(".ripple").css({
			width: buttonWidth,
			height: buttonHeight,
			top: y + 'px',
			left: x + 'px'
		}).addClass("rippleEffect");
	});

	var words = {
		"syringes": "Syringes",
		"morphine": "Morphine",
		"furosemide": "Furosemide",
		"epinephrine": "Epinephrine",
		"alcohol ipes": "Alcohol wipes",
		"ivpumptubing": "IV pump tubing",
		"ivpiggybacktubing": "IV piggyback tubing",
		"tylenol": "Tylenol",
		"colac": "Colac",
		"oxygenmask": "Oxygen mask",
		"glove": "Glove",
		"cprboard": "CPR board",
		"asa": "Asa"
	};

	var barcodeModal = UIkit.modal($('#barcode-scan')[0])[0];
	var qrstatus = $('#qr-status');
	for (var key in words) {
		var element = $('<div id="' + key + '" class="uk-card uk-card-primary uk-card-body ucw uk-margin rippeler" uk-toggle="target: #barcode-scan"><h3 class="uk-card-title">' + words[key] + '</h3></div>');
		element.click(function() {
			target = $(this).attr('id');
		}).appendTo($('.home'));
	}

	$('#barcode-scan').on('hide', function () { target = ""; });

	qrcode.callback = function(x) {
		x = x.toLowerCase().trim().replace(' ', '');
        if (target == "") return;
        if (x != target) {
        	qrstatus.text('Invalid Result!');
        	return;
        }
		barcodeModal.hide();
        $("#" + x).prepend("<div class=\"uk-card-badge uk-label\">Found</div>");
        target = "";
        qrstatus.text('Reading');
    };
});
