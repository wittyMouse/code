$(function () {
    $("#login_event").hover(
        function () {
            $("#login_event").css('cursor', 'pointer');
            $("#login_event").css('opacity', '1');
            $("#login_event").css('border-radius', '0px');
        },
        function () {
            $("#login_event").css('cursor', 'default');
            $("#login_event").css('opacity', '0.5');
            $("#login_event").css('border-radius', '40px');
        }
    );

    $("#login_event").click(function () {
        event.stopPropagation();
        $("#login_event").css('transition', '0s');
        $("#login_event").animate(
            {
                margin: '20% auto 0 auto',
                width: '0px',
                height: '0px',
                opacity: '0'
            },
            function () {
                $("#login_form").animate(
                    {
                        opacity: '1'
                    });
            });
    });

    $(document).click(function () {
        if ($("#regist").css("display") != 'none') {
            $("#regist").css("display", 'none');
            $("#login_form").css("display", 'block');
        } else {
            if ($("#login_form").css("opacity") != 0) {
                $("#login_form").animate(
                    {
                        opacity: '0'
                    },
                    function () {
                        $("#login_event").animate({
                            margin: '2% auto 0 auto',
                            width: '80px',
                            height: '80px',
                            opacity: '0.5'
                        }, function () {
                            $("#login_event").css('transition', '1s');
                        });
                    });
            }
        }
    });

    $("#login_form").click(function () {
        event.stopPropagation();
    });
    $("#regist_form").click(function () {
        event.stopPropagation();
    });

    $("#regist_btn").click(function () {
        event.stopPropagation();
        $("#regist").css("display", "block");
        $("#regist input[name^='username']").focus();
        $("#login_form").css("display", "none");
    });
});