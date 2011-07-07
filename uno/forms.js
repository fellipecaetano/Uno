if (typeof (Uno) == typeof (undefined)) {
   var Uno = {};
}

if (!Uno.Controller) {
   Uno.loadScript('js/uno/controller.js');
}

Uno.Forms = {
   doSubmission: function(submitButton) {
      var form = $(submitButton).parents('form');
      var method = $(form).attr('method');
      method = (method) ? method : 'GET';
      var action = $(form).attr('action').substring(1);
      
      switch(method.toUpperCase()) {
      case 'GET':
         action = action + '?' + $(form).serialize();
         Uno.Controller.redirect(action);
         break;
         
      case 'POST':
         var formData = $.parseQuery($(form).serialize());
         Uno.Controller.forward(action, formData);
         break;
      }
   }
};