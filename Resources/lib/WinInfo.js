function WinInfo() {
	var app = require('/lib/globals');
	
	var self = Titanium.UI.createWindow({
		orientationModes: app.ORIENTATION_MODES,
		barColor: app.HEADER_COLOR,
		opacity: Ti.Platform.osname == 'android' ? 1 : 0,
		tabBarHidden: true,
		navBarHidden: Ti.Platform.osname == 'android' ? true : false,
	});	
	self.addEventListener('android:back', function(evt) {
		self.close();
		
		app.winInfo = null;
	});
	
	var btnHome = Titanium.UI.createButton({
		title: 'Home',
		style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});
	btnHome.addEventListener('click', function(evt){
		
		self.animate({opacity:0,duration:300}, function() {
			self.close();
			
			app.winInfo = null;
		});
		app.winHome.ui.animate({opacity:1,duration:300});
	
	});
	
	if (Ti.Platform.osname=='android') {
		self.add(app.winHome.createVwTitle());
	} else {
		var toolbarTop = Ti.UI.iOS.createToolbar({
			items:[btnHome],
			top:0,
			borderWidth: 0,
			barColor: app.HEADER_COLOR
		});	
		self.add(toolbarTop);
	}
	
	var tvInfo = Titanium.UI.createTableView({
		top: 44,
		separatorColor: 'transparent',
		backgroundColor:'white'
	});
	self.add(tvInfo);
	
	tvInfo.appendRow(createRowHeader('About','black'));
	tvInfo.appendRow(createRow('This app was developed for the U.S. Department of Labor\'s app challenge to help raise awareness of the laws in place, to ensure fair and safe workplaces, and empower workers and consumers to make educated choices.'));
	tvInfo.appendRow(createRow('It utilizes inspection and compliance information on the restaurant, retail, and hotel/motel industries from the Occupational Safety & Health Administration (OSHA) and Wage & Hour Divison (WHD) of the Department of Labor.'));
	tvInfo.appendRow(createRow('It also provides business listings and customer reviews from yelp.com for these industries.'));
	
	tvInfo.appendRow(createRowHeader('Credits',app.HEADER_COLOR));
	tvInfo.appendRow(createRow('Copyright ©2012 Rachel Moore\n\nSoftware Development: Rachel Moore\nQuality Assurance: Genevieve Sarmiento'));
	tvInfo.appendRow(createWebsiteRow('Visit the website'));	
	
	this.ui = self;
	
    function createRowHeader(label, color) {
		var row = Ti.UI.createTableViewRow({
			hasChild:false,
			height: Ti.Platform.osname == 'android' ? 40 : 'auto',
			className: 'name',
			selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
			backgroundColor: color,
			selectedBackgroundColor: color,
		});
		
		var lbl1 = Ti.UI.createLabel({
			text: label,
			color: 'white',
			top: Ti.Platform.osname == 'android' ? 5 : 7,
			bottom: 5,
			height: 'auto',
			left: 10,
			right: 10,
			textAlign: 'left',
		    font:app.Font.h2
		});
		row.add(lbl1);
		
		return row;
	}
	
	function createRow(label) {
        var row = Ti.UI.createTableViewRow({
			hasChild:false,
			height:'auto',
			className: 'name',
			selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
			selectedBackgroundColor: 'white'
		});
		
		var lbl1 = Ti.UI.createLabel({
			text: label,
			color: 'black',
			top: 5,
			bottom: 5,
			height: 'auto',
			left: 10,
			right: 10,
			textAlign: 'left',
		    font:app.Font.p1
		});
		row.add(lbl1);

		return row;
    }
    function createWebsiteRow(label) {
        var row = Ti.UI.createTableViewRow({
			hasChild:true,
			height:'auto',
			selectedBackgroundColor: app.ROW_SELECTION_COLOR
		});
		row.addEventListener('click', function() {
			Ti.Platform.openURL("http://appsbyrachel.com");
		});
		
		var lbl1 = Ti.UI.createLabel({
			text: label,
			color: 'black',
			top: 5,
			bottom: 5,
			height: 'auto',
			left: 10,
			right: 10,
			textAlign: 'left',
		    font:app.Font.button1,
		    touchEnabled: false
		});
		row.add(lbl1);

		return row;
    }
}
module.exports = WinInfo;