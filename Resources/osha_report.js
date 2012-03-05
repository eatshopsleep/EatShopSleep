var winOSHAReport = {};

(function() {
    function helper() {
        //help out
    }
 
    winOSHAReport.create = function(activity_nr) {
    	
    	var vwButtons = Ti.UI.createView({
    		top: 0,
    		height: Ti.Platform.osname == 'android' ? 44 : null,
    		backgroundImage: 'images/toolbar_background.png'
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
			wvOSHAReport.goBack();
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
			wvOSHAReport.goForward();
		});
		vwButtons.add(btnForward);
		
		var win = Titanium.UI.createWindow({
			orientationModes: orientationModes,
			tabBarHidden: true,
			navBarHidden: Ti.Platform.osname == 'android' ? true : false,
			left: Ti.Platform.osname == 'android' ? 0 : Titanium.Platform.displayCaps.platformWidth,
			titleControl: Ti.Platform.osname == 'android' ? null : vwButtons,
			backgroundColor: 'white',
			barColor: headerColor
		});
		win.addEventListener('close', function() {	
			winDOLMap.win.barColor = headerColor;
		});
		win.addEventListener('android:back', function() {	
			win.close();
		});
		
		if (Ti.Platform.osname == 'android') {
			win.add(vwButtons);
		}
		
		var wvOSHAReport = Titanium.UI.createWebView({
			url: 'http://www.osha.gov/pls/imis/establishment.inspection_detail?id=' + activity_nr,
		    top: Ti.Platform.osname == 'android' ? 44 : 0,
		    bottom: 0,
		    scalesPageToFit: true,
		    autoDetect: []
		});
		wvOSHAReport.addEventListener('beforeload', function(evt) {
			if (Ti.Platform.osname != 'android') {
				win.add(indView);	
			} 
			actInd.show();
		});
		wvOSHAReport.addEventListener('load', function(evt) {
			actInd.hide();	
			if (Ti.Platform.osname != 'android') {
				win.remove(indView);	
			} 
		});
		wvOSHAReport.addEventListener('error', function(evt) {
			actInd.hide();	
			if (Ti.Platform.osname != 'android') {
				win.remove(indView);	
			} 	
			alert('Webpage not available.');
		});
		win.add(wvOSHAReport);

		return win;
    };
    
})();