import { loadRoleBasedFeatures } from './reactive/load.js'
import { globalState } from './reactive/state.js'
import { fetchClientData } from './api/clientData.js'
import { fetchMainData } from './api/mainData.js'

removeElementById('loginForm')

const setStage = document.getElementById('contentBody')

const testBox = document.createElement('div')
testBox.style.width = '100%'
testBox.style.textAlign = 'center'
testBox.style.fontSize = '2.5rem'
testBox.style.color = 'white'
setStage.appendChild(testBox)
testBox.innerText = `Welcome ${userData.fname}`

console.log(userData.role)

async function initStage() {
  await loadRoleBasedFeatures(userData)
  await fetchClientData()
  await fetchMainData()

  // Subscribe to state changes if necessary
  const unsubscribe = globalState.subscribe((newState) => {
    console.log('State updated:', newState)
    // Update your UI based on the new state
  })
}

window.stageJsImported = true

initStage()
