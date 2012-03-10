function WinBizDetail(data) {
	var app = require('/lib/globals');
	
	var self = Titanium.UI.createWindow({
    	orientationModes: app.ORIENTATION_MODES,
		backgroundColor: 'white',
		tabBarHidden: true,
		navBarHidden: Ti.Platform.osname == 'android' ? true : false,
		barColor: app.HEADER_COLOR,
	});
	self.addEventListener('close', function() {	
		self = null;
		app.winBizDetail = null;
	});
	self.addEventListener('android:back', function() {	
		self.close();
		app.winBizDetail = null;
	});
	
	
	var tableView = Titanium.UI.createTableView({
		backgroundColor:'white',
		separatorColor:'white',
		top: 0
	});
	self.add(tableView);
	
	var rowEstablishmentName = Ti.UI.createTableViewRow({
		hasChild:false,
		height:'auto',
		className: 'name',
		backgroundColor: 'black',
		selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
		selectedBackgroundColor: 'black'
	});
	
	var lblEstablishmentName = Ti.UI.createLabel({
		text: data.biz_name,
		color: 'white',
		top: 5,
		bottom: 5,
		height: 'auto',
		left: 10,
		width: Titanium.Platform.displayCaps.platformWidth - 20,
		textAlign: 'left',
	    font: app.Font.h1
	});
	rowEstablishmentName.add(lblEstablishmentName);
	tableView.appendRow(rowEstablishmentName);
	
	var rowEstablishmentAddress = Ti.UI.createTableViewRow({
		hasChild:true,
		height:'auto',
		className: 'address',
		selectedBackgroundColor: app.ROW_SELECTION_COLOR,
	});
	rowEstablishmentAddress.addEventListener('click', function(evt) {
		var WinBizMap = require('/lib/WinBizMap');
		app.winBizMap = new WinBizMap(data.address, data.city, data.state);
		
		if (Ti.Platform.osname == 'android') {
			app.winBizMap.ui.open();
		} else {
			app.tgSearch.activeTab.open(app.winBizMap.ui,{animated:true});
			app.winSearch.ui.barColor = app.HEADER_COLOR;	
		}
		WinBizMap = null;
	});
	
	var wvBizMap;
	if (data.source == 'Yelp') {
		wvBizMap = Titanium.UI.createImageView({
			image:data.image_url,
			top: 10,
			height: 100,
			left:10,
			width: 100,
			//borderColor: Ti.Platform.osname == 'android' ? null : 'gray',
			bottom: 1,
			touchEnabled: false,
			backgroundColor: 'white'
		});
		if (!data.image_url) {
			wvBizMap.image = '/images/default_image.png';
			wvBizMap.borderColor = 'transparent';
		}
	} else {
		if (Ti.Platform.osname == 'android') {
			wvBizMap = Ti.UI.createImageView({
				image: 'http://maps.googleapis.com/maps/api/staticmap?&markers=color:blue|' + data.yahoo_lat + ',' + data.yahoo_lon + '&zoom=14&scale=1&size=100x100&sensor=false',
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
				url: 'http://maps.googleapis.com/maps/api/staticmap?&markers=color:blue|' + data.yahoo_lat + ',' + data.yahoo_lon + '&zoom=14&scale=2&size=200x200&sensor=false',
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
	}
	
	rowEstablishmentAddress.add(wvBizMap);
	
	var address = '';
	if (data.source == 'Yelp') {
		if (data.address && data.address !='') {
			address = address + data.address + '\n';
		} 
		if (data.city && data.city !='') {
			address = address + data.city;
		}
		if (data.state_code && data.state_code !='') {
			address = address + ', ' + data.state_code;
		}
		if (data.postal_code && data.postal_code !='') {
			address = address + ' ' + data.postal_code;
		}
	} else {
		address = data.address + '\n' + data.city + ', ' + data.state + ' ' + data.zip;
	}
	var lblAddress = Ti.UI.createLabel({
		text: address,
		top: 10,
		left: 117,
		right: 5,
		bottom: 10,
		color: 'black',
	    font:app.Font.p1,
	    touchEnabled: false
	});
	rowEstablishmentAddress.add(lblAddress);
	tableView.appendRow(rowEstablishmentAddress);
	
	if (data.source == 'Yelp') {
		addYelpRows();
	}
	
	var rowViolationHeader = Ti.UI.createTableViewRow({
		height: Ti.Platform.osname == 'android' ? 40 : 'auto',
		className: 'section_header',
		backgroundColor: app.HEADER_COLOR,
		selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
		backgroundSelectedColor: app.HEADER_COLOR
	});
	
	var violationsHeader;
	switch (data.source) {
		case 'OSHA':
			violationsHeader = 'Safety & Health Violations';
			break;
		case 'WHD':
			violationsHeader = 'Child Labor & Fair Labor Violations';
			break;
		case 'Yelp':
			violationsHeader = 'Safety, Health, Labor Violations';
			break;
	}
	var lblViolations = Ti.UI.createLabel({
		text: violationsHeader,
		left: 10,
		top: 5,
		bottom: 5,
		height: 'auto',
		width: 'auto',
	    font:app.Font.h2,
	    textAlign:'left',
	    color: 'white',
	});
	rowViolationHeader.add(lblViolations);
	tableView.appendRow(rowViolationHeader);
	
	var rowDetail = Ti.UI.createTableViewRow({
		height:'auto',
		className: 'osha_detail',
		selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
		selectedBackgroundColor: 'white'
	});
	
	var lblInViolation = Ti.UI.createLabel({
		text: data.source == 'Yelp' ? 'Unknown' : 'No Violations',
		top: 10,
		height: 'auto',
		left: 117,
		right: 10,
		textAlign: 'left',
		color: 'black',
	    font:app.Font.h1,
	});
	rowDetail.add(lblInViolation);
	
	var imgInViolation = Titanium.UI.createImageView({
		left: 10,
		height: 100,
		top: 10,
		width: 100
	});
	
	if (data.source == 'Yelp') {
		if (data.industry == 'Food') {
			imgInViolation.image = '/images/food_gray.png';
		} else if (data.industry == 'Retail') {
			imgInViolation.image = '/images/retail_gray.png';
		} else {
			imgInViolation.image = '/images/hospitality_gray.png';
		}
		imgInViolation.bottom = 10;
	} else {
		if (data.industry == 'Food') {
			imgInViolation.image = '/images/food_green.png';
		} else if (data.industry == 'Retail') {
			imgInViolation.image = '/images/retail_green.png';
		} else {
			imgInViolation.image = '/images/hospitality_green.png';
		}	
	}
	
	rowDetail.add(imgInViolation);
    
    switch (data.source) {
		case 'OSHA':
			if (data.violation_indicator == 1) {
		
				lblInViolation.text = 'Past Violation';
				if (data.industry == 'Food') {
					imgInViolation.image = '/images/food_red.png';
				}
				else if (data.industry == 'Retail') {
					imgInViolation.image = '/images/retail_red.png';
				} else {
					imgInViolation.image = '/images/hospitality_red.png';
				}
				
				var penalties = '', serious_violations = '', total_violations = '';
				
				if (data.total_current_penalty > 0) {
					penalties = '$' + padCents(data.total_current_penalty) + ' in Penalties\n';
				}
				
				if (data.serious_violations > 0) {
					if (data.serious_violations == 1) {
						serious_violations = data.serious_violations + ' Serious violation\n';
					} else {
						serious_violations = data.serious_violations + ' Serious violations\n';
					}
					
				}
				
				if (data.total_violations > 0) {
					if (data.total_violations == 1) {
						total_violations = data.total_violations + ' Total violation\n';
					} else {
						total_violations = data.total_violations + ' Total violations\n';	
					}
					
				}
				
				var lblOSHADetail = Ti.UI.createLabel({
					text: penalties + serious_violations + total_violations,
					top: 35,
					left: 117,
					height: 'auto',
					textAlign: 'left',
					color: 'black',
					font:app.Font.p1
				});
				rowDetail.add(lblOSHADetail);
				
				
			}
			break;
		case 'WHD':
			if (data.flsa_violtn_cnt > 0 || data.flsa_cl_violtn_cnt > 0) {
	        	lblInViolation.text = 'Past Violation';
				if (data.industry == 'Food') {
					imgInViolation.image = '/images/food_red.png';
				}
				else if (data.industry == 'Retail') {
					imgInViolation.image = '/images/retail_red.png';
				} else {
					imgInViolation.image = '/images/hospitality_red.png';
				}
				
				var flsa_cl_violtn_cnt = '';
				var flsa_cl_minor_cnt = '';
				var flsa_violtn_cnt = '';
				var flsa_bw_atp_amt = '';
				var flsa_ee_atp_cnt = '';
				
				if (data.flsa_cl_violtn_cnt > 0) {
					if (data.flsa_cl_violtn_cnt == 1) {
						flsa_cl_violtn_cnt = data.flsa_cl_violtn_cnt + ' Child Labor violation\n';
					} else {
						flsa_cl_violtn_cnt = data.flsa_cl_violtn_cnt + ' Child Labor violations\n';
					}
					
				}
				
				if (data.flsa_cl_minor_cnt > 0) {
					if (data.flsa_cl_minor_cnt == 1) {
						flsa_cl_minor_cnt = data.flsa_cl_minor_cnt + ' Child employed in violation\n';
					} else {
						flsa_cl_minor_cnt = data.flsa_cl_minor_cnt + ' Children employed in violation\n';
					}
				}
				
				if (data.flsa_violtn_cnt > 0) {
					if (data.flsa_violtn_cnt == 1) {
						flsa_violtn_cnt = data.flsa_violtn_cnt + ' Fair Labor violation\n';
					} else {
						flsa_violtn_cnt = data.flsa_violtn_cnt + ' Fair Labor violations\n';
					}
				}
				
				if (data.flsa_bw_atp_amt > 0) {
					if (data.flsa_ee_atp_cnt == 1) {
						flsa_ee_atp_cnt = data.flsa_ee_atp_cnt + ' Employee due:\n';
					} else {
						flsa_ee_atp_cnt = data.flsa_ee_atp_cnt + ' Employees due:\n';
					}
					
					flsa_bw_atp_amt = '   $' + padCents(data.flsa_bw_atp_amt) + ' in back wages';
					
				}
				
				var lblWHDDetail = Ti.UI.createLabel({
					text: flsa_cl_violtn_cnt + flsa_cl_minor_cnt + flsa_violtn_cnt + flsa_ee_atp_cnt + flsa_bw_atp_amt,
					top: 35,
					left: 117,
					height: 'auto',
					textAlign: 'left',
					color: 'black',
					font:app.Font.p1
				});
				rowDetail.add(lblWHDDetail);
				
			}
			
			break;
	}
    
	tableView.appendRow(rowDetail);
	
	if (data.source != 'Yelp') {
		addSourceRows();
	}
	
	var rowContactDOLHeader = Ti.UI.createTableViewRow({
		height: Ti.Platform.osname == 'android' ? 40 : 'auto',
		className: 'section_header',
		backgroundColor: app.HEADER_COLOR,
		selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
		backgroundSelectedColor: app.HEADER_COLOR
	});
	
	var lblContactDOLHeader = Ti.UI.createLabel({
		text: 'Not a Fair or Safe Business?',
		left: 10,
		top: 5,
		bottom: 5,
		height: 'auto',
		width: 'auto',
	    font:app.Font.h2,
	    textAlign:'left',
	    color: 'white',
	});
	rowContactDOLHeader.add(lblContactDOLHeader);
	tableView.appendRow(rowContactDOLHeader);
	
	var rowContactDOL = Ti.UI.createTableViewRow({
		hasChild: true,
		height: 'auto',
		className: 'section_footer',
		selectedBackgroundColor: app.ROW_SELECTION_COLOR,
	});
	rowContactDOL.addEventListener('click', function(evt) {
		var WinTakeAction = require('/lib/WinTakeAction');
		app.winTakeAction = new WinTakeAction(true);
		if (Ti.Platform.osname == 'android') {
			app.winTakeAction.ui.open();
		} else {
			app.tgSearch.activeTab.open(app.winTakeAction.ui,{animated:true});	
		}
		WinTakeAction = null;
	});
	
	var imgDolLogo = Titanium.UI.createImageView({
		image:'/images/DoLabor_seal_small.gif',
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
	    font:app.Font.p1,
	    textAlign:'left',
	    color: 'black',
	    touchEnabled: false
	});
	rowContactDOL.add(lblContactDOL);
	
	tableView.appendRow(rowContactDOL);
	
	if(!Ti.Network.online) {
		alert('Network unavailable. Check your network settings.');
	} else {
		if (data.source != 'Yelp') {
			callYelpApi();
		}	
	}
	 
	this.ui = self;
	
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
	
	function addYelpRows() {
		var rowCustomerReviews = Ti.UI.createTableViewRow({
			height: Ti.Platform.osname == 'android' ? 30 : 'auto',
			hasChild: true,
			className: 'customer_reviews',
			selectedBackgroundColor: app.ROW_SELECTION_COLOR,
		});
		rowCustomerReviews.addEventListener('click', function(evt) {
			var WinYelpBiz = require('/lib/WinYelpBiz');
			app.winYelpBiz = new WinYelpBiz(data.mobile_url,false);
			
			if (Ti.Platform.osname == 'android') {
				app.winYelpBiz.ui.open();
			} else {
				app.tgSearch.activeTab.open(app.winYelpBiz.ui,{animated:true});
				app.winSearch.ui.barColor = app.HEADER_COLOR;
			}
			WinYelpBiz = null;
			
			
		});
		
		var imgReviewRating = Ti.UI.createImageView({
			image: data.rating_img_url,
			height: 17,
			bottom: 5,
			left: 10,
			width: Ti.Platform.osname == 'android' ? null : 100,
			touchEnabled: false
		});
		
		var lblReviewCount = Ti.UI.createLabel({
			text: (data.review_count == 1) ? data.review_count + ' Review' :  data.review_count + ' Reviews',
			left: 117,
			bottom:Ti.Platform.osname == 'android' ? 4 : 6,
			height: 'auto',
			width: 'auto',
		    font:app.Font.h4,
		    textAlign:'left',
		    color: 'gray',
		    touchEnabled: false
		});
		
		var imgYelpLogo = Ti.UI.createImageView({
			image:'/images/yelp_logo_50x25.png',
			right: 5,
			height: 27,
			width: 51,
			bottom: 5,
			touchEnabled: false
		});
		rowCustomerReviews.add(imgReviewRating);
		rowCustomerReviews.add(lblReviewCount);
		rowCustomerReviews.add(imgYelpLogo);
		tableView.appendRow(rowCustomerReviews);
		
		if (data.phone && data.phone != '') {
			var rowCallHeader = Ti.UI.createTableViewRow({
				height: Ti.Platform.osname == 'android' ? 40 : 'auto',
				className: 'section_header',
				backgroundColor: app.HEADER_COLOR,
				selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
				backgroundSelectedColor: app.HEADER_COLOR
			});
			
			var lblCall = Ti.UI.createLabel({
				text: 'Call',
				left: 10,
				top: 5,
				bottom: 5,
				height: 'auto',
				width: 'auto',
			    font:app.Font.h2,
			    textAlign:'left',
			    color: 'white',
			});
			rowCallHeader.add(lblCall);
			tableView.appendRow(rowCallHeader);
			
			var rowPhone = Ti.UI.createTableViewRow({
				height: 'auto',
				hasChild:true,
				className: 'phone',
				selectedBackgroundColor: app.ROW_SELECTION_COLOR,
			});
			rowPhone.addEventListener('click', function(evt) {
				var a = Titanium.UI.createAlertDialog({
					title: data.display_phone,
					buttonNames: ['Cancel','Call'],
					cancel: 0
					
				});
				a.addEventListener('click', function(evt) {
					if (evt.index == 1) {
						Titanium.Platform.openURL('tel:' + data.phone);
					}
				});
				
				a.show();
				
			});
			
			var lblPhone = Ti.UI.createLabel({
				text: data.display_phone,
				left: 10,
				top: 5,
				bottom: 5,
				height: 'auto',
				width: 'auto',
				color: 'black',
			    font:app.Font.p1,
			    touchEnabled: false
			});
			rowPhone.add(lblPhone);
			tableView.appendRow(rowPhone);
		}
	}
	
	function addSourceRows() {
		var rowSource = Ti.UI.createTableViewRow({
			hasChild: true,
			height: Ti.Platform.osname == 'android' ? 40 : 'auto',
			className: 'section_footer',
			selectedBackgroundColor: app.ROW_SELECTION_COLOR,
		});
		rowSource.addEventListener('click', function(evt) {
			switch (data.source) {
				case 'OSHA':
					var WinOSHAReport = require('/lib/WinOSHAReport');
					app.winOSHAReport = new WinOSHAReport(data.activity_nr);
					
					if (Ti.Platform.osname == 'android') {
						app.winOSHAReport.ui.open();
					} else {
						app.tgSearch.activeTab.open(app.winOSHAReport.ui);
					}
					WinOSHAReport = null;
					break;
				case 'WHD':
					var WinWHDReport = require('/lib/WinWHDReport');
					app.winWHDReport = new WinWHDReport(data);
					
					if (Ti.Platform.osname == 'android') {
						app.winWHDReport.ui.open();
					} else {
						app.tgSearch.activeTab.open(app.winWHDReport.ui,{animated:true});
						app.winSearch.ui.barColor = app.HEADER_COLOR;	
					}
					WinWHDReport = null;
					break;
				case 'Yelp':
					break;
			}
			
			
			app.winSearch.ui.barColor = app.HEADER_COLOR;
		});
		
		var imgDolLogo;
		if (data.source == 'OSHA') {
			imgDolLogo = Titanium.UI.createImageView({
				image:'/images/osha_logo_small.png',
				height: 18,
				width: 58,
				right: 5,
				borderRadius: 3,
				touchEnabled: false
			});
		} else {
			imgDolLogo = Ti.UI.createImageView({
				image:'/images/whd_logo_small.png',
				right: 5,
				height: 20,
				width: 52,
				borderRadius: 3,
				touchEnabled: false
			});
		}
		
		rowSource.add(imgDolLogo);
		
		var lblSource = Ti.UI.createLabel({
			text: 'Dept of Labor:',
			bottom: 5,
			top: 5,
			height: 'auto',
			textAlign: 'right',
			right: imgDolLogo.width + 10,
		    font:app.Font.p1,
		    color: 'gray',
		    touchEnabled: false
		});
		rowSource.add(lblSource);
		
		tableView.appendRow(rowSource);
		
	}
	
	function callYelpApi() {
	
		var YelpApi = require('/lib/YelpApi');
	
		YelpApi.searchRequest(data.biz_name, data.address, data.zip, null, null,
			function(response) {    
			    var jsonResponse = JSON.parse(response);
			    // Use Yelp Data?
			    if (jsonResponse.businesses.length > 0) {
	
			    	var yelp_street_num = jsonResponse.businesses[0].location.address[0];
				    yelp_street_num = yelp_street_num.split(' ',1);
				    yelp_street_num = yelp_street_num[0];
				    
				    var dol_street_num = data.address;
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
								//borderColor: Ti.Platform.osname == 'android' ? null : 'gray',
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
							backgroundColor: app.HEADER_COLOR,
							selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
							backgroundSelectedColor: app.HEADER_COLOR
						});
						
						var lblCall = Ti.UI.createLabel({
							text: 'Call',
							left: 10,
							top: 5,
							bottom: 5,
							height: 'auto',
							width: 'auto',
						    font:app.Font.h2,
						    textAlign:'left',
						    color: 'white',
						});
						rowCallHeader.add(lblCall);
						tableView.insertRowAfter(1,rowCallHeader);
						
						var rowPhone = Ti.UI.createTableViewRow({
							height: Ti.Platform.osname == 'android' ? 40 : 'auto',
							hasChild:true,
							className: 'phone',
							selectedBackgroundColor: app.ROW_SELECTION_COLOR,
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
						    font:app.Font.p1,
						    color: 'black',
						    touchEnabled: false
						});
						rowPhone.add(lblPhone);
						tableView.insertRowAfter(2,rowPhone);
						
						var rowCustomerReviews = Ti.UI.createTableViewRow({
							height: Ti.Platform.osname == 'android' ? 30 : 'auto',
							hasChild: true,
							className: 'customer_reviews',
							selectedBackgroundColor: app.ROW_SELECTION_COLOR,
						});
						rowCustomerReviews.addEventListener('click', function(evt) {
							if (jsonResponse.businesses[0].mobile_url) {
								
								var WinYelpBiz = require('/lib/WinYelpBiz');
								app.winYelpBiz = new WinYelpBiz(jsonResponse.businesses[0].mobile_url,false);
								
								if (Ti.Platform.osname == 'android') {
									app.winYelpBiz.ui.open();
								} else {
									app.tgSearch.activeTab.open(app.winYelpBiz.ui,{animated:true});
									app.winSearch.ui.barColor = app.HEADER_COLOR;
								}
								WinYelpBiz = null;
							}
						});
						
						var imgReviewRating = Ti.UI.createImageView({
							image: jsonResponse.businesses[0].rating_img_url,
							height: 17,
							bottom: 5,
							left: 10,
							width: Ti.Platform.osname == 'android' ? null : 100,
							touchEnabled: false
						});
						
						var lblReviewCount = Ti.UI.createLabel({
							text: (jsonResponse.businesses[0].review_count == 1) ? jsonResponse.businesses[0].review_count + ' Review' :  jsonResponse.businesses[0].review_count + ' Reviews',
							left: 117,
							bottom: Ti.Platform.osname == 'android' ? 4 : 6,
							height: 'auto',
							width: 'auto',
						    font:app.Font.h4,
						    textAlign:'left',
						    color: 'gray',
						    touchEnabled: false
						});
						
						var imgYelpLogo = Ti.UI.createImageView({
							image:'/images/yelp_logo_50x25.png',
							right: 5,
							height: 27,
							width: 51,
							bottom: 5,
							touchEnabled: false
						});
						
						rowCustomerReviews.add(imgReviewRating);
						rowCustomerReviews.add(lblReviewCount);
						rowCustomerReviews.add(imgYelpLogo);
						tableView.insertRowAfter(1,rowCustomerReviews);
						
			    	}
			    	
			    }
			    
			},  
			function(evt) {
				Ti.API.error("Error: " + evt.error);
			    Titanium.UI.createAlertDialog({
			        title: "Yelp",
			        message: "Yelp search could not be completed.",
			        buttonNames: ['OK']
			    }).show();
		});
		
	}
}
module.exports = WinBizDetail;