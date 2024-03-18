removeElementById('loginForm');

const setStage = document.getElementById('contentBody');

const testBox = document.createElement('div');
testBox.style.width = "100%"
testBox.style.textAlign = "center"
testBox.style.fontSize = "2.5rem"
testBox.style.color = "white"
setStage.appendChild(testBox);
testBox.innerText = `Welcome ${userData.fname}`

console.log(userData.key);

window.stageJsImported = true;