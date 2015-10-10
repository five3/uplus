'use strict';
$(function() {
  var index, isAboutPage, isErrorPage, isHomePage, isLinkUsPage, isProductPage, isServicePage, isTrainPage, jqBody, jqWindow, plotPoint;
  jqWindow = $(window);
  jqBody = $('body');
  isHomePage = $('#header-index').size() !== 0;
  isServicePage = $('#service-main-body').size() !== 0;
  isProductPage = $('#product-main-body').size() !== 0;
  isAboutPage = $('#about-main-body').size() !== 0;
  isLinkUsPage = $('#linkUs-main-body').size() !== 0;
  isTrainPage = $('#train-main-body').size() !== 0;
  isErrorPage = $('.not-found-bg').size() !== 0;
  index = isHomePage ? new IndexAnimate(jqWindow.width(), jqWindow.height()) : null;
  jqWindow.resize(function() {
    if (index != null) {
      index.setClientSize(jqWindow.width(), jqWindow.height());
      index.initHeader();
    }
  });
  jqWindow.scroll(function() {
    var scrollTop;
    scrollTop = jqWindow.scrollTop();
    if (index != null) {
      index.fixedHeaderNav(scrollTop);
    }
  });
  $(document).ready(function() {
    if (!isErrorPage) {
      return Browser.checkVersion();
    }
  });
  if (isServicePage) {
    if (typeof Service !== "undefined" && Service !== null) {
      Service.init();
    }
  }
  if (isProductPage) {
    if (typeof Product !== "undefined" && Product !== null) {
      Product.init();
    }
  }
  if (isAboutPage) {
    if (typeof About !== "undefined" && About !== null) {
      About.init();
    }
  }
  if (isLinkUsPage) {
    if (typeof LinkUs !== "undefined" && LinkUs !== null) {
      LinkUs.init();
    }
  }
  if (isTrainPage) {
    if (typeof Train !== "undefined" && Train !== null) {
      Train.init();
    }
  }
  if (!isHomePage) {
    if (typeof LeftNav !== "undefined" && LeftNav !== null) {
      LeftNav.init();
    }
  }
  plotPoint = function() {
    var id, top, url;
    url = window.location.toString();
    id = url.split('?')[1];
    if (id) {
      top = ($('#' + id).offset().top) - 80;
      $('html,body').animate({
        scrollTop: top
      }, 1000, 'easeOutExpo');
    }
  };
  plotPoint();
});
