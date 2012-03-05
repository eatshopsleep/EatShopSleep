Ti.include('map_location.js');
Ti.include('map_filter.js');
Ti.include('yelp_detail.js');

var winDOLMap = {
	googleMap: null,
	win: null,
	tvDolList: null,
	wvDolList: null,
	toolbarRedo: null,
	hideRedoButton: false,
	btnRedoSearch: null
};

(function() {
    function helper() {
        //help out
    }
    
	winDOLMap.create = function() {
		
		var btnHome = Titanium.UI.createButton({
			title: 'Home',
			style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
		});
		btnHome.addEventListener('click', function(evt){
			tgSearch.animate({opacity:0,duration:300});
			winHome.win.animate({opacity:1,duration:300});
			
		});
		
		winDOLMap.win = Titanium.UI.createWindow({
			leftNavButton: btnHome,
			orientationModes: orientationModes,
			tabBarHidden: true,
			navBarHidden: Ti.Platform.osname == 'android' ? true : false,
			barColor: headerColor,
			backgroundColor: 'black'
		});
		
		winDOLMap.wvDolList = Titanium.UI.createWebView({
		    url: 'gviz.htm',
		    top: 0,
		    left: 0,
		    visible: false
		});
		winDOLMap.wvDolList.addEventListener('beforeload', function(evt) {
			if (Ti.Platform.osname != 'android') {
				winDOLMap.win.add(indView);	
			} 
			actInd.show();
		});
		winDOLMap.wvDolList.addEventListener('load', function(evt) {
			actInd.hide();
			if (Ti.Platform.osname != 'android') {
				winDOLMap.win.remove(indView);	
			}
			
		});
		winDOLMap.win.add(winDOLMap.wvDolList);
		
		winDOLMap.tvDolList = Titanium.UI.createTableView({
			separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle,
			top: 0,
			visible: true,
			bottom: 44,
			separatorColor: 'transparent',
			backgroundColor: 'white',
			
		});
		winDOLMap.tvDolList.addEventListener('click', function(evt) {
			
			if (evt.row.source == 'OSHA') {
				if (Ti.Platform.osname == 'android') {
					winOSHA_detail.create(evt.row.dol_data).open();
				} else {
					tabSearch1.open(winOSHA_detail.create(evt.row.dol_data));	
				}
				
			} else if (evt.row.source == 'WHD') {
				if (Ti.Platform.osname == 'android') {
					winWHD_detail.create(evt.row.dol_data).open();
				} else {
					tabSearch1.open(winWHD_detail.create(evt.row.dol_data));	
				}
				
			} else {
				if (Ti.Platform.osname == 'android') {
					winYelp_detail.create(evt.row.data).open();
				} else {
					tabSearch1.open(winYelp_detail.create(evt.row.data),{animated:true});	
				}
				
				
			}
		
			winDOLMap.win.barColor = headerColor;
		});
		winDOLMap.win.add(winDOLMap.tvDolList);
		
		winDOLMap.googleMap = Titanium.UI.createWebView({
		    url: 'map.htm',
		    top: 0,
		    bottom: 44,
		    left: 0,
		    scalesPageToFit: true,
		    visible: true
		});
		winDOLMap.googleMap.addEventListener('beforeload', function(evt) {
			if (Ti.Platform.osname != 'android') {
				winDOLMap.win.add(indView);	
			}
			actInd.show();
			
		});
		winDOLMap.googleMap.addEventListener('load', function(evt) {
			actInd.hide();
			if (Ti.Platform.osname != 'android') {
				winDOLMap.win.remove(indView);	
			}
			
		});
		winDOLMap.googleMap.addEventListener('error', function(evt) {
			actInd.hide();
			if (Ti.Platform.osname != 'android') {
				winDOLMap.win.remove(indView);	
			}
				
			alert('Webpage not available.');
		});
		winDOLMap.win.add(winDOLMap.googleMap);
		
		var flexSpace = Titanium.UI.createButton({
			systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
		});
		
		if (Ti.Platform.osname == 'android') {
			var btnNav = Titanium.UI.createLabel({
				text: 'Nav',
				color: 'white',
				left: 10,
				height: 34,
				width: 54,
				textAlign: 'center',
				font:{fontSize:'14dp', fontWeight:'bold'},
				backgroundImage: 'images/toolbar_button_54x34.png',
				backgroundSelectedImage: 'images/toolbar_button_54x34_pressed.png',
			});
			btnNav.addEventListener('click', function(evt){
				if (Ti.Platform.osname == 'android') {
					winMapLocation.create().open();	
				} else {
					winMapLocation.create().open({modalTransitionStyle:Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,modalStyle:Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET, modal: true});	
				}
			});
			
			var btnMap = Titanium.UI.createLabel({
				text: 'Map',
				color: 'white',
				height: 34,
				width: 54,
				textAlign: 'center',
				font:{fontSize:'14dp', fontWeight:'bold'},
				backgroundImage: 'images/toolbar_button_54x34.png',
				backgroundSelectedImage: 'images/toolbar_button_54x34_pressed.png',
				center: Titanium.Platform.displayCaps.platformWidth/2 - 30
			});
			btnMap.addEventListener('click', function(evt){
				winDOLMap.tvDolList.animate({opacity: 0, duration:300});
				winDOLMap.googleMap.animate({opacity: 1, duration:300});
				if (winDOLMap.hideRedoButton) {
					winDOLMap.btnRedoSearch.visible = false;
					//winDOLMap.toolbarRedo.animate({opacity: 0, duration:300});	
				} else {
					winDOLMap.btnRedoSearch.visible = true;
					//winDOLMap.toolbarRedo.animate({opacity: 1, duration:300});
				}	
			});
			
			var btnList = Titanium.UI.createLabel({
				text: 'List',
				color: 'white',
				height: 34,
				width: 54,
				textAlign: 'center',
				font:{fontSize:'14dp', fontWeight:'bold'},
				backgroundImage: 'images/toolbar_button_54x34.png',
				backgroundSelectedImage: 'images/toolbar_button_54x34_pressed.png',
				center: Titanium.Platform.displayCaps.platformWidth/2 + 30
			});
			btnList.addEventListener('click', function(evt){
				winDOLMap.tvDolList.animate({opacity: 1, duration:300});
				winDOLMap.googleMap.animate({opacity: 0, duration:300});
				winDOLMap.btnRedoSearch.visible = false;
				
				//winDOLMap.toolbarRedo.animate({opacity: 0, duration:300});
			});
			
			var btnFilter = Titanium.UI.createLabel({
				text: 'Filter',
				color: 'white',
				right: 10,
				height: 34,
				width: 54,
				textAlign: 'center',
				font:{fontSize:'14dp', fontWeight:'bold'},
				backgroundImage: 'images/toolbar_button_54x34.png',
				backgroundSelectedImage: 'images/toolbar_button_54x34_pressed.png',
			});
			btnFilter.addEventListener('click', function(evt){
				winMapFilter.create().open();
			});
			
			var vwBottom = Ti.UI.createView({
				bottom: 0, left: 0, right: 0,
				height: 44,
				backgroundImage: 'images/toolbar_background.png'
			});

			vwBottom.add(btnNav);
			vwBottom.add(btnMap);
			vwBottom.add(btnList);
			vwBottom.add(btnFilter);
			
			winDOLMap.win.add(vwBottom);
		} else {
			var btnNav = Titanium.UI.createButton({
				image: 'images/arrow_15x15.png',
				width: 40,
				style: Ti.UI.iPhone.SystemButtonStyle.BORDERED
			});
			btnNav.addEventListener('click', function(evt){
				if (Ti.Platform.osname == 'android') {
					winMapLocation.create().open();	
				} else {
					winMapLocation.create().open({modalTransitionStyle:Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,modalStyle:Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET, modal: true});	
				}
				
				
			});
			var tabBar = Titanium.UI.createTabbedBar({
				labels:[{title: 'Map', width: 50},{title:'List',width:50}],
				backgroundColor: headerColor,
				index:0
			});
			tabBar.addEventListener('click', function(evt){
				if (evt.index == 0) {
					winDOLMap.tvDolList.animate({opacity: 0, duration:300});
					winDOLMap.googleMap.animate({opacity: 1, duration:300});
					if (winDOLMap.hideRedoButton) {
						winDOLMap.btnRedoSearch.visible = false;
						//winDOLMap.toolbarRedo.animate({opacity: 0, duration:300});	
					} else {
						winDOLMap.btnRedoSearch.visible = true;
						//winDOLMap.toolbarRedo.animate({opacity: 1, duration:300});
					}
					
				} else {
					
					winDOLMap.tvDolList.animate({opacity: 1, duration:300});
					winDOLMap.googleMap.animate({opacity: 0, duration:300});
					winDOLMap.btnRedoSearch.visible = false;
					//winDOLMap.toolbarRedo.animate({opacity: 0, duration:300});
				}
			});
			
			var btnFilter = Titanium.UI.createButton({
				title: 'Filter',
				style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
			});
			btnFilter.addEventListener('click', function(evt){
				winMapFilter.create().open({modalTransitionStyle:Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,modalStyle:Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET});	
			});
			
			var toolbarBottom = Titanium.UI.createToolbar({
				items:[btnNav,flexSpace,tabBar,flexSpace,btnFilter],
				bottom:0,
				borderWidth:0,
				//borderTop:false,
				//borderBottom:true,
				barColor: headerColor
			});	
			winDOLMap.win.add(toolbarBottom);
		}
		
		
		winDOLMap.btnRedoSearch = Titanium.UI.createButton({
			title: 'Redo Search in This Area',
			style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
			bottom: 44,
			backgroundImage: 'images/black_button_192x36.png',
			backgroundSelectedImage: 'images/black_button_192x36_pressed.png',
			width: Ti.Platform.osname == 'android' ? 192 : 160,
			height: Ti.Platform.osname == 'android' ? 36 : 30,
			color: 'white',
			font:{fontSize: Ti.Platform.osname == 'android' ? '14dp' : '12dp',fontWeight:'bold'}
		});
		winDOLMap.btnRedoSearch.addEventListener('click', function(evt){
			winMapFilter.update(FilterSettings.SearchName);		
		});
		winDOLMap.win.add(winDOLMap.btnRedoSearch);
		
		
		

		return winDOLMap.win;
    }
    
})();


Ti.App.addEventListener('zoomChanged', function(evt){
	if (evt.hideRedoButton) {
		winDOLMap.hideRedoButton = true;
		winDOLMap.btnRedoSearch.visible = false;
		//winDOLMap.toolbarRedo.animate({opacity: 0, duration:300});
	} else {
		winDOLMap.hideRedoButton = false;
		if (winDOLMap.googleMap.opacity == 1) {
			winDOLMap.btnRedoSearch.visible = true;	
		}
		
		//winDOLMap.toolbarRedo.animate({opacity: 1, duration:300});	
	}
		
});

Ti.App.addEventListener('yelpMarkerClicked', function(evt){
	evt.name = unescape(evt.name);
	evt.address = unescape(evt.address);
	evt.city = unescape(evt.city);
	
	if (Ti.Platform.osname == 'android') {
		winYelp_detail.create(evt).open();
	} else {
		tabSearch1.open(winYelp_detail.create(evt));	
	}
	

	winDOLMap.win.barColor = headerColor;
});

Ti.App.addEventListener('oshaMarkerClicked', function(evt){
	evt.estab_name = unescape(evt.estab_name);
	evt.site_address = unescape(evt.site_address);
	evt.site_city = unescape(evt.site_city);
	
	if (Ti.Platform.osname == 'android') {
		winOSHA_detail.create(evt).open();
	} else {
		tabSearch1.open(winOSHA_detail.create(evt));
	}
		
		
	
	winDOLMap.win.barColor = headerColor;
});

Ti.App.addEventListener('whdMarkerClicked', function(evt){
	evt.trade_nm = unescape(evt.trade_nm);
	evt.street_addr_1_txt = unescape(evt.street_addr_1_txt);
	evt.city_nm = unescape(evt.city_nm);
	evt.naics_code_description = unescape(evt.naics_code_description);
	evt.findings_start_date = unescape(evt.findings_start_date);
	evt.findings_end_date = unescape(evt.findings_end_date);
	evt.flsa_repeat_violator = unescape(evt.flsa_repeat_violator);
	
	if (Ti.Platform.osname == 'android') {
		winWHD_detail.create(evt).open();
	} else {
		tabSearch1.open(winWHD_detail.create(evt));	
	}
	
	
	winDOLMap.win.barColor = headerColor;
	
});

function getYelpList(evt, industry) {
	
	if (evt.businesses.length > 0) {
		winDOLMap.tvDolList.separatorStyle = Titanium.UI.iPhone.TableViewSeparatorStyle;
		
	}
	else {
		winDOLMap.tvDolList.separatorColor = 'transparent';
	}
	
	var section = Titanium.UI.createTableViewSection({
		font:{fontSize:'12dp', fontWeight:'bold'}
	});
	
	var vwYelpHeader = Ti.UI.createView({
		height:30,
		backgroundColor: 'black'
		//opacity: 0.5
	});
	
	var industryIcon = '';
	if (industry == 'Food') {
		industryIcon = 'images/food_yellow_matte.png';
	} else if (industry == 'Retail') {
		industryIcon = 'images/retail_blue_matte.png';
	} else {
		industryIcon = 'images/hospitality_purple_matte.png';
	} 
	var imgIndustryIcon = Ti.UI.createImageView({
	    left:10, 
	    width: 22,
	    height:22,
	    image: industryIcon
	});
	vwYelpHeader.add(imgIndustryIcon);
	
	var lblYelpHeader = Ti.UI.createLabel({
		//borderColor: 'white',
	    //top:5, bottom:5, 
	    left: imgIndustryIcon.left + imgIndustryIcon.width + 10,
	    width: 'auto',
	    height:'auto',
	    text: industry,
	    font:{fontSize:'16dp', fontWeight:'bold'},
	    color:'white'
	});
	vwYelpHeader.add(lblYelpHeader);
	
	var imgYelpLogo = Ti.UI.createImageView({
		image:'images/yelp_logo_50x25.png',
		right: 5,
		height: 27,
		width: 51
		//top: 0,
		//bottom: 5
	});
	vwYelpHeader.add(imgYelpLogo);
	
	var lblYelpSource = Ti.UI.createLabel({
		//borderColor: 'white',
	    //top:5, bottom:5, 
	    right:imgYelpLogo.width + 10, 
	    width: 'auto',
	    height:'auto',
	    text: '(yelp.com)',
	    font:{fontSize:'12dp', fontStyle:'italic'},
	    color:'#999999'
	});
	vwYelpHeader.add(lblYelpSource);
	
	if (Ti.Platform.osname != 'android') {
		section.headerView = vwYelpHeader; 
	} else {
		var rowHeader = Ti.UI.createTableViewRow({
			hasChild:false,
			height: 30,
			backgroundColor: 'black',
			touchEnabled: false
		});
		rowHeader.add(vwYelpHeader);
		section.add(rowHeader);
	}
	
	for (var i in evt.businesses) {
		
		var displayBiz = false;
				
		var bizName = evt.businesses[i].name;
		bizName = bizName.toUpperCase();
		
		if (FilterSettings.SearchName) {
			var searchName = FilterSettings.SearchName;
			searchName = searchName.toUpperCase();	
			if (bizName.search(searchName) != -1) {
				displayBiz = true;
			}
		} else {
			displayBiz = true;
		}
		
		if (displayBiz) {
			data = {
				industry: industry,
				name: evt.businesses[i].name,
				image_url: evt.businesses[i].image_url,
				address: evt.businesses[i].location.address,
				city: evt.businesses[i].location.city,
				state_code: evt.businesses[i].location.state_code,
				postal_code: evt.businesses[i].location.postal_code,
				display_phone: evt.businesses[i].display_phone,
				phone: evt.businesses[i].phone,
				rating_img_url: evt.businesses[i].rating_img_url,
				review_count: evt.businesses[i].review_count,
				mobile_url: evt.businesses[i].mobile_url
			
			};
			var rowDOL = Ti.UI.createTableViewRow({
				hasChild:true,
				height: Ti.Platform.osname == 'android' ? 44 : 'auto',
				className: 'name',
				data: data,
				source: 'yelp',
				selectedBackgroundColor: rowSelectionColor,
			});
			
			var lblBizName = Ti.UI.createLabel({
				text: evt.businesses[i].name,
				color: 'black',
				//top: Ti.Platform.osname == 'android' ? 2 : 5,
				//height: Ti.Platform.osname == 'android' ? 20 : 15,
				top: 5,
				height: 18,
				left: 10,
				width: Titanium.Platform.displayCaps.platformWidth - 75,
				textAlign: 'left',
				touchEnabled: false,
				font:{fontSize:'14dp', fontWeight:'bold'}
				
			
			});
			rowDOL.add(lblBizName);
			
			var imgRating = Ti.UI.createImageView({
				image: evt.businesses[i].rating_img_url_small,
				right: 5,
				height: 10,
				//top: 5,
				width: 50,
				touchEnabled: false
				//borderColor: 'black'
			});
			rowDOL.add(imgRating);
			
			var address = '';
			if (evt.businesses[i].location.address && evt.businesses[i].location.address !='') {
				address = address + evt.businesses[i].location.address + ', ';
			} 
			if (evt.businesses[i].location.city && evt.businesses[i].location.city !='') {
				address = address + evt.businesses[i].location.city + ', ';
			}
			if (evt.businesses[i].location.state_code && evt.businesses[i].location.state_code !='') {
				address = address + evt.businesses[i].location.state_code;
			}
			
			var lblBizAddress = Ti.UI.createLabel({
				text: address,
				color: 'gray',
				//borderColor: 'black',
				//top: Ti.Platform.osname == 'android' ? 22 : 25,
				top: 23,
				//height: Ti.Platform.osname == 'android' ? 20 : 10,
				height: 15,
				left: 10,
				touchEnabled: false,
				//bottom: Ti.Platform.osname == 'android' ? 2 : 5,
				bottom: 5,
				width: Titanium.Platform.displayCaps.platformWidth - 100,
				textAlign: 'left',
			    //font:{fontSize: Ti.Platform.osname == 'android' ? 14 : 10}
			    font:{fontSize: '12dp'}
			    
			});
			rowDOL.add(lblBizAddress);
			
			section.add(rowDOL);
		}
		
		
		
	}
	
	if (section.rowCount > 0) {
		var newData = winDOLMap.tvDolList.data;	
		newData.push(section);
		winDOLMap.tvDolList.setData(newData);
	}
	
}

Ti.App.addEventListener('getLocalYelp',function(evt) {
	//googleMap.evalJS('setLocalZoom();')
	
	//var bounds = {sw_latitude: googleMap.evalJS('getBoundsSWLatitude();'),
	//		sw_longitude: googleMap.evalJS('getBoundsSWLongitude();'),
	//		ne_latitude: googleMap.evalJS('getBoundsNELatitude();'),
	//		ne_longitude: googleMap.evalJS('getBoundsNELongitude();')};
	
	//var ll = winDOLMap.googleMap.evalJS('getMapCenterLat();')	+ ',' + winDOLMap.googleMap.evalJS('getMapCenterLng();');
	
	var food_category = 'food,restaurants';
	var retail_category = 'shopping';
	var hospitality_category = 'bedbreakfast,hostels,hotels,skiresorts';
	
	switch (FilterSettings.Industry) {
		case FilterSettings.INDUSTRY_FOOD:
			yelp_api.searchRequest(FilterSettings.SearchName,null,null, food_category, evt.ll, 
				function(response) {
					var jsonResponse = JSON.parse(response);
					if (jsonResponse.businesses.length > 0) {

				    	Ti.App.fireEvent('setYelpFoodMarkers', {response:response, searchName:FilterSettings.SearchName});
				    	getYelpList(jsonResponse, 'Food');
				    }
				    /*
					if (response.businesses.length > 0) {

				    	Ti.App.fireEvent('setYelpFoodMarkers', {response:response, searchName:FilterSettings.SearchName});
				    	getYelpList(response, 'Food');
				    }
				    */
				},  
				function(evt) {
					Ti.API.error("Error: " + evt.error);
				    Titanium.UI.createAlertDialog({
				        title: "API call failed",
				        message: evt,
				        buttonNames: ['OK']
				    }).show();
			});
			break;
		case FilterSettings.INDUSTRY_RETAIL:
			yelp_api.searchRequest(FilterSettings.SearchName,null,null, retail_category, evt.ll, 
				function(response) {     
					var jsonResponse = JSON.parse(response);
					if (jsonResponse.businesses.length > 0) {

				    	Ti.App.fireEvent('setYelpRetailMarkers', {response:response, searchName:FilterSettings.SearchName});
				    	getYelpList(jsonResponse, 'Retail');
				    }
				    /*
				    if (response.businesses.length > 0) {
				    	Ti.App.fireEvent('setYelpRetailMarkers', {response:response, searchName:FilterSettings.SearchName});
				    	getYelpList(response, 'Retail');
				    }
				    */
					
				},  
				function(evt) {
					Ti.API.error("Error: " + evt.error);
				    Titanium.UI.createAlertDialog({
				        title: "API call failed",
				        message: evt,
				        buttonNames: ['OK']
				    }).show();
			});
			break;
		case FilterSettings.INDUSTRY_HOSPITALITY:
			yelp_api.searchRequest(FilterSettings.SearchName,null,null, hospitality_category, evt.ll, 
				function(response) {  
					var jsonResponse = JSON.parse(response);
					if (jsonResponse.businesses.length > 0) {

				    	Ti.App.fireEvent('setYelpHospitalityMarkers', {response:response, searchName:FilterSettings.SearchName});
				    	getYelpList(jsonResponse, 'Hospitality');
				    }
				    /*   
				    if (response.businesses.length > 0) {
				    	Ti.App.fireEvent('setYelpHospitalityMarkers', {response:response, searchName:FilterSettings.SearchName});
				    	
				    	getYelpList(response, 'Hospitality');
				    }
				    */
					
				},  
				function(evt) {
					Ti.API.error("Error: " + evt.error);
				    Titanium.UI.createAlertDialog({
				        title: "API call failed",
				        message: evt,
				        buttonNames: ['OK']
				    }).show();
			});
			break;
		case FilterSettings.INDUSTRY_ALL:
			yelp_api.searchRequest(FilterSettings.SearchName,null,null, food_category, evt.ll, 
				function(response) {     
					
					var jsonResponse = JSON.parse(response);
					if (jsonResponse.businesses.length > 0) {

				    	Ti.App.fireEvent('setYelpFoodMarkers', {response:response, searchName:FilterSettings.SearchName});
				    	getYelpList(jsonResponse, 'Food');
				    }
				    /*
				    if (response.businesses.length > 0) {
				    	Ti.App.fireEvent('setYelpFoodMarkers', {response:response, searchName:FilterSettings.SearchName});
				    	
				    	getYelpList(response, 'Food');
				    }
				    */
				    yelp_api.searchRequest(FilterSettings.SearchName,null,null, retail_category, evt.ll, 
						function(response) {    
							var jsonResponse = JSON.parse(response);
							if (jsonResponse.businesses.length > 0) {
		
						    	Ti.App.fireEvent('setYelpRetailMarkers', {response:response, searchName:FilterSettings.SearchName});
						    	getYelpList(jsonResponse, 'Retail');
						    }
							/* 
						    if (response.businesses.length > 0) {
						    	Ti.App.fireEvent('setYelpRetailMarkers', {response:response, searchName:FilterSettings.SearchName});
						    	
						    	getYelpList(response, 'Retail');
						    }
						    */
						    yelp_api.searchRequest(FilterSettings.SearchName,null,null, hospitality_category, evt.ll, 
								function(response) {  
									var jsonResponse = JSON.parse(response);
									if (jsonResponse.businesses.length > 0) {
				
								    	Ti.App.fireEvent('setYelpHospitalityMarkers', {response:response, searchName:FilterSettings.SearchName});
								    	getYelpList(jsonResponse, 'Hospitality');
								    }
								    /*   
									if (response.businesses.length > 0) {
								    	Ti.App.fireEvent('setYelpHospitalityMarkers', {response:response, searchName:FilterSettings.SearchName});
								    	
								    	getYelpList(response, 'Hospitality');
								    }
								    */
									
								},  
								function(evt) {
									Ti.API.error("Error: " + evt.error);
								    Titanium.UI.createAlertDialog({
								        title: "API call failed",
								        message: evt,
								        buttonNames: ['OK']
								    }).show();
							});
						},  
						function(evt) {
							Ti.API.error("Error: " + evt.error);
						    Titanium.UI.createAlertDialog({
						        title: "API call failed",
						        message: evt,
						        buttonNames: ['OK']
						    }).show();
					});
				},  
				function(evt) {
					Ti.API.error("Error: " + evt.error);
				    Titanium.UI.createAlertDialog({
				        title: "API call failed",
				        message: evt,
				        buttonNames: ['OK']
				    }).show();
			});
			
			break;
	}
	
	
});

Ti.App.addEventListener('getDOLList',function(evt) { 
	
	var json = JSON.parse(evt.response);
	
	if (json.rows.length > 0) {
		winDOLMap.tvDolList.separatorStyle = Titanium.UI.iPhone.TableViewSeparatorStyle;
		
	}
	else {
		winDOLMap.tvDolList.separatorColor = 'transparent';
	}
	
	var section = Titanium.UI.createTableViewSection({
		font:{fontSize:'12dp', fontWeight:'bold'},
		backgroundColor: 'black'
	});
	
	var vwHeader = Ti.UI.createView({
		height:30,
		backgroundColor: 'black'
		//opacity: 0.5
	});
	
	var industryIcon = '';
	if (evt.industry == 'Food') {
		industryIcon = 'images/food_yellow_matte.png';
	} else if (evt.industry == 'Retail') {
		industryIcon = 'images/retail_blue_matte.png';
	} else {
		industryIcon = 'images/hospitality_purple_matte.png';
	} 
	var imgIndustryIcon = Ti.UI.createImageView({
		//borderColor: 'white',
	    //top:5, bottom:5, 
	    left:10, 
	    width: 22,
	    height:22,
	    image: industryIcon
	});
	vwHeader.add(imgIndustryIcon);
	
	var lblHeader = Ti.UI.createLabel({
		//borderColor: 'white',
	    //top:5, bottom:5, 
	    left: imgIndustryIcon.left + imgIndustryIcon.width + 10,
	    width: 'auto',
	    height:'auto',
	    text: evt.industry,
	    font:{fontSize:'16dp', fontWeight:'bold'},
	    color:'white'
	});
	vwHeader.add(lblHeader);
	/*
	var imgDOLLogo = Ti.UI.createImageView({
		image:'dol_seal_small.png',
		right: 5,
		height: 27,
		width: 27
	});
	*/
	var imgDOLLogo;
	if (evt.source == 'OSHA') {
		var imgDOLLogo = Ti.UI.createImageView({
			image:'images/osha_logo_small.png',
			right: 5,
			height: 18,
			width: 58,
			borderRadius: 3,
			backgroundColor: 'white'
		});
	} else {
		var imgDOLLogo = Ti.UI.createImageView({
			image:'images/whd_logo_small.png',
			right: 5,
			height: 20,
			width: 52,
			borderRadius: 3,
			backgroundColor: 'white'
		});
	}
	vwHeader.add(imgDOLLogo);
	
	var lblSource = Ti.UI.createLabel({
		//borderColor: 'white',
	    //top:5, bottom:5, 
	    right:imgDOLLogo.width + 10, 
	    width: 'auto',
	    height:'auto',
	    //text: '(Dept of Labor/' + evt.source + ')',
	    text: '(Dept of Labor)',
	    font:{fontSize:'12dp', fontStyle:'italic'},
	    color:'#999999'
	});
	vwHeader.add(lblSource);
	
	if (Ti.Platform.osname != 'android') {
		
		section.headerView = vwHeader;
	} else {
		var rowHeader = Ti.UI.createTableViewRow({
			hasChild:false,
			height: 30,
			backgroundColor: 'black',
			touchEnabled: false
		});
		rowHeader.add(vwHeader);
		section.add(rowHeader);
	}
	
	//if (evt.source == 'OSHA') {
	//	section.headerTitle = "Source: Dept of Labor, OSHA";	
	//} else {
	//	section.headerTitle = "Source: Dept of Labor, WHD";
	//}
	
	for (var i in json.rows) {
		var data, name, address, violation;
		
		if (evt.source == 'OSHA') {
			data = {
				industry: evt.industry,
				activity_nr: json.rows[i].c[0].v,
				estab_name: json.rows[i].c[1].v,
				site_address: json.rows[i].c[2].v,
				site_city: json.rows[i].c[3].v,
				site_state: json.rows[i].c[4].v,
				site_zip: json.rows[i].c[5].v,
				
				total_current_penalty: json.rows[i].c[6].v,
				osha_violation_indicator: json.rows[i].c[7].v,
				serious_violations: json.rows[i].c[8].v,
				total_violations: json.rows[i].c[9].v,
				yahoo_lat: json.rows[i].c[10].v,
				yahoo_lon: json.rows[i].c[11].v
			};
			name = json.rows[i].c[1].v;
			address = json.rows[i].c[2].v + ', ' + json.rows[i].c[3].v + ', ' + json.rows[i].c[4].v;
			violation = json.rows[i].c[7].v;
		} else {
			
			var start_date = json.rows[i].c[18].v;
			start_date = start_date.substr(6,10);
			var iFindingsStartDate = parseInt(start_date);
			var findings_start_date = new Date(iFindingsStartDate * 1000);
			var month = parseInt(findings_start_date.getUTCMonth()) + 1;
			
			start_date = (month < 10 ? '0' : '') + month + '/' + 
				(findings_start_date.getUTCDate() < 10 ? '0' : '') + findings_start_date.getUTCDate() + '/' + 
				(findings_start_date.getUTCFullYear() < 10 ? '0' : '') + findings_start_date.getUTCFullYear();
			
			var end_date = json.rows[i].c[19].v;
			end_date = end_date.substr(6,10);
			var iFindingsStartDate = parseInt(end_date);
			var findings_start_date = new Date(iFindingsStartDate * 1000);
			var month = parseInt(findings_start_date.getUTCMonth()) + 1;
			
			end_date = (month < 10 ? '0' : '') + month + '/' + 
				(findings_start_date.getUTCDate() < 10 ? '0' : '') + findings_start_date.getUTCDate() + '/' + 
				(findings_start_date.getUTCFullYear() < 10 ? '0' : '') + findings_start_date.getUTCFullYear();
			
			data = {
				industry: evt.industry,
				trade_nm: json.rows[i].c[0].v,
				street_addr_1_txt: json.rows[i].c[1].v,
				city_nm: json.rows[i].c[2].v,
				st_cd: json.rows[i].c[3].v,
				zip_cd: json.rows[i].c[4].v,
				whd_violation_indicator: json.rows[i].c[5].v,
				naics_code_description: json.rows[i].c[6].v,
				
				flsa_violtn_cnt: json.rows[i].c[7].v,
				flsa_repeat_violator: json.rows[i].c[8].v,
				flsa_bw_atp_amt: json.rows[i].c[9].v,
				flsa_ee_atp_cnt: json.rows[i].c[10].v,
				flsa_mw_bw_atp_amt: json.rows[i].c[11].v,
				
				flsa_ot_bw_atp_amt: json.rows[i].c[12].v,
				flsa_15a3_bw_atp_amt: json.rows[i].c[13].v,
				flsa_cmp_assd_amt: json.rows[i].c[14].v,
				flsa_cl_violtn_cnt: json.rows[i].c[15].v,
				flsa_cl_minor_cnt: json.rows[i].c[16].v,
				
				flsa_cl_cmp_assd_amt: json.rows[i].c[17].v,
				findings_start_date: start_date,
				findings_end_date: end_date,
				yahoo_lat: json.rows[i].c[20].v,
				yahoo_lon: json.rows[i].c[21].v
			
			};
			name = json.rows[i].c[0].v;
			address = json.rows[i].c[1].v + ', ' + json.rows[i].c[2].v + ', ' + json.rows[i].c[3].v;
			violation = json.rows[i].c[5].v;
		}
		
		var rowDOL = Ti.UI.createTableViewRow({
			hasChild:true,
			height: Ti.Platform.osname == 'android' ? 44 : 'auto',
			className: 'name',
			dol_data: data,
			source: evt.source,
			selectedBackgroundColor: rowSelectionColor,
		});
		
		var lblBizName = Ti.UI.createLabel({
			text: name,
			color: 'black',
			//top: Ti.Platform.osname == 'android' ? 2 : 5,
			//height: Ti.Platform.osname == 'android' ? 20 : 15,
			top: 5,
			height: 18,
			left: 10,
			width: Titanium.Platform.displayCaps.platformWidth - 75,
			textAlign: 'left',
			touchEnabled: false,
			font:{fontSize:'14dp', fontWeight:'bold'}
		});
		rowDOL.add(lblBizName);
		
		var imgViolation = Ti.UI.createImageView({
			//image:'food_green.png',
			right: 5,
			height: 30,
			//top: 5,
			width: 30,
			touchEnabled: false
			//borderColor: 'black'
		});
		
		if (violation == 0) {
			if (evt.industry == 'Food') {
				imgViolation.image = 'images/food_green.png';
			}
			else if (evt.industry == 'Retail') {
				imgViolation.image = 'images/retail_green.png';
			} else {
				imgViolation.image = 'images/hospitality_green.png';
			}
		} else {
			if (evt.industry == 'Food') {
				imgViolation.image = 'images/food_red.png';
			}
			else if (evt.industry == 'Retail') {
				imgViolation.image = 'images/retail_red.png';
			} else {
				imgViolation.image = 'images/hospitality_red.png';
			}
		}
		
		rowDOL.add(imgViolation);
		
		var lblBizAddress = Ti.UI.createLabel({
			text: address,
			color: 'gray',
			//borderColor: 'black',
			//top: Ti.Platform.osname == 'android' ? 22 : 25,
			top: 23,
			//height: Ti.Platform.osname == 'android' ? 20 : 10,
			height: 15,
			left: 10,
			touchEnabled: false,
			//bottom: Ti.Platform.osname == 'android' ? 2 : 5,
			bottom: 5,
			width: Titanium.Platform.displayCaps.platformWidth - 100,
			textAlign: 'left',
		    //font:{fontSize: Ti.Platform.osname == 'android' ? 14 : 10}
		    font:{fontSize: '12dp'}
		});
		rowDOL.add(lblBizAddress);
		
		
		//winDOLMap.tvDolList.appendRow(rowDOL);
		section.add(rowDOL);
		
	}

	if (section.rowCount > 0) {
		var newData = winDOLMap.tvDolList.data;	
		
		newData.push(section);
		winDOLMap.tvDolList.setData(newData);	
	}
	
	
});