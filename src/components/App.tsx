import React from 'react';
import '../styles/App.css';
import Grid from './Grid';
import Button from './Button';
import computeEvolution from '../evolution'
import fetchSeedData from '../api/api'
import * as seed from '../sample_data.json';

import {StateData, AppState} from '../types';
import { possibleStates } from '../constants';

class App extends React.Component<{}, AppState> {
  state: AppState = { 
    automataState: [],
    paused: true,
    interval: 0
  };

  componentDidMount() {
    fetchSeedData()
      .then(data => this.setState({automataState: data}))
      .catch(e => {
        console.error(e)
        this.setState({automataState: seed.data.state})
      })
    
  }

  tick: () => void = () => {
    const newState: StateData = computeEvolution(this.state.automataState);
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