import types from './types'

export function clearBoard() {
  return {
    type: types.CLEAR_BOARD,
  }
}

export function updateBoard(x, y) {
  return {
    type: types.UPDATE_BOARD,
    payload: { x, y },
  }
}

export function loadLevel(level) {
  return {
    type: types.LOAD_LEVEL,
    payload: level,
  }
}
