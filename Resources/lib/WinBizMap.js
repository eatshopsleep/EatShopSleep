function WinBizMap(address, city, state) {
	var app = require('/lib/globals');
	
	var vwButtons = Ti.UI.createView({
		top: 0,
		height: Ti.Platform.osname == 'android' ? 44 : null,
		backgroundImage: Ti.Platform.osname == 'android' ? '/images/toolbar_background.png' : null
	});
	
	var self = Titanium.UI.createWindow({
		orientationModes: app.ORIENTATION_MODES,
		tabBarHidden: true,
		titleControl: vwButtons,
		backgroundColor: 'white',
		barColor: app.HEADER_COLOR,
		navBarHidden: Ti.Platform.osname == 'android' ? true : false,
	});
	self.addEventListener('close', function() {	
		app.winSearch.ui.barColor = app.HEADER_COLOR;
		
		app.winBizMap = null;
	});
	self.addEventListener('android:back', function() {	
		self.close();
		
		app.winBizMap = null;
	});
	
	wvBizMap = Titanium.UI.createWebView({
		url: 'http://maps.google.com/maps?q=' + address + ',' + city + ',' + state,
	    top: Ti.Platform.osname == 'android' ? 44 : 0,
	    scalesPageToFit: true
	});
	wvBizMap.addEventListener('beforeload', function(evt) {
		app.vwIndicator.show(self);
		
	});
	wvBizMap.addEventListener('load', function(evt) {
		app.vwIndicator.hide(self); 
		
	});
	wvBizMap.addEventListener('error', function(evt) {
		app.vwIndicator.hide(self); 
		alert('Webpage not available.');
	});
	self.add(wvBizMap);
	
	btnBack = Ti.UI.createButton({
		backgroundImage: '/images/back_arrow.png',
		backgroundSelectedImage: '/images/back_arrow_disabled.png',
		left: Ti.Platform.osname == 'android' ? null : 0,
		center: Ti.Platform.osname == 'android' ? Ti.Platform.displayCaps.platformWidth/2 - 50 : null,
		width: 50,
		height: 19,
		enabled: true
	});
	btnBack.addEventListener('click', function() {
		wvBizMap.goBack();
	});
	vwButtons.add(btnBack);
	
	btnForward = Ti.UI.createButton({
		backgroundImage: '/images/forward_arrow.png',
		backgroundSelectedImage: '/images/forward_arrow_disabled.png',
		enabled: true,
		left: Ti.Platform.osname == 'android' ? null : btnBack.width + 25,
		center: Ti.Platform.osname == 'android' ? Ti.Platform.displayCaps.platformWidth/2 + 50 : null,
		width: 50,
		height: 19
	});
	btnForward.addEventListener('click', function() {
		wvBizMap.goForward();
	});
	vwButtons.add(btnForward);
	
	if (Ti.Platform.osname == 'android') {
		self.add(vwButtons);
	}
	
	this.ui = self;
}
module.exports = WinBizMap;
