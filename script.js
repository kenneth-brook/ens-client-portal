const sideMenu = document.getElementById("sideMenu");
const contentBody = document.getElementById("contentBody");

function toggleDiv() {
    const container = document.querySelector('.container');
    container.classList.toggle('open');
    container.classList.toggle('rotated');

    // Toggle width 100% for contentBody
    if (contentBody.style.width === "100%") {
        contentBody.style.width = ""; // Reset the width if it's already 100%
    } else {
        contentBody.style.width = "100%"; // Set the width to 100%
    }
}

function toggleMenu(x) {
    x.classList.toggle("change");
}

function toggleMenuBox() {
    const menuBox = document.getElementById("menu-box");
    if (menuBox.style.maxHeight) {
        menuBox.style.maxHeight = null;
    } else {
        menuBox.style.maxHeight = menuBox.scrollHeight + "px";
    }
}