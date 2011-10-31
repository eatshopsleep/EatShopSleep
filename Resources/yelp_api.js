Ti.include('oauth.js');
Ti.include('sha1.js');

var yelp_api = {
	xhr: null
};

(function() {
	
	yelp_api.searchRequest = function(term, address, zip, category_filter, ll, success, error) {
		if (term) {
			var uc = term.toUpperCase();
			var pos = uc.search('DBA');
			if (pos > -1) {
				term = term.substr(pos+4);
			}
			term = term.replace(/LLC/i, '');
			term = term.replace(/INC/i, '');
			
			term = term.replace(/,/g, ' ');
			term = term.replace(/-/g, ' ');
			term = term.replace(/\(/g, ' ');
			term = term.replace(/\)/g, ' ');
			Ti.API.info(term);
		}
		
		var auth = { 
		  consumerKey: "KTesPRlMU1PRCM7KGn8O0w", 
		  consumerSecret: "f5hYkyPHkn32ouo5QLZoZ4em9X0",
		  accessToken: "3Vscd3jPrHW4v6dsb4F5zlwuFmVNvitx",
		  accessTokenSecret: "yA1ObioufuYZq6rFkJJf7QExD_U",
		  serviceProvider: { 
		    signatureMethod: "HMAC-SHA1"
		  }
		};
		
		var accessor = {
		  consumerSecret: auth.consumerSecret,
		  tokenSecret: auth.accessTokenSecret
		};
		
		parameters = [];
		if (term) {
			parameters.push(['term', term]);
		}
		else {
			parameters.push(['sort', 1]); // sort by distance
		}
		if (category_filter) {
			parameters.push(['category_filter', category_filter]);
		}
		//if (bounds) {
		//	parameters.push(['bounds', bounds.sw_latitude + ',' + bounds.sw_longitude + '|' + bounds.ne_latitude + ',' + bounds.ne_longitude]);	
		//}
		//else {
		//	parameters.push(['location', address + ',' + zip]);	
		//}
		if (ll) {
			parameters.push(['ll', ll]);	
		}
		else {
			parameters.push(['location', address + ',' + zip]);	
		}
		parameters.push(['oauth_consumer_key', auth.consumerKey]);
		parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
		parameters.push(['oauth_token', auth.accessToken]);
		parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
		
		var message = { 
		  'action': 'http://api.yelp.com/v2/search',
		  'method': 'GET',
		  'parameters': parameters 
		};
		
		OAuth.setTimestampAndNonce(message);
		OAuth.SignatureMethod.sign(message, accessor);
		
		var parameterMap = OAuth.getParameterMap(message.parameters);
		
		if(yelp_api.xhr == null){
	        yelp_api.xhr = Titanium.Network.createHTTPClient();
	        yelp_api.xhr.timeout = 100000;
	    }  
	     
		var finalUrl = OAuth.addToURL(message.action, message.parameters); 
		
		yelp_api.xhr.open('GET', finalUrl);
	    yelp_api.xhr.onerror = function(evt){
	    	//Titanium.App.fireEvent('hide_indicator');
	        Ti.API.error("API ERROR " + evt.error);
	        error(evt);
	        
	    };
	    
	    yelp_api.xhr.onload = function(){
	        //Ti.API.debug("API response: " + this.responseText);
	        //Titanium.App.fireEvent('hide_indicator');
	        var jsonResponse = JSON.parse(this.responseText);
	        success(jsonResponse);
	        
	    };
	    
	    //Titanium.App.fireEvent('show_indicator');        
	    yelp_api.xhr.send();
	};
})();