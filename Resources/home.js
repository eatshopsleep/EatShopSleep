var winHome = {
	win: null,
};

(function() {
    function helper() {
        //help out
    }
    
    winHome.createMenuSelection = function(menu_name, button_image, button_pressed_image) {
    	
    	var vwMenu = Titanium.UI.createView({
			width: 'auto',
			height: 'auto',
		});
		var btnMenu = Titanium.UI.createButton({
			backgroundImage: button_image,
			width: 53,
			height: 53,
			left: Ti.Platform.osname =='android' ? 60 : 0,
			top: 10,
			bottom: 10,
			backgroundSelectedImage: button_pressed_image
		});
		btnMenu.addEventListener('click', function() {
			
			if (Ti.App.Properties.getBool('disclaimerAgreed',false)) {
				
				switch (menu_name) {
		    		case 'Search':
		    			if (Ti.Platform.osname == 'android') {
		    				winDOLMap.create().open();
		    			} else {
		    				if (!tgSearch) {
								tabSearch1 = Titanium.UI.createTab({  
								    window:winDOLMap.create()
								});	
								tgSearch = Titanium.UI.createTabGroup({
									activeTab: tabSearch1,
									opacity: 0
								});
								tgSearch.addTab(tabSearch1);
								
								tgSearch.open();
							}
							winHome.win.animate({opacity:0,duration:300});
							tgSearch.animate({opacity:1,duration:300});
		    			}
		    			
		    			break;
		    		case 'Take Action':
		    			if (Ti.Platform.osname == 'android') {
							winAction.create().open();		
						} else {
							if (!winAction.win) {
								winAction.create().open();	
							}
							winHome.win.animate({opacity:0,duration:300});
							winAction.win.animate({opacity:1,duration:300});
						}
		    			break;
		    		case 'Info':
			    		if (!winInfo.win) {
							if (Ti.Platform.osname == 'android') {
								winInfo.create().open();	
							} else {
								winInfo.create().open();
								winHome.win.animate({opacity:0,duration:300});
								winInfo.win.animate({opacity:1,duration:300});
							}
								
						} else {
							winHome.win.animate({opacity:0,duration:300});
							winInfo.win.animate({opacity:1,duration:300});
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
		var lblMenu = Titanium.UI.createLabel({
			text: menu_name,
			color: 'black',
			left: btnMenu.width + btnMenu.left + 10,
			top: 10,
			bottom: 10,
			width: 125,
			//font:{fontSize: Ti.Platform.osname == 'android' ? 20 : 18, fontWeight:'normal'},
			font:{fontSize: '18dp', fontWeight:'normal'},
		});
		var rowMenu = Titanium.UI.createTableViewRow({
			hasChild: false,
			height: 'auto',
			selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
			backgroundSelectedColor: 'white'
		});
		
		vwMenu.add(lblMenu);
		vwMenu.add(btnMenu);
		rowMenu.add(vwMenu);
		
		return rowMenu;
    }
    
    winHome.createVwTitle = function() {
    	var imgEat = Titanium.UI.createImageView({
			image: 'images/food_yellow.png',
			width: 32,
			height: 32,
			//left: 0
		});
		var imgShop = Titanium.UI.createImageView({
			image: 'images/retail_blue.png',
			width: 32,
			height: 32,
			//left: 0
		});
		var imgSleep = Titanium.UI.createImageView({
			image: 'images/hospitality_purple.png',
			width: 32,
			height: 32,
			//left: 0
		});
		var lblEat = Titanium.UI.createLabel({
			text: 'eat',
			color: 'white',
			height: 'auto',
			width: Ti.Platform.osname == 'android' ? 60 : 'auto',
			textAlign: 'center',
			font:{fontSize: '18dp', fontWeight:'bold'}
		});
		var lblShop = Titanium.UI.createLabel({
			text: 'shop',
			color: 'white',
			height: 'auto',
			width: Ti.Platform.osname == 'android' ? 60 : 'auto',
			textAlign: 'center',
			font:{fontSize: '18dp', fontWeight:'bold'}
		});
		var lblSleep = Titanium.UI.createLabel({
			text: 'sleep',
			color: 'white',
			height: 'auto',
			width: Ti.Platform.osname == 'android' ? 60 : 'auto',
			textAlign: 'center',
			font:{fontSize: '18dp', fontWeight:'bold'}
		});
		
    	var width = imgEat.width + lblEat.width + imgShop.width + lblShop.width + imgSleep.width + lblSleep.width;
		var vwContainer = Titanium.UI.createView({
			top: 0,
			height: 44,
			layout: 'horizontal',
			width: width,
			center: Titanium.Platform.displayCaps.platformWidth/2,
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
			backgroundImage: 'images/toolbar_background.png',
		});
		vwTitle.add(vwContainer);
		
		return vwTitle;
    }
    
	winHome.create = function() {
		
		winHome.win = Titanium.UI.createWindow({
			orientationModes: orientationModes,
			tabBarHidden: true,
			exitOnClose: true,
			barColor: headerColor,
			navBarHidden: Ti.Platform.osname == 'android' ? true : false, 
			//backgroundColor: '#CCCCCC'
			backgroundColor: 'white'
		});
		
		if (Ti.Platform.osname != 'android') {
			var imgEat = Titanium.UI.createImageView({
				image: 'images/food_yellow.png',
				width: 32,
				height: 32,
				//left: 0
			});
			var imgShop = Titanium.UI.createImageView({
				image: 'images/retail_blue.png',
				width: 32,
				height: 32,
				//left: 0
			});
			var imgSleep = Titanium.UI.createImageView({
				image: 'images/hospitality_purple.png',
				width: 32,
				height: 32,
				//left: 0
			});
			var lblEat = Titanium.UI.createLabel({
				text: 'eat',
				color: 'white',
				height: 'auto',
				width: Ti.Platform.osname == 'android' ? 60 : 'auto',
				textAlign: 'center',
				font:{fontSize: '18dp', fontWeight:'bold'}
			});
			var lblShop = Titanium.UI.createLabel({
				text: 'shop',
				color: 'white',
				height: 'auto',
				width: Ti.Platform.osname == 'android' ? 60 : 'auto',
				textAlign: 'center',
				font:{fontSize: '18dp', fontWeight:'bold'}
			});
			var lblSleep = Titanium.UI.createLabel({
				text: 'sleep',
				color: 'white',
				height: 'auto',
				width: Ti.Platform.osname == 'android' ? 60 : 'auto',
				textAlign: 'center',
				font:{fontSize: '18dp', fontWeight:'bold'}
			});
			var flexSpace = Titanium.UI.createButton({
				systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
			});
			var toolbarTop = Titanium.UI.createToolbar({
				items:[flexSpace,imgEat,lblEat,imgShop,lblShop,imgSleep,lblSleep,flexSpace],
				top:0,
				borderWidth: 0,
				barColor: headerColor
			});	
			winHome.win.add(toolbarTop);
		} else {
			
			winHome.win.add(winHome.createVwTitle());
			
		}
		
		var section = Ti.UI.createLabel({
			top: 44,
			left: 0,
			height: 30,
			width: Titanium.Platform.displayCaps.platformWidth,
			text: 'A good business is a fair and safe one',
			color: 'white',
			font:{fontSize: '16dp', fontWeight:'normal'},
			textAlign: 'center',
			backgroundColor: 'black',
		});
		winHome.win.add(section);
		
		var imgAgencies = Titanium.UI.createImageView({
			image: 'images/dol_agencies.png',
			width: 120,
			height: 88,
			bottom: 10
		});
		winHome.win.add(imgAgencies);
		
		var tvMenu = Titanium.UI.createTableView({
			scrollable: false,
			top: section.height + section.top + 20,
			bottom: imgAgencies.height + imgAgencies.bottom,
			separatorColor: 'transparent',

		});
		winHome.win.add(tvMenu);
		
		var data = [];
		data.push(winHome.createMenuSelection('Search', 'images/search_yellow.png', 'images/search_yellow_pressed.png'));
		data.push(winHome.createMenuSelection('Take Action', 'images/action_blue.png', 'images/action_blue_pressed.png'));
		data.push(winHome.createMenuSelection('Info', 'images/info_purple.png', 'images/info_purple_pressed.png'));
		
		tvMenu.setData(data);
		
		return winHome.win;
    }
    
})();