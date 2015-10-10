var IndexAnimate;

IndexAnimate = (function() {
  var $indexCaseBox, firstOverTab, resetAticle, _clientSize, _jqBody, _jqCarousel, _jqCarouselAnimate, _jqIndexHeader, _jqProducts, _jqWindow;

  _jqIndexHeader = null;

  _jqProducts = null;

  _jqWindow = null;

  _jqBody = null;

  _jqCarousel = null;

  _jqCarouselAnimate = null;

  $indexCaseBox = null;

  _clientSize = {
    width: 0,
    height: 0
  };

  function IndexAnimate(winWidth, winHeight) {
    var aboutBox, serviceBox;
    _jqIndexHeader = $('#header-index');
    _jqProducts = $('#products');
    _jqWindow = $(window);
    _jqBody = $('body');
    _jqCarousel = $('#carousel-example-generic');
    _jqCarouselAnimate = $('#carousel');
    $indexCaseBox = $('.index-use-case');
    this.setClientSize(winWidth, winHeight);
    aboutBox = $('div.about-box');
    Tab.init(aboutBox.find('.sj-nav'), aboutBox.find('.about-content'));
    serviceBox = $('div.service-box');
    Tab.init(serviceBox.find('.service-nav'), serviceBox.find('.service-content'));
    this.initHeader();
    this.bindCaseTab();
    return;
  }

  IndexAnimate.prototype.setClientSize = function(w, h) {
    _clientSize.width = w;
    _clientSize.height = h;
  };

  IndexAnimate.prototype.initHeader = function() {
    _jqIndexHeader.height(Math.min(_clientSize.height, 838));
  };

  IndexAnimate.prototype.initCarouseindicators = function() {};

  IndexAnimate.prototype.fixedHeaderNav = function(scrollTop) {
    var carouselHeight, jqNav, navHeight;
    jqNav = _jqIndexHeader.find('.nav');
    carouselHeight = _jqCarousel.height();
    navHeight = jqNav.height();
    if (scrollTop >= carouselHeight - navHeight) {
      jqNav.addClass('nav-bg-color');
    } else {
      jqNav.removeClass('nav-bg-color');
    }
  };

  IndexAnimate.prototype.productEnter = function(scrollTop) {
    var h, items, offset;
    offset = _jqProducts.offset();
    if (offset.top < scrollTop + _clientSize.height - 50) {
      h = 0;
      items = _jqProducts.find('.product-item');
      items.each(function(idx, n) {
        var itemOffset, jqItem;
        jqItem = $(n);
        h = jqItem.height();
        jqItem.css('top', h * idx);
        itemOffset = jqItem.offset();
        if (itemOffset.top < scrollTop + _clientSize.height) {
          if (!jqItem.data('animated')) {
            jqItem.data('animated', true);
            if (jqItem.hasClass('at-left')) {
              return jqItem.animate({
                left: 0
              }, 600);
            } else {
              return jqItem.animate({
                right: 0
              }, 600);
            }
          }
        }
      });
    }
  };

  resetAticle = function() {
    $indexCaseBox.find('.index-case-content').stop().animate({
      width: 148
    }, 310, 'easeOutExpo').removeClass('index-case-open');
    $indexCaseBox.find('.index-case-content').find('.index-case-left > img').stop().animate({
      height: 100,
      width: 100,
      marginTop: 10
    }, 300, 'easeOutExpo');
    $indexCaseBox.find('.index-case-content').find('.index-case-desc').stop().animate({
      opacity: 0,
      marginTop: -20,
      display: 'none'
    }, 400, 'easeOutExpo');
  };

  firstOverTab = function() {
    $('.index-case-content:first').find('.index-case-left > img').mouseover();
  };

  IndexAnimate.prototype.bindCaseTab = function() {
    $(window).load(function() {
      firstOverTab();
    });
    $('.index-case-content').find('.index-case-left > img').on('mouseenter', function() {
      resetAticle();
      $(this).parent().parent('.index-case-content').stop().animate({
        width: 793
      }, 310, 'easeOutExpo').addClass('index-case-open');
      $(this).parent().parent('.index-case-content').find('.index-case-left > img').stop().animate({
        height: 128,
        width: 128,
        marginTop: 0
      }, 400, 'easeOutExpo');
      $(this).parent().parent('.index-case-content').find('.index-case-desc').stop().animate({
        opacity: 1,
        marginTop: 0,
        display: 'block'
      }, 400, 'easeOutExpo');
    }).on('focusin', function() {
      $(this).mouseenter();
    });
  };

  return IndexAnimate;

})();
