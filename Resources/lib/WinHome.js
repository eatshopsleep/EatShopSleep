function WinHome() {
	var app = require('/lib/globals');

	var self = Titanium.UI.createWindow({
		orientationModes: app.ORIENTATION_MODES,
		tabBarHidden: true,
		exitOnClose: true,
		barColor: app.HEADER_COLOR,
		navBarHidden: Ti.Platform.osname == 'android' ? true : false, 
		backgroundColor: 'white'
	});
	
	if (Ti.Platform.osname != 'android') {
		var imgEat = Titanium.UI.createImageView({
			image: '/images/food_yellow.png',
			width: 32,
			height: 32,
		});
		var imgShop = Titanium.UI.createImageView({
			image: '/images/retail_blue.png',
			width: 32,
			height: 32,
		});
		var imgSleep = Titanium.UI.createImageView({
			image: '/images/hospitality_purple.png',
			width: 32,
			height: 32,
		});
		var lblEat = Titanium.UI.createLabel({
			text: 'eat',
			color: 'white',
			height: 'auto',
			width: Ti.Platform.osname == 'android' ? 60 : 'auto',
			textAlign: 'center',
			font:app.Font.h1
		});
		var lblShop = Titanium.UI.createLabel({
			text: 'shop',
			color: 'white',
			height: 'auto',
			width: Ti.Platform.osname == 'android' ? 60 : 'auto',
			textAlign: 'center',
			font:app.Font.h1
		});
		var lblSleep = Titanium.UI.createLabel({
			text: 'sleep',
			color: 'white',
			height: 'auto',
			width: Ti.Platform.osname == 'android' ? 60 : 'auto',
			textAlign: 'center',
			font:app.Font.h1
		});
		var flexSpace = Titanium.UI.createButton({
			systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
		});
		var toolbarTop = Ti.UI.iOS.createToolbar({
			items:[flexSpace,imgEat,lblEat,imgShop,lblShop,imgSleep,lblSleep,flexSpace],
			top:0,
			borderWidth: 0,
			barColor: app.HEADER_COLOR
		});	
		self.add(toolbarTop);
	} else {
		
		self.add(createVwTitle());
		
	}
	
	var lbl = Ti.UI.createLabel({
		top: 0,
		height: 30,
		text: 'A good business is a fair and safe one',
		color: 'white',
		font:app.Font.h3,
		textAlign: 'center',
	});
	var subtitle = Ti.UI.createView({
		top: 44,
		height: 30,
		backgroundColor: 'black',
	});
	subtitle.add(lbl);
	self.add(subtitle);
	
	var imgAgencies = Titanium.UI.createImageView({
		image: '/images/dol_agencies.png',
		width: 120,
		height: 88,
		bottom: 10
	});
	self.add(imgAgencies);
	
	var tvMenu = Titanium.UI.createTableView({
		scrollable: false,
		top: subtitle.height + subtitle.top + 20,
		bottom: imgAgencies.height + imgAgencies.bottom,
		separatorColor: 'transparent',
	});
	tvMenu.addEventListener('click', function(evt) {
		if (Ti.App.Properties.getBool('disclaimerAgreed',false)) {
				
			switch (evt.index) {
	    		case 0:
	    			if(!Ti.Network.online) {
						alert('Network unavailable. Check your network settings.');
					} else {
						var WinSearch = require('/lib/WinSearch');
						app.winSearch = new WinSearch(); 
						WinSearch = null;
						
		    			if (Ti.Platform.osname == 'android') {
		    				app.winSearch.ui.open();
		    			} else {
		    				
							app.tabSearch1 = Titanium.UI.createTab({  
							    window:app.winSearch.ui
							});	
							app.tgSearch = Titanium.UI.createTabGroup({
								activeTab: app.tabSearch1,
								opacity: 0
							});
							app.tgSearch.addTab(app.tabSearch1);
							
							app.tgSearch.open();
							
							self.animate({opacity:0,duration:300});
							app.tgSearch.animate({opacity:1,duration:300});
		    			}
					}
	    			
	    			
	    			break;
	    		case 1:
	    			var WinTakeAction = require('/lib/WinTakeAction');
					app.winTakeAction = new WinTakeAction(false); 
					app.winTakeAction.ui.open();
					WinTakeAction = null;
					
	    			if (Ti.Platform.osname != 'android') {
						self.animate({opacity:0,duration:300});
						app.winTakeAction.ui.animate({opacity:1,duration:300});
					}
	    			break;
	    		case 2:
		    		var WinInfo = require('/lib/WinInfo');
					app.winInfo = new WinInfo(); 
					app.winInfo.ui.open();
					WinInfo = null;
					
					if (Ti.Platform.osname != 'android') {
						self.animate({opacity:0,duration:300});
						app.winInfo.ui.animate({opacity:1,duration:300});
					}
				
	    			break;
	    		
	    	}
				
			
		} else {
			if (Ti.Platform.osname == 'android') {
				winDisclaimer.create().open();		
			} else {
				winDisclaimer.create().open({modalTransitionStyle:Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,modalStyle:Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET});
				
			}
			
		}
	});
	self.add(tvMenu);
	
	var data = [];
	data.push(createMenuSelection('Search', '/images/search_yellow.png', '/images/search_yellow_pressed.png'));
	data.push(createMenuSelection('Take Action', '/images/action_blue.png', '/images/action_blue_pressed.png'));
	data.push(createMenuSelection('Info', '/images/info_purple.png', '/images/info_purple_pressed.png'));
	
	tvMenu.setData(data);
	
	this.ui = self;
	
	function createMenuSelection(menu_name, button_image, button_pressed_image) {
    	var vwMenu = Titanium.UI.createView({
			width: 'auto',
			height: 'auto',
			touchEnabled: false,
		});
		
		
		var btnMenu = Titanium.UI.createImageView({
			backgroundImage: button_image,
			width: 53,
			height: 53,
			left: Ti.Platform.osname =='android' ? 60 : 0,
			top: 10,
			bottom: 10,
			backgroundSelectedImage: button_pressed_image,
			touchEnabled: false,
		});
		
		var lblMenu = Titanium.UI.createLabel({
			text: menu_name,
			color: 'black',
			left: btnMenu.width + btnMenu.left + 10,
			top: 10,
			bottom: 10,
			width: 125,
			font:{fontSize: '18dp', fontWeight:'normal'},
			touchEnabled: false,
		});
		var rowMenu = Titanium.UI.createTableViewRow({
			hasChild: false,
			height: 'auto',
			selectedBackgroundColor: app.ROW_SELECTION_COLOR,
			classname: 'menu'
		});
		
		
		vwMenu.add(lblMenu);
		vwMenu.add(btnMenu);
		rowMenu.add(vwMenu);
		
		
		return rowMenu;
    }
    
    function createVwTitle() {
    	var imgEat = Titanium.UI.createImageView({
			image: '/images/food_yellow.png',
			width: 32,
			height: 32,
		});
		var imgShop = Titanium.UI.createImageView({
			image: '/images/retail_blue.png',
			width: 32,
			height: 32,
		});
		var imgSleep = Titanium.UI.createImageView({
			image: '/images/hospitality_purple.png',
			width: 32,
			height: 32,
		});
		var lblEat = Titanium.UI.createLabel({
			text: 'eat',
			color: 'white',
			height: 'auto',
			width: Ti.Platform.osname == 'android' ? 60 : 'auto',
			textAlign: 'center',
			font:app.Font.h1
		});
		var lblShop = Titanium.UI.createLabel({
			text: 'shop',
			color: 'white',
			height: 'auto',
			width: Ti.Platform.osname == 'android' ? 60 : 'auto',
			textAlign: 'center',
			font:app.Font.h1
		});
		var lblSleep = Titanium.UI.createLabel({
			text: 'sleep',
			color: 'white',
			height: 'auto',
			width: Ti.Platform.osname == 'android' ? 60 : 'auto',
			textAlign: 'center',
			font:app.Font.h1
		});
		
    	var width = imgEat.width + lblEat.width + imgShop.width + lblShop.width + imgSleep.width + lblSleep.width;
		var vwContainer = Titanium.UI.createView({
			top: 0,
			height: 44,
			layout: 'horizontal',
			width: width,
		});
		vwContainer.add(imgEat);
		vwContainer.add(lblEat);
		vwContainer.add(imgShop);
		vwContainer.add(lblShop);
		vwContainer.add(imgSleep);
		vwContainer.add(lblSleep);
		
		var vwTitle = Titanium.UI.createView({
			top: 0,
			left: 0,
			right: 0,
			height: 44,
			backgroundImage: '/images/toolbar_background.png',
		});
		vwTitle.add(vwContainer);
		
		return vwTitle;
    }
    this.createVwTitle = createVwTitle;
    
}
module.exports = WinHome;
