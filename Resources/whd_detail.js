Ti.include('yelp_api.js');
Ti.include('yelp_biz.js');
Ti.include('whd_report.js');
Ti.include('biz_map.js');

var winWHD_detail = {};

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
 
    winWHD_detail.create = function(whd_data) {
        
        var win = Titanium.UI.createWindow({
        	orientationModes: orientationModes,
			backgroundColor: 'white',
			tabBarHidden: true,
			//navBarHidden: true,
			left: Titanium.Platform.displayCaps.platformWidth,
			barColor: headerColor
		});
		win.addEventListener('close', function() {	
			//winDOLMap.win.hideNavBar();
		});
		
		var tableView;
		var whdSummary = [];
		
		var rowEstablishmentName = Ti.UI.createTableViewRow({
			hasChild:false,
			height:'auto',
			//selectedBackgroundColor: 'grey',
			className: 'name',
			backgroundColor: 'black',
			selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
		});
		
		var lblEstablishmentName = Ti.UI.createLabel({
			text: whd_data.trade_nm,
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
		whdSummary.push(rowEstablishmentName);
		
		var rowEstablishmentAddress = Ti.UI.createTableViewRow({
			hasChild:true,
			height:'auto',
			//selectedBackgroundColor: 'grey',
			className: 'address'
		});
		rowEstablishmentAddress.addEventListener('click', function(evt) {
			tgSearch.activeTab.open(winBizMap.create(whd_data.street_addr_1_txt, whd_data.city_nm, whd_data.st_cd),{animated:true});
			winDOLMap.win.barColor = headerColor;
		});
		
		var wvBizMap = Ti.UI.createWebView({
			url: 'http://maps.googleapis.com/maps/api/staticmap?&markers=color:blue|' + whd_data.yahoo_lat + ',' + whd_data.yahoo_lon + '&zoom=14&scale=2&size=200x200&sensor=false',
			top: 10,
			height: 100,
			left: 10,
			width: 100,
			borderColor: 'gray',
			bottom: 10
		});
		rowEstablishmentAddress.add(wvBizMap);
		
		var lblAddress = Ti.UI.createLabel({
			text: whd_data.street_addr_1_txt + '\n' + whd_data.city_nm + ', ' + whd_data.st_cd + ' ' + whd_data.zip_cd,
			top: 10,
			left: 117,
			right: 5,
			//height: 110,
			bottom: 10,
		    font:{fontSize:14}
		});
		
		rowEstablishmentAddress.add(lblAddress);
		whdSummary.push(rowEstablishmentAddress);
		
		var rowWHDHeader = Ti.UI.createTableViewRow({
			height: 'auto',
			className: 'section_header',
			backgroundColor: headerColor,
			selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
		});
		
		var lblWHD = Ti.UI.createLabel({
			text: 'Child Labor & Fair Labor Violations',
			left: 10,
			top: 5,
			bottom: 5,
			height: 'auto',
			width: 'auto',
		    font:{fontSize:14, fontWeight:'bold'},
		    textAlign:'left',
		    color: 'white',
		});
		rowWHDHeader.add(lblWHD);
		whdSummary.push(rowWHDHeader);
		
		
		var rowWHDDetail = Ti.UI.createTableViewRow({
			height:'auto',
			className: 'WHD_detail',
			touchEnabled: false,
			selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
		});
		//rowWHDDetail.addEventListener('click', function(evt) {
			//vwWHDWebsite.url = urlWHD;
			//win.animate({left: -1 * Titanium.Platform.displayCaps.platformWidth, duration:500});
			//winWHDWebsite.open({left:0, duration:500});
		//});
		
		var lblInViolation = Ti.UI.createLabel({
			text: 'No Violations',
			top: 10,
			height: 'auto',
			left: 117,
			right: 10,
			textAlign: 'left',
		    font:{fontSize:18, fontWeight:'bold'}
		});
		rowWHDDetail.add(lblInViolation);
		
		var imgInViolation = Titanium.UI.createImageView({
			left: 10,
			height: 100,
			top: 10,
			width: 100
		});
		if (whd_data.industry == 'Food') {
			imgInViolation.image = 'food_green.png';
		}
		else if (whd_data.industry == 'Retail') {
			imgInViolation.image = 'retail_green.png';
		} else {
			imgInViolation.image = 'hospitality_green.png';
		}
		rowWHDDetail.add(imgInViolation);
		
        if (whd_data.flsa_violtn_cnt > 0 || whd_data.flsa_cl_violtn_cnt > 0) {
        	lblInViolation.text = 'Past Violation';
			if (whd_data.industry == 'Food') {
				imgInViolation.image = 'food_red.png';
			}
			else if (whd_data.industry == 'Retail') {
				imgInViolation.image = 'retail_red.png';
			} else {
				imgInViolation.image = 'hospitality_red.png';
			}
			
			var flsa_cl_violtn_cnt = '';
			var flsa_cl_minor_cnt = '';
			var flsa_violtn_cnt = '';
			var flsa_bw_atp_amt = '';
			var flsa_ee_atp_cnt = '';
			
			if (whd_data.flsa_cl_violtn_cnt > 0) {
				if (whd_data.flsa_cl_violtn_cnt == 1) {
					flsa_cl_violtn_cnt = whd_data.flsa_cl_violtn_cnt + ' Child Labor violation\n';
				} else {
					flsa_cl_violtn_cnt = whd_data.flsa_cl_violtn_cnt + ' Child Labor violations\n';
				}
				
			}
			
			if (whd_data.flsa_cl_minor_cnt > 0) {
				if (whd_data.flsa_cl_minor_cnt == 1) {
					flsa_cl_minor_cnt = whd_data.flsa_cl_minor_cnt + ' Child employed in violation\n';
				} else {
					flsa_cl_minor_cnt = whd_data.flsa_cl_minor_cnt + ' Children employed in violation\n';
				}
			}
			
			if (whd_data.flsa_violtn_cnt > 0) {
				if (whd_data.flsa_violtn_cnt == 1) {
					flsa_violtn_cnt = whd_data.flsa_violtn_cnt + ' Fair Labor violation\n';
				} else {
					flsa_violtn_cnt = whd_data.flsa_violtn_cnt + ' Fair Labor violations\n';
				}
			}
			
			if (whd_data.flsa_bw_atp_amt > 0) {
				if (whd_data.flsa_ee_atp_cnt == 1) {
					flsa_ee_atp_cnt = whd_data.flsa_ee_atp_cnt + ' Employee due:\n';
				} else {
					flsa_ee_atp_cnt = whd_data.flsa_ee_atp_cnt + ' Employees due:\n';
				}
				
				flsa_bw_atp_amt = '   $' + padCents(whd_data.flsa_bw_atp_amt) + ' in back wages';
				
			}
			
			var lblWHDDetail = Ti.UI.createLabel({
				text: flsa_cl_violtn_cnt + flsa_cl_minor_cnt + flsa_violtn_cnt + flsa_ee_atp_cnt + flsa_bw_atp_amt,
				top: 35,
				left: 117,
				height: 'auto',
				textAlign: 'left',
				font:{fontSize:14}
			});
			rowWHDDetail.add(lblWHDDetail);
			
		}
		whdSummary.push(rowWHDDetail);
			
		var rowWHDSource = Ti.UI.createTableViewRow({
			hasChild: true,
			height: 'auto',
			className: 'section_footer'
		});
		rowWHDSource.addEventListener('click', function(evt) {
			tgSearch.activeTab.open(winWHDReport.create(whd_data),{animated:true});
			winDOLMap.win.barColor = headerColor;
		});
		
		var imgDolLogo = Ti.UI.createImageView({
			image:'whd_logo_small.png',
			right: 5,
			height: 20,
			width: 52,
			borderRadius: 3
		});
		rowWHDSource.add(imgDolLogo);
		
		var lblSource = Ti.UI.createLabel({
			text: 'Dept of Labor:',
			//left: 117,
			right: imgDolLogo.width + 10,
			bottom: 5,
			top: 5,
			height: 'auto',
			textAlign: 'right',
			//right: 45,
		    font:{fontSize:14},
		    color: 'gray'
		});
		rowWHDSource.add(lblSource);
		
		whdSummary.push(rowWHDSource);
		
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
		whdSummary.push(rowContactDOLHeader);
		
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
		whdSummary.push(rowContactDOL);
		
		tableView = Titanium.UI.createTableView({
			data:whdSummary,
			backgroundColor:'white',
			separatorColor:'white',
			top: 0
		});
		win.add(tableView);
		
		yelp_api.searchRequest(whd_data.trade_nm, whd_data.street_addr_1_txt, whd_data.zip_cd, null, null,
			function(response) {    
			    	
			    // Use Yelp Data?
			    if (response.businesses.length > 0) {
			    	
			    	var yelp_street_num = response.businesses[0].location.address[0];
				    yelp_street_num = yelp_street_num.split(' ',1);
				    yelp_street_num = yelp_street_num[0];
				    
				    var dol_street_num = whd_data.street_addr_1_txt;
				    dol_street_num = dol_street_num.split(' ',1);
				    dol_street_num = dol_street_num[0];
				    
			    	if (yelp_street_num == dol_street_num) {
			    		//lblAddress.height = 106;
			    		
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
						tableView.insertRowAfter(1,rowCallHeader);
						
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
						tableView.insertRowAfter(2,rowPhone);
						
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
						tableView.insertRowAfter(1,rowCustomerReviews);
						
						
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
		
		return win;
    };
    
})();








