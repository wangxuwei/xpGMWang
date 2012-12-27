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
			
			$.when(dfd).done(function(mail) {
				console.log(1);
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

	// --------- /View Private Methods --------- //

})();
