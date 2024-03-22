import { globalState } from '../reactive/state.js'

export async function fetchClientData() {
  try {
    const response = await fetch(
      `https://client-control.911-ens-services.com/boot-strap-client/${userData.key}`,
    )
    const data = await response.json()
    globalState.setState({ clientData: data })
  } catch (error) {
    console.error('Error fetching client data:', error)
  }
}
