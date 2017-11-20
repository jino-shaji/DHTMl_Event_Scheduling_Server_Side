
function initial(){
    $.ajax({
                url: 'stGetBasics',
                type: 'GET',
                data: {type: 'getNextCount',tName:"item_master"},
                success: function (data, textStatus, jqXHR) {
                 $("#loading").hide();
                    if (data[0].status=="0"){
                     alert("Error");
                     console.log(data[0].errorMessage);
                     
                     return;
                 }
                 //console.log(data);
                 $("#itemCode").val(data[1].nextCount);
                 
                },
                error: function (jqXHR, textStatus, errorThrown) {
                        alert("Error");
                        $("#loading").hide();
                        console.log(textStatus+" "+errorThrown);
                    }
            });  
}

$(function(){
    //var table=$('#stockMasterTable');
   $('#expiryDate').datepicker({ dateFormat: 'yy-mm-dd'});
$( "#selectItemType" ).change(function() {
 var val= $("#selectItemType").val();
 $("#batchName").val("");
     $("#unit").val("");
     $("#quantity").val("");
     $("#expiryDate").val("");
     $("#batchName").prop('disabled',false);
     $("#unit").prop('disabled',false);
     $("#quantity").prop('disabled',false);
     $("#expiryDate").prop('disabled',false);
 if(val==2){
     $("#batchName").val("N.A");
     $("#unit").val("N.A");
     $("#quantity").val("1");
     $("#expiryDate").val("N.A");
     $("#batchName").prop('disabled',true);
     $("#unit").prop('disabled',true);
     $("#quantity").prop('disabled',true);
     $("#expiryDate").prop('disabled',true);
 }
 
 $("#formNewItem").unbind('submit').bind('submit',function (){
      event.preventDefault();
      $(".sub").prop('disabled',true);
    $.ajax({
            url: "stNewItem",
            type: 'POST',
            data: $("#formNewItem").serialize(),
            success: function (data, textStatus, jqXHR) {
                if (data[0].status=="0"){
                     alert("Error");
                     console.log(data[0].errorMessage);
            $(".sub").prop('disabled',false);
                     return;
                 }
            
                alert("New Item Created");
                window.location="viewItem.jsp?ic="+data[0].id;
            $(".sub").prop('disabled',false);
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error");
                console.log(textStatus+" "+errorThrown);
                $(".sub").prop('disabled',false);
            }
    }); 
   
 });
 
});


});