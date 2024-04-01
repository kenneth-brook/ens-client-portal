import { globalState } from '../reactive/state.js'

export async function loadPage() {
  const getKey = localStorage.getItem('user')
  const decriptClientKey = JSON.parse(getKey)
  const clientKey = decriptClientKey.key
  console.log(clientKey)

  const setStage = document.getElementById('contentBody')
  // Clear previous content
  setStage.innerHTML = ''

  // Add home page specific content
  const homeContent = document.createElement('div')
  homeContent.innerText = 'This is the page1 content.'
  setStage.appendChild(homeContent)

  try {
    // Construct the URL with the clientKey
    const url = `https://client-control.911-ens-services.com/fullPull/${clientKey}`

    // Fetch data from the server
    const response = await fetch(url)
    const data = await response.json()

    // Check if the response has an error
    if (response.ok) {
      // Process your data here
      console.log(data) // Example: log the data
      homeContent.innerText = 'This is the page1 content loaded.'
      // Optionally, you can update `homeContent` with details from `data`
    } else {
      // Handle errors, such as client not found or server errors
      homeContent.innerText = data.error || 'Error loading page content.'
    }
  } catch (error) {
    console.error('Error fetching client data:', error)
    homeContent.innerText = 'Error loading page content.'
  }
}
