import types from './types'

export function setTime(time) {
  return {
    type: types.SET_TIME,
    payload: time,
  }
}

export function setLeftToClick(leftToClick) {
  return {
    type: types.SET_LEFT_TO_CLICK,
    payload: leftToClick,
  }
}

export function setSelectingInitialSquare(initialSelect) {
  return {
    type: types.SET_SELECTING_INITIAL_SQUARE,
    payload: initialSelect,
  }
}

export function setCurrentMove(currentMove) {
  return {
    type: types.SET_CURRENT_MOVE,
    payload: currentMove,
  }
}

export function setCurrentLevel(level) {
  return {
    type: types.SET_CURRENT_LEVEL,
    payload: level,
  }
}

export function setLives(lives) {
  return {
    type: types.SET_LIVES,
    payload: lives,
  }
}
