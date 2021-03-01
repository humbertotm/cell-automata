import React, { MouseEvent } from 'react';
import '../styles/App.css';
import Grid from './Grid';
import Button from './Button';
import computeEvolution from '../evolution'
import fetchSeedData from '../api/api'
import * as seed from '../api/sample_data.json';

export interface AppState {
  automatonState: number[][]
  paused: boolean
  interval: number
}

const initialState: AppState = { 
  automatonState: [],
  paused: true,
  interval: 0
}

const nextEvolution = (prevState: AppState) => ({automatonState: computeEvolution(prevState.automatonState)})

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
        <header className="app-display">
          <Grid automatonState={this.state.automatonState}/>
          <Button 
            onClick={this.toggleAnimation} 
            active={!this.state.paused}
            activeLabel='Pause'
            nonActiveLabel='Start'
          />
        </header>
      </div>
    );
  }
}

export default App;