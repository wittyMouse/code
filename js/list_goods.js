$(document).ready(function () {
    var length = 0;
    $.ajax({
        url: "./admin/list_goods.php",
        type: "POST",
        data: {number: 1},
        async: false,
        success: function (data) {
            var json = eval("(" + data + ")");
            $("table").html("<tr><th></th><th>商品编号</th><th>商品名称</th><th>商品类别</th><th>型号数量</th><th>价格</th><th>库存量</th><th>销售量</th><th>图片数量</th><th>上架时间</th><th></th></tr>");
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
                var id = "goods";
                for (var i = 0; i < (length - 2); i++) {
                    var name = "odd";
                    if ((i + 1) % 2 == 0) {
                        name = "even";
                    }
                    $(".table").append("<tr id='" + id + i + "' class='" + name + "'>" +
                        "<td><input name='check' type='checkbox' /></td>" +
                        "<td name='goods_id'>" + json[i]['goods_id'] + "</td>" +
                        "<td name='goods_name'>" + json[i]['goods_name'] + "</td>" +
                        "<td name='classify_name'>" + json[i]['classify_name'] + "</td>" +
                        "<td name='model'>" + json[i]['model'] + "</td>" +
                        "<td name='price'>" + json[i]['price'] + "</td>" +
                        "<td name='store'>" + json[i]['store'] + "</td>" +
                        "<td name='sales'>" + json[i]['sales'] + "</td>" +
                        "<td name='image'>" + json[i]['image'] + "</td>" +
                        "<td name='shelves_time'>" + json[i]['shelves_time'] + "</td>" +
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
        var id = "goods";
        $("#" + id + i + " td[name='alter'] a").on("click", {goods: $("#" + id + i + " td[name='goods_id']").html()}, function (event) {
            $.post("./admin/temp.php", {goods: event.data.goods}, function () {
                $("#indexBottomRight").load("update_goods.html");
            });
        });
    }

    $(".topBtn[name='goods_add']").click(function () {
        $("#indexBottomRight").load("add_goods.html");
    });
    $(".topBtn[name='goods_delete']").on("click", {length: length}, function (event) {
        var goods = new Array();
        var message = "你确定要删除商品：";
        var id = "goods";
        var judge = false;
        for (var i = 0, j = 0; i < (event.data.length - 2); i++) {
            if ($("#" + id + i + " input[name='check']").is(":checked")) {
                judge = true;
                goods[j] = $("#" + id + i + " td[name='goods_id']").html();
                message += goods[j] + ",";
                j++;
            }
        }
        if (judge) {
            var len = message.lastIndexOf(",");
            message = message.substring(0, len);
            if (confirm(message)) {
                var temp = "{";
                for (var i in goods) {
                    temp += i + ':"' + goods[i] + '",';
                }
                var len = temp.lastIndexOf(",");
                temp = temp.substring(0, len);
                temp += "}";
                var input = eval("(" + temp + ")");
                $.ajax({
                    url: "./admin/delete_goods.php",
                    type: "post",
                    data: input,
                    success: function (data) {
                        if (data) {
                            alert("删除成功");
                        } else {
                            alert("删除失败");
                        }
                        $("#goods").click();
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
            url: "./admin/list_goods.php",
            type: "POST",
            data: {number: number},
            async: false,
            success: function (data) {
                var json = eval("(" + data + ")");
                $("table").html("<tr><th></th><th>商品编号</th><th>商品名称</th><th>商品类别</th><th>型号数量</th><th>价格</th><th>库存量</th><th>销售量</th><th>图片数量</th><th>上架时间</th><th></th></tr>");
                if (json['judge']) {
                    for (var i in json) {
                        length++;
                    }
                    $(".nowPage").html(number);
                    $(".first").html((number - 1) * 5 + 1);
                    $(".last").html((number - 1) * 5 + (length - 2));
                    $(".sum").html((json['sum']));
                    var id = "goods";
                    for (var i = 0; i < (length - 2); i++) {
                        var name = "odd";
                        if ((i + 1) % 2 == 0) {
                            name = "even";
                        }
                        $(".table").append("<tr id='" + id + i + "' class='" + name + "'>" +
                            "<td><input name='check' type='checkbox' /></td>" +
                            "<td name='goods_id'>" + json[i]['goods_id'] + "</td>" +
                            "<td name='goods_name'>" + json[i]['goods_name'] + "</td>" +
                            "<td name='classify_name'>" + json[i]['classify_name'] + "</td>" +
                            "<td name='model'>" + json[i]['model'] + "</td>" +
                            "<td name='price'>" + json[i]['price'] + "</td>" +
                            "<td name='store'>" + json[i]['store'] + "</td>" +
                            "<td name='sales'>" + json[i]['sales'] + "</td>" +
                            "<td name='image'>" + json[i]['image'] + "</td>" +
                            "<td name='shelves_time'>" + json[i]['shelves_time'] + "</td>" +
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
            var id = "goods";
            $("#" + id + i + " td[name='alter'] a").on("click", {goods: $("#" + id + i + " td[name='goods_id']").html()}, function (event) {
                $.post("./admin/temp.php", {goods: event.data.goods}, function () {
                    $("#indexBottomRight").load("update_goods.html");
                });
            });
        }
    }
});

$(function () {
    $(".topBtn[name='goods_add']").mousedown(function () {
        var url = "./images/UI/add_click.jpg";
        $(".topBtn[name='goods_add']").css("background-image", "url(" + url + ")");
        $(".topBtn[name='goods_add']").css("color", "#337ab7");
        $(".topBtn[name='goods_add']").css("font-weight", "bold");
    });
    $(".topBtn[name='goods_delete']").mousedown(function () {
        var url = "./images/UI/delete_click.jpg";
        $(".topBtn[name='goods_delete']").css("background-image", "url(" + url + ")");
        $(".topBtn[name='goods_delete']").css("color", "#337ab7");
        $(".topBtn[name='goods_delete']").css("font-weight", "bold");
    });
    $(".topBtn[name='goods_add']").mouseup(function () {
        var url = "./images/UI/add.jpg";
        $(".topBtn[name='goods_add']").css("background-image", "url(" + url + ")");
        $(".topBtn[name='goods_add']").css("color", "#ffffff");
        $(".topBtn[name='goods_add']").css("font-weight", "normal");
    });
    $(".topBtn[name='goods_delete']").mouseup(function () {
        var url = "./images/UI/delete.jpg";
        $(".topBtn[name='goods_delete']").css("background-image", "url(" + url + ")");
        $(".topBtn[name='goods_delete']").css("color", "#ffffff");
        $(".topBtn[name='goods_delete']").css("font-weight", "normal");
    });
});

