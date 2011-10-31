Ti.include('FilterSettings.js');

var winMapFilter = {
	
};

(function() {
	var tbIndustry, tbSource, tbViolation, tbDOLSource, tbDOLArea, win, winWidth;
	
	function sourceOSHA(name,ll) {
		var where = '';
		
		switch (FilterSettings.Inspections) {
		case FilterSettings.INSPECTIONS_VIOLATIONS:
			where = 'osha_violation_indicator = 1';
			break;
		case FilterSettings.INSPECTIONS_NOVIOLATIONS:
			where = 'osha_violation_indicator = 0';
			break;
		case FilterSettings.INSPECTIONS_ALL:
			where = '';
			break;	
		}
		
		if (name) {
			name = name.replace(/'/g,"\\\\'");
			name = "estab_name CONTAINS IGNORING CASE \'" + name + "\'";
			if (where != '') {
				where = where + ' AND ' + name;	
			}
			else {
				where = name;
			}
			
		} 
		
		switch (FilterSettings.Industry) {
		case FilterSettings.INDUSTRY_FOOD:
			winDOLMap.googleMap.evalJS('setLayerOSHAFood(\"' + where + '\");');
			if (name) {
				winDOLMap.wvDolList.evalJS('setLayerOSHAFood(\"' + where + '\",\"' + '' + '\");');
			} else {
				winDOLMap.wvDolList.evalJS('setLayerOSHAFood(\"' + where + '\",\"' + ll + '\");');
			}
			break;	
		case FilterSettings.INDUSTRY_RETAIL:
			winDOLMap.googleMap.evalJS('setLayerOSHARetail(\"' + where + '\");');
			if (name) {
				winDOLMap.wvDolList.evalJS('setLayerOSHARetail(\"' + where + '\",\"' + '' + '\");');
			} else {
				winDOLMap.wvDolList.evalJS('setLayerOSHARetail(\"' + where + '\",\"' + ll + '\");');
			}
			break;
		case FilterSettings.INDUSTRY_HOSPITALITY:
			winDOLMap.googleMap.evalJS('setLayerOSHAHospitality(\"' + where + '\");');
			if (name) {
				winDOLMap.wvDolList.evalJS('setLayerOSHAHospitality(\"' + where + '\",\"' + '' + '\");');
			} else {
				winDOLMap.wvDolList.evalJS('setLayerOSHAHospitality(\"' + where + '\",\"' + ll + '\");');
			}
			break;
		case FilterSettings.INDUSTRY_ALL:
			/*
			winDOLMap.googleMap.evalJS('setLayerOSHAFood(\"' + where + '\");');
			winDOLMap.googleMap.evalJS('setLayerOSHARetail(\"' + where + '\");');
			winDOLMap.googleMap.evalJS('setLayerOSHAHospitality(\"' + where + '\");');
			*/
			winDOLMap.googleMap.evalJS('setLayerOSHAFull(\"' + where + '\");');
			
			if (name) {
				winDOLMap.wvDolList.evalJS('setLayerOSHAFood(\"' + where + '\",\"' + '' + '\");');
				winDOLMap.wvDolList.evalJS('setLayerOSHARetail(\"' + where + '\",\"' + '' + '\");');
				winDOLMap.wvDolList.evalJS('setLayerOSHAHospitality(\"' + where + '\",\"' + '' + '\");');
			} else {
				winDOLMap.wvDolList.evalJS('setLayerOSHAFood(\"' + where + '\",\"' + ll + '\");');
				winDOLMap.wvDolList.evalJS('setLayerOSHARetail(\"' + where + '\",\"' + ll + '\");');
				winDOLMap.wvDolList.evalJS('setLayerOSHAHospitality(\"' + where + '\",\"' + ll + '\");');
			}
			break;
		}
	}
	
	function sourceWHD(name,ll) {
		var where = '';
		
		switch (FilterSettings.Inspections) {
		case FilterSettings.INSPECTIONS_VIOLATIONS:
			where = 'whd_violation_indicator = 1';
			break;
		case FilterSettings.INSPECTIONS_NOVIOLATIONS:
			where = 'whd_violation_indicator = 0';
			break;
		case FilterSettings.INSPECTIONS_ALL:
			where = '';
			break;	
		}
		
		if (name) {
			name = name.replace(/'/g,"\\\\'");
			name = "trade_nm CONTAINS IGNORING CASE \'" + name + "\'";
			if (where != '') {
				where = where + ' AND ' + name;	
			}
			else {
				where = name;
			}
			
		} 
		
		switch (FilterSettings.Industry) {
		case FilterSettings.INDUSTRY_FOOD:
			winDOLMap.googleMap.evalJS('setLayerWHDFood(\"' + where + '\");');
			if (name) {
				winDOLMap.wvDolList.evalJS('setLayerWHDFood(\"' + where + '\",\"' + '' + '\");');
			} else {
				winDOLMap.wvDolList.evalJS('setLayerWHDFood(\"' + where + '\",\"' + ll + '\");');
			}
			break;	
		case FilterSettings.INDUSTRY_RETAIL:
			winDOLMap.googleMap.evalJS('setLayerWHDRetail(\"' + where + '\");');
			if (name) {
				winDOLMap.wvDolList.evalJS('setLayerWHDRetail(\"' + where + '\",\"' + '' + '\");');
			} else {
				winDOLMap.wvDolList.evalJS('setLayerWHDRetail(\"' + where + '\",\"' + ll + '\");');
			}
			break;
		case FilterSettings.INDUSTRY_HOSPITALITY:
			winDOLMap.googleMap.evalJS('setLayerWHDHospitality(\"' + where + '\");');
			if (name) {
				winDOLMap.wvDolList.evalJS('setLayerWHDHospitality(\"' + where + '\",\"' + '' + '\");');
			} else {
				winDOLMap.wvDolList.evalJS('setLayerWHDHospitality(\"' + where + '\",\"' + ll + '\");');
			}
			break;
		case FilterSettings.INDUSTRY_ALL:
			/*
			winDOLMap.googleMap.evalJS('setLayerWHDFood(\"' + where + '\");');
			winDOLMap.googleMap.evalJS('setLayerWHDRetail(\"' + where + '\");');
			winDOLMap.googleMap.evalJS('setLayerWHDHospitality(\"' + where + '\");');
			*/
			winDOLMap.googleMap.evalJS('setLayerWHDFull(\"' + where + '\");');
			if (name) {
				winDOLMap.wvDolList.evalJS('setLayerWHDFood(\"' + where + '\",\"' + '' + '\");');
				winDOLMap.wvDolList.evalJS('setLayerWHDRetail(\"' + where + '\",\"' + '' + '\");');
				winDOLMap.wvDolList.evalJS('setLayerWHDHospitality(\"' + where + '\",\"' + '' + '\");');
			} else {
				winDOLMap.wvDolList.evalJS('setLayerWHDFood(\"' + where + '\",\"' + ll + '\");');
				winDOLMap.wvDolList.evalJS('setLayerWHDRetail(\"' + where + '\",\"' + ll + '\");');
				winDOLMap.wvDolList.evalJS('setLayerWHDHospitality(\"' + where + '\",\"' + ll + '\");');
			}
			break;
		}
	}
	
	function sourceDOL(name,ll) {
		switch (FilterSettings.DolSource) {
		case FilterSettings.DOLSOURCE_OSHA:
			sourceOSHA(name,ll);
			break;
		case FilterSettings.DOLSOURCE_WHD:
			sourceWHD(name,ll);
			break;
		case FilterSettings.DOLSOURCE_ALL:
			sourceWHD(name,ll);
			sourceOSHA(name,ll);
			break;
		}
	}
	
	winMapFilter.update = function(name) {

		var ll = winDOLMap.googleMap.evalJS('getMapCenterLat();')	+ ',' + winDOLMap.googleMap.evalJS('getMapCenterLng();');
		
		switch (FilterSettings.Source) {
		case FilterSettings.SOURCE_DOL:
			Ti.App.fireEvent('clearYelpMarkers', null);
			winDOLMap.googleMap.evalJS('clearLayers();');
			winDOLMap.tvDolList.data = [];
			
			sourceDOL(name,ll);
			
			break;
		case FilterSettings.SOURCE_YELP:
			Ti.App.fireEvent('clearYelpMarkers', null);
			winDOLMap.googleMap.evalJS('clearLayers();');
			winDOLMap.tvDolList.data = [];
			
			Ti.App.fireEvent('getLocalYelp', {ll: ll});
			break;
		case FilterSettings.SOURCE_ALL:		
			Ti.App.fireEvent('clearYelpMarkers', null);
			winDOLMap.googleMap.evalJS('clearLayers();');
			winDOLMap.tvDolList.data = [];
			
			sourceDOL(name,ll);
			Ti.App.fireEvent('getLocalYelp', {ll: ll});
			break;
		}

    }
	
    function createIconRow(buttonWidth, iconImages) {
    	
        var rowSourceIcon = Ti.UI.createTableViewRow({
			hasChild:false,
			height:'auto',
			className: 'name',
			selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
		});
		
		var viewSource = Titanium.UI.createView({
			top: 0,
			height: 'auto',
			left: 10,
			//width: Titanium.Platform.displayCaps.platformWidth-20
			width: winWidth-20
		});	
		rowSourceIcon.add(viewSource);
		
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
		
        return rowSourceIcon;
    }
    
    function createHeaderRow(text) {
    	
    	var rowHeader = Ti.UI.createTableViewRow({
			hasChild:false,
			height:'auto',
			className: 'name',
			//backgroundColor: 'black',
			selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
		});
		
		var lblHeader = Ti.UI.createLabel({
			text: text,
			color: 'black',
			top: 10,
			bottom: 5,
			height: 'auto',
			left: 10,
			//width: Titanium.Platform.displayCaps.platformWidth - 20,
			width: winWidth - 20,
			textAlign: 'left',
		    font:{fontSize:16, fontWeight:'bold'}
		});
		rowHeader.add(lblHeader);
		
		return rowHeader;
    }
    
	winMapFilter.create = function() {
		var bb = Titanium.UI.createButtonBar({
			labels:['Apply', 'Cancel'],
			backgroundColor:headerColor
		});
		bb.addEventListener('click', function(evt) {
			if (evt.index == 0) {
				FilterSettings.Inspections = tbViolation.index;
				FilterSettings.DolSource = tbDOLSource.index;
				//FilterSettings.DolArea = tbDOLArea.index;
				FilterSettings.Industry = tbIndustry.index;
				FilterSettings.Source = tbSource.index;
				if (tbNameSearch.index == 1) {
					FilterSettings.SearchName = textSearch.value;
				}
				else {
					FilterSettings.SearchName = null;
				}
				winMapFilter.update(FilterSettings.SearchName);	
				win.close();
			} else {
				win.close();
			}
			
		});
	
		/*
		var btnClose = Ti.UI.createButton({
			title:'Close'
		});
		btnClose.addEventListener('click', function() {
			FilterSettings.Inspections = tbViolation.index;
			FilterSettings.DolSource = tbDOLSource.index;
			//FilterSettings.DolArea = tbDOLArea.index;
			FilterSettings.Industry = tbIndustry.index;
			FilterSettings.Source = tbSource.index;
			if (tbNameSearch.index == 1) {
				FilterSettings.SearchName = textSearch.value;
			}
			else {
				FilterSettings.SearchName = null;
			}
			winMapFilter.update(FilterSettings.SearchName);	
			win.close();
		});
		*/
		win = Ti.UI.createWindow({
			orientationModes: orientationModes,
			backgroundColor:'black',
			navBarHidden: false,
			barColor: headerColor,
			//title: 'Filter',
			leftNavButton: Ti.UI.createLabel({color:'white',font:{fontSize:18, fontWeight:'bold'},text: ' Filter'}),
			rightNavButton: bb
		});
		
		
		if (Ti.Platform.osname == 'ipad') {
			winWidth = 540;
		} else {
			winWidth = win.width;
		}
		
		/*
		var buttonWidthForTwo = (Titanium.Platform.displayCaps.platformWidth-20)/2;
		var buttonWidthForThree = (Titanium.Platform.displayCaps.platformWidth-20)/3;
		var buttonWidthForFour = (Titanium.Platform.displayCaps.platformWidth-20)/4;
		*/
		var buttonWidthForTwo = Math.round((winWidth-20)/2);
		var buttonWidthForThree = Math.round((winWidth-20)/3);
		var buttonWidthForFour = Math.round((winWidth-20)/4);	
		
		var tableView = Titanium.UI.createTableView({
			backgroundColor:'white',
			separatorColor:'white',
			top: 0,
			width: winWidth
		});
		win.add(tableView);
		
		tableView.appendRow(createHeaderRow('Name of Business:'));
		
		var rowNameSearch = Titanium.UI.createTableViewRow({
			hasChild: false,
			height: 'auto',	
			selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
		});
		
		var tbNameSearch = Titanium.UI.createTabbedBar({
			left: 10,
			top:0,
			width: 100,
			height: 30,
			labels:[{title: 'All', width: 50},{title:'Search:',width:60}],
			backgroundColor: headerColor,
			index: ((FilterSettings.SearchName == null) ? 0 : 1),
			style:Titanium.UI.iPhone.SystemButtonStyle.BAR
		});
		tbNameSearch.addEventListener('click', function(evt){
			if (evt.index == 0) {
				textSearch.visible = false;
			} else {
				textSearch.visible = true;
				textSearch.focus();
			}
		});
		rowNameSearch.add(tbNameSearch);
		
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
		    //systemButton:Titanium.UI.iPhone.SystemButton.SEARCH
		    backgroundDisabledImage: 'magnifying_glass.png',
		    backgroundImage: 'magnifying_glass.png',
		    width: 14,
		    height: 15,
		    enabled: false
		});
		
		var textSearch = Titanium.UI.createTextField({
			clearButtonMode: Titanium.UI.INPUT_BUTTONMODE_ALWAYS,
			leftButton: btnSearch,
			leftButtonMode: Titanium.UI.INPUT_BUTTONMODE_ALWAYS,
			height:32,
			width: 180,
			left: 130,
			//width: 'auto',
			font:{fontSize:13},
			hintText: 'enter name',
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
			visible: ((FilterSettings.SearchName == null) ? false : true),
			returnKeyType: Titanium.UI.RETURNKEY_DONE,
			value: FilterSettings.SearchName
		});
		if (Ti.Platform.osname != 'ipad') {
			textSearch.keyboardToolbar = [flexSpace,btnCancel];
			textSearch.keyboardToolbarColor = 'gray';	
			textSearch.keyboardToolbarHeight = 40; 
		} 
		textSearch.addEventListener('return', function(evt) {
			textSearch.blur();
		});
		rowNameSearch.add(textSearch);
		
		tableView.appendRow(rowNameSearch);
		
		tableView.appendRow(createHeaderRow('Industry of Business:'));
		
		var industryList = [{icon:'yellow_bubble_blank.png',height:34,top:0},{icon:'blue_bubble_blank.png',height:34,top:0},{icon:'purple_bubble_blank.png',height:34,top:0}];
		tableView.appendRow(createIconRow(buttonWidthForFour,industryList) );
		
		var rowIndustryName = Ti.UI.createTableViewRow({
			hasChild:false,
			height:'auto',
			className: 'name',
			selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
		});
		tableView.appendRow(rowIndustryName);
		
		tbIndustry = Titanium.UI.createTabbedBar({
			top: 0,
			labels:[{title:'Food', width: buttonWidthForFour},
			 {title:'Retail',width: buttonWidthForFour},
			 {title:'Hospitality',width: buttonWidthForFour},
			 {title:'All',width: buttonWidthForFour}
			 ],
			backgroundColor: headerColor,
			index:FilterSettings.Industry,
			style: Titanium.UI.iPhone.SystemButtonStyle.BAR
		});
		rowIndustryName.add(tbIndustry);
		
		tableView.appendRow(createHeaderRow('Source of Business Listings:'));
		
		var sourceList = [{icon:'yellow_bubble_blank.png',height:34,top:0},{icon:'yellow_bubble_yelp.png',height:26,top:8}];
		tableView.appendRow(createIconRow(buttonWidthForThree,sourceList) );
		
		var rowSourceName = Ti.UI.createTableViewRow({
			hasChild:false,
			height:'auto',
			className: 'name',
			selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
		});
		tableView.appendRow(rowSourceName);
		
		tbSource = Titanium.UI.createTabbedBar({
			top: 0,
			labels:[{title:'Dept of Labor', width: buttonWidthForThree},
			{title:'Yelp (local)',width: buttonWidthForThree},
			{title:'Both',width: buttonWidthForThree}
			],
			backgroundColor: headerColor,
			index:FilterSettings.Source,
			style: Titanium.UI.iPhone.SystemButtonStyle.BAR
		});
		rowSourceName.add(tbSource);
		
		tableView.appendRow(createHeaderRow('Dept of Labor Inspection Results:'));
		
		var inspectionList = [{icon:'yellow_bubble_diamond.png',height:34,top:0},{icon:'yellow_bubble_blank.png',height:34,top:0}];
		tableView.appendRow(createIconRow(buttonWidthForThree,inspectionList) );
		
		var rowDOLViolations = Ti.UI.createTableViewRow({
			hasChild:false,
			height:'auto',
			className: 'name',
			selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
		});
		tableView.appendRow(rowDOLViolations);
		
		tbViolation = Titanium.UI.createTabbedBar({
			top: 0,
			labels:[{title:'Violations', width: buttonWidthForThree},
			 {title:'No Violations',width: buttonWidthForThree},
			 {title:'Both',width: buttonWidthForThree}
			 ],
			backgroundColor: headerColor,
			index:FilterSettings.Inspections,
			style: Titanium.UI.iPhone.SystemButtonStyle.BAR
		});
		rowDOLViolations.add(tbViolation);
		
		tableView.appendRow(createHeaderRow('Dept of Labor Agencies:'));
		
		var rowDOLSource = Ti.UI.createTableViewRow({
			hasChild:false,
			height:'auto',
			className: 'name',
			selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
		});
		tableView.appendRow(rowDOLSource);
		
		tbDOLSource = Titanium.UI.createTabbedBar({
			top: 0,
			labels:[{title:'OSHA', width: buttonWidthForThree},
			 {title:'WHD',width: buttonWidthForThree},
			 {title:'Both',width: buttonWidthForThree}
			 ],
			backgroundColor: headerColor,
			index:FilterSettings.DolSource,
			style: Titanium.UI.iPhone.SystemButtonStyle.BAR
		});
		rowDOLSource.add(tbDOLSource);
		/*
		tableView.appendRow(createHeaderRow('Dept of Labor Inspection Area:'));
		
		var rowDOLArea = Ti.UI.createTableViewRow({
			hasChild:false,
			height:'auto',
			className: 'name',
			selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
		});
		tableView.appendRow(rowDOLArea);
		
		tbDOLArea = Titanium.UI.createTabbedBar({
			top: 0,
			labels:[{title:'Local', width: buttonWidthForTwo},
			 {title:'National',width: buttonWidthForTwo}
			 ],
			backgroundColor: 'gray',
			index:FilterSettings.DolArea,
			style: Titanium.UI.iPhone.SystemButtonStyle.BAR
		});
		rowDOLArea.add(tbDOLArea);
		*/
		return win;
	}
	
})();