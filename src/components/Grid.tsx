import React from 'react'
import { possibleStates } from '../utils/constants'
import '../styles/Grid.css'

type GridProps = {
  /** State for the automaton represented by the grid */
  automatonState: number[][]
}

type RowProps = {
  /** Row number */
  row: number
  /** State corresponding to the cells in row */
  rowState: Array<number>
}

type CellProps = {
  /** Row to which the cell belongs */
  row: number
  /** Column to which the cell belongs */
  col: number
  /** State of the cell */
  cellState: number
}

/**
 * Functional Component representing a single cell in the automaton
 */
const Cell: React.FunctionComponent<CellProps> = ({cellState, row, col}) => 
  <div className={`cell ${possibleStates[cellState]}`}></div>

/**
 * Functional Component representing a single row in the grid for the cell automaton
 */
const Row: React.FunctionComponent<RowProps> = ({rowState, row}) => 
  <div className="row">
    {rowState.map((cellState, col) => (
      <Cell 
        key={`cell-${row.toString()}-${col.toString()}`} 
        cellState={cellState} 
        row={row} 
        col={col} 
      />
    ))}
  </div>

/** 
 * Functional Component receiving the automaton state as a prop.
 * Renders a grid representing such state.
*/
const Grid: React.FunctionComponent<GridProps> = ({automatonState}) =>
  <div className="grid">
    {automatonState.map((rowState, row) => (
      <Row 
        key={`row-${row.toString()}`} 
        rowState={rowState} 
        row={row} 
      />
    ))}
  </div>

export default Grid