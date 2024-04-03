import { globalState } from '../reactive/state.js'

let incidentData = []
const getKey = localStorage.getItem('user')
const decriptClientKey = JSON.parse(getKey)
const clientKey = decriptClientKey.key
const homeContent = document.createElement('div')

// This function now strictly deals with loading and displaying content.
export function loadPage() {
  const setStage = document.getElementById('contentBody')
  setStage.innerHTML = '' // Clear previous content

  homeContent.innerText = 'Loading content...'
  setStage.appendChild(homeContent)

  datCall()
}

async function datCall(params) {
  try {
    const url = `https://client-control.911-ens-services.com/fullPull/${clientKey}?${params}` //
    const response = await fetch(url)
    const data = await response.json()
    incidentData = data.data

    if (response.ok) {
      console.log(data) // For debugging purposes
      homeContent.innerText = 'Page content loaded with applied filters.'
      initializeFilterInterface()
      tableSpawn()
    } else {
      homeContent.innerText =
        data.error || 'Error loading page content with filters.'
    }
  } catch (error) {
    console.error('Error fetching client data:', error)
    homeContent.innerText = 'Error loading page content.'
  }
}

// Separately initialize the filter interface when the document is ready.
function initializeFilterInterface() {
  const menuContent = document.getElementById('menuContent')
  menuContent.innerHTML = '' // Clear existing content

  // Various form inputs setup omitted for brevity, see your original code

  const form = document.createElement('form')
  form.id = 'dataFilterForm'

  const wrap1 = document.createElement('div')
  form.appendChild(wrap1)
  const tag1 = document.createElement('h4')
  wrap1.appendChild(tag1)
  tag1.innerText = 'Start Date'
  wrap1.appendChild(createInputField('startDate', 'date', 'Start Date'))

  const wrap2 = document.createElement('div')
  form.appendChild(wrap2)
  const tag2 = document.createElement('h4')
  wrap2.appendChild(tag2)
  tag2.innerText = 'End Date'
  wrap2.appendChild(createInputField('endDate', 'date', 'End Date'))

  // Add other fields as in your original code

  const submitButton = document.createElement('button')
  submitButton.type = 'submit'
  submitButton.textContent = 'Apply Filters'
  form.appendChild(submitButton)

  menuContent.appendChild(form)

  form.addEventListener('submit', handleFilterSubmit)
}

function createInputField(id, type, placeholder) {
  const input = document.createElement('input')
  input.type = type
  input.id = id
  input.name = id
  input.placeholder = placeholder

  console.log('Created input field:', input) // Debugging: log the created input field

  return input
}

async function handleFilterSubmit(event) {
  event.preventDefault()
  console.log('submit function fired')
  const form = document.getElementById('dataFilterForm')
  const formData = new FormData(form)
  console.log(formData)

  const params = new URLSearchParams()
  for (const [key, value] of formData.entries()) {
    console.log(key, value)
    if (value) params.append(key, value)
  }
  datCall(params)
  //loadPage(params) // Call loadPage with the search parameters
}

// Ensure to call this function when the SPA is initialized or when the route changes.
//document.addEventListener('DOMContentLoaded', function () {
//initializeFilterInterface()
// Optionally call loadPage() here if you want to load default content
//})

function tableSpawn() {
  const specifiedFields = [
    'master_incident_id',
    'agency_type',
    'battalion',
    'creation',
    'jurisdiction',
    'location',
    'type_description',
  ]
  const container = document.getElementById('contentBody')
  container.innerHTML = ''
  const table = document.createElement('table')
  const thead = document.createElement('thead')
  const tbody = document.createElement('tbody')
  table.appendChild(thead)
  table.appendChild(tbody)
  container.appendChild(table)

  // Creating custom header row
  const headerRow = document.createElement('tr')
  specifiedFields.forEach((field) => {
    const th = document.createElement('th')
    th.textContent = field
      .replace(/_/g, ' ')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    headerRow.appendChild(th)
  })
  thead.appendChild(headerRow)

  // Filling data rows
  incidentData.forEach((item) => {
    const row = document.createElement('tr')
    specifiedFields.forEach((field) => {
      const td = document.createElement('td')
      td.textContent = item[field]
      row.appendChild(td)
    })
    tbody.appendChild(row)
  })
}
