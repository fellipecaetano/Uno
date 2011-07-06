var Uno = {};

Uno.Controller = function(root) {
    var self = this;
    this.root = root;
    
    this.getState = function(state) {
        return root + state;
    };
    
    this.bind = function(state, handler) {
        $.History.bind(self.getState(state), handler);
    };
    
    this.redirect = function(state) {
        $.History.go(self.getState(state));
    };
    
    this.forward = function(state, params) {
        Uno.Controller.forward(self.getState(state), params);
    };
};

Uno.Controller.findHandler = function(state) {
    var handler = $.History.handlers.specific[state];
    return (handler) ? handler[0] : handler;
};

Uno.Controller.throwError = function(status) {
    var viewManager = new Uno.ViewManager('/error');
    
    switch (status) {
    case 400:
        viewManager.loadTemplate('400', {});
        break;    
    
    case 404:
        viewManager.loadTemplate('404', {});
        break;
        
    case 500:
        viewManager.loadTemplate('500', {});
        break;
    }    
};

Uno.Controller.forward = function(state, params) {
    var handler = Uno.Controller.findHandler(state);
    
    if (handler) {
        var data = {
           state: state,
           params: params
        };
        
        handler(data);
    }    
};

Uno.ViewManager = function(viewContext) {
    var self = this;
    self.rootFolder = 'views';
    self.fileSuffix = '.ejs';
    self.contentPlaceholder = '#main';
    self.viewContext = viewContext;
    
    self.loadTemplate = function(name, data) {
        var path = buildViewPath(name);
        $(self.contentPlaceholder).html(path, data);
        
        if (data.title) {
            self.changePageTitle(data.title);
        }
    };
    
    self.changePageTitle = function(title) {
        $('head title').html(title);
    };
    
    function buildViewPath(name) {
        return self.rootFolder + self.viewContext + '/' + name + self.fileSuffix;
    };
};

Uno.initialize = function() {
    $.History.bind(function(state) {
        var match = state.match(/\?.+$/);
        var params = {};
        
        if (match) {
            var query = match[0];
            params = $.parseQuery(query);
            state = state.replace(query, '');
        }
        
        var handler = Uno.Controller.findHandler(state);
        
        if (handler) {
            var forwardData = {
               state: state,
               params: params
            };
            
            handler(forwardData);
        } else {
            Uno.Controller.throwError(404);
        }           
    });
    
    $(document).ajaxError(function(event, request) {
        Uno.Controller.throwError(request.status);
    });    
};

Uno.doSubmission = function(submitButton) {
    var form = $(submitButton).parents('form');
    var method = $(form).attr('method');
    var action = $(form).attr('action').substring(1);
    var formData = $.parseQuery($(form).serialize());
    Uno.Controller.forward(action, formData);
};

$(function() {
    Uno.initialize();
});