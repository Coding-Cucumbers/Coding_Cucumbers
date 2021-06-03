$(function(){

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
         SubForm(); //function to submit to google sheets
         window.alert("Thank you for staying in touch!");
       }
       //ensures that email text space is cleared
       document.getElementById("email_input").value = '';
       if(hasError == true) { return false; }
});

//to allow user to submit with enter key
$('#email_input').keypress(function (e) {
  if (e.which === 13) {
    $('#submit_email').click();
    return false;
  }
});

//connecting form submissions to googlesheet
function SubForm (){
    $.ajax({
        url:'https://api.apispreadsheets.com/data/12899/',
        type:'post',
        data:$("#email_box_form").serializeArray()
        //add comma back behind .serializeArray(), this a checker
        // success: function(){
        //   alert("Form Data Submitted")
        // },
        // error: function(){
        //   alert("There was an error")
        // }
    });
}
})