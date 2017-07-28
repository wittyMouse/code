$(function () {
    $.post("./admin/index.php", function (data) {
        var json = eval("(" + data + ")");
        if (!json['judge']) {
            var url = location.href;
            var length = url.lastIndexOf("/");
            url=url.substring(0,length);
            url = url+"/login.html";
            window.location = url;
        } else {
            var message = json['message'];
            $("#indexWelcome a").text(message);
        }
    });
});

$(function () {
    $("#indexCancel").click(function () {
        $.post("./admin/index_cancel.php", function (data) {
            if (data) {
                var url = location.href;
                var length = url.lastIndexOf("/");
                url=url.substring(0,length);
                url = url+"/login.html";
                window.location = url;
            }
        });
    });
});

$(function () {
    $("#indexBottomRight").load("list_user.html");

    $("#indexTitle").click(function () {
        $.session();
        $("#indexBottomRight").load("list_user.html");
    });
    $("#admin").click(function () {
        $.session();
        $("#indexBottomRight").load("list_admin.html");
    });
    $("#user").click(function () {
        $.session();
        $("#indexBottomRight").load("list_user.html");
    });
    $("#classify").click(function () {
        $.session();
        $("#indexBottomRight").load("list_classify.html");
    });
    $("#goods").click(function () {
        $.session();
        $("#indexBottomRight").load("list_goods.html");
    });
    $("#list").click(function(){
        $.session();
        $("#indexBottomRight").load("list_list.html");
    });


});

$.extend({
    session:function () {
        $.post("./admin/index.php", function (data) {
            var json = eval("(" + data + ")");
            if (!json['judge']) {
                var url = location.href;
                var length = url.lastIndexOf("/");
                url=url.substring(0,length);
                url = url+"/login.html";
                window.location = url;
            } else {
                var message = json['message'];
                $("#indexWelcome a").text(message);
            }
        });
    }
});