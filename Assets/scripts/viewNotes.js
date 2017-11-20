var table;
function initial(){
    
    loadData("-2");
    $('#fromDate').datepicker({dateFormat: 'yy-mm-dd'});
        $('#toDate').datepicker({dateFormat: 'yy-mm-dd'});
}

function loadData(type){
   // alert(type);
    $(".sub").prop('disabled', true);
 var fDate=$("#fromDate").val();
 var tDate=$("#toDate").val();
    $.ajax({
        url: 'stGetBasics',
        type: 'GET',
        data: {type: 'getNoteInvoice',iType:type,fromDate:fDate,toDate:tDate},
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
        "order": [[ 0, "desc" ]],
        "columns": [
            { "data": "date" },
            { "data": "type","defaultContent": "" },
            { "data": "invoice","defaultContent": "" },
            { "data": "originalInvoice","defaultContent": "" },
            
            { "data": "customer","defaultContent": "" },
            { "data": "tv" },
            { "data": "tax" ,"defaultContent": ""},
            { "data": "total" ,"defaultContent": "-"},            
            { "data": "status","defaultContent": "" },
                   {
      "data": null,
      "defaultContent": "<button class='btn view' >View</button>&nbsp <button class='btn btn-danger cancel' >Toggle Status</button>"
    }
        ]
    } );
}


$(function(){
      $("#formViewNotes").unbind('submit').bind('submit', function () {
        event.preventDefault();
       
        table.destroy();
        loadData(3);

    });
    
    $('#tableInvoice').on( 'click', '.view', function () {
        var data = table.row( $(this).parents('tr') ).data();
        var type =Number(data["ttype"])+3;
        window.open("viewSInvoice.jsp?type="+type+"&sid="+data["sid"]+"",'_blank');

    } );
    
    $('#tableInvoice').on( 'click', '.cancel', function () {
        var dat = table.row( $(this).parents('tr') ).data();
           var row=$(this);
         var c=confirm("Stock will be affected.Kindly Confirm ?");
              if(c){
             //var year=$(this).closest('td').prev().prev().prev().prev().prev().prev().text();
             //var itype=$("").val();
             row.prop('disabled',true);
            $.ajax({
            url: "stGetBasics",
            type: 'post',
            data: {iid:dat["sid"],type:"changeStatus",iType:"6"},
            success: function (data, textStatus, jqXHR) {
                if (data[0].status == "0") {
                    alert("Error");
                    console.log(data[0].errorMessage);
                    $(row).prop('disabled', false);
                    return;
                }

                alert("Status Changed");
                //alert(data["iType"]);
                location.reload();
                $(row).prop('disabled', false);
                   //$(row).closest('tr').remove();

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
    
});