/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var prefixData;
var tcData;
var bankData;
function initial(){
    fillPrefix();
    //fillTandC();
    //fillBankDetails();
    
}

function fillPrefix(){
    $("#prefixSubmit").prop('disabled',true);
    $.ajax({
        url: "stInvoiceSetting",
        type: 'GET',
        data: {type: 'getInvoicePrefixEdit'},
        success: function (data, textStatus, jqXHR) {
            $("#prefixSubmit").prop('disabled',false);
                if (data[0].status=="0"){
                     alert("Error");
                     console.log(data[0].errorMessage);
                     $("#headInvoice").text("Invoice Number (error)");
                     return;
                 }
                 data.shift();
                 $("#headInvoice").text("Invoice Number");
                 $('#selectDocumentType').removeAttr('disabled');
                 $('#selectDocumentType').val("1");
                 $("#prefix").val(data[0].invoicePrefix);
                 $("#seriesStart").val(data[0].invoiceSeries);
                 prefixData=data;
                 //console.log(prefixData);
        },
        error: function (jqXHR, textStatus, errorThrown) 
        {
            $("#prefixSubmit").prop('disabled',true);
            alert("Error");
            $("#headInvoice").text("Invoice Number (error)");
            console.log(textStatus+" "+errorThrown);
        }
        
    });
      
 }
 function fillTandC(){
     $("#tcSubmit").prop('disabled',true);
     $.ajax({
        url: "stInvoiceSetting",
        type: 'GET',
        data: {type: 'getTandC'},
        success: function (data, textStatus, jqXHR) {
            $("#tcSubmit").prop('disabled',false);
                if (data[0].status=="0"){
                     alert("Error");
                     console.log(data[0].errorMessage);
                     $("#headTC").text("Terms and Conditions (error)");
                     return;
                 }
                 data.shift();
                 $("#headTC").text("Terms and Conditions");
                 $('#selectDocumentTypeTC').removeAttr('disabled');
                 $("#tc").val(data[0].fieldsValue);
                 $("#selectDocumentTypeTC").val("1");
                 tcData=data;
                 //console.log(prefixData);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#tcSubmit").prop('disabled',false);
            alert("Error");
            $("#headTC").text("Terms and Conditions");
            console.log(textStatus+" "+errorThrown);
        }
        
    });
    
 }
function fillBankDetails(){
    $("#bankSubmit").prop('disabled',true);
    $.ajax({
        url: "stInvoiceSetting",
        type: 'GET',
        data: {type: 'getBankDetail'},
        success: function (data, textStatus, jqXHR) {
            $("#bankSubmit").prop('disabled',false);
                if (data[0].status=="0"){
                     alert("Error");
                     console.log(data[0].errorMessage);
                     $("#headBank").text("Bank Details(error)");
                     return;
                 }
                 data.shift();
                 $("#headBank").text("Bank Details");
                 
                 $("#accountNumber").val(data[0].accountNumber);
                 $("#ifsc").val(data[0].ifsc);
                 $("#bankName").val(data[0].bankName);
                 $("#branchName").val(data[0].branchName);
                 if(data[0].salesView=="1"){
                     $("#checks-0").attr('checked','true');
                 }
                 if(data[0].bosView=="1"){
                     $("#checks-1").attr('checked','true');
                 }
                 //console.log(prefixData);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#bankSubmit").prop('disabled',false);
            alert("Error");
            $("#headBank").text("Bank Details (error)");
            console.log(textStatus+" "+errorThrown);
        }
        
    });
      
 }
 
 $(function (){
   $("#selectDocumentType").on('change',function(){
      var id=Number($("#selectDocumentType").val());
      $("#prefix").val(prefixData[id-1].invoicePrefix);
      $("#seriesStart").val(prefixData[id-1].invoiceSeries);
   });
   
   $("#selectDocumentTypeTC").on('change',function(){
       var id=Number($("#selectDocumentTypeTC").val());
       $("#tc").val(tcData[id-1].fieldsValue);
   });
   
   
   $("#formInvoiceNumber").on('submit',function (){
      event.preventDefault();
      $("#prefixSubmit").prop('disabled',true);
    $.ajax({
            url: "stInvoiceSetting",
            type: 'POST',
            data: $("#formInvoiceNumber").serialize()+ '&type=prefix',
            success: function (data, textStatus, jqXHR) {
                if (data[0].status=="0"){
                     alert("Error");
                     console.log(data[0].errorMessage);
            $("#prefixSubmit").prop('disabled',false);         
                     return;
                 }
            
                alert("Invoice Serial Number Updated");
            $("#prefixSubmit").prop('disabled',false);
                fillPrefix();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error while updating invoice serial number");
                console.log(textStatus+" "+errorThrown);
                $("#prefixSubmit").prop('disabled',false);
            }
    }); 
   });
   
   
   $("#formTC").on('submit',function (){
      event.preventDefault();
      $("#tcSubmit").prop('disabled',true);
    $.ajax({
            url: "stInvoiceSetting",
            type: 'POST',
            data: $("#formTC").serialize()+ '&type=tc',
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                if (data[0].status=="0"){
                     alert("Error");
                     console.log(data[0].errorMessage);
            $("#tcSubmit").prop('disabled',false);         
                     return;
                 }
            
                alert("Terms and Conditions Updated");
            $("#tcSubmit").prop('disabled',false);
                fillTandC();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error while updating terms and conditions!");
                console.log(textStatus+" "+errorThrown);
                $("#tcSubmit").prop('disabled',false);
            }
    }); 
   });
   
   
   $("#formBank").on('submit',function (){
      event.preventDefault();
      $("#bankSubmit").prop('disabled',true);
    $.ajax({
            url: "stInvoiceSetting",
            type: 'POST',
            data: $("#formBank").serialize()+ '&type=bankDetails',
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                if (data[0].status=="0"){
                     alert("Error");
                     console.log(data[0].errorMessage);
            $("#bankSubmit").prop('disabled',false);         
                     return;
                 }
            
                alert("bank Details Updated");
            $("#bankSubmit").prop('disabled',false);
                fillBankDetails();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error while updating bank details!");
                console.log(textStatus+" "+errorThrown);
                $("#bankSubmit").prop('disabled',false);
            }
    }); 
   });
   
 });
