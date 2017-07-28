$(function () {
    $(".pageBody input").keypress(function (e) {
        if (e.keyCode == 13) {
            $.add_admin();
        }
    });
    $(".button[name='submit']").click(function () {
        $.add_admin();
    });
    $(".return").click(function () {
        $("#admin").click();
    });
});

$.extend({
    add_admin: function () {
        if (!$("#adminid").val() == "") {
            if (!$("#password").val() == "") {
                if (!$("#phone").val() == "") {
                    if (!$("#email").val() == "") {
                        if ($("#password").val() == $("#confirm").val()) {
                            var formdata = new FormData($(".pageBody form")[0]);
                            $.ajax({
                                url: "./admin/add_admin.php",
                                type: "POST",
                                data: formdata,
                                processData: false,
                                contentType: false,
                                async: false,
                                success: function (data) {
                                    if (data) {
                                        alert("添加成功");
                                        $("#admin").click();
                                    } else {
                                        alert("添加失败");
                                    }
                                }
                            });
                        } else {
                            alert("两次输入的密码不同");
                            $("#confirm").focus();
                        }
                    } else {
                        alert("邮箱地址不能为空");
                        $("#email").focus();
                    }
                } else {
                    alert("手机号码不能为空");
                    $("#phone").focus();
                }
            } else {
                alert("密码不能为空");
                $("#password").focus();
            }
        } else {
            alert("管理员名不能为空");
            $("#adminid").focus();
        }
    }
});