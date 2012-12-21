var app = app || {};
(function($) {
	app.oauth = {};
	
	app.oauth.authorize = function(service){
		return window.showModalDialog(contextPath+"/authorize.json?service="+service);
	}
	
	app.oauth.setToken = function(paramsStr,service,email){
		var params = {mehotd:"POST"};
		params.params = paramsStr;
		params.service = service;
		params.email = email;
		return app.getJsonData(contextPath+"/setToken.do",params);
	}
})(jQuery);
