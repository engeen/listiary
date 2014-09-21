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


function binddblclick() {
 	$('#dates > tbody > tr > td').off('dblclick')
	$('#dates > tbody > tr > td').bind('dblclick', function(e) {
		e.preventDefault();
		$.ajax({
      url: '/tasks.js',
			data : { task: { target: $(this).attr('data-date'), list_id: $(this).attr('data-list')} },
      type: 'post',
      dataType: 'script',
      success: function() {
      }
    });
	});

}


function bindleavesenters() {
	$('div.task').mouseenter(function() {
		$(this).children('.remove').show();
		$(this).children('.complete').show();
//		$(this).children('.remove').css('position', 'absolute');
//		$(this).children('.complete').css('position', 'absolute');
	});

	$('div.task').mouseleave(function() {
		$(this).children('.remove').hide();
		$(this).children('.complete').hide();
	});
}

$(document).ready(function() {
  /* Activating Best In Place */
  jQuery(".best_in_place").best_in_place();
	bindleavesenters();
	binddblclick();


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
					binddblclick();
					jQuery(".best_in_place").best_in_place();
				  bindleavesenters();
					
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
					binddblclick();
					jQuery(".best_in_place").best_in_place();
					bindleavesenters();
					
        }
      });


		}
	});
	
});