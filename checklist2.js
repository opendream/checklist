$ = jQuery;
$(function() {

	$('#checklist_btu_add_parent').click( function(e) {
		 
		 $('#checklist_parent_add_space').load(Drupal.settings.basePath+'checklist2/add','',  function() { 
        $('#title').select();
		 //checklist_parent_alive();
         
      });
	});
	checklist_parent_alive();
  notification();

});

function checklist_parent_alive() {
   
	 $('#btu_add_parent_form').live("click" ,function() {
            //var title = $('#title').val();
            //var ctid = $('#ctid').val();
            //var cid = $('#cid').val();
            //var checked = $('#checked').attr('checked');
            var data = $('#checklist_add_form_id').serialize();
            var cid;
            if($("#cid").length){
               cid = $('#cid').val();
            }
            else {
               cid = '';
            }  
            //alert(cid);     
            //return false;
             $.ajax({
                type: "POST",
                //dataType: 'json',
                url: Drupal.settings.basePath+'checklist2/cmd',
                //data: {'title': title, 'action': 'add_parent' , 'ctid': ctid , 'cid': cid , 'checked': checked},
                data:data + '&action=add_parent',
                success: function(msg){
                   $('#title').select();
                	if(cid == '') {
                  		$('#checklist_parent_add_space').after(msg);

                	}
                	else {
                 		 $('#checklist_child_list_'+cid).prepend(msg);
                 		 //alert(msg);

                	}
                  //alert( "Data Saved: " + msg );
                  $('#checklist_parent_add_space_').empty();
                  //$('#checklist_parent_add_space_').after();
                  //checklist_parent_alive();

                }
              });

          }) ;
	
	$('.checklist_parent').live("mouseenter", function() {
    	$(this).find('.hidden').css({visibility : 'inherit'});
   
  }).live("mouseleave" ,function () {
     	$(this).find('.hidden').css({visibility : 'hidden'});
     
  }
  );

	
	$('.checklist_child').live("mouseenter", function() {

   		$(this).find('.hidden').css({visibility : 'inherit'});
   
  }).live("mouseleave", function () {
    	$(this).find('.hidden').css({visibility : 'hidden'});  
  }
  );


	$('.add_child').live("click" , function(e) {
		var cid = $(this).parents().attr('alt');
		$('.checklist_add_space').empty();
              $('.checklist_add_child_space').empty();
		var obj = $(this);

			$.ajax({
                type: "POST",
                url: Drupal.settings.basePath+'checklist2/add',
                data: {'cid': cid, 'action': 'edit_child'},
                success: function(msg){

                //alert(msg);
				//$(obj).parents().find('.checklist_add_child_space').html(msg);
                
                $('#checklist_add_child_space_'+cid).html('<div class = "add_box" >' + msg + '</div>');
                $('#title').select();
                //checklist_parent_alive();
				
                  

                }
              });

		
	});

	$('.trash_parent').live("click", function(e) {
		var cid = $(this).parents().attr('alt');
		$('#main_parent_'+cid).after('<span class = "loading">Deleteing...</span>');
		$.ajax({
                type: "POST",
                url: Drupal.settings.basePath+'checklist2/cmd',
                data: {'action': 'trash_parent' ,'cid': cid},
                success: function(msg){
                  
          				$('#main_parent_'+cid).fadeOut('500');
          				$('.loading').remove();
                  

                }
              });
		
	});

	$('.trash_child').live("click", function(e) {
		var cid = $(this).parents().attr('alt');
		//alert(cid);
		$('#child_'+cid).after('<span class = "loading">Deleteing...</span>');
		$.ajax({
                type: "POST",
                url: Drupal.settings.basePath+'checklist2/cmd',
                data: {'action': 'trash_parent' ,'cid': cid},
                success: function(msg){
                  notification();
          				$('#child_'+cid).fadeOut('500');
          				$('.loading').remove();
                  

                }
              });
		
	});

  $('.edit_child').live("click", function(e) {
    var cid = $(this).parents().attr('alt');
    $('.edit_box').remove();
    $('.checklist_child').show();
    $('.checklist_add_space').empty();
              $('.checklist_add_child_space').empty();
    var obj = $(this);

      $.ajax({
                type: "POST",
                url: Drupal.settings.basePath+'checklist2/add',
                data: {'cid': cid, 'action': 'edit_child', 'fx': 'edit'},
                success: function(msg){
                  notification();
                  //alert(msg);
          //$(obj).parents().find('.checklist_add_child_space').html(msg);
                  
                  $('#child_'+cid).after('<div class = "edit_box">' + msg + '</div>');
                  $('#child_'+cid).hide();
                  $('#title').select();
                  //checklist_parent_alive();
        
                  

                }
              });
    $('.btu_cancel_each_form_edit').live('click',function(){
       $('.edit_box').remove(); 
       $('.checklist_child').show();
    });

    
  });

     $('#btu_add_parent_form_edit').live("click", function() {
            //var title = $('#title').val();
            //var ctid = $('#ctid').val();
            //var cid = $('#cid').val();
            //var checked = $('#checked').attr('checked');
            var action = $(this).attr('alt');
            //alert(action);return false;
            var data = $('#checklist_add_form_id').serialize();
            var cid;
            if($("#cid").length){
               cid = $('#cid').val();
            }
            else {
               cid = '';
            }  
            //alert(data);     
            //return false;
            $('#child_'+cid).after('<span class = "loading">Updating...</span>');
             $.ajax({
                type: "POST",
                //dataType: 'json',
                url: Drupal.settings.basePath+'checklist2/cmd',
                //data: {'title': title, 'action': 'add_parent' , 'ctid': ctid , 'cid': cid , 'checked': checked},
                data:data + '&action=' + action,
                success: function(msg){
                  notification();

                  if(action == 'edit_parent') {
                    $('#checklist_child_list_'+cid).remove();
                     $('#parent_'+cid).replaceWith(msg);
                     //alert(msg);
                     $('#parent_'+cid).fadeIn('500');
                     $('.loading').remove();
                     $('.edit_box').remove();

                  }
                  else {
                     $('#child_'+cid).replaceWith(msg);
                     $('#child_'+cid).fadeIn('500');
                     $('.loading').remove();
                     $('.edit_box').remove();
                     //alert(msg);

                  }
                  $('#title').select();
                  //alert( "Data Saved: " + msg );
                  $('#checklist_parent_add_space_').empty();
                  //$('#checklist_parent_add_space_').after();
                  //checklist_parent_alive();

                }
              });

          }) ;

	$('.btu_cancel_each_form').live("click",function(e) {
              $('.checklist_add_space').empty();
              $('.checklist_add_child_space').empty();
              //alert('ok');
          });

$('.edit_parent').live("click", function(e) {
    var cid = $(this).parents().attr('alt');
    $('.edit_box').remove();
    $('.checklist_parent').show();
    $('.checklist_add_space').empty();
    $('.checklist_add_child_space').empty();
    var obj = $(this);

      $.ajax({
                type: "POST",
                url: Drupal.settings.basePath+'checklist2/add',
                data: {'cid': cid, 'action': 'edit_parent', 'fx': 'edit'},
                success: function(msg){
                //alert(msg);
        //$(obj).parents().find('.checklist_add_child_space').html(msg);
                
                $('#parent_'+cid).after('<div class = "edit_box">' + msg + '</div>');
                $('#parent_'+cid).hide();
                //checklist_parent_alive();
                $('#title').select();
        
                  

                }
              });
    $('.btu_cancel_each_form_edit').live('click',function(){
       $('.edit_box').remove(); 
       $('.checklist_child').show();
       $('.checklist_parent').show();
    });

    
  });

$('.checklist_checkbox').live("click", function() {
    $(this).before('<span class = "loading">Updating...</span>');
    var checked = $(this).attr('checked');
    var cid = $(this).parents().attr('alt');
    if(checked){
      checked = 1;
    }
    else {
      checked = 0;
    }
    //alert(checked);
    //alert(cid);return false;
    $.ajax({
                type: "POST",
                url: Drupal.settings.basePath+'checklist2/cmd',
                data: {'cid': cid, 'action': 'edit_checked', 'checked': checked},
                success: function(msg){
                  notification();
                  $('.loading').remove();
                //alert(msg);
                //alert(msg);
        //$(obj).parents().find('.checklist_add_child_space').html(msg);
                
                //$('#parent_'+cid).after('<div class = "edit_box">' + msg + '</div>');
                //$('#parent_'+cid).hide();
                //checklist_parent_alive();
        
                  

                }
              });
});

  
}


function notification () {
          $.ajax({
                type: "POST",
                //dataType: 'json',
                url: Drupal.settings.basePath+'checklist2/notification',
                data: {},
                success: function(msg){
                  //alert(msg);
               $('#checklist_massage').html(msg);
                
                  

                }
              });
  }
