
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







