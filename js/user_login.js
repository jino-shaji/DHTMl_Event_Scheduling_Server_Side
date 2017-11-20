/**
 * Created by intellyze labs on 04-05-2017.
 * Author      : JINO SHAJI
 * Posted Date : 09-05-2017
 * Company Name: Intellyze Labs

 */

$(document).on("submit","#frmlogin",function(e){
    
e.preventDefault();
    var userName = $("#txtUserName").val();
    var password = $("#txtPassword").val();
  //  var remember_meVal = $("#remember_me").prop('checked');
if(userName==""){
    swal("Warning!", "Enter Username", "warning");
    $("#txtUserName").focus();
    return;
}
else if(password==""){
    swal("Warning!", "Enter Password", "warning");
    $("#txtPassword").focus();
    return;
}

    var value = {
        username: userName,
        password: password
    };

   // console.log(value);
    var request=  $.ajax(
        {
            url:          "api/v1/User_Login.php",
            cache:        false,
            data : value,
            type:         'POST',
            success: function(data, textStatus, jqXHR)
            {
                //console.log(data);
               var data = jQuery.parseJSON(data);
                if(!data.error) {
                    $("#txtUserName").val("");
                    $("#txtPassword").val("");
                     $("#txtUserName").focus();
                     window.location.replace("user.php");
                }
                else{
                    swal("Login Failed!", "Invalid username or password", "error");
                    return;
                }
            },
            error: function(jqXHR, textStatus, errorThrown)
            {
                swal("Error!", textStatus, "error");
            }
        });

});



$(document).on("submit","#FrmPasswrd",function(e){
    
e.preventDefault();
var cpassword = $("#cpassword").val();
var hiddusrId = $("#hiddusrId").val();
    var newPassword = $("#newPassword").val();
    var confirmPassword = $("#confirmPassword").val();
  //  var remember_meVal = $("#remember_me").prop('checked');
if(cpassword==""){
    swal("Warning!", "Enter Old Password", "warning");
    $("#cpassword").focus();
    return;
}
if(newPassword==""){
    swal("Warning!", "Enter New Password", "warning");
    $("#newPassword").focus();
    return;
}
else if(confirmPassword==""){
    swal("Warning!", "Enter Confirm Password", "warning");
    $("#confirmPassword").focus();
    return;
}
else if(confirmPassword!=newPassword){
    swal("Warning!", "New Password and confirm password mismatch", "warning");
    $("#confirmPassword").focus();
    return;
}
    var value = {
        userId: hiddusrId,
        password: confirmPassword,
        Oldpassword:cpassword
    };

    console.log(JSON.stringify(value));
    var request=  $.ajax(
        {
            url:          "api/v1/updateLogin",
            cache:        false,
            data :JSON.stringify(value),
            type:         'POST',
            success: function(data, textStatus, jqXHR)
            {
                console.log(data);
              // var data = jQuery.parseJSON(data);
                if(!data.error) {
                    $("#confirmPassword").val("");
                    $("#cpassword").val("");
                    $("#newPassword").val("");
                    swal("Password Changed!", data.message, "success");
                    // window.location.replace("index.php");
                }
                else{
                    swal("Warning!", data.message, "error");
                    return;
                }
            },
            error: function(jqXHR, textStatus, errorThrown)
            {
                swal("Error!", textStatus, "error");
            }
        });

});