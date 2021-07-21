email_box = document.getElementsByClassName("email_box")[0];
function stickyEmailBox() {
    spawnBoxMargin = 500;
    if (document.body.scrollTop > spawnBoxMargin|| document.documentElement.scrollTop > spawnBoxMargin) {
        email_box.classList.add("show");
        email_box.classList.remove("hidden");
    } else {
        email_box.classList.add("hidden");
        email_box.classList.remove("show");
    }
}

window.onscroll = stickyEmailBox
 var main_row = document.getElementById("main_post");
function resize() {
  if (window.innerWidth < 960) {
    main_row.classList.remove("col-6");
    main_row.classList.add("col-12");
  } else {
    main_row.classList.add("col-6");
    main_row.classList.remove("col-12");
  }
}

window.onresize = resize


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
         SubForm(); //function to submit to google sheets
         TeleNoti();
         window.alert("Thank you for staying in touch!");
       }
       //ensures that email text space is cleared
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

$('#email_input').keypress(function (e) {
  if (e.which === 13) {
    $('#submit_email').click();
    return false;
  }
});

  // when user inputs an email address
  $("#submit_email").click(function(){
    $(".error").hide();
         var hasError = false;
         var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

         var emailVal = $("#email_input").val();
         if(emailVal == '') {
             $("#email_input").after('<span class="error"  style="color: red">Please enter your email address.</span>');
             hasError = true;
         }

         else if(!emailReg.test(emailVal)) {
             $("#email_input").after('<span class="error" style="color: red">Enter a valid email address.</span>');
             hasError = true;
         }

         else {
           SubForm_1(); //function to submit to google sheets
           TeleNoti_1();
           window.alert("Thank you for staying in touch!");
         }
         //ensures that email text space is cleared
         document.getElementById("email_input").value = '';
         if(hasError == true) { return false; }
  });

//connecting form submissions to googlesheet
function SubForm (){
    $.ajax({
        url:'https://api.apispreadsheets.com/data/12899/',
        type:'post',
        data:$("#input_box").serializeArray()
    });
}

function TeleNoti(){
    $.ajax({
      url: 'https://asia-southeast1-cc-webhooks.cloudfunctions.net/subscriber',
      type: 'post',
      data: $("#input_box").serializeArray()
    });
}

function SubForm_1 (){
    $.ajax({
        url:'https://api.apispreadsheets.com/data/12899/',
        type:'post',
        data:$("#email_input").serializeArray()
    });
}

function TeleNoti_1(){
    $.ajax({
      url: 'https://asia-southeast1-cc-webhooks.cloudfunctions.net/subscriber',
      type: 'post',
      data: $("#email_input").serializeArray()
    });
}

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

  $('.email').click( function(){
    window.alert("Reach us at coding.cucumbers@gmail.com")
  });

  $('.twitter').click( function(){
    window.alert("We are coming soon!")
  });

    //user clicks on google icon, our gmail appears
    $('.silas_gmail').click( function(){
      window.alert("Reach me at silastaysl@gmail.com")
    });
    //user clicks on google icon, our gmail appears
    $('.bryan_gmail').click( function(){
      window.alert("Reach me at ho.cheng.en.bryan@gmail.com")
    });
    //user clicks on google icon, our gmail appears
    $('.cc_gmail').click( function(){
      window.alert("Reach us at coding.cucumbers@gmail.com")
    });

});
