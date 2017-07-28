$(function () {
    $.post("./admin/login.php", function (data) {
        var json = eval("(" + data + ")");
        if (json['judge']) {
            var url = location.href;
            var length = url.lastIndexOf("/");
            url=url.substring(0,length);
            url = url+"/index.html";
            window.location = url;
        } else {
            $("#username").focus();
        }
    });
    $("input").keypress(function (e) {
        if (e.keyCode == 13) {
            $.login();
        }
    });
    $("#btn").click(function () {
        $.login();
    });
});

$.extend({
    login: function () {
        if (!$("#username").val() == "") {
            if (!$("#password").val() == "") {
                var username = $("#username").val();
                var password = $("#password").val();
                $.post("./admin/login.php",
                    {
                        username: username,
                        password: password,
                    },
                    function (data) {
                        var json = eval("(" + data + ")");
                        if (json['judge']) {
                            var url = location.href;
                            var length = url.lastIndexOf("/");
                            url=url.substring(0,length);
                            url = url+"/index.html";
                            window.location = url;
                        } else {
                            alert(json['message']);
                            if (json['message'] == "账号错误") {
                                $("#username").val("");
                                $("#password").val("");
                                $("#username").focus();
                            } else if (json['message'] == "密码错误") {
                                $("#password").val("");
                                $("#password").focus();
                            }
                        }
                    });
            }
            else {
                alert("密码不能为空");
                $("#password").focus();
            }
        }
        else {
            alert("用户名不能为空");
            $("#username").focus();
        }
    }
});
