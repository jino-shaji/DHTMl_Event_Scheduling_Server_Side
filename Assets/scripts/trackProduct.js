var iData,table;
function initial(){
    fillItem();   
      $('#fromDate').datepicker({dateFormat: 'yy-mm-dd'});
        $('#toDate').datepicker({dateFormat: 'yy-mm-dd'});
        table= $('#tableInvoice').DataTable( {});
}
function fillItem() {
    $.ajax({
        url: 'stGetBasics',
        type: 'GET',
        data: {type: 'allItem'},
        success: function (data, textStatus, jqXHR) {
            
            if (data[0].status == "0") {
                alert("Error");
                //console.log(data[0].errorMessage);

                return;
            }
            //console.log(data);

            data.shift();
            
            iData=data;
            loadItem();
            $("#loading").hide();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
}

function loadItem(){
    $('#itemName').append($('<option>', {
                    value: "",
                    text: "Select"
                }));
                
                $('#itemCode').append($('<option>', {
                    value: "",
                    text: "Select"
                }));
            $.each(iData, function (i, dat) {
              //  console.log(dat);
                $('#itemName').append($('<option>', {
                    value: dat.itemCode,
                    text: dat.itemName
                }));
                
                $('#itemCode').append($('<option>', {
                    value: dat.itemCode,
                    text: dat.itemCode
                }));
            });
            $("#itemName").chosen();
            $("#itemCode").chosen();
    
}

function changeItemName(){
   var item;
   var cur=$("#itemName");
   var code=$("#itemCode");
   var itemCode=cur.val();   
   $.each(iData,function (i,dat){
       
      if(dat.itemCode==itemCode){
          item=dat;
          return false;
      } 
   });
   
    code.val(item.itemCode);
    code.trigger("chosen:updated");
    
}


function changeItemCode(id){
   var item;
   var itemName=$("#itemName");//select
   var code=$("#itemCode");//select
   var itemCode=code.val();   
   $.each(iData,function (i,dat){
       
      if(dat.itemCode==itemCode){
          item=dat;
          return false;
      } 
   });
   
    itemName.val(item.itemCode);
    itemName.trigger("chosen:updated");
    
}

$(function(){
   $("#submit").on('click',function(){
     
var fDate=$("#fromDate").val();
 var tDate=$("#toDate").val();
 
 var iid=$("#itemName").val();
 
 if(fDate.length!=10||tDate.length!=10){
     alert("Enter Dates");
     
     return;
 }
 if(iid==''){
     alert("Select an item!");
     
     return;
 }
 $(".sub").prop('disabled', true);
   $("#loading").show();
    $.ajax({
        url: 'stGetBasics',
        type: 'GET',
        data: {type: 'getTrackProduct',fDate:fDate,eDate:tDate,iid:iid},
        success: function (data, textStatus, jqXHR) {
            $(".sub").prop('disabled', false);
            $("#loading").hide();
            //console.log(data);
            if (data[0].status == "0") {
                $("#loading").hide();
                console.log(data[0].errorMessage);
                alert("Error");
                return;
            }
            //console.log(data);

            data.shift();
            table.destroy();
            loadTable(data);
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
            $("#loading").hide();
            $(".sub").prop('disabled', false);
            console.log(textStatus + " " + errorThrown);
        }
    });
       
   }); 
   
   $('#tableInvoice').on( 'click', '.view', function () {
        var data = table.row( $(this).parents('tr') ).data();
        
        window.open(data['id'],'_blank');

    } );
});

function loadTable(dat){
  
    
     table= $('#tableInvoice').DataTable( {
        "data": dat,
        "order": [[ 0, "desc" ]],
        "columns": [
            { "data": "type","defaultContent": "" },
            { "data": "date" },
            { "data": "invoice","defaultContent": "" },
            
            { "data": "batchName","defaultContent": "" },
            
            { "data": "qty","defaultContent": "" },
//            { "data": "status","defaultContent": "" },
                   {
      "data": null,
      "defaultContent": "<button class='btn view' >View</button>"
    }
        ],
        dom: 'Bfrtipl',
    buttons: [
              {
                        extend: 'excel',
                        text: 'Export Excel',
                        title: $("#itemName option:selected").text(),
                        
                        
                    }
    ]
    } );
}