$(document).ready(function () {
    $(".return").click(function () {
        $("#goods").click();
    });
    $.post("./admin/select_goods.php",function (data) {
        var json = eval("(" + data + ")");
        $("#goods_id").val(json['goods_id']);
        $("#goods_name").val(json['goods_name']);
        $("#classify_name").val(json['classify_name']);
        $("#price").val(json['price']);
        $("#store").val(json['store']);
        $("#sales").val(json['sales']);
        $("#description").val(json['description']);
    });
    $("#model").change(function () {
        if($("#model").val() != ""){
            $.post("./admin/select_goods.php",
                {model:$("#model").val()},
                function (data) {
                var json = eval("(" + data + ")");
                $("#color").val(json['color']);
                $("#version").val(json['version']);
            });
        }
    });
});

$(function () {
    $(".pageBody input").keypress(function (e) {
        if (e.keyCode == 13) {
            $.update_goods();
        }
    });
    $(".button[name='submit']").click(function () {
        $.update_goods();
    });
    $(".return").click(function () {
        $("#goods").click();
    });
});

$.extend({
    update_goods: function () {
        if (!$("#goods_id").val() == "") {
            if (!$("#goods_name").val() == "") {
                if (!$("#classify_name").val() == "") {
                    if (!$("#model").val() == "") {
                        if (!$("#color").val() == "") {
                            if (!$("#version").val() == "") {
                                if (!$("#price").val() == "") {
                                    if (!$("#store").val() == "") {
                                        if (!$("#sales").val() == "") {
                                            if (!$("#description").val() == "") {
                                                if (($("#goods_id").val() != "") && ($("#goods_name").val() != "") && ($("#classify_name").val() != "") && ($("#model").val() != "") && ($("#color").val() != "") && ($("#version").val() != "") && ($("#price").val() != "") && ($("#store").val() != "") && ($("#sales").val() != "") && ($("#description").val() != "")) {
                                                    var formdata = new FormData($(".pageBody form")[0]);
                                                    $.ajax({
                                                        url: "./admin/update_goods.php",
                                                        type: "POST",
                                                        data: formdata,
                                                        async: false,
                                                        processData: false,
                                                        contentType: false,
                                                        success: function (data) {
                                                            if (data) {
                                                                alert("修改成功");
                                                                $("#goods").click();
                                                            } else {
                                                                alert("修改失败");
                                                            }
                                                        }
                                                    });
                                                }

                                            } else {
                                                alert("简介不能为空");
                                                $("#description").focus();
                                            }
                                        } else {
                                            alert("销售量不能为空");
                                            $("#sales").focus();
                                        }
                                    } else {
                                        alert("库存量不能为空");
                                        $("#store").focus();
                                    }
                                } else {
                                    alert("商品价格不能为空");
                                    $("#price").focus();
                                }
                            } else {
                                alert("版本不能为空");
                                $("#version").focus();
                            }
                        } else {
                            alert("颜色不能为空");
                            $("#color").focus();
                        }
                    } else {
                        alert("商品型号不能为空");
                        $("#model").focus();
                    }
                } else {
                    alert("商品类别不能为空");
                    $("#classify").focus();
                }
            } else {
                alert("商品名称不能为空");
                $("#goods_name").focus();
            }
        } else {
            alert("商品编号不能为空");
            $("#goods_id").focus();
        }
    }
});