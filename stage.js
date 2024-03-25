window.stageJsImported = true
console.log('stage')

import { loadRoleBasedFeatures } from './reactive/load.js'
import { globalState } from './reactive/state.js'
import { fetchClientData } from './api/clientData.js'
import { fetchMainData } from './api/mainData.js'
import { generateNavigation } from './pages/components/nav.js'
import './pages/components/routs.js'

removeElementById('loginForm')

const permissionLevel = userData.role

const setStage = document.getElementById('contentBody')

const testBox = document.createElement('div')
testBox.style.width = '100%'
testBox.style.textAlign = 'center'
testBox.style.fontSize = '2.5rem'
testBox.style.color = 'white'
setStage.appendChild(testBox)
testBox.innerText = `Welcome ${userData.fname}`

async function initStage() {
  await loadRoleBasedFeatures(userData)
  try {
    const clientData = await fetchClientData()
    const mainData = await fetchMainData()

    // Use setState to update the global state
    globalState.setState({ clientData, mainData })

    // Example: log the updated state
    console.log('Updated state:', globalState.getState())
  } catch (error) {
    console.error('Failed to initialize stage:', error)
  }
}

initStage()
generateNavigation(permissionLevel)
