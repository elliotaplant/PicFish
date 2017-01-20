// Variable declarations
var $shareLinkModal = $('#share-link-modal');
var $toggleHeight = $(".toggle-height");
var $scrollableContent = $('#scrollable-content');
var $navbarToggle = $(".navbar-toggle");
var $navbar = $("#navbar");
var $topNav = $(".navbar.navbar-default");

// Page setup
$scrollableContent.focus();
$navbarToggle.on('blur', function() { $navbar.collapse('hide'); });
$shareLinkModal.on('hide.bs.modal', resetShareModal);
$("body").scrollTop($("body").scrollTop() + 100);
scrollingNav()

// Toggle height
var fitHeight = false;
$toggleHeight.click(function toggleFitToHeight() {
  fitHeight = !fitHeight;
  $(".link-img").css("max-height", fitHeight ? "100%" : "");
  $(".img-container").css("height", fitHeight ? "70%" : "");
  $(".toggle-height").text((fitHeight ? "Expand" : "Shrink") + " Pictures");
  $toggleHeight.blur();
});

// Social
var FB = null;

var fbShareBtnStrs = [
  '<div class="fb-share-button" data-href="http://www.pic.fish/',
  '" data-layout="button" data-size="large" data-mobile-iframe="true"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fwww.pic.fish%2F',
  '&amp;src=sdkpreparse">Share</a></div>'
];

var twttrParts = [
  '<iframe src="https://platform.twitter.com/widgets/tweet_button.html?size=l&url=http%3A%2F%2Fwww.pic.fish%2F',
  // terminal
  '&text=',
  // text joined with %20
  '&hashtags=PicFish%2C',
  // hashtag
  '" width="78" height="28" via="pic_fish" title="',
  // title
  '" style="border: 0; overflow: hidden;"> </iframe>'
]

// Share modal
$shareLinkModal.on('show.bs.modal', function (event) {
  var modal = $(this);
  var button = $(event.relatedTarget);

  var socialBtns = modal.find('#social-buttons')
  var shareImage = modal.find('#share-img')
  var copyTarget = modal.find('#copy-target')
  var copyLink = modal.find('#copy-link')

  var shareLink = button.data('link');
  var imgSrc = button.data('imgsrc');
  var linkId = button.data('linkid') || '';
  var linkText = button.data('linktext') || '';
  var linkURL = 'http://' + shareLink;

  $navbar.collapse('hide');

  copyTarget.text(shareLink);
  copyLink.attr('href', linkURL);
  shareImage.attr('src', imgSrc);

  var fbAnchor = $(fbShareBtnStrs.join(linkId));
  if (FB) {
    modal.find('#social-buttons').append(fbAnchor);
    socialBtns.append(fbAnchor);
    FB.XFBML.parse();
  }
  var hashTag = window.location.pathname.slice(1);
  hashTag = isNaN(parseInt(hashTag)) ? hashTag : "picOfTheDay";
  var twtrAnchor = $(
    twttrParts[0] + linkId +
    twttrParts[1] + encodeURI("PicFish - " + linkText) +
    twttrParts[2] + hashTag +
    twttrParts[3] + "MYTITLE" +
    twttrParts[4]
  );
  socialBtns.append(twtrAnchor);
});

// Misc
function resetShareModal(event) {
  setTimeout(function() {
    $('.modal-title').text("Share Link");
    $('#social-buttons').empty();
  }, 500);
}

function copyToClipboard() {
  var copyTarget = document.getElementById("copy-target");
  var range = document.createRange();

  $('.modal-title').text("Thanks for Sharing!");
  emptySelection();
  range.selectNode(copyTarget);
  window.getSelection().addRange(range);
  document.execCommand('copy');
  emptySelection();
  showCopy();
}

function emptySelection() {
  if (window.getSelection) {
     if (window.getSelection().empty) {  // Chrome
       window.getSelection().empty();
     } else if (window.getSelection().removeAllRanges) {  // Firefox
       window.getSelection().removeAllRanges();
     }
  } else if (document.selection) {  // IE?
    document.selection.empty();
  }
}

function showCopy() {
  var $copyTarget = $("#copy-target");
  $copyTarget.removeClass("normal-text");
  $copyTarget.addClass("success-text");
  setTimeout(function() {
    $copyTarget.removeClass("success-text");
    $copyTarget.addClass("normal-text");
  }, 250);
  setTimeout(function() {
    $copyTarget.removeClass("normal-text");
  }, 750);
}

// Scrolling navbar
function scrollingNav() {
  var didScroll;
  var lastScrollTop = 0;
  var delta = 10;
  var navbarHeight = $topNav.outerHeight();

  // on scroll, let the interval function know the user has scrolled
  $scrollableContent.scroll(function(event){
    didScroll = true;
  });
  // run hasScrolled() and reset didScroll status
  setInterval(function() {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 100);

  function hasScrolled() {
    var st = $scrollableContent.scrollTop();
    if (Math.abs(lastScrollTop - st) < delta) {
      return false;
    }

    if (st > lastScrollTop && st > navbarHeight) {
      $topNav.removeClass('nav-down').addClass('nav-up');
    } else if (st < lastScrollTop || st < navbarHeight) {
      $topNav.removeClass('nav-up').addClass('nav-down');
    }
    lastScrollTop = st;
  }
}
