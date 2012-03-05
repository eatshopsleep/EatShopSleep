var winYelpBiz = {};

(function() {
    function helper() {
        //help out
    }
 
    winYelpBiz.create = function(mobile_url,hideNavOnClose) {
    	winYelpBiz.vwButtons = Ti.UI.createView({
    		top: 0,
    		height: Ti.Platform.osname == 'android' ? 44 : null,
    		backgroundImage: Ti.Platform.osname == 'android' ? 'images/toolbar_background.png' : null
		});
		
    	winYelpBiz.win = Titanium.UI.createWindow({
			orientationModes: orientationModes,
			tabBarHidden: true,
			titleControl: winYelpBiz.vwButtons,
			navBarHidden: Ti.Platform.osname == 'android' ? true : false,
			left: Ti.Platform.osname == 'android' ? 0 : Titanium.Platform.displayCaps.platformWidth,
			backgroundColor: 'white',
			barColor: headerColor
		});
		winYelpBiz.win.addEventListener('close', function() {	
			if (hideNavOnClose) {
				//winDOLMap.win.hideNavBar();
			}
			winDOLMap.win.barColor = headerColor;
		});
		winYelpBiz.win.addEventListener('android:back', function() {
			winYelpBiz.win.close();
		});
		
		winYelpBiz.btnBack = Ti.UI.createButton({
			backgroundImage: 'images/back_arrow.png',
			backgroundSelectedImage: 'images/back_arrow_disabled.png',
			left: Ti.Platform.osname == 'android' ? null : 0,
			center: Ti.Platform.osname == 'android' ? Ti.Platform.displayCaps.platformWidth/2 - 50 : null,
			width: 50,
			height: 19,
			enabled: true
		});
		winYelpBiz.btnBack.addEventListener('click', function() {
			winYelpBiz.wvYelpBizWebsite.goBack();
		});
		winYelpBiz.vwButtons.add(winYelpBiz.btnBack);
		
		winYelpBiz.btnForward = Ti.UI.createButton({
			backgroundImage: 'images/forward_arrow.png',
			backgroundSelectedImage: 'images/forward_arrow_disabled.png',
			enabled: true,
			left: Ti.Platform.osname == 'android' ? null : winYelpBiz.btnBack.width + 25,
			center: Ti.Platform.osname == 'android' ? Ti.Platform.displayCaps.platformWidth/2 + 50 : null,
			width: 50,
			height: 19
		});
		winYelpBiz.btnForward.addEventListener('click', function() {
			winYelpBiz.wvYelpBizWebsite.goForward();
		});
		winYelpBiz.vwButtons.add(winYelpBiz.btnForward);
		
		if (Ti.Platform.osname == 'android') {
			winYelpBiz.win.add(winYelpBiz.vwButtons);
		}
		
		winYelpBiz.wvYelpBizWebsite = Titanium.UI.createWebView({
			url: mobile_url,
		    top: Ti.Platform.osname == 'android' ? 44 : 0,
		    scalesPageToFit: true
		});
		winYelpBiz.wvYelpBizWebsite.addEventListener('beforeload', function(evt) {
			if (Ti.Platform.osname != 'android') {
				winYelpBiz.win.add(indView);
			} 
			actInd.show();
		});
		winYelpBiz.wvYelpBizWebsite.addEventListener('load', function(evt) {
			actInd.hide();	
			if (Ti.Platform.osname != 'android') {
				winYelpBiz.win.remove(indView);
			} 
		});
		winYelpBiz.wvYelpBizWebsite.addEventListener('error', function(evt) {
			actInd.hide();	
			if (Ti.Platform.osname != 'android') {
				winYelpBiz.win.remove(indView);
			} 
			alert('Webpage not available.');
		});
		winYelpBiz.win.add(winYelpBiz.wvYelpBizWebsite);
		
		return winYelpBiz.win;
    };
    
})();
