$(function (){
    $.ajax({
        url: "./admin/select_model.php",
        type: "POST",
        async: false,
        success: function (data) {
            var json = eval("(" + data + ")");
            var length = 0;
            for(var i in json){
                length++;
            }
            for(var i=0;i<length;i++){
                $("#model").append("<option value="+json[i]+">"+json[i]+"</option>");
            }
        }
    });
});