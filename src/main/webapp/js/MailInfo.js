;(function() {

	/**
	 * View: MailInfo
	 *
	 */
	brite.registerView("MailInfo", {
		loadTmpl : true,
		parent : "body"
	}, {
		
		create : function(data, config) {
			var view = this;
			var dfd = $.Deferred();
			var createDfd = $.Deferred();
			data = data || {};
			if (data.id) {
				app.actions.getMail(data.id).done(function(data) {
					dfd.resolve(data.result);
				});
			} else {
				dfd.resolve({});
			}
			
			
			$.when(dfd,app.actions.listGroups()).done(function(mail,groupsObj) {
				var groupList = groupsObj.result;
				if(mail.groupIds){
					for(var i = 0; i < groupList.length; i++){
						for(var j = 0; j < mail.groupIds.length; j++){
							if(groupList[i].fullId == mail.groupIds[j]){
								groupList[i].selected = true;
								break;
							}
						}
					}
				}
				mail.groupList = groupList;
				view.mailId = mail.id || null;
				view.mailFullId = mail.mailFullId || null;
				view.groupIds = mail.groupIds || [];
				var $html = app.render("#tmpl-MailInfo",mail);
				//show a screen to prevent use click other places
				view.$screen = $("<div class='notTransparentScreen'></div>").appendTo("body");
				createDfd.resolve($html);
			});

			return createDfd.promise();
		},
		
		events : {
	 		"btap; .btnClose": function(){
	 			var view = this;
	 			view.close();
	 		}, 
	 		"btap; .btnCreate": function(){
	 			saveMail.call(this);
	 		}
		},

		close : function(update) {
			var view = this;
			var $e = view.$el;

			$e.bRemove();
			view.$screen.remove();
		},
	});

	// --------- View Private Methods --------- //
	function saveMail() {
		var view = this;
		var $e = view.$el;

		var name = $e.find("input[name='name']").val();
		var email = $e.find("input[name='email']").val();
		var groupIds = "";
		$e.find("input[name='groupId']:checked").each(function(i,obj){
			if(i != 0){
				groupIds += ",";
			}
			groupIds += $(this).val();
		});
		
		// if mail id exist do update,else do create
		app.actions.saveMail(view.mailId,view.mailFullId, name,email,groupIds).done(function() {
			$(document).trigger("DO_REFRESH_MAIL");
			view.close();
		}); 


	}

	// --------- /View Private Methods --------- //

})();
