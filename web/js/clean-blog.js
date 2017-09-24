var sideNavOpen = false;

(function($) {
  "use strict"; // Start of use strict

  // Floating label headings for the contact form
  $("body").on("input propertychange", ".floating-label-form-group", function(e) {
    $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
  }).on("focus", ".floating-label-form-group", function() {
    $(this).addClass("floating-label-form-group-with-focus");
  }).on("blur", ".floating-label-form-group", function() {
    $(this).removeClass("floating-label-form-group-with-focus");
  });

  // Show the navbar when the page is scrolled up
  var MQL = 1170;

  //primary navigation slide-in effect
  if ($(window).width() > MQL) {
    var headerHeight = $('#mainNav').height();
    $(window).on('scroll', {
        previousTop: 0
      },
      function() {
        var currentTop = $(window).scrollTop();
        //check if user is scrolling up
        if (currentTop < this.previousTop) {
          //if scrolling up...
          if (currentTop > 0 && $('#mainNav').hasClass('is-fixed')) {
            $('#mainNav').addClass('is-visible');
          } else {
            $('#mainNav').removeClass('is-visible is-fixed');
          }
        } else if (currentTop > this.previousTop) {
          //if scrolling down...
          $('#mainNav').removeClass('is-visible');
          if (currentTop > headerHeight && !$('#mainNav').hasClass('is-fixed')) $('#mainNav').addClass('is-fixed');
        }
        this.previousTop = currentTop;
      });
  }

})(jQuery); // End of use strict

$('#boardTab a').click(function(e) {
  e.preventDefault();
  $(this).tab('show');
});

function showLoginForm() {
  $('#loginTab').tab('show');
  $("#loginModal").modal('show');
}

function showCreateBlogForm() {
  $("#createBlogForm").modal('show');
}

function showSetPictureForm() {
  $("#setPictureForm").modal('show');
}

showLoginForm();

/* Set the width of the side navigation to 250px */
function openNav() {
  var element = document.getElementById("mySidenav");
  if(sideNavOpen) {
    element.style.left = "-250px";
    sideNavOpen = false;
  } else {
    element.style.left = "0";
    sideNavOpen = true;
  }
}

function chooseCover() {
  $("#coverImage").click();
}

function choosePicture() {
  $("#profilePicture").click();
}


var coverPicture = $('#coverImageContainer');
var profilePicture = $('#profilePictureContainer');

coverPicture.on("load", function () {
  coverPicture.guillotine('remove');
  bindCropperToCover();
});

profilePicture.on("load", function () {
  profilePicture.guillotine('remove');
  bindCropperToProfilePicture();
});

function placeCoverImage(input) {

  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      coverPicture.attr("src", e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }

}

function placeProfilePicture(input) {

  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      profilePicture.attr("src", e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }

}

function bindCropperToCover () {
  coverPicture.guillotine({width: 1200, height: 300});
  coverPicture.on('mousewheel', function(event) {
    if(event.deltaY == 1)
      coverPicture.guillotine('zoomIn');
    else
      coverPicture.guillotine('zoomOut');
  });
}

function bindCropperToProfilePicture () {
  profilePicture.guillotine({width: 500, height: 500});
  profilePicture.on('mousewheel', function(event) {
    if(event.deltaY == 1)
      profilePicture.guillotine('zoomIn');
    else
      profilePicture.guillotine('zoomOut');
  });
}




