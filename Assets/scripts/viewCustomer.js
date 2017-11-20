var dataJson,table;

function initial() {
    fillCustomer();

    
}
function fillCustomer() {
    

    $.ajax({
        url: 'stCustomer',
        type: 'GET',
        data: {type: 'getCustomerDetails'},
        success: function (data, textStatus, jqXHR) {
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return;
            }
             //            console.log(data);
             dataJson=data;
            data.shift();
             table=         $("#tableViewCustomer").DataTable( {
        "data": data,
        "columns": [
            { "data": "customerName" ,"defaultContent": "" },
            { "data": "gstin","defaultContent": "" },
            { "data": "country","defaultContent": "" },
            { "data": "stateName" ,"defaultContent": "" },
            { "data": "customerMobile" ,"defaultContent": ""},
            
            {
      "data": null,
      "defaultContent": "<button class='btn edit'>View/Edit</button>&nbsp;&nbsp;<button class='btn btn-danger delete'>Delete</button>"
    }
        ],
        dom: 'Bfrtip',
    buttons: [
         {
            extend: 'excel',
            text: 'Excel Export',
            title:'Customer Details',
           header:true,
           footer:true,
           pageSize:'A4',
         exportOptions: {
                    columns: [ 0, 1, 2,3,4 ]
                }  
        }
    ]
    } );
//            $.each(data, function (i, dat) {//console.log("succ loop");
//                var newRow = $("<tr><td></td><td></td><td></td><td></td><td></td><td hidden></td><td><button class='btn edit'>View/Edit</button>&nbsp;&nbsp;<button class='btn btn-danger delete'>Delete</button></td></tr>");
//                newRow.children().eq(0).text(dat.customerName);
//                newRow.children().eq(1).text(dat.gstin);
//                newRow.children().eq(2).text(dat.country);
//                //newRow.children().eq(3).text(dat.state);
//                newRow.children().eq(4).text(dat.customerMobile);
//                newRow.children().eq(5).text(dat.customerId);
//                  if(dat.state=="38"){
//                      newRow.children().eq(3).text("N.A");
//                  }else{
//                      $("#selectState").val(dat.state);
//                      var t=$( "#selectState option:selected" ).text();
//                        newRow.children().eq(3).text(t);
//                  }  
//                newRow.appendTo($("#tableViewCustomer"));
//            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
}


$(function (){
   $('#tableViewCustomer').on('click', '.edit', function () {
        var data = table.row( $(this).parents('tr') ).data();
        var id =data["customerId"];
        //var id = p.text();
        $("#customerId").val(id);
        $.each(dataJson, function (i, dat) {
            if(dat.customerId==id){
                $("#customerName").val(dat.customerName);
                $("#gstin").val(dat.gstin);
                $("#selectCountry").val(dat.country);
                $("#contactPerson").val(dat.contactPerson);
                $("#mobile").val(dat.mobile);
                $("#pan").val(dat.pan);
                $("#address").val(dat.address);
                $("#city").val(dat.city);
                $("#pincode").val(dat.pincode);
                $("#email").val(dat.email);
                $("#landline").val(dat.landline);
                if(dat.country!="INDIA"){
                      $("#selectState").val("");
                      $("#selectState").prop("disabled",true);
                  }else{
                      $("#selectState").val(dat.state);
                  }
            }
        });
        $("#modalUpdateCustomer").modal('show');
    });
    
    
    $("#selectCountry").on('change',function (){
    $("#selectState").prop("disabled",false);
   if($("#selectCountry").val()=="INDIA"){
       $("#selectState").val("");
   }else{
       $("#selectState").val("N.A");
       $("#selectState").prop("disabled",true);
   } 
});

$("#formUpdateCustomer").unbind('submit').bind('submit', function () {
        event.preventDefault();
       
        $(".sub").prop('disabled', true);
        var customerId=$("#customerId").val();
        $.ajax({
            url: "stCustomer",
            type: 'POST',
            data: $("#formUpdateCustomer").serialize() + "&type=updateCustomer&customerId="+customerId,
            success: function (data, textStatus, jqXHR) {
                if (data[0].status == "0") {
                    alert("Error");
                    console.log(data[0].errorMessage);
                    $(".sub").prop('disabled', false);
                    return;
                }

                alert("Details Updated");
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

$('#tableViewCustomer').on('click', '.delete', function () {
//        var p = $(this).closest('td').prev();
//        var id = p.text();
    var data = table.row( $(this).parents('tr') ).data();
        var id =data["customerId"];   
    if(id=="1"){
            alert("You cannot delete 'Default Customer'!");
            return;
        }
        var row=$(this);
        var c=confirm("You will loose all data associated with this customer. Confirm");
              if(c){
             //var year=$(this).closest('td').prev().prev().prev().prev().prev().prev().text();
             row.prop('disabled',true);
            $.ajax({
            url: "stCustomer",
            type: 'POST',
            data: {type:'deleteCustomer',customerId:id},
            success: function (data, textStatus, jqXHR) {
                if (data[0].status == "0") {
                    alert("Error");
                    console.log(data[0].errorMessage);
                    $(row).prop('disabled', false);
                    return;
                }

                alert("Customer Deleted");
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



});