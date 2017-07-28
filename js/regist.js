$(function () {
    $("#regist input").keypress(function (e) {
        event.stopPropagation();
        if (e.keyCode == 13) {
            $.regist();
        }
    });
    $("#regist input[name^='btn']").click(function () {
        event.stopPropagation();
        $.regist();
    });
});

$.extend({
    regist: function () {
        if (!$("#regist input[name^='username']").val() == "") {
            if (!$("#regist input[name^='password']").val() == "") {
                if (!$("#regist input[name^='phone']").val() == "") {
                    if (!$("#regist input[name^='email']").val() == "") {
                        var username = $("#regist input[name^='username']");
                        var password = $("#regist input[name^='password']");
                        var confirm = $("#regist input[name^='confirm']");
                        var phone = $("#regist input[name^='phone']");
                        var email = $("#regist input[name^='email']");
                        if (password.val() == confirm.val()) {
                            $.post("./admin/regist.php",
                                {
                                    username: username.val(),
                                    password: password.val(),
                                    phone: phone.val(),
                                    email: email.val()
                                }, function (data) {
                                    var json = eval("(" + data + ")");
                                    alert(json['message']);
                                    username.val("");
                                    password.val("");
                                    confirm.val("");
                                    phone.val("");
                                    email.val("");
                                    $("#regist").css("display", "none");
                                    $("#login_form").css("display", "block");
                                });
                        } else {
                            alert("两次输入的密码不同");
                            confirm.focus();
                        }
                    } else {
                        alert("邮箱不能为空");
                        $("#regist input[name^='email']").focus();
                    }
                } else {
                    alert("手机不能为空");
                    $("#regist input[name^='phone']").focus();
                }
            } else {
                alert("密码不能为空");
                $("#regist input[name^='password']").focus();
            }
        } else {
            alert("账号不能为空");
            $("#regist input[name^='username']").focus();
        }
    }
});