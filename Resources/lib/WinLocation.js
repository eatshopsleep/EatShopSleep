function WinLocation() {
	var app = require('/lib/globals');
	
	var btnClose = Ti.UI.createButton({
		title:'Close'
	});
	btnClose.addEventListener('click', function() {
		self.close();
		
		app.winLocation = null;
	});
	
    var self = Ti.UI.createWindow({
    	orientationModes: app.ORIENTATION_MODES,
		backgroundColor:'black',
		navBarHidden: Ti.Platform.osname == 'android' ? true : false,
		barColor: app.HEADER_COLOR,
		title: 'Map Location',
		rightNavButton: btnClose,
		modal: true
	});
	self.addEventListener('android:back', function(evt) {
		self.close();
		
		app.winLocation = null;
	});
	
	if (Ti.Platform.osname == 'android') {
		var vwTop = Ti.UI.createView({
			top: 0,
			left: 0,
			right: 0,
			height: 44,
			backgroundImage: '/images/toolbar_background.png',
		});
		
		var lblHeader = Ti.UI.createLabel({
			text: 'Map Location',
			color: 'white',
			height: 44,
			left: 10,
			textAlign: 'left',
		    font:app.Font.h1
		});
		vwTop.add(lblHeader);
		
		var btnGo = Titanium.UI.createLabel({
			text: 'Close',
			color: 'white',
			right: 10,
			height: 34,
			width: 54,
			textAlign: 'center',
			font:app.Font.button1,
			backgroundImage: '/images/toolbar_button_54x34.png',
			backgroundSelectedImage: '/images/toolbar_button_54x34_pressed.png',
		});
		btnGo.addEventListener('click', function(evt){
			self.close();
		
			app.winLocation = null;
		});
		vwTop.add(btnGo);
		
		self.add(vwTop);	
	}
	
	var vwLocation = Ti.UI.createView({
		height: 'auto',
		top: Ti.Platform.osname == 'android' ? 84 : 40,
		//width: Titanium.Platform.displayCaps.platformWidth-20
		width: self.width-20
	});
	
	var btnCurrentLocation = Ti.UI.createButton({
		title:'Use Current Location',
		backgroundImage: '/images/blue_button_200x38.png',
		backgroundSelectedImage: '/images/blue_button_200x38_pressed.png',
		top: 140,
		width:200,
		height:38,
		color: 'white',
		font:app.Font.button1
	});
	btnCurrentLocation.addEventListener('click',function(evt) {
		if(!Ti.Network.online) {
			alert('Network unavailable. Check your network settings.');
		} else {
			Ti.Geolocation.getCurrentPosition(function(evt){
				if (evt.error) {
					if (Titanium.Geolocation.locationServicesEnabled) {
						alert('Turn on Location Services');
					} else {
						Ti.UI.createAlertDialog({
				            title:'Current Location',
				            message:'Cannot Get Your Current Location.'
				        }).show();
					}
			        Ti.API.error('Geolocation error:' + evt.error);
				} else {
					self.close();
					app.CurrentLocation.latitude = evt.coords.latitude;
					app.CurrentLocation.longitude = evt.coords.longitude;
					Ti.App.fireEvent('setMapCenter',{lat: app.CurrentLocation.latitude, lon: app.CurrentLocation.longitude});
					
					app.winSearch.setLocalZoom();
					app.winSearch.update(app.FilterSettings.SearchName);	
					
					
					app.winLocation = null;
				}
			});
		}
	});
	vwLocation.add(btnCurrentLocation);
	
	var lblChooseLocation = Ti.UI.createLabel({
		text:'Enter a Location:',
		top: 0,
		height:38,
		textAlign:'center',
		color: 'white',
		font:app.Font.h2
	});
	vwLocation.add(lblChooseLocation);
	
	var btnMagnify = Ti.UI.createButton({
	    backgroundDisabledImage: '/images/magnifying_glass.png',
	    backgroundImage: '/images/magnifying_glass.png',
	    width: 14,
	    height: 15,
	    enabled: false
	});
	
	var txtLocation = Ti.UI.createTextField({
		clearButtonMode: Titanium.UI.INPUT_BUTTONMODE_ALWAYS,
		leftButton: btnMagnify,
		leftButtonMode: Titanium.UI.INPUT_BUTTONMODE_ALWAYS,
		height: Ti.Platform.osname == 'android' ? 40 : 32,
		width: 250,
		top: 38,
		font:app.Font.input1,
		returnKeyType: Titanium.UI.RETURNKEY_DONE,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		hintText: 'address, city, state, or zip',
		visible: true
	});
	vwLocation.add(txtLocation);
	
	var btnSearch = Ti.UI.createButton({
		title:'Search',
		backgroundImage: '/images/blue_button_200x38.png',
		backgroundSelectedImage: '/images/blue_button_200x38_pressed.png',
		top: 83,
		width:200,
		height:38,
		color: 'white',
		font:app.Font.button1
	});
	btnSearch.addEventListener('click', function() {
		if(!Ti.Network.online) {
			alert('Network unavailable. Check your network settings.');
		} else {
			Ti.App.fireEvent('geocode',{location: txtLocation.value});
		}
		
		// COMMENT UNTIL TITANIUM FIX
		/*
		Ti.Geolocation.forwardGeocoder(txtLocation.value,function(evt) {
			alert(evt.latitude + ', ' + evt.longitude);
			alert(evt.error);
			
			if (evt.error) {
                Ti.API.error("Geocoding Error: " + evt.error); 
                alert('Location not found. Try another.');
			}
			else {
				alert(evt.latitude + ', ' + evt.longitude);
				currentLocation.latitude = evt.latitude;
				currentLocation.longitude = evt.longitude;
				Ti.App.fireEvent('setMapCenter',{lat: currentLocation.latitude, lon: currentLocation.longitude});
				
				winDOLMap.googleMap.evalJS('setLocalZoom();');
				winMapFilter.update(FilterSettings.SearchName);	
				
				self.close();
			}
			
		});
		*/
	});
	vwLocation.add(btnSearch);
	
	self.add(vwLocation);

	this.ui = self;
}
module.exports = WinLocation;
