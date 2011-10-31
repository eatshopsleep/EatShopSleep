var winOSHAReport = {};

(function() {
    function helper() {
        //help out
    }
 
    winOSHAReport.create = function(activity_nr) {
    	var vwButtons = Ti.UI.createView({
		});
		
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
			wvOSHAReport.goBack();
		});
		vwButtons.add(btnBack);
		
		var btnForward = Ti.UI.createButton({
			backgroundImage: 'forward_arrow.png',
			//backgroundDisabledImage: 'forward_arrow_disabled.png',
			enabled: true,
			top: 0,
			left: btnBack.width + 25,
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
			titleControl: vwButtons,
			left: Titanium.Platform.displayCaps.platformWidth,
			backgroundColor: 'white',
			barColor: headerColor
		});
		win.addEventListener('close', function() {	
			winDOLMap.win.barColor = headerColor;
		});
		
		var wvOSHAReport = Titanium.UI.createWebView({
			url: 'http://www.osha.gov/pls/imis/establishment.inspection_detail?id=' + activity_nr,
		    top: 0,
		    scalesPageToFit: true,
		    autoDetect: []
		});
		wvOSHAReport.addEventListener('beforeload', function(evt) {
			win.add(indView);
			actInd.show();
		});
		wvOSHAReport.addEventListener('load', function(evt) {
			win.remove(indView);	
		});
		wvOSHAReport.addEventListener('error', function(evt) {
			win.remove(indView)		
			alert('Webpage not available.');
		});
		win.add(wvOSHAReport);

		return win;
    };
    
})();