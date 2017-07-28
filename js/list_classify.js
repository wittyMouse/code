$(document).ready(function () {
    var length = 0;
    $.ajax({
        url: "./admin/list_classify.php",
        type: "POST",
        data: {number: 1},
        async: false,
        success: function (data) {
            var json = eval("(" + data + ")");
            $("table").html("<tr><th></th><th>分类号</th><th>分类名</th><th>子分类号</th><th>添加日期</th><th></th></tr>");
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
                var id = "classify";
                for (var i = 0; i < (length - 2); i++) {
                    var name = "odd";
                    if ((i + 1) % 2 == 0) {
                        name = "even";
                    }
                    $(".table").append("<tr id='" + id + i + "' class='" + name + "'>" +
                        "<td><input name='check' type='checkbox' /></td>" +
                        "<td name='classify_id'>" + json[i]['classify_id'] + "</td>" +
                        "<td name='classify_name'>" + json[i]['classify_name'] + "</td>" +
                        "<td name='child_classify_id'>" + json[i]['child_classify_id'] + "</td>" +
                        "<td name='add_day'>" + json[i]['add_day'] + "</td>" +
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
        var id = "classify";
        $("#" + id + i + " td[name='alter'] a").on("click", {classify: $("#" + id + i + " td[name='classify_name']").html()}, function (event) {
            $.post("./admin/temp.php", {classify: event.data.classify}, function () {
                $("#indexBottomRight").load("update_classify.html");
            });
        });
    }

    $(".topBtn[name='classify_add']").click(function () {
        $("#indexBottomRight").load("add_classify.html");
    });
    $(".topBtn[name='classify_delete']").on("click", {length: length}, function (event) {
        var classify = new Array();
        var message = "你确定要删除分类：";
        var id = "classify";
        var judge = false;
        for (var i = 0, j = 0; i < (event.data.length - 2); i++) {
            if ($("#" + id + i + " input[name='check']").is(":checked")) {
                judge = true;
                classify[j] = $("#" + id + i + " td[name='classify_name']").html();
                message += classify[j] + ",";
                j++;
            }
        }
        if (judge) {
            var len = message.lastIndexOf(",");
            message = message.substring(0, len);
            if (confirm(message)) {
                var temp = "{";
                for (var i in classify) {
                    temp += i + ':"' + classify[i] + '",';
                }
                var len = temp.lastIndexOf(",");
                temp = temp.substring(0, len);
                temp += "}";
                var input = eval("(" + temp + ")");
                $.ajax({
                    url: "./admin/delete_classify.php",
                    type: "post",
                    data: input,
                    success: function (data) {
                        if (data) {
                            alert("删除成功");
                        } else {
                            alert("删除失败");
                        }
                        $("#classify").click();
                    }
                });
            }
        } else {
            alert("请先选择要删除的分类");
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
            url: "./admin/list_classify.php",
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
                    var id = "classify";
                    for (var i = 0; i < (length - 2); i++) {
                        var name = "odd";
                        if ((i + 1) % 2 == 0) {
                            name = "even";
                        }
                        $(".table").append("<tr id='" + id + i + "' class='" + name + "'>" +
                            "<td><input name='check' type='checkbox' /></td>" +
                            "<td name='classify_id'>" + json[i]['classify_id'] + "</td>" +
                            "<td name='classify_name'>" + json[i]['classify_name'] + "</td>" +
                            "<td name='child_classify_id'>" + json[i]['child_classify_id'] + "</td>" +
                            "<td name='add_day'>" + json[i]['add_day'] + "</td>" +
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
            var id = "classify";
            $("#" + id + i + " td[name='alter'] a").on("click", {classify: $("#" + id + i + " td[name='classify_name']").html()}, function (event) {
                $.post("./admin/temp.php", {classify: event.data.classify}, function () {
                    $("#indexBottomRight").load("update_classify.html");
                });
            });
        }
    }
});

$(function () {
    $(".topBtn[name='classify_name_add']").mousedown(function () {
        var url = "./images/UI/add_click.jpg";
        $(".topBtn[name='classify_name_add']").css("background-image", "url(" + url + ")");
        $(".topBtn[name='classify_name_add']").css("color", "#337ab7");
        $(".topBtn[name='classify_name_add']").css("font-weight", "bold");
    });
    $(".topBtn[name='classify_name_delete']").mousedown(function () {
        var url = "./images/UI/delete_click.jpg";
        $(".topBtn[name='classify_name_delete']").css("background-image", "url(" + url + ")");
        $(".topBtn[name='classify_name_delete']").css("color", "#337ab7");
        $(".topBtn[name='classify_name_delete']").css("font-weight", "bold");
    });
    $(".topBtn[name='classify_name_add']").mouseup(function () {
        var url = "./images/UI/add.jpg";
        $(".topBtn[name='classify_name_add']").css("background-image", "url(" + url + ")");
        $(".topBtn[name='classify_name_add']").css("color", "#ffffff");
        $(".topBtn[name='classify_name_add']").css("font-weight", "normal");
    });
    $(".topBtn[name='classify_name_delete']").mouseup(function () {
        var url = "./images/UI/delete.jpg";
        $(".topBtn[name='classify_name_delete']").css("background-image", "url(" + url + ")");
        $(".topBtn[name='classify_name_delete']").css("color", "#ffffff");
        $(".topBtn[name='classify_name_delete']").css("font-weight", "normal");
    });
});

