var Browser;

Browser = (function() {
  var getInternetExplorerVersion, _checkVersion;
  getInternetExplorerVersion = function() {
    var re, rv, ua;
    rv = -1;
    if (navigator.appName === 'Microsoft Internet Explorer') {
      ua = navigator.userAgent;
      re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) !== null) {
        rv = parseFloat(RegExp.$1);
      }
    }
    return rv;
  };
  _checkVersion = function() {
    var ver;
    ver = getInternetExplorerVersion();
    if (ver > -1) {
      if (ver <= 8) {
        window.location.href = '/error';
      }
    }
  };
  return {
    checkVersion: _checkVersion
  };
})();
