var About;

About = (function() {
  var _init;
  _init = function() {
    var aboutBox;
    aboutBox = $('div.about-box');
    return Tab.init(aboutBox.find('.sj-nav'), aboutBox.find('.about-content'));
  };
  return {
    init: function() {
      _init();
    }
  };
})();
