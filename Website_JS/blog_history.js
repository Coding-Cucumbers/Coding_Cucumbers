
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

