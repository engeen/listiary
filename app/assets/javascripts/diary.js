/*# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
*/

function nearBottomOfPage() {
  return $(window).scrollTop() > $(document).height() - $(window).height() - 50;
}





function nearTopOfPage() {
  return $(window).scrollTop() == 0;
}





function rebindlis(elem) {
			elem.children('li').unbind('click');
			elem.children('li').on('click', function(evt) {
				var x = evt.pageX - $(this).offset().left;
				var y = evt.pageY - $(this).offset().top;
	//			var bodyOffsets = $('body').getBoundingClientRect();
				if ((x >= -17) && (x<=-8) && (y <= 19) && (y >= 2)) {
					//  if ($(this).hasClass("finished")) {
					//  	$(this).removeClass("finished");
					//  } else 
					// {
					//  	$(this).addClass("finished");
					// 
					// }
					var li_html = $(this).html();
					var thisid = Math.floor((Math.random() * 100000) + 1);
					$(this).attr('id', thisid);
					$('#lidrop > ul > li > a.compl').unbind('click');
					$('#lidrop > ul > li > a.compl').on('click', function () {
						 if ($('#'+thisid).hasClass("finished")) {
						 	$('#'+thisid).removeClass("finished");
						 } else 
						{
						 	$('#'+thisid).addClass("finished");
						}
						parent = $('#'+thisid).parents('.tasks');
						parent.trigger('blur');
//						alert('test');
						$('#'+thisid).removeAttr('id');
					 	$('#lidrop > ul').css('display', 'none');
						return false;
					});
					
					
					$('#lidrop > ul > li > a.addcontext').unbind('click');
					$('#lidrop > ul > li > a.addcontext').on('click', function() {
						$.ajax({
			        url: '/tasks',
							data: { task: { content: '<li>'+li_html+'</li>', list_id: elem.parent('td').attr('data-list'), target: elem.parent('td').attr('data-date'), context_id: $(this).attr('data-context') } },
			        type: 'post',
			        dataType: 'script',
			        success: function() {
								parent = $('#'+thisid).parents('.tasks');
								$('#'+thisid).remove();
								parent.trigger('blur');
			        }
			      });
						return false;

					});



					
					$('#lidrop > ul > li > a.newcontext').unbind('click');
					$('#lidrop > ul > li > a.newcontext').on('click', function() {
						$.ajax({
			        url: '/tasks',
							data: { task: { content: '<li></li>', list_id: elem.parent('td').attr('data-list'), target: elem.parent('td').attr('data-date') } },
			        type: 'post',
			        dataType: 'script',
			        success: function() {
			        }
			      });
						return false;

					});
					
					
					$('#lidrop > ul').css('display','block');
					$('#lidrop > ul').css('left', $(this).offset().left - 40 );
					$('#lidrop > ul').css('top',  $(this).offset().top - 60 );
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
				if ((x >= -17) && (x<=-8) && (y <= 19) && (y >= 2)) {
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



function rebind_context_headers() {
	
//	alert('test');
	$('.context_header').unbind('mouseenter');
	$('.context_header').unbind('mouseleave');
	
	$('.context_header').on('mouseenter', function() {
		$(this).children('.icon-remove').show();
	});
	$('.context_header').on('mouseleave', function() {
		$(this).children('.icon-remove').hide();
	});	
	
}


$(document).ready(function() {
  /* Activating Best In Place */
  jQuery(".best_in_place").best_in_place();
/*	bindleavesenters(); */
/*	binddblclick(); */
	
// 	$('.best_in_place[data-context-id]').bind("ajax:success", function(){ rebind_context_headers(); });


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
	
	
	
	
	rebind_context_headers();
	initEditing();
	
	$('.tasks').each(function () { rebindlis($(this)); });
 $('#lidrop').on('mouseleave', function(){
 	$('#lidrop > ul').css('display', 'none');
 });
	
	
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
    //alert($(window).scrollTop());
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