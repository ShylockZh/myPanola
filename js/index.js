$(function(){

    // banner
    var mySwiper = new Swiper('.swiper-container', {
        autoplay: false,
        loop: true
    })

    // arriveDate
    $('.arriveDate').datetimepicker({
		format: 'yyyy-mm-dd',//显示格式
		todayHighlight: 1,//今天高亮
		minView: "month",//设置只显示到月份
		startView:2,
		forceParse: 0,
		showMeridian: 1,
		autoclose: 1//选择后自动关闭
	});
    // leaveDate
    $('.leaveDate').datetimepicker({
		format: 'yyyy-mm-dd',//显示格式
		todayHighlight: 1,//今天高亮
		minView: "month",//设置只显示到月份
		startView:2,
		forceParse: 0,
		showMeridian: 1,
		autoclose: 1//选择后自动关闭
	});

	// gusets
	$('.guests').focus(function(){
		$('.guestNumber').show();
	})
	$('.guestNumber ul li').click(function(){
		$('.guests').val($(this).text());
		$('.guestNumber').hide();
	})

	// rooms-item
	$('.rooms-item').mouseenter(function(){
		$(this).find('.mask').fadeIn();
	}).mouseleave(function(){
		$(this).find('.mask').fadeOut();
	})

	var options = {
		animateThreshold: 100,
		scrollPollInterval: 50
	}
	$('.about-pic').AniView(options); 

	// service
	$('li.service-tab-items').click(function(){
		// console.log($(this).index());
		$(this).addClass('active').siblings().removeClass('active');
		$('.tab-content').eq($(this).index()).fadeIn().siblings().hide();
	})

	// discover
	$('#discover-carousel').owlCarousel({
		autoPlay:true,
		loop:true,
		margin:20,
		nav:false,
		responsive:{
			0:{
				items:1
			},
			1000:{
				items:2
			},
			1200:{
				items:3
			}
		}
	})
	
// other
	$('#others-carousel').owlCarousel({
		autoPlay:true,
		loop:true,
		margin:18,
		nav:false,
		responsive:{
			0:{
				items:1
			},
			1000:{
				items:2
			},
			1200:{
				items:3
			}
		}
	})


	// contact

})