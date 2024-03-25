import { globalState } from '../reactive/state.js'

export async function fetchClientData() {
  console.log('clientData Launched')
  const response = await fetch(
    `https://client-control.911-ens-services.com/boot-strap-client/${userData.key}`,
  )
  if (!response.ok) {
    throw new Error('Failed to fetch main data')
  }
  const data = await response.json() // Make sure to parse the JSON body
  console.log('client data: ' + data)
  globalState.setState({ mainData: data })
  return data
}
