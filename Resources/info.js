var winInfo = {
	win: null
};

(function() {
	
	function createRowHeader(label, color) {
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
			top: 7,
			bottom: 5,
			height: 'auto',
			left: 10,
			width: Titanium.Platform.displayCaps.platformWidth - 20,
			//width: 'auto',
			textAlign: 'left',
		    font:{fontSize:14, fontWeight:'bold'}
		});
		row.add(lbl1);
		
		return row;
	}
	
	function createRow(label) {
        var row = Ti.UI.createTableViewRow({
			hasChild:false,
			height:'auto',
			width: Titanium.Platform.displayCaps.platformWidth,
			className: 'name',
			selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
		});
		
		var lbl1 = Ti.UI.createLabel({
			text: label,
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
		
		
		
		return row;
    }
    
	winInfo.create = function() {
		winInfo.win = Titanium.UI.createWindow({
			orientationModes: orientationModes,
			barColor: headerColor,
			//backgroundColor: '#CCCCCC'
			backgroundColor: 'white',
			opacity: 0
		});	
		
		winInfo.btnHome = Titanium.UI.createButton({
			title: 'Home',
			style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
		});
		winInfo.btnHome.addEventListener('click', function(evt){
			winInfo.win.animate({opacity:0,duration:300});
			winHome.win.animate({opacity:1,duration:300});
		
		});
		
		winInfo.toolbarTop = Titanium.UI.createToolbar({
			items:[winInfo.btnHome],
			top:0,
			borderWidth: 0,
			//height: 44,
			barColor: headerColor
		});	
		winInfo.win.add(winInfo.toolbarTop);
		
		var tvInfo = Titanium.UI.createTableView({
			top: 44,
			separatorColor: 'transparent'
		});
		winInfo.win.add(tvInfo);
		
		tvInfo.appendRow(createRowHeader('About','black'));
		tvInfo.appendRow(createRow('This app was developed for the U.S. Department of Labor\'s app challenge to help raise awareness of the laws in place, to ensure fair and safe workplaces, and empower workers and consumers to make educated choices.'));
		tvInfo.appendRow(createRow('It utilizes inspection and compliance information on the restaurant, retail, and hotel/motel industries from the Occupational Safety & Health Administration (OSHA) and Wage & Hour Divison (WHD) of the Department of Labor.'));
		tvInfo.appendRow(createRow('It also provides business listings and customer reviews from yelp.com for these industries.'));
		
		tvInfo.appendRow(createRowHeader('Developer',headerColor));
		tvInfo.appendRow(createRow('R. Moore'));
		
		
		return winInfo.win;
    }
    
})();