$(document).ready(function () {
    var length = 0;
    $.ajax({
        url: "./admin/list_user.php",
        type: "POST",
        data: {number: 1},
        async: false,
        success: function (data) {
            var json = eval("(" + data + ")");
            $("table").html("<tr><th></th><th>用户名</th><th>昵称</th><th>手机号码</th><th>邮箱地址</th><th>注册日期</th><th>真实姓名</th><th>性别</th><th>出生日期</th><th></th></tr>");
            if (json['judge']) {
                for (var i in json) {
                    length++;
                }
                $(".first").html(1);
                $(".last").html((length - 2));
                $(".sum").html((json['sum']));
                if ((json['sum'] - 5) > 0) {
                    $(".nextPage").removeAttr("disabled");
                }
                var id = "user";
                for (var i = 0; i < (length - 2); i++) {
                    var name = "odd";
                    if ((i + 1) % 2 == 0) {
                        name = "even";
                    }
                    $(".table").append("<tr id='" + id + i + "' class='" + name + "'>" +
                        "<td><input name='check' type='checkbox' /></td>" +
                        "<td name='username'>" + json[i]['username'] + "</td>" +
                        "<td name='nickname'>" + json[i]['nickname'] + "</td>" +
                        "<td name='phone'>" + json[i]['phone'] + "</td>" +
                        "<td name='email'>" + json[i]['email'] + "</td>" +
                        "<td name='regist_day'>" + json[i]['regist_day'] + "</td>" +
                        "<td name='realname'>" + json[i]['realname'] + "</td>" +
                        "<td name='gender'>" + json[i]['gender'] + "</td>" +
                        "<td name='birthday'>" + json[i]['birthday'] + "</td>" +
                        "<td name='alter'><a>修改</a></td></tr>");
                }
            } else {
                $(".nowPage").html(0);
                $(".first").html(0);
                $(".last").html(0);
                $(".sum").html(0);
                alert("暂无数据");
            }
        }
    });

    for (var i = 0; i < (length - 1); i++) {
        var id = "user";
        $("#" + id + i + " td[name='alter'] a").on("click", {user: $("#" + id + i + " td[name='username']").html()}, function (event) {
            $.post("./admin/temp.php", {user: event.data.user}, function () {
                $("#indexBottomRight").load("update_user.html");
            });
        });
    }

    $(".topBtn[name='user_add']").click(function () {
        $("#indexBottomRight").load("add_user.html");
    });
    $(".topBtn[name='user_delete']").on("click", {length: length}, function (event) {
        var user = new Array();
        var message = "你确定要删除用户：";
        var id = "user";
        var judge = false;
        for (var i = 0, j = 0; i < (event.data.length - 2); i++) {
            if ($("#" + id + i + " input[name='check']").is(":checked")) {
                judge = true;
                user[j] = $("#" + id + i + " td[name='username']").html();
                message += user[j] + ",";
                j++;
            }
        }
        if (judge) {
            var len = message.lastIndexOf(",");
            message = message.substring(0, len);
            if (confirm(message)) {
                var temp = "{";
                for (var i in user) {
                    temp += i + ':"' + user[i] + '",';
                }
                var len = temp.lastIndexOf(",");
                temp = temp.substring(0, len);
                temp += "}";
                var input = eval("(" + temp + ")");
                $.ajax({
                    url: "./admin/delete_user.php",
                    type: "post",
                    data: input,
                    success: function (data) {
                        if (data) {
                            alert("删除成功");
                        } else {
                            alert("删除失败");
                        }
                        $("#user").click();
                    }
                });
            }
        } else {
            alert("请先选择要删除的用户");
        }
    });
    $(".topBtn[name='user_search']").on("click", {length: length}, function (event) {
        var id = "user";
        var judge = true;
        for (var i = 0; i < (event.data.length - 2); i++) {
            if ($("#" + id + i + " input[name='check']").is(":checked")) {
                judge = false;
                user = $("#" + id + i + " td[name='username']").html();
                $.post("./admin/temp.php",{user:user},function () {
                    $("#indexBottomRight").load("search_user.html");
                });
            }
        }
        if(judge){
            alert("请选择要查看的用户");
        }
    });

    $(".nextPage").click(function () {
        var number = parseInt($(".nowPage").html());
        if ($(".lastPage").attr("disabled") == "disabled") {
            $(".lastPage").removeAttr("disabled");
        }
        if (parseInt($(".sum").html()) - ((number + 1) * 5) <= 0) {
            $(".nextPage").attr("disabled", "disabled");
        }
        $.select(number + 1);

    });
    $(".lastPage").click(function () {
        var number = parseInt($(".nowPage").html());
        if (number == 2) {
            $(".lastPage").attr("disabled", "disabled");
        }
        if (parseInt($(".sum").html()) - ((number - 1) * 5) > 0) {
            $(".nextPage").removeAttr("disabled");
        }
        $.select(number - 1);
    });
});
$.extend({
    select: function (number) {
        var length = 0;
        $.ajax({
            url: "./admin/list_user.php",
            type: "POST",
            data: {number: number},
            async: false,
            success: function (data) {
                var json = eval("(" + data + ")");
                $("table").html("<tr><th></th><th>用户名</th><th>昵称</th><th>手机号码</th><th>邮箱地址</th><th>注册日期</th><th>真实姓名</th><th>性别</th><th>出生日期</th><th></th></tr>");
                if (json['judge']) {
                    for (var i in json) {
                        length++;
                    }
                    $(".nowPage").html(number);
                    $(".first").html((number - 1) * 5 + 1);
                    $(".last").html((number - 1) * 5 + (length - 2));
                    $(".sum").html((json['sum']));
                    var id = "user";
                    for (var i = 0; i < (length - 2); i++) {
                        var name = "odd";
                        if ((i + 1) % 2 == 0) {
                            name = "even";
                        }
                        $(".table").append("<tr id='" + id + i + "' class='" + name + "'>" +
                            "<td><input name='check' type='checkbox' /></td>" +
                            "<td name='username'>" + json[i]['username'] + "</td>" +
                            "<td name='nickname'>" + json[i]['nickname'] + "</td>" +
                            "<td name='phone'>" + json[i]['phone'] + "</td>" +
                            "<td name='email'>" + json[i]['email'] + "</td>" +
                            "<td name='regist_day'>" + json[i]['regist_day'] + "</td>" +
                            "<td name='realname'>" + json[i]['realname'] + "</td>" +
                            "<td name='gender'>" + json[i]['gender'] + "</td>" +
                            "<td name='birthday'>" + json[i]['birthday'] + "</td>" +
                            "<td name='alter'><a>修改</a></td></tr>");
                    }
                } else {
                    $(".first").html(0);
                    $(".last").html(0);
                    $(".sum").html(0);
                    alert("暂无数据");
                }
            }
        });
        for (var i = 0; i < (length - 1); i++) {
            var id = "user";
            $("#" + id + i + " td[name='alter'] a").on("click", {user: $("#" + id + i + " td[name='username']").html()}, function (event) {
                $.post("./admin/temp.php", {user: event.data.user}, function () {
                    $("#indexBottomRight").load("update_user.html");
                });
            });
        }
    }
});

$(function () {
    $(".topBtn[name='user_add']").mousedown(function () {
        var url = "./images/UI/add_click.jpg";
        $(".topBtn[name='user_add']").css("background-image", "url(" + url + ")");
        $(".topBtn[name='user_add']").css("color", "#337ab7");
        $(".topBtn[name='user_add']").css("font-weight", "bold");
    });
    $(".topBtn[name='user_delete']").mousedown(function () {
        var url = "./images/UI/delete_click.jpg";
        $(".topBtn[name='user_delete']").css("background-image", "url(" + url + ")");
        $(".topBtn[name='user_delete']").css("color", "#337ab7");
        $(".topBtn[name='user_delete']").css("font-weight", "bold");
    });
    $(".topBtn[name='user_search']").mousedown(function () {
        var url = "./images/UI/search_click.jpg";
        $(".topBtn[name='user_search']").css("background-image", "url(" + url + ")");
        $(".topBtn[name='user_search']").css("color", "#337ab7");
        $(".topBtn[name='user_search']").css("font-weight", "bold");
    });
    $(".topBtn[name='user_add']").mouseup(function () {
        var url = "./images/UI/add.jpg";
        $(".topBtn[name='user_add']").css("background-image", "url(" + url + ")");
        $(".topBtn[name='user_add']").css("color", "#ffffff");
        $(".topBtn[name='user_add']").css("font-weight", "normal");
    });
    $(".topBtn[name='user_delete']").mouseup(function () {
        var url = "./images/UI/delete.jpg";
        $(".topBtn[name='user_delete']").css("background-image", "url(" + url + ")");
        $(".topBtn[name='user_delete']").css("color", "#ffffff");
        $(".topBtn[name='user_delete']").css("font-weight", "normal");
    });
    $(".topBtn[name='user_search']").mouseup(function () {
        var url = "./images/UI/search.jpg";
        $(".topBtn[name='user_search']").css("background-image", "url(" + url + ")");
        $(".topBtn[name='user_search']").css("color", "#ffffff");
        $(".topBtn[name='user_search']").css("font-weight", "normal");
    });
});

