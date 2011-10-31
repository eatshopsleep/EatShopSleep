var winBizMap = {};

(function() {
    function helper() {
    }
    
	winBizMap.create = function(address, city, state) {
		winBizMap.vwButtons = Ti.UI.createView({
		});
		
		winBizMap.win = Titanium.UI.createWindow({
			orientationModes: orientationModes,
			tabBarHidden: true,
			titleControl: winBizMap.vwButtons,
			left: Titanium.Platform.displayCaps.platformWidth,
			backgroundColor: 'white',
			barColor: headerColor
		});
		winBizMap.win.addEventListener('close', function() {	
			winDOLMap.win.barColor = headerColor;
		});
		
		winBizMap.wvBizMap = Titanium.UI.createWebView({
			url: 'http://maps.google.com/maps?q=' + address + ',' + city + ',' + state,
		    top: 0,
		    scalesPageToFit: true
		});
		winBizMap.wvBizMap.addEventListener('beforeload', function(evt) {
			winBizMap.win.add(indView);
			actInd.show();
		});
		winBizMap.wvBizMap.addEventListener('load', function(evt) {
			winBizMap.win.remove(indView);
		});
		winBizMap.wvBizMap.addEventListener('error', function(evt) {
			winBizMap.win.remove(indView);	
			alert('Webpage not available.');
		});
		
		winBizMap.win.add(winBizMap.wvBizMap);
		
		winBizMap.btnBack = Ti.UI.createButton({
			backgroundImage: 'back_arrow.png',
			//backgroundDisabledImage: 'back_arrow_disabled.png',
			top: 0,
			left: 0,
			width: 50,
			height: 19,
			enabled: true
		});
		winBizMap.btnBack.addEventListener('click', function() {
			winBizMap.wvBizMap.goBack();
		});
		winBizMap.vwButtons.add(winBizMap.btnBack);
		
		winBizMap.btnForward = Ti.UI.createButton({
			backgroundImage: 'forward_arrow.png',
			//backgroundDisabledImage: 'forward_arrow_disabled.png',
			enabled: true,
			top: 0,
			left: winBizMap.btnBack.width + 25,
			width: 50,
			height: 19
		});
		winBizMap.btnForward.addEventListener('click', function() {
			winBizMap.wvBizMap.goForward();
		});
		winBizMap.vwButtons.add(winBizMap.btnForward);
		
		
		
		
		
		return winBizMap.win;	
	}
	
})();