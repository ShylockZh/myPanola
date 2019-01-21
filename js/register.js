$(function(){

    function check(){
        if($('.ok').length >= 7){
            $('button').removeAttr('disabled').removeClass('btn-disable');
        }
    }

    function isempty(obj){
        if(obj.val().length == 0){
            obj.attr('placeholder','请输入');
            return;
        }else{
            obj.addClass('ok');
        }
    }

    
    // 用户名
    $('#username').blur(function(){
        isempty($(this));
        if($(this).val().length>15){
            $(this).val('');
            $(this).attr('placeholder','请输入少于15个字符');
        }
        check();
    })
    // 密码1
    $('#pwd').blur(function(){
        isempty($(this));
        if($(this).val().length>20 || $(this).val().length<8){
            $(this).val('');
            $(this).attr('placeholder','请输入8-20个字符');
        }
        check();
    })
    // 密码2
    $('#pwd2').blur(function(){
        isempty($(this));
        if($(this).val() != $('#pwd').val()){
            $(this).val('');
            $(this).attr('placeholder','两次密码输入不一致');
        }
        check();
    })
    // 姓名
    $('#name').blur(function(){
        isempty($(this));
        var nameReg = /^[\u4E00-\u9FA5A-Za-z]{2,20}$/;//验证姓名正则
        if(!nameReg.test($(this).val())){
            $(this).val('');
            $(this).attr('placeholder','请输入2-20位中英文');
        }
        check();
    })
    // 电话
    $('#phone').blur(function(){
        isempty($(this));
        var isPhone = /^1[3|4|5|8|7][0-9]\d{4,8}$/;//手机号码
        var isMob= /^[0-9]{8,}$/;// 座机格式
        if(isMob.test($(this).val()) || isPhone.test($(this).val())){
            ;
        }
        else{
            $(this).val('');
            $(this).attr('placeholder','请检查输入');
        }
        check();
    })

    // 邮箱
    $('#email').blur(function(){
        isempty($(this));
        var mailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;//验证姓名正则
        if(!mailReg.test($(this).val())){
            $(this).val('');
            $(this).attr('placeholder','请检查输入');
        }
        check();
    })
    
    // 地址
    $('#address').blur(function(){
        isempty($(this));
        // check();
    })

    // 性别
    $(':radio').click(function(){
        $(this).prop('checked',true).addClass('ok').siblings().removeClass('ok');
        // console.log($(":radio:checked").val())
        // console.log($(':radio').prop('checked',true));
        check();
    })

    // btn点击
    $('.toRegister').on('click',function(){
        // console.log($(":radio:checked").val())
        $.post("../mypanola/php/register.php", {
            username: $("#username").val(),
            pwd: $("#pwd").val(),
            name: $('#name').val(),
            sex: $(":radio:checked").val(),
            phone: $('#phone').val(),
            email: $('#email').val(),
            address: $('#address').val()
        }, function(data) {
            $('.modal-body').html(data);
        })
    })

    $('.toLogin').click(function(){
        window.location.href = "login.html";
    })
    
    $('.noOperate').click(function(){
        $('.modal').modal('hide');
    }) 
})