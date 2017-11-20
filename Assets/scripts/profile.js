 
 function initial(){
     //console.log("inside");
     
            
            if (status == "1") {
                alert("Data Updated");
            } else if (status == "2") {
                alert("Error"+status);
            }
//     
// $.ajax({
//                url: 'stGetBasics',
//                type: 'GET',
//                data: {type: 'getState'},
//                success: function (data, textStatus, jqXHR) {
//                 if (data[0].status=="0"){
//                     alert("Error");
//                     console.log(data[0].errorMessage);
//                     $("#loading").hide();
//                     return;
//                 }   
//                 var j=Number(0);
//                    $.each(data, function (index, dat) {//alert(dat.rid);
//                        if(j>0){
//                        $('#selectState').append($('<option>', {
//                            value: dat.stateId,
//                            text: dat.stateName
//                        }));
//                }j++;
//                    });
//                     getProfile();
//                },
//                error: function (jqXHR, textStatus, errorThrown) {
//                        alert("Error");
//                        $("#loading").hide();
//                    }
//            });  

    getProfile();
 }
 
 function getProfile(){
 $.ajax({
                url: 'stGetBasics',
                type: 'GET',
                data: {type: 'getCompanyProfile'},
                success: function (data, textStatus, jqXHR) {
                 if (data[0].status=="0"){
                     alert("Error");
                     console.log(data[0].errorMessage);
                     $("#loading").hide();
                     return;
                 }
                 $("#name").val(data[1].companyName);
                 $("#gstin").val(data[1].companyGstin);
                 $("#address").val(data[1].companyAddress);
                 $("#city").val(data[1].companyCity);
                 $("#pincode").val(data[1].companyPin);
                 $("#selectState").val(data[1].companyStateId);   
                 $("#phone").val(data[1].companyPhone);
                 $("#email").val(data[1].companyEmail);
                 $("#website").val(data[1].companyWebsite);
                      $("#loading").hide();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                        alert("Error");
                        $("#loading").hide();
                    }
            });  
    
     
 }
 
 function PreviewImage() {
        var oFReader = new FileReader();
        oFReader.readAsDataURL(document.getElementById("imageUpload").files[0]);

        oFReader.onload = function (oFREvent) {
            document.getElementById("imagePreview").src = oFREvent.target.result;
        };
    };
  