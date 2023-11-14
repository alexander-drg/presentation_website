//dropdown menu
jQuery(function($) {
  "use strict";
  
  $(function() {
    var header = $(".start-style");
    $(window).scroll(function() {    
      var scroll = $(window).scrollTop();
      if (scroll >= 10) {
        header.removeClass('start-style').addClass("scroll-on");
      } else {
        header.removeClass("scroll-on").addClass('start-style');
      }
    });
  });
});

// animation
$(document).ready(function() {
		$('body.hero-anime').removeClass('hero-anime');
	});
//menu on hover    
 	$('body').on('mouseenter mouseleave','.nav-item',function(e){
			if ($(window).width() > 750) {
				var _d=$(e.target).closest('.nav-item');_d.addClass('show');
				setTimeout(function(){
				_d[_d.is(':hover')?'addClass':'removeClass']('show');
				},1);
			}
	});	

  // phone slider
  dragging = false;
'use strict';

///console.clear();

class Grain {
  constructor(el) {
    /**
    * Options
    * Increase the pattern size if visible pattern
    */
    this.patternSize = 150;
    this.patternScaleX = 1;
    this.patternScaleY = 1;
    this.patternRefreshInterval = 3; // 8
    this.patternAlpha = 28; // int between 0 and 255,

    /**
    * Create canvas
    */
    this.canvas = el;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.scale(this.patternScaleX, this.patternScaleY);

    /**
    * Create a canvas that will be used to generate grain and used as a
    * pattern on the main canvas.
    */
    this.patternCanvas = document.createElement('canvas');
    this.patternCanvas.width = this.patternSize;
    this.patternCanvas.height = this.patternSize;
    this.patternCtx = this.patternCanvas.getContext('2d');
    this.patternData = this.patternCtx.createImageData(this.patternSize, this.patternSize);
    this.patternPixelDataLength = this.patternSize * this.patternSize * 4; // rgba = 4

    /**
    * Prebind prototype function, so later its easier to user
    */
    this.resize = this.resize.bind(this);
    this.loop = this.loop.bind(this);
    this.frame = 0;
    window.addEventListener('resize', this.resize);
    this.resize();
    window.requestAnimationFrame(this.loop);
  }
  resize() {
    this.canvas.width = window.innerWidth * devicePixelRatio;
    this.canvas.height = window.innerHeight * devicePixelRatio;
  }
  update() {
    const {
      patternPixelDataLength,
      patternData,
      patternAlpha,
      patternCtx
    } = this;

    // put a random shade of gray into every pixel of the pattern
    for (let i = 0; i < patternPixelDataLength; i += 4) {
      // const value = (Math.random() * 255) | 0;
      const value = Math.random() * 255;
      patternData.data[i] = value;
      patternData.data[i + 1] = value;
      patternData.data[i + 2] = value;
      patternData.data[i + 3] = patternAlpha;
    }
    patternCtx.putImageData(patternData, 0, 0);
  }
  draw() {
    const {
      ctx,
      patternCanvas,
      canvas,
      viewHeight
    } = this;
    const {
      width,
      height
    } = canvas;

    // clear canvas
    ctx.clearRect(0, 0, width, height);

    // fill the canvas using the pattern
    ctx.fillStyle = ctx.createPattern(patternCanvas, 'repeat');
    ctx.fillRect(0, 0, width, height);
  }
  loop() {
    // only update grain every n frames
    const shouldDraw = ++this.frame % this.patternRefreshInterval === 0;
    if (shouldDraw) {
      this.update();
      this.draw();
    }
    window.requestAnimationFrame(this.loop);
  }
}

/**
 * Initiate Grain
 */
const el = document.querySelector('.grain');
const grain = new Grain(el);
$('.phone').mousedown(function (e) {
  initX = e.clientX;
  dragging = true;
});
$('html').mouseup(function () {
  dragging = false;
  $('.dynamicCursor').css('width', '18px');
});
$('.phone').mousemove(function (e) {
  if (dragging) {
    let mouseX = e.clientX;
    difference = mouseX - initX;
    console.log(difference);
    $('.dynamicCursor').css('width', Math.abs(difference) + 'px');
    if (difference > 60) {
      $('.phone').addClass('open');
    }
    if (difference < -60) {
      $('.phone').removeClass('open');
    }
  }
});
function drawMouseSpeedDemo() {
  var mrefreshinterval = 30; // update display every 500ms
  var lastmousex = -1;
  var lastmousey = -1;
  var lastmousetime;
  var mousetravel = 0;
  var mpoints = [];
  var mpoints_max = 30;
  var direction;
  $('html').mousemove(function (e) {
    var mousex = e.pageX;
    var mousey = e.pageY;
    if (lastmousex > -1) {
      mousetravel += Math.max(Math.abs(mousex - lastmousex), Math.abs(mousey - lastmousey));
    }
    // console.log(mousex-lastmousex)

    if (mousex - lastmousex > 0) {
      direction = '+';
    } else {
      direction = '-';
    }

    //console.log(direction);

    lastmousex = mousex;
    lastmousey = mousey;
  });
  var mdraw = function () {
    var md = new Date();
    var timenow = md.getTime();
    if (lastmousetime && lastmousetime != timenow) {
      var pps = Math.round(mousetravel / (timenow - lastmousetime) * 1000);
      mpoints.push(pps);
      if (mpoints.length > mpoints_max) mpoints.splice(0, 1);
      mousetravel = 0;
      //console.log(pps)
      if (dragging) {}
    }
    lastmousetime = timenow;
    setTimeout(mdraw, mrefreshinterval);
  };
  // We could use setInterval instead, but I prefer to do it this way
  setTimeout(mdraw, mrefreshinterval);
}
;
drawMouseSpeedDemo();

/* -------------------------------------------------

Dynamic cursor

--------------------------------------------------- */
var startButton = document.getElementById("js-startButton");



startButton.addEventListener("click", function () {
  if (!cube.classList.contains("animation")) {
    cube.classList.add("animation");
    cube.classList.remove("-pause");
  } else {
    cube.classList.remove("animation");
  }
});

