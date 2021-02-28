import React from 'react';

type ButtonProps = {
  onClick: () => void
  paused: boolean
}

const Button: React.FunctionComponent<ButtonProps> = ({onClick, paused}) =>
  <div>
    <button onClick={onClick}>{paused ? 'Start' : 'Pause'}</button>    
  </div> 

export default Button