function updatePageTitle(newTitle) {
  const pageTitleElement = document.getElementById('pageTitle')
  if (pageTitleElement) {
    pageTitleElement.innerText = newTitle
  }
}

function handleRouteChange() {
  const path = window.location.hash.replace('#', '')
  let pageTitle = ''

  switch (path) {
    case 'home':
      loadModule('../home.js') // Assuming loadModule is your function to dynamically import page modules
      pageTitle = 'Home'
      break
    case 'page1':
      loadModule('./pages/page1.js')
      pageTitle = 'Page 1'
      break
    case 'page2':
      loadModule('./pages/page2.js')
      pageTitle = 'Page 2'
      break
    default:
      console.log('Page not found')
      pageTitle = 'Page Not Found'
      // Optionally, load a default module or show a "Page Not Found" message
      break
  }

  // Update the page title with the determined title for the current route
  updatePageTitle(pageTitle)
}

async function loadModule(modulePath) {
  try {
    const module = await import(`./${modulePath}.js`)
    if (module && module.default) {
      module.default() // Execute the default export function of the module
    }
  } catch (error) {
    console.error(`Failed to load module: ${modulePath}`, error)
  }
}

// Listen for hash changes to handle routing
window.addEventListener('hashchange', handleRouteChange)

document.addEventListener('DOMContentLoaded', (event) => {
  handleRouteChange() // Ensure the DOM is ready before the initial route handling
})
