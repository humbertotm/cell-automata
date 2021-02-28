import React, { MouseEvent } from 'react';

type ButtonProps = {
  onClick: (e: MouseEvent<HTMLElement>) => void
  active: boolean
  activeLabel: string
  nonActiveLabel: string
}

const Button: React.FunctionComponent<ButtonProps> = 
  ({onClick, active, activeLabel, nonActiveLabel}) =>
  <div className="on-off-button">
    <button onClick={onClick}>{active ? activeLabel : nonActiveLabel}</button>    
  </div> 

export default Button