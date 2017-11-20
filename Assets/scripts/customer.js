$(function (){
$("#selectCountry").on('change',function (){
    $("#selectState").prop("disabled",false);
   if($("#selectCountry").val()=="INDIA"){
       $("#selectState").val("");
   }else{
       $("#selectState").val("N.A");
       $("#selectState").prop("disabled",true);
   } 
});

  $("#formNewCustomer").unbind('submit').bind('submit', function () {
        event.preventDefault();
       
        $(".sub").prop('disabled', true);
        $.ajax({
            url: "stCustomer",
            type: 'POST',
            data: $("#formNewCustomer").serialize() + "&type=newCustomer",
            success: function (data, textStatus, jqXHR) {
                if (data[0].status == "0") {
                    alert("Error");
                    console.log(data[0].errorMessage);
                    $(".sub").prop('disabled', false);
                    return;
                }

                alert("Customer/Vendor Added");
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


