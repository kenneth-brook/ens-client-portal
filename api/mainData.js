import { globalState } from '../reactive/state.js'

export async function fetchMainData() {
  try {
    const response = await fetch('URL_TO_YOUR_LAMBDA_FUNCTION_FOR_MAIN_DATA')
    const data = await response.json()
    globalState.setState({ mainData: data })
  } catch (error) {
    console.error('Error fetching main data:', error)
  }
}
