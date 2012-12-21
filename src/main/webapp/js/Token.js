;(function() {

	/**
	 * View: Token
	 *
	 */
	brite.registerView("Token", {
		loadTmpl : true,
		parent : "body"
	}, {
		
		create : function(data, config) {
			var view = this;
			data = data || {};
			view.service = data.service || "GG";
			
			var $html = app.render("#tmpl-Token");
				//show a screen to prevent use click other places
			view.$screen = $("<div class='notTransparentScreen'></div>").appendTo("body");
			return $html;
		},
		
		events : {
	 		"btap; .btnAuth": function(){
	 			var view = this;
	 			var $e = view.$el;
	 			var str = app.oauth.authorize(view.service);
				view.params = str;
				$e.find(".emailContent").show();
				$e.find(".authContent").hide();
				$e.find(".btnSave").show(); 

	 		},
	 		"btap; .btnSave": function(){
	 			var view = this;
	 			var $e = view.$el;
	 			var email = $e.find("input[name='email']").val();
	 			if(email == ""){
	 				alert("email is required");
	 			}else if(!view.params){
	 				alert("do auth first");
	 			}else{
		 			app.oauth.setToken(view.params,"GG",email).done(function(){
			 			window.location = contextPath + "/";
					});
	 			}
	 		}
		},

		close : function(update) {
			var view = this;
			var $e = view.$el;

			$e.bRemove();
			view.$screen.remove();
		},
	});

})();
