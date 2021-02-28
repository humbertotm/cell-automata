import React, { MouseEvent } from 'react';
import '../styles/App.css';
import Grid from './Grid';
import Button from './Button';
import computeEvolution from '../evolution'
import fetchSeedData from '../api/api'
import * as seed from '../sample_data.json';

import {StateData, AppState} from '../types';

const initialState: AppState = { 
  automatonState: [],
  paused: true,
  interval: 0
}

// type AppState = Readonly<typeof initialState>

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

  tick: () => void = () => {
    const newState: StateData = computeEvolution(this.state.automatonState);
    this.setState({automatonState: newState});
  }
  
  toggleAnimation: (e: MouseEvent<HTMLElement>) => void = () => {
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