var Song = function(data) {
   var self = this;

   if (data) {
      if ($.type(data) == $.type('string')) {
         data = $.parseJSON(data);
      }

      self.id = data.id;
      self.title = data.title;
   }

   self.errors = {};

   self.stringify = function() {
      return JSON.encode(self);
   };

   self.save = function() {
      if (validate()) {
         var reqData = {
            url: 'songs/save.json',
            type: 'POST',
            async: false,
            data: {
               entityData: self.stringify()
            }
         };

         var response = $.parseJSON($.ajax(reqData).responseText);
         self.id = response.id;
         return true;
      } else {
         return false;
      }
   };

   self.remove = function() {
      var reqData = {
         url: 'songs/delete.json',
         type: 'POST',
         async: false,
         data: {
            entityData: self.stringify()
         }
      };

      $.ajax(reqData);
   };

   var validate = function() {
      self.errors = {};

      if (!self.title) {
         self.errors['title'] = 'The title must be informed.';
      }

      return $.isEmptyObject(self.errors);
   };
};

Song.parseJSONArray = function(jsonArray) {
   var array = $.parseJSON(jsonArray);
   var ret = [];

   $(array.songs).each(function() {
      ret.push(new Song(this));
   });

   return ret;
};

Song.findAll = function() {
   var reqData = {
      url: 'songs/index.json',
      async: false
   };

   var jsonArray = $.ajax(reqData).responseText;

   return Song.parseJSONArray(jsonArray);
};

Song.findById = function(id) {
   var reqData = {
      url: 'songs/show.json',
      async: false,
      data: {
         id: id
      }
   };

   var jsonObject = $.ajax(reqData).responseText;

   return new Song(jsonObject);
};

Song.findWithFilter = function(filter) {
   var reqData = {
      url: 'songs/search.json',
      async: false,
      data: {
         filter: JSON.encode(filter)
      }
   };
   
   var jsonArray = $.ajax(reqData).responseText;
   
   return Song.parseJSONArray(jsonArray);
};