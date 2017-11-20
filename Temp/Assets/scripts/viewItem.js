var iType,table;
function initial() {
    fillItemDetails();
    fillBatchDetails();
    
}
function fillItemDetails() {
    var itemCode = getUrlParameter('ic');

    $.ajax({
        url: 'stViewItem',
        type: 'GET',
        data: {type: 'getItemDetails', itemCode: itemCode},
        success: function (data, textStatus, jqXHR) {
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return;
            }
            //             console.log(data);
            data.shift();
            $("#itemName").val(data[0].itemName);
            $("#itemCode").val(data[0].itemCode);
            $("#selectItemType").val(data[0].itemType);
            $("#hsn").val(data[0].hsn);
            $("#sgst").val(data[0].sgst);
            $("#cgst").val(data[0].cgst);
            $("#cess").val(data[0].cess);
            $("#tags").val(data[0].tags);
              var val = data[0].itemType;
              iType=val;//alert(iType);  
            if (val == "2") {
                $("#unit").val("N.A");
                $("#unit").prop('disabled', true);
                $(".delete").prop('disabled', true);
                $(".addStock").prop('disabled', true);
                $(".clearStock").prop('disabled', true);
            } else {
                $("#unit").val(data[0].unit);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
}

function fillBatchDetails() {
    var itemCode = getUrlParameter('ic');

    $.ajax({
        url: 'stViewItem',
        type: 'GET',
        data: {type: 'getBatchDetails', itemCode: itemCode},
        success: function (data, textStatus, jqXHR) {
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return;
            }
            //console.log(data);
            data.shift();
//            $.each(data, function (i, dat) {//console.log("succ loop");
//                var newRow = $("<tr><td></td><td></td><td></td><td></td><td></td><td></td><td hidden></td><td><button class='btn edit'>Edit</button>&nbsp;&nbsp;<button class='btn addStock'>Add Stock</button>&nbsp;&nbsp;<button class='btn clearStock'>Clear Stock</button>&nbsp;&nbsp;<button class='btn btn-danger delete'>Delete</button></td></tr>");
//                newRow.children().eq(0).text(dat.batchName);
//                newRow.children().eq(1).text(dat.quantity);
//                newRow.children().eq(2).text(dat.expiryDate);
//                newRow.children().eq(3).text(dat.pp);
//                newRow.children().eq(4).text(dat.sp);
//                newRow.children().eq(5).text(dat.notes);
//                newRow.children().eq(6).text(dat.batchId);
//                newRow.appendTo($("#tableBatch"));
//            });
       table=         $("#tableBatch").DataTable( {
        "data": data,
        "columns": [
            { "data": "batchName" },
            { "data": "quantity","defaultContent": "" },
            { "data": "expiryDate","defaultContent": "" },
            { "data": "pp" ,"defaultContent": ""},
            { "data": "sp" ,"defaultContent": ""},
            { "data": "notes" ,"defaultContent": ""},
            
            {
      "data": null,
      "defaultContent": "<button class='btn edit'>Edit</button>&nbsp;&nbsp;<button class='btn addStock'>Add Stock</button>&nbsp;&nbsp;<button class='btn clearStock'>Clear Stock</button>&nbsp;&nbsp;<button class='btn btn-danger delete'>Delete</button>"
    }
        ],
        dom: 'Bfrtip',
    buttons: [
         {
            extend: 'excel',
            text: 'Excel Export',
            title:$("#itemName").val()+' Details',
           header:true,
           footer:true,
           pageSize:'A4',
         exportOptions: {
                    columns: [ 0, 1, 2,3,4,5 ]
                }  
        }
    ]
    } );
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

$(function () {
    
    if ($("#selectItemType").val() == "2") {
                $(".delete").prop('disabled', true);
                $(".addStock").prop('disabled', true);
                $(".clearStock").prop('disabled', true);
            }

    
   $('#expiryDate').datepicker({ dateFormat: 'yy-mm-dd'});
   $('#newExpiryDate').datepicker({ dateFormat: 'yy-mm-dd'});

    $("#selectItemType").change(function () {
        var val = $("#selectItemType").val();
        $("#unit").val("");
        $("#unit").prop('disabled', false);

        if (val == 2) {
            $("#unit").val("N.A");
            $("#unit").prop('disabled', true);
        }

        

    });

    $("#formViewItem").unbind('submit').bind('submit', function () {
        event.preventDefault();
        var itemCode = getUrlParameter('ic');
        $(".sub").prop('disabled', true);
        $.ajax({
            url: "stViewItem",
            type: 'POST',
            data: $("#formViewItem").serialize() + "&type=updateItem&itemId=" + itemCode+"&initialType="+iType,
            success: function (data, textStatus, jqXHR) {
                if (data[0].status == "0") {
                    alert("Error");
                    console.log(data[0].errorMessage);
                    $(".sub").prop('disabled', false);
                    return;
                }

                alert("Item Updated");
                $(".sub").prop('disabled', false);
    location.reload();

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error");
                console.log(textStatus + " " + errorThrown);
                $(".sub").prop('disabled', false);
            }
        });

    });


    $("#formBatch").unbind('submit').bind('submit', function () {
        event.preventDefault();
        var itemCode = getUrlParameter('ic');
        var batchCode = $("#batchId").val();
        //alert(batchCode);
        $(".sub").prop('disabled', true);
        $.ajax({
            url: "stViewItem",
            type: 'POST',
            data: $("#formBatch").serialize() + "&type=updateBatch&itemId=" + itemCode + "&batchId=" + batchCode,
            success: function (data, textStatus, jqXHR) {
                if (data[0].status == "0") {
                    alert("Error");
                    console.log(data[0].errorMessage);
                    $(".sub").prop('disabled', false);
                    return;
                }

                alert("Item Updated");
                $(".sub").prop('disabled', false);
    location.reload();

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error");
                console.log(textStatus + " " + errorThrown);
                $(".sub").prop('disabled', false);
            }
        });

    });

    $('#tableBatch').on('click', '.edit', function () {
//        var p = $(this).closest('td').prev();
//        var id = p.text();
var data = table.row( $(this).parents('tr') ).data();
        var id =data["batchId"];
        $("#batchId").val(id);
        
        
        $("#batchName").val(data["batchName"]);
        $("#quantity").val(data["quantity"]);
        $("#expiryDate").val(data["expiryDate"]);
        $("#pp").val(data["pp"]);
        $("#sp").val(data["sp"]);
        $("#notes").val(data["notes"]);
var val = $("#selectItemType").val();
        if ( val=="2") {
            $("#batchName").val("N.A");
            $("#quantity").val("1");
            $("#expiryDate").val("N.A");
            $("#batchName").prop('disabled', true);
            $("#unit").prop('disabled', true);
            $("#quantity").prop('disabled', true);
            $("#expiryDate").prop('disabled', true);
        }

        $("#modalBatch").modal('show');
    });

$('#tableBatch').on('click', '.addStock', function () {
var data = table.row( $(this).parents('tr') ).data();
        var id =data["batchId"];
    $("#asBatchId").val(id);
        $("#modalAddStock").modal('show');
       
});


$("#formAddStock").unbind('submit').bind('submit', function () {
        event.preventDefault();
        var itemCode = getUrlParameter('ic');
        var batchCode = $("#asBatchId").val();
        //alert(batchCode);
        $(".sub").prop('disabled', true);
        $.ajax({
            url: "stViewItem",
            type: 'POST',
            data: $("#formAddStock").serialize() + "&type=updateStock&itemId=" + itemCode + "&batchId=" + batchCode,
            success: function (data, textStatus, jqXHR) {
                if (data[0].status == "0") {
                    alert("Error");
                    console.log(data[0].errorMessage);
                    $(".sub").prop('disabled', false);
                    return;
                }

                alert("Stock Updated");
                $(".sub").prop('disabled', false);
    location.reload();

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error");
                console.log(textStatus + " " + errorThrown);
                $(".sub").prop('disabled', false);
            }
        });

    });

$('#tableBatch').on('click', '.clearStock', function () {
        var data = table.row( $(this).parents('tr') ).data();
        var id =data["batchId"];
        var row=$(this);
        var c=confirm("Stock quantity will be set to Zero");
              if(c){
             //var year=$(this).closest('td').prev().prev().prev().prev().prev().prev().text();
             row.prop('disabled',true);
            $.ajax({
            url: "stViewItem",
            type: 'POST',
            data: $("#formViewItem").serialize() + "&type=clearStock&batchId=" + id,
            success: function (data, textStatus, jqXHR) {
                if (data[0].status == "0") {
                    alert("Error");
                    console.log(data[0].errorMessage);
                    $(row).prop('disabled', false);
                    return;
                }

                alert("Stock Cleared");
                $(row).prop('disabled', false);
                $(row).closest('td').prev().prev().prev().prev().prev().text("0");
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error");
                console.log(textStatus + " " + errorThrown);
                $(row).prop('disabled', false);
            }
        });
    }     
        
       
});

$('#tableBatch').on('click', '.delete', function () {
var data = table.row( $(this).parents('tr') ).data();
        var id =data["batchId"];
    var row=$(this);
        var c=confirm("You will loose all data associated with this batch. Confirm");
              if(c){
             //var year=$(this).closest('td').prev().prev().prev().prev().prev().prev().text();
             row.prop('disabled',true);
            $.ajax({
            url: "stViewItem",
            type: 'POST',
            data: {type:'deleteBatch',batchId:id},
                    
            success: function (data, textStatus, jqXHR) {
                if (data[0].status == "0") {
                    alert("Error");
                    console.log(data[0].errorMessage);
                    $(row).prop('disabled', false);
                    return;
                }

                alert("Batch Deleted");
                $(row).prop('disabled', false);
                $(row).closest('tr').remove();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error");
                console.log(textStatus + " " + errorThrown);
                $(row).prop('disabled', false);
            }
        });
    }     
        
       
});

$("#newBatch").on('click',function()
{
    if($("#selectItemType").val()=="2"){
        $("#newBatchName").val("N.A");
            $("#newQuantity").val("1");
            $("#newxpiryDate").val("N.A");
            $("#newBatchName").prop('disabled', true);
            $("#newQuantity").prop('disabled', true);
            $("#newExpiryDate").prop('disabled', true);
}
$("#modalAddBatch").modal('show');    

} 
);

    $("#formNewBatch").unbind('submit').bind('submit', function () {
        event.preventDefault();
        var itemCode = getUrlParameter('ic');
        
        //alert(batchCode);
        $(".sub").prop('disabled', true);
        $.ajax({
            url: "stViewItem",
            type: 'POST',
            data: $("#formNewBatch").serialize() + "&type=newBatch&itemId=" + itemCode ,
            success: function (data, textStatus, jqXHR) {
                if (data[0].status == "0") {
                    alert("Error");
                    console.log(data[0].errorMessage);
                    $(".sub").prop('disabled', false);
                    return;
                }

                alert("New Batch Created");
                $(".sub").prop('disabled', false);
    location.reload();

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error");
                console.log(textStatus + " " + errorThrown);
                $(".sub").prop('disabled', false);
            }
        });

    });




});
