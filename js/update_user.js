$(document).ready(function () {
    $(".return").click(function () {
        $("#user").click();
    });
   $.post("./admin/select_user",function (data) {
       var json = eval("(" + data + ")");
       $("#username").val(json['username']);
       $("#nickname").val(json['nickname']);
       $("#phone").val(json['phone']);
       $("#email").val(json['email']);
       $("#realname").val(json['realname']);
       $("#gender").val(json['gender']);
       $("#birthday").val(json['birthday']);
   });
});

$(function () {
    $(".pageBody input").keypress(function (e) {
        if (e.keyCode == 13) {
            $.add_user();
        }
    });
    $(".button[name='submit']").click(function () {
        $.add_user();
    });
    $(".return").click(function () {
        $("#user").click();
    });
});

$.extend({
    add_user: function () {
        if (!$("#username").val() == "") {
            if (!$("#password").val() == "") {
                if (!$("#confirm").val() == "") {
                    if (!$("#nickname").val() == "") {
                        if (!$("#phone").val() == "") {
                            if (!$("#email").val() == "") {
                                if ($("#password").val() == $("#confirm").val()) {
                                    var formdata = new FormData($(".pageBody form")[0]);
                                    $.ajax({
                                        url: "./admin/update_user.php",
                                        type: "POST",
                                        data: formdata,
                                        processData: false,
                                        contentType: false,
                                        async: false,
                                        success: function (data) {
                                            if (data) {
                                                alert("修改成功");
                                                $("#user").click();
                                            } else {
                                                alert("修改失败");
                                            }
                                        }
                                    });
                                } else {
                                    alert("两次输入的密码不同");
                                }
                            } else {
                                alert("资料不能为空");
                                $("#email").focus();
                            }
                        } else {
                            alert("资料不能为空");
                            $("#phone").focus();
                        }
                    } else {
                        alert("资料不能为空");
                        $("#nickname").focus();
                    }
                } else {
                    alert("资料不能为空");
                    $("#confirm").focus();
                }
            } else {
                alert("资料不能为空");
                $("#password").focus();
            }
        } else {
            alert("资料不能为空");
            $("#username").focus();
        }
    }
});