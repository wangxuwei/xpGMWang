var app = app || {};
(function($) {
	app.actions = {};
	
	app.actions.listMails = function(groupId,pageData){
		var params = {mehotd:"Get"};
		params.groupId = groupId;
		params.pageJsonInfo = JSON.stringify(pageData);
		return app.getJsonData(contextPath+"/listMails.json",params);
	}
	app.actions.getMail = function(id){
		var params = {mehotd:"Get"};
		params.id = id;
		return app.getJsonData(contextPath+"/getMail.json",params);
	}
	app.actions.replyMail = function(id){
		var params = {mehotd:"Get"};
		params.id = id;
		return app.getJsonData(contextPath+"/replyMail.json",params);
	}
	app.actions.sendMail = function(to,subject,content){
		var params = {mehotd:"Post"};
		params.to = to;
		params.subject = subject;
		params.content = content;
		return app.getJsonData(contextPath+"/sendMail.do",params);
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
})(jQuery);
