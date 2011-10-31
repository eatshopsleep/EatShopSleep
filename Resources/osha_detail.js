Ti.include('yelp_api.js');
Ti.include('yelp_biz.js');
Ti.include('osha_report.js');
Ti.include('biz_map.js');


var winOSHA_detail = {};

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
			//title: osha_data.estab_name,
			left: Titanium.Platform.displayCaps.platformWidth,
			barColor: headerColor
		});
		winOSHA_detail.win.addEventListener('close', function() {	
			//winDOLMap.win.hideNavBar();
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
			selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
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
		    font:{fontSize:18, fontWeight:'bold'}
		});
		rowEstablishmentName.add(lblEstablishmentName);
		winOSHA_detail.tableView.appendRow(rowEstablishmentName);
		
		var rowEstablishmentAddress = Ti.UI.createTableViewRow({
			hasChild:true,
			height:'auto',
			className: 'address'
		});
		rowEstablishmentAddress.addEventListener('click', function(evt) {
			tgSearch.activeTab.open(winBizMap.create(osha_data.site_address, osha_data.site_city, osha_data.site_state),{animated:true});
			winDOLMap.win.barColor = headerColor;
		});
		
		var wvBizMap = Ti.UI.createWebView({
			//backgroundImage: 'restaurant_icon.gif',
			url: 'http://maps.googleapis.com/maps/api/staticmap?&markers=color:blue|' + osha_data.yahoo_lat + ',' + osha_data.yahoo_lon + '&zoom=14&scale=2&size=200x200&sensor=false',
			top: 10,
			height: 100,
			left: 10,
			width: 100,
			borderColor: 'gray',
			bottom: 10
		});
		rowEstablishmentAddress.add(wvBizMap);
		
		var lblAddress = Ti.UI.createLabel({
			text: osha_data.site_address + '\n' + osha_data.site_city + ', ' + osha_data.site_state + ' ' + osha_data.site_zip,
			top: 10,
			left: 117,
			right: 5,
			//height: 110,
			//height: 'auto',
			bottom: 10,
		    font:{fontSize:14}
		});
		rowEstablishmentAddress.add(lblAddress);
		winOSHA_detail.tableView.appendRow(rowEstablishmentAddress);
		
		var rowOSHAHeader = Ti.UI.createTableViewRow({
			height: 'auto',
			className: 'section_header',
			backgroundColor: headerColor,
			selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
		});
		
		var lblOSHA = Ti.UI.createLabel({
			text: 'Safety & Health Violations',
			left: 10,
			top: 5,
			bottom: 5,
			height: 'auto',
			width: 'auto',
		    font:{fontSize:14, fontWeight:'bold'},
		    textAlign:'left',
		    color: 'white',
		});
		rowOSHAHeader.add(lblOSHA);
		winOSHA_detail.tableView.appendRow(rowOSHAHeader);
		
		var rowOSHADetail = Ti.UI.createTableViewRow({
			height:'auto',
			className: 'osha_detail',
			selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
		});
		
		var lblInViolation = Ti.UI.createLabel({
			text: 'No Violations',
			top: 10,
			height: 'auto',
			left: 117,
			right: 10,
			textAlign: 'left',
		    font:{fontSize:18, fontWeight:'bold'}
		});
		rowOSHADetail.add(lblInViolation);
		
		var imgInViolation = Titanium.UI.createImageView({
			left: 10,
			height: 100,
			top: 10,
			width: 100
		});
		if (osha_data.industry == 'Food') {
			imgInViolation.image = 'food_green.png';
		}
		else if (osha_data.industry == 'Retail') {
			imgInViolation.image = 'retail_green.png';
		} else {
			imgInViolation.image = 'hospitality_green.png';
		}
		rowOSHADetail.add(imgInViolation);
        
        if (osha_data.osha_violation_indicator == 1) {
			
			lblInViolation.text = 'Past Violation';
			if (osha_data.industry == 'Food') {
				imgInViolation.image = 'food_red.png';
			}
			else if (osha_data.industry == 'Retail') {
				imgInViolation.image = 'retail_red.png';
			} else {
				imgInViolation.image = 'hospitality_red.png';
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
				font:{fontSize:14}
			});
			rowOSHADetail.add(lblOSHADetail);
			/*
			var caseType = '';
			
			switch (osha_data.insp_type.toUpperCase()) {
			case 'A':
				caseType = 'Accident';
				break;
			case 'B':
				caseType = 'Complaint';
				break;
			case 'C':
				caseType = 'Referral';
				break;
			case 'D':
				caseType = 'Monitoring';
				break;
			case 'E':
				caseType = 'Variance';
				break;
			case 'F':
				caseType = 'FollowUp';
				break;
			case 'G':
				caseType = 'Unprog Rel';
				break;
			case 'H':
				caseType = 'Planned';
				break;
			case 'I':
				caseType = 'Prog Related';
				break;
			case 'J':
				caseType = 'Unprog Other';
				break;
			case 'K':
				caseType = 'Prog Other';
				break;
			case 'L':
				caseType = 'Other';
				break;	
			}
			*/
			
		}
		winOSHA_detail.tableView.appendRow(rowOSHADetail);
		
		var rowSource = Ti.UI.createTableViewRow({
			hasChild: true,
			height: 'auto',
			className: 'section_footer',
			
		});
		rowSource.addEventListener('click', function(evt) {
			tgSearch.activeTab.open(winOSHAReport.create(osha_data.activity_nr),{animated:true});
			winDOLMap.win.barColor = headerColor;
		});
		
		var imgDolLogo = Titanium.UI.createImageView({
			//image:'DoLabor_seal_small.gif',
			image:'osha_logo_small.png',
			height: 18,
			width: 58,
			right: 5,
			borderRadius: 3
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
		    font:{fontSize:14},
		    color: 'gray'
		});
		rowSource.add(lblSource);
		
		winOSHA_detail.tableView.appendRow(rowSource);
		
		var rowContactDOLHeader = Ti.UI.createTableViewRow({
			height: 'auto',
			className: 'section_header',
			backgroundColor: headerColor,
			selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
		});
		
		var lblContactDOLHeader = Ti.UI.createLabel({
			text: 'Not a Fair or Safe Business?',
			left: 10,
			top: 5,
			bottom: 5,
			height: 'auto',
			width: 'auto',
		    font:{fontSize:14, fontWeight:'bold'},
		    textAlign:'left',
		    color: 'white',
		});
		rowContactDOLHeader.add(lblContactDOLHeader);
		winOSHA_detail.tableView.appendRow(rowContactDOLHeader);
		
		var rowContactDOL = Ti.UI.createTableViewRow({
			hasChild: true,
			height: 'auto',
			className: 'section_footer',
			
		});
		rowContactDOL.addEventListener('click', function(evt) {
			tgSearch.activeTab.open(winAction.createNavWin(),{animated:true});
		});
		
		var lblContactDOL = Ti.UI.createLabel({
			text: 'Contact the Dept of Labor',
			left: 10,
			top: 5,
			bottom: 5,
			height: 'auto',
			width: 'auto',
		    font:{fontSize:14, fontWeight:'normal'},
		    textAlign:'left',
		    color: 'black',
		});
		rowContactDOL.add(lblContactDOL);
		
		var imgDolLogo = Titanium.UI.createImageView({
			image:'DoLabor_seal_small.gif',
			height: 32,
			width: 32,
			right: 5,
			top: 5,
			bottom: 5
		});
		rowContactDOL.add(imgDolLogo);
		winOSHA_detail.tableView.appendRow(rowContactDOL);
		
		yelp_api.searchRequest(osha_data.estab_name, osha_data.site_address, osha_data.site_zip, null, null,
			function(response) {    
			    
			    // Use Yelp Data?
			    if (response.businesses.length > 0) {

			    	var yelp_street_num = response.businesses[0].location.address[0];
				    yelp_street_num = yelp_street_num.split(' ',1);
				    yelp_street_num = yelp_street_num[0];
				    
				    var dol_street_num = osha_data.site_address;
				    dol_street_num = dol_street_num.split(' ',1);
				    dol_street_num = dol_street_num[0];
				    
			    	if (yelp_street_num == dol_street_num) {
			    		
			    		if (response.businesses[0].image_url) {
			    			var imgEstablishment = Titanium.UI.createImageView({
			    				image:response.businesses[0].image_url,
								top: 10,
								height: 100,
								left:10,
								width: 100,
								borderColor: 'gray',
								bottom: 1
							});
			    			rowEstablishmentAddress.remove(wvBizMap);
							rowEstablishmentAddress.add(imgEstablishment);
						}
						else {
							wvBizMap.bottom = 1;
						}
						lblAddress.bottom = 1;
						
						var rowCallHeader = Ti.UI.createTableViewRow({
							height: 'auto',
							className: 'section_header',
							backgroundColor: headerColor,
							selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
						});
						
						var lblCall = Ti.UI.createLabel({
							text: 'Call',
							left: 5,
							top: 5,
							bottom: 5,
							height: 'auto',
							width: 'auto',
						    font:{fontSize:14, fontWeight:'bold'},
						    textAlign:'left',
						    color: 'white',
						});
						rowCallHeader.add(lblCall);
						winOSHA_detail.tableView.insertRowAfter(1,rowCallHeader);
						
						var rowPhone = Ti.UI.createTableViewRow({
							height: 'auto',
							hasChild:true,
							className: 'phone'
							//selectedBackgroundColor: 'black',
						});
						rowPhone.addEventListener('click', function(evt) {
							var a = Titanium.UI.createAlertDialog({
								title: response.businesses[0].display_phone,
								buttonNames: ['Cancel','Call'],
								cancel: 0
								
							});
							a.addEventListener('click', function(evt) {
								if (evt.index == 1) {
									Titanium.Platform.openURL('tel:' + response.businesses[0].phone);
								}
							});
							
							a.show();
							
						});
						
						var lblPhone = Ti.UI.createLabel({
							text: response.businesses[0].display_phone,
							left: 10,
							top: 5,
							bottom: 5,
							height: 'auto',
							width: 'auto',
						    font:{fontSize:14}
						});
						rowPhone.add(lblPhone);
						winOSHA_detail.tableView.insertRowAfter(2,rowPhone);
						
						var rowCustomerReviews = Ti.UI.createTableViewRow({
							height: 'auto',
							hasChild: true,
							className: 'customer_reviews'
						});
						rowCustomerReviews.addEventListener('click', function(evt) {
							if (response.businesses[0].mobile_url) {
								//vwYelpBizWebsite.url = response.businesses[0].mobile_url;
								//tgSearch.activeTab.open(winYelpBizWebsite,{animated:true});
								tgSearch.activeTab.open(winYelpBiz.create(response.businesses[0].mobile_url,false),{animated:true});
								winDOLMap.win.barColor = headerColor;
							}
						});
						
						var imgReviewRating = Ti.UI.createImageView({
							image: response.businesses[0].rating_img_url,
							height: 17,
							bottom: 5,
							left: 10,
							//width: 84
							width: 100
						});
						
						var lblReviewCount = Ti.UI.createLabel({
							text: (response.businesses[0].review_count == 1) ? response.businesses[0].review_count + ' Review' :  response.businesses[0].review_count + ' Reviews',
							left: 117,
							bottom: 6,
							height: 'auto',
							width: 'auto',
						    font:{fontSize:14, fontWeight:'italics'},
						    textAlign:'left',
						    color: 'gray',
						});
						
						var imgYelpLogo = Ti.UI.createImageView({
							image:'yelp_logo_50x25.png',
							right: 5,
							height: 27,
							width: 51,
							//top: 0,
							bottom: 5
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
			        message: e,
			        buttonNames: ['OK']
			    }).show();
		});
		
		return winOSHA_detail.win;
    };
    
})();








