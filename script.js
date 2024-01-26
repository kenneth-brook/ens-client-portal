const sideMenu = document.getElementById("sideMenu");
const contentBody = document.getElementById("contentBody");

function toggleDiv() {
    const container = document.querySelector('.container');
    container.classList.toggle('open');
    container.classList.toggle('rotated');
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