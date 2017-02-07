
// NAV
var Nav = {
  init: function() {
    $(document).ready(function(){       
       var scroll_start = 0;
       $(document).on('ready scroll', function() { 
          scroll_start = $(this).scrollTop();
          if(scroll_start > 50) {
              $('nav').css({'background-color': '#2C3E50', 'margin-top': 0, 'line-height': '40px'});
              $('#nav-logo').css({'left': '0', 'opacity': '1'});
           } else {
              $('nav').css({'background-color': 'transparent', 'margin-top': '30px', 'line-height': '16px'});
              $('#nav-logo').css({'left': '-200px', 'opacity': '0'});
           }
       });
    });
  }
};

// FORM VALIDATION
var SubmitValidation = {
  init: function() {
    $(document).ready(function() { 

      $( "#target" ).submit(function( event ) {

        //Controlla se input è popolato
        var name = $('#fullname').val();
          //Svuota contenuto elemento
          $('#help-name').empty();
        if ( name.length > 0 ) {
          $('#fullname').css('border-color', 'green');
          $('#help-name').append('validate!').css('color', 'green');
          event.preventDefault();
        } else {
          $('#fullname').css('border-color', 'red');
          $('#help-name').append('* required field').css('color', 'red');;
          event.preventDefault();
          return false;
        }

        var phone = $('#phone').val();
          $('#help-phone').empty();
        if ( phone.length == 11 && isNaN(phone) == false ) {
          $('#phone').css('border-color', 'green');
          $('#help-phone').append('validate!').css('color', 'green');
          event.preventDefault();
        } else {
          $('#phone').css('border-color', 'red');
          $('#help-phone').append('* required field, maximum of 11 characters, only digits').css('color', 'red');;
          event.preventDefault();
          return false;
        }

        //Regex per controllo controllo formato email
        function validateEmail(email) {
          var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
        }

        var email = $('#email').val();
          $('#help-email').empty();
        if ( validateEmail(email) ) {
          $('#email').css('border-color', 'green');
          $('#help-email').append('validate!').css('color', 'green');
          event.preventDefault();
        } else {
          $('#email').css('border-color', 'red');
          $('#help-email').append('* required field').css('color', 'red');;
          event.preventDefault();
          return false;
        }

        var message = $('#message').val();
          $('#help-message').empty();
        if ( message.length > 0 ) {
          $('#message').css('border-color', 'green');
          $('#help-message').append('validate!').css('color', 'green');
          event.preventDefault();
        } else {
          $('#message').css('border-color', 'red');
          $('#help-message').append('* required field').css('color', 'red');;
          event.preventDefault();
          return false;          
        }

        alert('form validated!')

      });
    });
  }
};


//AJAX CALL - chiamate ajax
$(document).ready(function () {
  //Disabilita click su elemento article.addresses-tab-box
  $('article.addresses-tab-box').click(false);

  //Resetta la selezione delle tab al caricamento del DOM
  setTimeout(function() {
      $("#option1").trigger('click');
  },10);

  $('.get-data').on('click', function(event) {

    var showData = $('.show-data');
    var showImg = $('.show-img');

    if (event.target.id === 'option1') {
      $.getJSON('./js/ajax/one.json', function (data) {
        var items = data.item;
        showData.empty();
        showImg.empty();
        if (items) {
          //Cicla e genera html per ogni proprietà del json
          $.each(items, function( i, val) {

            if( i !== 'images'){
              var content = '<li>' + '<h1>' +  val + '</h1>' + '</li>';
              var list = $('<ul />').html(content);
              showData.append(list);
            };
          });
          $.each(items.images, function( i, val) {
              if( i == 0) {
                var content = '<img src="' + val +'"/>';
                showImg.append(content);
              }
          });
        }
      });
    }else if (event.target.id === 'option2') {
      $.getJSON('./js/ajax/two.json', function (data) {
        var items = data.item;
        showData.empty();
        showImg.empty();
        if (items) {

          $.each(items, function( i, val) {

            if( i !== 'images'){
              var content = '<li>' + '<h1>' +  val + '</h1>' + '</li>';
              var list = $('<ul />').html(content);
              showData.append(list);
            };
            
          });
          $.each(items.images, function( i, val) {
            if( i == 0) {
              var content = '<img src="' + val +'"/>';
              showImg.append(content);
            }
          });
        }
      });
    }else if (event.target.id === 'option3') {
      $.getJSON('./js/ajax/three.json', function (data) {
        var items = data.item;
        showData.empty();
        showImg.empty();
        if (items) {
          $.each(items, function( i, val) {

            if( i !== 'images'){
              var content = '<li>' + '<h1>' +  val + '</h1>' + '</li>';
              var list = $('<ul />').html(content);
              showData.append(list);
            };
            
          });
          $.each(items.images, function( i, val) {
            if( i == 0) {
              var content = '<img src="' + val +'"/>';
              showImg.append(content);
            }
          });
        }
      });
    }
    showData.text('Loading...');
  });

});



//HIDE PARTNERS - nasconde/mostra la sezione partners
var HidePartners = {
  init: function() {
    $(document).ready(function() {     
      $('.hide-partners').on( 'click', function() {
        $('.section-partners-card').toggleClass('hide-partners-toggle');
        $('#toggle-partners').toggleClass('button-azure-down');

        if ($( ".section-partners-card" ).hasClass( "hide-partners-toggle")){
          $(".button-azure").empty();
          $(".button-azure").append('SHOW PARTNERS');
  
        }else{
          $(".button-azure").empty();
          $(".button-azure").append('HIDE PARTNERS');

        }
      });
    });
  }
};

var EaseOutScroll = {
  init: function() {
    $(document).ready(function() {   
      $('#navlist a, .header-text a ').on('click', function(){
          var top = $('body').find($(this).attr('href')).offset().top - 60;
          $('html, body').animate({
              scrollTop: top
          },1000, 'easeOutExpo');

          return false;
      });
    });
  }
};

// JQUERY ONLOAD
$(function() {
  EaseOutScroll.init();
  Nav.init();
	HidePartners.init();
  SubmitValidation.init();
});