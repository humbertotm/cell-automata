import React from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from './Grid';

import * as seed from './sample_data.json';

interface AppState {
  automataState: number[][]
  paused: boolean
  interval: number
}

interface NeigbhorDetails {
  happyCount: number
  sadCount: number
  deadCount: number
}

type ButtonProps = {
  onClick: () => void
  paused: boolean
}

export const possibleStates: Array<string> = ['dead', 'sad', 'happy'];

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

const computeEvolution: (prevState: number[][]) => number[][] = (prevState) => {
  let newState: number[][] = [];

  const isEdgeOrCorner: (row: number, col: number) => boolean = (row, col) => {
    if (row === 0 || col === 0) return true;

    if (row === prevState.length - 1 || col === prevState[0].length - 1) return true;

    return false;
  }

  const computeNeighborDetails: (row: number, col: number) => NeigbhorDetails = (row, col) => {
    let deadCount: number = 0;
    let sadCount: number = 0;
    let happyCount: number = 0;

    if(!isEdgeOrCorner(row, col)) {
      for (let i = row - 1; i <= row + 1; i++) {
        for(let j = col - 1; j <= col + 1; j++) {
          if (i === row && j === col) {
            continue
          }

          switch(prevState[i][j]) {
            case 0:
              deadCount++;
              break;
            case 1:
              sadCount++;
              break;
            case 2:
              happyCount++;
              break;
          }
        }
      }

      return {deadCount: deadCount, sadCount: sadCount, happyCount: happyCount};
    }

    // Top left corner
    if(row === 0 && col === 0) {
      for(let i = row; i <= row + 1; i++) {
        for(let j: number = col; j <= col + 1; j++) {
          if (i === row && j === col) {
            continue
          }

          switch(prevState[i][j]) {
            case 0:
              deadCount++;
              break;
            case 1:
              sadCount++;
              break;
            case 2:
              happyCount++;
              break;
          }
        }
      }

      return {deadCount: deadCount, sadCount: sadCount, happyCount: happyCount};
    }

    // Bottom left corner
    if(row === prevState.length - 1 && col === 0) {
      for(let i = row - 1; i <= row; i++) {
        for(let j: number = col; j <= col + 1; j++) {
          if (i === row && j === col) {
            continue
          }

          switch(prevState[i][j]) {
            case 0:
              deadCount++;
              break;
            case 1:
              sadCount++;
              break;
            case 2:
              happyCount++;
              break;
          }
        }
      }

      return {deadCount: deadCount, sadCount: sadCount, happyCount: happyCount};
    }

    // Left edge
    if(col === 0) {
      for(let i = row - 1; i <= row + 1; i++) {
        for(let j: number = col; j <= col + 1; j++) {
          if (i === row && j === col) {
            continue
          }

          switch(prevState[i][j]) {
            case 0:
              deadCount++;
              break;
            case 1:
              sadCount++;
              break;
            case 2:
              happyCount++;
              break;
          }
        }
      }

      return {deadCount: deadCount, sadCount: sadCount, happyCount: happyCount};
    }

    // Bottom right corner
    if(row === prevState.length - 1 && col === prevState[0].length - 1) {
      for(let i = row - 1; i <= row; i++) {
        for(let j = col; j <= col + 1; j++) {
          if (i === row && j === col) {
            continue
          }

          switch(prevState[i][j]) {
            case 0:
              deadCount++;
              break;
            case 1:
              sadCount++;
              break;
            case 2:
              happyCount++;
              break;
          }
        }
      }

      return {deadCount: deadCount, sadCount: sadCount, happyCount: happyCount};
    }

    // Bottom edge
    if(row === prevState.length - 1) {
      for(let i = row - 1; i <= row; i++) {
        for(let j = col - 1; j <= col + 1; j++) {
          if (i === row && j === col) {
            continue
          }

          switch(prevState[i][j]) {
            case 0:
              deadCount++;
              break;
            case 1:
              sadCount++;
              break;
            case 2:
              happyCount++;
              break;
          }
        }
      }

      return {deadCount: deadCount, sadCount: sadCount, happyCount: happyCount};
    }

    // Top right corner
    if(row === 0 && col === prevState[0].length - 1) {
      for(let i = row; i <= row + 1; i++) {
        for(let j = col - 1; j <= col; j++) {
          if (i === row && j === col) {
            continue
          }

          switch(prevState[i][j]) {
            case 0:
              deadCount++;
              break;
            case 1:
              sadCount++;
              break;
            case 2:
              happyCount++;
              break;
          }
        }
      }

      return {deadCount: deadCount, sadCount: sadCount, happyCount: happyCount};
    }

    // Right edge
    if(col === prevState[0].length - 1) {
      for(let i = row - 1; i <= row + 1; i++) {
        for(let j = col - 1; j <= col; j++) {
          if (i === row && j === col) {
            continue
          }

          switch(prevState[i][j]) {
            case 0:
              deadCount++;
              break;
            case 1:
              sadCount++;
              break;
            case 2:
              happyCount++;
              break;
          }
        }
      }

      return {deadCount: deadCount, sadCount: sadCount, happyCount: happyCount};
    }

    // Top edge
    if(row === 0) {
      for(let i = row; i <= row + 1; i++) {
        for(let j = col - 1; j <= col + 1; j++) {
          if (i === row && j === col) {
            continue
          }

          switch(prevState[i][j]) {
            case 0:
              deadCount++;
              break;
            case 1:
              sadCount++;
              break;
            case 2:
              happyCount++;
              break;
          }
        }
      }

      return {deadCount: deadCount, sadCount: sadCount, happyCount: happyCount};
    }

    return {deadCount: deadCount, sadCount: sadCount, happyCount: happyCount}
  } 

  // One cell => dead
  if (prevState.length === 1 && prevState[0].length === 1 ) {
    newState[0][0] = 0
    return newState
  }

  // [wololo] What about empty data?

  for(let i = 0; i < prevState.length; i++) {
    newState[i] = [];
    for(let j = 0; j < prevState[0].length; j++) {
      let neighborDetails = computeNeighborDetails(i, j);
      let cellState = possibleStates[prevState[i][j]];

      switch(cellState) {
        case 'happy':
        case 'sad':
          let sadAndHappyCount = neighborDetails.happyCount + neighborDetails.sadCount;
          if(sadAndHappyCount === 2 || sadAndHappyCount === 3) {
            newState[i][j] = prevState[i][j];
            break;
          }

          newState[i][j] = 0;
          break;
        case 'dead':
          if(neighborDetails.sadCount === 3) {
            newState[i][j] = 1;
            break;
          }
  
          if(neighborDetails.sadCount === 2 && neighborDetails.happyCount === 1) {
            newState[i][j] = 1;
            break;
          }
  
          if(neighborDetails.sadCount === 1 && neighborDetails.happyCount === 2) {
            newState[i][j] = 2;
            break;
          }
  
          if(neighborDetails.happyCount === 3) {
            newState[i][j] = 2;
            break;
          }

          newState[i][j] = 0;
      }
    }
  }

  return newState;
}

const Button: React.FunctionComponent<ButtonProps> = ({onClick, paused}) =>
  <div>
    <button onClick={onClick}>{paused ? 'Start' : 'Pause'}</button>    
  </div> 

class App extends React.Component<{}, AppState> {
  // [wololo] Can/Should I do this with hooks and convert this into a
  // FunctionalComponent?
  state: AppState = { 
    automataState: fetchSeedData(),
    paused: true,
    interval: 0
  };

  tick: () => void = () => {
    const newState: number[][] = computeEvolution(this.state.automataState);
    this.setState({automataState: newState});
  }
  
  toggleAnimation: () => void = () => {
    if(this.state.paused) {
      this.setState({interval: window.setInterval(this.tick, 1000)});
    } else {
      window.clearInterval(this.state.interval);
    }

    this.setState({paused: !this.state.paused});
  }

  render() {
    return (
      <div className="App">
        <header className="App-display">
          <Grid automataState={this.state.automataState}/>
          <Button onClick={this.toggleAnimation} paused={this.state.paused} />
        </header>
      </div>
    );
  }
}


export default App;