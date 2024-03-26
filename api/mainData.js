import { globalState } from '../reactive/state.js'

export async function fetchMainData() {
  const response = await fetch(
    `https://matrix.911-ens-services.com/data/${userData.key}`,
  )
  if (!response.ok) {
    throw new Error('Failed to fetch main data')
  }
  const data = await response.json()
  globalState.setState({ mainData: data })
  return data
}
