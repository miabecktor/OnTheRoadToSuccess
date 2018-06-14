// function hiddenfunction(){
//
//   // document.getElementById("draggable2").
//   // style.cssText='visibility:hidden;';
//
//  var x = document.getElementsByClassName("dra");
//
//  if (x.style.visibility == 'hidden'){
//    x.style.visibility = 'visible';
//  } else {
//    x.style.visibility = 'hidden';
//  }
//
// }



function dbclick1() {
    window.open("https://kadk.dk/employee/tine-kjoelsen");
}

function dbclick2() {
    window.open("https://www.chartgo.com/");
}

$(function(){
var clicked = false,
    clickY, clickX;
  $.dragDivs = $(function(){
    elems = $( ".draggable" );
    var sPositions = localStorage.positions || "{}",
      positions = JSON.parse(sPositions);
  $.each(positions, function (id, pos) {
      $("#" + id).css(pos)
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
