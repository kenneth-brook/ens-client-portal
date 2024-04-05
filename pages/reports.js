import { globalState } from '../reactive/state.js'

let incidentData = []
const getKey = localStorage.getItem('user')
const decriptClientKey = JSON.parse(getKey)
const clientKey = decriptClientKey.key
const homeContent = document.createElement('div')
let lastSubmittedFormData = new URLSearchParams()

// This function now strictly deals with loading and displaying content.
export function loadPage() {
  const setStage = document.getElementById('contentBody')
  setStage.innerHTML = '' // Clear previous content

  homeContent.innerText = 'Loading content...'
  setStage.appendChild(homeContent)

  datCall()
}

let data

async function datCall(searchParams = new URLSearchParams(), page = 1) {
  try {
    // Add the 'page' parameter to the existing search parameters
    searchParams.set('page', page)
    const url = `https://client-control.911-ens-services.com/fullPull/${clientKey}?${searchParams}`
    const response = await fetch(url)
    data = await response.json()
    incidentData = data.data

    if (response.ok) {
      console.log(data) // For debugging purposes
      homeContent.innerText = 'Page content loaded with applied filters.'
      initializeFilterInterface()
      tableSpawn()
      createPagination(data) // Assuming 'createPagination' also sets up event listeners for page changes
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

  const agencyTypeWrap = document.createElement('div')
  form.appendChild(agencyTypeWrap)
  const agencyTypeTag = document.createElement('h4')
  agencyTypeTag.innerText = 'Agency Type'
  agencyTypeWrap.appendChild(agencyTypeTag)

  const agencyOptions = [
    { label: 'Select Agency Type', value: '' }, // Optional: default "empty" selection
    { label: 'Law', value: 'Law' },
    { label: 'Fire', value: 'Fire' },
    { label: 'EMS', value: 'EMS' },
  ]
  agencyTypeWrap.appendChild(createDropdown('agencyType', agencyOptions))

  const jurisdictionWrap = document.createElement('div')
  form.appendChild(jurisdictionWrap)
  const jurisdictionTag = document.createElement('h4')
  jurisdictionTag.innerText = 'Jurisdiction'
  jurisdictionWrap.appendChild(jurisdictionTag)

  // Assuming globalState.jurisdictions is an array of jurisdiction names
  const jurisdictionOptions = data.filters.jurisdictions
    .filter((jurisdiction) => jurisdiction && jurisdiction.trim() !== '') // Filter out empty or undefined values
    .map((jurisdiction) => ({ label: jurisdiction, value: jurisdiction }))

  jurisdictionWrap.appendChild(
    createDropdown('jurisdiction', [
      { label: 'Select Jurisdiction', value: '' },
      ...jurisdictionOptions,
    ]),
  )

  const battalionWrap = document.createElement('div')
  form.appendChild(battalionWrap)
  const battalionTag = document.createElement('h4')
  battalionTag.innerText = 'Battalion'
  battalionWrap.appendChild(battalionTag)

  // Assuming globalState.battalions is an array of battalion names
  const battalionOptions = data.filters.battalions
    .filter((battalion) => battalion && battalion.trim() !== '') // Filter out empty or undefined values
    .map((battalion) => ({ label: battalion, value: battalion }))

  battalionWrap.appendChild(
    createDropdown('battalion', [
      { label: 'Select battalion', value: '' },
      ...battalionOptions,
    ]),
  )

  const typesWrap = document.createElement('div')
  form.appendChild(typesWrap)
  const typesTag = document.createElement('h4')
  typesTag.innerText = 'Types'
  typesWrap.appendChild(typesTag)

  // Assuming globalState.typess is an array of types names
  const typesOptions = data.filters.types
    .filter((types) => types && types.trim() !== '') // Filter out empty or undefined values
    .map((types) => ({ label: types, value: types }))

  typesWrap.appendChild(
    createDropdown('type', [
      { label: 'Select Type', value: '' },
      ...typesOptions,
    ]),
  )

  const typeDescriptionWrap = document.createElement('div')
  form.appendChild(typeDescriptionWrap)
  const typeDescriptionTag = document.createElement('h4')
  typeDescriptionTag.innerText = 'Type Description'
  typeDescriptionWrap.appendChild(typeDescriptionTag)

  // Assuming globalState.typeDescriptions is an array of typeDescription names
  const typeDescriptionOptions = data.filters.typeDescriptions
    .filter(
      (typeDescriptions) => typeDescriptions && typeDescriptions.trim() !== '',
    ) // Filter out empty or undefined values
    .map((typeDescriptions) => ({
      label: typeDescriptions,
      value: typeDescriptions,
    }))

  typeDescriptionWrap.appendChild(
    createDropdown('typeDescription', [
      { label: 'Select Type Description', value: '' },
      ...typeDescriptionOptions,
    ]),
  )

  // Add other fields as in your original code

  const idWrap = document.createElement('div')
  form.appendChild(idWrap)
  const idTag = document.createElement('h4')
  idTag.innerText = 'Master Incident Id'
  idWrap.appendChild(idTag)
  idWrap.appendChild(createInputField('masterIncidentId', 'text', 'Enter ID'))

  const locationWrap = document.createElement('div')
  form.appendChild(locationWrap)
  const locationTag = document.createElement('h4')
  locationTag.innerText = 'Location'
  locationWrap.appendChild(locationTag)
  locationWrap.appendChild(
    createInputField('location', 'text', 'Enter Location'),
  )

  const submitButton = document.createElement('button')
  submitButton.type = 'submit'
  submitButton.textContent = 'Apply Filters'
  submitButton.className = 'subButt'
  form.appendChild(submitButton)

  const resetButton = document.createElement('button')
  resetButton.type = 'button' // Important: make it 'button' to prevent form submission
  resetButton.textContent = 'Reset Report'
  resetButton.className = 'resButt'
  resetButton.addEventListener('click', function () {
    // Reload the page
    window.location.reload()
  })

  // Add the Reset Report button to the form
  form.appendChild(resetButton)

  menuContent.appendChild(form)

  form.addEventListener('submit', handleFilterSubmit)
}

function createDropdown(id, options) {
  const select = document.createElement('select')
  select.id = id
  select.name = id

  options.forEach((option) => {
    const optionElement = document.createElement('option')
    optionElement.value = option.value
    optionElement.textContent = option.label
    select.appendChild(optionElement)
  })

  console.log('Created dropdown:', select) // Debugging: log the created dropdown

  return select
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
  const form = document.getElementById('dataFilterForm')
  const formData = new FormData(form)

  for (const [key, value] of formData.entries()) {
    if (value.trim() !== '') {
      // Update or add new value
      lastSubmittedFormData.set(key, value)
    } //else {
    // Remove filter if the new value is empty
    //lastSubmittedFormData.delete(key)
    //}
  }

  console.log('submmit', lastSubmittedFormData)
  datCall(lastSubmittedFormData)
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

  // Function to format date
  function formatDate(dateString) {
    // Parse the input date string to a Date object
    const date = new Date(dateString)

    // Check if the hour is 24 and adjust the date and time accordingly
    if (date.getHours() === 24) {
      date.setHours(0) // Set the hour to 00
      date.setDate(date.getDate() + 1) // Move the date forward by one day
    }

    // Define the options for formatting the date
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'UTC',
    }

    // Format the adjusted date
    return new Intl.DateTimeFormat('default', options).format(date)
  }

  // Filling data rows
  incidentData.forEach((item) => {
    const row = document.createElement('tr')
    specifiedFields.forEach((field) => {
      const td = document.createElement('td')
      // Use formatDate for the 'creation' field
      if (field === 'creation') {
        td.textContent = formatDate(item[field])
      } else {
        td.textContent = item[field]
      }
      row.appendChild(td)
    })
    tbody.appendChild(row)
  })
}

function createPagination(data) {
  const container = document.getElementById('contentBody')

  // Create pagination container
  const pagination = document.createElement('div')
  pagination.className = 'pagination'

  // Create Previous Button
  const prev = document.createElement('a')
  prev.href = '#'
  prev.innerHTML = '&#10094; Prev'
  prev.className = 'pagination-prev'
  prev.addEventListener('click', (e) => {
    e.preventDefault()
    // Call your function to go to the previous page
    goToPage(data.page - 1)
  })
  pagination.appendChild(prev)

  // Check if Previous button should be disabled
  if (data.page === 1) {
    prev.classList.add('disabled')
  }

  // Create page numbers (simplified for brevity, see notes below for improvements)
  const span = document.createElement('span')
  span.textContent = `Page ${data.page} of ${data.totalPages}`
  pagination.appendChild(span)

  // Create Next Button
  const next = document.createElement('a')
  next.href = '#'
  next.innerHTML = 'Next &#10095;'
  next.className = 'pagination-next'
  next.addEventListener('click', (e) => {
    e.preventDefault()
    // Call your function to go to the next page
    goToPage(parseInt(data.page, 10) + 1)
  })
  pagination.appendChild(next)

  // Check if Next button should be disabled
  if (data.page === data.totalPages) {
    next.classList.add('disabled')
  }

  // Insert pagination at the beginning of the container
  if (container.firstChild) {
    container.insertBefore(pagination, container.firstChild)
  } else {
    container.appendChild(pagination)
  }
}

function goToPage(pageNumber) {
  console.log('Go to page:', pageNumber)
  datCall(lastSubmittedFormData, pageNumber)
}
