var winBizMap = {};

(function() {
    function helper() {
    }
    
	winBizMap.create = function(address, city, state) {
		winBizMap.vwButtons = Ti.UI.createView({
			top: 0,
    		height: Ti.Platform.osname == 'android' ? 44 : null,
    		backgroundImage: Ti.Platform.osname == 'android' ? 'images/toolbar_background.png' : null
		});
		
		winBizMap.win = Titanium.UI.createWindow({
			orientationModes: orientationModes,
			tabBarHidden: true,
			titleControl: winBizMap.vwButtons,
			backgroundColor: 'white',
			barColor: headerColor,
			navBarHidden: Ti.Platform.osname == 'android' ? true : false,
			left: Ti.Platform.osname == 'android' ? 0 : Titanium.Platform.displayCaps.platformWidth,
		});
		winBizMap.win.addEventListener('close', function() {	
			winDOLMap.win.barColor = headerColor;
		});
		winBizMap.win.addEventListener('android:back', function() {	
			winBizMap.win.close();
		});
		
		winBizMap.wvBizMap = Titanium.UI.createWebView({
			url: 'http://maps.google.com/maps?q=' + address + ',' + city + ',' + state,
		    top: Ti.Platform.osname == 'android' ? 44 : 0,
		    scalesPageToFit: true
		});
		winBizMap.wvBizMap.addEventListener('beforeload', function(evt) {
			if (Ti.Platform.osname != 'android') {
				winBizMap.win.add(indView);
			} 
			actInd.show();
		});
		winBizMap.wvBizMap.addEventListener('load', function(evt) {
			actInd.hide();	
			if (Ti.Platform.osname != 'android') {
				winBizMap.win.remove(indView);
			} 
			
		});
		winBizMap.wvBizMap.addEventListener('error', function(evt) {
			actInd.hide();	
			if (Ti.Platform.osname != 'android') {
				winBizMap.win.remove(indView);
			} 
			alert('Webpage not available.');
		});
		winBizMap.win.add(winBizMap.wvBizMap);
		
		winBizMap.btnBack = Ti.UI.createButton({
			backgroundImage: 'images/back_arrow.png',
			backgroundSelectedImage: 'images/back_arrow_disabled.png',
			//top: Ti.Platform.osname == 'android' ? null : 0,
			left: Ti.Platform.osname == 'android' ? null : 0,
			center: Ti.Platform.osname == 'android' ? Ti.Platform.displayCaps.platformWidth/2 - 50 : null,
			width: 50,
			height: 19,
			enabled: true
		});
		winBizMap.btnBack.addEventListener('click', function() {
			winBizMap.wvBizMap.goBack();
		});
		winBizMap.vwButtons.add(winBizMap.btnBack);
		
		winBizMap.btnForward = Ti.UI.createButton({
			backgroundImage: 'images/forward_arrow.png',
			backgroundSelectedImage: 'images/forward_arrow_disabled.png',
			enabled: true,
			//top: Ti.Platform.osname == 'android' ? null : 0,
			left: Ti.Platform.osname == 'android' ? null : winBizMap.btnBack.width + 25,
			center: Ti.Platform.osname == 'android' ? Ti.Platform.displayCaps.platformWidth/2 + 50 : null,
			width: 50,
			height: 19
		});
		winBizMap.btnForward.addEventListener('click', function() {
			winBizMap.wvBizMap.goForward();
		});
		winBizMap.vwButtons.add(winBizMap.btnForward);
		
		if (Ti.Platform.osname == 'android') {
			winBizMap.win.add(winBizMap.vwButtons);
		}
		return winBizMap.win;	
	}
	
})();