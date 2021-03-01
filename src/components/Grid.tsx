import React from 'react';
import { possibleStates } from '../utils/constants';

type GridProps = {
  automatonState: number[][]
}

type RowProps = {
  row: number
  rowState: Array<number>
}

type CellProps = {
  row: number
  col: number
  cellState: number
}

const Cell: React.FunctionComponent<CellProps> = ({cellState, row, col}) => 
  <div className={`cell ${possibleStates[cellState]}`}></div>

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

const Grid: React.FunctionComponent<GridProps> = ({automatonState}) =>
  <div className="grid">
    {automatonState.map((rowState, row) => (
      <Row 
        key={`row-${row.toString()}`} 
        rowState={rowState} 
        row={row} 
      />
    ))}
  </div>;

export default Grid;