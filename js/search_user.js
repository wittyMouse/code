$(function () {
   $(".return").click(function () {
       $.post("./admin/delete.php",{user:0});
       $("#user").click();
   });
   $.post("./admin/search_user.php",function (data) {
       var json = eval("(" + data + ")");
       if(json['judge']){
           $("#username").html(json['user']['username']);
           $("#realname").html(json['user']['realname']);
           $("#nickname").html(json['user']['nickname']);
           $("#gender").html(json['user']['gender']);
           $("#phone").html(json['user']['phone']);
           $("#birthday").html(json['user']['birthday']);
           $("#email").html(json['user']['email']);
           $("#regist_day").html(json['user']['regist_day']);
           var x = 0;
           for (var i in json["address"]) {
               x++;
           }
           for(var i = 0;i<x;i++){
               $(".address tr:eq("+(i+1)+") td:eq(0)").html(json['address'][i]['address_id']);
               $(".address tr:eq("+(i+1)+") td:eq(1)").html(json['address'][i]['consignee']);
               $(".address tr:eq("+(i+1)+") td:eq(2)").html(json['address'][i]['area']);
               $(".address tr:eq("+(i+1)+") td:eq(3)").html(json['address'][i]['detailed']);
               $(".address tr:eq("+(i+1)+") td:eq(4)").html(json['address'][i]['phone']);

           }
       }else{
           alert("没有数据");
       }
   });
});