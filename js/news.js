$(function(){
    //请求数据
    $.ajax({
        url:"/mypanola/php/news.php",
        type:"get",
        async:true,
        data:{},
        dataType:"json",
        success:function(res){
            news(res);
            news_detail(res);
        },error:function(res){
            console.log(2);
        }
    })
    //news界面拼接
    function news(res){
        var str="";
        for(var i=0;i<res.length;i++){
            str+=`
            <div class="col-md-4 col-sm-6 col-xs-12 column ">
                <div id="box">
                    <div class="box-img">
                        <img class="img" src="images/news/${res[i].url}">
                        <div class="img-bg"></div>
                        <div class="box-center"><a href="news.detail.html?${i}"><i class="fa fa-eye fa"></i></a></div>
                    </div>
                    <div class="box-txt">
                        <div class="txt">
                            <span>${res[i].title}</span>                          
                            <p>${res[i].content1}</p>
                            <div class="txt-button"><a href="news.detail.html?${i}">更多</a></div>
                        </div>
                    </div>
                </div>
            </div>
            `
        }
        $('.border').html(str);
    }
    //news_detail界面拼接
    function news_detail(res){
    var index=parseInt(window.location.href.split("?")[1]);
    var num=0,num1=0;
    var str1="";
    var str2="";
    if(index+2<9){
        num1=num+2;
    }else{
        num1=1;
    }
    str1+=`
    <div class="img-box">
        <img src="images/news/${res[index].url}">
    </div>
    <div class="txt-box">
        <p>${res[index].content1}</p>
        <p>${res[index].content2}</p>
    </div>
    <div class="img-box1">
        <div class="col-md-6 col-sm-6 column left">
            <img src="images/news/${res[num1-1].url}">
        </div>
        <div class="col-md-6 col-sm-6 column left">
            <img src="images/news/${res[num1].url}">
        </div>                  
    </div> 
    <div class="txt-box">
        <p>旅行教会我们的事一种不妥协，勇敢向前去追求自己的梦想的一种决心，我们需要的是有一定的决心，去收拾好行李，整装出发也是给我们人生做一个真正的转折点，旅行也是让我们能够重新的认识了自己，你可以通过旅行做到很多事情，这难道不是对自己的一种成长吗？其实是的，没错，旅行也是对自己的一种成长。</p>
    </div>           
</div>
    `
    for(var i=1;i<4;i++){
        if(index+i<9){
            num=index+i;
        }else{
            num=i;
        }
        str2+=`
        <div class="right-box">
            <div class="img-box">
                <img src="images/news/${res[num].url}">
            </div>
            <div class="txt-box">
                <p><a href="news.detail.html?${num}">${res[num].title}</a></p>
            </div>
        </div>
     `
    }
   $('.left').html(str1);
   $('.box1').html(str2);
    }
})



