import React, { MouseEvent } from 'react'
import '../styles/Button.css'

type ButtonProps = {
  onClick: (e: MouseEvent<HTMLElement>) => void
  active: boolean
  activeLabel: string
  nonActiveLabel: string
}

const Button: React.FunctionComponent<ButtonProps> = 
  ({onClick, active, activeLabel, nonActiveLabel}) =>
  <div className={`onoff-button button-${active ? 'active' : 'inactive'}`}>
    <button onClick={onClick}>{active ? activeLabel : nonActiveLabel}</button>    
  </div> 

export default Button