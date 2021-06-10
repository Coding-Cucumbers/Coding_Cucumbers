
//Sheets ID: 1RYNXbxtIeqSmtzJhNca459t8I9Kg_waQRJl-6jBezRc
//Published Sheets: https://docs.google.com/spreadsheets/d/e/2PACX-1vQjv-aC3kieSYEL0g9dImLpQHdtorK5YQOP8ZsSVUnUdidwENS-Iv_ZH1uivLg_6YAvlCL6jroXH95l/pubhtml
//Sheets as JSON: https://spreadsheets.google.com/feeds/cells/1RYNXbxtIeqSmtzJhNca459t8I9Kg_waQRJl-6jBezRc/1/public/values?alt=json-in-script
//Sh    eets as RSS/XML: https://spreadsheets.google.com/feeds/cells/1RYNXbxtIeqSmtzJhNca459t8I9Kg_waQRJl-6jBezRc/1/public/values
//JavaScript Callback of JSON: https://spreadsheets.google.com/feeds/cells/1RYNXbxtIeqSmtzJhNca459t8I9Kg_waQRJl-6jBezRc/1/public/values?alt=json-in-script&callback=doData

//*** Google Sheets as JSON Callback: https://spreadsheets.google.com/feeds/cells/1RYNXbxtIeqSmtzJhNca459t8I9Kg_waQRJl-6jBezRc/1/public/full?alt=json

const max_post_per_page = 8;

function extract_data_from_row(row) {
    let title = row[0].gs$cell.$t;
    let date = row[1].gs$cell.$t;
    let tag = row[2].gs$cell.$t;
    let picture_link = row[3].gs$cell.$t;
    return [title, date, tag, picture_link];
}

function fit_data(dictionary_of_entries) {
    let post_thumbnails = document.getElementsByClassName("post_thumbnail");
    console.log(post_thumbnails);
    for (let i=0; i < max_post_per_page; i++) {
        let entry = dictionary_of_entries[i];
        let [title, date, tag, picture_link] = extract_data_from_row(entry);
        post_thumbnails[i].getElementsByClassName("post_title")[0].innerHTML = title;
        post_thumbnails[i].getElementsByClassName("post_img")[0].src = picture_link;
        post_thumbnails[i].getElementsByClassName("post_date")[0].innerHTML = date;
        post_thumbnails[i].getElementsByClassName("post_tag")[0].innerHTML = tag;
    }
}

async function loadData() {
    const response = await fetch("https://spreadsheets.google.com/feeds/cells/1RYNXbxtIeqSmtzJhNca459t8I9Kg_waQRJl-6jBezRc/1/public/full?alt=json").then(response => {return response});
    const json = await response.json();
    return json
}

function fillAll() {
    loadData().then(response => {
        let data = response.feed.entry;
        let dictionary_of_entries = {};
        for (let i=0; i < (data.length/4); i++) {
            dictionary_of_entries[i] = data.slice(i * 4, (i+1) * 4)
        }
        console.log(dictionary_of_entries);

        fit_data(dictionary_of_entries);
    });
}

//Resets posts based on filter selection
function filterSelection(filter_tag) {
    console.log("Filtering based on: "+filter_tag);
    let post_thumbnails = document.getElementsByClassName("post_thumbnail");

    if (filter_tag === "all") {
        console.log("Filling everthing!");
        fillAll();
        return;
    }
    for (post_thumbnail of post_thumbnails) {
        post_thumbnail.classList.remove("hidden");
        post_thumbnail.classList.add("show");
    }
    loadData().then(response => {
        let data = response.feed.entry;
        let dictionary_of_entries = {};
        for (let i=0; i < (data.length/4); i++) {
            dictionary_of_entries[i] = data.slice(i * 4, (i+1) * 4)
        }
        for (post_thumbnail of post_thumbnails) {
            post_thumbnail.getElementsByClassName("post_title")[0].innerHTML = "";
            post_thumbnail.getElementsByClassName("post_img")[0].src = "";
            post_thumbnail.getElementsByClassName("post_date")[0].innerHTML = "";
            post_thumbnail.getElementsByClassName("post_tag")[0].innerHTML = "";
        }

        thumbnail_number = 0;
        for (let i=0; i < Object.keys(dictionary_of_entries).length; i++) {
            let entry = dictionary_of_entries[i];
            let [title, date, tag, picture_link] = extract_data_from_row(entry);
            if (tag === filter_tag) {
                console.log("Success");
                post_thumbnails[thumbnail_number].getElementsByClassName("post_title")[0].innerHTML = title;
                post_thumbnails[thumbnail_number].getElementsByClassName("post_img")[0].src = picture_link;
                post_thumbnails[thumbnail_number].getElementsByClassName("post_date")[0].innerHTML = date;
                post_thumbnails[thumbnail_number].getElementsByClassName("post_tag")[0].innerHTML = tag;
                thumbnail_number++;
            } else {continue;}
        }
        for (post_thumbnail of post_thumbnails) {
            if (!post_thumbnail.getElementsByClassName("post_title")[0].innerHTML) {
                console.log(post_thumbnail+" removed!");
                post_thumbnail.classList.add("hidden");
                post_thumbnail.classList.remove("show");
            }
        }
    })
    return;
}

fillAll();


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


});
