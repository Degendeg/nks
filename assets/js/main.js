(function($) {

  var date = new Date();
  var year = date.getFullYear();
  $('#this-year').text(year);

  var $window = $(window),
    $body = $('body'),
    $nav = $('#nav');

  // Breakpoints.
  breakpoints({
    wide: ['961px', '1880px'],
    normal: ['961px', '1620px'],
    narrow: ['961px', '1320px'],
    narrower: ['737px', '960px'],
    mobile: [null, '736px']
  });

  // Play initial animations on page load.
  $window.on('load', function() {
    window.setTimeout(function() {
      $body.removeClass('is-preload');
    }, 100);
  });

  // Nav.
  var $nav_a = $nav.find('a');

  $nav_a
    .addClass('scrolly')
    .on('click', function(e) {

      var $this = $(this);

      // External link? Bail.
      if ($this.attr('href').charAt(0) != '#')
        return;

      // Prevent default.
      e.preventDefault();

      // Deactivate all links.
      $nav_a.removeClass('active');

      // Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
      $this
        .addClass('active')
        .addClass('active-locked');

    })
    .each(function() {

      var $this = $(this),
        id = $this.attr('href'),
        $section = $(id);

      // No section for this link? Bail.
      if ($section.length < 1)
        return;

      // Scrollex.
      $section.scrollex({
        mode: 'middle',
        top: '-10vh',
        bottom: '-10vh',
        initialize: function() {

          // Deactivate section.
          $section.addClass('inactive');

        },
        enter: function() {

          // Activate section.
          $section.removeClass('inactive');

          // No locked links? Deactivate all links and activate this section's one.
          if ($nav_a.filter('.active-locked').length == 0) {

            $nav_a.removeClass('active');
            $this.addClass('active');

          }
        }
      });

    });

  // Scrolly.
  $('.scrolly').scrolly();
  
  // Lightslider.
  $('#lightSlider').lightSlider({
	gallery: true,
	item: 1,
	loop: true,
	auto: true,
	speed: 1000,
	pause: 4000,
	pager: false,
	controls: false,
	slideMargin: 0
  });

  // Toggle.
  $('<div id="headerToggle">' + '<a href="#header" class="toggle"></a>' + '</div>').appendTo($body);

  // Header.
  $('#header')
    .panel({
      delay: 500,
      hideOnClick: true,
      hideOnSwipe: true,
      resetScroll: true,
      resetForms: true,
      side: 'left',
      target: $body,
      visibleClass: 'header-visible'
    });

})(jQuery);