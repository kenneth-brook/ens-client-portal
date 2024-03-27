function removeInitialMessage() {
  const menuBox = document.getElementById('menu-box')
  const initialMessage = menuBox.querySelector('p')
  if (initialMessage) {
    menuBox.removeChild(initialMessage)
  }
}

function createNavLink(href, text) {
  const link = document.createElement('a')
  link.href = `#${href}` // Using hash for client-side routing
  link.textContent = text
  link.addEventListener('click', (e) => {
    e.preventDefault()
    toggleMenuBox()
    linkClicked()
    window.location.hash = href
  })
  return link
}

export function generateNavigation(permissionLevel) {
  removeInitialMessage()

  const menuBox = document.getElementById('menu-box')
  const links = [
    { href: 'home', text: 'Home' },
    { href: 'page1', text: 'Page 1' },
    { href: 'page2', text: 'Page 2' },
    // Add more links as needed
  ]

  links.forEach(({ href, text }) => {
    const link = createNavLink(href, text)
    menuBox.appendChild(link)
    link.className = 'dropLink'
  })
}
