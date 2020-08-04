/*
 * Function to add more than one file.
 */
$('.add_more').click(function(e){
  e.preventDefault();
  var idIndex = $('input[name*="fileUpload"]').length;
  $(this).before("<input name='fileUpload' id='fileUpload_" + idIndex +"' accept='image/png, image/jpeg' type='file'/>");
});

/*
 * Ajax function to add a ticket to the projectmanagement.
 */
$('#createIssueBtn').click(function(){
  $.ajax({
    method: "POST",
    url: "form.php",
    dataType: 'text', 
    cache: false,
    contentType: false,
    processData: false,
    data: getData(),
  })
  .done(function( msg ) {
    console.log( msg );
  });
});

var getData = function() {
  
  var form_data = new FormData();
  
  $.each($("[name='fileUpload']"), function( index, value ) {
    var file = $('#fileUpload_' + index).prop('files')[0];
    form_data.append('file' + index, file);
  });
  $( "input, select, textarea" ).each(function() {
    if($( this ).attr('type') === 'radio' && $(this).prop("checked") === true) {
      form_data.append($( this ).attr('name'), $( this ).val());
    } else if ($( this ).attr('type') !== 'radio') {
      form_data.append($( this ).attr('name'), $( this ).val());
    }
  });
  return form_data;
}
/*
 * Funtion to set firma or first and last name display:none.
 */
$( "#contactFormOf" ).change(function() {
  if($( this ).val() !== 'Firma') {
	  $('#firmaSet').css('display','none');
	  $('.nameSet').css('display','');
  } else {
	  $('#firmaSet').css('display','');
	  $('.nameSet').css('display','none');
  }
});
/*
 * Functions for the next and previous page and the breadcrumb pagination, these are not really pages, these are only objects on the index.php.
 */
$('.btnNext').click(function(evt) {
  
  var id = $(this).closest('.formcontainer').attr('id');
  $("[formPageId='" + id + "']").removeClass('active');
    
  var index = $( ".formcontainer" ).index( $(this).closest('.formcontainer') );
  
  var listBreadcrumbs = $( ".breadcrumbs" );
  var breadCrumbElement = listBreadcrumbs.get(index + 1);
  $(breadCrumbElement).addClass('active');
  
  var listItems = $( ".formcontainer" );
  var ele = listItems.get(index + 1);
  $(ele).css('display','');
  $(this).closest('.formcontainer').css('display','none');
  //$(this).removeClass('active');
})

$('.btnPrevious').click(function(){
  var id = $(this).closest('.formcontainer').attr('id');
  $("[formPageId='" + id + "']").removeClass('active');
  
  var index = $( ".formcontainer" ).index( $(this).closest('.formcontainer') );
  
  var listBreadcrumbs = $( ".breadcrumbs" );
  var breadCrumbElement = listBreadcrumbs.get(index - 1);
  $(breadCrumbElement).addClass('active');
  
  var listItems = $( ".formcontainer" );
  var ele = listItems.get(index - 1);
  $(ele).css('display','');
  $(this).closest('.formcontainer').css('display','none');
})

$('.page-item-breadcrumb').click(function(){
  oldId = '#' + $(this).closest('.pagination').children('.active').attr('formPageId');
  $(oldId).css('display','none');
  $(this).closest('.pagination').children('.active').removeClass('active');
  
  $(this).addClass('active');
  id = '#' + $(this).attr('formPageId'); 
  $(id).css('display','');
})

$('#requestFor_02').change(function(){
  $('#reihenhausGeomOptions, #doppelhausGeomOptions').css('display','none');
  if($(this).val() === 'Doppelhaus') {
    $('#doppelhausGeomOptions').css('display','');
  }
  if($(this).val() === 'Reihenhaus'){
    $('#reihenhausGeomOptions').css('display','');
  }
}); 