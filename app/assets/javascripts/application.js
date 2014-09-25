// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require best_in_place
//= require jquery.ui.all
//= require jquery.turbolinks
//= require jquery_ujs
//= require twitter/bootstrap
//= require bootstrap
//= require turbolinks
//= require_tree .


function nearBottomOfPage() {
  return $(window).scrollTop() > $(document).height() - $(window).height() - 50;
}

function nearTopOfPage() {
  return $(window).scrollTop() < 0;
}





function rebindlis(elem) {
			elem.children('li').unbind('click');
			elem.children('li').on('click', function(evt) {
				var x = evt.pageX - $(this).offset().left;
				var y = evt.pageY - $(this).offset().top;
	//			var bodyOffsets = $('body').getBoundingClientRect();
				if ((x >= -15) && (x<=-11) && (y <= 15) && (y >= 5)) {
					 if ($(this).hasClass("finished")) {
					 	$(this).removeClass("finished");
					 } else 
					{
					 	$(this).addClass("finished");

					}

	/*				$('#lidrop > ul').css('display','block');
					$('#lidrop > ul').css('left', $(this).offset().left - 40 );
					$('#lidrop > ul').css('top',  $(this).offset().top - 60 );*/
				}

			});

			elem.children('li').unbind('mouseleave');
			elem.children('li').on('mouseleave', function(evt) {
				$(this).removeClass('pointer');
			});


			elem.children('li').unbind('mousemove');
			elem.children('li').on('mousemove', function(evt) {
				var x = evt.pageX - $(this).offset().left;
				var y = evt.pageY - $(this).offset().top;

				// $(this).text('x:'+x+',y:'+y);
				if ((x >= -15) && (x<=-11) && (y <= 15) && (y >= 5)) {
					$(this).addClass('pointer');
				} else {
					$(this).removeClass('pointer');

				}
			});

}



function initEditing() {
	
	
	//keyup prevented the user from deleting the bullet (by adding one back right after delete), but didn't add in <li>'s on empty <ul>s, thus keydown added to check
	$('.tasks').unbind('keyup');
	$('.tasks').unbind('keydown');
	
	$('.tasks').unbind('blur');
	$('.tasks').on('blur', function() {
					$.ajax({
		        url: '/tasks/' + $(this).attr('data-id'),
						data: { task: { content: $(this).html() } },
		        type: 'put',
		        dataType: 'json',
		        success: function() {
		        }
		      });
		
	});
	
	
	
	$('.tasks').on('keyup keydown', function() {
		//alert('binding');
		rebindlis($(this));
	  var $this = $(this);
	    if (! $this.html()) {
	        var $li = $('<li></li>');

	        var sel = window.getSelection();

	       var range = sel.getRangeAt(0);

	        range.collapse(false);
	        range.insertNode($li.get(0));
	        range = range.cloneRange();
	        range.selectNodeContents($li.get(0));
	        range.collapse(false);
	        sel.removeAllRanges();
	        sel.addRange(range);

	    } else {
	        //are there any tags that AREN'T LIs?
	        //this should only occur on a paste
	        var $nonLI = $this.find(':not(li, br)');

	        if ($nonLI.length) {
	            $this.contents().replaceWith(function() {
	    //we create a fake div, add the text, then get the html in order to strip out html code. we then clean up a bit by replacing nbsp's with real spaces
	return '<li>' + $('<div />').text($(this).text()).html().replace(/&nbsp;/g, ' ') + '</li>';
	            }); 
	            //we could make this better by putting the caret at the end of the last LI, or something similar
	        }                   
	    }


	});	

}


$(document).ready(function() {
  /* Activating Best In Place */
  jQuery(".best_in_place").best_in_place();
/*	bindleavesenters(); */
/*	binddblclick(); */


	$('#dates_header > thead > tr > th').mouseenter(function() {
		$(this).children('.icon-remove').show();
		$(this).children('.icon-arrow-left').show();
		$(this).children('.icon-arrow-right').show();
	});
	$('#dates_header > thead > tr > th').mouseleave(function() {
		$(this).children('.icon-remove').hide();
		$(this).children('.icon-arrow-left').hide();
		$(this).children('.icon-arrow-right').hide();
	});
	
	

	initEditing();
	$('.tasks').each(function () { rebindlis($(this)); });

	
	
	// $('#lidrop').on('mouseleave', function(){
	// 	$('#lidrop > ul').css('display', 'none');
	// });
	
	
	// 		});
	
// 	$('.tasks').blur(function(){
// 	//	alert('guest');
// 		$('.tasks > ul > li').bind('mousemove', function() {
// //			$(this).css('background-color', 
// //				'rgb('+Math.floor((Math.random() * 255) + 1)+','+Math.floor((Math.random() * 10) + 1) + ',' +Math.floor((Math.random() * 10) + 1) + ')'); 
// //			$(this).text('');
// 		});
// 
// 	});
	



});

var loading = false,
finish = false;


$(document).ready(function(){

	$(window).scroll(function(){
   if (loading) {
      return;
    }

   if(nearTopOfPage() && !finish) {
//			alert('test top');
			loading = true;
			$.ajax({
        url: '/dates/?first=' + $('#dates').attr('first'),
        type: 'get',
        dataType: 'script',
        success: function() {
          loading=false;
//					binddblclick();
//					jQuery(".best_in_place").best_in_place();
//				  bindleavesenters();
					
        }
      });
		}


   if(nearBottomOfPage() && !finish) {
//			alert('test bottom');
			loading = true;
			$.ajax({
        url: '/dates/?last=' + $('#dates').attr('last'),
        type: 'get',
        dataType: 'script',
        success: function() {
          loading=false;
//					binddblclick();
//					jQuery(".best_in_place").best_in_place();
//					bindleavesenters();
					
        }
      });


		}
	});
	
});