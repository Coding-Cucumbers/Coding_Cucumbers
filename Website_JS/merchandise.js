$(function () {

// draggable image to reveal promo code
$("#cucumber_shades").draggable({
  revert: true});

  //when user hovers over nav-items
$(".nav-item").hover( function() {
  $(this).css("background-color", "rgba(107, 107, 107, 0.1)");
  }, function() {
  $(this).css("background-color", "white");
  });

  //when user hovers on submit submit_button
  $("#submit_button").hover( function() {
    $(this).css("background-color", "rgba(107, 107, 107, 1)");
    }, function() {
    $(this).css("background-color", "white");
    });

    // when user inputs an email address
  $("#submit_button").click(function(){
    $(".error").hide();
         var hasError = false;
         var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

         var emailVal = $("#input_box").val();
         if(emailVal == '') {
             $("#input_box").after('<span class="error"  style="color: red">Please enter your email address.</span>');
             hasError = true;
         }

         else if(!emailReg.test(emailVal)) {
             $("#input_box").after('<span class="error" style="color: red">Enter a valid email address.</span>');
             hasError = true;
         }

         else {
           window.alert("Thank you for staying in touch!")
         }
         if(hasError == true) { return false; }
  });

});
