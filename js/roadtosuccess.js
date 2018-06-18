// Get the input field
var input = document.getElementById("myInput");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Cancel the default action, if needed
  event.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Trigger the button element with a click
    document.getElementById("goToPosBtn").click();
  }
});
function getOffset(el) {
  el = el[0].getBoundingClientRect();
  return {
    left: el.left + window.scrollX,
    top: el.top + window.scrollY
  }
}

function slideTo(x, y, time, decelRate, interval) {
	if (!decelRate)
		decelRate = 1;
	if (!interval)
		interval = 25;
	slideTo_h(x, y, time * decelRate, decelRate, interval, (new Date()).getTime());
}

function slideTo_h(x, y, time, decelRate, interval, dateTime) {
	if (time <= 0) {
		window.scrollTo(x, y);
		return;
	}
	var delay = interval + dateTime - (new Date()).getTime();
	setTimeout(function() { slideTo_h(x, y, time - interval * decelRate, decelRate, interval, dateTime + interval); }, (delay > 0 ? delay : 0));
	var m = interval / time;
	var rateX = (x - (document.documentElement.scrollLeft || document.body.scrollLeft)) * m;
	var rateY = (y - (document.documentElement.scrollTop || document.body.scrollTop)) * m;
	window.scrollBy(rateX, rateY);
}

function goToPos() {
    var speed = 500;
    input = document.getElementById('myInput').value;
    var elem = $("#"+input);
    var rect = getOffset(elem);
    var w = window.innerWidth/2;
    var cElem = elem[0].children[0];
    var wElem = cElem.offsetWidth/2;
    var hElem = cElem.offsetHeight/2;
    var h = window.innerHeight/2;
    var leftSide = +wElem-w+rect.left;
    var topSide = +hElem-h+rect.top;
    slideTo(leftSide,topSide, speed);
    elem.fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
};
// <-- TOGGLE OPPORTUNITIES -->

$(document).ready(function(){
    console.log("scrolling");
    $(window).scroll(function(){
      $('.footer').css('left', 20 - $(this).scrollLeft());
      $('.sidebar').css('top', 20 - $(this).scrollTop());
    });
  });

  $(document).ready(function(){
    var elems = $('.vl');
    for (i = 0; i < elems.length; i++) {
      var el = elems[i];
      el.style.left =(i+1)*370-1+"px";
    }
  });
  $(document).ready(function(){
    var elems = $('.hl');
    for (i = 0; i < elems.length; i++) {

      var el = elems[i];
      el.style.top =(i+1) * 370-1+"px";
    }
  });

 $(document).ready(function(){
    $("button1").click(function(){
      $('.myVideo').fadeToggle();
      $('.samtale').fadeToggle(2000);
      $('.surveyElev').fadeToggle();
      $("#surveyLærer").fadeToggle();
      $('.cap').fadeToggle();
      $('.googleLille').fadeToggle();
      $('.googleMellem').fadeToggle();
      $('.googleStor').fadeToggle();
  });
});

// <-- RESET FUNCTION -->

function resetPos(){
  localStorage.clear();
  location.reload();
}

// <-- LINKS -->

function dbclick1() {
    window.open("https://kadk.dk/employee/tine-kjoelsen");
}

function dbclick2() {
    window.open("https://www.chartgo.com/");
}

function dbclick3() {
    window.open("https://www.vistaprint.dk/studio.aspx?pf_id=AGC&page=1&alt_doc_id=RHRC6-V4A65-0U9&cart_alt_doc_id=RHRC6-V4A65-0U9&template=599778~s2_AGC_AH9");
}

function dbclick4() {
    window.open("https://kadk.dk/en/employee/elias-stenalt-werner");
}

function test(e, el) {
  $('html').css('cursor', getCursor());
  var $el = $(el);
  settings.scrollVertical && $el.scrollTop($el.scrollTop() + (clickY - e.pageY));
  settings.scrollHorizontal && $el.scrollLeft($el.scrollLeft() + (clickX - e.pageX));
}


// <-- SHUFFLE -->

function randPos(){

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }
  class ui {
    constructor(top, left) {
      this.top = top;
      this.left = left;
    }
  }
  var sPositions = localStorage.positions || "{}",
  positions = JSON.parse(sPositions);
  elems = $( ".draggable" );
  var i;
  var margin = 100;
  for (i = 0; i < elems.length; i++) {
    var h = document.body.clientHeight;
    var w = document.body.clientWidth;
    var h = getRndInteger(margin, h - margin * 4);
    var w = getRndInteger(margin, w - margin * 4);
    var el = elems[i];
    el.style.position = "absolute";
    el.style.top =  h + "px";//Math.floor(50);
    el.style.left = w + "px";//Math.floor(50);
    var p = new ui(h, w);
    positions[el.id] = p;
    var string = JSON.stringify(positions)
    localStorage.positions = string;
  }

}

// <-- DRAGGABLE -->

$(function(){
var clicked = false,
    clickY, clickX;
  $.dragDivs = $(function(){
    elems = $( ".draggable" );
    var sPositions = localStorage.positions || "{}",
      positions = JSON.parse(sPositions);
  $.each(positions, function (id, pos) {
      $("#" + id).css(pos)
      $("#" + id).css({position: 'absolute'})
  })
  var i;
  for (i = 0; i < elems.length; i++) {
    $("#"+elems[i].id).draggable({
        scroll: false,
        start: function (event, ui){
              clicked = false
        },
        stop: function (event, ui) {
            clicked = false
            positions[this.id] = ui.position
            localStorage.positions = JSON.stringify(positions)
        }
      });
    }
  });

  $.dragScroll = function(options) {
    var settings = $.extend({
      scrollVertical: true,
      scrollHorizontal: true,
      cursor: null
    }, options);



    var getCursor = function() {
      if (settings.cursor) return settings.cursor;
      if (settings.scrollVertical && settings.scrollHorizontal) return 'move';
      if (settings.scrollVertical) return 'row-resize';
      if (settings.scrollHorizontal) return 'col-resize';
    }

    var updateScrollPos = function(e, el) {
      $('html').css('cursor', getCursor());
      var $el = $(el);
      settings.scrollVertical && $el.scrollTop($el.scrollTop() + (clickY - e.pageY));
      settings.scrollHorizontal && $el.scrollLeft($el.scrollLeft() + (clickX - e.pageX));
    }

    $(document).on({
      'mousemove': function(e) {
        clicked && updateScrollPos(e, this);
      },
      'mousedown': function(e) {
        clickY = e.pageY;
        clickX = e.pageX;
        clicked = true;
      },
      'mouseup': function() {
        clicked = false;
        $('html').css('cursor', 'auto');
      }
    });
  }
}(jQuery));

$.dragScroll();

$('.draggable').draggable({cancel: ''}); /* making textarea draggable */
