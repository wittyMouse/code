$(function () {
    $(".return").click(function () {
        $.post("./admin/delete.php",{list:0});
        $("#list").click();
    });
    $.post("./admin/search_list.php",function (data) {
        var json = eval("(" + data + ")");
        if(json['judge']){
            $("#list_id").html(json['list']['list_id']);
            $("#status_name").html(json['list']['status_name']);
            $("#username").html(json['list']['username']);
            $("#sum_price").html(json['list']['sum_price']);
            $("#delivery").html(json['list']['delivery']);
            $("#arrive_time").html(json['list']['arrive_time']);
            var x = 0;
            for (var i in json["child_list"]) {
                x++;
            }
            for(var i = 0;i<x;i++){
                $(".address tr:eq("+(i+1)+") td:eq(0)").html(json['child_list'][i]['goods_name']);
                $(".address tr:eq("+(i+1)+") td:eq(1)").html(json['child_list'][i]['goods_count']);
                $(".address tr:eq("+(i+1)+") td:eq(2)").html(json['child_list'][i]['title_price']);

            }
        }else{
            alert("没有数据");
        }
    });
});