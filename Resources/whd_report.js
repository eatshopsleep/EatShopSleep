var winWHDReport = {};

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
	
	function createRowHeader(label, color, font_size) {
        var row = Ti.UI.createTableViewRow({
			hasChild:false,
			height:'auto',
			width: Titanium.Platform.displayCaps.platformWidth,
			className: 'name',
			selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
			backgroundColor: color
		});
		
		var lbl1 = Ti.UI.createLabel({
			text: label,
			color: 'white',
			top: 5,
			bottom: 5,
			height: 'auto',
			left: 10,
			width: Titanium.Platform.displayCaps.platformWidth - 20,
			//width: 'auto',
			textAlign: 'left',
		    font:{fontSize: font_size, fontWeight:'bold'}
		});
		row.add(lbl1);
		
		return row;
    }
    
    function createRow(label, data) {
        var row = Ti.UI.createTableViewRow({
			hasChild:false,
			height:'auto',
			width: Titanium.Platform.displayCaps.platformWidth,
			className: 'name',
			selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
		});
		
		var lbl1 = Ti.UI.createLabel({
			text: label + data,
			color: 'black',
			top: 5,
			bottom: 5,
			height: 'auto',
			left: 10,
			width: Titanium.Platform.displayCaps.platformWidth - 20,
			//width: 'auto',
			textAlign: 'left',
		    font:{fontSize:14, fontWeight:'normal'}
		});
		row.add(lbl1);
		
		/*
		var lbl1 = Ti.UI.createWebView({
			scalePageToFit: false,
			height: 'auto',
			width: Titanium.Platform.displayCaps.platformWidth,
			html: "<div style='font-family:Tahoma,Arial,Verdana,Geneva,Helvetica,sans-serif; font-size: 14px;'><b>" + label + "</b>" +data + "</div>",
			//color: 'black',
			//top: 5,
			//bottom: 5,
			//height: 'auto',
			//left: 10,
			//width: Titanium.Platform.displayCaps.platformWidth - 20,
			//width: 'auto',
			//textAlign: 'left',
		    //font:{fontSize:14, fontWeight:'normal'}
		});

		
		row.add(lbl1);
		*/
		return row;
    }
    
	winWHDReport.create = function(whd_data) {
		
		var vwLogo = Ti.UI.createView({
			//backgroundImage: 'dol_seal_small.png',
			//width: 32,
			//height: 32
			backgroundImage:'whd_logo_small.png',
			height: 20,
			width: 52,
			borderRadius: 3,
			backgroundColor: 'white'
		});
		
		var win = Titanium.UI.createWindow({
			orientationModes: orientationModes,
			backgroundColor: 'white',
			tabBarHidden: true,
			//navBarHidden: true,
			left: Titanium.Platform.displayCaps.platformWidth,
			titleControl: null,
			rightNavButton: vwLogo,
			barColor: headerColor
		});
		win.addEventListener('close', function() {	
			winDOLMap.win.barColor = headerColor;
		});
		
		/*
		var vwHeader = Ti.UI.createView({
			top: 0,
			//left: 0,
			height:50,
			//width: Titanium.Platform.displayCaps.platformWidth,
			backgroundColor: 'black'
			//opacity: 0.5
		});
		win.add(vwHeader);
		
		var lblHeader = Titanium.UI.createLabel({
			text: 'Dept of Labor: Wage & Hour Division (WHD) Findings',
			color: 'white',
			top: 5,
			bottom: 5,
			height: 50,
			left: 10,
			width: Titanium.Platform.displayCaps.platformWidth - 20,
			textAlign: 'left',
		    font:{fontSize:16, fontWeight:'bold'}
		});
		vwHeader.add(lblHeader);
		*/
		var data = [];
		
		var tvReport = Titanium.UI.createTableView({
			separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle,
			top: 0,
			//top: lblHeader.height,
			visible: true,
			separatorColor: 'transparent'
		});
		win.add(tvReport);
		
		tvReport.appendRow(createRowHeader('Dept of Labor: Wage & Hour Division (WHD) Findings','black', 16));
		tvReport.appendRow(createRow('Name: ', whd_data.trade_nm));
		tvReport.appendRow(createRow('Address: ', whd_data.street_addr_1_txt + ', ' + whd_data.city_nm + ', ' + whd_data.st_cd + ' ' + whd_data.zip_cd));
		tvReport.appendRow(createRow('NAICS Code Description: ', whd_data.naics_code_description));
		tvReport.appendRow(createRow('Period of Findings: ', whd_data.findings_start_date + ' - ' + whd_data.findings_end_date));
		
		tvReport.appendRow(createRowHeader('Fair Labor Standards Act, Child Labor',headerColor, 14));
		tvReport.appendRow(createRow('Violations: ', whd_data.flsa_cl_violtn_cnt));
		tvReport.appendRow(createRow('Minors Employed in Violation: ', whd_data.flsa_cl_minor_cnt));
		tvReport.appendRow(createRow('Civil Money Penalties: $', whd_data.flsa_cl_cmp_assd_amt));
		
		tvReport.appendRow(createRowHeader('Fair Labor Standards Act',headerColor, 14));
		tvReport.appendRow(createRow('Violations: ', whd_data.flsa_violtn_cnt));
		tvReport.appendRow(createRow('Employees Owed Back Wages: ', whd_data.flsa_ee_atp_cnt));
		
		tvReport.appendRow(createRow('Back Wages, Total: $', padCents(whd_data.flsa_bw_atp_amt)));
		tvReport.appendRow(createRow('Back Wages, Minimum Wages: $', padCents(whd_data.flsa_mw_bw_atp_amt)));
		tvReport.appendRow(createRow('Back Wages, Overtime: $', padCents(whd_data.flsa_ot_bw_atp_amt)));
		tvReport.appendRow(createRow('Back Wages, Section 15(a)(3): $', padCents(whd_data.flsa_15a3_bw_atp_amt)));
		tvReport.appendRow(createRow('Civil Money Penalties: $', padCents(whd_data.flsa_cmp_assd_amt)));
		tvReport.appendRow(createRow('Repeat Violator: ', whd_data.flsa_repeat_violator));
		
		/*
		var section1 = Titanium.UI.createTableViewSection({
		});
		
		var vwHeader1 = Ti.UI.createView({
			height:0,
			backgroundColor: headerColor
			//opacity: 0.5
		});
		section1.headerView = vwHeader1;
		
		section1.add(createRow('Name: ', whd_data.trade_nm));
		section1.add(createRow('Address: ', whd_data.street_addr_1_txt + ', ' + whd_data.city_nm + ', ' + whd_data.st_cd + ' ' + whd_data.zip_cd));
		section1.add(createRow('NAICS Code Description: ', whd_data.naics_code_description));
		section1.add(createRow('Period of Findings: ', whd_data.findings_start_date + ' - ' + whd_data.findings_end_date));
			
		data.push(section1);
		
		var section2 = Titanium.UI.createTableViewSection({
		});
		
		var vwHeader2 = Ti.UI.createView({
			height:30,
			backgroundColor: headerColor
			//opacity: 0.5
		});
		section2.headerView = vwHeader2;
		
		var lblHeader2 = Titanium.UI.createLabel({
			text: 'Fair Labor Standards Act, Child Labor',
			color: 'white',
			top: 5,
			bottom: 5,
			height: 'auto',
			left: 10,
			width: Titanium.Platform.displayCaps.platformWidth - 20,
			textAlign: 'left',
		    font:{fontSize:14, fontWeight:'bold'}
		});
		vwHeader2.add(lblHeader2);
		
		section2.add(createRow('Violations: ', whd_data.flsa_cl_violtn_cnt));
		section2.add(createRow('Minors Employed in Violation: ', whd_data.flsa_cl_minor_cnt));
		section2.add(createRow('Civil Money Penalties: $', whd_data.flsa_cl_cmp_assd_amt));
		
		data.push(section2);
		
		var section3 = Titanium.UI.createTableViewSection({
		});
		
		var vwHeader3 = Ti.UI.createView({
			height:30,
			backgroundColor: headerColor
			//opacity: 0.5
		});
		section3.headerView = vwHeader3;
		
		var lblHeader3 = Titanium.UI.createLabel({
			text: 'Fair Labor Standards Act',
			color: 'white',
			top: 5,
			bottom: 5,
			height: 'auto',
			left: 10,
			width: Titanium.Platform.displayCaps.platformWidth - 20,
			textAlign: 'left',
		    font:{fontSize:14, fontWeight:'bold'}
		});
		vwHeader3.add(lblHeader3);
		
		section3.add(createRow('Violations: ', whd_data.flsa_violtn_cnt));
		section3.add(createRow('Employees Owed Back Wages: ', whd_data.flsa_ee_atp_cnt));
		section3.add(createRow('Back Wages, Total: $', whd_data.flsa_bw_atp_amt));
		section3.add(createRow('Back Wages, Minimum Wages: $', whd_data.flsa_mw_bw_atp_amt));
		section3.add(createRow('Back Wages, Overtime: $', whd_data.flsa_ot_bw_atp_amt));
		section3.add(createRow('Back Wages, Section 15(a)(3): $', whd_data.flsa_15a3_bw_atp_amt));
		section3.add(createRow('Civil Money Penalties: $', whd_data.flsa_cmp_assd_amt));
		section3.add(createRow('Repeat Violator: ', whd_data.flsa_repeat_violator));
		
		data.push(section3);
		
		tvReport.setData(data);	
		*/
		return win;
	}

})();
