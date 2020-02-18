


// LiftEffect({
// 	"control1": ".lift2", 						  //侧栏电梯的容器
// 	"control2": "#ccc",                           //需要遍历的电梯的父元素
// 	"target": [".dianti1",".dianti2",".dianti3"], //监听的内容，注意一定要从小到大输入
// 	"current": "xuanzhong" 						  //选中的样式
// });

function LiftEffect(json){

var array=[];

for(var i =0; i<json.target.length;i++){
	var t = $(json.target[i]).offset().top;
	array.push(t);

}

function Selected(index){
	$(json.control2).children().eq(index).addClass(json.current).siblings().removeClass(json.current);
}


$(window).on("scroll",Check);

function Check(){
	if($(document.body).width()<1680){
		return
	}
	var wst = $(window).scrollTop();
	if(wst >= $(json.target[0]).offset().top-300){
		$('.h1').removeClass('dn').addClass('_fx')
		$('.h2').removeClass('dn').addClass('fx')
		//  _dn_dn
		//$(json.control1).addClass('_dn')
		 $(json.control1).fadeIn(500);
	}else{
		$('.h1').removeClass('_fx')
		$('.h2').removeClass('fx').addClass('dn')
		//$(json.control1).removeClass('_dn')
		 $(json.control1).fadeOut(500);
	}

	var key =0;
	var flag = true;
	for(var i =0; i<array.length; i++){
		key++;
		if(flag){

			if(wst >= array[array.length-key]-300){
				var index = array.length-key;
				flag = false;
			}else{
				flag=true;
			}
			
		}
	}
	Selected(index);
}

$(json.control2).children().on("click",function(){

		$(window).off("scroll");
		var index = $(this).index();
		Selected(index);

		
		var flag = true;
		for(var i =0; i<array.length; i++){
		
			if(flag){

				if(index == i){
					var at = array[i]-110
					if(index==5){
						at = array[i]+705
					}
					if(index==6){
						at = array[i]+740
					}
					$("html,body").stop().animate({
						"scrollTop": at
					},500,function(){
						$(window).on("scroll",Check);
					});
					flag = false;
				}else{
					flag=true;
				}
				
			}
		}
		
});



}



