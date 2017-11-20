
demo ={
    initDashboardPageCharts: function(dat,chartName) {

        var dataEmailsSubscriptionChart = {
            labels: ['Sales', 'Purchase', 'Export', 'BOS','Receipts'],
            series: [
               dat

            ],
            
        };
        var pluginOp={
  low: 0,
  high: 8,
  fullWidth: true,
  plugins: [
    Chartist.plugins.tooltip()
  ]
};
        var optionsEmailsSubscriptionChart = {
            axisX: {
                showGrid: false
            },
            height: '300px',
  
            
            chartPadding: {
                top: 0,
                right: 5,
                bottom: 0,
                left: 35
            },plugins: [
    Chartist.plugins.tooltip()
  ]
        };
        var responsiveOptions = [
            ['screen and (max-width: 640px)', {
                seriesBarDistance: 5,
                axisX: {
                    labelInterpolationFnc: function(value) {
                        return value[0];
                    }
                }
            }]
        ];
        
         Chartist.Bar(chartName, dataEmailsSubscriptionChart,optionsEmailsSubscriptionChart , responsiveOptions);

        //start animation for the Emails Subscription Chart
//        md.startAnimationForBarChart(emailsSubscriptionChart);

    }
    }
 $(function (){
     $('#fromDate').datepicker({dateFormat: 'yy-mm-dd'}).datepicker("setDate", -30);
        $('#toDate').datepicker({dateFormat: 'yy-mm-dd'}).datepicker("setDate",new Date());

    getData($("#fromDate").val(),$("#toDate").val());
     
 $('#filter').on('click',function(){
     if($("#fromDate").val().length!=10||$("#toDate").val().length!=10){
         alert("Enter Dates!");
         return ;
     }
        getData($("#fromDate").val(),$("#toDate").val());
 });
     
     $("#download").on('click',function(){
         
    $("#loading").show();
    $("#download").prop('disabled', true);
    $.ajax({
        url: 'stExcel',
        type: 'GET',
        data: {fdate:$("#fromDate").val(),edate:$("#toDate").val()},
        success: function (data, textStatus, jqXHR) {
                  console.log("data"+data[0].status);   
                    $("#loading").hide();
                    $("#download").prop('disabled', false);
            if (data[0].status == "0") {
                alert("Error");
       console.log(data[0].errorMessage);
                return;
            }
        
        window.open("http://hanstrust.com/gst/gstr1.xlsx");

        },
        error: function (a, textStatus, errorThrown) {
            alert("Error");
            $("#loading").hide();
            $("#download").prop('disabled', false);
            console.log(textStatus + "  " + errorThrown);
        }
    });
});
     
 });
 function getData(fromDate,toDate){
        $("#loading").show();
        $("#filter").prop('disabled', true);
    $.ajax({
        url: 'stExcel',
        type: 'POST',
        data: {fromDate:fromDate,toDate:toDate},
        success: function (data, textStatus, jqXHR) {
                    $("#loading").hide();
                    $("#filter").prop('disabled', false);
            if (data[0].status == "0") {
                alert("Error");
                
                return;
            }
//console.log(data);
//data.slice;


demo.initDashboardPageCharts(data[1].count,'#countChart');
$("#pCount").html("Total number of active invoices in the time period <b>("+data[1].count.toString()+" )");

demo.initDashboardPageCharts(data[1].invoice,'#invoiceChart');
$("#pInvoice").html("Sum of invoices inclusive of taxes <b>("+data[1].invoice.toString()+" )");
        
demo.initDashboardPageCharts(data[1].tax,'#taxChart');
$("#pTax").html("Net tax collected <b>("+data[1].tax.toString()+" )");

demo.initDashboardPageCharts(data[1].cess,'#cessChart');
$("#pCess").html("Net CESS collected <b>("+data[1].cess.toString()+" )");

        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
            $("#filter").prop('disabled', false);
        }
    });
}     
