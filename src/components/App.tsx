import React, { MouseEvent } from 'react';
import '../styles/App.css';
import Grid from './Grid';
import Button from './Button';
import computeEvolution from '../utils/evolution'
import fetchSeedData from '../api/api'
import * as seed from '../api/sample_data.json';

type AppState = {
  automatonState: number[][]
  paused: boolean
  interval: number
}

const initialState: AppState = { 
  automatonState: [],
  paused: true,
  interval: 0
}

// Computes the next stage of evolution given a current state
const nextEvolution = (prevState: AppState) => ({automatonState: computeEvolution(prevState.automatonState)})

// Sets/Clears interval given current animation state
const toggleAnimation = (prevState: AppState, intervalFn: () => void) => {
  let interval: number = 0;

  // This interval clearing should not affect a 0 interval
  // Function should be idempotent
  window.clearInterval(prevState.interval)

  if(prevState.paused) {
    interval = window.setInterval(intervalFn, 1000)
  }

  return {
    interval: interval,
    paused: !prevState.paused
  }
}

class App extends React.Component<{}, AppState> {
  readonly state: AppState = initialState

  componentDidMount() {
    fetchSeedData()
      .then(data => this.setState({automatonState: data}))
      .catch(e => {
        console.error(e)
        // Default
        this.setState({automatonState: seed.data.state})
      })
  }

  private tick: () => void = () => {
    this.setState(nextEvolution)
  }
  
  private toggleAnimation: (e: MouseEvent<HTMLElement>) => void = () => {
    this.setState(toggleAnimation(this.state, this.tick));
  }

  render() {
    return (
      <div className="app">
        <div className="app-display">
          <Grid automatonState={this.state.automatonState}/>
          <Button 
            onClick={this.toggleAnimation} 
            active={!this.state.paused}
            activeLabel='Pause'
            nonActiveLabel='Start'
          />
        </div>
      </div>
    );
  }
}

export default App;