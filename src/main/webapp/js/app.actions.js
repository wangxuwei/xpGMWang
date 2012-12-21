var app = app || {};
(function($) {
	app.actions = {};
	
	app.actions.listMails = function(groupId){
		var params = {mehotd:"Get"};
		params.groupId = groupId;
		return app.getJsonData(contextPath+"/listMails.json",params);
	}
	app.actions.getMail = function(id){
		var params = {mehotd:"Get"};
		params.id = id;
		return app.getJsonData(contextPath+"/getMail.json",params);
	}
	app.actions.saveMail = function(id,fullId,name,email,groupIds){
		var params = {mehotd:"Post"};
		params.id = id;
		params.fullId = fullId;
		params.name = name;
		params.email = email;
		params.groupIds = groupIds;
		return app.getJsonData(contextPath+"/saveMail.do",params);
	}
	app.actions.deleteMail = function(id){
		var params = {mehotd:"Post"};
		params.id = id;
		return app.getJsonData(contextPath+"/deleteMail.do",params);
	}
	
	app.actions.listGroups = function(){
		var params = {mehotd:"Get"};
		return app.getJsonData(contextPath+"/listGroups.json",params);
	}
	app.actions.getGroup = function(id){
		var params = {mehotd:"Get"};
		params.id = id;
		return app.getJsonData(contextPath+"/getGroup.json",params);
	}
	app.actions.saveGroup = function(id,name){
		var params = {mehotd:"Post"};
		params.id = id;
		params.name = name;
		return app.getJsonData(contextPath+"/saveGroup.do",params);
	}
	app.actions.deleteGroup = function(id){
		var params = {mehotd:"Post"};
		params.id = id;
		return app.getJsonData(contextPath+"/deleteGroup.do",params);
	}
})(jQuery);