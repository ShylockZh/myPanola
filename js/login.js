$(function(){
    // 获取记住的用户名
    var remUsername = window.localStorage.getItem("remUsername");
    console.log(remUsername);
    if(remUsername){
        $('#username').val(remUsername);
    }


    function isempty(obj){
        if(obj.val().length == 0){
            obj.attr('placeholder','请输入');
            return;
        }else{
            obj.addClass('checked');
        }
    }
    function check(){
        if($('.checked').length >= 2){
            $('button').removeAttr('disabled').removeClass('btn-disable');
        }
    }

    // 用户名
    $('#username').blur(function(){
        isempty($(this));
        check();
    })

    // 密码
    $('#pwd').blur(function(){
        isempty($(this));
        check();
    })

    //登录 
    $('button').click(function(){
        var requestURL = "../mypanola/php/login.php?username="+$('#username').val()+"&pwd="+$('#pwd').val();
        var htmlobj=$.ajax({url:requestURL,async:false});
        var resJson = JSON.parse(htmlobj.responseText);
        console.log(resJson);
        loginCallback(resJson);
    })

    function loginCallback(flag){
        //用户名或密码错误
        if(!flag){
            $('.modal-body').html('用户名或密码错误！');
        }else{
            // 选择记住用户名
            if($('#remember').prop('checked')){
                window.localStorage.setItem("remUsername",flag.user_username);
            }else{
                window.localStorage.removeItem("remUsername");
            }
            // 登录操作（localstorage&模态框）
            window.localStorage.setItem("isloged",true);
            window.localStorage.setItem("user_id",flag.user_id);
            window.localStorage.setItem("user_name",flag.user_name);
            $('.modal-body').html('登录成功！');
            $('.modal-footer button').text('回到首页').click(function(){
                window.location.href = "index.html";
            })
        }
    }


})