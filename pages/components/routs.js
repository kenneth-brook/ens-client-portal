async function loadModule(modulePath) {
  try {
    const module = await import(modulePath)
    module.loadPage()
  } catch (error) {
    console.error('Error loading module:', error)
    // Handle error or show a "Page Not Found" message
  }
}

window.addEventListener('hashchange', () => {
  const path = window.location.hash.replace('#', '')
  switch (path) {
    case 'home':
      //loadModule('../home.js')
      break
    case 'page1':
      //loadModule('../page1.js')
      break
    case 'page2':
      //loadModule('../page2.js')
      break
    default:
      console.log('Page not found')
    // Load a default module or show a "Page Not Found" message
  }
})

// Load module on initial page load as well
if (window.location.hash) {
  window.dispatchEvent(new Event('hashchange'))
}
