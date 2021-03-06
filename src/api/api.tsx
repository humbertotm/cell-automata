// Promise handling pattern with Typescript based on this blog post:
// https://kentcdodds.com/blog/using-fetch-with-type-script
async function fetchSeedData(): Promise<number[][]> {
  type APIResponseData = {
    id: string
    m: number
    n: number
    state: number[][]
  }

  type JSONResponse = {
    stateData?: {
      data: APIResponseData
    }
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
    const errMessage = new Error(errors?.map(err => err.message).join('\n') ?? 'Unknown error')
    return Promise.reject(errMessage)
  }
}

export default fetchSeedData