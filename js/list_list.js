$(document).ready(function () {
    var length = 0;
    $.ajax({
        url: "./admin/list_list.php",
        type: "POST",
        data: {number: 1},
        async: false,
        success: function (data) {
            var json = eval("(" + data + ")");
            $("table").html("<tr><th></th><th>订单号</th><th>订单状态</th><th>订单金额</th><th>配送方式</th><th>送达时间</th><th></th></tr>");
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
                var id = "list";
                for (var i = 0; i < (length - 2); i++) {
                    var name = "odd";
                    if ((i + 1) % 2 == 0) {
                        name = "even";
                    }
                    $(".table").append("<tr id='" + id + i + "' class='" + name + "'>" +
                        "<td><input name='check' type='checkbox' /></td>" +
                        "<td name='list_id'>" + json[i]['list_id'] + "</td>" +
                        "<td name='status_name'>" + json[i]['status_name'] + "</td>" +
                        "<td name='sum_price'>" + json[i]['sum_price'] + "</td>" +
                        "<td name='delivery'>" + json[i]['delivery'] + "</td>" +
                        "<td name='arrive_time'>" + json[i]['arrive_time'] + "</td>" +
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
        var id = "list";
        $("#" + id + i + " td[name='alter'] a").on("click", {list: $("#" + id + i + " td[name='list_id']").html()}, function (event) {
            $.post("./admin/temp.php", {list: event.data.list}, function () {
                $("#indexBottomRight").load("update_list.html");
            });
        });
    }

    $(".topBtn[name='list_search']").on("click", {length: length}, function (event) {
        var id = "list";
        var judge = true;
        for (var i = 0; i < (event.data.length - 2); i++) {
            if ($("#" + id + i + " input[name='check']").is(":checked")) {
                judge = false;
                list = $("#" + id + i + " td[name='list_id']").html();
                $.post("./admin/temp.php",{list:list},function () {
                    $("#indexBottomRight").load("search_list.html");
                });
            }
        }
        if(judge){
            alert("请选择要查看的用户");
        }
    });
    $(".topBtn[name='list_delete']").on("click", {length: length}, function (event) {
        var list = new Array();
        var message = "你确定要删除订单：";
        var id = "list";
        var judge = false;
        for (var i = 0, j = 0; i < (event.data.length - 2); i++) {
            if ($("#" + id + i + " input[name='check']").is(":checked")) {
                judge = true;
                list[j] = $("#" + id + i + " td[name='list_id']").html();
                message += list[j] + ",";
                j++;
            }
        }
        if (judge) {
            var len = message.lastIndexOf(",");
            message = message.substring(0, len);
            if (confirm(message)) {
                var temp = "{";
                for (var i in list) {
                    temp += i + ':"' + list[i] + '",';
                }
                var len = temp.lastIndexOf(",");
                temp = temp.substring(0, len);
                temp += "}";
                var input = eval("(" + temp + ")");
                $.ajax({
                    url: "./admin/delete_list.php",
                    type: "post",
                    data: input,
                    success: function (data) {
                        if (data) {
                            alert("删除成功");
                        } else {
                            alert("删除失败");
                        }
                        $("#list").click();
                    }
                });
            }
        } else {
            alert("请先选择要删除的用户");
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
            url: "./admin/list_list.php",
            type: "POST",
            data: {number: number},
            async: false,
            success: function (data) {
                var json = eval("(" + data + ")");
                $("table").html("<tr><th></th><th>订单号</th><th>订单状态</th><th>订单金额</th><th>配送方式</th><th>送达时间</th><th></th></tr>");
                if (json['judge']) {
                    for (var i in json) {
                        length++;
                    }
                    $(".nowPage").html(number);
                    $(".first").html((number - 1) * 5 + 1);
                    $(".last").html((number - 1) * 5 + (length - 2));
                    $(".sum").html((json['sum']));
                    var id = "list";
                    for (var i = 0; i < (length - 2); i++) {
                        var name = "odd";
                        if ((i + 1) % 2 == 0) {
                            name = "even";
                        }
                        $(".table").append("<tr id='" + id + i + "' class='" + name + "'>" +
                            "<td><input name='check' type='checkbox' /></td>" +
                            "<td name='list_id'>" + json[i]['list_id'] + "</td>" +
                            "<td name='status_name'>" + json[i]['status_name'] + "</td>" +
                            "<td name='sum_price'>" + json[i]['sum_price'] + "</td>" +
                            "<td name='delivery'>" + json[i]['delivery'] + "</td>" +
                            "<td name='arrive_time'>" + json[i]['arrive_time'] + "</td>" +
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
            var id = "list";
            $("#" + id + i + " td[name='alter'] a").on("click", {list: $("#" + id + i + " td[name='list_id']").html()}, function (event) {
                $.post("./admin/temp.php", {list: event.data.list}, function () {
                    $("#indexBottomRight").load("update_list.html");
                });
            });
        }
    }
});

$(function () {
    $(".topBtn[name='list_search']").mousedown(function () {
        var url = "./images/UI/search_click.jpg";
        $(".topBtn[name='list_search']").css("background-image", "url(" + url + ")");
        $(".topBtn[name='list_search']").css("color", "#337ab7");
        $(".topBtn[name='list_search']").css("font-weight", "bold");
    });
    $(".topBtn[name='list_delete']").mousedown(function () {
        var url = "./images/UI/delete_click.jpg";
        $(".topBtn[name='list_delete']").css("background-image", "url(" + url + ")");
        $(".topBtn[name='list_delete']").css("color", "#337ab7");
        $(".topBtn[name='list_delete']").css("font-weight", "bold");
    });
    $(".topBtn[name='list_search']").mouseup(function () {
        var url = "./images/UI/search.jpg";
        $(".topBtn[name='list_search']").css("background-image", "url(" + url + ")");
        $(".topBtn[name='list_search']").css("color", "#ffffff");
        $(".topBtn[name='list_search']").css("font-weight", "normal");
    });
    $(".topBtn[name='list_delete']").mouseup(function () {
        var url = "./images/UI/delete.jpg";
        $(".topBtn[name='list_delete']").css("background-image", "url(" + url + ")");
        $(".topBtn[name='list_delete']").css("color", "#ffffff");
        $(".topBtn[name='list_delete']").css("font-weight", "normal");
    });
});

