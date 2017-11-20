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
    var type=getUrlParameter("type");
    var salesId=getUrlParameter("sid");
    fillSalesInvoice(salesId);
}

function fillSalesInvoice(saledId){
    $.ajax({
        type: 'GET',
        url: "stExport",
        data: {"type":"sales","invoiceId":saledId},
        success: function (data, textStatus, jqXHR) {
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);
       return;
            }
            data.shift();
            console.log(data);        
              table=         $('#invoiceContents').DataTable( {
        "data": data[2],
        "columns": [
            { "data": "itemName" },
            { "data": "batchName","defaultContent": "" },
            { "data": "hsn","defaultContent": "" },
            { "data": "qty" },
            { "data": "rpi" ,"defaultContent": ""},
            { "data": "discount" ,"defaultContent": "-"},
            { "data": "advance" ,"defaultContent": "-"},
            { "data": "tv","defaultContent": "" },
            { "data": "igstRate" ,"defaultContent": "-"},
            { "data": "cessRate" ,"defaultContent": "-"},
            { "data": "total","defaultContent": "" }
        ],
        dom: 'Bfrtip',
    buttons: [
     
         
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

function fillPurchaseInvoice(saledId){
    $.ajax({
        type: 'GET',
        url: "stPurchase",
        data: {"type":"purchase","invoiceId":saledId},
        success: function (data, textStatus, jqXHR) {
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);
       return;
            }
            data.shift();
            console.log(data);        
              table=         $('#invoiceContents').DataTable( {
        "data": data[2],
        "columns": [
            { "data": "itemName" },
            { "data": "batchName","defaultContent": "" },
            { "data": "hsn","defaultContent": "" },
            { "data": "qty" },
            { "data": "rpi" ,"defaultContent": ""},
            { "data": "discount" ,"defaultContent": "-"},
            { "data": "tv","defaultContent": "" },
            { "data": "taxRate" ,"defaultContent": "-"},
            { "data": "total","defaultContent": "" }
        ],
        dom: 'Bfrtip',
    buttons: [
     
         {
            extend: 'print',
            text: 'Print',
            title:'Invoice',
           header:true,
           footer:true,
           pageSize:'A4',
           messageTop:'Madukkakuzhy vvk Ayurveda ',
           messageLeft:'ddfdggf',
           messageBottom:'Address',
            customize: function ( doc ) {
              content: ['simple text',
              ]
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



