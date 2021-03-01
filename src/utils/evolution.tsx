import { possibleStates } from './constants';

interface NeigbhorDetails {
  happyCount: number
  sadCount: number
  deadCount: number
}

const computeEvolution: (prevState: number[][]) => number[][] = (prevState) => {
  let newState: number[][] = [];

  // Auxiliary function to update the NeighborDetails counts for a particular cell
  const updateNeighborDetails: (details: NeigbhorDetails, cellState: number) => NeigbhorDetails = (details, cellState) => {
    let newNeighborDetails: NeigbhorDetails = details;

    switch(cellState) {
      case 0:
        newNeighborDetails.deadCount++;
        break;
      case 1:
        newNeighborDetails.sadCount++;
        break;
      case 2:
        newNeighborDetails.happyCount++;
        break;
    }

    return newNeighborDetails;
  }

  // Gathers counts per cell type for a particular cell's neighbors
  const computeNeighborDetails: (row: number, col: number) => NeigbhorDetails = (row, col) => {
    let neighborDetails: NeigbhorDetails = {
      deadCount: 0,
      sadCount: 0,
      happyCount: 0
    }

    for (let i = row - 1; i <= row + 1; i++) {
      for(let j = col -1; j <= col + 1; j++) {
        // Invalid location in grid
        if (i < 0 || j < 0 || i >= prevState.length || j >= prevState[0].length) continue;

        // Current location
        if (i === row && j === col) continue;

        neighborDetails = updateNeighborDetails(neighborDetails, prevState[i][j]);
      }
    }

    return neighborDetails
  } 

  // One cell => dead forever afterwards
  if (prevState.length === 1 && prevState[0].length === 1 ) {
    newState[0] = [0]
    return newState
  }

  // Empty data
  if (prevState.length === 0) return newState;

  // Cell next state computation rules
  for(let i = 0; i < prevState.length; i++) {
    // Initialize row state array
    newState[i] = [];
    for(let j = 0; j < prevState[0].length; j++) {
      const neighborDetails = computeNeighborDetails(i, j);
      const cellState = possibleStates[prevState[i][j]];
      let sadAndHappyCount: number = 0

      switch(cellState) {
        case 'happy':
        case 'sad':
          sadAndHappyCount = neighborDetails.happyCount + neighborDetails.sadCount;
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

export default computeEvolution