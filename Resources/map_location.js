
var winMapLocation = {};

(function() {
    function helper() {
        //help out
    }
 
    winMapLocation.create = function() {
	    
	    var btnClose = Ti.UI.createButton({
			title:'Close'
		});
		btnClose.addEventListener('click', function() {
			win.close();
		});
		
	    var win = Ti.UI.createWindow({
	    	orientationModes: orientationModes,
			backgroundColor:'black',
			navBarHidden: false,
			barColor: headerColor,
			title: 'Map Location',
			leftNavButton: btnClose
		});
		
		var vwLocation = Ti.UI.createView({
			height: 'auto',
			top: 40,
			//width: Titanium.Platform.displayCaps.platformWidth-20
			width: win.width-20
		});
		
		var btnCurrentLocation = Ti.UI.createButton({
			title:'Use Current Location',
			backgroundImage: 'blue_button.png',
			backgroundSelectedImage: 'blue_button_highlight.png',
			top: 0,
			width:200,
			height:38,
			color: 'white',
			font:{fontSize:14,fontWeight:'bold'}
		});
		btnCurrentLocation.addEventListener('click',function(evt) {
			//alert(Ti.Geolocation.locationServicesEnabled);
			Ti.Geolocation.getCurrentPosition(function(evt){
				if (evt.error) {
					if (Titanium.Geolocation.locationServicesEnabled) {
						alert('Turn on Location Services');
					}
					else {
						Ti.UI.createAlertDialog({
				            title:'Current Location',
				            message:'Cannot Get Your Current Location.'
				        }).show();
					}
			        Ti.API.error('Geolocation error:' + evt.error);
				}
				else {

					currentLocation.latitude = evt.coords.latitude;
					currentLocation.longitude = evt.coords.longitude;
					Ti.App.fireEvent('setMapCenter',{lat: currentLocation.latitude, lon: currentLocation.longitude});
					
					winDOLMap.googleMap.evalJS('setLocalZoom();');
					winMapFilter.update(FilterSettings.SearchName);	
					
					win.close();
					
				}
			});
			
		});
		vwLocation.add(btnCurrentLocation);
		
		var lblChooseLocation = Ti.UI.createLabel({
			text:'Or Enter a Location:',
			top: 50,
			height:38,
			textAlign:'center',
			color: 'white',
			font:{fontSize:14,fontWeight:'bold'}
		});
		vwLocation.add(lblChooseLocation);
		
		var btnSearch = Ti.UI.createButton({
		    backgroundDisabledImage: 'magnifying_glass.png',
		    backgroundImage: 'magnifying_glass.png',
		    width: 14,
		    height: 15,
		    enabled: false
		});
		
		var txtLocation = Ti.UI.createTextField({
			clearButtonMode: Titanium.UI.INPUT_BUTTONMODE_ALWAYS,
			leftButton: btnSearch,
			leftButtonMode: Titanium.UI.INPUT_BUTTONMODE_ALWAYS,
			height:32,
			width: 225,
			top: 90,
			font:{fontSize:13},
			returnKeyType: Titanium.UI.RETURNKEY_DONE,
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
			hintText: 'address, city, state, or zip',
			visible: true
		});
		txtLocation.addEventListener('return',function(evt){
			Ti.Geolocation.forwardGeocoder(txtLocation.value,function(evt) {
				if (evt.error) {
	                Ti.API.error("Geocoding Error: " + evt.error); 
	                alert('Location not found. Try another.');
				}
				else {
					
					currentLocation.latitude = evt.latitude;
					currentLocation.longitude = evt.longitude;
					Ti.App.fireEvent('setMapCenter',{lat: currentLocation.latitude, lon: currentLocation.longitude});
					
					winDOLMap.googleMap.evalJS('setLocalZoom();');
					winMapFilter.update(FilterSettings.SearchName);	
					
					win.close();
				}
			});
		});
		vwLocation.add(txtLocation);
		
		win.add(vwLocation);
    
    
    	return win;	
    }
    
})();