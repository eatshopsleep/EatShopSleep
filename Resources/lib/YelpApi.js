exports.searchRequest = function(term, address, zip, category_filter, ll, success, error) {
	Ti.include('/lib/oauth.js');
	Ti.include('/lib/sha1.js');
	
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
	}
	
	var auth = { 
	  consumerKey: "KTesPRlMU1PRCM7KGn8O0w", 
	  consumerSecret: "f5hYkyPHkn32ouo5QLZoZ4em9X0",
	  accessToken: "cZmV2bYBDgBySwAXjjUb1fxRjBRfdpq9",
	  accessTokenSecret: "G_U0hdJ5l9xe3qvuyIrblHhoqxU",
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
	} else {
		parameters.push(['sort', 1]); // sort by distance
	}
	if (category_filter) {
		parameters.push(['category_filter', category_filter]);
	}
	
	if (ll) {
		parameters.push(['ll', ll]);	
	} else {
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
	
	var xhr = Titanium.Network.createHTTPClient();
    xhr.timeout = 100000;
     
	var finalUrl = OAuth.addToURL(message.action, message.parameters); 
	
	xhr.open('GET', finalUrl);
    xhr.onerror = function(evt){
        Ti.API.error("API ERROR " + evt.error);
        error(evt);
        
    };
    
    xhr.onload = function(){
        
        success(this.responseText);
        
        // WANT TO PARSE HERE BUT ANDROID WONT SEE VALUES: TIMOB-5499
    	//var jsonResponse = JSON.parse(this.responseText);
    	//success(jsonResponse);	
        
    };
         
    xhr.send();
    
};

