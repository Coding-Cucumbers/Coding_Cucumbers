
//Sheets ID: 1RYNXbxtIeqSmtzJhNca459t8I9Kg_waQRJl-6jBezRc
//Published Sheets: https://docs.google.com/spreadsheets/d/e/2PACX-1vQjv-aC3kieSYEL0g9dImLpQHdtorK5YQOP8ZsSVUnUdidwENS-Iv_ZH1uivLg_6YAvlCL6jroXH95l/pubhtml
//Sheets as JSON: https://spreadsheets.google.com/feeds/cells/1RYNXbxtIeqSmtzJhNca459t8I9Kg_waQRJl-6jBezRc/1/public/values?alt=json-in-script
//Sh    eets as RSS/XML: https://spreadsheets.google.com/feeds/cells/1RYNXbxtIeqSmtzJhNca459t8I9Kg_waQRJl-6jBezRc/1/public/values
//JavaScript Callback of JSON: https://spreadsheets.google.com/feeds/cells/1RYNXbxtIeqSmtzJhNca459t8I9Kg_waQRJl-6jBezRc/1/public/values?alt=json-in-script&callback=doData

//*** Google Sheets as JSON Callback: https://spreadsheets.google.com/feeds/cells/1RYNXbxtIeqSmtzJhNca459t8I9Kg_waQRJl-6jBezRc/1/public/full?alt=json

//Blog History Sheets ID:
const sheets_id = '1RYNXbxtIeqSmtzJhNca459t8I9Kg_waQRJl-6jBezRc';
//API Key:
const api_key = 'AIzaSyCJzFxSt5J-ZbZ1gHAzU5LO5TqRD7nLrNg';
  
const max_post_per_page = 8;


//Total array of entries
let total_entries = [];

//Current array of entries
let current_entries = [];

//Current entries split by page:
let current_entries_split_by_page = [];

function extract_data_from_row(row) {
    let title = row[0];
    let date = row[1];
    let tag = row[2];
    let picture_link = row[3];
    let post_link = row[4];
    return [title, date, tag, picture_link, post_link];
}

function split_entries_into_pages() {
    //Splits current entries into arrays of 8:
    console.log("Splitting current entries into pages!");

    current_entries_split_by_page = [];

    let counter = 0;
    let current_page_entries = [];
    for (let i = 0; i < current_entries.length; i++) {
        if (counter >= max_post_per_page) {
            counter = 1;
            current_entries_split_by_page.push(current_page_entries);
            current_page_entries = [];
            current_page_entries.push(current_entries[i]);
        } else {
            counter++;
            current_page_entries.push(current_entries[i]);
        }
    }
    if (current_page_entries.length > 0) {
        current_entries_split_by_page.push(current_page_entries);
    }

    console.log("Current entries split by pages: " + current_entries_split_by_page);
    console.log("Splitting pages done!");

    return;
}

function fit_data(array_of_entries) {
    //Fits array of 8 data entries into the 8 post thumbnails:

    //Making all post thumbnails empty:
    let post_thumbnails = document.getElementsByClassName("post_thumbnail");
    for (post_thumbnail of post_thumbnails){
        post_thumbnail.classList.add("hidden");
        post_thumbnail.classList.remove("show");
    }
    let post_links = document.getElementsByClassName("post_thumbnail_link");

    //Fitting data:
    let entries_to_fit = array_of_entries.length; 
    console.log("Number of entries in this page: " + entries_to_fit);
    if (entries_to_fit > max_post_per_page) {
        entries_to_fit = max_post_per_page;
    }

    for (let i=0; i < entries_to_fit; i++) {
        let entry = array_of_entries[i];
        let [title, date, tag, picture_link, post_link] = extract_data_from_row(entry);
        post_thumbnails[i].getElementsByClassName("post_title")[0].innerHTML = title;
        post_thumbnails[i].getElementsByClassName("post_img")[0].src = picture_link;
        post_thumbnails[i].getElementsByClassName("post_date")[0].innerHTML = date;
        post_thumbnails[i].getElementsByClassName("post_tag")[0].innerHTML = tag;
        post_links[i].setAttribute("href", post_link);
        post_thumbnails[i].classList.remove("hidden");
        post_thumbnails[i].classList.add("show");
    }
    return;
}
//GET https://sheets.googleapis.com/v4/spreadsheets/1RYNXbxtIeqSmtzJhNca459t8I9Kg_waQRJl-6jBezRc/values/Sheet1?key=AIzaSyCJzFxSt5J-ZbZ1gHAzU5LO5TqRD7nLrNg
//`https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:json&tq&gid=${gid}`

async function getJson(id,key){
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${id}/values/Sheet1?key=${key}`).then(response => {return response});
    const json = response.json();
    return json;
}


async function fillAll() {
    //Resets the 8 post thumbnails with the 8 recent posts:
    await getJson(sheets_id, api_key).then(response => {
        console.log("Filling all:");
        total_entries = response.values.reverse();
        current_entries = total_entries;

        console.log("Total Entries: " + total_entries);
        fit_data(current_entries);
        console.log("Filled all!");
        return data;
    });

    //Updating current entries and curent entries split by page
    split_entries_into_pages();

    return;
}

function filterDictionary(filter) {
    //Filters total entries into a array of entries with specified filter only:
    console.log("Filtering array based on: " + filter);
    const data = total_entries;
    let array_of_entries = [];
    let number = 0;

    for (let i = 0; i < data.length; i++) {
        const entry = data[i];
        if (entry[2] === filter || filter === "all") {
            array_of_entries[number] = entry;
            number++;
        }
    }

    current_entries = array_of_entries;
    console.log("Current entries updated: " + current_entries);    

    split_entries_into_pages();

    console.log("Filtering done!");

    return current_entries;
}

function filterSelection(filter) {
    //Filter current data entries according to specified filter (onclick for filter buttons):
    //Loads 8 latest entries from current filter:
    const entries = filterDictionary(filter);
    fit_data(entries);

    //Reloads pagination according to current entries:
    loadPagination();

    return;
}

function loadPagination() {
    //Loads pagination 
    console.log("Loading Pagination!");

    //Remove all pagination currently:
    let pagination_pages_select = document.getElementById('pagination');
    pagination_pages_select.options.length = 0;

    //Loads current pagination according to current filter:
    let total_number_of_entries = current_entries.length;
    let total_number_of_pages = Math.ceil(total_number_of_entries / max_post_per_page);
    for (let i = 1; i < (total_number_of_pages+1); i++){
        let pagination = document.getElementById('pagination');
        let pagination_page = document.createElement("option");
        pagination_page.text = i;
        pagination_page.classList.add("pagination_page");
        pagination.onchange = loadPageData;
        pagination.appendChild(pagination_page);

    }
    console.log("Total number of entries: " + total_number_of_entries + ", Total number of pages: " + total_number_of_pages);
    return;
}

function loadPageData() {
    //Loads page data (onclick for pagination options):

    //Getting current page:
    const page_number = parseInt(document.getElementById('pagination').value);
    console.log("Loading Page: " + page_number);

    //Loading page data:
    const current_page_entries = current_entries_split_by_page[page_number - 1];
    console.log("Loading current page of entries: " + current_page_entries);
    fit_data(current_page_entries);

    console.log("Done Loading Page: " + page_number);

    return;
}

async function actions() {
    //Entry actions:
    console.log("Welcome to Coding Cucumbers blog history page!");

    //First filling of data & getting total dictionary of entries:
    await fillAll();
    loadPagination();

    console.log("Entry actions done!");
    return;
}

//Actions:
actions();

//End of data loading!


var col_2 = document.getElementsByClassName("col-2")[0];
var all_posts = document.getElementById('all_posts');
var sidebar = document.getElementById('sidebar');
function resize() {
 if (window.innerWidth < 960) {
   col_2.classList.remove("col-2");
   all_posts.classList.remove("col-7");
   all_posts.classList.add("col-8");
   sidebar.classList.remove("col-3");
   sidebar.classList.add("col-4");
 } else {
   col_2.classList.add("col-2");
   all_posts.classList.add("col-7");
   all_posts.classList.remove("col-8");
   sidebar.classList.add("col-3");
   sidebar.classList.remove("col-4");
 }
}

window.onresize = resize

if (window.innerWidth < 960) {
  col_2.classList.remove("col-2");
  all_posts.classList.remove("col-7");
  all_posts.classList.add("col-8");
  sidebar.classList.remove("col-3");
  sidebar.classList.add("col-4");
}

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


});
