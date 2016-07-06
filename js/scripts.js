//------------------------------------------------------
// Cookie Scripts
//------------------------------------------------------

$(document).ready(function() {
    $.cookie("visited");
     
        if ($.cookie("visited") != "true") {
            $.cookie('visited', 'true');
        // Menu opening script for devices over 400px
            if ( $(window).width() > 400 ) {
                    $("nav").css("margin-left", "0px").delay(1000).animate({"margin-left": "-300px"}, 250);
                    $(".wrapper").delay(500).animate({"left":"0"}, 250);
            }
            //Menu open script for small devices
            else {
                    $("nav").css("left", "0").delay(500).animate({"left": "-100%"}, 250);
            }
        };
        
        //console.log($.cookie("visited"));
});







//------------------------------------------------------
// MENU SCRIPTS
//------------------------------------------------------


$(document).ready(function() {
    // Menu opening script for devices over 400px
    if ( $(window).width() > 400 ) {        
            $("header #nav-icon").click(function() {
                if ( $("nav").hasClass("open") ) {
                    $("nav").stop().animate({"margin-left":"-300px"}, 250);
                    $("header").stop().css("min-width", "100%").animate({"margin-left":"0px"}, 250);
                    $(".wrapper").stop().css("min-width", "100%").animate({"left":"0"}, 250);
                } else {
                    $("nav").stop().animate({"margin-left":"0px"}, 250);
                    $("header").stop().css("min-width", "100vw").animate({"margin-left":"300px"}, 250);
                    $(".wrapper").stop().css("min-width", "100vw").animate({"left":"300px"}, 250);
                }
                $("nav, #nav-icon").toggleClass("open");
                return false;
            });

            $(".wrapper").click(function() {  
                $("nav").stop().animate({"margin-left":"-300px"}, 250);
                $("header").stop().css("min-width", "100%").animate({"margin-left":"0px"}, 250);
                $(".wrapper").stop().css("min-width", "100%").animate({"left":"0"}, 250);
                $("nav, #nav-icon").removeClass("open");
            });
    }
    //Menu open script for small devices
    else {        
            $("header #nav-icon").click(function() {
                if ( $("nav").hasClass("open") ) {
                    $("nav").css("margin-left", "0").stop().animate({"left": "-100%"}, 250);
                    $("header, .wrapper").stop().animate({"left": "0"}, 250);
                } else {
                    $("nav").css("margin-left", "0").stop().animate({"left": "0"}, 250);
                    $("header, .wrapper").stop().animate({"left": "0"}, 250);
                }
                $("nav, #nav-icon").toggleClass("open");
                return false;
            });
    }
});






//------------------------------------------------------
// Mobile Orientation Reload
//------------------------------------------------------
window.onorientationchange = function() { 
    var orientation = window.orientation; 
        switch(orientation) { 
            case 0: window.location.reload(); 
            break; 
            case 90: window.location.reload(); 
            break; 
            case -90: window.location.reload(); 
            break; } 
};







//------------------------------------------------------
// Validation
//------------------------------------------------------


//jQuery Validation Boot
$(document).ready(function() {
    $(".form-container").validate();
});











//------------------------------------------------------
// International Phone Numbers
//------------------------------------------------------


$(document).ready(function(){
  $("#phone").intlTelInput({
    preferredCountries: ["gb"],
    utilsScript: "https://s3-eu-west-1.amazonaws.com/bppassets/public/assets/js/utils.js",
  });
  $("form").submit(function() {
    $("#hidden-phone").val($("#phone").intlTelInput("getNumber"));
  });
});