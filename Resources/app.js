Ti.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
Ti.Geolocation.purpose = 'Acquiring Current Location';
Ti.Geolocation.distanceFilter = 10;
Ti.UI.setBackgroundColor('white');

var app = require('/lib/globals');

var VwIndicator = require('/lib/VwIndicator');
app.vwIndicator = new VwIndicator(); 
VwIndicator = null;

var WinHome = require('/lib/WinHome');
app.winHome = new WinHome(); 
app.winHome.ui.open();
WinHome = null;

var WinDisclaimer = require('/lib/WinDisclaimer');
app.winDisclaimer = new WinDisclaimer(); 
app.winDisclaimer.ui.open({modalTransitionStyle:Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,modalStyle:Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET});
WinDisclaimer = null;

if(!Ti.Network.online) {
	alert('Network unavailable. Check your network settings.');
}

Titanium.Network.addEventListener('change', function(evt) {
	if (!evt.online) {
		alert('Network unavailable. Check your network settings.');
	} else {
		if (app.winSearch) {
			//app.winSearch.reload();
			
		}
		
	}

});

Ti.App.addEventListener('placeCall',function(evt) { 
	var a = Titanium.UI.createAlertDialog({
		title: evt.display,
		buttonNames: ['Cancel','Call'],
		cancel: 0,
		number: evt.number
	});
	a.addEventListener('click', function(evt) {
		if (evt.index == 1) {
			Titanium.Platform.openURL('tel:' + a.number);
		}
	});
	
	a.show();
});

Ti.App.addEventListener('zoomChanged', function(evt){
	if (app.winSearch) {
		app.winSearch.zoomChanged(evt);
	}
});


Ti.App.addEventListener('yelpMarkerClicked', function(evt){
	if (app.winSearch) {
		app.winSearch.yelpMarkerClicked(evt);
	}
});

Ti.App.addEventListener('oshaMarkerClicked', function(evt){
	if (app.winSearch) {
		app.winSearch.oshaMarkerClicked(evt);
	}
});

Ti.App.addEventListener('whdMarkerClicked', function(evt){
	if (app.winSearch) {
		app.winSearch.whdMarkerClicked(evt);
	}
});	
/*
Ti.App.addEventListener('getYelpList', function(evt){
	if (app.winSearch) {
		app.winSearch.getYelpList(evt);
	}
});

Ti.App.addEventListener('getLocalYelp',function(evt) {
	if (app.winSearch) {
		app.winSearch.getLocalYelp(evt);
	}
});
*/
Ti.App.addEventListener('getDOLList',function(evt) {
	if (app.winSearch) {
		app.winSearch.getDOLList(evt);
	}
	
});

Ti.App.addEventListener('geocodeSuccess', function(evt){
	if (app.winSearch) {
		app.winSearch.update(app.FilterSettings.SearchName);
	}
	if (app.winLocation) {
		app.winLocation.ui.close();
		app.winLocation.ui = null;
		app.winLocation = null;	
	}
		
	
		
});