import { globalState } from '../reactive/state.js'

export async function fetchMainData() {
  try {
    console.log('mainData Launched')
    const response = await fetch(
      `https://matrix.911-ens-services.com/data/${userData.key}`,
    )
    const data = await response.json()
    globalState.setState({ mainData: data })
  } catch (error) {
    console.error('Error fetching main data:', error)
  }
}
