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