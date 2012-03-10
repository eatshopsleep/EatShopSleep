function WinFilter() {
	
	var checkBox, tbNameSearch, tbIndustry, pkrIndustry, tbSource, pkrSource, tbViolation, pkrViolation, tbDOLSource, pkrDOLSource, tbDOLArea, winWidth;
	
	var app = require('/lib/globals');
	var tempFilterSettings = {};
	for (var key in app.FilterSettings) {
		tempFilterSettings[key] = app.FilterSettings[key];
	}
	
	var btnCancel = Ti.UI.createButton({
		title:'Cancel'
	});
	btnCancel.addEventListener('click', function() {
		self.close();
		app.winFilter = null;
	});
	
	var btnGo = Ti.UI.createButton({
		title:'Go'
	});
	btnGo.addEventListener('click', function() {
		self.close();
		
		if (checkChanges() == true) {
			app.winSearch.update(app.FilterSettings.SearchName);	
		}
		app.winFilter = null;
		
	});
	
	var self = Ti.UI.createWindow({
		orientationModes: app.ORIENTATION_MODES,
		backgroundColor:'white',
		navBarHidden: Ti.Platform.osname == 'android' ? true : false,
		barColor: app.HEADER_COLOR,
		title: 'Filter',
		rightNavButton: btnGo,
		leftNavButton: btnCancel,
		modal: true
	});
	self.addEventListener('android:back', function() {
		
		if (checkChanges() == true) {
			app.winSearch.update(app.FilterSettings.SearchName);
				
		} 
		self.close();
		app.winFilter = null;
		
	});
	
	if (Ti.Platform.osname == 'ipad') {
		winWidth = 540;
	} else {
		winWidth = Titanium.Platform.displayCaps.platformWidth;
	}
	
	if (Ti.Platform.osname == 'android') {
		var vwTop = Ti.UI.createView({
			top: 0,
			left: 0,
			right: 0,
			height: 44,
			backgroundImage: '/images/toolbar_background.png',
		});
		var btnCancel = Ti.UI.createLabel({
			text: 'Cancel',
			color: 'white',
			left: 10,
			height: 34,
			width: 54,
			textAlign: 'center',
			font:app.Font.button1,
			backgroundImage: '/images/toolbar_button_54x34.png',
			backgroundSelectedImage: '/images/toolbar_button_54x34_pressed.png',
		});
		btnCancel.addEventListener('click', function() {
			self.close();
			app.winFilter = null;
		});
		vwTop.add(btnCancel);
		
		var lblHeader = Ti.UI.createLabel({
			text: 'Filter',
			color: 'white',
			height: 44,
			//left: 10,
			textAlign: 'center',
		    font:app.Font.h1
		});
		vwTop.add(lblHeader);
		
		var btnGo = Titanium.UI.createLabel({
			text: 'Go',
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
			if (checkChanges() == true) {
				app.winSearch.update(app.FilterSettings.SearchName);	
			}
			
			self.close();
			app.winFilter = null;
		});
		vwTop.add(btnGo);
		
		self.add(vwTop);	
	}
	
	var buttonWidthForTwo = Math.round((winWidth-20)/2);
	var buttonWidthForThree = Math.round((winWidth-20)/3);
	var buttonWidthForFour = Math.round((winWidth-20)/4);	
	
	var tableView = Titanium.UI.createTableView({
		backgroundColor:'white',
		separatorColor:'white',
		top: Ti.Platform.osname == 'android' ? 44 : 0,
		width: winWidth
	});
	self.add(tableView);
	
	tableView.appendRow(createHeaderRow('Business Name:'));
	
	var rowNameSearch = Titanium.UI.createTableViewRow({
		hasChild: false,
		height: 'auto',	
		selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
		backgroundSelectedColor: 'white'
	});
	
	var btnCancel = Titanium.UI.createButton({
		title: 'Cancel',
		style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});
	btnCancel.addEventListener('click', function(evt) {
		textSearch.blur();
	});
	
	var flexSpace = Titanium.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	var btnSearch = Ti.UI.createButton({
	    backgroundDisabledImage: '/images/magnifying_glass.png',
	    backgroundImage: '/images/magnifying_glass.png',
	    width: 14,
	    height: 15,
	    enabled: false
	});
	
	
	var textSearch = Titanium.UI.createTextField({
		clearButtonMode: Titanium.UI.INPUT_BUTTONMODE_ALWAYS,
		leftButton: btnSearch,
		leftButtonMode: Titanium.UI.INPUT_BUTTONMODE_ALWAYS,
		height: Ti.Platform.osname == 'android' ? 40 : 32,
		right: 10,
		left: 10,
		font:app.Font.input1,
		hintText: 'enter name',
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		returnKeyType: Titanium.UI.RETURNKEY_DONE,
		value: app.FilterSettings.SearchName
	});
	if (Ti.Platform.osname == 'iphone') {
		textSearch.keyboardToolbar = [flexSpace,btnCancel];
		textSearch.keyboardToolbarColor = 'gray';	
		textSearch.keyboardToolbarHeight = 40; 
	} 
	rowNameSearch.add(textSearch);
	
	
	tableView.appendRow(rowNameSearch);
	
	tableView.appendRow(createHeaderRow('Industry:'));
	
	var industryList = [
	{icon:'/images/yellow_bubble_blank.png',text:'Food',width: 21,height:34,top:0},
	{icon:'/images/blue_bubble_blank.png',text:'Retail',width: 21,height:34,top:0},
	{icon:'/images/purple_bubble_blank.png',text:'Hospitality',width: 21,height:34,top:0}];
	
	tableView.appendRow(createIconRow(buttonWidthForFour,industryList));
	
	var rowIndustryName = Ti.UI.createTableViewRow({
		hasChild:false,
		height:'auto',
		selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
		backgroundSelectedColor: 'white'
	});
	
	if (Ti.Platform.osname == 'android') {
		rowIndustryName.height = 40;
		var pickerList = [{title: 'Food', index: '0'}, {title: 'Retail', index: '1'}, {title: 'Hospitality', index: '2'}, {title: 'All', index: '3'}];
		pkrIndustry = Ti.UI.createPicker({
			top: 0,
			height: 40,
			selectionIndicator: true,
		});
		pkrIndustry.addEventListener('change', function(evt) {
			tempFilterSettings.Industry = evt.rowIndex;
		});
		
		var data = [];
		
		for (i in pickerList) {
			data[i] = Ti.UI.createPickerRow({title: pickerList[i].title});
		}

		pkrIndustry.add(data);
		pkrIndustry.setSelectedRow(0,app.FilterSettings.Industry);
		rowIndustryName.add(pkrIndustry);
		
		
	} else {
		
		tbIndustry = Ti.UI.iOS.createTabbedBar({
			top: 0,
			labels:[{title:'Food', width: buttonWidthForFour},
			 {title:'Retail',width: buttonWidthForFour},
			 {title:'Hospitality',width: buttonWidthForFour},
			 {title:'All',width: buttonWidthForFour}
			 ],
			backgroundColor: app.HEADER_COLOR,
			index:app.FilterSettings.Industry,
			style: Titanium.UI.iPhone.SystemButtonStyle.BAR
		});
		tbIndustry.addEventListener('click', function(evt) {
			tempFilterSettings.Industry = evt.index;
		});
		rowIndustryName.add(tbIndustry);
	}
	tableView.appendRow(rowIndustryName);
	
	tableView.appendRow(createHeaderRow('Source:'));
	
	var sourceList = [
	{icon:'/images/yellow_bubble_blank.png',text:'Dept of Labor',width: 21,height:34,top:0},
	{icon:'/images/yellow_bubble_yelp.png',text:'Yelp (local)',width: 17,height:26,top:8}];
	tableView.appendRow(createIconRow(buttonWidthForThree,sourceList) );
	
	var rowSourceName = Ti.UI.createTableViewRow({
		hasChild:false,
		height:'auto',
		selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
		backgroundSelectedColor: 'white'
	});
	
	
	if (Ti.Platform.osname == 'android') {
		rowSourceName.height = 40;
		var pickerList = [{title: 'Dept of Labor', index: '0'}, {title: 'Yelp (local)', index: '1'}, {title: 'Both', index: '2'}];
		pkrSource = Ti.UI.createPicker({
			top: 0,
			height: 40,
			selectionIndicator: true,
		});
		pkrSource.addEventListener('change', function(evt) {
			tempFilterSettings.Source = evt.rowIndex;
		});
		
		var data = [];
		
		for (i in pickerList) {
			data[i] = Ti.UI.createPickerRow({title: pickerList[i].title});
		}

		pkrSource.add(data);
		pkrSource.setSelectedRow(0,app.FilterSettings.Source);
		rowSourceName.add(pkrSource);
		
	} else {
		
		tbSource = Ti.UI.iOS.createTabbedBar({
			top: 0,
			labels:[{title:'Dept of Labor', width: buttonWidthForThree},
			{title:'Yelp (local)',width: buttonWidthForThree},
			{title:'Both',width: buttonWidthForThree}
			],
			backgroundColor: app.HEADER_COLOR,
			index:app.FilterSettings.Source,
			style: Titanium.UI.iPhone.SystemButtonStyle.BAR
		});
		tbSource.addEventListener('click', function(evt) {
			tempFilterSettings.Source = evt.index;
		});
		rowSourceName.add(tbSource);
	}
	tableView.appendRow(rowSourceName);
	
	tableView.appendRow(createHeaderRow('Dept of Labor Results:'));
	
	var inspectionList = [
	{icon:'/images/yellow_bubble_diamond.png',text:'Violations',width: 21,height:34,top:0},
	{icon:'/images/yellow_bubble_blank.png',text:'No Violations',width: 21,height:34,top:0}];
	tableView.appendRow(createIconRow(buttonWidthForThree,inspectionList) );
	
	var rowDOLViolations = Ti.UI.createTableViewRow({
		hasChild:false,
		height:'auto',
		selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
		backgroundSelectedColor: 'white'
	});
	
	if (Ti.Platform.osname == 'android') {
		rowDOLViolations.height = 40;
		var pickerList = [{title: 'Violations', index: '0'}, {title: 'No Violations', index: '1'}, {title: 'Both', index: '2'}];
		pkrViolation = Ti.UI.createPicker({
			top: 0,
			height: 40,
			selectionIndicator: true,
		});
		pkrViolation.addEventListener('change', function(evt) {
			tempFilterSettings.Inspections = evt.rowIndex;
		});
		
		var data = [];
		
		for (i in pickerList) {
			data[i] = Ti.UI.createPickerRow({title: pickerList[i].title});
		}

		pkrViolation.add(data);
		pkrViolation.setSelectedRow(0,app.FilterSettings.Inspections);
		rowDOLViolations.add(pkrViolation);
		
	} else {
		
		tbViolation = Ti.UI.iOS.createTabbedBar({
			top: 0,
			labels:[{title:'Violations', width: buttonWidthForThree},
			 {title:'No Violations',width: buttonWidthForThree},
			 {title:'Both',width: buttonWidthForThree}
			 ],
			backgroundColor: app.HEADER_COLOR,
			index:app.FilterSettings.Inspections,
			style: Titanium.UI.iPhone.SystemButtonStyle.BAR
		});
		tbViolation.addEventListener('click', function(evt) {
			tempFilterSettings.Inspections = evt.index;
		});
		rowDOLViolations.add(tbViolation);
	}
	tableView.appendRow(rowDOLViolations);
	
	tableView.appendRow(createHeaderRow('Dept of Labor Agencies:') );
	
	var rowDOLSource = Ti.UI.createTableViewRow({
		hasChild:false,
		height:'auto',
		selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
		backgroundSelectedColor: 'white'
	});
	
	if (Ti.Platform.osname == 'android') {
		rowDOLSource.height = 40;
		var pickerList = [{title: 'OSHA', index: '0'}, {title: 'WHD', index: '1'}, {title: 'Both', index: '2'}];
		pkrDOLSource = Ti.UI.createPicker({
			top: 0,
			height: 40,
			selectionIndicator: true,
		});
		pkrDOLSource.addEventListener('change', function(evt) {
			tempFilterSettings.DolSource = evt.rowIndex;
		});
		
		var data = [];
		
		for (i in pickerList) {
			data[i] = Ti.UI.createPickerRow({title: pickerList[i].title});
		}

		pkrDOLSource.add(data);
		pkrDOLSource.setSelectedRow(0,app.FilterSettings.DolSource);
		rowDOLSource.add(pkrDOLSource);
	} else {
		
		tbDOLSource = Ti.UI.iOS.createTabbedBar({
			top: 0,
			labels:[{title:'OSHA', width: buttonWidthForThree},
			 {title:'WHD',width: buttonWidthForThree},
			 {title:'Both',width: buttonWidthForThree}
			 ],
			backgroundColor: app.HEADER_COLOR,
			index:app.FilterSettings.DolSource,
			style: Titanium.UI.iPhone.SystemButtonStyle.BAR
		});
		tbDOLSource.addEventListener('click', function(evt) {
			tempFilterSettings.DolSource = evt.index;
		});
		rowDOLSource.add(tbDOLSource);
	}
	tableView.appendRow(rowDOLSource);
	
	this.ui = self;
	
	function trim(s) {
		s = s.replace(/(^\s*)|(\s*$)/gi,"");
		s = s.replace(/[ ]{2,}/gi," ");
		s = s.replace(/\n /,"\n");
		return s;
	}
	
	function checkChanges() {
		var filterSettingsChanged = false;
		
		textSearch.value = trim(textSearch.value);
		
		if (textSearch.value == '') {
			tempFilterSettings.SearchName = null;
		} else {
			tempFilterSettings.SearchName = textSearch.value;
		}
		
		for (var key in app.FilterSettings) {
			if (app.FilterSettings[key] != tempFilterSettings[key]) {
				filterSettingsChanged = true;
				app.FilterSettings[key] = tempFilterSettings[key];
				
			} 
		}
		
		return filterSettingsChanged;
	}
	
	function createIconRow(buttonWidth, iconImages) {
    	
        var rowSourceIcon = Ti.UI.createTableViewRow({
			hasChild:false,
			height:'auto',
			className: 'iconrow',
			selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
			backgroundSelectedColor: 'white'
		});
		
		var viewSource = Titanium.UI.createView({
			top: 0,
			height: 'auto',
			left: 10,
			width: winWidth-20,
			layout: Ti.Platform.osname == 'android' ? 'horizontal' : 'absolute'
		});	
		rowSourceIcon.add(viewSource);
		
		if (Ti.Platform.osname == 'android') {
			
			for (i in iconImages) {
				var imgSource = Ti.UI.createImageView({
					top: iconImages[i].top,
					image: iconImages[i].icon,
					width: iconImages[i].width,
					left: 10,
					height: iconImages[i].height
				});
				viewSource.add(imgSource);
				
				var lbl = Ti.UI.createLabel({
					left: 10,
					text:iconImages[i].text, 
					color: 'black',
					textAlign: 'center',
					font:app.Font.h3
				});
				viewSource.add(lbl);
			}
		} else {
			for (i in iconImages) {
				var imgSource = Ti.UI.createImageView({
					top: iconImages[i].top,
					image: iconImages[i].icon,
					width: buttonWidth,
					left: buttonWidth*i,
					height: iconImages[i].height
				});
				viewSource.add(imgSource);
			}
		}
		
		
        return rowSourceIcon;
    }
    
    function createHeaderRow(text) {
    	
    	var rowHeader = Ti.UI.createTableViewRow({
			hasChild:false,
			height: Ti.Platform.osname == 'android' ? 30 : 'auto',
			className: 'name',
			selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
			backgroundSelectedColor: 'white'
		});
		
		var lblHeader = Ti.UI.createLabel({
			text: text,
			color: 'black',
			top: Ti.Platform.osname == 'android' ? 0 : 10,
			bottom: 0,
			height: Ti.Platform.osname == 'android' ? 30 : 'auto',
			left: 10,
			textAlign: 'left',
		    font:app.Font.h2
		});
		rowHeader.add(lblHeader);
		
		return rowHeader;
    }
    
}
module.exports = WinFilter;
