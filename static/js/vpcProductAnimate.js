var Product;

Product = (function() {
  var $jqBody, $jqWindow, $platformBox, $platformClass, $platformleftMenu, $productCircle, $productContainer, $productDescContainer, $productToolItem, $productTools, $videoBlock, $videoBox, $videoContainer, $vpcClassContainer, $vpcClassItem, $vpcPlayerBox, addHoverClass, bindActions, mapElements, removeHoverClass, _adjustFont, _circleByContent, _initClassTab, _initControlPalyer, _initPlatformDesc, _initPlayer, _rorateTools, _showPlayer, _showProductContent;
  $productContainer = null;
  $vpcClassContainer = null;
  $vpcClassItem = null;
  $vpcPlayerBox = null;
  $videoContainer = null;
  $videoBlock = null;
  $videoBox = null;
  $jqWindow = null;
  $jqBody = null;
  $platformleftMenu = null;
  $platformClass = null;
  $platformBox = null;
  $productTools = null;
  $productCircle = null;
  $productToolItem = null;
  $productDescContainer = null;
  mapElements = function() {
    var $playerBtn;
    $productContainer = $('#product-box');
    $vpcClassContainer = $('.vpc-class-tab');
    $vpcClassItem = $('.vpc-tab-item');
    $vpcPlayerBox = $('.vpc-palyer-bg_box');
    $videoContainer = $('.video-player-container');
    $videoBox = $('.video-player-box');
    $videoBlock = $('.video-player-block');
    $jqWindow = $(window);
    $jqBody = $('body');
    $playerBtn = $('.vpc-player-btn');
    $platformleftMenu = $('.product-left-menu');
    $platformClass = $('.platform-class');
    $platformBox = $('.product-platform-box');
    $productTools = $('#product-tools');
    $productCircle = $productTools.find('.proudct-circle-tool');
    $productToolItem = $productCircle.find('.product-tool');
    $productDescContainer = $('.product-tool-desc-container');
  };
  bindActions = function() {
    $vpcClassItem.hover(_initClassTab);
    $productContainer.on('click', '.vpc-player-btn', _showPlayer);
    $platformBox.on('click', '.view-video', _showPlayer);
    $platformClass.hover(_initPlatformDesc);
    $productCircle.on('click', '.product-tool', _rorateTools);
    $productToolItem.hover(addHoverClass, removeHoverClass);
    $productTools.on('click', '.tool-tab', _showProductContent);
  };
  addHoverClass = function() {
    var angle, num;
    num = $(this).data('num');
    angle = $(this).data('angle');
    if (angle !== 0) {
      $(this).addClass('product-tool-hover-' + num);
    }
  };
  removeHoverClass = function() {
    var angle, num;
    num = $(this).data('num');
    angle = $(this).data('angle');
    if (angle !== 0) {
      $(this).removeClass('product-tool-hover-' + num);
    }
  };
  _initClassTab = function() {
    var marginLeft, num;
    num = $(this).data('num');
    $vpcClassContainer.find('.vpc-tab-item-active').removeClass('vpc-tab-item-active');
    $(this).addClass('vpc-tab-item-active');
    marginLeft = (1 - num) * 690;
    $vpcPlayerBox.css('left', marginLeft + 'px');
  };
  _showProductContent = function() {
    var $descContainer, $otherTab, $tabLine, num, otherNum;
    num = $(this).data('num');
    $tabLine = $(this).parent('.product-tool-desc-tab').siblings('.tab-line');
    $descContainer = $(this).parent('.product-tool-desc-tab').siblings('.product-tool-desc-box');
    $otherTab = $(this).siblings('.tool-tab');
    otherNum = $otherTab.data('num');
    $tabLine.removeClass('tab-line-' + otherNum);
    $tabLine.addClass('tab-line-' + num);
    $descContainer.find('.product-tool-desc-' + otherNum).addClass('hide');
    $descContainer.find('.product-tool-desc-' + num).removeClass('hide');
  };
  _initPlayer = function() {
    var $closeBtn, boxLeft, boxTop, innerHeight, jqHeight, jqWidth, scrollTop;
    innerHeight = $jqBody.height() + 80;
    scrollTop = $jqWindow.scrollTop();
    $jqBody.addClass('over-hidden');
    jqWidth = $jqWindow.width();
    jqHeight = $jqWindow.height();
    $videoBlock.height(innerHeight);
    $videoBlock.width(jqWidth);
    $videoBlock.css('left', 0);
    $videoBlock.css('top', 0 - innerHeight);
    boxLeft = jqWidth * 0.5 - 450;
    boxTop = (jqHeight * 0.5 - 250) + (0 - innerHeight) + scrollTop;
    $videoBox.css('left', boxLeft);
    $videoBox.css('top', boxTop);
    $closeBtn = $videoBox.find('.y-dly-close');
    $closeBtn.on('click', function() {
      $videoContainer.removeClass('kloud-layer-show');
      $jqBody.removeClass('over-hidden');
    });
    _initControlPalyer();
  };
  _initControlPalyer = function() {
    $('video').mediaelementplayer({
      alwaysShowControls: true,
      videoVolume: 'horizontal',
      features: ['playpause', 'progress', 'volume', 'fullscreen']
    });
  };
  _showPlayer = function() {
    _initPlayer();
    $videoContainer.addClass('kloud-layer-show');
  };
  _initPlatformDesc = function() {
    var $currentDescBox, $featureDescBox, num;
    num = $(this).data('num');
    $platformClass.removeClass('platform-class-active');
    $(this).addClass('platform-class-active');
    $currentDescBox = $platformBox.find('.product-right-desc');
    $currentDescBox.removeClass('product-right-desc_show');
    $featureDescBox = $platformBox.find('.product-right-desc-' + num);
    $featureDescBox.addClass('product-right-desc_show');
  };
  _rorateTools = function() {
    var $currentSpan, angle, angleStr, circleAngle, num, otherItem, totalAngel;
    num = $(this).data('num');
    angle = $(this).data('angle');
    if (angle !== 0) {
      $currentSpan = $(this);
      otherItem = $productCircle.find('.product-tool');
      $productCircle.find('.tool-title').addClass('hide');
      otherItem.each(function(idn, item) {
        var $item, afterAngel, currentAngle, currentNum;
        $item = $(item);
        currentNum = $item.data('num');
        currentAngle = $item.data('angle');
        afterAngel = currentAngle - angle;
        $item.data('angle', afterAngel);
        $item.removeClass('product-tool-active-' + currentNum);
      });
      circleAngle = $productCircle.data('angle');
      totalAngel = angle + circleAngle;
      angleStr = 'rotate(' + totalAngel + 'deg)';
      $productCircle.css('transform', angleStr);
      $productCircle.css('-webkit-transform', angleStr);
      $productCircle.css('-moz-transform', angleStr);
      $productCircle.css('-o-transform', angleStr);
      $productCircle.css('-ms-transform', angleStr);
      $productCircle.data('angle', totalAngel);
      setTimeout(function() {
        otherItem.each(function(idn, item) {
          var $item, numActive;
          $item = $(item);
          numActive = $item.data('num');
          return $item.removeClass('product-tool-active-' + numActive);
        });
        _adjustFont($currentSpan);
        $productCircle.find('.tool-title').removeClass('hide');
        _circleByContent($currentSpan);
        $currentSpan.addClass('product-tool-active-' + num);
      }, 1000);
    }
  };
  _circleByContent = function(obj) {
    var num;
    num = obj.data('num');
    $productTools.find('.product-tool-desc-container').addClass('hide');
    $productTools.find('.product-tool-desc-container-' + num).removeClass('hide');
  };
  _adjustFont = function(obj) {
    var num;
    num = obj.data('num');
    $productToolItem.each(function(idn, item) {
      var $item, $toolTitle, curreNum;
      $item = $(item);
      $toolTitle = $item.find('.tool-title');
      curreNum = $item.data('num');
      if (num === 1) {
        $toolTitle.css('transform', 'rotate(180deg)');
        $toolTitle.css('-webkit-transform', 'rotate(180deg)');
        $toolTitle.css('-moz-transform', 'rotate(180deg)');
        $toolTitle.css('-o-transform', 'rotate(180deg)');
        $toolTitle.css('-ms-transform', 'rotate(180deg)');
        if (curreNum === 1) {
          $toolTitle.css('margin-top', '80px');
          $toolTitle.css('margin-left', '0');
          $toolTitle.width(68);
        }
        if (curreNum === 2) {
          $toolTitle.css('margin-top', '135px');
          $toolTitle.css('margin-left', '35px');
          $toolTitle.width(58);
        }
        if (curreNum === 3) {
          $toolTitle.css('margin-top', '60px');
          $toolTitle.css('margin-left', '0');
          $toolTitle.width(136);
        }
        if (curreNum === 4) {
          $toolTitle.css('margin-top', '135px');
          $toolTitle.css('margin-left', '-25px');
          $toolTitle.width(58);
        }
      }
      if (num === 2) {
        $toolTitle.css('transform', 'rotate(-90deg)');
        $toolTitle.css('-webkit-transform', 'rotate(-90deg)');
        $toolTitle.css('-moz-transform', 'rotate(-90deg)');
        $toolTitle.css('-o-transform', 'rotate(-90deg)');
        $toolTitle.css('-ms-transform', 'rotate(-90deg)');
        if (curreNum === 1) {
          $toolTitle.css('margin-top', '31px');
          $toolTitle.css('margin-left', '0');
          $toolTitle.width(68);
        }
        if (curreNum === 2) {
          $toolTitle.css('margin-top', '135px');
          $toolTitle.css('margin-left', '-20px');
          $toolTitle.width(100);
        }
        if (curreNum === 3) {
          $toolTitle.css('margin-top', '45px');
          $toolTitle.css('margin-left', '-20px');
          $toolTitle.width(60);
        }
        if (curreNum === 4) {
          $toolTitle.css('margin-top', '135px');
          $toolTitle.css('margin-left', '-25px');
          $toolTitle.width(100);
        }
      }
      if (num === 3) {
        $toolTitle.css('transform', 'rotate(0deg)');
        $toolTitle.css('-webkit-transform', 'rotate(0deg)');
        $toolTitle.css('-moz-transform', 'rotate(0deg)');
        $toolTitle.css('-o-transform', 'rotate(0deg)');
        $toolTitle.css('-ms-transform', 'rotate(0deg)');
        if (curreNum === 1) {
          $toolTitle.css('margin-top', '31px');
          $toolTitle.css('margin-left', '0');
          $toolTitle.width(68);
        }
        if (curreNum === 2) {
          $toolTitle.css('margin-top', '135px');
          $toolTitle.css('margin-left', '35px');
          $toolTitle.width(58);
        }
        if (curreNum === 3) {
          $toolTitle.css('margin-top', '60px');
          $toolTitle.css('margin-left', '0');
          $toolTitle.width(136);
        }
        if (curreNum === 4) {
          $toolTitle.css('margin-top', '135px');
          $toolTitle.css('margin-left', '-25px');
          $toolTitle.width(58);
        }
      }
      if (num === 4) {
        $toolTitle.css('transform', 'rotate(90deg)');
        $toolTitle.css('-webkit-transform', 'rotate(90deg)');
        $toolTitle.css('-moz-transform', 'rotate(90deg)');
        $toolTitle.css('-o-transform', 'rotate(90deg)');
        $toolTitle.css('-ms-transform', 'rotate(90deg)');
        if (curreNum === 1) {
          $toolTitle.css('margin-top', '31px');
          $toolTitle.css('margin-left', '0');
          $toolTitle.width(68);
        }
        if (curreNum === 2) {
          $toolTitle.css('margin-top', '135px');
          $toolTitle.css('margin-left', '20px');
          $toolTitle.width(100);
        }
        if (curreNum === 3) {
          $toolTitle.css('margin-top', '45px');
          $toolTitle.css('margin-left', '0');
          $toolTitle.width(60);
        }
        if (curreNum === 4) {
          $toolTitle.css('margin-top', '135px');
          $toolTitle.css('margin-left', '15px');
          return $toolTitle.width(100);
        }
      }
    });
  };
  return {
    init: function() {
      mapElements();
      bindActions();
    }
  };
})();
