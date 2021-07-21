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
  $('#silas_gmail').click( function(){
    window.alert("Reach me at silastaysl@gmail.com")
  });
  //user clicks on google icon, our gmail appears
  $('#bryan_gmail').click( function(){
    window.alert("Reach me at ho.cheng.en.bryan@gmail.com")
  });

});

var quote = document.getElementsByClassName('quote')[0];
var introDesc = document.getElementsByClassName('introduction_description_container')[0];
var profilePicST = document.getElementsByClassName('profile_picture_top')[0];
var profileDetailsST = document.getElementsByClassName('profile_details_container_top')[0];
var profilePicBH = document.getElementsByClassName('profile_picture_bottom')[0];
var profileDetailsBH = document.getElementsByClassName('profile_details_container_bottom')[0];

function resize() {
  if (window.innerWidth < 960) {
    quote.classList.remove("col-6");
    quote.classList.add("col-4");
    introDesc.classList.remove("col-5");
    introDesc.classList.add("col-8");
    profilePicST.classList.remove("col-6");
    profilePicST.classList.add("col-12");
    profileDetailsST.classList.remove("col-6");
    profileDetailsST.classList.add("col-12");
    profilePicBH.classList.remove("col-6");
    profilePicBH.classList.remove("profile_picture_bottom");
    profilePicBH.classList.add("col-12");
    profilePicBH.classList.add("profile_details_container_bottom");
    profileDetailsBH.classList.remove("col-6");
    profileDetailsBH.classList.remove("profile_detials_container_bottom");
    profileDetailsBH.classList.add("col-12");
    profileDetailsBH.classList.add("profile_picture_bottom");

  } else {
    quote.classList.add("col-6");
    quote.classList.remove("col-4");
    introDesc.classList.add("col-5");
    introDesc.classList.remove("col-8");
    profilePic.classList.add("col-6");
    profilePic.classList.remove("col-12");
    profileDetails.classList.add("col-6");
    profileDetails.classList.remove("col-12");
    profilePicBH.classList.add("col-6");
    profilePicBH.classList.add("profile_picture_bottom");
    profilePicBH.classList.remove("col-12");
    profilePicBH.classList.remove("profile_details_container_bottom");
    profileDetailsBH.classList.add("col-6");
    profileDetailsBH.classList.add("profile_detials_container_bottom");
    profileDetailsBH.classList.remove("col-12");
    profileDetailsBH.classList.remove("profile_picture_bottom");
  }
}

window.onresize = resize
