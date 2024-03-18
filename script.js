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

//element removal function

function removeElementById(elementId) {
    const element = document.getElementById(elementId);
    if (element) { // Ensure the element exists before attempting to remove it
        element.remove();
    } else {
        console.log(`Element with ID '${elementId}' not found.`);
    }
}

function checkJwtAndHandleAuth() {
    const token = localStorage.getItem('jwtToken');
    if(!token) {
        generateLoginForm();
    } else if (!isJwtValid(token)) {
        console.log("Session expired or user not logged in. Prompting for login...");
        removeJwt();
        promptForLogin(); // This should be a function that handles showing the login UI
    } else {
        console.log("JWT is valid.");
        checkStageJsImported(); // Ensure this logic matches your app's structure
    }
}

function isJwtValid(token) {
    // Decode the JWT to check the expiry
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));
    const exp = payload.exp;
    const now = Date.now().valueOf() / 1000;

    return typeof exp !== 'undefined' && exp > now;
}

function promptForLogin() {
    // Implement the UI logic to show a login prompt/modal
    // This could be a simple modal that appears over the content
    // Or, for simplicity, an alert and a manual page refresh
    alert("Your session has expired. Please log in again.");
    generateLoginForm();
    // Optionally, trigger a modal here instead of refreshing
    //location.reload(); // Use if a modal or in-app login prompt isn't feasible
}

function checkStageJsImported() {
    // Check if `stage.js` functionality is ready to be used
    if (window.stageJsImported) {
        console.log("`stage.js` is imported and ready.");
    } else {
        console.log("`stage.js` has not been imported. Loading now...");
        import('./stage.js');
    }
}

function removeJwt() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
}
// Example call to check JWT and handle authentication at the start or on specific actions
//removeJwt();