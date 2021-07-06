
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
    let post_link = row[4].gs$cell.$t;
    return [title, date, tag, picture_link, post_link];
}

function fit_data(dictionary_of_entries) {
    let post_thumbnails = document.getElementsByClassName("post_thumbnail");
    for (post_thumbnail of post_thumbnails){
        post_thumbnail.classList.add("hidden");
    }
    let post_links = document.getElementsByClassName("post_thumbnail_link");
    console.log(post_thumbnails);
    for (let i=0; i < max_post_per_page; i++) {
        let entry = dictionary_of_entries[i];
        let [title, date, tag, picture_link, post_link] = extract_data_from_row(entry);
        post_thumbnails[i].getElementsByClassName("post_title")[0].innerHTML = title;
        post_thumbnails[i].getElementsByClassName("post_img")[0].src = picture_link;
        post_thumbnails[i].getElementsByClassName("post_date")[0].innerHTML = date;
        post_thumbnails[i].getElementsByClassName("post_tag")[0].innerHTML = tag;
        post_links[i].setAttribute("href", post_link);
        post_thumbnails[i].classList.remove("hidden");
        post_thumbnails[i].classList.add("show");
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
        for (let i=0; i < (data.length/7); i++) {
            dictionary_of_entries[i] = data.slice(i * 7, (i+1) * 7)
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

//Resets posts based on filter selection
function filterSelection(filter_tag) {
    console.log("Filtering based on: "+filter_tag);
    let post_thumbnails = document.getElementsByClassName("post_thumbnail");
    let post_links = document.getElementsByClassName("post_thumbnail_link");

    if (filter_tag === "all") {
        console.log("Filling everthing!");
        loadPages();
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
        for (let i=0; i < (data.length/7); i++) {
            dictionary_of_entries[i] = data.slice(i * 7, (i+1) * 7)
        }
        //Swapping order of entries
        let number_of_entries = Object.keys(dictionary_of_entries).length;
        let new_dictionary_of_entries = {}
        for (let i=0; i < number_of_entries; i++) {
            new_dictionary_of_entries[i] = dictionary_of_entries[number_of_entries - 1 - i];
        }
        dictionary_of_entries = new_dictionary_of_entries;

        for (post_thumbnail of post_thumbnails) {
            post_thumbnail.getElementsByClassName("post_title")[0].innerHTML = "";
            post_thumbnail.getElementsByClassName("post_img")[0].src = "";
            post_thumbnail.getElementsByClassName("post_date")[0].innerHTML = "";
            post_thumbnail.getElementsByClassName("post_tag")[0].innerHTML = "";
        }

        thumbnail_number = 0;
        for (let i=0; i < Object.keys(dictionary_of_entries).length; i++) {
            let entry = dictionary_of_entries[i];
            let [title, date, tag, picture_link, post_link] = extract_data_from_row(entry);
            if (tag === filter_tag) {
                console.log("Success");
                post_thumbnails[thumbnail_number].getElementsByClassName("post_title")[0].innerHTML = title;
                post_thumbnails[thumbnail_number].getElementsByClassName("post_img")[0].src = picture_link;
                post_thumbnails[thumbnail_number].getElementsByClassName("post_date")[0].innerHTML = date;
                post_thumbnails[thumbnail_number].getElementsByClassName("post_tag")[0].innerHTML = tag;
                post_links[thumbnail_number].setAttribute("href", post_link);
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

//Load Page Data
function loadPageData(){
    //Get current page
    pagination = document.getElementById('pagination');
    page_number = parseInt(pagination.value);
    console.log(page_number);

    //Check if any filter is applied
    let current_filter;
    let all_filters = document.getElementsByClassName("category_checkbox");
    for (filter of all_filters) {
        if (filter.checked === true) {
            current_filter = filter;
        }
    }
    console.log("Current Filter Applied: " + current_filter.value);
    //If next page when filter is applied!
    if (current_filter.value !== 'all') {
        loadData().then(response => {
            let data = response.feed.entry;
            let dictionary_of_entries = {};
            let dictionary_of_entries_filtered = {};
            for (let i=0; i < (data.length/7); i++) {
                dictionary_of_entries[i] = data.slice(i * 7, (i+1) * 7)
            }
            //Swapping order of entries
            let number_of_entries = Object.keys(dictionary_of_entries).length;
            let new_dictionary_of_entries = {}
            for (let i=0; i < number_of_entries; i++) {
                new_dictionary_of_entries[i] = dictionary_of_entries[number_of_entries - 1 - i];
            }
            dictionary_of_entries = new_dictionary_of_entries;

            //Extract only specific filter entries
            let index = 0;
            for (let i=0; i < Object.keys(dictionary_of_entries).length; i++) {
                let [title, date, tag, picture_link, post_link] = extract_data_from_row(dictionary_of_entries[i]);
                if (tag.toLowerCase() == current_filter.value) {
                    console.log("count");
                    dictionary_of_entries_filtered[index] = dictionary_of_entries[i];
                    index++;
                }
            }
            console.log("Number of filtered entries: " + Object.keys(dictionary_of_entries_filtered).length);

            //Split entries by pages
            let filtered_entries_split_by_page = [];
            let number_of_filtered_entries = Object.keys(dictionary_of_entries_filtered).length;
            let current_page_entries = [];
            let counter = 0;
            for (let i=0; i < Object.keys(dictionary_of_entries_filtered).length; i++) {
                current_page_entries.push(dictionary_of_entries_filtered[i]);
                counter++;
                if (counter == 8) {
                    filtered_entries_split_by_page.push(current_page_entries);
                    current_page_entries = [];
                    counter = 0;
                }
            }

            //Fill last page entries
            let last_page_entries = [];
            let last_page_entries_number = number_of_filtered_entries % max_post_per_page;
            for (let i = number_of_filtered_entries - last_page_entries_number; i < number_of_filtered_entries; i++) {
                last_page_entries.push(dictionary_of_entries_filtered[i]);
            }
            filtered_entries_split_by_page.push(last_page_entries);
            console.log("Filteredherehre" + filtered_entries_split_by_page);
            //Fill data
            let current_page_entries_filtered = filtered_entries_split_by_page[page_number-1];
            let post_thumbnails = document.getElementsByClassName("post_thumbnail");
            let post_links = document.getElementsByClassName("post_thumbnail_link");

            for (post_thumbnail of post_thumbnails){
                post_thumbnail.classList.remove("show");
                post_thumbnail.classList.add("hidden");
            }

            for (let i=0; i < max_post_per_page; i++) {
                if (i >= current_page_entries_filtered.length) {
                    console.log("Filter less than 8!");
                    break;
                }
                let entry = current_page_entries_filtered[i];
                let [title, date, tag, picture_link, post_link] = extract_data_from_row(entry);
                post_thumbnails[i].getElementsByClassName("post_title")[0].innerHTML = title;
                post_thumbnails[i].getElementsByClassName("post_img")[0].src = picture_link;
                post_thumbnails[i].getElementsByClassName("post_date")[0].innerHTML = date;
                post_thumbnails[i].getElementsByClassName("post_tag")[0].innerHTML = tag;
                post_links[i].setAttribute("href", post_link);
                post_thumbnails[i].classList.remove("hidden");
                post_thumbnails[i].classList.add("show");
            }
        })
        return;
    }

    loadData().then(response => {
        let data = response.feed.entry;
        let dictionary_of_entries = {};
        for (let i=0; i < (data.length/7); i++) {
            dictionary_of_entries[i] = data.slice(i * 7, (i+1) * 7)
        }
        //Swapping order of entries
        let number_of_entries = Object.keys(dictionary_of_entries).length;
        let new_dictionary_of_entries = {}
        for (let i=0; i < number_of_entries; i++) {
            new_dictionary_of_entries[i] = dictionary_of_entries[number_of_entries - 1 - i];
        }
        dictionary_of_entries = new_dictionary_of_entries;
        //Split entries by page
        let counter = 0;
        let page_entries = [];
        let entries_by_page = [];
        for (let i=0; i < number_of_entries; i++) {
            page_entries.push(dictionary_of_entries[i]);
            counter++;
            if (counter == 8) {
                counter = 0;
                entries_by_page.push(page_entries);
                page_entries = [];
            }
        }
        //Fill last page entries
        let last_page_entries = [];
        let last_page_entries_number = number_of_entries % max_post_per_page;
        for (let i = number_of_entries - last_page_entries_number; i < number_of_entries; i++) {
            last_page_entries.push(dictionary_of_entries[i]);
        }
        entries_by_page.push(last_page_entries);


        //Fill data by page number
        let current_page_entries = entries_by_page[page_number - 1];
        let current_page_entries_length = current_page_entries.length;
        console.log("Current page entries: "+ entries_by_page[page_number - 1] + ", total number of entries: " + current_page_entries_length);
        let post_thumbnails = document.getElementsByClassName("post_thumbnail");
        let post_links = document.getElementsByClassName("post_thumbnail_link");

        for (let i=0; i < max_post_per_page; i++) {
            if (i >= current_page_entries_length){
                post_thumbnails[i].classList.remove("show");
                post_thumbnails[i].classList.add("hidden");
                continue;
            }
            let entry = current_page_entries[i];
            let [title, date, tag, picture_link, post_link] = extract_data_from_row(entry);
            post_thumbnails[i].getElementsByClassName("post_title")[0].innerHTML = title;
            post_thumbnails[i].getElementsByClassName("post_img")[0].src = picture_link;
            post_thumbnails[i].getElementsByClassName("post_date")[0].innerHTML = date;
            post_thumbnails[i].getElementsByClassName("post_tag")[0].innerHTML = tag;
            post_links[i].setAttribute("href", post_link)
            post_thumbnails[i].classList.remove("hidden");
            post_thumbnails[i].classList.add("show");
        }
    });
}

function loadPages() {
    //Load all pagination (first time)
    //Remove all pagination currently
    let pagination_pages_select = document.getElementById('pagination');
    pagination_pages_select.options.length = 0;

    loadData().then(response => {
        let data = response.feed.entry;
        let dictionary_of_entries = {};
        for (let i=0; i < (data.length/7); i++) {
            dictionary_of_entries[i] = data.slice(i * 7, (i+1) * 7)
        }
        //Swapping order of entries
        let number_of_entries = Object.keys(dictionary_of_entries).length;
        let new_dictionary_of_entries = {}
        for (let i=0; i < number_of_entries; i++) {
            new_dictionary_of_entries[i] = dictionary_of_entries[number_of_entries - 1 - i];
        }
        dictionary_of_entries = new_dictionary_of_entries;
        console.log(dictionary_of_entries);

        let total_number_of_entries = Object.keys(dictionary_of_entries).length;
        let total_number_of_pages = Math.floor(total_number_of_entries / max_post_per_page);
        let remainder = total_number_of_entries % max_post_per_page;
        if (remainder > 0){total_number_of_pages++;};
        for (let i = 1; i < (total_number_of_pages+1); i++){
            let pagination = document.getElementById('pagination');
            let pagination_page = document.createElement("option");
            pagination_page.text = i;
            pagination_page.classList.add("pagination_page");
            pagination.onchange = loadPageData;
            pagination.appendChild(pagination_page);

        }
    });
}

loadPages();


function loadPagesIfFiltered(filter) {
    //Get current pagination pages
    let pagination_pages_select = document.getElementById('pagination');
    pagination_pages_select.options.length = 0;
    loadData().then(response => {
        let data = response.feed.entry;
        let dictionary_of_entries = {};
        let dictionary_of_entries_filtered = {};
        for (let i=0; i < (data.length/7); i++) {
            dictionary_of_entries[i] = data.slice(i * 7, (i+1) * 7)
        }
        //Swapping order of entries
        let number_of_entries = Object.keys(dictionary_of_entries).length;
        let new_dictionary_of_entries = {}
        for (let i=0; i < number_of_entries; i++) {
            new_dictionary_of_entries[i] = dictionary_of_entries[number_of_entries - 1 - i];
        }
        dictionary_of_entries = new_dictionary_of_entries;

        //Extract only specific filter entries
        let index = 0;
        for (let i=0; i < Object.keys(dictionary_of_entries).length; i++) {
            let [title, date, tag, picture_link, post_link] = extract_data_from_row(dictionary_of_entries[i]);
            if (tag == filter) {
                dictionary_of_entries_filtered[index] = dictionary_of_entries[i];
                index++;
            }
        }
        console.log("Number of filtered entries: " + Object.keys(dictionary_of_entries_filtered).length);

        //Split entries by pages
        let filtered_entries_split_by_page = [];
        let number_of_filtered_entries = Object.keys(dictionary_of_entries_filtered).length;
        let current_page_entries = [];
        let counter = 0;
        for (let i=0; i < Object.keys(dictionary_of_entries_filtered).length; i++) {
            current_page_entries.push(dictionary_of_entries_filtered[i]);
            counter++;
            if (counter == 8) {
                filtered_entries_split_by_page.push(current_page_entries);
                current_page_entries = [];
                counter = 0;
            }
        }

        //Fill last page entries
        let last_page_entries = [];
        let last_page_entries_number = number_of_filtered_entries % max_post_per_page;
        for (let i = number_of_filtered_entries - last_page_entries_number; i < number_of_filtered_entries; i++) {
            last_page_entries.push(dictionary_of_entries_filtered[i]);
        }
        filtered_entries_split_by_page.push(last_page_entries);

        //Adding new pagination pages
        let number_of_pages = Math.ceil(number_of_filtered_entries / max_post_per_page);
        for (let i=1; i <= number_of_pages; i++) {
            let pagination = document.getElementById('pagination');
            let pagination_page = document.createElement("option");
            pagination_page.text = i;
            pagination_page.classList.add("pagination_page");
            pagination.onchange = loadPageData;
            pagination.appendChild(pagination_page);
        }

        //Load data
        let first_page_filtered_entries = filtered_entries_split_by_page[0];
        let post_thumbnails = document.getElementsByClassName("post_thumbnail");
        let post_links = document.getElementsByClassName("post_thumbnail_link");

        for (post_thumbnail of post_thumbnails){
            post_thumbnail.classList.remove("show");
            post_thumbnail.classList.add("hidden");
        }

        for (let i=0; i < max_post_per_page; i++) {
            if (i >= first_page_filtered_entries.length) {
                console.log("Filter less than 8!");
                break;
            }
            let entry = filtered_entries_split_by_page[0][i];
            let [title, date, tag, picture_link, post_link] = extract_data_from_row(entry);
            post_thumbnails[i].getElementsByClassName("post_title")[0].innerHTML = title;
            post_thumbnails[i].getElementsByClassName("post_img")[0].src = picture_link;
            post_thumbnails[i].getElementsByClassName("post_date")[0].innerHTML = date;
            post_thumbnails[i].getElementsByClassName("post_tag")[0].innerHTML = tag;
            post_links[i].setAttribute("href", post_link);
            post_thumbnails[i].classList.remove("hidden");
            post_thumbnails[i].classList.add("show");
        }

    })

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

  $('.email').click( function(){
    window.alert("Reach us at coding.cucumbers@gmail.com")
  });

  $('.twitter').click( function(){
    window.alert("We are coming soon!")
  });


});
