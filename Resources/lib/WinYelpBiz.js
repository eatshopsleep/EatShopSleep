function WinYelpBiz(mobile_url,hideNavOnClose) {
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
		navBarHidden: Ti.Platform.osname == 'android' ? true : false,
		backgroundColor: 'white',
		barColor: app.HEADER_COLOR
	});
	self.addEventListener('close', function() {	
		
		app.winSearch.ui.barColor = app.HEADER_COLOR;
		
		app.winYelpBiz = null;
	});
	self.addEventListener('android:back', function() {
		self.close();
		
		app.winYelpBiz = null;
	});
	
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
		wvYelpBizWebsite.goBack();
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
		wvYelpBizWebsite.goForward();
	});
	vwButtons.add(btnForward);
	
	if (Ti.Platform.osname == 'android') {
		self.add(vwButtons);
	}
	
	wvYelpBizWebsite = Titanium.UI.createWebView({
		url: mobile_url,
	    top: Ti.Platform.osname == 'android' ? 44 : 0,
	    scalesPageToFit: true
	});
	wvYelpBizWebsite.addEventListener('beforeload', function(evt) {
		app.vwIndicator.show(self);
	});
	wvYelpBizWebsite.addEventListener('load', function(evt) {
		app.vwIndicator.hide(self); 
	});
	wvYelpBizWebsite.addEventListener('error', function(evt) {
		app.vwIndicator.hide(self); 
		alert('Webpage not available.');
	});
	self.add(wvYelpBizWebsite);
	
	this.ui = self;
}
module.exports = WinYelpBiz;
