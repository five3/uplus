var Train;

Train = (function() {
  var selectClass, showTrainDetail, _init, _showTrainDetail;
  _init = function() {
    $('table.train-table a').on('click', showTrainDetail);
    $('.train-class li').on('click', selectClass);
  };
  _showTrainDetail = function(trainId) {
    var rs;
    rs = false;
    if ($("#" + trainId).size() !== 0) {
      $('#train-detail div.train-detail-content').hide();
      $("#" + trainId).show();
      $("#" + trainId + " li:first").trigger('click');
      rs = true;
    }
    return rs;
  };
  showTrainDetail = function() {
    var trainId, _targetTop;
    trainId = $(this).data('trainid');
    if (_showTrainDetail(trainId)) {
      _targetTop = $('#train-detail').offset().top;
      $("html,body").animate({
        scrollTop: _targetTop
      }, 500);
    }
  };
  selectClass = function() {
    var _href;
    $('.train-class li').removeClass('selected');
    $(this).addClass('selected');
    _href = $(this).data('href');
    $(this).parents('.train-class').find('.enter').attr('href', _href);
  };
  return {
    init: function() {
      _init();
    }
  };
})();
