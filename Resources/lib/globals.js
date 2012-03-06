module.exports = {
	ORIENTATION_MODES: [Titanium.UI.PORTRAIT],
	HEADER_COLOR:'#3366CC',
	ROW_SELECTION_COLOR: '#7EACFF',
	currentLocation: {latitude:38.895112, longitude:-77.036366},
	
	vwIndicator: null,
	
	winDisclaimer: null,
	winHome: null,
	winTakeAction: null,
	winSearch: null,
	winFilter: null,
	winLocation: null,
	winBizDetail: null,
	winOSHAReport: null,
	winBizMap: null,
	winYelpBiz: null,
	winWHDReport: null,
	
	tabSearch1: null,
	tgSearch: null,
	
	FilterSettings: {
		SearchName: null,
		
		INDUSTRY_FOOD: 0,
		INDUSTRY_RETAIL: 1,
		INDUSTRY_HOSPITALITY: 2,
		INDUSTRY_ALL: 3,
		
		Industry: 0,
		
		SOURCE_DOL: 0,
		SOURCE_YELP: 1,
		SOURCE_ALL: 2,
		
		Source: 0,
		
		INSPECTIONS_VIOLATIONS: 0,
		INSPECTIONS_NOVIOLATIONS: 1,
		INSPECTIONS_ALL: 2,
		
		Inspections: 2,
		
		DOLSOURCE_OSHA: 0,
		DOLSOURCE_WHD: 1,
		DOLSOURCE_ALL: 2,
		
		DolSource: 2,
		
		DOLAREA_LOCAL: 0,
		DOLAREA_NATIONAL: 1,
		
		DolArea: 0,
	}
};