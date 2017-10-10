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
  $("#profilePictureFile").click();
}


var coverPictureContainer = $('#coverImageContainer');
var profilePictureContainer = $('#profilePictureContainer');

coverPictureContainer.on("load", function () {
  coverPictureContainer.guillotine('remove');
  bindCropperToCover();
});

profilePictureContainer.on("load", function () {
  profilePictureContainer.guillotine('remove');
  bindCropperToProfilePicture();
});

function placeCoverImage(input) {

  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      coverPictureContainer.attr("src", e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }

}

function placeProfilePicture(input) {

  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      profilePictureContainer.attr("src", e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }

}

function bindCropperToCover () {
  coverPictureContainer.guillotine({width: 1200, height: 300});
  coverPictureContainer.on('mousewheel', function(event) {
    if(event.deltaY == 1)
      coverPictureContainer.guillotine('zoomIn');
    else
      coverPictureContainer.guillotine('zoomOut');
  });
}

function bindCropperToProfilePicture () {
  profilePictureContainer.guillotine({width: 500, height: 500});
  profilePictureContainer.on('mousewheel', function(event) {
    if(event.deltaY == 1)
      profilePictureContainer.guillotine('zoomIn');
    else
      profilePictureContainer.guillotine('zoomOut');
  });
}



function uploadProfilePicture() {
  var data, xhr;

  data = new FormData();
  var picture = document.getElementById("profilePictureFile").files[0];
  data.append( 'profilePicture', picture );
  data.append( 'pictureData', JSON.stringify(profilePictureContainer.guillotine('getData')));

  xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (this.readyState == 4) {
      if(this.status == 200) {
        alert(xhr.responseText);
        $("#closePictureFormBtn").click();
        var reader = new FileReader();
        reader.onload = function (e) {
          $("#profilePicture").attr("src", e.target.result);
        };
        reader.readAsDataURL(picture);
      } else {
        alert(xhr.response);
      }
    }
  };

  xhr.open("POST", "picture", true);
  xhr.send(data);

}

function getRequestObject () {
  var xmlHttp;
  try
  {
    // Firefox, Opera 8.0+, Safari
    xmlHttp=new XMLHttpRequest();
  }
  catch (e)
  {
    // Internet Explorer
    try
    {
      xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch (e)
    {
      try
      {
        xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
      }
      catch (e)
      {
        alert("Your browser does not support AJAX!");
        return false;
      }
    }
  }

  return xmlHttp;
}



