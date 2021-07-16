$(function(){

  // when user inputs an email address
$("#submit_email_button").click(function(){
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
         TeleNoti(); //send message to telegrp
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

// when user hovers on cards, card body changes colour
// $(".card").hover( function() {
//   $(this).getElementsByClassName('card-body')css("display", "block");
//   }, function() {
//   $(".card-body").css("display", "none");
//   });

//when user hovers on submit submit_button
$("#submit_button").hover( function() {
  $(this).css("background-color", "rgba(107, 107, 107, 1)");
  }, function() {
  $(this).css("background-color", "white");
  });


//cards to fade in upon scroll
//   $(window).scroll( function() {
//     if ($(this).scrollTop() < 300) {
//       $(".card").css({"opacity": "0"})
//     }
//     else {
//       $(".card").css({"opacity": "1"})
//     }
// })

//user clicks on google icon, our gmail appears
$('.email').click( function(){
  window.alert("Reach us at coding.cucumbers@gmail.com")
});

$('.twitter').click( function(){
  window.alert("We are coming soon!")
});

function isMobile() {
   return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (isMobile()) {
  $(".card").css({"opacity": "1"})
}
else {
  $(window).scroll(function user_scroll() {
    if ($(this).scrollTop() < 300) {
      $(".card").css({"opacity": "0"})
    }
    else {
      $(".card").css({"opacity": "1"})
    }
  })
}

});

max_post_per_page = 7;

async function loadData() {
    const response = await fetch("https://spreadsheets.google.com/feeds/cells/1RYNXbxtIeqSmtzJhNca459t8I9Kg_waQRJl-6jBezRc/1/public/full?alt=json").then(response => {return response});
    const json = await response.json();
    return json
}

function fillAll() {
    loadData().then(response => {
        let data = response.feed.entry;
        let dictionary_of_entries = {};
        for (let i=0; i < (data.length/8); i++) {
            dictionary_of_entries[i] = data.slice(i * 8, (i+1) * 8)
        }
        //Swapping order of entries
        let number_of_entries = Object.keys(dictionary_of_entries).length;
        let new_dictionary_of_entries = {}
        for (let i=0; i < number_of_entries; i++) {
            new_dictionary_of_entries[i] = dictionary_of_entries[number_of_entries - 1 - i];
        }
        dictionary_of_entries = new_dictionary_of_entries;
        console.log(dictionary_of_entries);

        fit_data(dictionary_of_entries);
    });
}

function extract_data_from_row(row) {
    let title = row[0].gs$cell.$t;
    let date = row[1].gs$cell.$t;
    let tag = row[2].gs$cell.$t;
    let picture_link = row[3].gs$cell.$t;
    let post_link = row[4].gs$cell.$t;
    let preamble = row[5].gs$cell.$t;
    let post_poster = row[6].gs$cell.$t;
    let post_author = row[7].gs$cell.$t;
    return [title, date, tag, picture_link, post_link, preamble, post_poster, post_author];
}

function fit_data(dictionary_of_entries) {
    let post_thumbnails = document.getElementsByClassName("latest_post_thumbnail");
    let post_links = document.getElementsByClassName("latest_post_link");
    console.log(post_thumbnails);
    for (let i=0; i < max_post_per_page; i++) {
        let entry = dictionary_of_entries[i];
        let [title, date, tag, picture_link, post_link, preamble, post_poster, post_author] = extract_data_from_row(entry);
        post_thumbnails[i].getElementsByClassName("post_title")[0].innerHTML = title;
        post_thumbnails[i].getElementsByClassName("latest_post_poster")[0].src = post_poster;
        post_thumbnails[i].getElementsByClassName("post_author")[0].innerHTML = post_author;
        post_thumbnails[i].getElementsByClassName("latest_post_date")[0].innerHTML = date;
        post_links[i].setAttribute("href", post_link);
    }
}


fillAll();





function fadeIn(element, opacity_increment, callback) {
    element.style.opacity = "0";
    let timer = setInterval(() => {
        let new_opacity = parseFloat(element.style.opacity) + opacity_increment;
        element.style.opacity = new_opacity.toString();
        if (parseInt(element.style.opacity) >= 1) {
            clearInterval(timer)
            console.log("Fade finish!")
            if (callback) {
                callback();
            }
        }
    }, 50)
}

const opacity_increment_global = 0.1;

function fadeMain() {
    fadeIn(document.getElementById("first_post_container"), opacity_increment_global, fadeSidebar);
}

function fadeBody() {
    fadeIn(document.getElementById("main_body"), opacity_increment_global, fadeSeries)
}

function fadeSidebar() {
    fadeIn(document.getElementById("sidebar_container"), opacity_increment_global, fadeBody);
}

function fadeSeries() {
    fadeIn(document.getElementById("main_series_container"), opacity_increment_global, false);
}

function fadeSaying() {
    fadeIn(document.getElementById("saying_container"), opacity_increment_global, fadeMain);
}

function fadeHeader() {
    fadeIn(document.getElementById("header"), opacity_increment_global, fadeSaying);
}


fadeHeader();