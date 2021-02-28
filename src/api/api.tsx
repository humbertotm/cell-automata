import { StateData } from '../types';

// Sourced from https://kentcdodds.com/blog/using-fetch-with-type-script
async function fetchSeedData(): Promise<StateData> {
  type APIResponseData = {
    id: string
    m: number
    n: number
    state: StateData
  }

  type JSONResponse = {
    stateData?: {
      data: APIResponseData
    }
    // Copied
    errors?: Array<{message: string}>
  }

  const response = await fetch('https://coding-project.imtlab.io/seed')

  const {stateData, errors}: JSONResponse = await response.json()

  if(response.ok) {
    const initialState = stateData?.data?.state

    if(initialState) { 
      return initialState
    } else {
      return Promise.reject(new Error('No initial state data found for cell automaton'))
    }
  } else {
    console.log('error')
    const errMessage = new Error(errors?.map(err => err.message).join('\n') ?? 'Unknown error')
    return Promise.reject(errMessage)
  }
}

export default fetchSeedData