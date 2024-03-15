function removeElementById(elementId) {
    const element = document.getElementById(elementId);
    if (element) { // Ensure the element exists before attempting to remove it
        element.remove();
    } else {
        console.log(`Element with ID '${elementId}' not found.`);
    }
}

// Example usage:
removeElementById('loginForm');

const setStage = document.getElementById('contentBody');

const testBox = document.createElement('div');
testBox.style.width = "100%"
testBox.style.textAlign = "center"
testBox.style.fontSize = "2.5rem"
testBox.style.color = "white"
setStage.appendChild(testBox);
testBox.innerText = `Welcome ${userData.fname}`
