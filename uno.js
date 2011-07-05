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