$(function() {
   var rootContext = '/songs';
   var controller = new Uno.Controller(rootContext);
   var viewManager = new Uno.ViewManager(rootContext);

   controller.bind('/index', function(data) {
      var viewData = {
         title: 'Search songs',
         songs: Song.findAll(),
         filter: {}
      };

      viewManager.loadTemplate('index', viewData);
   });

   controller.bind('/show', function(data) {
      var song = null;

      if (data.params) {
         var viewData = {
            title: 'Show song',
            song: Song.findById(data.params.id)
         };

         viewManager.loadTemplate('show', viewData);
      } else {
         controller.throwError(400);
      }
   });

   controller.bind('/delete', function(data) {
      if (data.params) {
         var song = Song.findById(data.params.id);
         song.remove();
         controller.redirect('/index');
      } else {
         controller.throwError(400);
      }
   });

   controller.bind('/new', function(data) {
      var viewData = {
         title: 'New song',
         song: (data.params && data.params.song) ? data.params.song : {}
      };

      viewManager.loadTemplate('maitenance', viewData);
   });

   controller.bind('/edit', function(data) {
      var song;

      if (data.params && data.params.id) {
         song = Song.findById(data.params.id);
      } else if (data.song) {
         song = data.params.song;
      }

      if (song) {
         var viewData = {
            title: 'Edit song',
            song: song
         };

         viewManager.loadTemplate('maitenance', viewData);
      } else {
         controller.throwError(400);
      }
   });

   controller.bind('/save', function(data) {
      if (data.params) {
         song = new Song(data.params);

         if (song.save()) {
            controller.redirect('/index');
         } else {
            var previousState = (song.id) ? '/edit' : '/new';
            controller.forward(previousState, {
               song: song
            });
         }
      } else {
         controller.throwError(400);
      }
   });

   controller.bind('/search', function(data) {
      if (data.params) {
         var filter = {
            id: (data.params.id) ? data.params.id : undefined,
            title: (data.params.title) ? data.params.title : undefined
         };

         var viewData = {
            title: 'Search songs',
            songs: Song.findWithFilter(filter),
            filter: filter
         };

         viewManager.loadTemplate('index', viewData);
      } else {
         controller.throwError(400);
      }
   });
});