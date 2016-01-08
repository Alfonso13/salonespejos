function load() {
	'use strict';
	var map = new GMaps({
	  div: '#map',
	  lat: 14.540762,
	  lng: -91.678784
	});
	
	$(window).on('scroll', function (scroll) {
		
	});
	/*map.drawRoute({
	  origin: [14.540762, -91.678784],
	  destination: [14.540347, -91.570936],
	  travelMode: 'driving',
	  strokeColor: '#131540',
	  strokeOpacity: 0.6,
	  strokeWeight: 6
	});*/
	var locationSuccess = function locationSuccess(location) {
		var origin = [location.coords.latitude, location.coords.longitude];
		var destination = [14.850720, -91.533569];
		map.cleanRoute();
		map.drawRoute({
			origin: origin,
			destination: destination,
			travelMode:'driving',
			strokeColor: '#131540',
			strokeOpacity: 0.6,
			strokeWeight: 6
		});
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
};

$(document).on('ready', load);