$(function () {
    $(".pageBody input").keypress(function (e) {
        if (e.keyCode == 13) {
            $.add_classify();
        }
    });
    $(".button[name='submit']").click(function () {
        $.add_classify();
    });
    $(".return").click(function () {
        $("#classify").click();
    });
});

$.extend({
    add_classify: function () {
        if (!$("#classify_name").val() == "") {
            var formdata = new FormData($(".pageBody form")[0]);
            $.ajax({
                url: "./admin/add_classify.php",
                type: "POST",
                data: formdata,
                processData: false,
                contentType: false,
                async: false,
                success: function (data) {
                    if (data) {
                        alert("添加成功");
                        $("#classify").click();
                    } else {
                        alert("添加失败");
                    }
                }
            });
        } else {
            alert("分类名不能为空");
            $("#classify_name").focus();
        }
    }
});