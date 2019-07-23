import types from './types'

const initialState = {
  levels: [],
  currentLevel: 1,
  currentMove: 1,
  lives: 1,
  leftToClick: 0,
  selectingInitialSquare: true,
  moveTime: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LIVES:
      return {
        ...state,
        lives: action.payload,
      }

    case types.SET_TIME:
      return {
        ...state,
        moveTime: action.payload,
      }

    case types.SET_SELECTING_INITIAL_SQUARE:
      return {
        ...state,
        selectingInitialSquare: action.payload,
      }

    case types.SET_CURRENT_MOVE:
      return {
        ...state,
        currentMove: action.payload,
      }

    case types.SET_CURRENT_LEVEL:
      return {
        ...state,
        currentLevel: action.payload,
      }

    case types.SET_LEFT_TO_CLICK:
      return {
        ...state,
        leftToClick: action.payload,
      }

    default:
      return state
  }
}
