$(document).ready(function () {
    var length = 0;
    $.ajax({
        url: "./admin/list_admin.php",
        type: "POST",
        data: {number: 1},
        async: false,
        success: function (data) {
            var json = eval("(" + data + ")");
            $("table").html("<tr><th></th><th>管理员名</th><th>手机号码</th><th>邮箱地址</th><th>注册日期</th><th></th></tr>");
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
                var id = "admin";
                for (var i = 0; i < (length - 2); i++) {
                    var name = "odd";
                    if ((i + 1) % 2 == 0) {
                        name = "even";
                    }
                    $(".table").append("<tr id='" + id + i + "' class='" + name + "'>" +
                        "<td><input name='check' type='checkbox' /></td>" +
                        "<td name='admin'>" + json[i]['admin'] + "</td>" +
                        "<td name='phone'>" + json[i]['phone'] + "</td>" +
                        "<td name='email'>" + json[i]['email'] + "</td>" +
                        "<td name='regist_day'>" + json[i]['regist_day'] + "</td>" +
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
        var id = "admin";
        $("#" + id + i + " td[name='alter'] a").on("click", {admin: $("#" + id + i + " td[name='admin']").html()}, function (event) {
            $.post("./admin/temp.php", {admin: event.data.admin}, function () {
                $("#indexBottomRight").load("update_admin.html");
            });
        });
    }

    $(".topBtn[name='admin_add']").click(function () {
        $("#indexBottomRight").load("add_admin.html");
    });
    $(".topBtn[name='admin_delete']").on("click", {length: length}, function (event) {
        var admin = new Array();
        var message = "你确定要删除管理员：";
        var id = "admin";
        var judge = false;
        for (var i = 0, j = 0; i < (event.data.length - 2); i++) {
            if ($("#" + id + i + " input[name='check']").is(":checked")) {
                judge = true;
                admin[j] = $("#" + id + i + " td[name='admin']").html();
                message += admin[j] + ",";
                j++;
            }
        }
        if (judge) {
            var len = message.lastIndexOf(",");
            message = message.substring(0, len);
            if (confirm(message)) {
                var temp = "{";
                for (var i in admin) {
                    temp += i + ':"' + admin[i] + '",';
                }
                var len = temp.lastIndexOf(",");
                temp = temp.substring(0, len);
                temp += "}";
                var input = eval("(" + temp + ")");
                $.ajax({
                    url: "./admin/delete_admin.php",
                    type: "post",
                    data: input,
                    success: function (data) {
                        if (data) {
                            alert("删除成功");
                        } else {
                            alert("删除失败");
                        }
                        $("#admin").click();
                    }
                });
            }
        } else {
            alert("请先选择要删除的管理员");
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
            url: "./admin/list_admin.php",
            type: "POST",
            data: {number: number},
            async: false,
            success: function (data) {
                var json = eval("(" + data + ")");
                $("table").html("<tr><th></th><th>管理员名</th><th>手机号码</th><th>邮箱地址</th><th>注册日期</th><th></th></tr>");
                if (json['judge']) {
                    for (var i in json) {
                        length++;
                    }
                    $(".nowPage").html(number);
                    $(".first").html((number - 1) * 5 + 1);
                    $(".last").html((number - 1) * 5 + (length - 2));
                    $(".sum").html((json['sum']));
                    var id = "admin";
                    for (var i = 0; i < (length - 2); i++) {
                        var name = "odd";
                        if ((i + 1) % 2 == 0) {
                            name = "even";
                        }
                        $(".table").append("<tr id='" + id + i + "' class='" + name + "'>" +
                            "<td><input name='check' type='checkbox' /></td>" +
                            "<td name='admin'>" + json[i]['admin'] + "</td>" +
                            "<td name='phone'>" + json[i]['phone'] + "</td>" +
                            "<td name='email'>" + json[i]['email'] + "</td>" +
                            "<td name='regist_day'>" + json[i]['regist_day'] + "</td>" +
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
            var id = "admin";
            $("#" + id + i + " td[name='alter'] a").on("click", {admin: $("#" + id + i + " td[name='admin']").html()}, function (event) {
                $.post("./admin/temp.php", {admin: event.data.admin}, function () {
                    $("#indexBottomRight").load("update_admin.html");
                });
            });
        }
    }
});

$(function () {
    $(".topBtn[name='admin_add']").mousedown(function () {
        var url = "./images/UI/add_click.jpg";
        $(".topBtn[name='admin_add']").css("background-image", "url(" + url + ")");
        $(".topBtn[name='admin_add']").css("color", "#337ab7");
        $(".topBtn[name='admin_add']").css("font-weight", "bold");
    });
    $(".topBtn[name='admin_delete']").mousedown(function () {
        var url = "./images/UI/delete_click.jpg";
        $(".topBtn[name='admin_delete']").css("background-image", "url(" + url + ")");
        $(".topBtn[name='admin_delete']").css("color", "#337ab7");
        $(".topBtn[name='admin_delete']").css("font-weight", "bold");
    });
    $(".topBtn[name='admin_add']").mouseup(function () {
        var url = "./images/UI/add.jpg";
        $(".topBtn[name='admin_add']").css("background-image", "url(" + url + ")");
        $(".topBtn[name='admin_add']").css("color", "#ffffff");
        $(".topBtn[name='admin_add']").css("font-weight", "normal");
    });
    $(".topBtn[name='admin_delete']").mouseup(function () {
        var url = "./images/UI/delete.jpg";
        $(".topBtn[name='admin_delete']").css("background-image", "url(" + url + ")");
        $(".topBtn[name='admin_delete']").css("color", "#ffffff");
        $(".topBtn[name='admin_delete']").css("font-weight", "normal");
    });
});

