window.addEventListener('hashchange', handleRouteChange)

function updatePageTitle(newTitle) {
  const pageTitleElement = document.getElementById('pageTitle')
  if (pageTitleElement) {
    pageTitleElement.innerText = newTitle
  }
}

export function handleRouteChange() {
  const path = window.location.hash.replace('#', '') || 'home'
  let pageTitle = ''

  switch (path) {
    case 'home':
      loadModule('home') // Assuming loadModule is your function to dynamically import page modules
      pageTitle = 'Home'
      break
    case 'reports':
      loadModule('reports')
      pageTitle = 'Reports'
      break
    case 'page2':
      loadModule('page2')
      pageTitle = 'Page 2'
      break
    default:
      console.log('Page not found')
      pageTitle = 'Page Not Found'
      // Optionally, load a default module or show a "Page Not Found" message
      break
  }
  updatePageTitle(pageTitle)
}

async function loadModule(modulePath) {
  try {
    const module = await import(`./pages/${modulePath}.js`)
    if (module && module.loadPage) {
      module.loadPage() // Assuming each module exports a loadPage function
    }
  } catch (error) {
    console.error(`Failed to load module: ${modulePath}`, error)
  }
}

document.addEventListener('DOMContentLoaded', handleRouteChange) // Ensure the DOM is ready before the initial route handling
