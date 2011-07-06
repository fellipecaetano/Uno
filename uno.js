var Uno = {};

Uno.loadScript = function(url) {
   var reqData = {
      url: url,
      dataType: 'script',
      async: false
   };
   
   $.ajax(reqData);
};

(function() {
   var loadAllUnoDependencies = function() {
      Uno.loadScript('js/tools/jquerymx.js');
      Uno.loadScript('js/tools/history.js');
      Uno.loadScript('js/tools/json.js');
      Uno.loadScript('js/tools/queryparser.js');
      Uno.loadScript('js/uno/controller.js');
      Uno.loadScript('js/uno/view_manager.js');
      Uno.loadScript('js/uno/forms.js');      
   };
   
   var initUno = function() {
      loadAllUnoDependencies();
      
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

   $(function() {
       initUno();
   });   
})();
