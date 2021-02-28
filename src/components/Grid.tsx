import React from 'react';
import { StateData } from '../types';
import { possibleStates } from '../constants';

type GridProps = {
  automataState: StateData
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
  <div className={`cell ${possibleStates[cellState]} pos-${row}-${col}`}></div>

const Row: React.FunctionComponent<RowProps> = ({rowState, row}) => 
  <div className="row">
    {rowState.map((cellState, col) => (
      <Cell key={`cell-${row.toString()}-${col.toString()}`} cellState={cellState} row={row} col={col} />
    ))}
  </div>

const Grid: React.FunctionComponent<GridProps> = ({automataState}) =>
  <div className="grid">
    {automataState.map((rowState, row) => (
      <Row key={row.toString()} rowState={rowState} row={row} />
    ))}
  </div>;

  export default Grid;