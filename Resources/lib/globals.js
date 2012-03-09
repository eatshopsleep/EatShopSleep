exports.ORIENTATION_MODES = [Titanium.UI.PORTRAIT];
exports.HEADER_COLOR ='#3366CC';
exports.ROW_SELECTION_COLOR = '#7EACFF';
exports.CurrentLocation = {latitude:38.895112, longitude:-77.036366};

exports.Font = {
	h1: {fontSize: '18dp', fontWeight:'bold'},
	h2: {fontSize: '16dp', fontWeight:'bold'},
	h3: {fontSize: '16dp', fontWeight:'normal'}, 
	h4: {fontSize: '14dp', fontStyle:'italic'},
	h5: {fontSize: '12dp', fontWeight:'bold'},
	h6: {fontSize:'12dp', fontStyle:'italic'},
	p1: {fontSize: '14dp', fontWeight:'normal'},
	p2: {fontSize: '12dp', fontWeight:'normal'},
	button1: {fontSize:'14dp', fontWeight:'bold'},
	button2: {fontSize:'16dp', fontWeight:'bold'},
	input1: {fontSize: '16dp', fontWeight:'normal'}, 
};

exports.vwIndicator = null;
exports.winDisclaimer = null;
exports.winHome = null;
exports.winTakeAction = null;
exports.winSearch = null;
exports.winFilter = null;
exports.winLocation = null;
exports.winBizDetail = null;
exports.winOSHAReport = null;
exports.winBizMap = null;
exports.winYelpBiz = null;
exports.winWHDReport = null;

exports.tabSearch1 = null;
exports.tgSearch = null;
	
var Filter = {
	INDUSTRY_FOOD: 0,
	INDUSTRY_RETAIL: 1,
	INDUSTRY_HOSPITALITY: 2,
	INDUSTRY_ALL: 3,
	SOURCE_DOL: 0,
	SOURCE_YELP: 1,
	SOURCE_ALL: 2,
	INSPECTIONS_VIOLATIONS: 0,
	INSPECTIONS_NOVIOLATIONS: 1,
	INSPECTIONS_ALL: 2,
	DOLSOURCE_OSHA: 0,
	DOLSOURCE_WHD: 1,
	DOLSOURCE_ALL: 2,
	DOLAREA_LOCAL: 0,
	DOLAREA_NATIONAL: 1,
};
exports.Filter = Filter;

var	FilterSettings = {
	SearchName: null,
	Industry: Filter.INDUSTRY_FOOD,
	Source: Filter.SOURCE_ALL,
	Inspections: Filter.INSPECTIONS_ALL,
	DolSource: Filter.DOLSOURCE_ALL,
	DolArea: Filter.DOLAREA_LOCAL,
};
exports.FilterSettings = FilterSettings;
