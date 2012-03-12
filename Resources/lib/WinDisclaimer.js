function WinDisclaimer() {
	var app = require('/lib/globals');
	
	var btnAccept = Ti.UI.createButton({
		style: Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
		title:'Accept',
	});
	btnAccept.addEventListener('click', function(evt){
		Ti.App.Properties.setBool('disclaimerAgreed',true);
		win.close();
		win = null;
		app.winDisclaimer = null;
	});
	
	var win = Titanium.UI.createWindow({
		orientationModes: app.ORIENTATION_MODES,
		tabBarHidden: true,
		navBarHidden: Ti.Platform.osname == 'android' ? true : false,
		modal: Ti.Platform.osname == 'android' ? false : true,
		barColor: app.HEADER_COLOR,
		backgroundColor: 'white',
		rightNavButton: btnAccept
	});
	win.addEventListener('android:back', function(evt) {
	});
	
	if (Ti.Platform.osname=='android') {
		win.add(app.winHome.createVwTitle());
	}

	var tvDisclaimer = Ti.UI.createTableView({
		separatorColor: 'transparent',
		backgroundColor: 'transparent',
		top: Ti.Platform.osname=='android' ? 44 : 0,
		bottom: Ti.Platform.osname=='android' ? 44 : 0,
	});
	win.add(tvDisclaimer);
	
	var lbl1 = Ti.UI.createLabel({
		text: 'Disclaimer',
		color: 'white',
		top: Ti.Platform.osname == 'android' ? 5 : 7,
		bottom: 5,
		height: Ti.Platform.osname == 'android' ? 40 : 'auto',
		left: 10,
		width: 'auto',
		textAlign: 'left',
	    font:app.Font.h2
	});
	
	var row1 = Titanium.UI.createTableViewRow({
		hasChild: false,
		height: Ti.Platform.osname == 'android' ? 40 : 'auto',
		selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
		backgroundColor: 'black',
		selectedBackgroundColor: 'black'
	});
	row1.add(lbl1);
	tvDisclaimer.appendRow(row1);
	
	var lbl2 = Ti.UI.createLabel({
		text: 'THE MATERIAL EMBODIED IN THIS SOFTWARE IS PROVIDED TO YOU "AS-IS" AND WITHOUT WARRANTY OF ANY KIND, EXPRESS, IMPLIED, OR OTHERWISE, INCLUDING WITHOUT LIMITATION, ANY WARRANTY OF FITNESS FOR A PARTICULAR PURPOSE. IN NO EVENT SHALL THE UNITED STATES DEPARTMENT OF LABOR (DOL) OR THE UNITED STATES GOVERNMENT BE LIABLE TO YOU OR ANYONE ELSE FOR ANY DIRECT, SPECIAL, INCIDENTAL, INDIRECT, OR CONSEQUENTIAL DAMAGES OF ANY KIND, OR ANY DAMAGES WHATSOEVER, INCLUDING WITHOUT LIMITATION, LOSS OF PROFIT, LOSS OF USE, SAVINGS OR REVENUE, OR THE CLAIMS OF THIRD PARTIES, WHETHER OR NOT DOL OR THE U.S. GOVERNMENT HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH LOSS, HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, ARISING OUT OF OR IN CONNECTION WITH THE POSSESSION, USE, OR PERFORMANCE OF THIS SOFTWARE.',
		color: 'black',
		top: 5,
		bottom: 5,
		height: 'auto',
		left: 10,
		right: 10,
		textAlign: 'left',
	    font:app.Font.p2
	});
	
	var row2 = Titanium.UI.createTableViewRow({
		hasChild: false,
		height: 'auto',
		selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
		selectedBackgroundColor: 'white'
		
	});
	row2.add(lbl2);
	tvDisclaimer.appendRow(row2);
	
	if (Ti.Platform.osname == 'android') {
		
		var lbl = Ti.UI.createLabel({
			text: 'Accept',
			color: 'white',
			height: 38,
			width: 200,
			textAlign: 'center',
			font:app.Font.button2,
			backgroundImage: '/images/blue_button_200x38.png',
			backgroundSelectedImage: '/images/blue_button_200x38_pressed.png',
		});
		lbl.addEventListener('click', function() {
			Ti.App.Properties.setBool('disclaimerAgreed',true);
			win.close();
			win = null;
			app.winDisclaimer = null;
		});
		
		var vwBottom = Titanium.UI.createView({
			height: 60,
			bottom: 0,
		});
		vwBottom.add(lbl);
		
		win.add(vwBottom);
	}
	
	this.ui = win;
	
}
module.exports = WinDisclaimer;
