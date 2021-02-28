export type StateData = number[][]

export interface AppState {
  automatonState: StateData
  paused: boolean
  interval: number
}
