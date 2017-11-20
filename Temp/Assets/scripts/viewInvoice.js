var salesData,bosData,exportData,purchaseData,receiptData;
var table;
function initial(){
        $('#fromDate').datepicker({dateFormat: 'yy-mm-dd'});
        $('#toDate').datepicker({dateFormat: 'yy-mm-dd'});
    loadData(-1);
}
function loadData(type){
   // alert(type);
    $(".sub").prop('disabled', true);
 var fDate=$("#fromDate").val();
 var tDate=$("#toDate").val();
    $.ajax({
        url: 'stGetBasics',
        type: 'GET',
        data: {type: 'getInvoice',iType:type,fromDate:fDate,toDate:tDate},
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
            if(type!=-1){
                table.destroy();
            }
             salesData=data[0];
                    bosData=data[1];
                    exportData=data[2];
                    purchaseData=data[3];
                    receiptData=data[4];
                    switch (type){
                        case -1:
                    loadTable(salesData);
                    break;
                case "1":
                    loadTable(salesData);
                    break;
               case "2":
                   loadTable(bosData);
                    break;
                case "3":
                    loadTable(purchaseData);
                    break;
                case "4":
                    loadTable(exportData);
                    break;    
                case "5":
                    loadTable(receiptData);
                    break;    
                   
            }
            
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
            { "data": "invoice","defaultContent": "" },
            { "data": "customer","defaultContent": "" },
            { "data": "gstin","defaultContent": "" },
            { "data": "tv" },
            { "data": "tax" ,"defaultContent": ""},
            { "data": "total" ,"defaultContent": "-"},            
            { "data": "status","defaultContent": "" },
            {
      "data": null,
      "defaultContent": "<button class='btn view' >View</button>&nbsp;<button class='btn edit'>Edit</button>&nbsp<button class='btn btn-danger cancel'>Toggle Status</button>"
    }
        ]
    } );
}
$(function(){
   $("#formViewInvoice").unbind('submit').bind('submit', function () {
        event.preventDefault();
       
        
        loadData($("#selectInvoiceType").val());

    }); 
    
    $("#selectInvoiceType").on('change',function(){
    table.destroy();
        var type =$("#selectInvoiceType").val();
                    switch (type){
                
                case "1":
                    loadTable(salesData);
                    break;
               case "2":
                   loadTable(bosData);
                    break;
                case "3":
                    loadTable(purchaseData);
                    break;
                case "4":
                    loadTable(exportData);
                    break;    
                case "5":
                    loadTable(receiptData);
                    break;       
            }

    });
       

     $('#tableInvoice').on( 'click', '.view', function () {
        var data = table.row( $(this).parents('tr') ).data();
        switch(data["iType"]){
            case "1":
                window.open("viewSInvoice.jsp?type=1&sid="+data["sid"],'_blank');
                break;     
             case "2":
                window.open("BOSInvoice.jsp?sid="+data["sid"],'_blank');;
                break;
             case "3":
                window.open("exportInvoice.jsp?sid="+data["sid"],'_blank');;
                break;        
            case "4":
                window.open("viewSInvoice.jsp?type=2&sid="+data["sid"],'_blank');;
                break;
             case "5":
                window.open("viewReceipt.jsp?sid="+data["sid"],'_blank');;
                break;   
        }
    } );
    
    $('#tableInvoice').on( 'click', '.edit', function () {
        var data = table.row( $(this).parents('tr') ).data();
        switch($("#selectInvoiceType").val()){
            case "1":
                window.open("eSales.jsp?iid="+data["sid"]);
                break;     
             case "2":
                window.open("eBOS.jsp?iid="+data["sid"]);
                break;
             case "3":
                window.open("eExport.jsp?iid="+data["sid"]);
                break;        
            case "4":
                window.open("ePurchase.jsp?iid="+data["sid"]);
                break;
             case "5":
                window.open("eReceipt.jsp?iid="+data["sid"]);
                break;   
        }
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
            data: {iid:dat["sid"],type:"changeStatus",iType:dat["iType"]},
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

