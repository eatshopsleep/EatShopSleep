Ti.include('yelp_api.js');
Ti.include('yelp_biz.js');
Ti.include('osha_report.js');
Ti.include('biz_map.js');


var winOSHA_detail = {
	win: null
};

(function() {
    function padCents(amount) {
		var cents = String(amount);
		var pos = cents.search(/\./);
		if (pos != -1) {
			cents = cents.substr(pos+1,2);
			if (cents.length == 1) {
				amount += '0';
			}
		}
		return amount;
		
	}
 
    winOSHA_detail.create = function(osha_data) {
        
        winOSHA_detail.win = Titanium.UI.createWindow({
        	orientationModes: orientationModes,
			backgroundColor: 'white',
			tabBarHidden: true,
			navBarHidden: Ti.Platform.osname == 'android' ? true : false,
			left: Ti.Platform.osname == 'android' ? 0 : Titanium.Platform.displayCaps.platformWidth,
			barColor: headerColor
		});
		winOSHA_detail.win.addEventListener('close', function() {	
			//winDOLMap.win.hideNavBar();
		});
		winOSHA_detail.win.addEventListener('android:back', function() {	
			winOSHA_detail.win.close();
		});
		
		winOSHA_detail.tableView = Titanium.UI.createTableView({
			backgroundColor:'white',
			separatorColor:'white',
			top: 0
		});
		winOSHA_detail.win.add(winOSHA_detail.tableView);
		
		var rowEstablishmentName = Ti.UI.createTableViewRow({
			hasChild:false,
			height:'auto',
			className: 'name',
			backgroundColor: 'black',
			selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
			selectedBackgroundColor: 'black'
		});
		
		var lblEstablishmentName = Ti.UI.createLabel({
			text: osha_data.estab_name,
			color: 'white',
			top: 5,
			bottom: 5,
			height: 'auto',
			left: 10,
			width: Titanium.Platform.displayCaps.platformWidth - 20,
			textAlign: 'left',
		    //font:{fontSize: Ti.Platform.osname == 'android' ? 20 : 18, fontWeight:'bold'}
		    font:{fontSize: '18dp', fontWeight:'bold'}
		});
		rowEstablishmentName.add(lblEstablishmentName);
		winOSHA_detail.tableView.appendRow(rowEstablishmentName);
		
		var rowEstablishmentAddress = Ti.UI.createTableViewRow({
			hasChild:true,
			height:'auto',
			className: 'address',
			selectedBackgroundColor: rowSelectionColor,
		});
		rowEstablishmentAddress.addEventListener('click', function(evt) {
			if (Ti.Platform.osname == 'android') {
				winBizMap.create(osha_data.site_address, osha_data.site_city, osha_data.site_state).open();
			} else {
				tgSearch.activeTab.open(winBizMap.create(osha_data.site_address, osha_data.site_city, osha_data.site_state),{animated:true});
				winDOLMap.win.barColor = headerColor;	
			}
			
		});
		
		var wvBizMap;
		if (Ti.Platform.osname == 'android') {
			wvBizMap = Ti.UI.createImageView({
				image: 'http://maps.googleapis.com/maps/api/staticmap?&markers=color:blue|' + osha_data.yahoo_lat + ',' + osha_data.yahoo_lon + '&zoom=14&scale=1&size=100x100&sensor=false',
				top: 10,
				height: 100,
				left: 10,
				width: 100,
				borderColor: Ti.Platform.osname == 'android' ? 'black' : 'gray',
				borderWidth: 1,
				bottom: 10,
				backgroundColor: 'white',
				touchEnabled: false
			});
		} else {
			wvBizMap = Ti.UI.createWebView({				
				url: 'http://maps.googleapis.com/maps/api/staticmap?&markers=color:blue|' + osha_data.yahoo_lat + ',' + osha_data.yahoo_lon + '&zoom=14&scale=2&size=200x200&sensor=false',
				top: 10,
				height: 100,
				left: 10,
				width: 100,
				borderColor: Ti.Platform.osname == 'android' ? 'black' : 'gray',
				borderWidth: 1,
				bottom: 10,
				backgroundColor: 'white'
			});
		}
		rowEstablishmentAddress.add(wvBizMap);
		
		var lblAddress = Ti.UI.createLabel({
			text: osha_data.site_address + '\n' + osha_data.site_city + ', ' + osha_data.site_state + ' ' + osha_data.site_zip,
			top: 10,
			left: 117,
			right: 5,
			//height: 110,
			//height: 'auto',
			bottom: 10,
			color: 'black',
		    //font:{fontSize: Ti.Platform.osname == 'android' ? 16 : 14},
		    font:{fontSize: '14dp'},
		    touchEnabled: false
		});
		rowEstablishmentAddress.add(lblAddress);
		winOSHA_detail.tableView.appendRow(rowEstablishmentAddress);
		
		var rowOSHAHeader = Ti.UI.createTableViewRow({
			height: Ti.Platform.osname == 'android' ? 40 : 'auto',
			className: 'section_header',
			backgroundColor: headerColor,
			selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
			selectedBackgroundColor: rowSelectionColor
		});
		
		var lblOSHA = Ti.UI.createLabel({
			text: 'Safety & Health Violations',
			left: 10,
			top: 5,
			bottom: 5,
			height: 'auto',
			width: 'auto',
		    //font:{fontSize: Ti.Platform.osname == 'android' ? 18 : 16, fontWeight:'bold'},
		    font:{fontSize: '16dp', fontWeight:'bold'},
		    textAlign:'left',
		    color: 'white',
		});
		rowOSHAHeader.add(lblOSHA);
		winOSHA_detail.tableView.appendRow(rowOSHAHeader);
		
		var rowOSHADetail = Ti.UI.createTableViewRow({
			height:'auto',
			className: 'osha_detail',
			selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
			selectedBackgroundColor: 'white'
		});
		
		var lblInViolation = Ti.UI.createLabel({
			text: 'No Violations',
			top: 10,
			height: 'auto',
			left: 117,
			right: 10,
			textAlign: 'left',
			color: 'black',
		    //font:{fontSize: Ti.Platform.osname == 'android' ? 20 : 18, fontWeight:'bold'}
		    font:{fontSize: '18dp', fontWeight:'bold'},
		});
		rowOSHADetail.add(lblInViolation);
		
		var imgInViolation = Titanium.UI.createImageView({
			left: 10,
			height: 100,
			top: 10,
			width: 100
		});
		if (osha_data.industry == 'Food') {
			imgInViolation.image = 'images/food_green.png';
		}
		else if (osha_data.industry == 'Retail') {
			imgInViolation.image = 'images/retail_green.png';
		} else {
			imgInViolation.image = 'images/hospitality_green.png';
		}
		rowOSHADetail.add(imgInViolation);
        
        if (osha_data.osha_violation_indicator == 1) {
			
			lblInViolation.text = 'Past Violation';
			if (osha_data.industry == 'Food') {
				imgInViolation.image = 'images/food_red.png';
			}
			else if (osha_data.industry == 'Retail') {
				imgInViolation.image = 'images/retail_red.png';
			} else {
				imgInViolation.image = 'images/hospitality_red.png';
			}
			
			var penalties = '', serious_violations = '', total_violations = '';
			
			if (osha_data.total_current_penalty > 0) {
				penalties = '$' + padCents(osha_data.total_current_penalty) + ' in Penalties\n';
			}
			
			if (osha_data.serious_violations > 0) {
				if (osha_data.serious_violations == 1) {
					serious_violations = osha_data.serious_violations + ' Serious violation\n';
				} else {
					serious_violations = osha_data.serious_violations + ' Serious violations\n';
				}
				
			}
			
			if (osha_data.total_violations > 0) {
				if (osha_data.total_violations == 1) {
					total_violations = osha_data.total_violations + ' Total violation\n';
				} else {
					total_violations = osha_data.total_violations + ' Total violations\n';	
				}
				
			}
			
			var lblOSHADetail = Ti.UI.createLabel({
				text: penalties + serious_violations + total_violations,
				top: 35,
				left: 117,
				height: 'auto',
				textAlign: 'left',
				color: 'black',
				//font:{fontSize: Ti.Platform.osname == 'android' ? 16 : 14}
				font:{fontSize: '14dp'}
			});
			rowOSHADetail.add(lblOSHADetail);
			
			
		}
		winOSHA_detail.tableView.appendRow(rowOSHADetail);
		
		var rowSource = Ti.UI.createTableViewRow({
			hasChild: true,
			height: Ti.Platform.osname == 'android' ? 40 : 'auto',
			className: 'section_footer',
			selectedBackgroundColor: rowSelectionColor,
		});
		rowSource.addEventListener('click', function(evt) {
			if (Ti.Platform.osname == 'android') {
				winOSHAReport.create(osha_data.activity_nr).open();
			} else {
				tgSearch.activeTab.open(winOSHAReport.create(osha_data.activity_nr),{animated:true});
			}
			
			winDOLMap.win.barColor = headerColor;
		});
		
		var imgDolLogo = Titanium.UI.createImageView({
			//image:'DoLabor_seal_small.gif',
			image:'images/osha_logo_small.png',
			height: 18,
			width: 58,
			right: 5,
			borderRadius: 3,
			touchEnabled: false
		});
		rowSource.add(imgDolLogo);
		
		var lblSource = Ti.UI.createLabel({
			text: 'Dept of Labor:',
			//left: 117,
			bottom: 5,
			top: 5,
			height: 'auto',
			textAlign: 'right',
			//right: 45,
			right: imgDolLogo.width + 10,
		    //font:{fontSize: Ti.Platform.osname == 'android' ? 16 : 14},
		    font:{fontSize: '14dp'},
		    color: 'gray',
		    touchEnabled: false
		});
		rowSource.add(lblSource);
		
		winOSHA_detail.tableView.appendRow(rowSource);
		
		var rowContactDOLHeader = Ti.UI.createTableViewRow({
			height: Ti.Platform.osname == 'android' ? 40 : 'auto',
			className: 'section_header',
			backgroundColor: headerColor,
			selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
			selectedBackgroundColor: rowSelectionColor
		});
		
		var lblContactDOLHeader = Ti.UI.createLabel({
			text: 'Not a Fair or Safe Business?',
			left: 10,
			top: 5,
			bottom: 5,
			height: 'auto',
			width: 'auto',
		    //font:{fontSize: Ti.Platform.osname == 'android' ? 18 : 16, fontWeight:'bold'},
		    font:{fontSize: '16dp', fontWeight:'bold' },
		    textAlign:'left',
		    color: 'white',
		});
		rowContactDOLHeader.add(lblContactDOLHeader);
		winOSHA_detail.tableView.appendRow(rowContactDOLHeader);
		
		var rowContactDOL = Ti.UI.createTableViewRow({
			hasChild: true,
			height: 'auto',
			className: 'section_footer',
			selectedBackgroundColor: rowSelectionColor,
		});
		rowContactDOL.addEventListener('click', function(evt) {
			if (Ti.Platform.osname == 'android') {
				winAction.createNavWin().open();
			} else {
				tgSearch.activeTab.open(winAction.createNavWin(),{animated:true});	
			}
			
		});
		
		var imgDolLogo = Titanium.UI.createImageView({
			image:'DoLabor_seal_small.gif',
			height: 32,
			width: 32,
			right: 5,
			top: 5,
			bottom: 5,
			touchEnabled: false
		});
		rowContactDOL.add(imgDolLogo);
		
		var lblContactDOL = Ti.UI.createLabel({
			text: 'Contact the Dept of Labor',
			left: 10,
			top: 5,
			bottom: 5,
			height: 'auto',
			width: 'auto',
		    //font:{fontSize: Ti.Platform.osname == 'android' ? 16 : 14, fontWeight:'normal'},
		    font:{fontSize: '14dp'},
		    textAlign:'left',
		    color: 'black',
		    touchEnabled: false
		});
		rowContactDOL.add(lblContactDOL);
		
		winOSHA_detail.tableView.appendRow(rowContactDOL);
		
		yelp_api.searchRequest(osha_data.estab_name, osha_data.site_address, osha_data.site_zip, null, null,
			function(response) {    
			    var jsonResponse = JSON.parse(response);
			    // Use Yelp Data?
			    if (jsonResponse.businesses.length > 0) {

			    	var yelp_street_num = jsonResponse.businesses[0].location.address[0];
				    yelp_street_num = yelp_street_num.split(' ',1);
				    yelp_street_num = yelp_street_num[0];
				    
				    var dol_street_num = osha_data.site_address;
				    dol_street_num = dol_street_num.split(' ',1);
				    dol_street_num = dol_street_num[0];
				    
			    	if (yelp_street_num == dol_street_num) {
			    		
			    		if (jsonResponse.businesses[0].image_url) {
			    			var imgEstablishment = Titanium.UI.createImageView({
			    				image:jsonResponse.businesses[0].image_url,
								top: 10,
								height: 100,
								left:10,
								width: 100,
								borderColor: Ti.Platform.osname == 'android' ? null : 'gray',
								bottom: 1,
								backgroundColor: 'white'
							});
							if (Ti.Platform.osname != 'android') {
			    				rowEstablishmentAddress.remove(wvBizMap);
			    			}
							rowEstablishmentAddress.add(imgEstablishment);
						}
						else {
							wvBizMap.bottom = 1;
						}
						lblAddress.bottom = 1;
						
						var rowCallHeader = Ti.UI.createTableViewRow({
							height: Ti.Platform.osname == 'android' ? 40 : 'auto',
							className: 'section_header',
							backgroundColor: headerColor,
							selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
							selectedBackgroundColor: rowSelectionColor
						});
						
						var lblCall = Ti.UI.createLabel({
							text: 'Call',
							left: 10,
							top: 5,
							bottom: 5,
							height: 'auto',
							width: 'auto',
						    //font:{fontSize: Ti.Platform.osname == 'android' ? 18 : 16, fontWeight:'bold'},
						    font:{fontSize: '16dp', fontWeight:'bold'},
						    textAlign:'left',
						    color: 'white',
						});
						rowCallHeader.add(lblCall);
						winOSHA_detail.tableView.insertRowAfter(1,rowCallHeader);
						
						var rowPhone = Ti.UI.createTableViewRow({
							height: Ti.Platform.osname == 'android' ? 40 : 'auto',
							hasChild:true,
							className: 'phone',
							selectedBackgroundColor: rowSelectionColor,
						});
						rowPhone.addEventListener('click', function(evt) {
							var a = Titanium.UI.createAlertDialog({
								title: jsonResponse.businesses[0].display_phone,
								buttonNames: ['Cancel','Call'],
								cancel: 0
								
							});
							a.addEventListener('click', function(evt) {
								if (evt.index == 1) {
									Titanium.Platform.openURL('tel:' + jsonResponse.businesses[0].phone);
								}
							});
							
							a.show();
							
						});
						
						var lblPhone = Ti.UI.createLabel({
							text: jsonResponse.businesses[0].display_phone,
							left: 10,
							top: 5,
							bottom: 5,
							height: 'auto',
							width: 'auto',
						    //font:{fontSize: Ti.Platform.osname == 'android' ? 16 : 14},
						    font:{fontSize: '14dp'},
						    color: 'black',
						    touchEnabled: false
						});
						rowPhone.add(lblPhone);
						winOSHA_detail.tableView.insertRowAfter(2,rowPhone);
						
						var rowCustomerReviews = Ti.UI.createTableViewRow({
							height: Ti.Platform.osname == 'android' ? 30 : 'auto',
							hasChild: true,
							className: 'customer_reviews',
							selectedBackgroundColor: rowSelectionColor,
						});
						rowCustomerReviews.addEventListener('click', function(evt) {
							if (jsonResponse.businesses[0].mobile_url) {
								//vwYelpBizWebsite.url = jsonResponse.businesses[0].mobile_url;
								//tgSearch.activeTab.open(winYelpBizWebsite,{animated:true});
								if (Ti.Platform.osname == 'android') {
									winYelpBiz.create(jsonResponse.businesses[0].mobile_url,false).open();
								} else {
									tgSearch.activeTab.open(winYelpBiz.create(jsonResponse.businesses[0].mobile_url,false),{animated:true});
									winDOLMap.win.barColor = headerColor;
								}
								
							}
						});
						
						var imgReviewRating = Ti.UI.createImageView({
							image: jsonResponse.businesses[0].rating_img_url,
							height: 17,
							bottom: 5,
							left: 10,
							//width: 84
							width: Ti.Platform.osname == 'android' ? null : 100,
							touchEnabled: false
						});
						
						var lblReviewCount = Ti.UI.createLabel({
							text: (jsonResponse.businesses[0].review_count == 1) ? jsonResponse.businesses[0].review_count + ' Review' :  jsonResponse.businesses[0].review_count + ' Reviews',
							left: 117,
							bottom: Ti.Platform.osname == 'android' ? 4 : 6,
							height: 'auto',
							width: 'auto',
						    //font:{fontSize: Ti.Platform.osname == 'android' ? 16 : 14, fontWeight:'italics'},
						    font:{fontSize: '14dp', fontWeight:'italics'},
						    textAlign:'left',
						    color: 'gray',
						    touchEnabled: false
						});
						
						var imgYelpLogo = Ti.UI.createImageView({
							image:'images/yelp_logo_50x25.png',
							right: 5,
							height: 27,
							width: 51,
							//top: 0,
							bottom: 5,
							touchEnabled: false
						});
						
						rowCustomerReviews.add(imgReviewRating);
						rowCustomerReviews.add(lblReviewCount);
						rowCustomerReviews.add(imgYelpLogo);
						winOSHA_detail.tableView.insertRowAfter(1,rowCustomerReviews);
						
			    	}
			    	
			    }
			    
			},  
			function(evt) {
				Ti.API.error("Error: " + evt.error);
			    Titanium.UI.createAlertDialog({
			        title: "API call failed",
			        message: evt,
			        buttonNames: ['OK']
			    }).show();
		});
		
		return winOSHA_detail.win;
    };
    
})();








