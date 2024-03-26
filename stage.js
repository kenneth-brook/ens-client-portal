window.stageJsImported = true

import { loadRoleBasedFeatures } from './reactive/load.js'
import { globalState } from './reactive/state.js'
import { generateNavigation } from './pages/components/nav.js'
import './pages/components/routs.js'
import { fetchClientData } from './api/clientData.js'
import { fetchMainData } from './api/mainData.js'

removeElementById('loginForm')

const setStage = document.getElementById('contentBody')
const setTitle = document.getElementById('pageTitle')

function clearAndSetInitialContent() {
  // Clear previous content
  setStage.innerHTML = ''
}

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

async function loadHomePage() {
  try {
    // Dynamically import the home module
    const homeModule = await import('./pages/home.js')
    if (homeModule && homeModule.loadPage) {
      homeModule.loadPage(setStage) // Pass `setStage` if you want to manipulate it directly from `home.js`
    }
  } catch (error) {
    console.error('Error loading home page:', error)
  }
}

function initApp() {
  if (isAuthenticated()) {
    clearAndSetInitialContent() // Set initial content based on authenticated user
    generateNavigation(userData.role)
    loadHomePage() // Load the home page content for authenticated users
  } else {
    // Optionally, handle unauthenticated users, e.g., redirect to login
    console.log('User not authenticated')
    generateLoginForm()
  }
}

function isAuthenticated() {
  const token = localStorage.getItem('jwtToken')
  return token && isJwtValid(token)
}

function isJwtValid(token) {
  // Simplified validation logic
  // Implement actual JWT validation here
  checkAuthAndInitialize()
  return true
}

function checkAuthAndInitialize() {
  const token = localStorage.getItem('jwtToken')
  if (token && window.isJwtValid(token)) {
    // JWT is valid, proceed with initialization
    console.log('JWT is valid. Initializing application...')
    // Initialize your application here
  } else {
    console.log('JWT is not valid. Please log in.')
    // Handle unauthenticated scenario
    generateLoginForm()
  }
}

initApp()
initStage()
