import { assert } from 'console';
import computeEvolution from '../utils/evolution';

test('empty next state for empty input', () => {
  const initialState: number[][] = []
  const expectedState: number[][] = []
  
  expect(computeEvolution(initialState)).toEqual(expectedState)
})

test('dead cell for 1 cell automaton', () => {
  const initialState: number[][] = [[2]]
  const expectedState: number[][] = [[0]]
  
  expect(computeEvolution(initialState)).toEqual(expectedState)
})

test('live cell dies', () => {
  const initialState: number[][] = [
    [1, 0, 1],
    [0, 2, 0],
    [1, 0, 1]
  ]
  const expectedState: number[][] = [
    [0, 1, 0],
    [1, 0, 1],
    [0, 1, 0]
  ]
  
  expect(computeEvolution(initialState)).toEqual(expectedState)  
})

test('dead cell for happy cell with no live neighbors', () => {
  const initialState: number[][] = [
    [0, 0, 0],
    [0, 2, 0],
    [0, 0, 0]
  ]
  const expectedState: number[][] = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]
  
  expect(computeEvolution(initialState)).toEqual(expectedState)
})

test('dead cell for sad cell with no live neighbors', () => {
  const initialState: number[][] = [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0]
  ]
  const expectedState: number[][] = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]
  
  expect(computeEvolution(initialState)).toEqual(expectedState)
})

test('happy cell for happy cell with 2 live neighbors', () => {
  const initialState: number[][] = [
    [0, 1, 0],
    [0, 2, 0],
    [0, 2, 0]
  ]
  const expectedState: number[][] = [
    [0, 0, 0],
    [2, 2, 2],
    [0, 0, 0]
  ]
  
  expect(computeEvolution(initialState)).toEqual(expectedState)
})

test('happy cell for happy cell with 3 live neighbors', () => {
  const initialState: number[][] = [
    [0, 1, 0],
    [0, 2, 1],
    [0, 2, 0]
  ]
  const expectedState: number[][] = [
    [0, 1, 1],
    [2, 2, 1],
    [0, 2, 2]
  ]
  
  expect(computeEvolution(initialState)).toEqual(expectedState)
})

test('sad cell for sad cell with 2 live neighbors', () => {
  const initialState: number[][] = [
    [0, 1, 0],
    [0, 1, 0],
    [0, 2, 0]
  ]
  const expectedState: number[][] = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0]
  ]
  
  expect(computeEvolution(initialState)).toEqual(expectedState)
})

test('sad cell for sad cell with 3 live neighbors', () => {
  const initialState: number[][] = [
    [0, 1, 0],
    [0, 1, 1],
    [0, 2, 0]
  ]
  const expectedState: number[][] = [
    [0, 1, 1],
    [1, 1, 1],
    [0, 2, 1]
  ]
  
  expect(computeEvolution(initialState)).toEqual(expectedState)
})

test('dead cell remains dead', () => {
  const initialState: number[][] = [
    [0, 1, 0],
    [0, 0, 1],
    [0, 0, 0]
  ]
  const expectedState: number[][] = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]
  
  expect(computeEvolution(initialState)).toEqual(expectedState)
})

test('dead cell becomes sad (3 sad neighbors)', () => {
  const initialState: number[][] = [
    [0, 1, 0],
    [0, 0, 1],
    [0, 1, 0]
  ]
  const expectedState: number[][] = [
    [0, 0, 0],
    [0, 1, 1],
    [0, 0, 0]
  ]
  
  expect(computeEvolution(initialState)).toEqual(expectedState)
})

test('dead cell becomes sad (2 sad, 1 happy neighbors)', () => {
  const initialState: number[][] = [
    [0, 1, 0],
    [0, 0, 1],
    [0, 2, 0]
  ]
  const expectedState: number[][] = [
    [0, 0, 0],
    [0, 1, 1],
    [0, 0, 0]
  ]
  
  expect(computeEvolution(initialState)).toEqual(expectedState)
})

test('dead cell becomes happy (3 happy neighbors)', () => {
  const initialState: number[][] = [
    [0, 2, 0],
    [0, 0, 2],
    [0, 2, 0]
  ]
  const expectedState: number[][] = [
    [0, 0, 0],
    [0, 2, 2],
    [0, 0, 0]
  ]
  
  expect(computeEvolution(initialState)).toEqual(expectedState)
})

test('dead cell becomes happy (2 happy, 1 sad neighbors)', () => {
  const initialState: number[][] = [
    [0, 2, 0],
    [0, 0, 2],
    [0, 1, 0]
  ]
  const expectedState: number[][] = [
    [0, 0, 0],
    [0, 2, 2],
    [0, 0, 0]
  ]
  
  expect(computeEvolution(initialState)).toEqual(expectedState)
})