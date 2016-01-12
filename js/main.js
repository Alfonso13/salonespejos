function load() {
	'use strict';
	var map = new GMaps({
	  div: '#map',
	  lat: 14.850667,
	  lng: -91.533809
	});
	map.addMarker({
		lat: 14.850667,
	  	lng: -91.533809,
	  	title: "Salón Espejos",
	  	click: function click(){ },
	  	infoWindow: {
	  		content: "<h3 style='color: #333;'>Salón Espejos</h3>"
	  	}
	});
	$(window).on('scroll', function (scroll) {
		/*pendiente*/	
	});

	var locationSuccess = function locationSuccess(location) {
		$("#btn-route").attr('data-route', JSON.stringify({lat: location.coords.latitude, lng: location.coords.longitude}));
		var mapRoute = new GMaps({
			div: "#map-modal",
			lat: location.coords.latitude,
			lng: location.coords.longitude
		});
		var marker = mapRoute.addMarker({
			lat: location.coords.latitude,
			lng: location.coords.longitude,
			draggable: true
		});
		marker.addListener('dragend', function a(drag) {
			var lat = drag.latLng.lat();
			var lng = drag.latLng.lng();
			var stringify = JSON.stringify({lat: lat, lng: lng});
			$("#btn-route").attr('data-route', stringify);
		});
		$('body').css({overflow: 'hidden'});
		$("#RouteMap").removeClass('no-visibility').addClass('visibility');
	};
	var locationError = function locationError() {
		console.log(arguments);
	};


	$("#btn-arrive").on('click', function click(e) {
		e.preventDefault();
		var options = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0
		};
		navigator.geolocation.getCurrentPosition(locationSuccess, locationError,options);
	});
	$('#btn-route').on('click', function click(a) {
		a.preventDefault();
		var location = JSON.parse($(this).attr('data-route'));
		map.addMarker({
			lat: location.lat,
			lng: location.lng,
			title: "Tu ubicación",
			infoWindow: {
				content: "<p>Tu ubicación</p>"
			}
		});
		var origin = [location.lat, location.lng];
		var destination = [14.850667, -91.533809];
		map.cleanRoute();
		map.drawRoute({
			origin: origin,
			destination: destination,
			travelMode:'driving',
			strokeColor: '#131540',
			strokeOpacity: 0.6,
			strokeWeight: 6
		});
		map.zoomOut(5);
		$('#RouteMap').removeClass('visibility').addClass('no-visibility');
	});
	$("#discover-glamour").on('click', function click(e){
		e.preventDefault();
		var destination = $("#section").offset().top;
		$('html, body').stop().animate({scrollTop: destination}, 300, 'swing');
	});
	$("#arrive-living-room").on('click', function click(e) {
		e.preventDefault();
		var destination = $("#main #location").offset().top;
		$('html, body').stop().animate({scrollTop: destination-10}, 600, 'swing');
	});
	$('.close').on('click', function click(e) {
		e.preventDefault();
		$(this).parent().parent().removeClass('visibility').addClass('no-visibility');
		$('body').css({overflow: 'auto'});
	});
};

$(document).on('ready', load);