var Service;

Service = (function() {
  var $body, $jqWindow, $serviceTabContainer, $skillBox, $systemServiceBox, mapElements, _bindActions, _initSolutionTab, _initSystemService;
  $serviceTabContainer = null;
  $jqWindow = null;
  $skillBox = null;
  $systemServiceBox = null;
  $body = null;
  mapElements = function() {
    $serviceTabContainer = $('#solution-box');
    $jqWindow = $(window);
    $body = $('body');
    $skillBox = $('#skill-box');
    $systemServiceBox = $('#systemyw-box');
  };
  _bindActions = function() {
    $serviceTabContainer.find('.solution-icon').hover(_initSolutionTab);
    $jqWindow.on('scroll', _initSystemService);
  };
  _initSystemService = function() {
    var $systemServiceItem, iconHeight, innerHeight, systemContent;
    systemContent = $systemServiceBox.find('.system-service-content');
    iconHeight = (systemContent.offset()).top;
    innerHeight = $jqWindow.height() + $jqWindow.scrollTop();
    $systemServiceItem = $systemServiceBox.find('.l-system-content');
    if (iconHeight < innerHeight) {
      if (!systemContent.data('animate')) {
        systemContent.data('animate', true);
        $systemServiceItem.each(function(id, item) {
          var $item, time;
          $item = $(item);
          time = $item.data('duration');
          setTimeout((function() {
            $item.addClass('system-service-content-animate');
            $item.css('opacity', 1);
          }), time);
        });
      }
    }
  };
  _initSolutionTab = function() {
    var $contentDiv, $currentContentDiv, active, num;
    num = $(this).attr('num');
    $currentContentDiv = $('.solution-desc-' + num);
    $contentDiv = $('.solution-desc');
    active = 'solution-icon_active-' + num;
    $serviceTabContainer.find('.solution-icon').each(function(id, item) {
      var numId;
      numId = $(item).attr('num');
      $(item).removeClass('solution-icon_active-' + numId);
    });
    $(this).addClass(active);
    $contentDiv.addClass('hide');
    $currentContentDiv.removeClass('hide');
  };
  return {
    init: function() {
      mapElements();
      _bindActions();
    }
  };
})();
