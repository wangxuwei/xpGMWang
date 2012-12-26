;(function() {

	/**
	 * View: Mails
	 *
	 */
    (function ($) {
        brite.registerView("Mails",  {loadTmpl:true,emptyParent:true,parent:".MainScreen-main .mailsArea"}, {
            create:function (data, config) {
            	data = data || {};
            	this.groupId = data.groupId;
                var $html = app.render("#tmpl-Mails",data);
                var $e = $($html);
                return $e;
            },
            postDisplay:function (data, config) {
                var view = this;
                var $e = view.$el;
                

				brite.display("PaginationView", $e.find(".pagesContent"), {
					$target : $e
				}).done(function(paginationView) {
					view.paginationView = paginationView;
					refresh.call(view);
				}); 
            },
            events:{
            	"click;.btnAdd":function(e){
            		brite.display("MailSend");
            	},
            	"click;.btnView":function(e){
            		var view = this;
            		var $el = view.$el;
            		var $btn = $(e.currentTarget);
            		var id = $btn.bEntity().id;
            		brite.display("MailInfo",null,{id:id});
            	},
            	"click;.btnDelete":function(e){
            		var view = this;
            		var $el = view.$el;
            		var $btn = $(e.currentTarget);
            		var id = $btn.bEntity().id;
            		app.actions.deleteMail(id).done(function(){
	            		refresh.call(view);
            		});
            	}
            },

            docEvents:{
            	"DO_REFRESH_MAIL":function(){
            		refresh.call(this);
            	}
            },

            events:{
            	"DO_PAGE_CHANGE":function(e,extra){
            		var view = this;
					refresh.call(view,extra.pageIndex,extra.pageSize);
            	}
            }
        });
        
        function refresh(pageIndex,pageSize){
        	var view = this;
        	var $e = view.$el;
        	var $tbody = $e.find(".lists").empty();
        	pageSize = pageSize || 15;
        	app.actions.listMails(view.groupId,{pageIndex:pageIndex,pageSize:pageSize}).done(function(data){
        		var list = data.result;
        		for(var i = 0; i < list.length; i++){
        			var obj = list[i];
        			obj.index = i+1;
        			obj.type="Mail";
        			var $item = app.render("#tmpl-Mails-rowItem",obj);
        			$tbody.append($item);
        		}
        		view.paginationView.refresh(data.result_count,pageSize);
			});

        }
    })(jQuery);


})();
