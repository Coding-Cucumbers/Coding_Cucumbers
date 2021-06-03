
function filterSelection(filter) {
    let postThumbnails = document.getElementsByClassName('post_thumbnail');

    if (filter === "all") {
        for (postThumbnail of postThumbnails) {
            postThumbnail.classList.remove("hidden");
        }
        return;
    }

    for (postThumbnail of postThumbnails){
        if (!postThumbnail.className.includes(filter)) {
            postThumbnail.classList.add("hidden");
        }
        else {
            postThumbnail.classList.remove("hidden");
        }
    }
}

//Sheets ID: 1RYNXbxtIeqSmtzJhNca459t8I9Kg_waQRJl-6jBezRc
//Published Sheets: https://docs.google.com/spreadsheets/d/e/2PACX-1vQjv-aC3kieSYEL0g9dImLpQHdtorK5YQOP8ZsSVUnUdidwENS-Iv_ZH1uivLg_6YAvlCL6jroXH95l/pubhtml
//Sheets as JSON: https://spreadsheets.google.com/feeds/cells/1RYNXbxtIeqSmtzJhNca459t8I9Kg_waQRJl-6jBezRc/1/public/values?alt=json-in-script
//Sh    eets as RSS/XML: https://spreadsheets.google.com/feeds/cells/1RYNXbxtIeqSmtzJhNca459t8I9Kg_waQRJl-6jBezRc/1/public/values
//JavaScript Callback of JSON: https://spreadsheets.google.com/feeds/cells/1RYNXbxtIeqSmtzJhNca459t8I9Kg_waQRJl-6jBezRc/1/public/values?alt=json-in-script&callback=doData

//*** Google Sheets as JSON Callback: https://spreadsheets.google.com/feeds/cells/1RYNXbxtIeqSmtzJhNca459t8I9Kg_waQRJl-6jBezRc/1/public/full?alt=json

async function loadData() {
    const response = await fetch("https://spreadsheets.google.com/feeds/cells/1RYNXbxtIeqSmtzJhNca459t8I9Kg_waQRJl-6jBezRc/1/public/full?alt=json").then(response => {return response});
    const json = await response.json();
    return json
}

loadData().then(response => {console.log(response.feed.entry)})

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


});
