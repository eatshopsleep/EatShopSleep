Ti.include('yelp_biz.js');

var winYelp_detail = {};

(function() {
 
    winYelp_detail.create = function(data) {
        
        winYelp_detail.win = Titanium.UI.createWindow({
        	orientationModes: orientationModes,
			backgroundColor: 'white',
			//title: data.estab_name,
			left: Titanium.Platform.displayCaps.platformWidth,
			barColor: headerColor
		});
		
		winYelp_detail.tableView = Titanium.UI.createTableView({
			backgroundColor:'white',
			separatorColor:'white',
			top: 0
		});
		winYelp_detail.win.add(winYelp_detail.tableView);
		
		var rowEstablishmentName = Ti.UI.createTableViewRow({
			hasChild:false,
			height:'auto',
			className: 'name',
			backgroundColor: 'black',
			selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
		});
		
		var lblEstablishmentName = Ti.UI.createLabel({
			text: data.name,
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
		winYelp_detail.tableView.appendRow(rowEstablishmentName);
		
		var rowEstablishmentAddress = Ti.UI.createTableViewRow({
			hasChild:true,
			height:'auto',
			className: 'address'
		});
		rowEstablishmentAddress.addEventListener('click', function(evt) {
			tgSearch.activeTab.open(winBizMap.create(data.address, data.city, data.state_code),{animated:true});
			winDOLMap.win.barColor = headerColor;
		});
		
		var imgEstablishment = Titanium.UI.createImageView({
			image:data.image_url,
			top: 10,
			height: 100,
			left:10,
			width: 100,
			borderColor: 'gray',
			bottom: 1
		});
		if (!data.image_url) {
			imgEstablishment.image = 'default_image.png';
			imgEstablishment.borderColor = 'transparent';
		}
		rowEstablishmentAddress.add(imgEstablishment);
		
		var address = '';
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
		
		var lblAddress = Ti.UI.createLabel({
			text: address,
			top: 10,
			left: 117,
			right: 5,
			//height: 110,
			//height: 'auto',
			bottom: 1,
		    font:{fontSize:14}
		});
		rowEstablishmentAddress.add(lblAddress);
		winYelp_detail.tableView.appendRow(rowEstablishmentAddress);
		
		var rowCustomerReviews = Ti.UI.createTableViewRow({
			height: 'auto',
			hasChild: true,
			className: 'customer_reviews'
		});
		rowCustomerReviews.addEventListener('click', function(evt) {
			tgSearch.activeTab.open(winYelpBiz.create(data.mobile_url,false),{animated:true});
			winDOLMap.win.barColor = headerColor;
		});
		
		var imgReviewRating = Ti.UI.createImageView({
			image: data.rating_img_url,
			height: 17,
			bottom: 5,
			left: 10,
			//width: 84
			width: 100
		});
		
		var lblReviewCount = Ti.UI.createLabel({
			text: (data.review_count == 1) ? data.review_count + ' Review' :  data.review_count + ' Reviews',
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
		winYelp_detail.tableView.appendRow(rowCustomerReviews);
		
		if (data.phone && data.phone != '') {
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
			winYelp_detail.tableView.appendRow(rowCallHeader);
			
			var rowPhone = Ti.UI.createTableViewRow({
				height: 'auto',
				hasChild:true,
				className: 'phone'
				//selectedBackgroundColor: 'black',
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
			    font:{fontSize:14}
			});
			rowPhone.add(lblPhone);
			winYelp_detail.tableView.appendRow(rowPhone);
		}
		
		
		var rowOSHAHeader = Ti.UI.createTableViewRow({
			height: 'auto',
			className: 'section_header',
			backgroundColor: headerColor,
			selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
		});
		
		var lblOSHA = Ti.UI.createLabel({
			text: 'Safety, Health, Labor Violations',
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
		winYelp_detail.tableView.appendRow(rowOSHAHeader);
		
		var rowOSHADetail = Ti.UI.createTableViewRow({
			height:'auto',
			className: 'osha_detail',
			selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
		});
		
		var lblInViolation = Ti.UI.createLabel({
			text: 'Unknown',
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
			width: 100,
			bottom: 10
		});
		if (data.industry == 'Food') {
			imgInViolation.image = 'food_gray.png';
		}
		else if (data.industry == 'Retail') {
			imgInViolation.image = 'retail_gray.png';
		} else {
			imgInViolation.image = 'hospitality_gray.png';
		}
		rowOSHADetail.add(imgInViolation);
        
		winYelp_detail.tableView.appendRow(rowOSHADetail);
		
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
		winYelp_detail.tableView.appendRow(rowContactDOLHeader);
		
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
			//image:'DoLabor_seal_small.gif',
			image:'DoLabor_seal_small.gif',
			height: 32,
			width: 32,
			right: 5,
			top: 5,
			bottom: 5
		});
		rowContactDOL.add(imgDolLogo);
		winYelp_detail.tableView.appendRow(rowContactDOL);
		
		return winYelp_detail.win;
    };
    
})();








