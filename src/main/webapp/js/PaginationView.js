;(function() {
	/**
	 * View: Pagination
	 * 
	 * param: $target, count
	 * 
	 */
    (function ($) {

        brite.registerView("PaginationView",  {loadTmpl:true,emptyParent:true}, {
            create:function (data, config) {
                var html = app.render("#tmpl-PaginationView");
                var $e = $(html);
                var view = this;
                view.$target = data.$target;
                return $e;
            },

            postDisplay:function (data, config) {
                var view = this;
                var $e = view.$el;
                data = data || {};
            },
            events:{
            	"click;.pageNum.action":function(e){
            		var view = this;
                    var $e = view.$el;
            		var num = $(e.target).attr("data-num") * 1;
            		var pageInfo = view.pagination.go(num);
            		process.call(view,pageInfo.pageNum-1,pageInfo.pageSize);
            	},
            	"click;.next.action":function(e){
            		var view = this;
            		var $e = view.$el;
            		var pageInfo = view.pagination.next();
            		process.call(view,pageInfo.pageNum-1,pageInfo.pageSize);
            	},
            	"click;.nextEnd.action":function(e){
            		var view = this;
            		var $e = view.$el;
            		var pageInfo = view.pagination.goLast();
            		process.call(view,pageInfo.pageNum-1,pageInfo.pageSize);
            	},
            	"click;.prev.action":function(e){
            		var view = this;
            		var $e = view.$el;
            		var pageInfo = view.pagination.prev();
            		process.call(view,pageInfo.pageNum-1,pageInfo.pageSize);
            	},
            	"click;.prevStart.action":function(e){
            		var view = this;
            		var $e = view.$el;
            		var pageInfo = view.pagination.goFirst();
            		process.call(view,pageInfo.pageNum-1,pageInfo.pageSize);
            	},
            	"keyup;input[name='gotoPage']":function(e){
            		var view = this;
            		var $e = view.$el;
            		var $input = $(e.target);
            		if(e.which == 13){
            			var num = $input.val() * 1;
            			var pageInfo = view.pagination.getPageInfo();
            			if(!isNaN(num)){
            				pageInfo = view.pagination.go(num);
            			}
            			process.call(view,pageInfo.pageNum-1,pageInfo.pageSize);
            		}
            	},
            	"change;select[name='pageSize']":function(e){
            		var view = this;
            		var $e = view.$el;
            		var $input = $(e.target);
            		var pageSize = $input.val() * 1;
            		view.pagination.setPageSize(pageSize);
            		var pageInfo = view.pagination.getPageInfo();
            		process.call(view,pageInfo.pageNum-1,pageInfo.pageSize);
            	}
            },
            refresh:function(count,pageSize){
            	var view = this;
            	var $e = view.$el;
            	view.count = count;
    			var pagination = view.pagination;
    			if (!pagination) {
    				pagination = new app.Pagination(view.count, null,pageSize);
    				view.pagination = pagination;
    			}
    			var html = app.render("#tmpl-PaginationView-info",pagination.getPageInfo());
    			$e.empty().append($(html));
            }
        });
        
        function process(pageIndex,pageSize){
        	var view = this;
            var $e = view.$el;
            
            if(typeof pageSize == 'undefined'){
            	pageSize = 5;
			}
            if(typeof pageIndex == 'undefined'){
            	pageIndex = 0;
            }
            
            view.$target.trigger("DO_PAGE_CHANGE", {pageIndex:pageIndex,pageSize:pageSize});
        }
        
    })(jQuery);


})();
