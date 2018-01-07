(function($) {
  "use strict";
  $.fn.bsPhotoGallery = function(options) {

      var settings = $.extend({}, $.fn.bsPhotoGallery.defaults, options);
      var id = generateId();
      var classesString = settings.classes;
      var classesArray = classesString.split(" ");
      var clicked = {};

      function getCurrentUl(){
        return 'ul[data-bsp-ul-id="'+clicked.ulId+'"][data-bsp-ul-index="'+clicked.ulIndex+'"]';
      }
      function generateId() {
        var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var ID_LENGTH = 4;
        var out = '';
        for (var i = 0; i < ID_LENGTH; i++) {
          out += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
        }
        return 'bsp-'+out;
      }
      function createModalWrap(){

        if($('#bsPhotoGalleryModal').length !== 0){
          return false;
        }

        var modal = '';
        modal += '<div class="modal fade" id="bsPhotoGalleryModal" tabindex="-1" role="dialog"';
        modal += 'aria-labelledby="myModalLabel" aria-hidden="true">';
        modal += '<div class="modal-dialog modal-lg"><div class="modal-content">';
        modal += '<div class="modal-body"></div></div></div></div>';
        $('body').append(modal);

      }
      function showHideControls(){
    		var total = $(getCurrentUl()+' li[data-bsp-li-index]').length;

    		if(total === clicked.nextImg){
    			$('a.next').hide();
    		}else{
    			$('a.next').show()
    		}
    		if(clicked.prevImg === -1){
    			$('a.previous').hide();
    		}else{
    			$('a.previous').show()
    		}
    	}
      function showModal(){

          var bImgString = $(this).find('.bspImgWrapper')[0].style.backgroundImage;
          var src = bImgString.replace(/url\(\"/g,'').replace(/\"\)/g,'');        
          
          var index = $(this).attr('data-bsp-li-index');

          var ulIndex = $(this).parent('ul').attr('data-bsp-ul-index');
          var ulId = $(this).parent('ul').attr('data-bsp-ul-id');
          var theImg = $(this).find('img');
          var pText = $(this).find('p').html();        
          var modalText = typeof pText !== 'undefined' ? pText : 'undefined';
          var alt =  typeof theImg.attr('alt') == 'string' ? theImg.attr('alt') : null;
          
          clicked.img = src;
          clicked.prevImg = parseInt(index) - parseInt(1);
      		clicked.nextImg = parseInt(index) + parseInt(1);
          clicked.ulIndex = ulIndex;
          clicked.ulId = ulId;


          $('#bsPhotoGalleryModal').modal();

          var html = '';
          var img = '<img src="' + clicked.img + '" class="img-responsive"/>';

          html += img;
          html += '<span class="bsp-close"><img src="images/close.svg"></span>';
          html += '<div class="bsp-text-container">';
          
          if(alt !== null){
            html += '<h6>'+alt+'</h6>'
          }
          if(typeof pText !== 'undefined'){
            html += '<p class="pText">'+pText+'</p>'
          }        
          html += '</div>';
        
			    if(settings.showControl){
            html += '<a class="bsp-controls next" data-bsp-id="'+clicked.ulId+'" href="'+ (clicked.nextImg) + '">';
            html += '<img src="images/chevron-right.svg"/></a>';
            html += '<a class="bsp-controls previous" data-bsp-id="'+clicked.ulId+'" href="' + (clicked.prevImg) + '">'; 
            html += '<img src="images/chevron-left.svg"/></a></a>';
          }
          $('#bsPhotoGalleryModal .modal-body').html(html);
          $('.bsp-close').on('click', closeModal);
          showHideControls();
      }

      function closeModal(){
        $('#bsPhotoGalleryModal').modal('hide');
      }

      function nextPrevHandler(){

          var ul = $(getCurrentUl());
          var index = $(this).attr('href');
          var src = ul.find('li[data-bsp-li-index="'+index+'"] img').attr('src');          
          var pText = ul.find('li[data-bsp-li-index="'+index+'"] p').html();             
          var modalText = typeof pText !== 'undefined' ? pText : 'undefined';
          var theImg = ul.find('li[data-bsp-li-index="'+index+'"] img');
          var alt =  typeof theImg.attr('alt') == 'string' ? theImg.attr('alt') : null;
           
          $('#bsPhotoGalleryModal .modal-body img').attr('src', src);
          var txt = '';
          if(alt !== null){
            txt += '<h6>'+alt+'</h6>'
          }
          if(typeof pText !== 'undefined'){
            txt += '<p class="pText">'+pText+'</p>'
          }        
          
          $('.bsp-text-container').html(txt); 

          clicked.prevImg = parseInt(index) - 1;
          clicked.nextImg = parseInt(clicked.prevImg) + 2;

          if($(this).hasClass('previous')){
              $(this).attr('href', clicked.prevImg);
              $('a.next').attr('href', clicked.nextImg);
          }else{
              $(this).attr('href', clicked.nextImg);
              $('a.previous').attr('href', clicked.prevImg);
          }
          // console.log(clicked);
        showHideControls();
        return false;
      }
      function clearModalContent(){
        $('#bsPhotoGalleryModal .modal-body').html('');
        clicked = {};
      }

      this.each(function(i){
        //ul
        var items = $(this).find('li');
        $(this).attr('data-bsp-ul-id', id);
        $(this).attr('data-bsp-ul-index', i);

        items.each(function(x){
          var theImg = $(this).find('img');
          var theText = $(this).find('p');   
          var src = theImg.attr('src');
       
          $(this).addClass(classesString);
          $(this).attr('data-bsp-li-index', x);
       
          
          theImg.wrap('<div class="bspImgWrapper" style="background:url(\''+src+'\');"></div>');
          theText.addClass('bspText');

          if(settings.shortText === true){
            theText.addClass('bspShortText');
          }

          theImg.remove();
         
          if(settings.hasModal === true){
            $(this).addClass('bspHasModal');
            $(this).on('click', showModal);
          }
        });
      })

      if(settings.hasModal === true){
        //this is for the next / previous buttons
        $(document).on('click', 'a.bsp-controls[data-bsp-id="'+id+'"]', nextPrevHandler);
        $(document).on('hidden.bs.modal', '#bsPhotoGalleryModal', clearModalContent);
        //start init methods
        createModalWrap();
      }

      return this;
  };
  /*defaults*/
  $.fn.bsPhotoGallery.defaults = {
    'classes' : 'col-xl-2 col-lg-2 col-md-2 col-sm-4',
    'showControl' : true,
    'hasModal' : true, 
    'shortText' : true
  }


}(jQuery));
