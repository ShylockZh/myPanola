$(function(){ 
    //请求数据
    $.ajax({
    url:"/mypanola/php/travel.php",
    type:"get",
    async:true,
    data:{},
    dataType:"json",
    success:function(res){
        travel(res);
        travel_detail(res);
    },error:function(res){
        console.log(2);
    }
    })  
})
function travel(obj){
     var str="";
    for(var i=0;i<9;i++){
    str+=`
     <div class="col-md-4 col-sm-6 col-xs-12 column txt">
                <div class="box">
                    <img src="./images/travel/${obj[i].url}" data-original="./images/travel/${obj[i].url}" alt="图片1">
                    <div class="box-bg"></div>
                    <div class="box-bg-box">
                        <div class="left"><i class="fa fa-search fa-2x "></i></div>
                        <div class="right"><a href="travel.detail.html?${i}"><i class="fa fa-book fa-2x "></a></i></div>
                    </div>
                </div>
            </div>
     `
    }
    $('#viewer').html(str);
    $('#viewer').viewer({
          url:"data-original",
          "navbar	":true,
          "zoomable":true,
          "transition":true,
          "maxZoomRatio":50,
          "zIndex":3000,
          "fullscreen":false
    })
      $(".box-bg-box i").click(function(){
          $(this).parent().parent().prev().prev().click();
      })
    //   var id=window.location.href.split('?')[1];
}

function  travel_detail(obj1){
  var index=window.location.href.split('?')[1];

  var str1="";
  str1+=`
    <div class="row clearfix">
        <div class="col-md-12 column">
            <img src="./images/travel/${obj1[index].url}"> 
        </div>
    </div>
    <div class="row clearfix">
        <div class="col-md-12 column">
            <div class="txt">
                <p>${obj1[index].title}</p>
                <span>${obj1[index].content}</span>
                <p>其他</p>
                <div class="row clearfix">
                    <div class="col-md-4 column">
                        <img src="./images/travel/${obj1[index].url_other1}">
                    </div>
                    <div class="col-md-4 column">
                        <img src="./images/travel/${obj1[index].url_other2}">
                    </div>
                    <div class="col-md-4 column">
                        <img src="./images/travel/${obj1[index].url_other3}">
                    </div>
                </div>
                <span>${obj1[index].txt}</span>
            </div>
            
        </div>
    </div>
  `
  $('.detail').html(str1);
}

