if (typeof(Uno) == typeof(undefined)) {
   var Uno = {};
}

if (!Uno.Controller) {
   Uno.loadScript('js/uno/controller.js');
}

Uno.Forms = {
   doSubmission: function(submitButton) {
      var form = $(submitButton).parents('form');
      var method = $(form).attr('method');
      var action = $(form).attr('action').substring(1);
      var formData = $.parseQuery($(form).serialize());
      Uno.Controller.forward(action, formData);
   }      
};