email_box = document.getElementsByClassName("email_box")[0];
function stickyEmailBox() {
    spawnBoxMargin = 500;
    if (document.body.scrollTop > spawnBoxMargin|| document.documentElement.scrollTop > spawnBoxMargin) {
        email_box.classList.add("show")
        email_box.classList.remove("hidden")
    } else {
        email_box.classList.add("hidden")
        email_box.classList.remove("show")
    }
}

window.onscroll = stickyEmailBox

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

  $('.fa-google').click( function(){
    window.alert("Reach us at coding.cucumbers@gmail.com")
  });

  $('.fa-twitter').click( function(){
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
