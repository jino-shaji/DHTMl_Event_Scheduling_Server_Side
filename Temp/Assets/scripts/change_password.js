$(function(){ 
   $("#passForm").submit(function(){
       event.preventDefault();
       $("#pp").text("");
       $("#oldp").text("");
       var p1=$("#newPassword").val();
       var p2=$("#confirmPassword").val();
       //console.log(p1+" "+p2);
        if(p1!=p2){
            $("#pp").text("Passwords Do Not Match!");
            $("#newPassword").val("");
            $("#confirmPassword").val("");
            return false;
        }
        $( "#save" ).prop( "disabled", true );
        $.ajax({
            url: "stChangePassword",
            type: 'POST',
            data: $("#passForm").serialize(),
            success: function (data){
                switch (data){
                    case "1":   $("#pp").text("Passwords Do Not Match!");
                                $("#newPassword").val("");$("#newPassword").focus();
                                $("#confirmPassword").val("");
                                break;
                                
                    case "2":$("#oldp").text("Password Do Not Match!");
                                 $("#newPassword").val("");
                                $("#confirmPassword").val("");
                                 $("#cpassword").val("");$("#cpassword").focus();
                                break;
                                
                    case "3": alert("Unexpected Error");
                                $("#oldp").text("Passwords Do Not Match!");
                                 $("#newPassword").val("");
                                $("#confirmPassword").val("");
                                 $("#cpassword").val("");
                              
                                break;
                                                    
                    case "4": alert("Password Updated");
                                
                                 $("#newPassword").val("");
                                $("#confirmPassword").val("");
                                 $("#cpassword").val("");
                                $("#cpassword").focus();
                                break;
                }
                $( "#save" ).prop( "disabled", false);
            },
            error: function(a,s,d){
                alert(s+" "+d);
                $( "#save" ).prop( "disabled",false);
            }
        });
        
   }); 
   });



