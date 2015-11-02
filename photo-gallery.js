
(function(){
	"use strict";

	var clicked = {};

	function showModal(){

			var src = $(this).attr('src');
			var img = '<img src="' + src + '" class="img-responsive"/>';
			var index = $(this).parent('li').attr('data-index');

			clicked.prevImg = parseInt(index) - parseInt(1);
			clicked.nextImg = parseInt(index) + parseInt(1);

			var html = '';
			html += img;
			html += '<div style="height:25px;clear:both;display:block;">';			
			html += '<a class="controls next" href="'+ (clicked.nextImg) + '">next &raquo;</a>';
			html += '<a class="controls previous" href="' + (clicked.prevImg) + '">&laquo; prev</a>';
			html += '</div>';

			$('#myModal').modal();
			$('#myModal').on('shown.bs.modal', function(){
					$('#myModal .modal-body').html(html);
					showHideControls();
			})
			$('#myModal').on('hidden.bs.modal', function(){
					$('#myModal .modal-body').html('');
			});
	}

	function nextPrevHandler(){

			var index = $(this).attr('href');
			var src = $('li[data-index="'+index+'"] img').attr('src');

			$('.modal-body img').attr('src', src);

			clicked.prevImg = parseInt(index) - 1;
			clicked.nextImg = parseInt(clicked.prevImg) + 2;

			if($(this).hasClass('previous')){
				$(this).attr('href', clicked.prevImg);
				$('a.next').attr('href', clicked.nextImg);
			}else{
				$(this).attr('href', clicked.nextImg);
				$('a.previous').attr('href', clicked.prevImg);
			}

		showHideControls();

		return false;

	}

	function showHideControls(){

		var total = ($('li').not('.clearfix').length);

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



	$(document).ready(function(){
		$(this).on('click', 'a.controls', nextPrevHandler);
		$('li').not('.clearfix').each(function(i){
					$(this).attr('data-index',i);
					var img = $(this).find('img');
					img.on('click',showModal);
		});
	}) //end doc ready


})();
