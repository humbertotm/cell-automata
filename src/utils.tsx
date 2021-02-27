import { possibleStates } from './App';

interface NeigbhorDetails {
  happyCount: number
  sadCount: number
  deadCount: number
}

const computeEvolution: (prevState: number[][]) => number[][] = (prevState) => {
  let newState: number[][] = [];

  const isEdgeOrCorner: (row: number, col: number) => boolean = (row, col) => {
    if (row === 0 || col === 0) return true;

    if (row === prevState.length - 1 || col === prevState[0].length - 1) return true;

    return false;
  }

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

  const computeNeighborDetails: (row: number, col: number) => NeigbhorDetails = (row, col) => {
    let neighborDetails: NeigbhorDetails = {
      deadCount: 0,
      sadCount: 0,
      happyCount: 0
    }

    if(!isEdgeOrCorner(row, col)) {
      for (let i = row - 1; i <= row + 1; i++) {
        for(let j = col - 1; j <= col + 1; j++) {
          if (i === row && j === col) {
            continue
          }

          neighborDetails = updateNeighborDetails(neighborDetails, prevState[i][j]);
        }
      }

      return neighborDetails
    }

    // Top left corner
    if(row === 0 && col === 0) {
      for(let i = row; i <= row + 1; i++) {
        for(let j: number = col; j <= col + 1; j++) {
          if (i === row && j === col) {
            continue
          }

          neighborDetails = updateNeighborDetails(neighborDetails, prevState[i][j]);
        }
      }

      return neighborDetails
    }

    // Bottom left corner
    if(row === prevState.length - 1 && col === 0) {
      for(let i = row - 1; i <= row; i++) {
        for(let j: number = col; j <= col + 1; j++) {
          if (i === row && j === col) {
            continue
          }

          neighborDetails = updateNeighborDetails(neighborDetails, prevState[i][j]);
        }
      }

      return neighborDetails
    }

    // Left edge
    if(col === 0) {
      for(let i = row - 1; i <= row + 1; i++) {
        for(let j: number = col; j <= col + 1; j++) {
          if (i === row && j === col) {
            continue
          }

          neighborDetails = updateNeighborDetails(neighborDetails, prevState[i][j]);
        }
      }
      
      return neighborDetails
      
    }

    // Bottom right corner
    if(row === prevState.length - 1 && col === prevState[0].length - 1) {
      for(let i = row - 1; i <= row; i++) {
        for(let j = col; j <= col + 1; j++) {
          if (i === row && j === col) {
            continue
          }

          neighborDetails = updateNeighborDetails(neighborDetails, prevState[i][j]);
        }
      }

      return neighborDetails
    }

    // Bottom edge
    if(row === prevState.length - 1) {
      for(let i = row - 1; i <= row; i++) {
        for(let j = col - 1; j <= col + 1; j++) {
          if (i === row && j === col) {
            continue
          }

          neighborDetails = updateNeighborDetails(neighborDetails, prevState[i][j]);
        }
      }

      return neighborDetails
    }

    // Top right corner
    if(row === 0 && col === prevState[0].length - 1) {
      for(let i = row; i <= row + 1; i++) {
        for(let j = col - 1; j <= col; j++) {
          if (i === row && j === col) {
            continue
          }

          neighborDetails = updateNeighborDetails(neighborDetails, prevState[i][j]);
        }
      }

      return neighborDetails
    }

    // Right edge
    if(col === prevState[0].length - 1) {
      for(let i = row - 1; i <= row + 1; i++) {
        for(let j = col - 1; j <= col; j++) {
          if (i === row && j === col) {
            continue
          }

          neighborDetails = updateNeighborDetails(neighborDetails, prevState[i][j]);
        }
      }

      return neighborDetails
    }

    // Top edge
    if(row === 0) {
      for(let i = row; i <= row + 1; i++) {
        for(let j = col - 1; j <= col + 1; j++) {
          if (i === row && j === col) {
            continue
          }

          neighborDetails = updateNeighborDetails(neighborDetails, prevState[i][j]);
        }
      }

      return neighborDetails
    }

    return neighborDetails
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

export default computeEvolution