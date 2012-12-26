var app = app || {};
(function($) {
	
	app.render = function(templateName,data){
		data = data || {};
		return $(Handlebars.compile($(templateName).html())(data));
	}
	
	app.invokeRemote = function(remoteMethod){
		var dfd = $.Deferred();
		// var paramsArray = [];
		// var action = "CustomControl." + remoteMethod;
		// paramsArray.push(action);
// 		
		// for(var i = 1; i < arguments.length; i++){
			// paramsArray.push(arguments[i]);
		// }
//         
		// var resultFunc = function(result, event){
            	// dfd.resolve(result);
        // };
		// paramsArray.push(resultFunc);
// 		
		// paramsArray.push({escape: true});
// 		
		// //do call server data
		// console.log(paramsArray);
		// Visualforce.remoting.Manager.invokeAction.apply(Visualforce.remoting.Manager,paramsArray);
        return dfd.promise();
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
	
	/**
	 * Do a ajax post for the action and resolve with the JSON object (which is the WebActionHandler action name) and the data.
	 * 
	 * @param data {FormData} today, assume FormData
	 * 
	 * @return a Deferred 
	 */
	app.post = function(action,formData){
		var dfd = $.Deferred();
		
		var xhr = new XMLHttpRequest();
		xhr.open('POST', action, true);
		
		xhr.onload = function(e) {
			var jsonResult = JSON.parse(xhr.response);
			dfd.resolve(jsonResult);
		};
		
		xhr.onerror = function(e) {
			dfd.fail("app.post failed: " + e);
		}
		
		xhr.send(formData);  // multipart/form-data
		
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