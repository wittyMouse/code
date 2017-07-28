$(function () {
    $(".pageBody input").keypress(function (e) {
        if (e.keyCode == 13) {
            $.add_goods();
        }
    });
    $(".button[name='submit']").click(function () {
        $.add_goods();
    });
    $(".return").click(function () {
        $("#goods").click();
    });
});

$.extend({
    add_goods: function () {
        if (!$("#goods_name").val() == "") {
            if (!$("#classify_name").val() == "") {
                if (!$("#model").val() == "") {
                    if (!$("#color").val() == "") {
                        if (!$("#version").val() == "") {
                            if (!$("#price").val() == "") {
                                if (!$("#store").val() == "") {
                                    if (!$("#sales").val() == "") {
                                        if (!$("#description").val() == "") {
                                            if (!$("#image").val() == "") {
                                                if(($("#goods_name").val() != "")&&($("#classify_name").val() != "")&&($("#model").val() != "")&&($("#color").val() != "")&&($("#version").val() != "")&&($("#price").val() != "")&&($("#store").val() != "")&&($("#sales").val() != "")&&($("#description").val() != "")&&($("#image").val() != "")){
                                                    var file = $("#image");
                                                    var length = file[0].files.length;
                                                    var item = file[0].files;
                                                    var judge = true;
                                                    for(var i = 0;i<length;i++){
                                                        var filename = item[i].name;
                                                        var filetype = item[i].type;
                                                        var filesize = Math.floor(item[i].size/1024);
                                                        if(filetype != "image/bmp" && filetype != "image/png" && filetype != "image/gif" && filetype != "image/jpeg"){
                                                            alert("请选择bmp|png|gif|jpg|jpeg格式图片,"+filename+"格式不符");
                                                            judge = false;
                                                            break;
                                                        }
                                                        if(filesize > 1024){
                                                            alert("请选择小于1M的图片,"+filename+"大小不符");
                                                            judge = false;
                                                            break;
                                                        }
                                                    }
                                                    if(judge) {
                                                        var formdata = new FormData($(".pageBody form")[0]);
                                                        $.ajax({
                                                            url: "./admin/add_goods.php",
                                                            type: "POST",
                                                            data: formdata,
                                                            cache:false,
                                                            /**
                                                             * 必须false才会避开jQuery对 formdata 的默认处理
                                                             * XMLHttpRequest会对 formdata 进行正确的处理
                                                             */
                                                            processData: false,
                                                            /**
                                                             *必须false才会自动加上正确的Content-Type
                                                             */
                                                            contentType: false,
                                                            success: function (data) {
                                                                var json = eval("(" + data + ")");
                                                                if(json['judge']){
                                                                    alert(json['message']+","+json['success']+"张图片已上传");
                                                                    $("#goods").click();
                                                                }else{
                                                                    alert(json['message']);
                                                                }
                                                            },
                                                            error: function () {
                                                                alert("传输失败");
                                                            }
                                                        });
                                                    }
                                                }
                                            } else {
                                                alert("图片不能为空");
                                                $("#image").focus();
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
    }
});