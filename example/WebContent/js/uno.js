var Uno = {};

Uno.loadScript = function(url, absolutely) {
   var folder = (absolutely) ? '' : 'js/';
   
   var reqData = {
      url: folder + url,
      dataType: 'script',
      async: false
   };

   $.ajax(reqData);
};

(function() {
   var loadAllUnoDependencies = function() {
      Uno.loadScript('tools/jquerymx.js');
      Uno.loadScript('tools/history.js');
      Uno.loadScript('tools/json.js');
      Uno.loadScript('tools/queryparser.js');
      Uno.loadScript('uno/controller.js');
      Uno.loadScript('uno/view_manager.js');
      Uno.loadScript('uno/forms.js');
   };

   var initUno = function() {
      loadAllUnoDependencies();

      $.History.bind(function(state) {
         Uno.Controller.forward(state);
      });
      
      $(document).ajaxError(function(event, request) {
         Uno.Controller.throwError(request.status);
      });
   };

   $(function() {
      initUno();
   });
})();
