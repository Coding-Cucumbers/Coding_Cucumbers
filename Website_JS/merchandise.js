$(function () {


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
           SubForm();
           TeleNoti();
           window.alert("Thank you for staying in touch!")
         }
         document.getElementById("input_box").value = '';
         if(hasError == true) { return false; }
  });

  //connecting form submissions to googlesheet
  function SubForm (){
      $.ajax({
          url:'https://api.apispreadsheets.com/data/12899/',
          type:'post',
          data:$("#myForm").serializeArray()
          //add comma back behind .serializeArray(), this a checker
          // success: function(){
          //   alert("Form Data Submitted")
          // },
          // error: function(){
          //   alert("There was an error")
          // }
      });
  }

function TeleNoti(){
    $.ajax({
      url: 'https://asia-southeast1-cc-webhooks.cloudfunctions.net/subscriber',
      type: 'post',
      data: $("#myForm").serializeArray()
    });
  }

  //to allow user to submit with enter key
  $('#input_box').keypress(function (e) {
    if (e.which === 13) {
      $('#submit_button').click();
      return false;
    }
  });



});
