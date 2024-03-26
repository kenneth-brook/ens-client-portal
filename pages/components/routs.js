window.addEventListener('hashchange', handleRouteChange)

function updatePageTitle(newTitle) {
  const pageTitleElement = document.getElementById('pageTitle')
  if (pageTitleElement) {
    pageTitleElement.innerText = newTitle
  }
  console.log(`Setting page title to: ${pageTitle}`)
}

function handleRouteChange() {
  const path = window.location.hash.replace('#', '') || 'home'
  console.log(`Handling route for path: ${path}`)
  let pageTitle = ''

  switch (path) {
    case 'home':
      loadModule('../../home') // Assuming loadModule is your function to dynamically import page modules
      pageTitle = 'Home'
      break
    case 'page1':
      loadModule('../../page1')
      pageTitle = 'Page 1'
      break
    case 'page2':
      loadModule('../../page2')
      pageTitle = 'Page 2'
      break
    default:
      console.log('Page not found')
      pageTitle = 'Page Not Found'
      // Optionally, load a default module or show a "Page Not Found" message
      break
  }
  console.log(`Current path: ${path}`)
  // Update the page title with the determined title for the current route
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

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded event fired.')
  handleRouteChange() // Ensure the DOM is ready before the initial route handling
})
