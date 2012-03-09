function WinWHDReport(whd_data) {
	var app = require('/lib/globals');
	
	var vwLogo = Ti.UI.createView({
		//backgroundImage: 'dol_seal_small.png',
		//width: 32,
		//height: 32
		backgroundImage:'/images/whd_logo_small.png',
		height: 20,
		width: 52,
		borderRadius: 3,
		backgroundColor: 'white'
	});
	
	var self = Titanium.UI.createWindow({
		orientationModes: app.ORIENTATION_MODES,
		backgroundColor: 'white',
		tabBarHidden: true,
		navBarHidden: Ti.Platform.osname == 'android' ? true : false,
		//left: Ti.Platform.osname == 'android' ? 0 : Titanium.Platform.displayCaps.platformWidth,
		titleControl: null,
		rightNavButton: vwLogo,
		barColor: app.HEADER_COLOR
	});
	self.addEventListener('close', function() {	
		app.winSearch.ui.barColor = app.HEADER_COLOR;
		
		app.winWHDReport = null;
	});
	self.addEventListener('android:back', function() {	
		self.close();
		
		app.winWHDReport = null;
	});
	
	var data = [];
	
	var tvReport = Titanium.UI.createTableView({
		separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle,
		top: 0,
		//top: lblHeader.height,
		visible: true,
		separatorColor: 'transparent'
	});
	self.add(tvReport);
	
	tvReport.appendRow(createRowHeader('Dept of Labor: Wage & Hour Division (WHD) Findings','black', '16dp'));
	tvReport.appendRow(createRow('Name: ', whd_data.biz_name));
	tvReport.appendRow(createRow('Address: ', whd_data.address + ', ' + whd_data.city + ', ' + whd_data.state + ' ' + whd_data.zip));
	tvReport.appendRow(createRow('NAICS Code Description: ', whd_data.naics_code_description));
	tvReport.appendRow(createRow('Period of Findings: ', whd_data.findings_start_date + ' - ' + whd_data.findings_end_date));
	
	tvReport.appendRow(createRowHeader('Fair Labor Standards Act, Child Labor',app.HEADER_COLOR, '16dp'));
	tvReport.appendRow(createRow('Violations: ', whd_data.flsa_cl_violtn_cnt));
	tvReport.appendRow(createRow('Minors Employed in Violation: ', whd_data.flsa_cl_minor_cnt));
	tvReport.appendRow(createRow('Civil Money Penalties: $', whd_data.flsa_cl_cmp_assd_amt));
	
	tvReport.appendRow(createRowHeader('Fair Labor Standards Act',app.HEADER_COLOR, '16dp'));
	tvReport.appendRow(createRow('Violations: ', whd_data.flsa_violtn_cnt));
	tvReport.appendRow(createRow('Employees Owed Back Wages: ', whd_data.flsa_ee_atp_cnt));
	
	tvReport.appendRow(createRow('Back Wages, Total: $', padCents(whd_data.flsa_bw_atp_amt)));
	tvReport.appendRow(createRow('Back Wages, Minimum Wages: $', padCents(whd_data.flsa_mw_bw_atp_amt)));
	tvReport.appendRow(createRow('Back Wages, Overtime: $', padCents(whd_data.flsa_ot_bw_atp_amt)));
	tvReport.appendRow(createRow('Back Wages, Section 15(a)(3): $', padCents(whd_data.flsa_15a3_bw_atp_amt)));
	tvReport.appendRow(createRow('Civil Money Penalties: $', padCents(whd_data.flsa_cmp_assd_amt)));
	tvReport.appendRow(createRow('Repeat Violator: ', whd_data.flsa_repeat_violator));
	
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
	
	function createRowHeader(label, color, font_size) {
        var row = Ti.UI.createTableViewRow({
			hasChild:false,
			height: 'auto',
			width: Titanium.Platform.displayCaps.platformWidth,
			className: 'name',
			selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
			backgroundColor: color,
			backgroundSelectedColor: color
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
			selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
			backgroundSelectedColor: 'white'
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
		    font:{fontSize: '14dp', fontWeight:'normal'}
		});
		row.add(lbl1);
		
		return row;
    }
}
module.exports = WinWHDReport;
