import { globalState } from '../reactive/state.js'

export function loadPage() {
  // Assuming globalState.getState() is always up-to-date when this function is called
  const clientKey = globalState.getState().clientData.key // Assuming you want to access clientData
  console.log(clientKey)

  const setStage = document.getElementById('contentBody')
  // Clear previous content
  setStage.innerHTML = ''

  // Add home page specific content
  const homeContent = document.createElement('div')
  homeContent.innerText = 'This is the page1 content.'
  setStage.appendChild(homeContent)
}
