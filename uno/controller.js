if (typeof (Uno) == typeof (undefined)) {
   var Uno = {};
}

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
   
   this.throwError = function(status) {
      Uno.Controller.throwError(status);
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