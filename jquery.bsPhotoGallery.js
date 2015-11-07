(function($) {
  "use strict";
  $.fn.bsPhotoGallery = function(options) {
    
      function createModalHTML(){
        var modal = '';
        modal += '<div class="modal fade" id="myModal" tabindex="-1" role="dialog"';
        modal += 'aria-labelledby="myModalLabel" aria-hidden="true">';
        modal += '<div class="modal-dialog"><div class="modal-content">';
        modal += '<div class="modal-body"></div></div></div></div>';
        $('body').append(modal);
      }


       createModalHTML();


      return this;
  };
}(jQuery));
