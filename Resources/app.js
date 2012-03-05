Ti.include('osha_detail.js');
Ti.include('whd_detail.js');
Ti.include('yelp_api.js');
Ti.include('yelp_biz.js');
Ti.include('dol_map.js');
Ti.include('home.js');
Ti.include('take_action.js');
Ti.include('info.js');
Ti.include('disclaimer.js');

var orientationModes = [Titanium.UI.PORTRAIT];
Ti.UI.setBackgroundColor('white');
var headerColor = '#3366CC';
var rowSelectionColor = '#7EACFF';
var currentLocation = {latitude:38.895112,longitude:-77.036366};
Ti.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
Ti.Geolocation.purpose = 'Acquiring Current Location';
Ti.Geolocation.distanceFilter = 10;


var indView = Titanium.UI.createView({
	height:150,
	width:150,
	backgroundColor:'#000',
	borderRadius:10,
	opacity:0.8
});

var actInd = Titanium.UI.createActivityIndicator({
	style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
	height:30,
	width:30,
	message: Ti.Platform.osname == 'android' ? 'Loading' : null
});

if (Ti.Platform.osname != 'android') {
	indView.add(actInd);	
}

var lblActivity = Titanium.UI.createLabel({
	text:'Loading',
	color:'#fff',
	width:'auto',
	height:'auto',
	font:{fontSize:20,fontWeight:'bold'},
	bottom:20
});
indView.add(lblActivity);

var tabSearch1 = null;
var tgSearch = null;

winHome.create().open();

winDisclaimer.create().open({modalTransitionStyle:Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,modalStyle:Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET});
	
if(!Ti.Network.online) {
	alert('Network unavailable. Check your network settings.');
}

Titanium.Network.addEventListener('change', function(evt) {
	if (!evt.online) {
		alert('Network unavailable. Check your network settings.');
	}
	else {
		if (winDOLMap.googleMap) {
			//var lat = winDOLMap.googleMap.evalJS('getMapCenterLat();');
			//if (!lat) {
				winDOLMap.googleMap.reload();
				winDOLMap.wvDolList.reload();
				winMapFilter.update(FilterSettings.SearchName);	
			//} else {
			//	winMapFilter.update(FilterSettings.SearchName);	
			//}
		}
		
		
	}
});
