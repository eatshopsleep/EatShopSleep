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
		});
		
		var vwLogo = Ti.UI.createView({
			backgroundImage: 'dol_seal_small.png',
			width: 32,
			height: 32
		});
		
    	winAction.winNav = Titanium.UI.createWindow({
			orientationModes: orientationModes,
			barColor: headerColor,
			titleControl: vwButtons,
			backgroundColor: 'white',
			rightNavButton: vwLogo
		});	
		
		var wvOSHA = Ti.UI.createWebView({
			top: 0,
			url:'osha.htm',
			bottom: 44,
			scalesPageToFit: true,
			width: Titanium.Platform.displayCaps.platformWidth,
			autoDetect: [],
			visible: true
		});
		wvOSHA.addEventListener('beforeload', function(evt) {
			winAction.winNav.add(indView);
			actInd.show();
		});
		wvOSHA.addEventListener('load', function(evt) {
			winAction.winNav.remove(indView);	
		});
		wvOSHA.addEventListener('error', function(evt) {
			winAction.winNav.remove(indView);	
			alert('Webpage not available.');
		});
		winAction.winNav.add(wvOSHA);
		
		var wvWHD = Ti.UI.createWebView({
			top: 0,
			visible: false,
			url:'whd.htm',
			bottom: 44,
			scalesPageToFit: true,
			width: Titanium.Platform.displayCaps.platformWidth,
			autoDetect: []
		});
		wvWHD.addEventListener('beforeload', function(evt) {
			winAction.winNav.add(indView);
			actInd.show();
		});
		wvWHD.addEventListener('load', function(evt) {
			winAction.winNav.remove(indView);	
		});
		wvWHD.addEventListener('error', function(evt) {
			winAction.winNav.remove(indView);	
			alert('Webpage not available.');
		});
		winAction.winNav.add(wvWHD);
		
		var btnBack = Ti.UI.createButton({
			backgroundImage: 'back_arrow.png',
			//backgroundDisabledImage: 'back_arrow_disabled.png',
			top: 0,
			left: 0,
			width: 50,
			height: 19,
			enabled: true
		});
		btnBack.addEventListener('click', function() {
			var wv;
			if (wvOSHA.visible) {
				wv = wvOSHA;
			} else {
				wv = wvWHD;
			}
			
			if (!wv.canGoBack()) {
				wv.url = wv.url;
			}
			else {
				wv.goBack();	
			}
		});
		vwButtons.add(btnBack);
		
		btnForward = Ti.UI.createButton({
			backgroundImage: 'forward_arrow.png',
			//backgroundDisabledImage: 'forward_arrow_disabled.png',
			enabled: true,
			top: 0,
			left: btnBack.width + 25,
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
		
		var buttonObjects = [
			{image:'osha_logo_small.png', width:65},
			{image:'whd_logo_small.png', width:65},
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
		
		
		
		return winAction.winNav;
    }
    
	winAction.create = function() {
		
		winAction.win = Titanium.UI.createWindow({
			orientationModes: orientationModes,
			barColor: headerColor,
			//backgroundColor: '#CCCCCC'
			backgroundColor: 'white',
			opacity: 0
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
			winAction.win.add(indView);
			actInd.show();
		});
		wvOSHA.addEventListener('load', function(evt) {
			winAction.win.remove(indView);	
		});
		wvOSHA.addEventListener('error', function(evt) {
			winAction.win.remove(indView);	
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
			winAction.win.add(indView);
			actInd.show();
		});
		wvWHD.addEventListener('load', function(evt) {
			winAction.win.remove(indView);	
		});
		wvWHD.addEventListener('error', function(evt) {
			winAction.win.remove(indView);	
			alert('Webpage not available.');
		});
		winAction.win.add(wvWHD);
		
		
		
		var buttonObjects = [
			{image:'osha_logo_small.png', width:65},
			{image:'whd_logo_small.png', width:65},
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
		
		var btnHome = Titanium.UI.createButton({
			title: 'Home',
			style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
		});
		btnHome.addEventListener('click', function(evt){
			winAction.win.animate({opacity:0,duration:300});
			winHome.win.animate({opacity:1,duration:300});	
		
		});
		
		var vwButtons = Ti.UI.createView({
		});
		btnBack = Ti.UI.createButton({
			backgroundImage: 'back_arrow.png',
			//backgroundDisabledImage: 'back_arrow_disabled.png',
			top: 0,
			left: 0,
			width: 50,
			height: 19,
			//enabled: true
		});
		btnBack.addEventListener('click', function() {
			var wv;
			if (wvOSHA.visible) {
				wv = wvOSHA;
			} else {
				wv = wvWHD;
			}
			
			if (!wv.canGoBack()) {
				wv.url = wv.url;
			}
			else {
				wv.goBack();	
			}
			
		});
		vwButtons.add(btnBack);
		
		var btnForward = Ti.UI.createButton({
			backgroundImage: 'forward_arrow.png',
			//backgroundDisabledImage: 'forward_arrow_disabled.png',
			//enabled: true,
			top: 0,
			left: btnBack.width + 25,
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
		
		var vwLogo = Ti.UI.createView({
			backgroundImage: 'dol_seal_small.png',
			width: 32,
			height: 32
		});
		
		var toolbarTop = Titanium.UI.createToolbar({
			items:[btnHome,flexSpace,vwButtons,flexSpace,vwLogo],
			top:0,
			borderWidth: 0,
			//height: 44,
			barColor: headerColor
		});	
		winAction.win.add(toolbarTop);
		
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