var winHome = {
	win: null
};

(function() {
    function helper() {
        //help out
    }
    
	winHome.create = function() {
		
		var vwTitle = Ti.UI.createView({
			width: 'auto'
		});
		
		var imgEat = Titanium.UI.createImageView({
			image: 'food_yellow.png',
			width: 32,
			height: 32,
			left: 0
		});
		var imgShop = Titanium.UI.createImageView({
			image: 'retail_blue.png',
			width: 32,
			height: 32,
			left: 0
		});
		var imgSleep = Titanium.UI.createImageView({
			image: 'hospitality_purple.png',
			width: 32,
			height: 32,
			left: 0
		});
		
		winHome.win = Titanium.UI.createWindow({
			orientationModes: orientationModes,
			tabBarHidden: true,
			exitOnClose: true,
			barColor: headerColor,
			//backgroundColor: '#CCCCCC'
			backgroundColor: 'white'
		});
		
		var lblEat = Titanium.UI.createLabel({
			text: 'eat',
			color: 'white',
			height: 'auto',
			width: 'auto',
			textAlign: 'center',
			font:{fontSize:18, fontWeight:'bold'}
		});
		var lblShop = Titanium.UI.createLabel({
			text: 'shop',
			color: 'white',
			height: 'auto',
			width: 'auto',
			textAlign: 'center',
			font:{fontSize:18, fontWeight:'bold'}
		});
		var lblSleep = Titanium.UI.createLabel({
			text: 'sleep',
			color: 'white',
			height: 'auto',
			width: 'auto',
			textAlign: 'center',
			font:{fontSize:18, fontWeight:'bold'}
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
		
		var section = Ti.UI.createLabel({
			left:0,
			top:44,
			width: Titanium.Platform.displayCaps.platformWidth,
			height: 30,
			text: 'A good business is a fair and safe one',
			color: 'white',
			backgroundColor:'black',
			font:{fontSize:14, fontWeight:'normal'},
			textAlign: 'center'
		});
		winHome.win.add(section);
		
		var imgAgencies = Titanium.UI.createImageView({
			image: 'dol_agencies.png',
			width: 120,
			height: 88,
			bottom: 10
		});
		winHome.win.add(imgAgencies);
		
		var tvMenu = Titanium.UI.createTableView({
			//backgroundColor: 'gray',
			scrollable: false,
			top: section.height + section.top + 20,
			bottom: imgAgencies.height + imgAgencies.bottom,
			separatorColor: 'transparent',
			//backgroundColor: 'gray'
			backgroundColor: 'transparent'
		});
		winHome.win.add(tvMenu);
		
		var vwSearch = Titanium.UI.createView({
			width: 'auto',
			height: 'auto'
		});
		var btnSearch = Titanium.UI.createButton({
			backgroundImage:'search_yellow.png',
			width: 53,
			height: 53,
			left: 0,
			top: 10,
			bottom: 10,
			touchEnabled: false
		});
		var lblSearch = Titanium.UI.createLabel({
			text: 'Search',
			color: 'black',
			left: btnSearch.width + btnSearch.left + 10,
			top: 10,
			bottom: 10,
			width: 125,
			font:{fontSize:18, fontWeight:'normal'}
		});
		var rowSearch = Titanium.UI.createTableViewRow({
			hasChild: false,
			height: 'auto'	
		});
		rowSearch.addEventListener('click',function(evt) {
			if (Ti.App.Properties.getBool('disclaimerAgreed',false)) {
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
			else {
				winDisclaimer.create().open({modal:true,modalTransitionStyle:Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,modalStyle:Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET,navBarHidden:true});
			}
		});
		vwSearch.add(lblSearch);
		vwSearch.add(btnSearch);
		rowSearch.add(vwSearch);
		tvMenu.appendRow(rowSearch);
		
		var vwAction = Titanium.UI.createView({
			width: 'auto',
			height: 'auto'
		});
		var btnAction = Titanium.UI.createButton({
			backgroundImage:'action_blue.png',
			width: 53,
			height: 53,
			left: 0,
			top: 10,
			bottom: 10,
			touchEnabled: false
		});
		var lblAction = Titanium.UI.createLabel({
			text: 'Take Action',
			color: 'black',
			left: btnSearch.width + btnSearch.left + 10,
			top: 10,
			bottom: 10,
			width: 125,
			font:{fontSize:18, fontWeight:'normal'}
		});
		var rowAction = Titanium.UI.createTableViewRow({
			hasChild: false,
			height: 'auto'	
		});
		rowAction.addEventListener('click',function(evt) {
			if (Ti.App.Properties.getBool('disclaimerAgreed',false)) {
				if (!winAction.win) {
					winAction.create().open();	
				}
				winHome.win.animate({opacity:0,duration:300});
				winAction.win.animate({opacity:1,duration:300});
				
			}
			else {
				winDisclaimer.create().open({modal:true,modalTransitionStyle:Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,modalStyle:Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET,navBarHidden:true});
			}
		});
		vwAction.add(lblAction);
		vwAction.add(btnAction);
		rowAction.add(vwAction);
		tvMenu.appendRow(rowAction);
		
		var vwInfo = Titanium.UI.createView({
			width: 'auto',
			height: 'auto'
		});
		var btnInfo = Titanium.UI.createButton({
			backgroundImage:'info_purple.png',
			width: 53,
			height: 53,
			left: 0,
			top: 10,
			bottom: 10,
			touchEnabled: false
		});
		var lblInfo = Titanium.UI.createLabel({
			text: 'Info',
			color: 'black',
			left: btnSearch.width + btnSearch.left + 10,
			top: 10,
			bottom: 10,
			width: 125,
			font:{fontSize:18, fontWeight:'normal'}
		});
		var rowInfo = Titanium.UI.createTableViewRow({
			hasChild: false,
			height: 'auto'	
		});
		rowInfo.addEventListener('click',function(evt) {
			if (Ti.App.Properties.getBool('disclaimerAgreed',false)) {
				if (!winInfo.win) {
					winInfo.create().open();	
				}
				winHome.win.animate({opacity:0,duration:300});
				winInfo.win.animate({opacity:1,duration:300});
				
			}
			else {
				winDisclaimer.create().open({modal:true,modalTransitionStyle:Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,modalStyle:Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET,navBarHidden:true});
			}
			
		});
		vwInfo.add(lblInfo);
		vwInfo.add(btnInfo);
		rowInfo.add(vwInfo);
		tvMenu.appendRow(rowInfo);
		
		
		/*
		var vwDisclaimer = Ti.UI.createView({
			backgroundColor:'black',
			opacity:0,
			height:460,
			width:320
		});
		winHome.win.add(vwDisclaimer);
		
		var btnAccept = Ti.UI.createButton({
			style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
			title:'Accept'
		});
		btnAccept.addEventListener('click', function(evt){
			vwDisclaimer.animate({opacity:0,duration:300});
			//winHome.win.remove(vwDisclaimer);
		});
		var btnExit = Ti.UI.createButton({
			style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
			title:'Exit'
		});
		btnExit.addEventListener('click', function(evt){
			tgSearch.close();
			winAction.win.close();
			winInfo.win.close();
			winHome.win.close();
		});
		
		var tbDisclaimer = Ti.UI.createToolbar({
			items:[flexSpace,btnAccept,btnExit],
			top:0,
			borderWidth: 0,
			barColor: headerColor
		});
		vwDisclaimer.add(tbDisclaimer);
		
		vwDisclaimer.animate({opacity:1,duration:300});
		*/
		return winHome.win;
    }
    
})();