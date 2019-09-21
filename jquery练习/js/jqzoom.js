(function($){
	$.fn.jqzoom = function(options){
		
		var scalex = 0, scaley = 0;
		var img = $(this).find('img')
		
		var imgWidth = img.width();
		var imgHeight = img.height();
		
		var originalWidth = img.get(0).naturalWidth
		var originalHeight = img.get(0).naturalHeight
		
		scalex = imgWidth/originalWidth
		scaley = imgHeight/originalHeight
		console.log(scalex, scaley)
		scalex = scalex<=1 ? scalex : 1
		scaley = scaley<=1 ? scaley : 1
		var popx = scalex * options.offwidth
		var popy = scaley * options.offheight
		
		//添加移入的图片上的区域选择的盒子
		$(this).mouseenter(function(){
			
			var bigImg = img.get(0).getAttribute('src')
			
			$(this).append('<div class="popDiv" style="position:absolute;background:#fff;opacity: 0.5;width: '+popx+'px;height: '+popy+'px;top:0"></div>')
			
			$(this).append('<div class="bigImg"  style="position:absolute;right: -'+(imgWidth + 40)+'px;top: 0;width: '+options.offwidth+'px;height: '+options.offheight+'px;overflow:hidden"><img style="position: absolute" src="'+bigImg+'"/></div>')
			
			
		})
		
		//删除移入的图片上的区域选择的盒子
		$(this).mouseleave(function(){
			
			$(this).find('.popDiv').remove()
			$(this).find('.bigImg').remove()
		})
		
		$(this).mousemove(function(event){
			//当前鼠标的位置距离页面的坐标
			var pageX = event.pageX;
			var pageY = event.pageY;
			
			var img = $(this).find('img');
			
			var positionX = img.offset().left;
			
			var positionY = img.offset().top;

			var popDiv = $(this).find('.popDiv')
			var width = popDiv.width()
			var height = popDiv.height()
			
			var x = pageX-positionX - width/2
			var y = pageY- positionY -height/2
			
			x = x < 0 ? 0 : x
			y = y < 0 ? 0 : y
			
			x = x > (img.width() - width) ? (img.width() - width) : x
			y = y > (img.height() - height) ? (img.height() - height) : y

			popDiv.css({
				left: x,
				top: y
			})
			
			$(this).find('.bigImg img').css({
				left: -(x/scalex)+'px',
				top: -(y/scaley)+'px',
				
			})
			
		})
		
	}
	
})(jQuery)
