var Controller = function(root) {
    var self = this;
    this.root = root;
    
    this.getState = function(state) {
        return root + state;
    };
    
    this.bind = function(state, handler) {
        $.History.bind(self.getState(state), handler);
    };
};

var ViewManager = function(viewContext) {
    var rootFolder = 'views';
    var fileSuffix = '.ejs';
    var contentPlaceholder = '#main';
    var self = this;
    self.viewContext = viewContext;
    
    self.loadTemplate = function(name, data) {
        var path = buildViewPath(self.viewContext, name);
        $(contentPlaceholder).html(path, data);
    };
    
    function buildViewPath(context, name) {
        return rootFolder + context + '/' + name + fileSuffix;
    };
};

$(function() {
    $.History.bind(function(state) {
        var match = state.match(/\?.+$/);
        var params = {};
        
        if (match) {
            var query = match[0];
            params = $.parseQuery(query);
            state = state.replace(query, '');
        }
        
        var bindingHandlers = $.History.handlers.specific[state];
        
        if (bindingHandlers) {
            var forwardData = {
               state: state,
               params: params
            };
            
            bindingHandlers[0](forwardData);
        }
    });
});