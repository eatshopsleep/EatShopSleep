var winAction = {
	win: null,
	winNav: null
};

(function() {
	
	var flexSpace = Titanium.UI.createButton({
		systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
    winAction.createNavWin = function() {
    	
    	var vwButtons = Ti.UI.createView({
    		top: 0,
    		height: Ti.Platform.osname == 'android' ? 44 : null,
    		backgroundImage: Ti.Platform.osname == 'android' ? 'images/toolbar_background.png' : null
		});
		
    	var vwLogo = Ti.UI.createView({
			backgroundImage: 'images/dol_seal_small.png',
			width: 32,
			height: 32
		});
		
    	winAction.winNav = Titanium.UI.createWindow({
			orientationModes: orientationModes,
			tabBarHidden: true,
			navBarHidden: Ti.Platform.osname == 'android' ? true : false,
			barColor: headerColor,
			titleControl: Ti.Platform.osname == 'android' ? null : vwButtons,
			backgroundColor: 'white',
			rightNavButton: vwLogo
		});	
		winAction.winNav.addEventListener('android:back', function() {	
			winAction.winNav.close();
		});
		
		var wvOSHA = Ti.UI.createWebView({
			top: Ti.Platform.osname == 'android' ? 44 : 0,
			url:'osha.htm',
			bottom: 44,
			scalesPageToFit: true,
			width: Titanium.Platform.displayCaps.platformWidth,
			autoDetect: [],
			visible: true
		});
		wvOSHA.addEventListener('beforeload', function(evt) {
			if (Ti.Platform.osname != 'android') {
				winAction.winNav.add(indView);
			} 
			actInd.show();
		});
		wvOSHA.addEventListener('load', function(evt) {
			actInd.hide();	
			if (Ti.Platform.osname != 'android') {
				winAction.winNav.remove(indView);
			} 
			if (wvOSHA.url == 'about:blank') {
				wvOSHA.url = 'osha.htm';
			}
		});
		wvOSHA.addEventListener('error', function(evt) {
			actInd.hide();	
			if (Ti.Platform.osname != 'android') {
				winAction.winNav.remove(indView);
			} 
			alert('Webpage not available.');
		});
		winAction.winNav.add(wvOSHA);
		
		var wvWHD = Ti.UI.createWebView({
			top: Ti.Platform.osname == 'android' ? 44 : 0,
			visible: false,
			url:'whd.htm',
			bottom: 44,
			scalesPageToFit: true,
			width: Titanium.Platform.displayCaps.platformWidth,
			autoDetect: []
		});
		wvWHD.addEventListener('beforeload', function(evt) {
			if (Ti.Platform.osname != 'android') {
				winAction.winNav.add(indView);
			} 
			actInd.show();
		});
		wvWHD.addEventListener('load', function(evt) {
			actInd.hide();	
			if (Ti.Platform.osname != 'android') {
				winAction.winNav.remove(indView);
			} 	
			if (wvWHD.url == 'about:blank') {
				wvWHD.url = 'whd.htm';
			}
		});
		wvWHD.addEventListener('error', function(evt) {
			actInd.hide();	
			if (Ti.Platform.osname != 'android') {
				winAction.winNav.remove(indView);
			} 
			alert('Webpage not available.');
		});
		winAction.winNav.add(wvWHD);
		
		var btnBack = Ti.UI.createButton({
			backgroundImage: 'images/back_arrow.png',
			backgroundSelectedImage: 'images/back_arrow_disabled.png',
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
				url = 'osha.htm';
			} else {
				wv = wvWHD;
				url = 'whd.htm';
			}
			
			if (wv.canGoBack() == false && Ti.Platform.osname != 'android') {
				wv.url = url;
			} else {
				wv.goBack();	
			}
		});
		vwButtons.add(btnBack);
		
		btnForward = Ti.UI.createButton({
			backgroundImage: 'images/forward_arrow.png',
			backgroundSelectedImage: 'images/forward_arrow_disabled.png',
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
			winAction.winNav.add(vwButtons);
		
			vwToolbarBottom = Ti.UI.createView({
				bottom: 0, height: 44,
				backgroundImage: 'images/toolbar_background.png'
			});
			
			btnOSHA = Ti.UI.createLabel({
				text: 'OSHA',
				color: 'white',
				height: 34,
				width: 74,
				textAlign: 'center',
				font:{fontSize:'14dp', fontWeight:'bold'},
				backgroundImage: 'images/toolbar_button_74x34.png',
				backgroundSelectedImage: 'images/toolbar_button_74x34_pressed.png',
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
				font:{fontSize:'14dp', fontWeight:'bold'},
				backgroundImage: 'images/toolbar_button_74x34.png',
				backgroundSelectedImage: 'images/toolbar_button_74x34_pressed.png',
				center: Titanium.Platform.displayCaps.platformWidth/2 + 50
			});
			btnWHD.addEventListener('click', function() {
				wvOSHA.visible = false;
				wvWHD.visible = true;
			});
			vwToolbarBottom.add(btnWHD);
			
			winAction.winNav.add(vwToolbarBottom);
			
		} else {
			var buttonObjects = [
				{image:'images/osha_logo_small.png', width:65},
				{image:'images/whd_logo_small.png', width:65},
			];
			
			var tabBar = Titanium.UI.createTabbedBar({
				//labels:[{title: 'OSHA', width: 50},{title:'WHD',width:50}],
				labels: buttonObjects,
				style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
				//style: Titanium.UI.iPhone.SystemButtonStyle.BAR,
				backgroundColor: 'white',
				//backgroundColor: headerColor,
				index:0,
				height: 28,
				width: 'auto'
			});
			tabBar.addEventListener('click', function(evt){
				if (evt.index == 0) {
					//winAction.wvAction.url = 'osha.htm';
					wvOSHA.visible = true;
					wvWHD.visible = false;
				} else {
					//winAction.wvAction.url = 'whd.htm';
					wvOSHA.visible = false;
					wvWHD.visible = true;
				}
			});
			
			toolbarBottom = Titanium.UI.createToolbar({
				items:[flexSpace,tabBar,flexSpace],
				bottom:0,
				borderWidth: 0,
				//height: 44,
				barColor: headerColor
			});	
			winAction.winNav.add(toolbarBottom);
		}
		
		
		return winAction.winNav;
    }
    
	winAction.create = function() {
		
		winAction.win = Titanium.UI.createWindow({
			orientationModes: orientationModes,
			tabBarHidden: true,
			navBarHidden: Ti.Platform.osname == 'android' ? true : false,
			barColor: headerColor,
			backgroundColor: 'white',
			opacity: Ti.Platform.osname == 'android' ? 1 : 0,
		});	
		winAction.win.addEventListener('android:back', function() {
			winAction.win.close();
		});
		
		var wvOSHA = Ti.UI.createWebView({
			top: 44,
			url:'osha.htm',
			bottom: 44,
			scalesPageToFit: true,
			width: Titanium.Platform.displayCaps.platformWidth,
			autoDetect: [],
			visible: true
		});
		wvOSHA.addEventListener('beforeload', function(evt) {
			if (Ti.Platform.osname != 'android') {
				winAction.win.add(indView);
			} 
			actInd.show();
		});
		wvOSHA.addEventListener('load', function(evt) {
			actInd.hide();	
			if (Ti.Platform.osname != 'android') {
				winAction.win.remove(indView);
			} 
			if (wvOSHA.url == 'about:blank') {
				wvOSHA.url = 'osha.htm';
			}
		});
		wvOSHA.addEventListener('error', function(evt) {
			actInd.hide();	
			if (Ti.Platform.osname != 'android') {
				winAction.win.remove(indView);
			} 	
			alert('Webpage not available.');
		});
		winAction.win.add(wvOSHA);
		
		var wvWHD = Ti.UI.createWebView({
			top: 44,
			visible: false,
			url:'whd.htm',
			bottom: 44,
			scalesPageToFit: true,
			width: Titanium.Platform.displayCaps.platformWidth,
			autoDetect: []
		});
		wvWHD.addEventListener('beforeload', function(evt) {
			if (Ti.Platform.osname != 'android') {
				winAction.win.add(indView);
			} 
			actInd.show();
		});
		wvWHD.addEventListener('load', function(evt) {
			actInd.hide();	
			if (Ti.Platform.osname != 'android') {
				winAction.win.remove(indView);
			} 
			if (wvWHD.url == 'about:blank') {
				wvWHD.url = 'whd.htm';
			}
		});
		wvWHD.addEventListener('error', function(evt) {
			actInd.hide();	
			if (Ti.Platform.osname != 'android') {
				winAction.win.remove(indView);
			} 
			alert('Webpage not available.');
		});
		winAction.win.add(wvWHD);
		
		var vwButtons = Ti.UI.createView({
    		top: 0,
    		height: Ti.Platform.osname == 'android' ? 44 : null,
    		backgroundImage: Ti.Platform.osname == 'android' ? 'images/toolbar_background.png' : null
		});
		
    	var vwLogo = Ti.UI.createView({
			backgroundImage: 'images/dol_seal_small.png',
			width: 32,
			height: 32
		});
		
		var btnBack = Ti.UI.createButton({
			backgroundImage: 'images/back_arrow.png',
			backgroundSelectedImage: 'images/back_arrow_disabled.png',
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
				url = 'osha.htm';
			} else {
				wv = wvWHD;
				url = 'whd.htm';
			}
			
			if (wv.canGoBack() == false && Ti.Platform.osname != 'android') {
				wv.url = url;
			} else {
				wv.goBack();	
			}
			
		});
		vwButtons.add(btnBack);
		
		var btnForward = Ti.UI.createButton({
			backgroundImage: 'images/forward_arrow.png',
			backgroundSelectedImage: 'images/forward_arrow_disabled.png',
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
			winAction.win.add(vwButtons);
		
			vwToolbarBottom = Ti.UI.createView({
				bottom: 0, height: 44,
				backgroundImage: 'images/toolbar_background.png'
			});
			
			btnOSHA = Ti.UI.createLabel({
				text: 'OSHA',
				color: 'white',
				height: 34,
				width: 74,
				textAlign: 'center',
				font:{fontSize:'14dp', fontWeight:'bold'},
				backgroundImage: 'images/toolbar_button_74x34.png',
				backgroundSelectedImage: 'images/toolbar_button_74x34_pressed.png',
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
				font:{fontSize:'14dp', fontWeight:'bold'},
				backgroundImage: 'images/toolbar_button_74x34.png',
				backgroundSelectedImage: 'images/toolbar_button_74x34_pressed.png',
				center: Titanium.Platform.displayCaps.platformWidth/2 + 50
			});
			btnWHD.addEventListener('click', function() {
				wvOSHA.visible = false;
				wvWHD.visible = true;
			});
			vwToolbarBottom.add(btnWHD);
			
			winAction.win.add(vwToolbarBottom);
		} else {
			
			var btnHome = Titanium.UI.createButton({
				title: 'Home',
				style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
			});
			btnHome.addEventListener('click', function(evt){
				winAction.win.animate({opacity:0,duration:300});
				winHome.win.animate({opacity:1,duration:300});	
			
			});
			
			
			var toolbarTop = Titanium.UI.createToolbar({
				items:[btnHome,flexSpace,vwButtons,flexSpace,vwLogo],
				top:0,
				borderWidth: 0,
				//height: 44,
				barColor: headerColor
			});	
			winAction.win.add(toolbarTop);
			
			var buttonObjects = [
				{image:'images/osha_logo_small.png', width:65},
				{image:'images/whd_logo_small.png', width:65},
			];
			
			var tabBar = Titanium.UI.createTabbedBar({
				//labels:[{title: 'OSHA', width: 50},{title:'WHD',width:50}],
				labels: buttonObjects,
				style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
				//style: Titanium.UI.iPhone.SystemButtonStyle.BAR,
				backgroundColor: 'white',
				//backgroundColor: headerColor,
				index:0,
				height: 28,
				width: 'auto'
			});
			tabBar.addEventListener('click', function(evt){
				if (evt.index == 0) {
					//winAction.wvAction.url = 'osha.htm';
					wvOSHA.visible = true;
					wvWHD.visible = false;
				} else {
					//winAction.wvAction.url = 'whd.htm';
					wvOSHA.visible = false;
					wvWHD.visible = true;
				}
			});
			
			toolbarBottom = Titanium.UI.createToolbar({
				items:[flexSpace,tabBar,flexSpace],
				bottom:0,
				borderWidth: 0,
				//height: 44,
				barColor: headerColor
			});	
			winAction.win.add(toolbarBottom);
		}
		
		return winAction.win;
    }
    
})();

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