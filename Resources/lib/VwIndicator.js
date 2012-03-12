function VwIndicator() {
	var self = Titanium.UI.createView({
		height:150,
		width:150,
		backgroundColor:'#000',
		borderRadius:10,
		opacity:0.8
	});
	
	var actInd = Titanium.UI.createActivityIndicator({
		style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
		height:30,
		width:30,
		message: Ti.Platform.osname == 'android' ? 'Loading' : null
	});
	
	if (Ti.Platform.osname != 'android') {
		self.add(actInd);	
	}
	
	var lblActivity = Titanium.UI.createLabel({
		text:'Loading',
		color:'#fff',
		width:'auto',
		height:'auto',
		font:{fontSize:20,fontWeight:'bold'},
		bottom:20
	});
	self.add(lblActivity);

	this.ui = self;	
	this.show = function(window) {
		if (Ti.Platform.osname != 'android') {
			window.add(self);
		} 
		actInd.show();
	};
	this.hide = function(window) {
		actInd.hide();	
		if (Ti.Platform.osname != 'android') {
			window.remove(self);
		} 
	};
	
}
module.exports = VwIndicator;

