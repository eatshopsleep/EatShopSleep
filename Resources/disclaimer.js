var winDisclaimer = {
	win: null
};

(function() {
    function helper() {
        //help out
    }
    
	winDisclaimer.create = function() {
		
		winDisclaimer.btnAccept = Ti.UI.createButton({
			style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
			title:'Accept'
		});
		winDisclaimer.btnAccept.addEventListener('click', function(evt){
			Ti.App.Properties.setBool('disclaimerAgreed',true);
			winDisclaimer.win.close();
		});
		
		winDisclaimer.win = Titanium.UI.createWindow({
			orientationModes: orientationModes,
			tabBarHidden: true,
			navBarHidden: false,
			exitOnClose: false,
			barColor: headerColor,
			title: 'eat shop sleep',
			//backgroundColor: '#CCCCCC'
			backgroundColor: 'white',
			rightNavButton: winDisclaimer.btnAccept
		});
/*
		winDisclaimer.flexSpace = Titanium.UI.createButton({
			systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
		});
		
		
		winDisclaimer.btnExit = Ti.UI.createButton({
			style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
			title:'Close'
		});
		winDisclaimer.btnExit.addEventListener('click', function(evt){
			Ti.App.Properties.setBool('disclaimerAgreed',false);
			winDisclaimer.win.close();
		});
		
		winDisclaimer.tbDisclaimer = Ti.UI.createToolbar({
			items:[winDisclaimer.flexSpace,winDisclaimer.btnAccept,winDisclaimer.btnExit],
			top:0,
			borderWidth: 0,
			barColor: headerColor
		});
		winDisclaimer.win.add(winDisclaimer.tbDisclaimer);
		*/
		var tvDisclaimer = Ti.UI.createTableView({
			separatorColor: 'transparent',
			backgroundColor: 'transparent',
			top: 0
		});
		winDisclaimer.win.add(tvDisclaimer);
		
		var lbl1 = Ti.UI.createLabel({
			text: 'Disclaimer',
			color: 'white',
			top: 7,
			bottom: 5,
			height: 'auto',
			left: 10,
			//width: Titanium.Platform.displayCaps.platformWidth - 20,
			width: 'auto',
			textAlign: 'left',
		    font:{fontSize:14, fontWeight:'bold'}
		});
		
		var row1 = Titanium.UI.createTableViewRow({
			hasChild: false,
			height: 'auto',
			className: 'section_header',
			selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
			backgroundColor: 'black'
		});
		row1.add(lbl1);
		tvDisclaimer.appendRow(row1);
		
		var winWidth;
		if (Ti.Platform.osname == 'ipad') {
			winWidth = 540;
		} else {
			winWidth = Titanium.Platform.displayCaps.platformWidth;
		}
		
		var lbl2 = Ti.UI.createLabel({
			text: 'THE MATERIAL EMBODIED IN THIS SOFTWARE IS PROVIDED TO YOU "AS-IS" AND WITHOUT WARRANTY OF ANY KIND, EXPRESS, IMPLIED, OR OTHERWISE, INCLUDING WITHOUT LIMITATION, ANY WARRANTY OF FITNESS FOR A PARTICULAR PURPOSE. IN NO EVENT SHALL THE UNITED STATES DEPARTMENT OF LABOR (DOL) OR THE UNITED STATES GOVERNMENT BE LIABLE TO YOU OR ANYONE ELSE FOR ANY DIRECT, SPECIAL, INCIDENTAL, INDIRECT, OR CONSEQUENTIAL DAMAGES OF ANY KIND, OR ANY DAMAGES WHATSOEVER, INCLUDING WITHOUT LIMITATION, LOSS OF PROFIT, LOSS OF USE, SAVINGS OR REVENUE, OR THE CLAIMS OF THIRD PARTIES, WHETHER OR NOT DOL OR THE U.S. GOVERNMENT HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH LOSS, HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, ARISING OUT OF OR IN CONNECTION WITH THE POSSESSION, USE, OR PERFORMANCE OF THIS SOFTWARE.',
			color: 'black',
			top: 5,
			bottom: 5,
			height: 'auto',
			left: 10,
			width: winWidth - 20,
			//width: 'auto',
			textAlign: 'left',
		    font:{fontSize:12, fontWeight:'normal'}
		});
		
		
		var row2 = Titanium.UI.createTableViewRow({
			hasChild: false,
			height: 'auto',
			className: 'section_header',
			selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
			
		});
		row2.add(lbl2);
		tvDisclaimer.appendRow(row2);
		
		
		
		return winDisclaimer.win;
		
	}
})();