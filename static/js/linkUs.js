var LinkUs;

LinkUs = (function() {
  var $formSumitBtn, $linkForm, bindActions, createCode, getCookie, linkerInfoData, mapElements, removeError, setCookie, setFormData, submitForm, _validateForm;
  $linkForm = null;
  $formSumitBtn = null;
  linkerInfoData = {};
  mapElements = function() {
    $linkForm = $('.linker-form');
    $formSumitBtn = $('.form-subBtn');
  };
  bindActions = function() {
    $linkForm.on('click', '.change-validate-code', createCode);
    $formSumitBtn.on('click', submitForm);
    $linkForm.on('focus', '.linker-input', removeError);
  };
  createCode = function() {
    var $validateCodeBox, charIndex, code, codeLength, i, selectChar, _i;
    code = '';
    $validateCodeBox = $linkForm.find('.validate-code');
    $validateCodeBox.html('');
    codeLength = 6;
    selectChar = [2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for (i = _i = 0; _i < codeLength; i = _i += 1) {
      charIndex = Math.floor(Math.random() * 32);
      code += selectChar[charIndex];
    }
    if (codeLength !== code.length) {
      createCode();
    }
    setCookie('sso_code', code);
    $validateCodeBox.html(code);
  };
  removeError = function() {
    $(this).removeClass('input-error');
    $(this).siblings('.error-msg').html('');
  };
  submitForm = function() {
    var userInfo;
    if (_validateForm()) {
      setFormData();
      userInfo = {
        'user': linkerInfoData
      };
      $.post('/linkerInfo', userInfo, function(result) {
        if (result.status === 'success') {
          alert('信息保存成功');
          $linkForm[0].reset();
        } else {
          alert('信息保存失败');
        }
      }, 'json');
    }
  };
  _validateForm = function() {
    var $emailInput, $phoneInput, $validateInput, email, flag, phone, validateCode, validater;
    $emailInput = $linkForm.find('#link-email');
    $phoneInput = $linkForm.find('#link-phone');
    $validateInput = $linkForm.find('.link-input_valdater');
    email = $emailInput.val();
    phone = $phoneInput.val();
    validater = $validateInput.val().toUpperCase();
    flag = true;
    if (email !== '') {
      $emailInput.removeClass('input-error');
      $emailInput.siblings('.error-msg').html('');
      if (email.search(/^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.(?:com|cn)$/) !== -1) {
        $emailInput.removeClass('input-error');
        $emailInput.siblings('.error-msg').html('');
      } else {
        $emailInput.addClass('input-error');
        $emailInput.siblings('.error-msg').html('请输入正确的邮件格式');
      }
    } else {
      $emailInput.addClass('input-error');
      $emailInput.siblings('.error-msg').html('邮件不能位空');
    }
    if (phone !== '') {
      $phoneInput.removeClass('input-error');
      $phoneInput.siblings('.error-msg').html('');
      if ((phone.search(/^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/) !== -1) || (phone.search(/^(13[0-9]|15[0|3|6|7|8|9]|18[8|9])\d{8}$/) !== -1)) {
        $phoneInput.removeClass('input-error');
        $phoneInput.siblings('.error-msg').html('');
      } else {
        $phoneInput.addClass('input-error');
        $phoneInput.siblings('.error-msg').html('请输入正确的电话号码格式');
      }
    } else {
      $phoneInput.addClass('input-error');
      $phoneInput.siblings('.error-msg').html('联系电话不能为空');
    }
    validateCode = (getCookie('sso_code').split(';'))[0];
    if (validater !== '') {
      $validateInput.removeClass('input-error');
      $validateInput.siblings('.error-msg').html('');
      if (validater === validateCode) {
        $validateInput.removeClass('input-error');
        $validateInput.siblings('.error-msg').html('');
      } else {
        $validateInput.addClass('input-error');
        $validateInput.siblings('.error-msg').html('验证码错误');
      }
    } else {
      $validateInput.addClass('input-error');
      $validateInput.siblings('.error-msg').html('验证码不能为空');
    }
    if (($linkForm.find('.input-error').length) > 0) {
      flag = false;
    }
    return flag;
  };
  setFormData = function() {
    var $linkCompanyInput, $linkEmailInput, $linkMesgInput, $linkNameInput, $linkPhoneInput;
    $linkNameInput = $linkForm.find('.link-input-name');
    $linkEmailInput = $linkForm.find('.link-input-eamil');
    $linkCompanyInput = $linkForm.find('.link-input-company');
    $linkPhoneInput = $linkForm.find('.link-input-phone');
    $linkMesgInput = $linkForm.find('.linker-textare-msg');
    linkerInfoData.name = $linkNameInput.val();
    linkerInfoData.email = $linkEmailInput.val();
    linkerInfoData.company = $linkCompanyInput.val();
    linkerInfoData.phone = $linkPhoneInput.val();
    return linkerInfoData.message = $linkMesgInput.val();
  };
  setCookie = function(name, value) {
    var Days, exp;
    Days = 30;
    exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value + ";expires=" + exp.toGMTString());
  };
  getCookie = function(name) {
    var arr, reg;
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
      return unescape(arr[2].split(';')[0]);
    } else {
      return null;
    }
  };
  return {
    init: function() {
      mapElements();
      bindActions();
      createCode();
    }
  };
})();
