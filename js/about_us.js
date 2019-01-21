//about板块
function about(){
    this.pictureAnimate=function(){
       $('.img1').animate({
           left:"50px"
       },500)
       $('.img2').animate({
           right:"0px"
       },500)
       $('.img3').slideDown(500)
    }
}
let a=new about();
a.pictureAnimate();

//service板块
$(function(){
    // 会动的蛇
    setInterval(function(){
        var left=$('$moveSnok').css('left');
        
    },500)
    //tab切换
    $('.service-col').on("click",function(){
        let index=$(this).index();
        $(this).addClass('bgchange').siblings().removeClass('bgchange');
        $('.single-btn').hide();
        $('.single-btn').eq(index).show();
        tabContent(index);
    })

})

function tabContent(index){   
   Promise.all([
       $.ajax({url: '/group2/json/about_us.json' , dataType:'json'})
   ]).then(function(res){
    loadingData(res[0].about[index])          
   },function(){
       console.log('失败了')
   })
}

function loadingData(obj){
    $('#loadingImg').attr('src',obj.img)
    $('#loadingH1').html(obj.h1)
    $('#loadingP').html(obj.text)
}