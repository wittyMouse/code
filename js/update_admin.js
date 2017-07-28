$(document).ready(function () {
    $(".return").click(function () {
        $("#admin").click();
    });
    $.post("./admin/select_admin",function (data) {
        var json = eval("(" + data + ")");
        $("#adminid").val(json['admin']);
        $("#phone").val(json['phone']);
        $("#email").val(json['email']);
    });
});

$(function () {
    $(".pageBody input").keypress(function (e) {
        if (e.keyCode == 13) {
            $.update_admin();
        }
    });
    $(".button[name='submit']").click(function () {
        $.update_admin();
    });
    $(".return").click(function () {
        $("#admin").click();
    });
});

$.extend({
    update_admin: function () {
        if (!$("#adminid").val() == "") {
            if (!$("#password").val() == "") {
                        if (!$("#phone").val() == "") {
                            if (!$("#email").val() == "") {
                                if ($("#password").val() == $("#confirm").val()) {
                                    var formdata = new FormData($(".pageBody form")[0]);
                                    $.ajax({
                                        url: "./admin/update_admin.php",
                                        type: "POST",
                                        data: formdata,
                                        processData: false,
                                        contentType: false,
                                        async: false,
                                        success: function (data) {
                                            if (data) {
                                                alert("修改成功");
                                                $("#admin").click();
                                            } else {
                                                alert("修改失败");
                                            }
                                        }
                                    });
                                } else {
                                    alert("两次输入的密码不同");
                                    $("#confirm").focus();
                                }
                            } else {
                                alert("邮箱不能为空");
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