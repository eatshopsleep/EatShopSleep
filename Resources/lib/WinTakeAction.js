function WinTakeAction(inTabGroup) {
	var app = require('/lib/globals');
	
	var vwButtons = Ti.UI.createView({
		top: 0,
		height: Ti.Platform.osname == 'android' ? 44 : null,
		backgroundImage: Ti.Platform.osname == 'android' ? '/images/toolbar_background.png' : null
	});
	
	var vwLogo = Ti.UI.createView({
		backgroundImage: '/images/dol_seal_small.png',
		width: 32,
		height: 32
	});
	
	var self = Titanium.UI.createWindow({
		orientationModes: app.ORIENTATION_MODES,
		tabBarHidden: true,
		navBarHidden: Ti.Platform.osname == 'android' ? true : false,
		barColor: app.HEADER_COLOR,
		titleControl: Ti.Platform.osname == 'android' ? null : vwButtons,
		backgroundColor: 'white',
		rightNavButton: vwLogo
	});	
	self.addEventListener('android:back', function() {	
		self.close();
		
		app.winTakeAction = null;
	});
	
	var wvOSHA = Ti.UI.createWebView({
		top: Ti.Platform.osname == 'android' || inTabGroup == false ? 44 : 0,
		url:'/lib/osha.html',
		bottom: 44,
		scalesPageToFit: true,
		width: Titanium.Platform.displayCaps.platformWidth,
		autoDetect: [],
		visible: true
	});
	wvOSHA.addEventListener('beforeload', function(evt) {
		app.vwIndicator.show(self);
	});
	wvOSHA.addEventListener('load', function(evt) {
		app.vwIndicator.hide(self);
		if (wvOSHA.url == 'about:blank') {
			wvOSHA.url = '/lib/osha.html';
		}
	});
	wvOSHA.addEventListener('error', function(evt) {
		app.vwIndicator.hide(self);
		alert('Webpage not available.');
	});
	self.add(wvOSHA);
	
	var wvWHD = Ti.UI.createWebView({
		top: Ti.Platform.osname == 'android' || inTabGroup == false ? 44 : 0,
		visible: false,
		url:'/lib/whd.html',
		bottom: 44,
		scalesPageToFit: true,
		width: Titanium.Platform.displayCaps.platformWidth,
		autoDetect: []
	});
	wvWHD.addEventListener('beforeload', function(evt) {
		app.vwIndicator.show(self);
	});
	wvWHD.addEventListener('load', function(evt) {
		app.vwIndicator.hide(self);
		if (wvWHD.url == 'about:blank') {
			wvWHD.url = '/lib/whd.html';
		}
	});
	wvWHD.addEventListener('error', function(evt) {
		app.vwIndicator.hide(self);
		alert('Webpage not available.');
	});
	self.add(wvWHD);
	
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
		var wv, url;
		if (wvOSHA.visible == true) {
			wv = wvOSHA;
			url = '/lib/osha.html';
		} else {
			wv = wvWHD;
			url = '/lib/whd.html';
		}
		
		if (wv.canGoBack() == false && Ti.Platform.osname != 'android') {
			wv.url = url;
		} else {
			wv.goBack();	
		}
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
		var wv;
		if (wvOSHA.visible) {
			wv = wvOSHA;
		} else {
			wv = wvWHD;
		}
		wv.goForward();
	});
	vwButtons.add(btnForward);
	
	if (Ti.Platform.osname == 'android') {
		vwLogo.right = 10;
		vwButtons.add(vwLogo);
		self.add(vwButtons);
	
		vwToolbarBottom = Ti.UI.createView({
			bottom: 0, height: 44,
			backgroundImage: '/images/toolbar_background.png'
		});
		
		btnOSHA = Ti.UI.createLabel({
			text: 'OSHA',
			color: 'white',
			height: 34,
			width: 74,
			textAlign: 'center',
			font:app.Font.button1,
			backgroundImage: '/images/toolbar_button_74x34.png',
			backgroundSelectedImage: '/images/toolbar_button_74x34_pressed.png',
			center: Titanium.Platform.displayCaps.platformWidth/2 - 50
		});
		btnOSHA.addEventListener('click', function() {
			wvOSHA.visible = true;
			wvWHD.visible = false;
		});
		vwToolbarBottom.add(btnOSHA);
		
		btnWHD = Ti.UI.createLabel({
			text: 'WHD',
			color: 'white',
			height: 34,
			width: 74,
			textAlign: 'center',
			font:app.Font.button1,
			backgroundImage: '/images/toolbar_button_74x34.png',
			backgroundSelectedImage: '/images/toolbar_button_74x34_pressed.png',
			center: Titanium.Platform.displayCaps.platformWidth/2 + 50
		});
		btnWHD.addEventListener('click', function() {
			wvOSHA.visible = false;
			wvWHD.visible = true;
		});
		vwToolbarBottom.add(btnWHD);
		
		self.add(vwToolbarBottom);
		
	} else {
		var flexSpace = Titanium.UI.createButton({
			systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
		});
		
		if (inTabGroup == false) {
			
			var btnHome = Titanium.UI.createButton({
				title: 'Home',
				style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
			});
			btnHome.addEventListener('click', function(evt){
				
				self.animate({opacity:0,duration:300}, function() {
					self.close();
					
					app.winTakeAction = null;
				});
				app.winHome.ui.animate({opacity:1,duration:300});	
			
			});
			
			var toolbarTop = Ti.UI.iOS.createToolbar({
				items:[btnHome,flexSpace,vwButtons,flexSpace,vwLogo],
				top:0,
				borderWidth: 0,
				barColor: app.HEADER_COLOR
			});	
			self.add(toolbarTop);
		}
		
		var buttonObjects = [
			{image:'/images/osha_logo_small.png', width:65},
			{image:'/images/whd_logo_small.png', width:65},
		];
		
		var tabBar = Ti.UI.iOS.createTabbedBar({
			labels: buttonObjects,
			style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
			backgroundColor: 'white',
			index:0,
			height: 28,
			width: 'auto'
		});
		tabBar.addEventListener('click', function(evt){
			if (evt.index == 0) {
				wvOSHA.visible = true;
				wvWHD.visible = false;
			} else {
				wvOSHA.visible = false;
				wvWHD.visible = true;
			}
		});
		
		toolbarBottom = Ti.UI.iOS.createToolbar({
			items:[flexSpace,tabBar,flexSpace],
			bottom:0,
			borderWidth: 0,
			barColor: app.HEADER_COLOR
		});	
		self.add(toolbarBottom);
	}
	
	this.ui = self;
}

module.exports = WinTakeAction;
