function WinOSHAReport(activity_nr) {
	var app = require('/lib/globals');
	
	var vwButtons = Ti.UI.createView({
		top: 0,
		height: Ti.Platform.osname == 'android' ? 44 : null,
		backgroundImage: '/images/toolbar_background.png'
	});
	
	var btnBack = Ti.UI.createButton({
		backgroundImage: '/images/back_arrow.png',
		backgroundSelectedImage: '/images/back_arrow_disabled.png',
		left: Ti.Platform.osname == 'android' ? null : 0,
		center: Ti.Platform.osname == 'android' ? Ti.Platform.displayCaps.platformWidth/2 - 50 : null,
		width: 50,
		height: 19,
		enabled: true
	});
	btnBack.addEventListener('click', function() {
		wvOSHAReport.goBack();
	});
	vwButtons.add(btnBack);
	
	var btnForward = Ti.UI.createButton({
		backgroundImage: '/images/forward_arrow.png',
		backgroundSelectedImage: '/images/forward_arrow_disabled.png',
		enabled: true,
		left: Ti.Platform.osname == 'android' ? null : btnBack.width + 25,
		center: Ti.Platform.osname == 'android' ? Ti.Platform.displayCaps.platformWidth/2 + 50 : null,
		width: 50,
		height: 19
	});
	btnForward.addEventListener('click', function() {
		wvOSHAReport.goForward();
	});
	vwButtons.add(btnForward);
	
	var self = Titanium.UI.createWindow({
		orientationModes: app.ORIENTATION_MODES,
		tabBarHidden: true,
		navBarHidden: Ti.Platform.osname == 'android' ? true : false,
		left: Ti.Platform.osname == 'android' ? 0 : Titanium.Platform.displayCaps.platformWidth,
		titleControl: Ti.Platform.osname == 'android' ? null : vwButtons,
		backgroundColor: 'white',
		barColor: app.HEADER_COLOR
	});
	self.addEventListener('close', function() {	
		app.winSearch.ui.barColor = app.HEADER_COLOR;
	});
	self.addEventListener('android:back', function() {	
		
		self.close();
		
		app.winOSHAReport = null;
	});
	
	if (Ti.Platform.osname == 'android') {
		self.add(vwButtons);
	}
	
	var wvOSHAReport = Titanium.UI.createWebView({
		url: 'http://www.osha.gov/pls/imis/establishment.inspection_detail?id=' + activity_nr,
	    top: Ti.Platform.osname == 'android' ? 44 : 0,
	    bottom: 0,
	    scalesPageToFit: true,
	    autoDetect: []
	});
	wvOSHAReport.addEventListener('beforeload', function(evt) {
		app.vwIndicator.show(self);
	});
	wvOSHAReport.addEventListener('load', function(evt) {
		app.vwIndicator.hide(self); 
	});
	wvOSHAReport.addEventListener('error', function(evt) {
		app.vwIndicator.hide(self); 	
		alert('Webpage not available.');
	});
	self.add(wvOSHAReport);

	this.ui = self;
}
module.exports = WinOSHAReport;
