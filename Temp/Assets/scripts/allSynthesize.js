var table;
function initial(){
    
    loadData("-1");
    $('#fromDate').datepicker({dateFormat: 'yy-mm-dd'});
        $('#toDate').datepicker({dateFormat: 'yy-mm-dd'});
}

function loadData(type){
    //alert(type);
    $(".sub").prop('disabled', true);
 var fDate=$("#fromDate").val();
 var eDate=$("#toDate").val();
    $.ajax({
        url: 'stSynthesize',
        type: 'get',
        data: {type: 'showAll',iType:type,fDate:fDate,eDate:eDate},
        success: function (data, textStatus, jqXHR) {
            $(".sub").prop('disabled', false);
            $("#loading").hide();
            
            if (data[0].status == "0") {
                $("#loading").hide();
                console.log(data[0].errorMessage);
                alert("Error");
                
                return;
            }
            console.log(data);

            data.shift();
            loadTable(data);
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
            $("#loading").hide();
            $(".sub").prop('disabled', false);
            console.log(textStatus + " " + errorThrown);
        }
    });
}

function loadTable(dat){
   // alert("d"+dat);
    
     table=         $('#tableInvoice').DataTable( {
        "data": dat,
        "columns": [
            { "data": "date" },
            { "data": "itemName","defaultContent": "" },
            { "data": "batchName","defaultContent": "" },
            { "data": "qty","defaultContent": "" },
            
            { "data": "notes","defaultContent": "" },
                   {
      "data": null,
      "defaultContent": "<button class='btn view' >View</button>&nbsp;&nbsp;<button class='btn delete btn-danger' >Delete</button>"
    }
        ]
    } );
}


$(function(){
      $("#formAllSynthesize").unbind('submit').bind('submit', function () {
        event.preventDefault();
      // alert("ds");
        table.destroy();
        loadData("1");

    });
    
    $('#tableInvoice').on( 'click', '.delete', function () {
        var data = table.row( $(this).parents('tr') ).data();
           var row=$(this);
         var c=confirm("This cannot be undone.Stock Quantities will be affected.Confirm ?");
              if(c){
             //var year=$(this).closest('td').prev().prev().prev().prev().prev().prev().text();
             row.prop('disabled',true);
            $.ajax({
            url: "stSynthesize",
            type: 'get',
            data: {sid:data["sid"],type:"delete"},
            success: function (data, textStatus, jqXHR) {
                if (data[0].status == "0") {
                    alert("Error");
                    console.log(data[0].errorMessage);
                    $(row).prop('disabled', false);
                    return;
                }

                alert("Entry Deleted");
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
        //window.open("viewSynthesize.jsp?&sid="+data["sid"]+"",'_blank');

    } );
    
    
    $('#tableInvoice').on( 'click', '.view', function () {
        var data = table.row( $(this).parents('tr') ).data();
        
        window.open("viewSynthesize.jsp?&sid="+data["sid"]+"",'_blank');

    } );
});