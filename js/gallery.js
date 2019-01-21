$(function(){ 
    //请求数据
    $.ajax({
    url:"/mypanola/php/gallery.php",
    type:"get",
    async:true,
    data:{},
    dataType:"json",
    success:function(res){
        gallery(res);
    },error:function(res){
        console.log(2);
    }
    })  
})
function gallery(res){
    //默认显示
    data(1,res);
    $('.nav li').click(function(){
        var index=$(this).index()+1;
        //切换时隐藏按钮
        $('#btn').css({'display':'block'});
        data(index,res);
    }) 
}
function data(index,obj){
    var arr=[];
    for(var i=0;i<obj.length;i++){
        if(obj[i].groupID==index){
            arr.push(obj[i]);
         }
    }
    click(arr);
}
function page(arr,cont,n){
    var page1=0;
    var page2=n*cont;
    //拼接数据
    var str="";
    for(var i=page1;i<page2;i++){
        str+=`
        <div class="col-md-4 col-sm-6 column padding-left">
            <div class="tab-box">
                <div class="img">
                    <img src="images/gallery/${arr[i].url}" alt="图片1"> 
                </div>
            </div>
        </div>  
    `
    }  
    $('.border').html(str);
}
function click(arr){
    // 默认加载
    var cont=1;
    //每次最多加载数据
    var n=6;
    var length=arr.length;
    var time=Math.ceil(length/n);
    var m=0;
    page(arr,cont,n);
    $('#btn').click(function(){
        m++;
        if(m<time){
            cont+=1;
            page(arr,cont,n); 
        }else{
            //加载完毕隐藏按钮
            $('#btn').css({'display':'none'});
        }
    })  
}

