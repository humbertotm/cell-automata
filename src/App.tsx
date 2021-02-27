import React from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from './Grid';
import Button from './Button';
import computeEvolution from './utils'
import fetchSeedData from './api'

import * as seed from './sample_data.json';

interface AppState {
  automataState: number[][]
  paused: boolean
  interval: number
}

export const possibleStates: Array<string> = ['dead', 'sad', 'happy'];

class App extends React.Component<{}, AppState> {
  state: AppState = { 
    automataState: [],
    paused: true,
    interval: 0
  };

  componentDidMount() {
    this.setState({automataState: fetchSeedData()});
  }

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
      <div className="app">
        <header className="app-display">
          <Grid automataState={this.state.automataState}/>
          <Button onClick={this.toggleAnimation} paused={this.state.paused} />
        </header>
      </div>
    );
  }
}


export default App;