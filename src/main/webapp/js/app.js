var app = app || {};

(function(w){  
  w.render = function(templateName,data){
    var tmpl = Handlebars.templates[templateName];
    if (tmpl){
      return tmpl(data);
    }else{
      // obviously, handle this case as you think most appropriate.
      return "<small>Error: could not find template: " + templateName + "</small>";
    }
  }
})(window);    

(function($) {
	
	app.render = function(templateName,data){
		data = data || {};
		return render(templateName,data);
	}
	
	// -------- Public Methods --------- //
	/**
	 * A method about use ajax to get json data
	 */
	app.getJsonData = function(url, params) {
		var dfd = $.Deferred();
		params = params || {};
		jQuery.ajax({
			  type : params.method ? params.method : "Post",
			  url : url,
			  async : true,
			  data : params,
			  dataType : "json"
		  }).success(function(data) {
		  	  if(data && data.AUTH_FAILED){
		  	  	window.location = contextPath + "/";
		  	  }
			  dfd.resolve(data);
		  }).fail(function(jxhr, arg2) {
			try {
				if (jxhr.responseText) {
					console.log(" WARNING: json not well formatted, falling back to JS eval");
					var data = eval("(" + jxhr.responseText + ")");
					dfd.resolve(data);
				} else {
					throw " EXCEPTION: Cannot get content for " + url;
				}
			} catch (ex) {
				console.log(" ERROR: " + ex + " Fail parsing JSON for url: " + url + "\nContent received:\n"
				  + jxhr.responseText);
			}
		});

		return dfd.promise();
	}
	
})(jQuery);



//get pagination object for some list data
(function($){
	
	var _pageNum = 1;
	var _pageSize = 25;
	
	var _dataList,_sizeCount,_pageCount;
	
	// --------- app.Pagination Constructor --------- //
	function Pagination(count,list,pageSize){
			//init private members
			_dataList = [].concat(list);
			_sizeCount = count;
			if(typeof pageSize != 'undefined'){
				_pageSize = pageSize;
			}
			_pageCount = getPageCount();
			return this;
	}
	app.Pagination = Pagination; 
	// --------- /app.Pagination Constructor --------- //

	// --------- Public Methods --------- //
	Pagination.prototype.getList = function(){
		return _dataList;
	}
	Pagination.prototype.getPageInfo = function(){
		return this.go(_pageNum);
	}
	Pagination.prototype.setPageSize = function(pageSize){
		if(typeof pageSize != "undefined"){
			_pageSize = pageSize;
			_pageCount = getPageCount();
		}
	}
	Pagination.prototype.go = function(pageNum){
		if(pageNum < 1){
			pageNum = 1;
		}
		var pageSizeNum = _pageSize;
		if(_pageSize == "all"){
			pageSizeNum = _sizeCount;
		}
		var startRows = ( pageNum-1 ) * pageSizeNum + 1;
		var endRows = pageNum * pageSizeNum;
		if(_sizeCount == 0){
			startRows = 0;
			endRows = 0;
		}else{
			if(startRows > _sizeCount){
				startRows = ( _pageCount-1 ) * pageSizeNum + 1; 
				endRows = _sizeCount;
				_pageNum = _pageCount;
			}else if(startRows <= _sizeCount && endRows > _sizeCount){
				endRows = _sizeCount;
				_pageNum = _pageCount;
			}else{
				_pageNum = pageNum;
			}
		}
		
		//var subList = [];
		//for(var i = startRows-1 ; i < endRows;i++){
			//subList.push(_dataList[i]);
		//}

		var pageCount = getPageCount();
		var pageInfo = {
				pageNum:_pageNum,
				pageSize:_pageSize,
				sizeCount:_sizeCount,
				pageCount:pageCount,
				pageList:_dataList,
				startRows:startRows,
				endRows:endRows,
				isFirst:isFirst(),
				isLast:isLast(),
				getArrayFrom1To6:getArrayFromMToN(1,6),
				getArrayFrom1ToPC:getArrayFromMToN(1,pageCount),
				getArrayFromPr2ToPa3:getArrayFromMToN(_pageNum-2,_pageNum+3),
				getArrayFromPCr6ToPC:getArrayFromMToN(pageCount-6,pageCount)
			}

		return pageInfo;
	}
	Pagination.prototype.next = function(){
		return this.go(_pageNum + 1);
	}
	Pagination.prototype.prev = function(){
		return this.go(_pageNum - 1);
	}
	Pagination.prototype.goFirst = function(){
		return this.go(1);
	}
	Pagination.prototype.goLast = function(){
		return this.go(_pageCount);
	}
	// --------- /Public Methods --------- //
	
	function isFirst(){
		if(_pageNum == 1){
			return true;
		}
		return false;
	}
	
	function isLast(){
		if(_pageNum == _pageCount){
			return true;
		}
		return false;
	}
	
	function getPageCount(){
		var pageSizeNum = _pageSize;
		if(_pageSize == "all"){
			pageSizeNum = _sizeCount;
		}
		_pageCount = Math.ceil(_sizeCount / pageSizeNum);
		return _pageCount;
	}
	
	
	
	//get a array from m to n, m and n must be number. m must be smaller than or equal n
	function getArrayFromMToN(m,n){
		var arr = [];
		if(typeof m == 'number' && typeof n == 'number' && m <= n){
			for(var i=m; i<=n ; i++){
				arr.push({num:i});
			}
			return arr;
		}
		return arr;
	};
})(jQuery);