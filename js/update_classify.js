$(document).ready(function () {
    $(".return").click(function () {
        $("#classify").click();
    });
    $.post("./admin/select_classify", function (data) {
        var json = eval("(" + data + ")");
        $("#classify_id").val(json['classify_id']);
        $("#classify_name").val(json['classify_name']);
        $("#child_classify_id").val(json['child_classify_id']);
    });
});

$(function () {
    $(".pageBody input").keypress(function (e) {
        if (e.keyCode == 13) {
            $.update_classify();
        }
    });
    $(".button[name='submit']").click(function () {
        $.update_classify();
    });
    $(".return").click(function () {
        $("#classify").click();
    });
});

$.extend({
    update_classify: function () {
        if (!$("#classify_name").val() == "") {
            var formdata = new FormData($(".pageBody form")[0]);
            $.ajax({
                url: "./admin/update_classify.php",
                type: "POST",
                data: formdata,
                processData: false,
                contentType: false,
                async: false,
                success: function (data) {
                    if (data) {
                        alert("修改成功");
                        $("#classify").click();
                    } else {
                        alert("修改失败");
                    }
                }
            });
        } else {
            alert("分类名不能为空");
            $("#classify_name").focus();
        }
    }
});