function iconTransformation(x) {
    x.classList.toggle("change");
}

function displayMenu() {
    var x = document.getElementById("hiddenMenu");
    if (x.style.display === "none") {
        x.style.display = "flex";
    } else {
        x.style.display = "none";
    }
}
