$(function() {
	UIkit.icon($('.icon'));
	$('.start').on('click', function() {
		$('.login').fadeOut();
	});

	var target = "";
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

	if (!!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)) {
		$('#video').hide();
		$("#scan").on('change', function(e) {
			var url = URL.createObjectURL(this.files[0]);
			$("#safari").attr('src', url);
			qrstatus.text('Parsing');
			qrcode.decode(url);
		});
	} else {
		$('.uploader').hide();
		$('#safari').hide();
		load();
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
