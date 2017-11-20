var iData, bData;
var statusI = 0, statusB = 0;
function initial() {
    $('#invoiceDate').datepicker({dateFormat: 'yy-mm-dd'});
    $("#invoiceDate").datepicker().datepicker("setDate", new Date());

    fillItem();
    fillBatch();
}



function fillItem() {
    $.ajax({
        url: 'stGetBasics',
        type: 'GET',
        data: {type: 'allGoodItem'},
        success: function (data, textStatus, jqXHR) {

            if (data[0].status == "0") {
                alert("Error");
                //console.log(data[0].errorMessage);

                return;
            }
            console.log(data);

            data.shift();
            iData = data;
            //var id='1';
            loadItem();


            statusI = 1;
            checkStatus();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
}

function fillBatch() {
    $.ajax({
        url: 'stGetBasics',
        type: 'GET',
        data: {type: 'allBatch'},
        success: function (data, textStatus, jqXHR) {

            if (data[0].status == "0") {
                alert("Error");
                //console.log(data[0].errorMessage);

                return;
            }
            //console.log("batch");
            console.log(data);

            data.shift();
            bData = data;
            // var id='1';
            //loadBatch(id);
            //$("#batchName1").chosen();

            statusB = 1;
            checkStatus();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
}

function loadItem() {
    $('#itemName').append($('<option>', {
        value: "",
        text: "Select"
    }));

    $('#itemCode').append($('<option>', {
        value: "",
        text: "Select"
    }));
       $('#fpItemName').append($('<option>', {
        value: "",
        text: "Select"
    }));

    $('#fpItemCode').append($('<option>', {
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
        
        $('#fpItemName').append($('<option>', {
            value: dat.itemCode,
            text: dat.itemName
        }));

        $('#fpItemCode').append($('<option>', {
            value: dat.itemCode,
            text: dat.itemCode
        }));
    });

    $("#itemName").chosen();
    $("#itemCode").chosen();
    
    
    $("#fpItemName").chosen();
    $("#fpItemCode").chosen();

}

function loadBatch(itemId) {
    $("#batchName").empty();
    var f = false;
    $.each(bData, function (i, dat) {
//                console.log(itemId+" "+dat.itemId);
        if (dat.itemId == itemId) {
            f = true;
            $('#batchName').append($('<option>', {
                value: dat.batchId,
                text: dat.batchName
            }));
        }
        else if (f == true) {
            return false;
        }
    });
    $("#batchName").chosen();
    $("#batchName").trigger("chosen:updated");
    changeBatch();
}

function loadFPBatch(itemId) {
    $("#fpBatchName").empty();
    var f = false;
    $.each(bData, function (i, dat) {
//                console.log(itemId+" "+dat.itemId);
        if (dat.itemId == itemId) {
            f = true;
            $('#fpBatchName').append($('<option>', {
                value: dat.batchId,
                text: dat.batchName
            }));
        }
        else if (f == true) {
            return false;
        }
    });
    $("#fpBatchName").chosen();
    $("#fpBatchName").trigger("chosen:updated");
    changeFPBatch();
}

function changeFPBatch() {
    var batchId = $("#fpBatchName").val();
    var batch;
    $.each(bData, function (i, dat) {
        //  console.log(batchId+" "+dat.batchId);
        if (dat.batchId == batchId) {
            batch = dat;
            return false;
        }
    });
    
    var type;
    $.each(iData, function (i, dat) {
        //  console.log(batchId+" "+dat.batchId);
        if (dat.itemId == batch.itemId) {
            type = dat.itemType;
            return false;
        }
    });
}

function changeBatch() {
    var batchId = $("#batchName").val();
    var batch;
    $.each(bData, function (i, dat) {
        //  console.log(batchId+" "+dat.batchId);
        if (dat.batchId == batchId) {
            batch = dat;
            return false;
        }
    });
    
    var type;
    $.each(iData, function (i, dat) {
        //  console.log(batchId+" "+dat.batchId);
        if (dat.itemId == batch.itemId) {
            type = dat.itemType;
            return false;
        }
    });
    if (type == "1")
        $("#stock").text(batch.stock);
    else
        $("#stock").text("N.A");
}


function checkStatus() {
    var ch = Number(statusB) + Number(statusI);
    if (ch == 2)
        $("#loading").hide();
}



function changeItemName() {
    var item;
    var cur = $("#itemName");
    var code = $("#itemCode");
    var itemCode = cur.val();
    $.each(iData, function (i, dat) {

        if (dat.itemCode == itemCode) {
            item = dat;
            return false;
        }
    });

    code.val(item.itemCode);
    code.trigger("chosen:updated");
    loadBatch(item.itemId);
}


function changeFPItemName() {
    var item;
    var cur = $("#fpItemName");
    var code = $("#fpItemCode");
    var itemCode = cur.val();
    $.each(iData, function (i, dat) {

        if (dat.itemCode == itemCode) {
            item = dat;
            return false;
        }
    });

    code.val(item.itemCode);
    code.trigger("chosen:updated");
    loadFPBatch(item.itemId);
}

function changeItemCode(id) {
    var item;
    var itemName = $("#itemName");//select
    var code = $("#itemCode");//select
    var itemCode = code.val();
    $.each(iData, function (i, dat) {

        if (dat.itemCode == itemCode) {
            item = dat;
            return false;
        }
    });

    itemName.val(item.itemCode);
    itemName.trigger("chosen:updated");
    loadBatch(item.itemId);
}

function changeFPItemCode(id) {
    var item;
    var itemName = $("#fpItemName");//select
    var code = $("#fpItemCode");//select
    var itemCode = code.val();
    $.each(iData, function (i, dat) {

        if (dat.itemCode == itemCode) {
            item = dat;
            return false;
        }
    });

    itemName.val(item.itemCode);
    itemName.trigger("chosen:updated");
    loadFPBatch(item.itemId);
}

function addItem(item, batch, qty) {
    var rowCount = $('#tableItem tr').length;
    
    
    var newRow = $("<tr><td></td><td></td><td></td><td></td><td></td><td hidden></td><td><a><span class='removeItem glyphicon glyphicon-remove'></span></a></td</tr>")
    newRow.children().eq(0).text(rowCount);
    newRow.children().eq(1).text(item.itemCode);
    newRow.children().eq(2).text(item.itemName);
    newRow.children().eq(3).text(batch.batchName);
    newRow.children().eq(4).text(qty);
    newRow.children().eq(5).text(batch.batchId);
    $("#tableItem").append(newRow);
    $("#itemCode").val("");
    $("#itemName").val("");
    $("#batchName").empty();
    $("#itemName").trigger("chosen:updated");
    $("#itemCode").trigger("chosen:updated");
    $("#batchName").trigger("chosen:updated");
    $("#stock").text("-");
    $("#qty").val(0);
    
}



function assignSl() {
    $('#tableItem tr').each(function (index) {

        var t = $(this).find('td:first');
        //console.log(t.text());
        t.text(index);
    });
}

$(function () {

    //$(".chosen-single").chosen();
  
    $("#addStock").on('click', function () {
        //alert("Decrease Quantity");
        //alert($("#itemCode").val());
        if ($("#itemName").val() == "") {
            alert("Select Item");
            return;
        }
        var item, batch;
        $.each(iData, function (i, dat) {
            if (dat.itemCode == $("#itemCode").val()) {
                item = dat;
                return false;
            }
        });

        $.each(bData, function (i, dat) {
            if (dat.batchId == $("#batchName").val()) {
                batch = dat;
                return false;
            }
        });
        //console.log(item.itemName+" "+batch.batchName);
        if (item.itemType == "1") {
            if (Number($("#qty").val()) > Number($("#stock").text())) {
                alert("Decrease Quantity");
                return;
            }
        }
        addItem(item, batch, $("#qty").val());
    });

    $('#tableItem').on('click', '.removeItem', function () {
        $(this).closest('tr').remove();
        assignSl();
        
    });

    $("#buttonSave").on('click', function () {
        $("#buttonSave").prop('disabled', true);
        var val = validate();
        if (val == false) {
            $("#buttonSave").prop('disabled', false);
            return;
        }
        var invoiceDate = $("#invoiceDate").val();
        var fpBatch= $("#fpBatchName").val();
        var fpQty= $("#fpQty").val();
        var notes = $("#notes").val();
       
       
        var jsonItem = {
            item: []
        };
        $('#tableItem tr').each(function (index) {

            var batchId = $(this).find('td:nth-child(6)').text();
            var qty = $(this).find('td:nth-child(5)').text();
       
            var obj = {"batchId": batchId, "qty": qty};
            jsonItem.item.push(obj);

        });
        jsonItem.item.shift();
        console.log(jsonItem);
        $.ajax({
            url: "stSynthesize",
            type: 'POST',
            data: {fpBatch:fpBatch,fpQty:fpQty,invoiceDate: invoiceDate, notes: notes,items: JSON.stringify(jsonItem)},
            success: function (data, textStatus, jqXHR) {
                if (data[0].status == "0") {
                    alert("Error");
                    console.log(data[0].errorMessage);
                    $("#buttonSave").prop('disabled', false);
                    return;
                }
                alert("saved");
                console.log(data[0]);
                window.location = "viewSynthesize.jsp?sid=" + data[0].salesId;
                $("#buttonSave").prop('disabled', false);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error");
                console.log(textStatus + " " + errorThrown);
                $("#buttonSave").prop('disabled', false);
            }


        });
        //console.log(jsonItem);
    });

    $("#clear").on('click', function () {
        
        $("#tableItem tbody").empty();
    });
});

function validate() {
    if ($("#invoiceDate").val().length != 10) {
        alert("Enter valid invoice date");
        return false;
    }
    if ($('#tableItem tr').length == 1) {
        alert("Add Item");
        return false;
    }
   // alert($("#fpBatchName").val());
   if($("#fpBatchName").val()==0){
        alert("Select Final Product");
        return false;
   }
   if($("#fpBatchName").val()==null){
        alert("Select Final Product");
        return false;
   }
   if($("#fpQty").val()==0){
        alert("Enter Final Product Quantity");
        return false;
   }
    return true;
}