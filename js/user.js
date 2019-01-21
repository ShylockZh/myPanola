$(function(){
    // $(".toChange").attr("disabled",true).css("pointer-events","none");
    // 填入个人信息
    function addMessage(json){
        $('#username').val(json.user_username);
        $('#pwd').val(json.user_password);
        $('#name').val(json.user_name);
        $('#sex'+json.user_sex).attr('checked','true');
        $('#phone').val(json.user_phone);
        $('#email').val(json.user_email);
        $('#address').val(json.user_address);
    }


    // 姓名
    $('.user-content h2').append(window.localStorage.getItem('user_name'));
    // tab点击
    $('.nav-tabs li').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        $('.box-content').eq($(this).index()).addClass('active').siblings().removeClass('active'); 
    })

    // 获取个人信息———————————————————————————————————————————————————————————————
    var requestURL = "../mypanola/php/user.php?userid="+window.localStorage.getItem('user_id');
    var htmlobj=$.ajax({url:requestURL,async:false});
    var resJson = JSON.parse(htmlobj.responseText);
    addMessage(resJson);

    // 密码判断
    $('#pwd2').blur(function(){
        if($(this).val() != '' && $(this).val() !== $('#pwd').val()){
            $(this).val('').attr('placeholder','两次密码输入不一致');
        }else{
            $(this).val('').removeAttr('placeholder');
        }
    })
    $('input').blur(function(){
        if(!$('#pwd2').attr('placeholder')){
            $('.toChange').removeClass('btn-disable').removeAttr('disabled')
        }else{
            $('.toChange').addClass('btn-disable').attr('disabled','true')
        }
    })

    // 点击修改
    $('.toOperate').click(function(){
        $.post("../mypanola/php/userChange.php", {
            userid: window.localStorage.getItem('user_id'),
            pwd: $("#pwd").val(),
            sex: $(":radio:checked").val(),
            phone: $('#phone').val(),
            email: $('#email').val(),
            address: $('#address').val()
        }, function(data) {
            $('.modal-body').html(data+"请刷新后查看");
            $('.modal-footer button:nth-child(1)').hide();
            $('.modal-footer button:nth-child(2)').text('完成');
            $('.modal').modal('show');
        });
    })
    $('.noOperate').click(function(){
        $('.modal').modal('hide');
    })


    // 获取订单————————————————————————————————————————————————————————————————
    $('.nav-tabs li:nth-child(2').click(function(){
        var ordersURL = "../mypanola/php/userOrders.php?userid="+window.localStorage.getItem('user_id');
        var ordersobj=$.ajax({url:ordersURL,async:false});
        var ordJson = JSON.parse(ordersobj.responseText);
        // console.log(ordJson);
        // console.log(ordJson[0].orders_id);
        if(ordJson[0].orders_id == undefined){
            // console.log(123);
            $('.box2').html('<h2>您还没有订单哦~<a href="rooms.html">去看看</a></h2>');   
        }else{
            addOrders(ordJson);
        }
    })
    function addOrders(json){
        let order_container = `<table class="table table-striped">
                                <thead><tr><td>订单号</td><td>预订人</td><td>客房类型</td><td>入住人</td><td>联系电话</td><td>入住时间</td><td>离开时间</td><td>订单状态</td></tr></thead>
                                <tbody></tbody>
                            </table>`;
        $('.box2').html(order_container);
        let order_content = '';
        for(let i = 0;i < json.length;i++){
            order_content += `<tr>
                                <td>${json[i].orders_id}</td>
                                <td>${json[i].user_name}</td>
                                <td>${json[i].rooms_name}</td>
                                <td>${json[i].orders_name}</td>
                                <td>${json[i].orders_phone}</td>
                                <td>${json[i].orders_arrive}</td>
                                <td>${json[i].orders_leave}</td>`;
            switch(json[i].orders_state){
                case '0' : order_content += '<td><label class="label label-info">等待确认</label></td></tr>';
                            break;
                case '1' : order_content += '<td><label class="label label-success">已确认</label></td></tr>';
                            break;
                case '2' : order_content += '<td><label class="label label-success">已入住</label></td></tr>';
                            break;
                case '3' : order_content += '<td><label class="label label-default">已完成</label></td></tr>';
                            break;
                case '4' : order_content += '<td><label class="label label-warning">已取消</label></td></tr>';
                            break;
            }
        }
        $('.box2 tbody').html(order_content);
    }

    // 意见与建议————————————————————————————————————————————————————————————————
    $('.box3 textarea').blur(function(){
        console.log(123);
        if($(this).val() != ''){
            $('.toSubmit').removeClass('btn-disable').removeAttr('disabled')
        }
    })
    $('.toSubmit').click(function(){
        $.post("../mypanola/php/userMessage.php", {
            userid: window.localStorage.getItem('user_id'),
            message: $("#message").val()
        }, function(data) {
            console.log(data);
        })
    })
})