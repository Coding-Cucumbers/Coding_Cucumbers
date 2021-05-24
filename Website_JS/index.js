$(function(){

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
         SubForm();
         window.alert("Thank you for staying in touch!");
       }
       //ensures that email is cleared
       document.getElementById("input_box").value = '';
       if(hasError == true) { return false; }
});

//to allow user to submit with enter key
$('#input_box').keypress(function (e) {
  if (e.which === 13) {
    $('#submit_button').click();
    return false;
  }
});

//connecting form submissions to googlesheet
function SubForm (){
    $.ajax({
        url:'https://api.apispreadsheets.com/data/12899/',
        type:'post',
        data:$("#myForm").serializeArray()
        //add comma back behind .serializeArray()
        // success: function(){
        //   alert("Form Data Submitted")
        // },
        // error: function(){
        //   alert("There was an error")
        // }
    });
}

//when user hovers over nav-items
$(".nav-item").hover( function() {
  $(this).css("background-color", "rgba(107, 107, 107, 0.1)");
  }, function() {
  $(this).css("background-color", "white");
});

//when user hovers on cards, card body changes colour
$(".card").hover( function() {
  $(this).css("background-color", "rgba(107, 107, 107, 0.2)");
  }, function() {
  $(this).css("background-color", "rgba(107, 107, 107, 0.1)");
  });

//when user hovers on submit submit_button
$("#submit_button").hover( function() {
  $(this).css("background-color", "rgba(107, 107, 107, 1)");
  }, function() {
  $(this).css("background-color", "white");
  });

//when user hovers over card
$(".card").hover(function() {
   $(this).css('box-shadow', '10px 10px 5px #888');
    }, function() {
   $(this).css('box-shadow', '0 0 0 0');
});

//when user hovers over more link
$(".more").hover( function() {
  $(this).css("background-color", "rgba(107, 107, 107, 0.5)");
  }, function() {
  $(this).css("background-color", "rgba(107, 107, 107, 0.1)");
  });

//cards to fade in upon scroll
$(window).scroll( function() {
  if ($(this).scrollTop() < 300) {
    $(".card").css({"opacity": "0"})
  }
  else {
    $(".card").css({"opacity": "1"})
  }
})




// $(window).scroll(function() {
//    var windowBottom = $(this).scrollTop() + $(this).innerHeight();
//    $(".card").each(function() {
//      /* Check the location of each desired element */
//      var objectBottom = $(this).offset().top + $(this).innerHeight();
//
//      /* If the element is completely within bounds of the window, fade it in */
//      if (objectBottom < windowBottom) { //object comes into view (scrolling down)
//        if ($(this).css("opacity")==0) {$(this).fadeTo(500,1);}
//      } else { //object goes out of view (scrolling up)
//        if ($(this).css("opacity")==1) {$(this).fadeTo(500,0);}
//      }
//    });
//  }).scroll(); //invoke scroll-handler on page-load

});
