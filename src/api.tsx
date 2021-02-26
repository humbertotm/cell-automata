import * as seed from './sample_data.json';

const fetchSeedData: () => number[][] = () => {
  // let data: number[][] = [];
  // function fetchData() {
  //   fetch('https://coding-project.imtlab.io/seed')
  //   .then(response => {
  //     if(response.ok) {
  //       return response.json();
  //     } else {
  //       Promise.reject("Non ok status received")
  //     }
  //   })
  //   .then(data => {
  //     const state = data.state
  //     if (!state) return Promise.reject(new Error("No state data in response"));
      
  //     data = state;
  //   })
  //   .catch(error => {
  //     console.log("error in promise")
  //     return seed.data.state
  //   }).then(defaultData => {
  //     console.log(defaultData)
  //     if(defaultData) {
  //       data = defaultData;
  //     }
  //   })
  // }

  // async function resolveData() {
  //   const data = await fetchData();
  //   return data
  // }

  // data = resolveData()
  // console.log(data);
  return seed.data.state;
}

export default fetchSeedData