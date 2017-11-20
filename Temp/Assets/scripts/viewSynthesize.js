var table;
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

function initial(){
    
    var salesId=getUrlParameter("sid");
        fillSalesInvoice(salesId);
    
}

function fillSalesInvoice(saledId){
    $.ajax({
        type: 'GET',
        url: "stSynthesize",
        data: {"type":"get","invoiceId":saledId},
        success: function (data, textStatus, jqXHR) {
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);
       return;
            }
            data.shift();
            console.log(data);
            $("#fpItemName").text(data[0].itemName);
            $("#fpBatchName").text(data[0].batchName);
            $("#fpQty").text(data[0].qty);
            $("#fpNotes").text(data[0].notes);
        
            var dat=data[1];
        
              table=         $('#invoiceContents').DataTable( {
        "data": dat,
        "order": [[ 0, "desc" ]],
        "columns": [
            { "data": "itemName" },
            { "data": "batchName","defaultContent": "" },
        
            { "data": "qty" }
        
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
