var Tab;

Tab = (function() {
  var _, _lineMoveToTab;
  _lineMoveToTab = function(jqTab) {
    var left, line, w, wrapLine;
    left = jqTab.position().left;
    w = jqTab.width();
    wrapLine = jqTab.parents('.tab-box').find('.wrap-line');
    line = wrapLine.children('.line');
    line.animate({
      'left': left + 1
    }, 100);
  };
  _ = {
    init: function(tabCont, contents) {
      var tabs;
      tabs = tabCont.children('li');
      tabs.hover(function() {
        var c, obj, wrapLine;
        obj = $(this);
        c = obj.data('c');
        tabs.removeClass('hover');
        contents.removeClass('hover');
        obj.addClass('hover');
        contents.filter("[data-c='" + c + "']").addClass('hover');
        wrapLine = obj.parents('.tab-box').find('.wrap-line');
        wrapLine.data('selected-index', obj.index());
      });
      tabs.mouseenter(function() {
        var obj;
        obj = $(this);
        _lineMoveToTab(obj);
      });
      tabCont.mouseleave(function() {
        var line, obj, selectedIndex, tab, wrapLine;
        obj = $(this);
        wrapLine = obj.parents('.tab-box').find('.wrap-line');
        line = wrapLine.children('.line');
        selectedIndex = wrapLine.data('selected-index') || 0;
        tab = obj.children("li:eq(" + selectedIndex + ")");
        _lineMoveToTab(tab);
      });
    }
  };
  return _;
})();
