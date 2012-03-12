function WinSearch() {
	var app = require('/lib/globals');
	var hideRedoButton = false;
	var googleMapVisible = true;
	
	var btnHome = Titanium.UI.createButton({
		title: 'Home',
		style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});
	btnHome.addEventListener('click', function(evt){
		
		app.tgSearch.animate({opacity:0,duration:300}, function() {
			app.CurrentLocation.latitude = googleMap.evalJS('getMapCenterLat();');
			app.CurrentLocation.longitude = googleMap.evalJS('getMapCenterLng();');
			googleMap.evalJS('removeListeners();');
			wvDolList.evalJS('removeListeners();');
			self.close();
			
			app.winSearch = null;
			app.tabSearch1 = null;
			app.tgSearch.close();
			app.tgSearch = null;
		});
		app.winHome.ui.animate({opacity:1,duration:300});
		
	});
	
	var self = Titanium.UI.createWindow({
		leftNavButton: btnHome,
		orientationModes: app.ORIENTATION_MODES,
		tabBarHidden: true,
		navBarHidden: Ti.Platform.osname == 'android' ? true : false,
		barColor: app.HEADER_COLOR,
		backgroundColor: 'black'
	});
	self.addEventListener('android:back', function(){
		app.CurrentLocation.latitude = googleMap.evalJS('getMapCenterLat();');
		app.CurrentLocation.longitude = googleMap.evalJS('getMapCenterLng();');
		wvDolList.evalJS('removeListeners();');
		googleMap.evalJS('removeListeners();');
		
		self.close();
		app.winSearch = null;
	});
		
	var tvDolList = Titanium.UI.createTableView({
		separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle,
		top: 0,
		visible: true,
		bottom: 44,
		separatorColor: 'transparent',
		backgroundColor: 'white',
		
	});
	tvDolList.addEventListener('click', function(evt) {
		if (typeof evt.row.data != 'undefined') {
			var WinBizDetail = require('/lib/WinBizDetail');
			app.winBizDetail = new WinBizDetail(evt.row.data);
			WinBizDetail = null;
			
			if (Ti.Platform.osname == 'android') {
				app.winBizDetail.ui.open();
			} else {
				app.tabSearch1.open(app.winBizDetail.ui);	
			}
			
			self.barColor = app.HEADER_COLOR;
		}
		
	});
	self.add(tvDolList);
	
	var googleMap = Titanium.UI.createWebView({
	    url: '/lib/map.html',
	    top: 0,
	    bottom: 44,
	    left: 0,
	    scalesPageToFit: true,
	    visible: true
	});
	googleMap.addEventListener('load', function(evt) {
		wvDolList.url = '/lib/gviz.html';
		
	});
	googleMap.addEventListener('error', function(evt) {
		alert('Webpage not available.');
	});
	self.add(googleMap);
	
	var wvDolList = Titanium.UI.createWebView({
	    top: 0,
	    left: 0,
	    visible: false
	});
	wvDolList.addEventListener('beforeload', function(evt) {
		app.vwIndicator.show(self);
		
	});
	wvDolList.addEventListener('load', function(evt) {
		Ti.App.fireEvent('setMapCenter',{lat: app.CurrentLocation.latitude, lon: app.CurrentLocation.longitude});
		update(app.FilterSettings.SearchName);	
		app.vwIndicator.hide(self);
	});
	self.add(wvDolList);
	
	var btnRedoSearch = Titanium.UI.createButton({
		title: 'Redo Search in This Area',
		style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
		bottom: 44,
		backgroundImage: '/images/black_button_192x36.png',
		backgroundSelectedImage: '/images/black_button_192x36_pressed.png',
		width: Ti.Platform.osname == 'android' ? 192 : 160,
		height: Ti.Platform.osname == 'android' ? 36 : 30,
		color: 'white',
		font:{fontSize: Ti.Platform.osname == 'android' ? '14dp' : '12dp',fontWeight:'bold'}
	});
	btnRedoSearch.addEventListener('click', function(evt){
		update(app.FilterSettings.SearchName);		
	});
	self.add(btnRedoSearch);
	
	if (Ti.Platform.osname == 'android') {
		
		var btnNav = Titanium.UI.createImageView({
			left: 10,
			height: 34,
			width: 54,
			image: '/images/arrow_54x34.png',
			backgroundImage: '/images/toolbar_button_54x34.png',
			backgroundSelectedImage: '/images/toolbar_button_54x34_pressed.png',
		});
		btnNav.addEventListener('click', function(evt){
			var WinLocation = require('/lib/WinLocation');
			app.winLocation = new WinLocation();
			app.winLocation.ui.open();
			WinLocation = null;
		});
		
		var btnMap = Titanium.UI.createLabel({
			text: 'List',
			color: 'white',
			height: 34,
			width: 54,
			textAlign: 'center',
			font:app.Font.button1,
			backgroundImage: '/images/toolbar_button_54x34.png',
			backgroundSelectedImage: '/images/toolbar_button_54x34_pressed.png',
		});
		btnMap.addEventListener('click', function(evt){
			if (!googleMapVisible) {
				btnMap.text = 'List';
				tvDolList.animate({opacity: 0, duration:300});
				googleMap.animate({opacity: 1, duration:300});
				googleMapVisible = true;
				if (hideRedoButton) {
					btnRedoSearch.visible = false;
				} else {
					btnRedoSearch.visible = true;
				}
			} else {
				btnMap.text = 'Map';
				tvDolList.animate({opacity: 1, duration:300});
				googleMap.animate({opacity: 0, duration:300});
				btnRedoSearch.visible = false;
				googleMapVisible = false;
			}
				
		});
		
		var btnFilter = Titanium.UI.createLabel({
			text: 'Search',
			color: 'white',
			right: 10,
			height: 34,
			width: 54,
			textAlign: 'center',
			font:app.Font.button1,
			backgroundImage: '/images/toolbar_button_54x34.png',
			backgroundSelectedImage: '/images/toolbar_button_54x34_pressed.png',
		});
		btnFilter.addEventListener('click', function(evt){
			var WinFilter = require('/lib/WinFilter');
			app.winFilter = new WinFilter();
			app.winFilter.ui.open();
			WinFilter = null;
		});
		
		var vwBottom = Ti.UI.createView({
			bottom: 0, left: 0, right: 0,
			height: 44,
			backgroundImage: '/images/toolbar_background.png'
		});

		vwBottom.add(btnNav);
		vwBottom.add(btnMap);
		vwBottom.add(btnFilter);
		
		self.add(vwBottom);
	} else {
		var flexSpace = Titanium.UI.createButton({
			systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
		});
		
		var btnNav = Titanium.UI.createButton({
			image: '/images/arrow_15x15.png',
			width: 40,
			style: Ti.UI.iPhone.SystemButtonStyle.BORDERED
		});
		btnNav.addEventListener('click', function(evt){
			var WinLocation = require('/lib/WinLocation');
			app.winLocation = new WinLocation();
			app.winLocation.ui.open({modalTransitionStyle:Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,modalStyle:Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET});	
			WinLocation = null;
			
		});
		
		var tabBar = Ti.UI.iOS.createTabbedBar({
			labels:[{title: 'Map', width: 50},{title:'List',width:50}],
			backgroundColor: app.HEADER_COLOR,
			index:0
		});
		tabBar.addEventListener('click', function(evt){
			if (evt.index == 0) {
				tvDolList.animate({opacity: 0, duration:300});
				googleMap.animate({opacity: 1, duration:300});
				googleMapVisible = true;
				if (hideRedoButton) {
					btnRedoSearch.visible = false;
				} else {
					btnRedoSearch.visible = true;
				}
				
			} else {
				googleMapVisible = false;
				tvDolList.animate({opacity: 1, duration:300});
				googleMap.animate({opacity: 0, duration:300});
				btnRedoSearch.visible = false;
			}
		});
		
		var btnFilter = Titanium.UI.createButton({
			title: 'Search',
			style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
		});
		btnFilter.addEventListener('click', function(evt){
			var WinFilter = require('/lib/WinFilter');
			app.winFilter = new WinFilter();
			app.winFilter.ui.open({modalTransitionStyle:Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,modalStyle:Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET});
			WinFilter = null;
			
		});
		
		var toolbarBottom = Ti.UI.iOS.createToolbar({
			items:[btnNav,flexSpace,tabBar,flexSpace,btnFilter],
			bottom:0,
			borderWidth:0,
			barColor: app.HEADER_COLOR
		});	
		self.add(toolbarBottom);
	}
	
	this.ui = self;
	
	function getYelpList(evt, industry) {
		
		if (evt.businesses.length > 0) {
			tvDolList.separatorStyle = Titanium.UI.iPhone.TableViewSeparatorStyle;
			
		} else {
			tvDolList.separatorColor = 'transparent';
		}
		
		var section = Titanium.UI.createTableViewSection({
			font:app.Font.h5
		});
		
		var vwYelpHeader = Ti.UI.createView({
			height:30,
			backgroundColor: 'black'
		});
		
		var industryIcon = '';
		if (industry == 'Food') {
			industryIcon = '/images/food_yellow_matte.png';
		} else if (industry == 'Retail') {
			industryIcon = '/images/retail_blue_matte.png';
		} else {
			industryIcon = '/images/hospitality_purple_matte.png';
		} 
		var imgIndustryIcon = Ti.UI.createImageView({
		    left:10, 
		    width: 22,
		    height:22,
		    image: industryIcon
		});
		vwYelpHeader.add(imgIndustryIcon);
		
		var lblYelpHeader = Ti.UI.createLabel({
		    left: imgIndustryIcon.left + imgIndustryIcon.width + 10,
		    width: 'auto',
		    height:'auto',
		    text: industry,
		    font:app.Font.h2,
		    color:'white'
		});
		vwYelpHeader.add(lblYelpHeader);
		
		var imgYelpLogo = Ti.UI.createImageView({
			image:'/images/yelp_logo_50x25.png',
			right: 5,
			height: 27,
			width: 51
		});
		vwYelpHeader.add(imgYelpLogo);
		
		var lblYelpSource = Ti.UI.createLabel({
		    right:imgYelpLogo.width + 10, 
		    width: 'auto',
		    height:'auto',
		    text: 'yelp.com',
		    font: app.Font.h6,
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
				selectedBackgroundColor: 'black'
			});
			rowHeader.add(vwYelpHeader);
			section.add(rowHeader);
		}
		
		for (var i in evt.businesses) {
			
			var displayBiz = false;
					
			var bizName = evt.businesses[i].name;
			bizName = bizName.toUpperCase();
			
			if (app.FilterSettings.SearchName) {
				var searchName = app.FilterSettings.SearchName;
				searchName = searchName.toUpperCase();	
				if (bizName.search(searchName) != -1) {
					displayBiz = true;
				}
			} else {
				displayBiz = true;
			}
			
			if (displayBiz) {
				data = {
					source: 'Yelp',
					industry: industry,
					biz_name: evt.businesses[i].name,
					image_url: evt.businesses[i].image_url,
					address: evt.businesses[i].location.address,
					city: evt.businesses[i].location.city,
					state: evt.businesses[i].location.state_code,
					zip: evt.businesses[i].location.postal_code,
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
					selectedBackgroundColor: app.ROW_SELECTION_COLOR,
				});
				
				var lblBizName = Ti.UI.createLabel({
					text: evt.businesses[i].name,
					color: 'black',
					top: 5,
					height: 18,
					left: 10,
					width: Titanium.Platform.displayCaps.platformWidth - 75,
					textAlign: 'left',
					touchEnabled: false,
					font:app.Font.button1
					
				
				});
				rowDOL.add(lblBizName);
				
				var imgRating = Ti.UI.createImageView({
					image: evt.businesses[i].rating_img_url_small,
					right: 5,
					height: 10,
					width: 50,
					touchEnabled: false
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
					top: 23,
					height: 15,
					left: 10,
					touchEnabled: false,
					bottom: 5,
					width: Titanium.Platform.displayCaps.platformWidth - 100,
					textAlign: 'left',
				    font: app.Font.p2
				    
				});
				rowDOL.add(lblBizAddress);
				
				section.add(rowDOL);
			}
			
			
			
		}
		
		var results = false;
		if (Ti.Platform.osname == 'android') {
			if (section.rowCount > 1) {
				results = true;
			}
		} else {
			if (section.rowCount > 0) {
				results = true;
			}
		}
		if (results == true) {
			var newData = tvDolList.data;	
			
			newData.push(section);
			tvDolList.setData(newData);	
		} else {
			var rowResults = Ti.UI.createTableViewRow({
				hasChild: false,
				title: 'No Results',
				color: 'black',
				selectedBackgroundColor: 'white',
				selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
			});
			section.add(rowResults);
			
			var newData = tvDolList.data;	
			newData.push(section);
			tvDolList.setData(newData);	
		}
		
	}
	
	function zoomChanged(evt) {
		
		if (evt.hideRedoButton == true) {
			hideRedoButton = true;
			btnRedoSearch.visible = false;
			
		} else {
			
			hideRedoButton = false;
			if (googleMapVisible == true) {
				btnRedoSearch.visible = true;	
			}
				
		}
	}
	this.zoomChanged = zoomChanged;
	
	function yelpMarkerClicked(evt) {
		evt.biz_name = unescape(evt.name);
		evt.address = unescape(evt.address);
		evt.city = unescape(evt.city);
		evt.state = evt.state_code;
		evt.zip = evt.postal_code;
		evt.source = 'Yelp';
		
		var WinBizDetail = require('/lib/WinBizDetail');
		app.winBizDetail = new WinBizDetail(evt);
		WinBizDetail = null;
		
		if (Ti.Platform.osname == 'android') {
			app.winBizDetail.ui.open();
		} else {
			app.tabSearch1.open(app.winBizDetail.ui);	
		}
		
		self.barColor = app.HEADER_COLOR;
	}
	this.yelpMarkerClicked = yelpMarkerClicked;
	
	function oshaMarkerClicked(evt) {
		evt.biz_name = unescape(evt.estab_name);
		evt.address = unescape(evt.site_address);
		evt.city = unescape(evt.site_city);
		evt.state = unescape(evt.site_state);
		evt.zip = unescape(evt.site_zip);
		evt.source = 'OSHA';
		
		var WinBizDetail = require('/lib/WinBizDetail');
		app.winBizDetail = new WinBizDetail(evt);
		WinBizDetail = null;
		
		if (Ti.Platform.osname == 'android') {
			app.winBizDetail.ui.open();
		} else {
			app.tabSearch1.open(app.winBizDetail.ui);	
		}
		
		self.barColor = app.HEADER_COLOR;
	}
	this.oshaMarkerClicked = oshaMarkerClicked;
	
	function whdMarkerClicked(evt) {
		evt.biz_name = unescape(evt.trade_nm);
		evt.address = unescape(evt.street_addr_1_txt);
		evt.city = unescape(evt.city_nm);
		evt.naics_code_description = unescape(evt.naics_code_description);
		evt.findings_start_date = unescape(evt.findings_start_date);
		evt.findings_end_date = unescape(evt.findings_end_date);
		evt.flsa_repeat_violator = unescape(evt.flsa_repeat_violator);
		evt.state = evt.st_cd;
		evt.zip = evt.zip_cd;
		evt.source = 'WHD';
		
		var WinBizDetail = require('/lib/WinBizDetail');
		app.winBizDetail = new WinBizDetail(evt);
		WinBizDetail = null;
		
		if (Ti.Platform.osname == 'android') {
			app.winBizDetail.ui.open();
		} else {
			app.tabSearch1.open(app.winBizDetail.ui);	
		}
		
		self.barColor = app.HEADER_COLOR;
	}
	this.whdMarkerClicked = whdMarkerClicked;
	
	function getLocalYelp(evt) {
		
		var food_category = 'food,restaurants';
		var retail_category = 'shopping';
		var hospitality_category = 'bedbreakfast,hostels,hotels,skiresorts';
		
		var YelpApi = require('/lib/YelpApi');
		
		switch (app.FilterSettings.Industry) {
			case app.Filter.INDUSTRY_FOOD:
				YelpApi.searchRequest(app.FilterSettings.SearchName,null,null, food_category, evt.ll, 
					function(response) {
						
						// WANT PASS ON PARSED VALUES HERE BUT ANDROID WONT SEE THEM: TIMOB-5499
						var jsonResponse = JSON.parse(response);
						if (jsonResponse.businesses.length > 0) {
							
					    	Ti.App.fireEvent('setYelpFoodMarkers', {response:response, searchName:app.FilterSettings.SearchName});
					    	
					    }
					    getYelpList(jsonResponse, 'Food');
					    /*
						if (response.businesses.length > 0) {
	
					    	Ti.App.fireEvent('setYelpFoodMarkers', {response:response, searchName:app.FilterSettings.SearchName});
					    	getYelpList(response, 'Food');
					    }
					    */
					},  
					function(evt) {
						Ti.API.error("Error: " + evt.error);
					    Titanium.UI.createAlertDialog({
					        title: "Yelp",
					        message: "Yelp search could not be completed.",
					        buttonNames: ['OK']
					    }).show();
				});
				break;
			case app.Filter.INDUSTRY_RETAIL:
				YelpApi.searchRequest(app.FilterSettings.SearchName,null,null, retail_category, evt.ll, 
					function(response) {     
						var jsonResponse = JSON.parse(response);
						if (jsonResponse.businesses.length > 0) {
	
					    	Ti.App.fireEvent('setYelpRetailMarkers', {response:response, searchName:app.FilterSettings.SearchName});
					    	
					    }
					    getYelpList(jsonResponse, 'Retail');
					    /*
					    if (response.businesses.length > 0) {
					    	Ti.App.fireEvent('setYelpRetailMarkers', {response:response, searchName:app.FilterSettings.SearchName});
					    	getYelpList(response, 'Retail');
					    }
					    */
						
					},  
					function(evt) {
						Ti.API.error("Error: " + evt.error);
					    Titanium.UI.createAlertDialog({
					        title: "Yelp",
					        message: "Yelp search could not be completed.",
					        buttonNames: ['OK']
					    }).show();
				});
				break;
			case app.Filter.INDUSTRY_HOSPITALITY:
				YelpApi.searchRequest(app.FilterSettings.SearchName,null,null, hospitality_category, evt.ll, 
					function(response) {  
						var jsonResponse = JSON.parse(response);
						if (jsonResponse.businesses.length > 0) {
	
					    	Ti.App.fireEvent('setYelpHospitalityMarkers', {response:response, searchName:app.FilterSettings.SearchName});
					    	
					    }
					    getYelpList(jsonResponse, 'Hospitality');
					    /*   
					    if (response.businesses.length > 0) {
					    	Ti.App.fireEvent('setYelpHospitalityMarkers', {response:response, searchName:app.FilterSettings.SearchName});
					    	
					    	getYelpList(response, 'Hospitality');
					    }
					    */
						
					},  
					function(evt) {
						Ti.API.error("Error: " + evt.error);
					    Titanium.UI.createAlertDialog({
					        title: "Yelp",
					        message: "Yelp search could not be completed.",
					        buttonNames: ['OK']
					    }).show();
				});
				break;
			case app.Filter.INDUSTRY_ALL:
				YelpApi.searchRequest(app.FilterSettings.SearchName,null,null, food_category, evt.ll, 
					function(response) {     
						
						var jsonResponse = JSON.parse(response);
						if (jsonResponse.businesses.length > 0) {
	
					    	Ti.App.fireEvent('setYelpFoodMarkers', {response:response, searchName:app.FilterSettings.SearchName});
					    	
					    }
					    getYelpList(jsonResponse, 'Food');
					    /*
					    if (response.businesses.length > 0) {
					    	Ti.App.fireEvent('setYelpFoodMarkers', {response:response, searchName:app.FilterSettings.SearchName});
					    	
					    	getYelpList(response, 'Food');
					    }
					    */
					    YelpApi.searchRequest(app.FilterSettings.SearchName,null,null, retail_category, evt.ll, 
							function(response) {    
								var jsonResponse = JSON.parse(response);
								if (jsonResponse.businesses.length > 0) {
			
							    	Ti.App.fireEvent('setYelpRetailMarkers', {response:response, searchName:app.FilterSettings.SearchName});
							    	
							    }
							    getYelpList(jsonResponse, 'Retail');
								/* 
							    if (response.businesses.length > 0) {
							    	Ti.App.fireEvent('setYelpRetailMarkers', {response:response, searchName:app.FilterSettings.SearchName});
							    	
							    	getYelpList(response, 'Retail');
							    }
							    */
							    YelpApi.searchRequest(app.FilterSettings.SearchName,null,null, hospitality_category, evt.ll, 
									function(response) {  
										var jsonResponse = JSON.parse(response);
										if (jsonResponse.businesses.length > 0) {
					
									    	Ti.App.fireEvent('setYelpHospitalityMarkers', {response:response, searchName:app.FilterSettings.SearchName});
									    	
									    }
									    getYelpList(jsonResponse, 'Hospitality');
									    /*   
										if (response.businesses.length > 0) {
									    	Ti.App.fireEvent('setYelpHospitalityMarkers', {response:response, searchName:app.FilterSettings.SearchName});
									    	
									    	getYelpList(response, 'Hospitality');
									    }
									    */
										
									},  
									function(evt) {
										Ti.API.error("Error: " + evt.error);
									    Titanium.UI.createAlertDialog({
									        title: "Yelp",
									        message: "Yelp search could not be completed.",
									        buttonNames: ['OK']
									    }).show();
								});
							},  
							function(evt) {
								Ti.API.error("Error: " + evt.error);
							    Titanium.UI.createAlertDialog({
							        title: "Yelp",
							        message: "Yelp search could not be completed.",
							        buttonNames: ['OK']
							    }).show();
						});
					},  
					function(evt) {
						Ti.API.error("Error: " + evt.error);
					    Titanium.UI.createAlertDialog({
					        title: "Yelp",
					        message: "Yelp search could not be completed.",
					        buttonNames: ['OK']
					    }).show();
				});
				
				break;
		}
		
	}
	this.getLocalYelp = getLocalYelp;
	
	function getDOLList(evt) {
		var json = JSON.parse(evt.response);
	
		if (json.rows.length > 0) {
			tvDolList.separatorStyle = Titanium.UI.iPhone.TableViewSeparatorStyle;
			
		}
		else {
			tvDolList.separatorColor = 'transparent';
		}
		
		var section = Titanium.UI.createTableViewSection({
			font:app.Font.h5,
			backgroundColor: 'black'
		});
		
		var vwHeader = Ti.UI.createView({
			height:30,
			backgroundColor: 'black'
		});
		
		var industryIcon = '';
		if (evt.industry == 'Food') {
			industryIcon = '/images/food_yellow_matte.png';
		} else if (evt.industry == 'Retail') {
			industryIcon = '/images/retail_blue_matte.png';
		} else {
			industryIcon = '/images/hospitality_purple_matte.png';
		} 
		var imgIndustryIcon = Ti.UI.createImageView({
		    left:10, 
		    width: 22,
		    height:22,
		    image: industryIcon
		});
		vwHeader.add(imgIndustryIcon);
		
		var lblHeader = Ti.UI.createLabel({
		    left: imgIndustryIcon.left + imgIndustryIcon.width + 10,
		    width: 'auto',
		    height:'auto',
		    text: evt.industry,
		    font:app.Font.h2,
		    color:'white'
		});
		vwHeader.add(lblHeader);
		
		var imgDOLLogo;
		if (evt.source == 'OSHA') {
			var imgDOLLogo = Ti.UI.createImageView({
				image:'/images/osha_logo_small.png',
				right: 5,
				height: 18,
				width: 58,
				borderRadius: 3,
				backgroundColor: 'white'
			});
		} else {
			var imgDOLLogo = Ti.UI.createImageView({
				image:'/images/whd_logo_small.png',
				right: 5,
				height: 20,
				width: 52,
				borderRadius: 3,
				backgroundColor: 'white'
			});
		}
		vwHeader.add(imgDOLLogo);
		
		var lblSource = Ti.UI.createLabel({ 
		    right:imgDOLLogo.width + 10, 
		    width: 'auto',
		    height:'auto',
		    text: 'Dept of Labor',
		    font:app.Font.h6,
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
				selectedBackgroundColor: 'black'
			});
			rowHeader.add(vwHeader);
			section.add(rowHeader);
		}
	
		
		for (var i in json.rows) {
			var data, name, address, violation;
			
			if (evt.source == 'OSHA') {
				data = {
					source: evt.source,
					industry: evt.industry,
					activity_nr: json.rows[i].c[0].v,
					biz_name: json.rows[i].c[1].v,
					address: json.rows[i].c[2].v,
					city: json.rows[i].c[3].v,
					state: json.rows[i].c[4].v,
					zip: json.rows[i].c[5].v,
					
					total_current_penalty: json.rows[i].c[6].v,
					violation_indicator: json.rows[i].c[7].v,
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
					source: evt.source,
					industry: evt.industry,
					biz_name: json.rows[i].c[0].v,
					address: json.rows[i].c[1].v,
					city: json.rows[i].c[2].v,
					state: json.rows[i].c[3].v,
					zip: json.rows[i].c[4].v,
					violation_indicator: json.rows[i].c[5].v,
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
				data: data,
				source: evt.source,
				selectedBackgroundColor: app.ROW_SELECTION_COLOR,
			});
			
			var lblBizName = Ti.UI.createLabel({
				text: name,
				color: 'black',
				top: 5,
				height: 18,
				left: 10,
				width: Titanium.Platform.displayCaps.platformWidth - 75,
				textAlign: 'left',
				touchEnabled: false,
				font:app.Font.button1
			});
			rowDOL.add(lblBizName);
			
			var imgViolation = Ti.UI.createImageView({
				right: 5,
				height: 30,
				width: 30,
				touchEnabled: false
			});
			
			if (violation == 0) {
				if (evt.industry == 'Food') {
					imgViolation.image = '/images/food_green.png';
				}
				else if (evt.industry == 'Retail') {
					imgViolation.image = '/images/retail_green.png';
				} else {
					imgViolation.image = '/images/hospitality_green.png';
				}
			} else {
				if (evt.industry == 'Food') {
					imgViolation.image = '/images/food_red.png';
				}
				else if (evt.industry == 'Retail') {
					imgViolation.image = '/images/retail_red.png';
				} else {
					imgViolation.image = '/images/hospitality_red.png';
				}
			}
			
			rowDOL.add(imgViolation);
			
			var lblBizAddress = Ti.UI.createLabel({
				text: address,
				color: 'gray',
				top: 23,
				height: 15,
				left: 10,
				touchEnabled: false,
				bottom: 5,
				width: Titanium.Platform.displayCaps.platformWidth - 100,
				textAlign: 'left',
			    font:app.Font.p2
			});
			rowDOL.add(lblBizAddress);
			
			
			//tvDolList.appendRow(rowDOL);
			section.add(rowDOL);
			
		}
		
		var results = false;
		if (Ti.Platform.osname == 'android') {
			if (section.rowCount > 1) {
				results = true;
			}
		} else {
			if (section.rowCount > 0) {
				results = true;
			}
		}
		if (results == true) {
			var newData = tvDolList.data;	
			
			newData.push(section);
			tvDolList.setData(newData);	
		} else {
			var rowResults = Ti.UI.createTableViewRow({
				hasChild: false,
				title: 'No Results',
				color: 'black',
				selectedBackgroundColor: 'white',
				selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
			});
			section.add(rowResults);
			
			var newData = tvDolList.data;	
			newData.push(section);
			tvDolList.setData(newData);	
		}
		
	}
	this.getDOLList = getDOLList;
	
	function sourceOSHA(name,ll) {
		var where = '';
		
		switch (app.FilterSettings.Inspections) {
		case app.Filter.INSPECTIONS_VIOLATIONS:
			where = 'osha_violation_indicator = 1';
			break;
		case app.Filter.INSPECTIONS_NOVIOLATIONS:
			where = 'osha_violation_indicator = 0';
			break;
		case app.Filter.INSPECTIONS_ALL:
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
		
		Ti.App.fireEvent('setLayer', {where: where, source:'OSHA', industry: app.FilterSettings.Industry});
		Ti.App.fireEvent('getFusionTable', {where: where, ll: ll, source:'OSHA', industry: app.FilterSettings.Industry});
		
	}
	
	function sourceWHD(name,ll) {
		var where = '';
		
		switch (app.FilterSettings.Inspections) {
		case app.Filter.INSPECTIONS_VIOLATIONS:
			where = 'whd_violation_indicator = 1';
			break;
		case app.Filter.INSPECTIONS_NOVIOLATIONS:
			where = 'whd_violation_indicator = 0';
			break;
		case app.Filter.INSPECTIONS_ALL:
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
		
		Ti.App.fireEvent('setLayer', {where: where, source:'WHD', industry: app.FilterSettings.Industry});
		Ti.App.fireEvent('getFusionTable', {where: where, ll: ll, source:'WHD', industry: app.FilterSettings.Industry});
		
	}
	
	function sourceDOL(name,ll) {
		switch (app.FilterSettings.DolSource) {
		case app.Filter.DOLSOURCE_OSHA:
			sourceOSHA(name,ll);
			break;
		case app.Filter.DOLSOURCE_WHD:
			sourceWHD(name,ll);
			break;
		case app.Filter.DOLSOURCE_ALL:
			sourceWHD(name,ll);
			sourceOSHA(name,ll);
			break;
		}
	}
	
	function update(name) {
		
		if(!Ti.Network.online) {
			alert('Network unavailable. Check your network settings.');
		} else {
			var ll = googleMap.evalJS('getMapCenterLat();')	+ ',' + googleMap.evalJS('getMapCenterLng();');
		
			switch (app.FilterSettings.Source) {
			case app.Filter.SOURCE_DOL:
				Ti.App.fireEvent('clearYelpMarkers', null);
				googleMap.evalJS('clearLayers();');
				tvDolList.data = [];
				
				sourceDOL(name,ll);
				
				break;
			case app.Filter.SOURCE_YELP:
				Ti.App.fireEvent('clearYelpMarkers', null);
				googleMap.evalJS('clearLayers();');
				tvDolList.data = [];
				
				getLocalYelp({ll: ll});
				break;
			case app.Filter.SOURCE_ALL:		
				Ti.App.fireEvent('clearYelpMarkers', null);
				googleMap.evalJS('clearLayers();');
				tvDolList.data = [];
				
				sourceDOL(name,ll);
				getLocalYelp({ll: ll});
				break;
			}
		}
		

    }
    this.update = update;
    
    function setLocalZoom() {
    	googleMap.evalJS('setLocalZoom();');
    };
    this.setLocalZoom = setLocalZoom;
    
    function reload() {
    	googleMap.reload();
		wvDolList.reload();
		update(app.FilterSettings.SearchName);	
    }
    this.reload = reload;
}
module.exports = WinSearch;
