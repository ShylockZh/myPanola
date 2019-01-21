
$(function(){
    // 是否已登录?
    if(window.localStorage.getItem("isloged") === 'true'){
        let user_name = window.localStorage.getItem("user_name");
        // $('.log .active').attr('href','user.html').html('欢迎您，'+user_name);
        if(window.localStorage.getItem("user_id") === '1'){
            var userBtn='<span>欢迎您，</span> <a class="active" href="admin.html">'+user_name+'</a>';
        }else{
            var userBtn='<span>欢迎您，</span> <a class="active" href="user.html">'+user_name+'</a>';
        }
        var signoutBtn='<a class="signOut">退出</a>'; 
        $('#logJudge').html(userBtn+signoutBtn);

        // 退出
        $('.signOut').click(function(){
            window.localStorage.removeItem("isloged");
            window.localStorage.removeItem("user_id");
            window.localStorage.removeItem("user_name");
            if(window.location.pathname.split('/')[2] === 'user.html' ||
                window.location.pathname.split('/')[2] === 'admin.html'){
                window.location.href = 'index.html';
            }else{
                window.location.reload();
            }
        })
    }

    

    // 滚动条位置
    $(window).scroll(function(){
        if($(document).scrollTop() >= 100){
            $('.toTop').fadeIn();
            $('nav.white').css({
                top:'0px'
            })
        }else{
            $('.toTop').fadeOut();
            $('nav.white').css({
                top:'-90px'
            })
        }
    })
    // 点击事件
    $('.toTop').click(function(){
        $('body,html').animate({ scrollTop: 0 }, 500);
    })

})