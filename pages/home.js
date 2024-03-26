export function loadPage() {
  const setStage = document.getElementById('contentBody')
  // Clear previous content
  setStage.innerHTML = ''

  // Add home page specific content
  const homeContent = document.createElement('div')
  homeContent.innerText = 'This is the home page content.'
  setStage.appendChild(homeContent)
}
