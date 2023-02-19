$(function() {
  $('#mission .button-more').on('mouseover', function() {
    $(this).animate({
      opacity: 0.5,
      marginLeft: 20,
    }, 100);
  });
  $('#mission .button-more').on('mouseout', function() {
    $(this).animate({
      opacity: 1.0,
      marginLeft: 0,
    }, 100);
  });

  $('#product .button-more').on('mouseover', function() {
    $(this).animate({
      opacity: 0.5,
      marginLeft: 40,
    }, 100);
  });
  $('#product .button-more').on('mouseout', function() {
    $(this).animate({
      opacity: 1.0,
      marginLeft: 20,
    }, 100);
  });

  //カルーセル
  $('.carousel').slick({
    autoplay: true,
    dots: true,
    infinite: true,
    autoplaySpeed: 5000,
    arrows: false,
  });

  //AjaxでSTATIC FORMSにデータを送信
  $('#submit').on('click', function(event) {
    event.preventDefault();

    let result = inputCheck();

    let error = result.error;
    let message = result.message;

    if (error == false) {
      $.ajax({
        url: 'https://api.staticforms.xyz/submit',
        type: 'POST',
        dataType: 'json',
        data: $('#form').serialize(),
        success: function (result) {
          alert('お問い合わせを送信しました。')
        },
        error: function (xhr, resp, text) {
          alert('お問い合わせを送信できませんでした。')
        }
      })
    } else {
      alert(message);
    }
  });

  $('#name').blur(function() {
    inputCheck();
  });
  $('#furigana').blur(function() {
    inputCheck();
  });
  $('#email').blur(function() {
    inputCheck();
  });
  $('#phone').blur(function() {
    inputCheck();
  });
  $('#message').blur(function() {
    inputCheck();
  });
  $('#agree').blur(function() {
    inputCheck();
  });

  //お問い合わせフォームの入力チェック
  function inputCheck() {
    let result;

    let message = '';

    let error = false;

    if ($('#name').val() == '') {
      $('#name').css('background-color', '#f79999')
      error = true;
      message += 'お名前を入力してください。\n';
    } else {
      $('#name').css('background-color', '#fafafa')
    }

    if ($('#furigana').val() == '') {
      $('#furigana').css('background-color', '#f79999')
      error = true;
      message += 'フリガナを入力してください。\n';
    } else {
      $('#furigana').css('background-color', '#fafafa')
    }

    if ($('#message').val() == '') {
      $('#message').css('background-color', '#f79999')
      error = true;
      message += 'お問い合わせ内容を入力してください。\n';
    } else {
      $('#message').css('background-color', '#fafafa')
    }

    if ($('#email').val() == '' || $('#email').val().indexOf('@') == -1 || $('#email').val().indexOf('.') == -1) {
      $('#email').css('background-color', '#f79999');
      error = true;
      message += 'メールアドレスが未記入、または「@」「.」が含まれていません。\n';
    } else {
      $('#email').css('background-color', '#fafafa');
    }

    if ($('#phone').val() != '' && $('#phone').val().indexOf('-') == -1) {
      $('#phone').css('background-color', '#f79999');
      error = true;
      message += '電話番号に「-」が含まれていません。\n';
    } else {
      $('#phone').css('background-color', '#fafafa');
    }

    if ($('#agree').prop('checked') == false) {
      error = true;
      message += '個人情報の取り扱いについてご同意いただける場合は、チェックボックスにチェックしてください。\n';
    }

    if (error == true) {
      $('#submit').attr('src', 'images/button-submit.png');
    } else {
      $('#submit').attr('src', 'images/button-submit-blue.png');
    }

    result = {
      error: error,
      message: message
    }

    return result;
  }
});