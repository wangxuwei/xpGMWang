Handlebars.templates = Handlebars.templates || {};


// template --- tmpl-Groups ---
Handlebars.templates['tmpl-Groups'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"Groups\">\n    	<h2>Boxes</h2>\n    	<div>\n    	</div>\n    	<div class=\"dataTable\">\n	        <div class=\"tbody lists\">\n	        </div>\n	  </div>\n    </div>";}
);

// template --- tmpl-Groups-rowItem ---
Handlebars.templates['tmpl-Groups-rowItem'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n	     	<span class=\"btn btnEdit\" title=\"Edit\"><i title=\"Edit\" class=\"icon-pencil\"></i></span>\n	     	<span class=\"btn btn-danger btnDelete\"  title=\"Delete\"><i title=\"Delete\" class=\"icon-trash\"></i></span>\n	     	";}

  buffer += "<div class=\"trow\" data-entity=\"";
  foundHelper = helpers.type;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.type; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-entity-id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" >\n	     <div class=\"tcell item\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>\n	     <div class=\"tcell\">\n	     	";
  stack1 = depth0.show;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	     </div>\n     </div>";
  return buffer;}
);

// template --- tmpl-MailInfo ---
Handlebars.templates['tmpl-MailInfo'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<div class=\"MailInfo modal\">\n		<div class=\"MailInfo-header modal-header\">\n			<div class=\"close btnClose\"><i class=\"icon-remove\"></i></div>\n			<h3>";
  foundHelper = helpers.subject;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.subject; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</h3>\n		</div>\n		<div class=\"MailInfo-content modal-body\">\n			<div class=\"form-horizontal\">\n				<div class=\"control-group\">\n					<div class=\"control-label\">Subject:</div>\n					<div class=\"controls\">\n						";
  foundHelper = helpers.subject;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.subject; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\n					</div>\n				</div>\n				<div class=\"control-group\">\n					<div class=\"control-label\">From:</div>\n					<div class=\"controls\">\n						";
  stack1 = depth0.from;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.address;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\n					</div>\n				</div>\n				<div class=\"control-group\">\n					<div class=\"control-label\">Date:</div>\n					<div class=\"controls\">\n						";
  foundHelper = helpers.date;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.date; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\n					</div>\n				</div>\n				<div class=\"control-group\">\n					<div class=\"control-label\">Content:</div>\n					<div class=\"controls\">\n						";
  stack1 = depth0.content;
  foundHelper = helpers.html;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:{}}) : helperMissing.call(depth0, "html", stack1, {hash:{}});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					</div>\n				</div>\n			</div>\n		</div>\n		<div class=\"MailInfo-footer modal-footer\">\n			<div class=\"btn btnClose\">Close</div>\n		</div>\n	</div>";
  return buffer;}
);

// template --- tmpl-Mails ---
Handlebars.templates['tmpl-Mails'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"Mails\">\n    	<h2>Mails</h2>\n    	<div>\n    		<span class=\"btn btnAdd\"><i class=\"icon-plus\"></i>New Mail</span>\n    	</div>\n    	<div class=\"dataTable\">\n	        <div class=\"thead\">\n	          <div class=\"trow\">\n	          	<div class=\"tcell\">Index</div>\n	          	<div class=\"tcell\">Subject</div>\n	          	<div class=\"tcell\">From</div>\n	          	<div class=\"tcell\">Date</div>\n	          	<div class=\"tcell\">Action</div>\n	          </div>\n	        </div>\n	        <div class=\"tbody lists\">\n	        </div>\n	        \n	        <div class=\"pagesContent\">\n	        </div>\n	  </div>\n    </div>";}
);

// template --- tmpl-Mails-rowItem ---
Handlebars.templates['tmpl-Mails-rowItem'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"trow\" data-entity=\"";
  foundHelper = helpers.type;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.type; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-entity-id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">\n	     <div class=\"tcell\">";
  foundHelper = helpers.index;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.index; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>\n	     <div class=\"tcell\">";
  foundHelper = helpers.subject;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.subject; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>\n	     <div class=\"tcell\">";
  stack1 = depth0.from;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.address;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</div>\n	     <div class=\"tcell\">";
  foundHelper = helpers.date;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.date; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>\n	     <div class=\"tcell\">\n	     	<span class=\"btn btn-primary btnView\"  title=\"View mail\">View</span>\n	     	<span class=\"btn btnReply\"  title=\"View mail\">Reply</span>\n	     	<span class=\"btn btn-danger btnDelete\"  title=\"Delete\"><i title=\"Delete\" class=\"icon-trash\"></i></span>\n	     </div>\n     </div>";
  return buffer;}
);

// template --- tmpl-MailSend ---
Handlebars.templates['tmpl-MailSend'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"MailSend modal\">\n		<div class=\"MailSend-header modal-header\">\n			<div class=\"close btnClose\"><i class=\"icon-remove\"></i></div>\n			<h3>New Mail</h3>\n		</div>\n		<div class=\"MailSend-content modal-body\">\n			<div class=\"form-horizontal\">\n				<div class=\"control-group\">\n					<div class=\"control-label\">Subject:</div>\n					<div class=\"controls\">\n						<input type='text' name=\"subject\" value=\"";
  foundHelper = helpers.subject;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.subject; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" />\n					</div>\n				</div>\n				<div class=\"control-group\">\n					<div class=\"control-label\">To:</div>\n					<div class=\"controls\">\n						<input type='text' name=\"to\" value=\"";
  stack1 = depth0.to;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.address;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" />\n					</div>\n				</div>\n				<div class=\"control-group\">\n					<div class=\"control-label\">Content:</div>\n					<div class=\"controls\">\n						<textarea name=\"content\">";
  foundHelper = helpers.content;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.content; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</textarea>\n					</div>\n				</div>\n			</div>\n		</div>\n		<div class=\"MailSend-footer modal-footer\">\n			<div class=\"btn btn-primary btnCreate\">Send</div>\n			<div class=\"btn btnClose\">Close</div>\n		</div>\n	</div>";
  return buffer;}
);

// template --- tmpl-MainScreen ---
Handlebars.templates['tmpl-MainScreen'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"MainScreen\">\n	    <div class=\"MainScreen-header\">\n	    </div>\n	    <div class=\"MainScreen-main\">\n	    	<div class=\"mailsArea\"></div>\n	    	<div class=\"groupsArea\"></div>\n	    </div>\n    </div>";}
);

// template --- tmpl-PaginationView ---
Handlebars.templates['tmpl-PaginationView'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"PaginationView\">\n	</div>";}
);

// template --- tmpl-PaginationView-info ---
Handlebars.templates['tmpl-PaginationView-info'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n		<span class=\"goto\">\n			<span class=\"gotoBtn\">Go to:</span>\n			<input name=\"gotoPage\" type=\"text\" value=\"";
  foundHelper = helpers.pageNum;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.pageNum; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" />\n		</span>\n		";
  return buffer;}

function program3(depth0,data) {
  
  
  return "selected";}

function program5(depth0,data) {
  
  
  return "selected";}

function program7(depth0,data) {
  
  
  return "selected";}

function program9(depth0,data) {
  
  
  return "selected";}

function program11(depth0,data) {
  
  
  return "selected";}

function program13(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n			<span class=\"nums\">\n				<span class=\"prevStart ";
  stack1 = depth0.isFirst;
  stack1 = helpers.unless.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(14, program14, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">&lt;&lt;</span>\n				<span class=\"prev ";
  stack1 = depth0.isFirst;
  stack1 = helpers.unless.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(16, program16, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">&lt;</span>\n				";
  stack1 = depth0.pageNum;
  foundHelper = helpers.lt;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 3, {hash:{},inverse:self.program(27, program27, data),fn:self.program(18, program18, data)}) : helperMissing.call(depth0, "lt", stack1, 3, {hash:{},inverse:self.program(27, program27, data),fn:self.program(18, program18, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				<span class=\"next ";
  stack1 = depth0.isLast;
  stack1 = helpers.unless.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(41, program41, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">&gt;</span>\n				<span class=\"nextEnd ";
  stack1 = depth0.isLast;
  stack1 = helpers.unless.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(43, program43, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">&gt;&gt;</span>\n			</span>\n		";
  return buffer;}
function program14(depth0,data) {
  
  
  return "action";}

function program16(depth0,data) {
  
  
  return "action";}

function program18(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n					";
  stack1 = depth0.pageCount;
  foundHelper = helpers.gt;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 6, {hash:{},inverse:self.program(23, program23, data),fn:self.program(19, program19, data)}) : helperMissing.call(depth0, "gt", stack1, 6, {hash:{},inverse:self.program(23, program23, data),fn:self.program(19, program19, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				";
  return buffer;}
function program19(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " \n						";
  stack1 = depth0.getArrayFrom1To6;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program20, data, depth0)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					";
  return buffer;}
function program20(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n							<span class=\"pageNum ";
  stack1 = depth1.pageNum;
  stack2 = depth0.num;
  foundHelper = helpers.notEqual;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, stack1, {hash:{},inverse:self.noop,fn:self.program(21, program21, data)}) : helperMissing.call(depth0, "notEqual", stack2, stack1, {hash:{},inverse:self.noop,fn:self.program(21, program21, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-num='";
  stack1 = depth0.num;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "'>";
  stack1 = depth0.num;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</span> \n						";
  return buffer;}
function program21(depth0,data) {
  
  
  return "action";}

function program23(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n						";
  stack1 = depth0.getArrayFrom1ToPC;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program24, data, depth0)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					";
  return buffer;}
function program24(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n							<span class=\"pageNum ";
  stack1 = depth1.pageNum;
  stack2 = depth0.num;
  foundHelper = helpers.notEqual;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, stack1, {hash:{},inverse:self.noop,fn:self.program(25, program25, data)}) : helperMissing.call(depth0, "notEqual", stack2, stack1, {hash:{},inverse:self.noop,fn:self.program(25, program25, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-num='";
  stack1 = depth0.num;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "'>";
  stack1 = depth0.num;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</span> \n						";
  return buffer;}
function program25(depth0,data) {
  
  
  return "action";}

function program27(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n					";
  stack1 = depth0.pageNum;
  stack2 = depth0.pageCount;
  foundHelper = helpers.gtt;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, stack1, 3, {hash:{},inverse:self.program(32, program32, data),fn:self.program(28, program28, data)}) : helperMissing.call(depth0, "gtt", stack2, stack1, 3, {hash:{},inverse:self.program(32, program32, data),fn:self.program(28, program28, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				";
  return buffer;}
function program28(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n						";
  stack1 = depth0.getArrayFromPr2ToPa3;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program29, data, depth0)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					";
  return buffer;}
function program29(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n							<span class=\"pageNum ";
  stack1 = depth1.pageNum;
  stack2 = depth0.num;
  foundHelper = helpers.notEqual;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, stack1, {hash:{},inverse:self.noop,fn:self.program(30, program30, data)}) : helperMissing.call(depth0, "notEqual", stack2, stack1, {hash:{},inverse:self.noop,fn:self.program(30, program30, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-num='";
  stack1 = depth0.num;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "'>";
  stack1 = depth0.num;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</span> \n						";
  return buffer;}
function program30(depth0,data) {
  
  
  return "action";}

function program32(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n						";
  stack1 = depth0.pageCount;
  foundHelper = helpers.gt;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 6, {hash:{},inverse:self.program(37, program37, data),fn:self.program(33, program33, data)}) : helperMissing.call(depth0, "gt", stack1, 6, {hash:{},inverse:self.program(37, program37, data),fn:self.program(33, program33, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					";
  return buffer;}
function program33(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n							";
  stack1 = depth0.getArrayFromPCr6ToPC;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program34, data, depth0)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n						";
  return buffer;}
function program34(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n								<span class=\"pageNum ";
  stack1 = depth1.pageNum;
  stack2 = depth0.num;
  foundHelper = helpers.notEqual;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, stack1, {hash:{},inverse:self.noop,fn:self.program(35, program35, data)}) : helperMissing.call(depth0, "notEqual", stack2, stack1, {hash:{},inverse:self.noop,fn:self.program(35, program35, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-num='";
  stack1 = depth0.num;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "'>";
  stack1 = depth0.num;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</span> \n							";
  return buffer;}
function program35(depth0,data) {
  
  
  return "action";}

function program37(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n							";
  stack1 = depth0.getArrayFrom1ToPC;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program38, data, depth0)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n						";
  return buffer;}
function program38(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n								<span class=\"pageNum ";
  stack1 = depth1.pageNum;
  stack2 = depth0.num;
  foundHelper = helpers.notEqual;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, stack1, {hash:{},inverse:self.noop,fn:self.program(39, program39, data)}) : helperMissing.call(depth0, "notEqual", stack2, stack1, {hash:{},inverse:self.noop,fn:self.program(39, program39, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-num='";
  stack1 = depth0.num;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "'>";
  stack1 = depth0.num;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</span> \n							";
  return buffer;}
function program39(depth0,data) {
  
  
  return "action";}

function program41(depth0,data) {
  
  
  return "action";}

function program43(depth0,data) {
  
  
  return "action";}

  buffer += "<div class=\"paginationInfo\">\n		";
  stack1 = depth0.pageCount;
  foundHelper = helpers.gt;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}) : helperMissing.call(depth0, "gt", stack1, 1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		<span class=\"showRows\">\n			Show Rows\n			<select name=\"pageSize\">\n			<option ";
  stack1 = depth0.pageSize;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 15, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)}) : helperMissing.call(depth0, "equal", stack1, 15, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">15</option>\n			<option ";
  stack1 = depth0.pageSize;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 25, {hash:{},inverse:self.noop,fn:self.program(5, program5, data)}) : helperMissing.call(depth0, "equal", stack1, 25, {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">25</option>\n			<option ";
  stack1 = depth0.pageSize;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 50, {hash:{},inverse:self.noop,fn:self.program(7, program7, data)}) : helperMissing.call(depth0, "equal", stack1, 50, {hash:{},inverse:self.noop,fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">50</option>\n			<option ";
  stack1 = depth0.pageSize;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 100, {hash:{},inverse:self.noop,fn:self.program(9, program9, data)}) : helperMissing.call(depth0, "equal", stack1, 100, {hash:{},inverse:self.noop,fn:self.program(9, program9, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">100</option>\n			<option ";
  stack1 = depth0.pageSize;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 500, {hash:{},inverse:self.noop,fn:self.program(11, program11, data)}) : helperMissing.call(depth0, "equal", stack1, 500, {hash:{},inverse:self.noop,fn:self.program(11, program11, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">500</option>\n			</select>\n		</span>\n		<span class=\"info\">";
  foundHelper = helpers.startRows;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.startRows; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " - ";
  foundHelper = helpers.endRows;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.endRows; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " of ";
  foundHelper = helpers.sizeCount;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.sizeCount; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>\n		";
  stack1 = depth0.pageCount;
  foundHelper = helpers.gt;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:{},inverse:self.noop,fn:self.program(13, program13, data)}) : helperMissing.call(depth0, "gt", stack1, 1, {hash:{},inverse:self.noop,fn:self.program(13, program13, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</div>";
  return buffer;}
);

// template --- tmpl-Token ---
Handlebars.templates['tmpl-Token'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"Token modal\">\n		<div class=\"Token-header modal-header\">\n			<div class=\"close btnClose\"><i class=\"icon-remove\"></i></div>\n			<h3>Save Token with code</h3>\n		</div>\n		<div class=\"Token-content modal-body\">\n			<div class=\"form-horizontal\">\n				<div class=\"authContent\">\n					<div class=\"control-group\">\n						<div class=\"controls\">\n							Did not login. please click button to login\n						</div>\n					</div>\n					<div class=\"control-group\">\n						<div class=\"control-label\"></div>\n						<div class=\"controls\">\n							<div class=\"btn btnAuth\">Go to do auth</div>\n						</div>\n					</div>\n				</div>\n			</div>\n		</div>\n		<div class=\"Token-footer modal-footer\">\n		</div>\n	</div>";}
);
