export type StateData = number[][]

export interface AppState {
  automataState: StateData
  paused: boolean
  interval: number
}
