$(function(){
    $('.nav-tabs li').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        $('.box-content').eq($(this).index()).addClass('active').siblings().removeClass('active'); 
    })

    // 获取所有预定信息————————————————————————————————
    var ordersURL = "../mypanola/php/admOrders.php";
    var ordersobj=$.ajax({url:ordersURL,async:false});
    var ordJson = JSON.parse(ordersobj.responseText);
    addAdmorders(ordJson);

    function addAdmorders(json){
        let order_container = `<table class="table table-striped">
                                <thead><tr><td>订单号</td><td>预订人</td><td>客房类型</td><td>入住人</td><td>联系电话</td><td>入住时间</td><td>离开时间</td><td>订单状态</td><td>操作</td></tr></thead>
                                <tbody></tbody>
                            </table>`;
        $('.adm1').html(order_container);
        let order_content = '';
        for(let i = 0;i < json.length;i++){
            order_content += `<tr>
                                <td id="orderId" orderId="${json[i].orders_id}">${json[i].orders_id}</td>
                                <td>${json[i].user_name}</td>
                                <td>${json[i].rooms_name}</td>
                                <td>${json[i].orders_name}</td>
                                <td>${json[i].orders_phone}</td>
                                <td>${json[i].orders_arrive}</td>
                                <td>${json[i].orders_leave}</td>`;
            switch(json[i].orders_state){
                case '0' : order_content += '<td id="orderState" state="'+json[i].orders_state+'" ><label class="label label-primary">待确认</label></td><td><a>确认</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class="cancel">取消</a></td></tr>';
                            break;
                case '1' : order_content += '<td id="orderState" state="'+json[i].orders_state+'" ><label class="label label-info">已确认</label></td><td><a>入住</a></td></tr>';
                            break;
                case '2' : order_content += '<td id="orderState" state="'+json[i].orders_state+'" ><label class="label label-success">已入住</label></td><td><a>退房</a></td></tr>';
                            break;
                case '3' : order_content += '<td id="orderState" state="'+json[i].orders_state+'" ><label class="label label-default">已完成</label></td><td></td></tr>';
                            break;
                case '4' : order_content += '<td id="orderState" state="'+json[i].orders_state+'" ><label class="label label-warning">已取消</label></td><td></td></tr>';
                            break;
            }
        }
        $('.adm1 tbody').html(order_content);
        // 添加徽章
        if($('.adm1 label.label-primary').length != 0){
            $('.nav-tabs li:nth-child(1) a').append('<span class="badge">'+$('.adm1 label.label-primary').length+'</span>');
        }
    }
    //订单操作
    $('.adm1 a:not(.cancel)').click(function(){
        // 订单状态+1
        var state = parseInt($(this).parent().siblings('#orderState').attr('state')),
            id = $(this).parent().siblings('#orderId').attr('orderId'),
            nextState = state+1;
        var operURL = "../mypanola/php/admChange.php?ordersid="+id+"&ordersstate="+nextState;
        var operobj=$.ajax({url:operURL,async:false});
        console.log(operobj);
        $('.modal').modal('show');
    })
        // 取消订单
    $('.adm1 .cancel').click(function(){
        var id = $(this).parent().siblings('#orderId').attr('orderId');
        var operURL = "../mypanola/php/admChange.php?ordersid="+id+"&ordersstate=4";
        var operobj=$.ajax({url:operURL,async:false});
        console.log(operobj);
        $('.modal').modal('show');
    })
        // 刷新页面
    $('.toFresh').click(function(){
        window.location.reload();
    })


    // 获取所有留言信息————————————————————————————————
    var messURL = "../mypanola/php/admMessage.php";
    var messobj=$.ajax({url:messURL,async:false});
    var messJson = JSON.parse(messobj.responseText);
    console.log(messJson.length);
    console.log(messJson);
    addAdmmessages(messJson);

    function addAdmmessages(json){
        let mess_container = `<table class="table table-striped">
                                <thead><tr><td>留言编号</td><td>顾客</td><td>联系电话</td><td>留言内容</td><td>留言状态</td><td>操作</td></tr></thead>
                                <tbody></tbody>
                            </table>`;
        $('.adm2').html(mess_container);
        let mess_content = '';
        for(let i = 0;i < json.length;i++){
            mess_content += `<tr>
                                <td id="messId" messId="${json[i].message_id}">${json[i].message_id}</td>
                                <td>${json[i].user_name}</td>
                                <td>${json[i].user_phone}</td>
                                <td>${json[i].message_content}</td>`;
            switch(json[i].message_state){
                case '0': mess_content += '<td><label class="label label-primary">待确认</label></td><td><a class="messFin">完成</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class="messProm">跟进</a></tr>';
                        break;
                case '1': mess_content += '<td><label class="label label-warning">跟&nbsp;&nbsp;&nbsp;进</label></td><td><a class="messFin">完成</a></td></tr>';
                        break;
                case '2': mess_content += '<td><label class="label label-success">已完成</label></td><td></td></tr>';
                        break;
            }
        }
        $('.adm2 tbody').html(mess_content);
        // 添加徽章
        if($('.adm2 label.label-primary').length != 0){
            $('.nav-tabs li:nth-child(2) a').append('<span class="badge">'+$('.adm2 label.label-primary').length+'</span>');
        }
    }

    console.log($('#messFin'))
    // 完成 
    $('.messFin').click(function(){
        var id = $(this).parent().siblings('#messId').attr('messId');
        var operURL = "../mypanola/php/admChange.php?messid="+id+"&messstate=2";
        var operobj = $.ajax({url:operURL,async:false});
        // console.log(operURL);
        $('.modal').modal('show');
    })
    // 跟进
    $('.messProm').click(function(){
        var id = $(this).parent().siblings('#messId').attr('messId');
        var operURL = "../mypanola/php/admChange.php?messid="+id+"&messstate=1";
        var operobj = $.ajax({url:operURL,async:false});
        // console.log(operURL);
        $('.modal').modal('show');
    })
})