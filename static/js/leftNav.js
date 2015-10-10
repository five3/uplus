var LeftNav;

LeftNav = (function() {
  var $jqWindow, $leftNavBox, $mainBody, act, bindActions, data_a, mapElements, skipPostion, _initBoxArray, _initLeftNav;
  $leftNavBox = null;
  $jqWindow = null;
  $mainBody = null;
  data_a = new Array();
  act = 0;
  mapElements = function() {
    $leftNavBox = $('.left-nav');
    $jqWindow = $(window);
    $mainBody = $('.main-body');
  };
  bindActions = function() {
    $jqWindow.scroll(_initLeftNav);
    $leftNavBox.on('click', 'a', skipPostion);
    $(window).load(_initLeftNav);
  };
  _initLeftNav = function() {
    var boxItem, offy;
    offy = $jqWindow.scrollTop();
    boxItem = $mainBody.find('.box');
    boxItem.each(function(i, item) {
      var $item, end_y, len, next_y, prev_y;
      $item = $(item);
      prev_y = data_a[i] - 80;
      next_y = data_a[i + 1] - 80;
      len = boxItem.length - 1;
      end_y = data_a[len] - 80;
      if ((offy >= prev_y) && (offy < next_y)) {
        act = i;
      }
      if (offy >= end_y) {
        act = i;
      }
    });
    $leftNavBox.find('dd').find('a').removeClass('hover');
    $leftNavBox.find('dd').eq(act).find('a').addClass('hover');
  };
  _initBoxArray = function() {
    var boxItem;
    boxItem = $mainBody.find('.box');
    boxItem.each(function(idn, item) {
      var $item;
      $item = $(item);
      data_a[idn] = $item.offset().top;
    });
  };
  skipPostion = function() {
    var dy, index;
    index = ($(this).parent('dd').index()) - 1;
    dy = data_a[index] - 80;
    $('html,body').stop().animate({
      scrollTop: dy
    }, 1000, 'easeOutExpo');
    $(this).addClass('hover');
    $(this).parent('dd').siblings('dd').find('a').removeClass('hover');
  };
  return {
    init: function() {
      mapElements();
      bindActions();
      _initBoxArray();
    }
  };
})();
