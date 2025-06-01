/* global jQuery, $ */

jQuery(function($) {


  $(".loader").delay(1000).fadeOut("slow");
  $("#overlayer").delay(1000).fadeOut("slow");

  var sitePlusMinus = function() {
    $('.js-btn-minus').on('click', function(e){
      e.preventDefault();
      var $input = $(this).closest('.input-group').find('.form-control');
      $input.val(Math.max(0, parseInt($input.val()) - 1));
    });

    $('.js-btn-plus').on('click', function(e){
      e.preventDefault();
      var $input = $(this).closest('.input-group').find('.form-control');
      $input.val(parseInt($input.val()) + 1);
    });
  };
  // sitePlusMinus();

  var siteIstotope = function() {
    var $container = $('#posts').isotope({
      itemSelector : '.item',
      isFitWidth: true
    });

    $(window).resize(function(){
      $container.isotope({
        columnWidth: '.col-sm-3'
      });
    });

    $container.isotope({ filter: '*' });

    $('#filters').on('click', 'button', function(e) {
      e.preventDefault();
      var filterValue = $(this).attr('data-filter');
      $container.isotope({ filter: filterValue });
      $('#filters button').removeClass('active');
      $(this).addClass('active');
    });
  }
  siteIstotope();

  var fancyBoxInit = function() {
    $('.fancybox').on('click', function() {
      var visibleLinks = $('.fancybox');
      $.fancybox.open(visibleLinks, {}, visibleLinks.index(this));
      return false;
    });
  }
  fancyBoxInit();

  var stickyFillInit = function() {
    $(window).on('resize orientationchange', function() {
      recalc();
    }).resize();

    function recalc() {
      if ($('.jm-sticky-top').length > 0) {
        Stickyfill.add($('.jm-sticky-top'));
      }
    }
  }
  stickyFillInit();

  // navigation
  var OnePageNavigation = function () {
    $("body").on("click", ".main-menu li a[href^='#'], .smoothscroll[href^='#']", function (e) {
      e.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        'scrollTop': $(hash).offset().top
      }, 600, 'easeInOutCirc', function () {
        window.location.hash = hash;
      });
    });
  };
  OnePageNavigation();

  var counterInit = function() {
    if ($('.section-counter').length > 0) {
      $('.section-counter').waypoint(function(direction) {
        if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {
          var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',');
          $('.number').each(function() {
            var $this = $(this),
                num = $this.data('number');
            $this.animateNumber({
              number: num,
              numberStep: comma_separator_number_step
            }, 7000);
          });
        }
      }, { offset: '95%' });
    }
  }
  counterInit();

  var selectPickerInit = function() {
    $('.selectpicker').selectpicker();
  }
  selectPickerInit();

  var owlCarouselFunction = function() {
    $('.single-carousel').owlCarousel({
      loop: true,
      margin: 0,
      nav: true,
      autoplay: true,
      items: 1,
      nav: false,
      smartSpeed: 1000
    });
  }
  owlCarouselFunction();

  var quillInit = function() {
    var toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean']
    ];

    if ($('.editor').length > 0) {
      var quill = new Quill('#editor-1', {
        modules: { toolbar: toolbarOptions },
        placeholder: 'Compose an epic...',
        theme: 'snow'
      });
      var newquill = new Quill('#editor-2', {
        modules: { toolbar: toolbarOptions },
        placeholder: 'Compose an epic...',
        theme: 'snow'
      });
    }
  }
  quillInit();

});
