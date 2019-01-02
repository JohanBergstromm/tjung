(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['modals/delete'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "			<h6 class=\"mb-4\"><u>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.modalWarning : stack1), depth0))
    + "</u></h6>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"modal-wrap\">\n	<div class=\"modal-block modal--delete\">\n		<div class=\"header text-center\">\n			<div>\n				<span class=\"icon-report\"></span>\n			</div>\n			<h4>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.modalHeader : stack1), depth0))
    + "</h4>\n		</div>\n		<div class=\"body\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.modalWarning : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			<div class=\"d-flex justify-content-between\">\n				<button class=\"remove text-uppercase py-lg-2 px-lg-4 mr-2\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.removeButton : stack1), depth0))
    + "</button>\n				<button class=\"close\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.closeButton : stack1), depth0))
    + "</button>\n			</div>\n		</div>\n	</div>\n</div>";
},"useData":true});
templates['register/user-data'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "<p class=\"mb-2\">Type of user: Admin</p>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "<p class=\"mb-2\">Type of user: User</p>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "<p class=\"mb-2\">Type of user: Mom</p>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "<p class=\"mb-2\">Type of user: Ryberg</p>\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "<p class=\"mb-2\">Type of user: Demo</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return "<h2 class=\"mb-5\">User created</h2>\n<p class=\"mb-2\">Name: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.first_name : stack1), depth0))
    + " "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.last_name : stack1), depth0))
    + "</p>\n<p class=\"mb-2\">Email: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.email : stack1), depth0))
    + "</p>\n"
    + ((stack1 = helpers["if"].call(alias3,((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.permission : stack1)) != null ? stack1.admin : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias3,((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.permission : stack1)) != null ? stack1.user : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias3,((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.permission : stack1)) != null ? stack1.mom : stack1),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias3,((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.permission : stack1)) != null ? stack1.ryberg : stack1),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias3,((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.permission : stack1)) != null ? stack1.demo : stack1),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
})();