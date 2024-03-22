import { globalState } from '../reactive/state.js'

export async function fetchClientData() {
  try {
    const response = await fetch('URL_TO_YOUR_LAMBDA_FUNCTION_FOR_CLIENT_DATA')
    const data = await response.json()
    globalState.setState({ clientData: data })
  } catch (error) {
    console.error('Error fetching client data:', error)
  }
}
