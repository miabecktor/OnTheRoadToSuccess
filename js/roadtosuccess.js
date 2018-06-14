
// function scaleJobs(name){
//   var elems = document.getElementsByClassName(name);
//   var i;
//   for (i = 0; i < elems.length; i++) {
//     var x = elems[i]
//     if (x.style.height == '500px' && x.style.width =="400px"){
//       x.style.height = '100px';
//       x.style.width = '100px';
//     }
//     else{
//       x.style.height = '500px';
//       x.style.width = '400px';
//     }
//   }
// }
//
// function transistion(samtaleTine1){
// var x = document.getElementById("samtaleTine1");
//    x.style.transistion = 'all 2s';
//    x.style.height = '700px';
//    x.style.width = '400px';
//    x.style.border = "10px orange";
//  }

// <-- TOGGLE OPPORTUNITIES -->

 $(document).ready(function(){
    $("button").click(function(){
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
