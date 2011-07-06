if (typeof(Uno) == typeof(undefined)) {
   var Uno = {};
}

Uno.ViewManager = function(viewContext) {
   var self = this;
   self.rootFolder = 'views';
   self.fileSuffix = '.ejs';
   self.contentPlaceholder = '#main';
   self.viewContext = (viewContext) ? viewContext : '';
   
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