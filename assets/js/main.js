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
        mode: 'top',
        top: '-1vh',
        bottom: '-1vh',
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

          // Otherwise, if this section's link is the one that's locked, unlock it.
          else if ($this.hasClass('active-locked'))
            $this.removeClass('active-locked');

        }
      });
    });

  // Scrolly.
  $('.scrolly').scrolly();

  // Lightslider.
  let imgNr = 2;
  $('#lightSlider').lightSlider({
    gallery: true,
    item: 1,
    loop: true,
    auto: true,
    speed: 1000,
    pause: 8000,
    pager: false,
    controls: false,
    slideMargin: 0,
    onBeforeSlide: function () {
		$('.one').fadeTo('slow', 0.3, function() {
			$(this).css('background-image', 'url(' + './images/banner' + imgNr + '.jpg' + ')');
		}).fadeTo('slow', 1);
    },
    onAfterSlide: function () {
		if (imgNr === 3) {
			imgNr = 1;
		}
		else {
			imgNr++;
		}
    }
  });

  // Toggle.
  $('<div id="headerToggle" style="width: 100%; height: 60px; background: #181617">'
  + '<a href="#header" class="toggle"></a>' + '<img src="./images/nks.jpg" style="width: 40%; margin-left: 30%; margin-top: 1%" />'
  + '<a href="tel:+46171425425" class="icon fa-phone-square fa-2x" target="_blank" style="color: red; float: right; margin-right: 10px; margin-top: 7px; border: 0;"><span class="label">Phone</span></a>'
  + '</div>').appendTo($body);
  
  $('.to-top-btn').click(function () {
	const scrollToTop = () => {
	  const c = document.documentElement.scrollTop || document.body.scrollTop;
	  if (c > 0) {
		window.requestAnimationFrame(scrollToTop);
		window.scrollTo(0, c - c / 20);
	  }
	};
	scrollToTop();
  });

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