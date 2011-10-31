var winYelpBiz = {};

(function() {
    function helper() {
        //help out
    }
 
    winYelpBiz.create = function(mobile_url,hideNavOnClose) {
    	winYelpBiz.vwButtons = Ti.UI.createView({
		});
		
    	winYelpBiz.win = Titanium.UI.createWindow({
			orientationModes: orientationModes,
			tabBarHidden: true,
			titleControl: winYelpBiz.vwButtons,
			left: Titanium.Platform.displayCaps.platformWidth,
			backgroundColor: 'white',
			barColor: headerColor
		});
		winYelpBiz.win.addEventListener('close', function() {	
			if (hideNavOnClose) {
				//winDOLMap.win.hideNavBar();
			}
			winDOLMap.win.barColor = headerColor;
		});
		
    	
		
		winYelpBiz.btnBack = Ti.UI.createButton({
			backgroundImage: 'back_arrow.png',
			//backgroundDisabledImage: 'back_arrow_disabled.png',
			top: 0,
			left: 0,
			width: 50,
			height: 19,
			enabled: true
		});
		winYelpBiz.btnBack.addEventListener('click', function() {
			winYelpBiz.wvYelpBizWebsite.goBack();
		});
		winYelpBiz.vwButtons.add(winYelpBiz.btnBack);
		
		winYelpBiz.btnForward = Ti.UI.createButton({
			backgroundImage: 'forward_arrow.png',
			//backgroundDisabledImage: 'forward_arrow_disabled.png',
			enabled: true,
			top: 0,
			left: winYelpBiz.btnBack.width + 25,
			width: 50,
			height: 19
		});
		winYelpBiz.btnForward.addEventListener('click', function() {
			winYelpBiz.wvYelpBizWebsite.goForward();
		});
		winYelpBiz.vwButtons.add(winYelpBiz.btnForward);
		
		winYelpBiz.wvYelpBizWebsite = Titanium.UI.createWebView({
			url: mobile_url,
		    top: 0,
		    scalesPageToFit: true
		});
		winYelpBiz.wvYelpBizWebsite.addEventListener('beforeload', function(evt) {
			winYelpBiz.win.add(indView);
			actInd.show();
		});
		winYelpBiz.wvYelpBizWebsite.addEventListener('load', function(evt) {
			winYelpBiz.win.remove(indView);	
		});
		winYelpBiz.wvYelpBizWebsite.addEventListener('error', function(evt) {
			winYelpBiz.win.remove(indView);		
			alert('Webpage not available.');
		});
		winYelpBiz.win.add(winYelpBiz.wvYelpBizWebsite);
		
		return winYelpBiz.win;
    };
    
})();
