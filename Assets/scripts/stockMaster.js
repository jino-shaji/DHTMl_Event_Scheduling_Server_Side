 var table;
function initial(){
    




    $.ajax({
        url: "stStockMaster",
        type: 'GET',
        data: {type: 'itemMaster'},
        success: function (data, textStatus, jqXHR) {
                        $("#loading").hide();
            $("#prefixSubmit").prop('disabled',false);
                if (data[0].status=="0"){
                     alert("Error");
                     console.log(data[0].errorMessage);
                     $("#headInvoice").text("Invoice Number (error)");
                     return;
                 }
                 data.shift();
                 console.log(data);
         table=         $('#stockMasterTable').DataTable( {
        "data": data,
        "columns": [
            { "data": "itemName" },
            { "data": "itemCode","defaultContent": "" },
            { "data": "itemType" },
            { "data": "itemHsn" ,"defaultContent": ""},
            { "data": "itemStock" ,"defaultContent": ""},
            { "data": "itemTag","defaultContent": "" },
            {
      "data": null,
      "defaultContent": "<button class='btn view' >View</button>"
    }
        ]
        ,
        dom: 'Bfrtipl',
    buttons: [
     
         {
            extend: 'excel',
            text: 'Export Excel',
           
        }
    ]
    } );
    
        },
        error: function (jqXHR, textStatus, errorThrown) 
        {            $("#loading").hide();
            $("#prefixSubmit").prop('disabled',true);
            alert("Error");
            $("#headInvoice").text("Invoice Number (error)");
            console.log(textStatus+" "+errorThrown);
        }
        
    });
}
$(function(){
    //var table=$('#stockMasterTable');
   $("#stockMasterTable").on('click', '.view', function () {
           var data = table.row( $(this).parents('tr') ).data();
           //console.log(data);
       // alert( 'You clicked on '+data["itemId"]+'\'s row' );
                window.location="viewItem.jsp?ic="+data["itemId"];


});
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
});
});
